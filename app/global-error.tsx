"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, sans-serif" }}>
          <div style={{ textAlign: "center", maxWidth: 400 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Something went wrong</h2>
            <p style={{ fontSize: 14, color: "#666", marginBottom: 24 }}>{error.message}</p>
            <button
              onClick={reset}
              style={{ padding: "12px 24px", borderRadius: 12, background: "#0F172A", color: "#fff", fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer" }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
