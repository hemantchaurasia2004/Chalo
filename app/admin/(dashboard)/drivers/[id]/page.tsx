import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import KycActions from "./KycActions";
import EditDriverForm from "./EditDriverForm";
import EditKycForm from "./EditKycForm";
import AddDocumentForm from "./AddDocumentForm";
import PayoutAccountsCard from "./PayoutAccountsCard";
import DeleteDocumentButton from "./DeleteDocumentButton";
import DeleteDriverButton from "./DeleteDriverButton";

export const dynamic = "force-dynamic";

export default async function DriverDetailsPage({ params }: { params: { id: string } }) {
  const driver = await prisma.driver.findUnique({
    where: { id: params.id },
    include: {
      kyc: true,
      documents: true,
      payout_accounts: true,
    }
  });

  if (!driver) {
    notFound();
  }

  const serializedDriver = {
    ...driver,
    rating: driver.rating ? driver.rating.toNumber() : null,
  };

  const kycStatus = driver.kyc?.kyc_status || 'NOT_SUBMITTED';

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link href="/admin/drivers" className="text-blue-500 hover:text-blue-400 text-sm mb-2 inline-flex items-center">
            &larr; Back to Drivers
          </Link>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            Driver Review: {driver.name || driver.phone}
          </h1>
          <p className="text-gray-400 mt-1">ID: {driver.id}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1.5 rounded-lg text-sm font-bold uppercase tracking-wider
            ${driver.onboarding_status === 'VERIFIED' ? 'bg-green-500/20 text-green-400' : ''}
            ${driver.onboarding_status === 'REJECTED' ? 'bg-red-500/20 text-red-400' : ''}
            ${driver.onboarding_status === 'UNDER_REVIEW' ? 'bg-blue-500/20 text-blue-400' : ''}
            ${driver.onboarding_status === 'SUBMITTED' ? 'bg-yellow-500/20 text-yellow-400' : ''}
          `}>
            {driver.onboarding_status.replace("_", " ")}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Details */}
        <div className="lg:col-span-1">
          <EditDriverForm driver={serializedDriver} />
          
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 mt-6">
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-800 pb-2 flex items-center justify-between">
              Rating & Performance
              <span className="text-xs text-gray-500 font-normal">{driver.total_ratings || 0} reviews</span>
            </h3>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-4xl font-bold text-white leading-none">{serializedDriver.rating || "5.0"}</span>
              <span className="text-yellow-500 text-xl mb-1">★★★★★</span>
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Rides Today</span>
                <span className="text-white font-medium">{driver.rides_today}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Driver Cancellations</span>
                <span className="text-red-400 font-medium">{driver.driver_cancel_count}</span>
              </div>
            </div>
          </div>

          <EditKycForm driverId={driver.id} kyc={driver.kyc} />
          <PayoutAccountsCard driverId={driver.id} accounts={driver.payout_accounts || []} />
        </div>

        {/* Right Column: Documents and Actions */}
        <div className="space-y-6 lg:col-span-2">
          {/* Action Bar */}
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Manual Verification</h3>
              <p className="text-sm text-gray-400">Review the documents below to approve or reject this driver.</p>
            </div>
            {(driver.onboarding_status === 'UNDER_REVIEW' || driver.onboarding_status === 'SUBMITTED') && (
              <KycActions driverId={driver.id} />
            )}
            {driver.onboarding_status === 'VERIFIED' && (
              <span className="text-green-500 font-medium whitespace-nowrap">✓ Verified by Admin</span>
            )}
            {driver.onboarding_status === 'REJECTED' && (
              <div className="text-right whitespace-nowrap">
                <span className="text-red-500 font-medium block">✗ Rejected</span>
                <span className="text-xs text-gray-500">Reason: {driver.rejection_reason}</span>
              </div>
            )}
          </div>

          {/* Document Viewer */}
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-2">
              <h3 className="text-lg font-semibold text-white">Uploaded Documents</h3>
            </div>
            {driver.documents.length === 0 ? (
              <p className="text-gray-500 text-sm pb-6 text-center">No documents uploaded.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {driver.documents.map(doc => (
                  <div key={doc.id} className="border border-gray-800 rounded-lg overflow-hidden bg-[#222]">
                    <div className="p-3 border-b border-gray-800 flex justify-between items-center bg-[#1a1a1a]">
                      <span className="font-semibold text-sm text-gray-300">{doc.doc_type.replace(/_/g, " ")}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-500">{new Date(doc.uploaded_at).toLocaleDateString()}</span>
                        <DeleteDocumentButton docId={doc.id} />
                      </div>
                    </div>
                    <div className="aspect-[4/3] relative bg-black flex items-center justify-center p-2">
                      <img 
                        src={doc.storage_url} 
                        alt={doc.doc_type}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <AddDocumentForm driverId={driver.id} />
          </div>
        </div>
      </div>

      <DeleteDriverButton 
        driverId={driver.id} 
        driverName={driver.name || driver.phone} 
      />
    </div>
  );
}
