"use client";

import { useState } from "react";
import { createDriver } from "../../actions";
import { useRouter } from "next/navigation";

export default function NewDriverForm() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    vehicle_number: ""
  });

  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const vehicleRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/;
    const cleanVehicle = formData.vehicle_number.trim().toUpperCase().replace(/\s/g, "");

    if (!formData.phone) return setError("Phone number is required");
    if (!formData.vehicle_number) return setError("Vehicle number is required");
    if (!vehicleRegex.test(cleanVehicle)) {
      return setError("Invalid Vehicle Number format. Use standard Indian format (e.g. MH01AB1234)");
    }
    
    setIsPending(true);
    setError(null);

    const result = await createDriver({ ...formData, vehicle_number: cleanVehicle });
    
    if (result.error) {
      setError(result.error);
      setIsPending(false);
    } else if (result.success) {
      router.push(`/admin/drivers/${result.id}`);
    }
  }

  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 max-w-xl">
      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-lg flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Phone Number (Required)</label>
          <input 
            type="text" 
            required
            placeholder="+919876543210"
            className="w-full bg-[#222222] border border-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-500"
            value={formData.phone}
            onChange={e => setFormData({...formData, phone: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Full Name</label>
          <input 
            type="text" 
            className="w-full bg-[#222222] border border-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-500"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Vehicle Number (Required)</label>
          <input 
            type="text" 
            required
            placeholder="MH01AB1234"
            className="w-full bg-[#222222] border border-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-500"
            value={formData.vehicle_number}
            onChange={e => setFormData({...formData, vehicle_number: e.target.value})}
          />
        </div>
        <button 
          type="submit" 
          disabled={isPending}
          className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {isPending ? "Creating..." : "Create Driver & Proceed to KYC"}
        </button>
      </form>
    </div>
  );
}
