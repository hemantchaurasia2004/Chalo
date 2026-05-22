"use server"

import prisma from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { encrypt, hashString } from "@/lib/crypto";

async function saveFileLocally(file: File, prefix: string): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const safeName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
  const filename = `${prefix}-${Date.now()}-${safeName}`;
  const uploadDir = join(process.cwd(), 'public', 'uploads');
  
  try {
    await mkdir(uploadDir, { recursive: true });
  } catch (e) {}

  const path = join(uploadDir, filename);
  await writeFile(path, buffer);

  return `/uploads/${filename}`;
}

export async function submitOnboarding(formData: FormData) {
  try {
    // Extract text fields
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const vehicle_number = formData.get("vehicle_number") as string;
    const aadhaar_number = formData.get("aadhaar_number") as string;
    const driving_license_number = formData.get("driving_license_number") as string;
    
    // Process Aadhaar securely
    const aadhaar_last4 = aadhaar_number.slice(-4);
    const aadhaar_hash = hashString(aadhaar_number);
    const aadhaar_number_encrypted = encrypt(aadhaar_number);

    // Check if driver already exists
    const existing = await prisma.driver.findUnique({ where: { phone } });
    if (existing) {
      return { success: false, error: "A driver with this phone number is already registered." };
    }

    // Create driver and KYC in transaction
    const driver = await prisma.driver.create({
      data: {
        name,
        phone,
        vehicle_number,
        onboarding_status: "SUBMITTED",
        kyc: {
          create: {
            aadhaar_last4,
            aadhaar_hash,
            aadhaar_number_encrypted,
            driving_license_number,
            kyc_status: "PENDING"
          }
        }
      }
    });

    // Handle files
    const docTypes = [
      { key: "aadhaar_file", type: "AADHAAR_QR" },
      { key: "dl_file", type: "DRIVING_LICENSE" },
      { key: "profile_file", type: "PROFILE_PHOTO" },
      { key: "rc_file", type: "OTHER" },
      { key: "upi_file", type: "UPI_QR" },
      { key: "bank_file", type: "BANK_PROOF" }
    ];

    for (const doc of docTypes) {
      const file = formData.get(doc.key) as File;
      if (file && file.size > 0) {
        const url = await saveFileLocally(file, `${driver.id}-${doc.type}`);
        await prisma.driverDocument.create({
          data: {
            driver_id: driver.id,
            doc_type: doc.type as any,
            storage_url: url,
          }
        });
      }
    }

    return { success: true, driverId: driver.id };
  } catch (error: any) {
    console.error("Onboarding Error:", error);
    return { success: false, error: "Failed to submit application. Please try again." };
  }
}
