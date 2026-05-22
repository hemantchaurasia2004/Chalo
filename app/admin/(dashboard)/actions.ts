"use server"

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function logAction(data: { 
  actor_type: string, 
  actor_id?: string, 
  action: string, 
  entity_type: string, 
  entity_id?: string, 
  metadata?: any 
}) {
  await prisma.auditLog.create({
    data: {
      actor_type: data.actor_type,
      actor_id: data.actor_id,
      action: data.action,
      entity_type: data.entity_type,
      entity_id: data.entity_id,
      metadata: data.metadata || {}
    }
  });
}

async function notifyKycStatus(driverId: string, status: 'verified' | 'rejected', reason?: string) {
  const backendUrl = process.env.BACKEND_URL || "http://localhost:3000";
  const adminSecret = process.env.ADMIN_PASSWORD || "chaloadmin2024";

  try {
    const res = await fetch(`${backendUrl}/admin/driver/${driverId}/kyc-notification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-secret': adminSecret
      },
      body: JSON.stringify({ status, reason })
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      console.error(`Failed to send KYC notification: ${res.status} ${res.statusText}`, data);
    } else {
      console.log(`KYC ${status} notification sent for driver ${driverId}`);
    }
  } catch (err) {
    console.error(`Error calling backend for KYC notification:`, err);
  }
}

export async function approveKyc(driverId: string) {
  await prisma.$transaction([
    prisma.driverKyc.upsert({
      where: { driver_id: driverId },
      update: { kyc_status: "VERIFIED", verified_at: new Date() },
      create: { driver_id: driverId, kyc_status: "VERIFIED", verified_at: new Date() }
    }),
    prisma.driver.update({
      where: { id: driverId },
      data: { onboarding_status: "VERIFIED", status: "ONLINE", approved_at: new Date() }
    })
  ]);

  await logAction({
    actor_type: "ADMIN",
    action: "APPROVE_KYC",
    entity_type: "DRIVER",
    entity_id: driverId,
    metadata: { status: "VERIFIED" }
  });

  revalidatePath("/admin/drivers");
  revalidatePath("/admin");

  // Notify driver
  await notifyKycStatus(driverId, "verified");
}

export async function rejectKyc(driverId: string, reason: string) {
  await prisma.$transaction([
    prisma.driverKyc.upsert({
      where: { driver_id: driverId },
      update: { kyc_status: "REJECTED" },
      create: { driver_id: driverId, kyc_status: "REJECTED" }
    }),
    prisma.driver.update({
      where: { id: driverId },
      data: { onboarding_status: "REJECTED", rejection_reason: reason, rejected_at: new Date() }
    })
  ]);

  await logAction({
    actor_type: "ADMIN",
    action: "REJECT_KYC",
    entity_type: "DRIVER",
    entity_id: driverId,
    metadata: { reason }
  });

  revalidatePath("/admin/drivers");
  revalidatePath("/admin");

  // Notify driver
  await notifyKycStatus(driverId, "rejected", reason);
}

export async function processPayout(driverId: string, earningIds: string[], amount: number, accountId: string) {
  // ... existing code ...
  await prisma.$transaction(async (tx) => {
    const payout = await tx.payout.create({
      data: {
        driver_id: driverId,
        amount: amount,
        payout_account_id: accountId,
        status: "SUCCESS",
        processed_at: new Date()
      }
    });

    await tx.payoutItem.createMany({
      data: earningIds.map(id => ({
        payout_id: payout.id,
        driver_ride_earning_id: id
      }))
    });

    await tx.driverRideEarning.updateMany({
      where: { id: { in: earningIds } },
      data: { settlement_status: "SETTLED", settled_at: new Date() }
    });

    await logAction({
      actor_type: "ADMIN",
      action: "PROCESS_PAYOUT",
      entity_type: "PAYOUT",
      entity_id: payout.id,
      metadata: { driver_id: driverId, amount, items_count: earningIds.length }
    });
  });
  
  revalidatePath("/admin/payouts");
  revalidatePath("/admin");
}

export async function createDriver(data: any) {
  const vehicleRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/;
  const cleanVehicle = data.vehicle_number?.trim().toUpperCase().replace(/\s/g, "");

  if (!cleanVehicle || !vehicleRegex.test(cleanVehicle)) {
    return { error: "Invalid Vehicle Number format." };
  }
  try {
    const driver = await prisma.driver.create({
      data: {
        phone: data.phone.trim(),
        name: data.name.trim(),
        vehicle_number: cleanVehicle,
        onboarding_status: "SUBMITTED",
        kyc: {
          create: {
            kyc_status: "PENDING"
          }
        }
      }
    });
    revalidatePath("/admin/drivers");
    return { success: true, id: driver.id };
  } catch (error: any) {
    if (error.code === 'P2002') {
      const target = error.meta?.target as string[];
      if (target.includes('vehicle_number')) {
        return { error: "A driver with this vehicle number is already registered." };
      }
      if (target.includes('phone')) {
        return { error: "A driver with this phone number is already registered." };
      }
    }
    console.error("Driver creation failed:", error);
    return { error: "Failed to create driver. Please try again." };
  }
}

async function ensureUnderReviewIfRejected(driverId: string) {
  const driver = await prisma.driver.findUnique({
    where: { id: driverId },
    select: { onboarding_status: true }
  });

  if (driver?.onboarding_status === "REJECTED") {
    await prisma.driver.update({
      where: { id: driverId },
      data: {
        onboarding_status: "UNDER_REVIEW",
        rejection_reason: null,
        rejected_at: null
      }
    });
  }
}

export async function updateDriver(driverId: string, data: any) {
  await ensureUnderReviewIfRejected(driverId);
  await prisma.driver.update({
    where: { id: driverId },
    data
  });
  
  revalidatePath(`/admin/drivers/${driverId}`);
  revalidatePath("/admin/drivers");
}

export async function deleteDriver(driverId: string) {
  const driver = await prisma.driver.delete({
    where: { id: driverId }
  });

  await logAction({
    actor_type: "ADMIN",
    action: "DELETE_DRIVER",
    entity_type: "DRIVER",
    entity_id: driverId,
    metadata: { phone: driver.phone, name: driver.name }
  });

  revalidatePath("/admin/drivers");
  revalidatePath("/admin");
}

export async function updateKycData(driverId: string, data: any) {
  await ensureUnderReviewIfRejected(driverId);
  await prisma.driverKyc.upsert({
    where: { driver_id: driverId },
    update: data,
    create: {
      driver_id: driverId,
      ...data,
      kyc_status: "PENDING"
    }
  });
  revalidatePath(`/admin/drivers/${driverId}`);
}

export async function addDocument(driverId: string, docType: any, url: string) {
  await ensureUnderReviewIfRejected(driverId);
  await prisma.driverDocument.create({
    data: {
      driver_id: driverId,
      doc_type: docType,
      storage_url: url,
      uploaded_at: new Date()
    }
  });
  revalidatePath(`/admin/drivers/${driverId}`);
}

export async function uploadDocument(driverId: string, docType: any, formData: FormData) {
  const file = formData.get('file') as File;
  if (!file) throw new Error("No file uploaded");

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const safeName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
  const filename = `${driverId}-${docType}-${Date.now()}-${safeName}`;
  const uploadDir = join(process.cwd(), 'public', 'uploads');
  
  try {
    await mkdir(uploadDir, { recursive: true });
  } catch (e) {}

  const path = join(uploadDir, filename);
  await writeFile(path, buffer);

  const publicUrl = `/uploads/${filename}`;

  try {
    await ensureUnderReviewIfRejected(driverId);
    await prisma.driverDocument.create({
      data: {
        driver_id: driverId,
        doc_type: docType,
        storage_url: publicUrl,
        uploaded_at: new Date()
      }
    });
  } catch (error: any) {
    if (error.code === 'P2002') {
      throw new Error(`A document of type ${docType.replace(/_/g, " ")} already exists for this driver. Please delete the old one first.`);
    }
    throw error;
  }
  revalidatePath(`/admin/drivers/${driverId}`);
}

export async function deleteDocument(docId: string) {
  const doc = await prisma.driverDocument.delete({
    where: { id: docId }
  });
  
  await logAction({
    actor_type: "ADMIN",
    action: "DELETE_DOCUMENT",
    entity_type: "DOCUMENT",
    entity_id: docId,
    metadata: { driver_id: doc.driver_id, doc_type: doc.doc_type }
  });

  revalidatePath(`/admin/drivers/${doc.driver_id}`);
}

export async function addPayoutAccount(driverId: string, data: any) {
  // If setting as primary, un-primary others
  if (data.is_primary) {
    await prisma.driverPayoutAccount.updateMany({
      where: { driver_id: driverId },
      data: { is_primary: false }
    });
  }

  await prisma.driverPayoutAccount.create({
    data: {
      driver_id: driverId,
      account_type: data.account_type,
      upi_id: data.upi_id || null,
      bank_name: data.bank_name || null,
      account_holder_name: data.account_holder_name || null,
      ifsc_code: data.ifsc_code || null,
      is_primary: data.is_primary ?? true,
      is_verified: false
    }
  });
  revalidatePath(`/admin/drivers/${driverId}`);
}

export async function verifyPayoutAccount(accountId: string) {
  const acc = await prisma.driverPayoutAccount.update({
    where: { id: accountId },
    data: { is_verified: true }
  });
  revalidatePath(`/admin/drivers/${acc.driver_id}`);
}

export async function deletePayoutAccount(accountId: string) {
  const acc = await prisma.driverPayoutAccount.delete({
    where: { id: accountId }
  });
  revalidatePath(`/admin/drivers/${acc.driver_id}`);
}

export async function createCampus(data: any) {
  await prisma.campus.create({
    data: {
      code: data.code,
      name: data.name,
    }
  });
  revalidatePath("/admin/campuses");
}

export async function updateCampus(id: string, data: any) {
  await prisma.campus.update({
    where: { id },
    data: {
      code: data.code,
      name: data.name,
    }
  });
  revalidatePath("/admin/campuses");
}

export async function deleteCampus(id: string) {
  await prisma.campus.delete({
    where: { id }
  });
  revalidatePath("/admin/campuses");
}

export async function resolveDispute(rideId: string, resolution: "COMPLETED" | "CANCELLED", notes: string) {
  await prisma.ride.update({
    where: { id: rideId },
    data: {
      status: resolution,
      cancel_reason: resolution === "CANCELLED" ? `Dispute Resolution: ${notes}` : undefined,
    }
  });

  await logAction({
    actor_type: "ADMIN",
    action: "RESOLVE_DISPUTE",
    entity_type: "RIDE",
    entity_id: rideId,
    metadata: { resolution, notes }
  });

  revalidatePath("/admin/disputes");
  revalidatePath(`/admin/rides/${rideId}`);
  revalidatePath("/admin/rides");
}

export async function toggleWebhookProcessed(id: string, processed: boolean) {
  await prisma.webhookEvent.update({
    where: { id },
    data: {
      processed,
      processed_at: processed ? new Date() : null
    }
  });

  await logAction({
    actor_type: "ADMIN",
    action: "TOGGLE_WEBHOOK",
    entity_type: "WEBHOOK",
    entity_id: id,
    metadata: { processed }
  });
  revalidatePath("/admin/webhooks");
}

export async function updateSetting(key: string, value: string) {
  await prisma.systemSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value }
  });

  await logAction({
    actor_type: "ADMIN",
    action: "UPDATE_SETTING",
    entity_type: "SETTING",
    entity_id: key,
    metadata: { value }
  });

  revalidatePath("/admin/settings");
  revalidatePath("/admin/revenue"); // Revenue page might show this
}

export async function processRefund(paymentId: string) {
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    include: { ride: true }
  });

  if (!payment) throw new Error("Payment not found");

  // In a real app, you would call Razorpay/PhonePe API here
  // const refund = await razorpay.refunds.create({ payment_id: payment.transaction_id });

  await prisma.payment.update({
    where: { id: paymentId },
    data: {
      refund_status: "REFUNDED",
      payment_status: "REFUNDED"
    }
  });

  await logAction({
    actor_type: "ADMIN",
    action: "PROCESS_REFUND",
    entity_type: "PAYMENT",
    entity_id: paymentId,
    metadata: { 
      ride_id: payment.ride_id, 
      amount: payment.amount,
      reason: payment.ride.cancel_reason 
    }
  });

  revalidatePath(`/admin/rides/${payment.ride_id}`);
  revalidatePath("/admin/revenue");
}

export async function deleteStudent(studentId: string) {
  const student = await prisma.student.delete({
    where: { id: studentId }
  });

  await logAction({
    actor_type: "ADMIN",
    action: "DELETE_STUDENT",
    entity_type: "STUDENT",
    entity_id: studentId,
    metadata: { phone: student.phone }
  });

  revalidatePath("/admin/students");
  revalidatePath("/admin");
}

export async function verifyAdminPassword(password: string) {
  return password === (process.env.ADMIN_PASSWORD || "chaloadmin2024");
}
