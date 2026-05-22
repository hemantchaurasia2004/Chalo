"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Database or System Error:", error);
  }, [error]);

  const isDatabaseError = error.message.toLowerCase().includes("database") || 
                          error.message.toLowerCase().includes("prisma") ||
                          error.message.toLowerCase().includes("connection");

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
      </div>
      
      <h1 className="text-3xl font-bold text-white mb-2">
        {isDatabaseError ? "Database Connection Lost" : "Something went wrong"}
      </h1>
      
      <p className="text-gray-400 max-w-md mb-8">
        {isDatabaseError 
          ? "We are having trouble connecting to the Chalo database. This might be due to heavy traffic or a temporary maintenance break."
          : "An unexpected error occurred while processing your request. Our team has been notified."}
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition-colors shadow-lg shadow-yellow-500/20"
        >
          Try Again
        </button>
        <button
          onClick={() => window.location.href = "/admin"}
          className="px-6 py-3 bg-gray-800 text-white font-medium rounded-xl hover:bg-gray-700 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>

      <div className="mt-12 p-4 bg-[#1a1a1a] border border-gray-800 rounded-xl max-w-xl text-left">
        <p className="text-[10px] text-gray-600 uppercase font-bold mb-2 tracking-widest">Error Details</p>
        <code className="text-xs text-red-400 font-mono break-all line-clamp-2">
          {error.message || "Unknown error occurred"}
        </code>
      </div>
    </div>
  );
}
