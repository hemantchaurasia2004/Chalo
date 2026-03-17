"use client";

import { motion } from "framer-motion";

const steps = [
  { number: "01", icon: "💬", title: "Request ride on WhatsApp", description: "Just send a message — no app download needed." },
  { number: "02", icon: "📡", title: "Drivers receive request", description: "Nearby drivers are instantly notified of your trip." },
  { number: "03", icon: "💰", title: "Drivers bid prices", description: "Multiple drivers compete to offer you the best fare." },
  { number: "04", icon: "🏆", title: "Lowest price wins", description: "You always get the best deal — no surge, no tricks." },
  { number: "05", icon: "✅", title: "Pay small advance", description: "A small booking amount confirms your intent — no fake bookings." },
  { number: "06", icon: "🛺", title: "Ride confirmed", description: "Your driver is on the way. Sit back and relax." },
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
            Simple & transparent
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-chalo-navy">
            How Chalo Works
          </h2>
          <p className="mt-4 text-chalo-slate/60 max-w-lg mx-auto">
            Six simple steps. No app. No hassle. Just WhatsApp.
          </p>
        </motion.div>

        {/* Steps grid */}
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
                <div className="w-10 h-10 rounded-full bg-chalo-green/10 border border-chalo-green/20
                                flex items-center justify-center text-xs font-bold text-chalo-dark
                                group-hover:bg-chalo-green/20 transition-colors">
                  {step.number}
                </div>
                <span className="text-2xl">{step.icon}</span>
              </div>
              <h3 className="text-base font-bold text-chalo-navy mb-1.5">
                {step.title}
              </h3>
              <p className="text-sm text-chalo-slate/65 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
