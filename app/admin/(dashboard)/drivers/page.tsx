import prisma from "@/lib/prisma";
import Link from "next/link";
import { Suspense } from "react";
import DriversClientTable from "./DriversClientTable";

export const dynamic = "force-dynamic";

export default async function DriversPage() {
  let serializedDrivers: any[] = [];
  try {
    const drivers = await prisma.driver.findMany({
      orderBy: { created_at: "desc" },
      include: {
        kyc: true,
      },
    });

    serializedDrivers = drivers.map(d => ({
      ...d,
      rating: d.rating ? d.rating.toNumber() : null,
    }));
  } catch (e) {
    console.error("Drivers fetch failed (likely build-time):", e);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold text-white tracking-tight">Drivers & KYC</h1>
          <p className="text-gray-400">Manage drivers, verify documents, and handle onboarding.</p>
        </div>
        <Link 
          href="/admin/drivers/new" 
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors whitespace-nowrap w-fit"
        >
          + Add Driver
        </Link>
      </div>

      <Suspense fallback={<div className="h-64 bg-[#1a1a1a] rounded-xl animate-pulse"></div>}>
        <DriversClientTable initialDrivers={serializedDrivers} />
      </Suspense>
    </div>
  );
}
