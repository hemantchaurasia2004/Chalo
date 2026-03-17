import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-chalo-bg px-6">
      <div className="text-center max-w-md">
        <h2 className="text-5xl font-bold text-chalo-navy mb-3">404</h2>
        <p className="text-sm text-chalo-slate/60 mb-6">This page doesn&apos;t exist.</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-xl bg-chalo-navy text-white text-sm font-semibold
                     hover:bg-chalo-navy/90 transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
