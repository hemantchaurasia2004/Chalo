"use client";

import { motion } from "framer-motion";
import { IconMessageCircle, IconBroadcast, IconTrendingDown, IconAward, IconShield, IconCar } from "./Icons";
import { ReactNode } from "react";

const steps: { number: string; icon: ReactNode; title: string; description: string }[] = [
  { number: "01", icon: <IconMessageCircle className="w-5 h-5" />, title: "Request a ride on WhatsApp", description: "Send a simple message — no app download, no sign-up friction." },
  { number: "02", icon: <IconBroadcast className="w-5 h-5" />, title: "Drivers receive the request", description: "Nearby drivers are instantly notified of your trip details." },
  { number: "03", icon: <IconTrendingDown className="w-5 h-5" />, title: "Drivers bid their prices", description: "Multiple drivers compete — prices go down, not up." },
  { number: "04", icon: <IconAward className="w-5 h-5" />, title: "Best price wins", description: "The lowest bid is selected. Fair, transparent, no surge." },
  { number: "05", icon: <IconShield className="w-5 h-5" />, title: "Pay a small advance", description: "A booking fee confirms intent — eliminates fake requests." },
  { number: "06", icon: <IconCar className="w-5 h-5" />, title: "Ride confirmed", description: "Your driver is locked in and on the way. Sit back." },
];

export default function SolutionSection() {
  return (
    <section className="py-24 sm:py-32 bg-chalo-bg relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-chalo-green/10 text-chalo-dark border border-chalo-green/20 mb-4">
            How it works
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-chalo-navy">
            How Chalo Works
          </h2>
          <p className="mt-4 text-chalo-slate/60 max-w-lg mx-auto">
            Six steps. No app. No hassle. Just WhatsApp.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="relative p-6 rounded-2xl bg-white border border-gray-100 shadow-sm
                         hover:shadow-lg hover:border-chalo-green/20 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-chalo-green/10 border border-chalo-green/20
                                flex items-center justify-center text-xs font-bold text-chalo-dark
                                group-hover:bg-chalo-green/20 transition-colors">
                  {step.number}
                </div>
                <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center text-chalo-slate/70">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-[15px] font-bold text-chalo-navy mb-1.5">
                {step.title}
              </h3>
              <p className="text-sm text-chalo-slate/60 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
