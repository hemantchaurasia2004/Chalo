"use client";

import { useState } from "react";
import { handleLoginAction } from "./actions";

// Let's create a server action for login to avoid client-side crypto issues
export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const success = await handleLoginAction(password);
      
      if (!success) {
        setError("Invalid administrator password.");
      }
      // Note: redirect is handled in the server action if successful
    } catch (err) {
      // If redirect happens, this catch might be triggered with a special error
      // But Next.js handles it. If it's a real error, we show it.
      if (err instanceof Error && err.message === "NEXT_REDIRECT") {
        return;
      }
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tighter text-yellow-500 mb-2">Chalo Admin</h1>
          <p className="text-gray-500 text-sm">Secure Management Portal</p>
        </div>

        <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                Administrator Password
              </label>
              <input
                type="password"
                required
                className="w-full bg-[#222222] border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-500 transition-colors"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-red-500 text-xs font-medium bg-red-500/10 p-3 rounded-lg border border-red-500/20 text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-xl transition-all shadow-lg shadow-yellow-500/20 disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Access Dashboard"}
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-xs text-gray-600">
          System Access Logged • Authorized Personnel Only
        </p>
      </div>
    </div>
  );
}
