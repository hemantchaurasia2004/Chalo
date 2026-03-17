"use client";

import { motion } from "framer-motion";
import { IconXCircle, IconCheckCircle, IconBanknote, IconTarget } from "./Icons";
import { ReactNode } from "react";

const benefits: { icon: ReactNode; title: string; description: string }[] = [
  { icon: <IconXCircle className="w-5 h-5" />, title: "No fake bookings", description: "Students pay a small advance upfront. Only serious riders make it through." },
  { icon: <IconCheckCircle className="w-5 h-5" />, title: "Guaranteed rides", description: "Every accepted bid is a locked-in ride. No more last-minute cancellations." },
  { icon: <IconBanknote className="w-5 h-5" />, title: "Higher daily earnings", description: "Less time waiting, more time driving. Optimized demand means more trips per day." },
  { icon: <IconTarget className="w-5 h-5" />, title: "Zero wasted trips", description: "No more arriving at a pickup to find the student already gone." },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function ForDrivers() {
  return (
    <section className="py-24 sm:py-32 bg-gradient-to-b from-amber-50/40 to-chalo-bg relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-200/60 to-transparent" />

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 mb-4">
            For drivers
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-chalo-navy">
            Better for Drivers Too
          </h2>
          <p className="mt-4 text-chalo-slate/60 max-w-lg mx-auto">
            Chalo isn&apos;t just for students. Drivers earn more with zero wasted effort.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {benefits.map((b) => (
            <motion.div
              key={b.title}
              variants={item}
              className="flex gap-5 p-6 sm:p-7 rounded-2xl bg-white border border-amber-100/80
                         hover:border-amber-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                {b.icon}
              </div>
              <div>
                <h3 className="text-base font-bold text-chalo-navy mb-1.5">
                  {b.title}
                </h3>
                <p className="text-sm text-chalo-slate/65 leading-relaxed">
                  {b.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
