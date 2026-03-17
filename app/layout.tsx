import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Chalo — Campus Rides, Simplified",
  description:
    "WhatsApp-based ride system for college campuses. Request rides, drivers bid, lowest price wins.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased text-chalo-navy">{children}</body>
    </html>
  );
}
