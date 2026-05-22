import prisma from "@/lib/prisma";
import { Suspense } from "react";
import PayoutsClientTable from "./PayoutsClientTable";

export const dynamic = "force-dynamic";

export default async function PayoutsPage() {
  let payoutsArray: any[] = [];
  try {
    const earnings = await prisma.driverRideEarning.findMany({
      where: {
        settlement_status: "UNSETTLED",
      },
      include: {
        driver: {
          include: {
            payout_accounts: {
              where: { is_primary: true }
            }
          }
        },
        ride: true,
      },
      orderBy: { created_at: "asc" },
    });

    const driverPayouts = earnings.reduce((acc, earning) => {
      const dId = earning.driver_id;
      if (!acc[dId]) {
        acc[dId] = {
          driver: earning.driver,
          totalNet: 0,
          rideCount: 0,
          earningIds: []
        };
      }
      acc[dId].totalNet += earning.net_amount.toNumber();
      acc[dId].rideCount += 1;
      acc[dId].earningIds.push(earning.id);
      return acc;
    }, {} as Record<string, any>);

    payoutsArray = Object.values(driverPayouts).map((payout: any) => ({
      ...payout,
      driver: {
        ...payout.driver,
        rating: payout.driver.rating ? payout.driver.rating.toNumber() : null
      }
    }));
  } catch (e) {
    console.error("Payouts fetch failed (likely build-time):", e);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-white tracking-tight">Payouts & Settlements</h1>
        <p className="text-gray-400">Manage driver earnings and batch initiate transfers.</p>
      </div>

      <Suspense fallback={<div className="h-64 bg-[#1a1a1a] rounded-xl animate-pulse"></div>}>
        <PayoutsClientTable payoutsArray={payoutsArray} />
      </Suspense>
    </div>
  );
}
