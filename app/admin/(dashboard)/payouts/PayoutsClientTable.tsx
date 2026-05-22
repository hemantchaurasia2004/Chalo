"use client";

import { useState } from "react";
import { processPayout } from "../actions";

export default function PayoutsClientTable({ payoutsArray }: { payoutsArray: any[] }) {
  const [isPending, setIsPending] = useState(false);

  async function handleProcessPayout(driverId: string, earningIds: string[], amount: number, accountId: string) {
    if(!confirm(`Initiate payout of ₹${amount} to this driver?`)) return;
    setIsPending(true);
    try {
      await processPayout(driverId, earningIds, amount, accountId);
    } catch(e) {
      alert("Error processing payout.");
    }
    setIsPending(false);
  }

  async function handleProcessAll() {
    const validPayouts = payoutsArray.filter(p => p.driver.payout_accounts[0]?.is_verified);
    
    if (validPayouts.length === 0) {
      alert("No drivers with verified payout accounts found.");
      return;
    }

    if (!confirm(`Are you sure you want to process payouts for ${validPayouts.length} drivers?\n\nTotal amount: ₹${validPayouts.reduce((sum, p) => sum + p.totalNet, 0).toLocaleString()}`)) {
      return;
    }

    setIsPending(true);
    let successCount = 0;
    let failCount = 0;

    for (const payout of validPayouts) {
      const primaryAcc = payout.driver.payout_accounts[0];
      try {
        await processPayout(payout.driver.id, payout.earningIds, payout.totalNet, primaryAcc.id);
        successCount++;
      } catch (e) {
        console.error(`Failed to process payout for ${payout.driver.phone}:`, e);
        failCount++;
      }
    }

    alert(`Batch processing complete!\n\n✅ Successfully initiated: ${successCount}\n❌ Failed: ${failCount}`);
    setIsPending(false);
  }

  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-gray-800 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Pending Settlements</h3>
        <button 
          onClick={handleProcessAll}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm rounded-lg transition-colors disabled:opacity-50"
          disabled={isPending || payoutsArray.length === 0}
        >
          {isPending ? "Processing..." : "Process All Valid Payouts"}
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-[#222222] text-xs uppercase font-semibold text-gray-500">
            <tr>
              <th className="px-6 py-4">Driver</th>
              <th className="px-6 py-4">Unsettled Rides</th>
              <th className="px-6 py-4">Amount Due</th>
              <th className="px-6 py-4">Primary Account</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {payoutsArray.map((payout) => {
              const primaryAcc = payout.driver.payout_accounts[0];
              return (
                <tr key={payout.driver.id} className="hover:bg-[#222222]/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-white font-medium">{payout.driver.name || "Unknown"}</p>
                    <p className="text-xs text-gray-500">{payout.driver.phone}</p>
                  </td>
                  <td className="px-6 py-4 text-white">{payout.rideCount} rides</td>
                  <td className="px-6 py-4 text-lg font-semibold text-white">₹{payout.totalNet.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    {primaryAcc ? (
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-white">{primaryAcc.account_type === 'UPI' ? primaryAcc.upi_id : primaryAcc.bank_name}</span>
                        <span className={`text-xs ${primaryAcc.is_verified ? 'text-green-500' : 'text-yellow-500'}`}>
                          {primaryAcc.is_verified ? 'Verified Account' : 'Unverified Account'}
                        </span>
                      </div>
                    ) : (
                      <span className="text-red-500 text-xs font-medium">No Account Configured</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => handleProcessPayout(payout.driver.id, payout.earningIds, payout.totalNet, primaryAcc?.id)}
                      className="px-3 py-1 bg-blue-600/20 text-blue-500 hover:bg-blue-600/40 font-medium text-xs rounded transition-colors disabled:opacity-50"
                      disabled={!primaryAcc?.is_verified || isPending}
                    >
                      Initiate Payout
                    </button>
                  </td>
                </tr>
              );
            })}
            {payoutsArray.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No pending payouts. All drivers are settled.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
