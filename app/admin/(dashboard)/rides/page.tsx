import prisma from "@/lib/prisma";
import { Suspense } from "react";
import RidesClientTable from "./RidesClientTable";


export const dynamic = "force-dynamic";

export default async function RidesPage() {
  let serializedRides: any[] = [];
  try {
    const rides = await prisma.ride.findMany({
      orderBy: { created_at: "desc" },
      include: {
        student: true,
        driver: true,
      },
    });

    serializedRides = rides.map(r => ({
      ...r,
      price: r.price ? r.price.toNumber() : null,
      driver: r.driver ? { ...r.driver, rating: r.driver.rating ? r.driver.rating.toNumber() : null } : null,
    }));
  } catch (e) {
    console.error("Rides fetch failed (likely build-time):", e);
  }

  return (
    <div className="space-y-6">

      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          Rides Tracking

        </h1>
        <p className="text-gray-400">Monitor all ride activity across the platform.</p>
      </div>

      <Suspense fallback={<div className="h-64 bg-[#1a1a1a] rounded-xl animate-pulse"></div>}>
        <RidesClientTable initialRides={serializedRides} />
      </Suspense>
    </div>
  );
}
