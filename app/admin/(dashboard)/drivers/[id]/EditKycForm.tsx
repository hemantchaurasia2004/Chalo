"use client";

import { useState } from "react";
import { updateKycData } from "../../actions";

export default function EditKycForm({ driverId, kyc }: { driverId: string, kyc: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState({
    aadhaar_last4: kyc?.aadhaar_last4 || "",
    aadhaar_qr_parsed_name: kyc?.aadhaar_qr_parsed_name || "",
    driving_license_number: kyc?.driving_license_number || "",
    vehicle_rc_number: kyc?.vehicle_rc_number || "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsPending(true);
    try {
      await updateKycData(driverId, formData);
      setIsEditing(false);
    } catch (e) {
      alert("Error updating KYC data.");
    }
    setIsPending(false);
  }

  if (!isEditing) {
    return (
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 mt-6">
        <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-2">
          <h3 className="text-lg font-semibold text-white">Extracted KYC Data</h3>
          <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:text-blue-400 text-sm font-medium">Edit</button>
        </div>
        {kyc ? (
          <div className="space-y-3 text-sm">
            <div><span className="text-gray-500 block">Aadhaar Last 4</span><span className="text-white font-medium">{kyc.aadhaar_last4 || '-'}</span></div>
            <div><span className="text-gray-500 block">Parsed Name (Aadhaar QR)</span><span className="text-white font-medium">{kyc.aadhaar_qr_parsed_name || '-'}</span></div>
            <div><span className="text-gray-500 block">DL Number</span><span className="text-white font-medium">{kyc.driving_license_number || '-'}</span></div>
            <div><span className="text-gray-500 block">RC Number</span><span className="text-white font-medium">{kyc.vehicle_rc_number || '-'}</span></div>
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No KYC data submitted yet.</p>
        )}
      </div>
    );
  }

  return (
    <div className="bg-[#1a1a1a] border border-blue-900/50 rounded-xl p-6 mt-6">
      <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-800 pb-2">Edit KYC Data</h3>
      <form onSubmit={handleSubmit} className="space-y-3 text-sm">
        <div>
          <label className="text-gray-500 block mb-1">Aadhaar Last 4</label>
          <input className="w-full bg-[#222] border border-gray-700 rounded px-3 py-1.5 text-white" maxLength={4} value={formData.aadhaar_last4} onChange={e => setFormData({...formData, aadhaar_last4: e.target.value})} />
        </div>
        <div>
          <label className="text-gray-500 block mb-1">Aadhaar Name</label>
          <input className="w-full bg-[#222] border border-gray-700 rounded px-3 py-1.5 text-white" value={formData.aadhaar_qr_parsed_name} onChange={e => setFormData({...formData, aadhaar_qr_parsed_name: e.target.value})} />
        </div>
        <div>
          <label className="text-gray-500 block mb-1">Driving License No.</label>
          <input className="w-full bg-[#222] border border-gray-700 rounded px-3 py-1.5 text-white" value={formData.driving_license_number} onChange={e => setFormData({...formData, driving_license_number: e.target.value})} />
        </div>
        <div>
          <label className="text-gray-500 block mb-1">Vehicle RC No.</label>
          <input className="w-full bg-[#222] border border-gray-700 rounded px-3 py-1.5 text-white" value={formData.vehicle_rc_number} onChange={e => setFormData({...formData, vehicle_rc_number: e.target.value})} />
        </div>
        <div className="flex gap-2 pt-2">
          <button type="submit" disabled={isPending} className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded font-medium disabled:opacity-50">Save</button>
          <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded font-medium">Cancel</button>
        </div>
      </form>
    </div>
  );
}
