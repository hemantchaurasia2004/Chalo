"use client";

import { useState } from "react";
import Link from "next/link";
import { resolveDispute } from "../actions";

export default function DisputesClientTable({ rides }: { rides: any[] }) {
  const [isPending, setIsPending] = useState(false);
  const [resolutionData, setResolutionData] = useState<{ id: string, notes: string } | null>(null);

  async function handleResolve(resolution: "COMPLETED" | "CANCELLED") {
    if (!resolutionData) return;
    setIsPending(true);
    try {
      await resolveDispute(resolutionData.id, resolution, resolutionData.notes);
      setResolutionData(null);
    } catch (e) {
      alert("Error resolving dispute.");
    }
    setIsPending(false);
  }

  return (
    <div className="space-y-6">
      {resolutionData && (
        <div className="bg-[#1a1a1a] border border-blue-500/30 rounded-xl p-6 shadow-2xl animate-in fade-in slide-in-from-top-4">
          <h3 className="text-lg font-bold text-white mb-2">Resolve Dispute: #{resolutionData.id.slice(0, 8)}</h3>
          <p className="text-sm text-gray-400 mb-4">Please provide a brief reason for your decision. This will be logged in the audit trail.</p>
          
          <textarea 
            className="w-full bg-[#222] border border-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-500 mb-4 min-h-[100px]"
            placeholder="e.g., Student confirmed payment was made, but app failed to sync."
            value={resolutionData.notes}
            onChange={e => setResolutionData({...resolutionData, notes: e.target.value})}
          />

          <div className="flex gap-3">
            <button 
              disabled={isPending || !resolutionData.notes} 
              onClick={() => handleResolve("COMPLETED")}
              className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-2 rounded-lg transition-all disabled:opacity-50"
            >
              Mark as COMPLETED
            </button>
            <button 
              disabled={isPending || !resolutionData.notes} 
              onClick={() => handleResolve("CANCELLED")}
              className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-2 rounded-lg transition-all disabled:opacity-50"
            >
              Mark as CANCELLED
            </button>
            <button 
              onClick={() => setResolutionData(null)}
              className="px-6 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-[#222] text-xs uppercase font-bold text-gray-500">
            <tr>
              <th className="px-6 py-4">Ride ID</th>
              <th className="px-6 py-4">Student & Driver</th>
              <th className="px-6 py-4">Journey</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {rides.map((ride) => (
              <tr key={ride.id} className="hover:bg-[#222]/50 transition-colors">
                <td className="px-6 py-4 font-mono text-xs text-blue-500">
                  <Link href={`/admin/rides/${ride.id}`} className="hover:underline">
                    {ride.id.slice(0, 8)}
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-white font-medium">S: {ride.student.phone}</span>
                    <span className="text-xs text-gray-500">D: {ride.driver?.name || 'Unassigned'}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="max-w-[200px] truncate text-xs text-gray-300">
                    To: {ride.destination}
                  </div>
                </td>
                <td className="px-6 py-4 text-white font-bold">
                  ₹{ride.price?.toString() || '0'}
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => setResolutionData({ id: ride.id, notes: "" })}
                    className="text-xs bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 px-4 py-2 rounded-lg font-bold border border-blue-500/20 transition-all"
                  >
                    Resolve Dispute
                  </button>
                </td>
              </tr>
            ))}
            {rides.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500 italic">
                  Perfect! There are currently no disputed rides.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
