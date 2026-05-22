"use client";

import { useState } from "react";
import { uploadDocument } from "../../actions";

export default function AddDocumentForm({ driverId }: { driverId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [docType, setDocType] = useState("AADHAAR_QR");
  const [file, setFile] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return alert("Please select a file to upload.");
    
    setIsPending(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      await uploadDocument(driverId, docType, formData);
      setIsOpen(false);
      setFile(null);
    } catch (e) {
      alert("Error uploading document.");
    }
    setIsPending(false);
  }

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-[#222] hover:bg-[#333] border border-gray-700 text-gray-300 text-sm font-medium rounded-lg transition-colors w-full border-dashed"
      >
        + Upload New Document
      </button>
    );
  }

  return (
    <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-4">
      <h4 className="text-white text-sm font-semibold mb-3">Upload Document File</h4>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="text-gray-500 text-xs block mb-1">Document Type</label>
          <select 
            className="w-full bg-[#222] border border-gray-700 rounded px-3 py-1.5 text-white text-sm"
            value={docType}
            onChange={e => setDocType(e.target.value)}
          >
            <option value="AADHAAR_QR">Aadhaar QR</option>
            <option value="DRIVING_LICENSE">Driving License</option>
            <option value="UPI_QR">UPI QR</option>
            <option value="BANK_PROOF">Bank Proof</option>
            <option value="PROFILE_PHOTO">Profile Photo</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
        <div>
          <label className="text-gray-500 text-xs block mb-1">Select File (Image or PDF)</label>
          <input 
            type="file" 
            required
            accept="image/*,application/pdf"
            className="w-full bg-[#222] border border-gray-700 rounded px-3 py-1.5 text-white text-sm file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500" 
            onChange={e => setFile(e.target.files?.[0] || null)} 
          />
        </div>
        <div className="flex gap-2 pt-2 text-sm">
          <button type="submit" disabled={isPending || !file} className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded font-medium disabled:opacity-50">
            {isPending ? "Uploading..." : "Upload Document"}
          </button>
          <button type="button" onClick={() => { setIsOpen(false); setFile(null); }} className="px-4 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded font-medium">Cancel</button>
        </div>
      </form>
    </div>
  );
}
