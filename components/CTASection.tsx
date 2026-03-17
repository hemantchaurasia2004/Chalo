"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function CTASection() {
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="waitlist" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-chalo-green/5 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-chalo-navy mb-4">
            Be the First to Use Chalo
          </h2>
          <p className="text-chalo-slate/60 mb-10 max-w-md mx-auto">
            Join the waitlist and get early access when we launch on your campus.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1 relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium pointer-events-none">
                  +91
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone number"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-gray-50/50
                             text-chalo-navy placeholder:text-gray-400 text-sm
                             focus:outline-none focus:ring-2 focus:ring-chalo-green/30 focus:border-chalo-green/50
                             transition-all duration-200"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-4 rounded-2xl bg-chalo-navy text-white font-semibold text-sm
                           hover:bg-chalo-navy/90 hover:shadow-xl hover:shadow-chalo-navy/20
                           hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 whitespace-nowrap"
              >
                Join Waitlist &rarr;
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-chalo-green/10 text-chalo-dark font-semibold"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              You&apos;re on the list! We&apos;ll reach out soon.
            </motion.div>
          )}

          <p className="mt-5 text-xs text-gray-400">
            No spam. We&apos;ll only message you when Chalo launches near you.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
