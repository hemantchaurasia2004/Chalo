"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-chalo-bg">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-chalo-green/10 to-emerald-100/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-amber-100/30 to-yellow-50/20 blur-3xl" />

        {/* Subtle road lines */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full opacity-[0.04]"
          viewBox="0 0 1200 200"
          fill="none"
        >
          <path
            d="M0 150 Q300 80 600 150 T1200 150"
            stroke="currentColor"
            strokeWidth="3"
            className="text-chalo-navy"
          />
          <path
            d="M0 170 Q300 100 600 170 T1200 170"
            stroke="currentColor"
            strokeWidth="2"
            className="text-chalo-navy"
            strokeDasharray="20 15"
          />
        </svg>

        {/* Auto silhouette */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.06 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="absolute bottom-20 right-[10%] text-chalo-navy"
        >
          <svg width="200" height="120" viewBox="0 0 200 120" fill="currentColor">
            <rect x="30" y="40" width="140" height="50" rx="20" />
            <rect x="10" y="60" width="180" height="30" rx="10" />
            <circle cx="55" cy="95" r="15" />
            <circle cx="145" cy="95" r="15" />
            <rect x="60" y="30" width="80" height="35" rx="15" />
          </svg>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 rounded-full text-sm font-medium bg-chalo-green/10 text-chalo-dark border border-chalo-green/20">
            Campus rides, reimagined
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1]"
        >
          Chalo{" "}
          <span className="text-gradient bg-gradient-to-r from-chalo-green to-emerald-400">
            Bhaiya!
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="mt-6 text-lg sm:text-xl text-chalo-slate/80 max-w-xl mx-auto leading-relaxed"
        >
          Getting a ride from campus shouldn&apos;t be this hard.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
          className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <a
            href="#waitlist"
            className="group relative px-8 py-3.5 rounded-full bg-chalo-navy text-white font-semibold text-base
                       hover:shadow-lg hover:shadow-chalo-navy/20 transition-all duration-300 hover:-translate-y-0.5"
          >
            Join Early Access
            <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
          <a
            href="#story"
            className="px-8 py-3.5 rounded-full border border-gray-200 text-chalo-slate font-medium text-base
                       hover:border-gray-300 hover:bg-white transition-all duration-200"
          >
            See How It Works
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-gray-300 flex items-start justify-center p-1.5"
        >
          <div className="w-1.5 h-2.5 rounded-full bg-gray-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
