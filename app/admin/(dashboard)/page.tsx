import prisma from "@/lib/prisma";
import Link from "next/link";
import { Suspense } from "react";


export const dynamic = "force-dynamic";

async function MetricsCards() {
  let activeRides = 0;
  let kycQueue = 0;
  let totalDrivers = 0;
  let totalUnsettled = 0;

  try {
    const [
      activeRidesCount,
      kycQueueCount,
      totalDriversCount,
      unsettledEarnings,
    ] = await Promise.all([
      prisma.ride.count({
        where: {
          status: {
            in: ["ONGOING", "BIDDING", "DRIVER_ASSIGNED"],
          },
        },
      }),
      prisma.driverKyc.count({
        where: {
          kyc_status: {
            in: ["PENDING", "MANUAL_REVIEW"],
          },
        },
      }),
      prisma.driver.count(),
      prisma.driverRideEarning.aggregate({
        _sum: {
          net_amount: true,
        },
        where: {
          settlement_status: "UNSETTLED",
        },
      }),
    ]);

    activeRides = activeRidesCount;
    kycQueue = kycQueueCount;
    totalDrivers = totalDriversCount;
    totalUnsettled = unsettledEarnings._sum.net_amount?.toNumber() || 0;
  } catch (e) {
    console.error("Dashboard metrics fetch failed (likely build-time):", e);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Active Rides */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 relative overflow-hidden group hover:border-yellow-500/50 transition-colors">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <svg className="w-16 h-16 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="text-gray-400 text-sm font-medium mb-1">Active Rides</h3>
        <p className="text-3xl font-bold text-white mb-2">{activeRides}</p>
        <p className="text-xs text-yellow-500">Live across all campuses</p>
      </div>

      {/* KYC Queue */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 relative overflow-hidden group hover:border-blue-500/50 transition-colors">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <svg className="w-16 h-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-gray-400 text-sm font-medium mb-1">KYC Queue</h3>
        <p className="text-3xl font-bold text-white mb-2">{kycQueue}</p>
        <p className="text-xs text-blue-400">Drivers pending verification</p>
      </div>

      {/* Pending Payouts */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 relative overflow-hidden group hover:border-red-500/50 transition-colors">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <svg className="w-16 h-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-gray-400 text-sm font-medium mb-1">Pending Payouts</h3>
        <p className="text-3xl font-bold text-white mb-2">₹{totalUnsettled.toLocaleString()}</p>
        <p className="text-xs text-red-400">Total unsettled earnings</p>
      </div>

      {/* Total Drivers */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 relative overflow-hidden group hover:border-green-500/50 transition-colors">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <svg className="w-16 h-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3 className="text-gray-400 text-sm font-medium mb-1">Total Drivers</h3>
        <p className="text-3xl font-bold text-white mb-2">{totalDrivers}</p>
        <p className="text-xs text-green-400">Registered on platform</p>
      </div>
    </div>
  );
}

async function RecentRidesTable() {
  let rides: any[] = [];
  try {
    rides = await prisma.ride.findMany({
      take: 5,
      orderBy: { created_at: "desc" },
      include: {
        student: true,
        driver: true,
      },
    });
  } catch (e) {
    console.error("Recent rides fetch failed (likely build-time):", e);
  }

  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-gray-800 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Recent Rides</h3>
        <Link href="/admin/rides" className="text-sm text-blue-500 hover:text-blue-400">View All</Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-[#222222] text-xs uppercase font-semibold text-gray-500">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">Driver</th>
              <th className="px-6 py-4">Destination</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {rides.map((ride) => (
              <tr key={ride.id} className="hover:bg-[#222222]/50 transition-colors">
                <td className="px-6 py-4 font-mono text-xs">{ride.id.slice(0, 8)}...</td>
                <td className="px-6 py-4 text-white">{ride.student.phone}</td>
                <td className="px-6 py-4">{ride.driver?.name || ride.driver?.phone || <span className="text-gray-600">Unassigned</span>}</td>
                <td className="px-6 py-4">{ride.destination}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium
                    ${ride.status === 'COMPLETED' ? 'bg-green-500/10 text-green-500' : ''}
                    ${ride.status === 'CANCELLED' ? 'bg-red-500/10 text-red-500' : ''}
                    ${ride.status === 'BIDDING' || ride.status === 'ONGOING' ? 'bg-yellow-500/10 text-yellow-500' : ''}
                    ${ride.status === 'CREATED' || ride.status === 'DRIVER_ASSIGNED' ? 'bg-blue-500/10 text-blue-500' : ''}
                    ${ride.status === 'NO_DRIVERS' ? 'bg-gray-500/10 text-gray-400' : ''}
                  `}>
                    {ride.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-white">₹{ride.price?.toString() || '-'}</td>
              </tr>
            ))}
            {rides.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No recent rides found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">

      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-white tracking-tight">Overview</h1>
        <p className="text-gray-400">Monitor your platform's pulse</p>
      </div>

      <Suspense fallback={<div className="h-32 bg-[#1a1a1a] rounded-xl animate-pulse"></div>}>
        <MetricsCards />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2">
          <Suspense fallback={<div className="h-64 bg-[#1a1a1a] rounded-xl animate-pulse"></div>}>
            <RecentRidesTable />
          </Suspense>
        </div>
        <div className="col-span-1">
          {/* We can add a quick actions or alerts panel here later */}
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 h-full">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link href="/admin/payouts" className="w-full flex items-center justify-between p-3 rounded-lg bg-[#222222] hover:bg-gray-700 transition-colors group">
                <span className="text-sm font-medium text-white">Process Payouts</span>
                <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/admin/drivers" className="w-full flex items-center justify-between p-3 rounded-lg bg-[#222222] hover:bg-gray-700 transition-colors group">
                <span className="text-sm font-medium text-white">Review KYC</span>
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full group-hover:bg-blue-500 transition-colors">Urgent</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
