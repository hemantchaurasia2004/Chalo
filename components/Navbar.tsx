"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-100"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-xl font-bold tracking-tight text-chalo-navy">
          Chalo<span className="text-chalo-green">.</span>
        </a>
        <a
          href="#waitlist"
          className="px-5 py-2 rounded-full bg-chalo-navy text-white text-sm font-medium
                     hover:bg-chalo-navy/90 transition-colors duration-200"
        >
          Join Waitlist
        </a>
      </div>
    </motion.nav>
  );
}
