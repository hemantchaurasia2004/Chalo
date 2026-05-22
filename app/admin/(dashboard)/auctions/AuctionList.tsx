"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AuctionList({ initialAuctions }: { initialAuctions: any[] }) {
  const [auctions, setAuctions] = useState(initialAuctions);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="animate-pulse bg-[#1a1a1a] h-64 rounded-2xl border border-gray-800" />;
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {auctions.map((ride) => {
        const lowestBid = ride.bids[0];
        const timeElapsed = Math.floor((Date.now() - new Date(ride.created_at).getTime()) / 1000);
        const auctionDuration = 120; // 2 minutes
        const timeLeft = Math.max(0, auctionDuration - timeElapsed);

        return (
          <div key={ride.id} className="bg-[#1a1a1a] border border-gray-800 rounded-2xl overflow-hidden shadow-xl flex flex-col">
            <div className="p-6 border-b border-gray-800 flex justify-between items-start bg-gradient-to-r from-yellow-500/5 to-transparent">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight">#{ride.id.slice(0, 8)}</h3>
                </div>
                <p className="text-xs text-gray-500 font-mono">From: {ride.pickup || 'Unknown'}</p>
                <p className="text-sm font-bold text-white">To: {ride.destination}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Time Remaining</p>
                <p className={`text-xl font-mono font-bold ${timeLeft < 30 ? 'text-red-500' : 'text-yellow-500'}`}>
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </p>
              </div>
            </div>

            <div className="flex-1 p-6 space-y-4">
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-3">Live Bids ({ride.bids.length})</p>
                <div className="space-y-2">
                  {ride.bids.length > 0 ? (
                    ride.bids.map((bid: any, idx: number) => (
                      <div key={bid.id} className={`flex items-center justify-between p-3 rounded-xl border ${idx === 0 ? 'bg-green-500/10 border-green-500/30 ring-1 ring-green-500/20' : 'bg-[#222] border-gray-800 text-gray-500'}`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${idx === 0 ? 'bg-green-500 text-black' : 'bg-gray-700 text-gray-300'}`}>
                            {idx + 1}
                          </div>
                          <div className="flex flex-col">
                            <span className={`text-sm font-bold ${idx === 0 ? 'text-white' : ''}`}>{bid.driver.name || 'Unknown'}</span>
                            <span className="text-[10px] opacity-70">{bid.driver.phone}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`text-lg font-mono font-black ${idx === 0 ? 'text-green-400' : ''}`}>₹{bid.bid_price.toString()}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 bg-[#222]/50 border border-dashed border-gray-800 rounded-xl">
                      <p className="text-sm text-gray-600">Waiting for first bid...</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#222]/30 border-t border-gray-800 flex justify-between items-center">
               <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <span className="text-xs text-gray-400 font-medium">{ride.student.phone}</span>
               </div>
               <Link href={`/admin/rides/${ride.id}`} className="text-xs font-bold text-yellow-500 hover:underline">
                 Full Details →
               </Link>
            </div>
          </div>
        );
      })}

      {auctions.length === 0 && (
        <div className="col-span-full py-20 flex flex-col items-center justify-center bg-[#1a1a1a] border border-dashed border-gray-800 rounded-3xl">
          <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mb-4 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-1">No Active Auctions</h3>
          <p className="text-gray-500 text-sm">When a student requests a ride, it will appear here live.</p>
        </div>
      )}
    </div>
  );
}
