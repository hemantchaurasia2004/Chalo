"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteDriver, verifyAdminPassword } from "../../actions";

export default function DeleteDriverButton({ driverId, driverName }: { driverId: string, driverName: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleDelete() {
    if (!password) {
      setError("Please enter the administrator password.");
      return;
    }

    setIsDeleting(true);
    setError("");

    try {
      const isCorrect = await verifyAdminPassword(password);
      if (!isCorrect) {
        setError("Invalid password. Deletion aborted.");
        setIsDeleting(false);
        return;
      }

      await deleteDriver(driverId);
      router.push("/admin/drivers");
      router.refresh();
    } catch (e) {
      setError("Error deleting driver. Please try again.");
      setIsDeleting(false);
    }
  }

  if (showConfirm) {
    return (
      <div className="bg-red-900/10 border border-red-500/20 rounded-xl p-6 mt-12">
        <h3 className="text-lg font-bold text-red-500 mb-2">Confirm Account Deletion</h3>
        <p className="text-gray-400 text-sm mb-6">
          Are you sure you want to delete <strong>{driverName}</strong>? This will permanently remove all rides, earnings, and documents associated with this driver.
        </p>

        <div className="space-y-4 max-w-sm">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
              Enter Admin Password to Confirm
            </label>
            <input
              type="password"
              className="w-full bg-[#222222] border border-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:border-red-500 transition-colors"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isDeleting}
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs font-medium">{error}</p>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-bold transition-all disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Permanently Delete"}
            </button>
            <button
              onClick={() => { setShowConfirm(false); setPassword(""); setError(""); }}
              disabled={isDeleting}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm font-bold transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 pt-12 border-t border-gray-800">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 bg-red-900/5 border border-red-500/10 rounded-2xl">
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-bold text-gray-200">Danger Zone</h3>
          <p className="text-gray-500 text-sm mt-1">Delete this driver account and all associated data permanently.</p>
        </div>
        <button
          onClick={() => setShowConfirm(true)}
          className="px-6 py-3 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/20 rounded-xl text-sm font-bold transition-all"
        >
          Delete Driver Account
        </button>
      </div>
    </div>
  );
}
