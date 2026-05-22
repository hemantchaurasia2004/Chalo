"use client";

import { useState } from "react";
import { approveKyc, rejectKyc } from "../../actions";

export default function KycActions({ driverId }: { driverId: string }) {
  const [isPending, setIsPending] = useState(false);

  async function handleApprove() {
    if(!confirm("Verify all documents and approve driver?")) return;
    setIsPending(true);
    try {
      await approveKyc(driverId);
    } catch (e) {
      alert("Error approving driver.");
    }
    setIsPending(false);
  }

  async function handleReject() {
    const reason = prompt("Enter reason for rejection (this will be shown to the driver):");
    if (!reason) return;
    setIsPending(true);
    try {
      await rejectKyc(driverId, reason);
    } catch (e) {
      alert("Error rejecting driver.");
    }
    setIsPending(false);
  }

  return (
    <div className="flex space-x-3">
      <button 
        onClick={handleReject}
        disabled={isPending}
        className="px-6 py-2.5 bg-red-600/10 hover:bg-red-600/20 text-red-500 font-semibold rounded-lg transition-colors border border-red-500/20 disabled:opacity-50"
      >
        Reject
      </button>
      <button 
        onClick={handleApprove}
        disabled={isPending}
        className="px-6 py-2.5 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-green-900/20 disabled:opacity-50"
      >
        {isPending ? "Processing..." : "Approve Driver"}
      </button>
    </div>
  );
}
