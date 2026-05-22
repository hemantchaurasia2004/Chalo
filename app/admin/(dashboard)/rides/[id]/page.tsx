import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import RefundButton from "./RefundButton";

export const dynamic = "force-dynamic";

export default async function RideDetailsPage({ params }: { params: { id: string } }) {
  const ride = await prisma.ride.findUnique({
    where: { id: params.id },
    include: {
      student: true,
      driver: true,
      bids: {
        include: {
          driver: true
        },
        orderBy: {
          timestamp: 'desc'
        }
      },
      payment: true,
      earning: true
    }
  });

  if (!ride) {
    notFound();
  }

  const statusColors: any = {
    'COMPLETED': 'bg-green-500/10 text-green-500 border-green-500/20',
    'CANCELLED': 'bg-red-500/10 text-red-500 border-red-500/20',
    'BIDDING': 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50',
    'ONGOING': 'bg-blue-500/20 text-blue-400 border-blue-500/40',
    'DRIVER_ASSIGNED': 'bg-purple-500/20 text-purple-400 border-purple-500/40',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/rides" className="text-gray-400 hover:text-white transition-colors">
          ← Back to Rides
        </Link>
        <h1 className="text-2xl font-bold text-white">Ride #{ride.id.slice(0, 8)}</h1>
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColors[ride.status] || 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
          {ride.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ride Info Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-800 pb-2">Journey Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Pickup Location</p>
                  <p className="text-white font-medium">{ride.pickup || "Not specified"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Destination</p>
                  <p className="text-white font-medium">{ride.destination}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Created At</p>
                  <p className="text-white font-medium">{new Date(ride.created_at).toLocaleString()}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Final Price</p>
                  <p className="text-xl font-bold text-white">₹{ride.price?.toString() || "N/A"}</p>
                </div>
                {ride.completion_otp && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Completion OTP</p>
                    <p className="text-white font-mono font-bold tracking-widest">{ride.completion_otp}</p>
                  </div>
                )}
                {ride.cancel_reason && (
                  <div>
                    <p className="text-xs text-red-500/70 uppercase tracking-wider mb-1">Cancellation Reason</p>
                    <p className="text-red-400 font-medium">{ride.cancel_reason}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bidding History */}
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-800 pb-2">Bidding History</h3>
            {ride.bids.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-gray-500 font-medium border-b border-gray-800">
                    <tr>
                      <th className="py-3 px-2">Driver</th>
                      <th className="py-3 px-2">Bid Amount</th>
                      <th className="py-3 px-2">Time</th>
                      <th className="py-3 px-2 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/50">
                    {ride.bids.map((bid) => (
                      <tr key={bid.id} className="text-gray-300">
                        <td className="py-3 px-2">
                          <div className="flex flex-col">
                            <span className="text-white">{bid.driver.name}</span>
                            <span className="text-xs text-gray-500">{bid.driver.phone}</span>
                          </div>
                        </td>
                        <td className="py-3 px-2 font-bold text-white">₹{bid.bid_price.toString()}</td>
                        <td className="py-3 px-2 text-gray-500">{new Date(bid.timestamp).toLocaleTimeString()}</td>
                        <td className="py-3 px-2 text-right">
                          {ride.driver_id === bid.driver_id ? (
                            <span className="bg-green-500/20 text-green-400 text-[10px] px-2 py-0.5 rounded uppercase font-bold">Selected</span>
                          ) : (
                            <span className="text-gray-600 text-[10px] uppercase font-bold tracking-widest">Outbid</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 py-4 italic">No bids placed on this ride yet.</p>
            )}
          </div>
        </div>

        {/* Sidebar: Student & Driver Cards */}
        <div className="space-y-6">
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">Student Info</h3>
            <div className="flex flex-col space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {ride.student.phone.slice(-1)}
                </div>
                <div>
                  <p className="text-white font-medium">{ride.student.phone}</p>
                  <p className="text-xs text-gray-500">Registered Student</p>
                </div>
              </div>
              <Link 
                href={`/admin/rides?search=${ride.student.phone}`}
                className="text-center text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 rounded transition-colors"
              >
                View Student History
              </Link>
            </div>
          </div>

          <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">Assigned Driver</h3>
            {ride.driver ? (
              <div className="flex flex-col space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                    {ride.driver.name?.charAt(0) || "D"}
                  </div>
                  <div>
                    <p className="text-white font-medium">{ride.driver.name || "Unknown Name"}</p>
                    <p className="text-xs text-gray-500">{ride.driver.phone}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-center text-[10px] uppercase font-bold tracking-wider">
                  <div className="bg-gray-800/50 p-2 rounded">
                    <p className="text-gray-500 mb-1">Rating</p>
                    <p className="text-yellow-500">★ {ride.driver.rating.toString()}</p>
                  </div>
                  <div className="bg-gray-800/50 p-2 rounded">
                    <p className="text-gray-500 mb-1">Vehicle</p>
                    <p className="text-white">{ride.driver.vehicle_number || "N/A"}</p>
                  </div>
                </div>
                <Link 
                  href={`/admin/drivers/${ride.driver.id}`}
                  className="text-center text-xs bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 py-2 rounded transition-colors"
                >
                  View Driver Profile
                </Link>
              </div>
            ) : (
              <p className="text-gray-600 italic py-4 text-center">Driver not yet assigned.</p>
            )}
          </div>

          {ride.payment && (
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">Payment Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Amount Paid</span>
                  <span className="text-white font-bold">₹{ride.payment.amount.toString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Status</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${ride.payment.payment_status === 'SUCCESS' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                    {ride.payment.payment_status}
                  </span>
                </div>
                {ride.payment.transaction_id && (
                  <div className="pt-2 border-t border-gray-800">
                    <p className="text-[10px] text-gray-500 uppercase mb-1">Transaction ID</p>
                    <p className="text-xs text-gray-400 font-mono break-all">{ride.payment.transaction_id}</p>
                  </div>
                )}
                
                {ride.status === 'CANCELLED' && 
                 ride.payment.payment_status === 'SUCCESS' && 
                 ride.payment.refund_status === 'NONE' && (
                  <div className="mt-4 pt-4 border-t border-gray-800 space-y-3">
                    <div className={`p-3 rounded-lg text-xs flex items-start gap-2 ${ride.cancel_reason?.toLowerCase().includes('student') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                      <div>
                        <p className="font-bold uppercase tracking-tight">Recommendation</p>
                        <p className="opacity-80">
                          {ride.cancel_reason?.toLowerCase().includes('student') 
                            ? "Student cancelled. You can keep the advance fee as a penalty." 
                            : "Driver or system cancelled. Refunding the student is recommended."}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <RefundButton paymentId={ride.payment.id} />
                      {ride.cancel_reason?.toLowerCase().includes('student') && (
                        <p className="text-[10px] text-gray-600 text-center italic">
                          If you choose not to refund, the advance will be recorded as revenue.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
