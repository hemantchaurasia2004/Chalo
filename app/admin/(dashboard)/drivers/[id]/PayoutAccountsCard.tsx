"use client";

import { useState } from "react";
import { addPayoutAccount, verifyPayoutAccount, deletePayoutAccount } from "../../actions";

export default function PayoutAccountsCard({ driverId, accounts }: { driverId: string, accounts: any[] }) {
  const [isAdding, setIsAdding] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [accountType, setAccountType] = useState("UPI");
  const [formData, setFormData] = useState({
    upi_id: "",
    bank_name: "",
    account_holder_name: "",
    ifsc_code: "",
    is_primary: true
  });

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setIsPending(true);
    try {
      await addPayoutAccount(driverId, { ...formData, account_type: accountType });
      setIsAdding(false);
      setFormData({ upi_id: "", bank_name: "", account_holder_name: "", ifsc_code: "", is_primary: true });
    } catch (e) {
      alert("Error adding payout account.");
    }
    setIsPending(false);
  }

  async function handleVerify(id: string) {
    if (!confirm("Have you verified this account against the uploaded documents?")) return;
    setIsPending(true);
    await verifyPayoutAccount(id);
    setIsPending(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to remove this account?")) return;
    setIsPending(true);
    await deletePayoutAccount(id);
    setIsPending(false);
  }

  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 mt-6">
      <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-2">
        <h3 className="text-lg font-semibold text-white">Payout Accounts</h3>
        {!isAdding && (
          <button onClick={() => setIsAdding(true)} className="text-blue-500 hover:text-blue-400 text-sm font-medium">+ Add</button>
        )}
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="mb-6 space-y-3 bg-[#222] p-4 rounded-lg border border-gray-700">
          <div>
            <label className="text-gray-400 text-xs block mb-1">Account Type</label>
            <select className="w-full bg-[#111] border border-gray-700 rounded px-3 py-1.5 text-white text-sm" value={accountType} onChange={e => setAccountType(e.target.value)}>
              <option value="UPI">UPI ID</option>
              <option value="BANK">Bank Account</option>
            </select>
          </div>
          
          {accountType === "UPI" ? (
            <div>
              <label className="text-gray-400 text-xs block mb-1">UPI ID</label>
              <input required type="text" placeholder="example@okhdfc" className="w-full bg-[#111] border border-gray-700 rounded px-3 py-1.5 text-white text-sm" value={formData.upi_id} onChange={e => setFormData({...formData, upi_id: e.target.value})} />
            </div>
          ) : (
            <>
              <div>
                <label className="text-gray-400 text-xs block mb-1">Bank Name</label>
                <input required type="text" placeholder="HDFC Bank" className="w-full bg-[#111] border border-gray-700 rounded px-3 py-1.5 text-white text-sm" value={formData.bank_name} onChange={e => setFormData({...formData, bank_name: e.target.value})} />
              </div>
              <div>
                <label className="text-gray-400 text-xs block mb-1">Account Holder Name</label>
                <input required type="text" placeholder="Rahul Sharma" className="w-full bg-[#111] border border-gray-700 rounded px-3 py-1.5 text-white text-sm" value={formData.account_holder_name} onChange={e => setFormData({...formData, account_holder_name: e.target.value})} />
              </div>
              <div>
                <label className="text-gray-400 text-xs block mb-1">IFSC Code</label>
                <input required type="text" placeholder="HDFC0001234" className="w-full bg-[#111] border border-gray-700 rounded px-3 py-1.5 text-white text-sm uppercase" value={formData.ifsc_code} onChange={e => setFormData({...formData, ifsc_code: e.target.value.toUpperCase()})} />
              </div>
            </>
          )}

          <div className="flex gap-2 pt-2">
            <button type="submit" disabled={isPending} className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-sm font-medium disabled:opacity-50">Save</button>
            <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm font-medium">Cancel</button>
          </div>
        </form>
      )}

      {accounts.length === 0 && !isAdding ? (
        <p className="text-gray-500 text-sm">No payout accounts configured.</p>
      ) : (
        <div className="space-y-3">
          {accounts.map(acc => (
            <div key={acc.id} className="bg-[#222] border border-gray-800 rounded-lg p-3 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-medium text-sm">{acc.account_type === 'UPI' ? 'UPI Account' : 'Bank Account'}</span>
                  {acc.is_primary && <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded uppercase font-bold tracking-wider">Primary</span>}
                  {acc.is_verified ? (
                     <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded uppercase font-bold tracking-wider">Verified</span>
                  ) : (
                     <span className="text-[10px] bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded uppercase font-bold tracking-wider">Unverified</span>
                  )}
                </div>
                <div className="text-xs text-gray-400">
                  {acc.account_type === 'UPI' ? (
                    <p>UPI ID: <span className="text-gray-300">{acc.upi_id}</span></p>
                  ) : (
                    <>
                      <p>Bank: <span className="text-gray-300">{acc.bank_name}</span></p>
                      <p>Holder: <span className="text-gray-300">{acc.account_holder_name}</span></p>
                      <p>IFSC: <span className="text-gray-300">{acc.ifsc_code}</span></p>
                    </>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                {!acc.is_verified && (
                  <button onClick={() => handleVerify(acc.id)} disabled={isPending} className="text-xs text-green-500 hover:text-green-400 font-medium bg-green-500/10 px-2 py-1 rounded">Verify</button>
                )}
                <button onClick={() => handleDelete(acc.id)} disabled={isPending} className="text-xs text-red-500 hover:text-red-400 font-medium bg-red-500/10 px-2 py-1 rounded">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
