"use client";

import { useState } from "react";
import { approveKyc, rejectKyc, deleteDriver } from "../actions";

export default function DriversClientTable({ initialDrivers }: { initialDrivers: any[] }) {
  const [search, setSearch] = useState("");
  const [isPending, setIsPending] = useState(false);

  const filtered = initialDrivers.filter(d => 
    (d.name?.toLowerCase() || "").includes(search.toLowerCase()) ||
    d.phone.includes(search)
  );

  async function handleApprove(id: string) {
    if(!confirm("Are you sure you want to approve this driver's KYC?")) return;
    setIsPending(true);
    try {
      await approveKyc(id);
    } catch (e) {
      alert("Error approving KYC.");
    }
    setIsPending(false);
  }

  async function handleReject(id: string) {
    const reason = prompt("Enter reason for rejection:");
    if (!reason) return;
    setIsPending(true);
    try {
      await rejectKyc(id, reason);
    } catch (e) {
      alert("Error rejecting KYC.");
    }
    setIsPending(false);
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`⚠️ WARNING: Are you sure you want to delete driver ${name || id}?\n\nThis will permanently delete all associated rides, earnings, and documents. This action cannot be undone.`)) return;
    setIsPending(true);
    try {
      await deleteDriver(id);
    } catch (e) {
      alert("Error deleting driver.");
    }
    setIsPending(false);
  }

  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl overflow-hidden flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <input 
          type="text" 
          placeholder="🔍 Search drivers by name or phone number..." 
          className="w-full bg-[#222222] border border-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-500 transition-colors"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-[#222222] text-xs uppercase font-semibold text-gray-500">
            <tr>
              <th className="px-6 py-4">Driver</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Onboarding</th>
              <th className="px-6 py-4">KYC Status</th>
              <th className="px-6 py-4">Rating</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filtered.map((driver) => {
              const kycStatus = driver.kyc?.kyc_status || 'NOT_SUBMITTED';
              return (
                <tr key={driver.id} className="hover:bg-[#222222]/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-white font-medium">{driver.name || "Unknown"}</p>
                    <p className="text-xs text-gray-500">{driver.phone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                      ${driver.status === 'ONLINE' ? 'bg-green-500/10 text-green-500' : ''}
                      ${driver.status === 'OFFLINE' ? 'bg-gray-500/10 text-gray-400' : ''}
                      ${driver.status === 'INACTIVE' ? 'bg-yellow-500/10 text-yellow-500' : ''}
                      ${driver.status === 'SUSPENDED' ? 'bg-red-500/10 text-red-500' : ''}
                    `}>
                      {driver.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                      ${driver.onboarding_status === 'VERIFIED' ? 'bg-green-500/10 text-green-500' : ''}
                      ${driver.onboarding_status === 'REJECTED' ? 'bg-red-500/10 text-red-500' : ''}
                      ${driver.onboarding_status === 'UNDER_REVIEW' ? 'bg-blue-500/10 text-blue-500' : ''}
                      ${driver.onboarding_status === 'SUBMITTED' ? 'bg-yellow-500/10 text-yellow-500' : ''}
                    `}>
                      {driver.onboarding_status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                      ${kycStatus === 'VERIFIED' || kycStatus === 'AUTO_VERIFIED' ? 'bg-green-500/10 text-green-500' : ''}
                      ${kycStatus === 'REJECTED' ? 'bg-red-500/10 text-red-500' : ''}
                      ${kycStatus === 'MANUAL_REVIEW' || kycStatus === 'PENDING' ? 'bg-blue-500/10 text-blue-500' : 'bg-gray-500/10 text-gray-500'}
                    `}>
                      {kycStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white">
                    ⭐ {driver.rating?.toString() || "N/A"}
                    <span className="text-[10px] text-gray-500 ml-1">({driver.total_ratings || 0})</span>
                  </td>
                  <td className="px-6 py-4">
                    {driver.onboarding_status === 'UNDER_REVIEW' || driver.onboarding_status === 'SUBMITTED' ? (
                      <div className="flex flex-col space-y-2">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleApprove(driver.id)} 
                            disabled={isPending}
                            className="px-3 py-1 bg-green-600/20 text-green-500 hover:bg-green-600/40 font-medium text-xs rounded transition-colors disabled:opacity-50"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleReject(driver.id)} 
                            disabled={isPending}
                            className="px-3 py-1 bg-red-600/20 text-red-500 hover:bg-red-600/40 font-medium text-xs rounded transition-colors disabled:opacity-50"
                          >
                            Reject
                          </button>
                        </div>
                        <a href={`/admin/drivers/${driver.id}`} className="text-blue-500 hover:text-blue-400 font-medium text-xs w-fit">
                          Review Documents &rarr;
                        </a>
                      </div>
                    ) : (
                      <a href={`/admin/drivers/${driver.id}`} className="text-blue-500 hover:text-blue-400 font-medium text-xs w-fit">
                        View Details &rarr;
                      </a>
                    )}
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No drivers found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
