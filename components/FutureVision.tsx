"use client";

import { motion } from "framer-motion";

export default function FutureVision() {
  return (
    <section className="py-28 sm:py-36 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-chalo-navy via-slate-900 to-chalo-navy" />
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-chalo-green/8 blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-white/70 border border-white/10 mb-8">
            The vision
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Starting with rides.{" "}
            <span className="text-gradient bg-gradient-to-r from-chalo-green to-emerald-300">
              Building campus mobility.
            </span>
          </h2>
          <p className="mt-8 text-base sm:text-lg text-white/50 leading-relaxed max-w-xl mx-auto">
            From rides to deliveries, logistics, and more — Chalo is building
            the infrastructure for campus transportation.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
