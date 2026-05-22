"use client";

import { useState } from "react";
import { submitOnboarding } from "./actions";

export default function OnboardingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const result = await submitOnboarding(formData);

    if (result.success) {
      setSuccess(true);
    } else {
      setErrorMsg(result.error || "An unknown error occurred.");
    }
    setIsSubmitting(false);
  }

  if (success) {
    return (
      <div className="bg-green-50 text-green-800 p-8 rounded-2xl text-center border border-green-200 shadow-sm max-w-lg mx-auto mt-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 text-3xl">✓</div>
        <h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
        <p className="text-green-700">Your documents have been securely uploaded to our system. Our admin team will review your profile shortly.</p>
        <p className="text-sm mt-6 text-green-600 font-medium">We will contact you via WhatsApp or SMS once verified.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto space-y-8 mt-8">
      {errorMsg && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-200">
          {errorMsg}
        </div>
      )}

      {/* Section 1: Basic Info */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 border-b pb-2">1. Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
            <input name="name" type="text" required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-chalo-green focus:border-chalo-green outline-none transition-all" placeholder="Rahul Sharma" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
            <input name="phone" type="tel" required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-chalo-green focus:border-chalo-green outline-none transition-all" placeholder="+91..." />
          </div>
        </div>
        {/**<div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Profile Photo</label>
          <input name="profile_file" type="file" accept="image/*" required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer" />
        </div>**/}
      </div>

      {/* Section 2: Vehicle Info */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 border-b pb-2">2. Vehicle Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Vehicle Registration Number (RC)</label>
            <input name="vehicle_number" type="text" required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-chalo-green focus:border-chalo-green outline-none transition-all uppercase" placeholder="MH 01 AB 1234" />
          </div>
          {/* <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Upload Vehicle RC</label>
            <input name="rc_file" type="file" accept="image/*,application/pdf" required className="w-full border border-gray-300 bg-white rounded-lg px-3 py-2 text-sm text-gray-600 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-700 cursor-pointer" />
          </div> */}
        </div>
      </div>

      {/* Section 3: KYC Documents */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 border-b pb-2">3. Identity Verification</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Aadhaar Number</label>
            <input name="aadhaar_number" type="text" maxLength={12} pattern="\d{12}" required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-chalo-green focus:border-chalo-green outline-none transition-all" placeholder="123456789012" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Upload Aadhaar (Back Side with QR)</label>
            <input name="aadhaar_file" type="file" accept="image/*" required className="w-full border border-gray-300 bg-white rounded-lg px-3 py-2 text-sm text-gray-600 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-700 cursor-pointer" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Driving License Number</label>
            <input name="driving_license_number" type="text" required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-chalo-green focus:border-chalo-green outline-none transition-all uppercase" placeholder="DL-1420110012345" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Upload Driving License</label>
            <input name="dl_file" type="file" accept="image/*" required className="w-full border border-gray-300 bg-white rounded-lg px-3 py-2 text-sm text-gray-600 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-700 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Section 4: Payout Documents (Optional) */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 border-b pb-2">4. Payout Details (Optional)</h3>
        <p className="text-xs text-gray-500 mb-2">Upload these now to get verified for payouts faster.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Upload UPI QR Code</label>
            <input name="upi_file" type="file" accept="image/*" className="w-full border border-gray-300 bg-white rounded-lg px-3 py-2 text-sm text-gray-600 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-700 cursor-pointer" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Upload Bank Proof (Cheque/Passbook)</label>
            <input name="bank_file" type="file" accept="image/*,application/pdf" className="w-full border border-gray-300 bg-white rounded-lg px-3 py-2 text-sm text-gray-600 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-700 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-[#25D366] hover:bg-[#1DA851] text-white text-lg font-bold rounded-xl transition-colors shadow-lg shadow-green-500/30 disabled:opacity-70 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            Uploading Documents...
          </>
        ) : (
          "Submit Application"
        )}
      </button>
      <p className="text-center text-xs text-gray-500 mt-4">By submitting, you agree to Chalo's driver terms and conditions. Your data is encrypted and securely stored.</p>
    </form>
  );
}
