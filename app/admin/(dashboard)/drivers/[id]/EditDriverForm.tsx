"use client";

import { useState } from "react";
import { updateDriver } from "../../actions";

export default function EditDriverForm({ driver }: { driver: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState({
    name: driver.name || "",
    phone: driver.phone || "",
    vehicle_number: driver.vehicle_number || "",
    address_line1: driver.address_line1 || "",
    city: driver.city || "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsPending(true);
    try {
      await updateDriver(driver.id, formData);
      setIsEditing(false);
    } catch (e) {
      alert("Error updating driver.");
    }
    setIsPending(false);
  }

  if (!isEditing) {
    return (
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
        <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-2">
          <h3 className="text-lg font-semibold text-white">Personal Details</h3>
          <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:text-blue-400 text-sm font-medium">Edit</button>
        </div>
        <div className="space-y-3 text-sm">
          <div><span className="text-gray-500 block">Name</span><span className="text-white font-medium">{driver.name || 'Not provided'}</span></div>
          <div><span className="text-gray-500 block">Phone Number</span><span className="text-white font-medium">{driver.phone}</span></div>
          <div><span className="text-gray-500 block">Vehicle Number</span><span className="text-white font-medium">{driver.vehicle_number || 'Not provided'}</span></div>
          <div><span className="text-gray-500 block">Address</span><span className="text-white font-medium">{[driver.address_line1, driver.city].filter(Boolean).join(", ") || 'Not provided'}</span></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1a1a] border border-blue-900/50 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-800 pb-2">Edit Details</h3>
      <form onSubmit={handleSubmit} className="space-y-3 text-sm">
        <div>
          <label className="text-gray-500 block mb-1">Name</label>
          <input className="w-full bg-[#222] border border-gray-700 rounded px-3 py-1.5 text-white" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
        </div>
        <div>
          <label className="text-gray-500 block mb-1">Phone</label>
          <input className="w-full bg-[#222] border border-gray-700 rounded px-3 py-1.5 text-white" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
        </div>
        <div>
          <label className="text-gray-500 block mb-1">Vehicle Number</label>
          <input className="w-full bg-[#222] border border-gray-700 rounded px-3 py-1.5 text-white" value={formData.vehicle_number} onChange={e => setFormData({...formData, vehicle_number: e.target.value})} />
        </div>
        <div className="flex gap-2 pt-2">
          <button type="submit" disabled={isPending} className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded font-medium disabled:opacity-50">Save</button>
          <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded font-medium">Cancel</button>
        </div>
      </form>
    </div>
  );
}
