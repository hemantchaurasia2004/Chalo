"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-chalo-bg px-6">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold text-chalo-navy mb-3">Something went wrong</h2>
        <p className="text-sm text-chalo-slate/60 mb-6">{error.message}</p>
        <button
          onClick={reset}
          className="px-6 py-3 rounded-xl bg-chalo-navy text-white text-sm font-semibold
                     hover:bg-chalo-navy/90 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
