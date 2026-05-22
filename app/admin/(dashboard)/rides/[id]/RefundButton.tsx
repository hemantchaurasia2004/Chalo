"use client";

import { useState } from "react";
import { processRefund } from "../../actions";

export default function RefundButton({ paymentId }: { paymentId: string }) {
  const [isPending, setIsPending] = useState(false);

  async function handleRefund() {
    if (!confirm("Are you sure you want to refund this payment? This action cannot be undone.")) {
      return;
    }

    setIsPending(true);
    try {
      await processRefund(paymentId);
      alert("Refund processed successfully!");
    } catch (e) {
      alert("Failed to process refund. Please check logs.");
    }
    setIsPending(false);
  }

  return (
    <button
      onClick={handleRefund}
      disabled={isPending}
      className="w-full mt-4 py-2 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/20 rounded-lg text-xs font-bold transition-all disabled:opacity-50"
    >
      {isPending ? "Processing..." : "Refund Advance Fee"}
    </button>
  );
}
