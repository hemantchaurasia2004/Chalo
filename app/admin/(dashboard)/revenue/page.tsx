import prisma from "@/lib/prisma";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function RevenuePage() {
  let stats: any = { _sum: { gross_amount: 0, platform_fee: 0, net_amount: 0 } };
  let recentEarnings: any[] = [];
  let currentFee = "10";

  try {
    // Aggregate stats
    stats = await prisma.driverRideEarning.aggregate({
      _sum: {
        gross_amount: true,
        platform_fee: true,
        net_amount: true,
      },
      _count: {
        id: true
      }
    });

    const earningsList = await prisma.driverRideEarning.findMany({
      orderBy: { created_at: 'desc' },
      take: 20,
      include: {
        ride: {
          include: {
            student: true,
            driver: true
          }
        }
      }
    });

    // CRITICAL: Serialize Decimal fields before passing to Client Component logic
    recentEarnings = earningsList.map(item => ({
      ...item,
      gross_amount: item.gross_amount.toNumber(),
      platform_fee: item.platform_fee.toNumber(),
      net_amount: item.net_amount.toNumber(),
      ride: {
        ...item.ride,
        price: item.ride.price ? item.ride.price.toNumber() : null,
        driver: item.ride.driver ? {
          ...item.ride.driver,
          rating: item.ride.driver.rating ? item.ride.driver.rating.toNumber() : null
        } : null
      }
    }));

    const settings = await prisma.systemSetting.findUnique({
      where: { key: "PLATFORM_FEE_PERCENTAGE" }
    });
    if (settings) currentFee = settings.value;
  } catch (e) {
    console.error("Revenue fetch failed (likely build-time):", e);
  }

  const totalGross = stats._sum?.gross_amount?.toNumber?.() || stats._sum?.gross_amount || 0;
  const totalFees = stats._sum?.platform_fee?.toNumber?.() || stats._sum?.platform_fee || 0;
  const totalNet = stats._sum?.net_amount?.toNumber?.() || stats._sum?.net_amount || 0;

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-white tracking-tight">Financial Ledger</h1>
        <p className="text-gray-400">Track platform revenue, platform fees, and driver payouts.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
          <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Total Transaction Volume</p>
          <p className="text-3xl font-bold text-white">₹{totalGross.toLocaleString()}</p>
          <p className="text-[10px] text-gray-600 mt-2 italic">Total amount paid by students</p>
        </div>
        <div className="bg-[#1a1a1a] border border-blue-500/20 rounded-xl p-6">
          <p className="text-xs text-blue-500 uppercase font-bold tracking-widest mb-1">Total Platform Fees</p>
          <p className="text-3xl font-bold text-blue-400">₹{totalFees.toLocaleString()}</p>
          <p className="text-[10px] text-blue-600 mt-2 italic">Chalo's total net revenue</p>
        </div>
        <div className="bg-[#1a1a1a] border border-green-500/20 rounded-xl p-6">
          <p className="text-xs text-green-500 uppercase font-bold tracking-widest mb-1">Total Driver Earnings</p>
          <p className="text-3xl font-bold text-green-400">₹{totalNet.toLocaleString()}</p>
          <p className="text-[10px] text-green-600 mt-2 italic">Total sent to drivers</p>
        </div>
      </div>

      {/* Recent Ledger Items */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-gray-800">
          <h3 className="text-lg font-semibold text-white">Recent Earnings Ledger</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-[#222222] text-xs uppercase font-semibold text-gray-500">
              <tr>
                <th className="px-6 py-4">Ride ID</th>
                <th className="px-6 py-4">Gross</th>
                <th className="px-6 py-4 text-blue-400">Fee ({currentFee}%)</th>
                <th className="px-6 py-4 text-green-400">Net to Driver</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {recentEarnings.map((item) => (
                <tr key={item.id} className="hover:bg-[#222222]/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs">
                    <div className="flex flex-col">
                      <span className="text-gray-300">#{item.ride.id.slice(0, 8)}</span>
                      <span className="text-[10px] text-gray-600">{item.ride.driver?.name || 'Unknown'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white font-medium">₹{item.gross_amount.toString()}</td>
                  <td className="px-6 py-4 text-blue-400/80 font-bold">₹{item.platform_fee.toString()}</td>
                  <td className="px-6 py-4 text-green-400/80 font-bold">₹{item.net_amount.toString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${item.settlement_status === 'SETTLED' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                      {item.settlement_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500">
                    {new Date(item.created_at).toISOString().split('T')[0]}
                  </td>
                </tr>
              ))}
              {recentEarnings.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500 italic">
                    No earnings recorded in the ledger yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
