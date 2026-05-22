import prisma from "@/lib/prisma";
import { Suspense } from "react";
import DisputesClientTable from "./DisputesClientTable";

export const dynamic = "force-dynamic";

export default async function DisputesPage() {
  let disputedRides: any[] = [];
  try {
    disputedRides = await prisma.ride.findMany({
      where: {
        status: "DISPUTED"
      },
      include: {
        student: true,
        driver: true,
        payment: true
      },
      orderBy: {
        updated_at: "desc"
      }
    });
  } catch (e) {
    console.error("Disputes fetch failed (likely build-time):", e);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-white tracking-tight">Ride Dispute Center</h1>
        <p className="text-gray-400">Manage and resolve rides flagged for manual intervention.</p>
      </div>

      <Suspense fallback={<div className="h-64 bg-[#1a1a1a] rounded-xl animate-pulse"></div>}>
        <DisputesClientTable rides={disputedRides} />
      </Suspense>
    </div>
  );
}
