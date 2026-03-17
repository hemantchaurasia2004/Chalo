"use client";

import { motion } from "framer-motion";

const reasons = [
  {
    icon: "🏫",
    title: "Built for campuses",
    description: "Designed specifically for college environments where big apps don't reach.",
    accent: "bg-blue-50 border-blue-100",
    iconBg: "bg-blue-100",
  },
  {
    icon: "💬",
    title: "Works on WhatsApp",
    description: "No new app to download. Use what you already have — WhatsApp.",
    accent: "bg-emerald-50 border-emerald-100",
    iconBg: "bg-emerald-100",
  },
  {
    icon: "⚖️",
    title: "Fair pricing via bidding",
    description: "Drivers compete on price. You always get the best deal.",
    accent: "bg-violet-50 border-violet-100",
    iconBg: "bg-violet-100",
  },
  {
    icon: "🤝",
    title: "Better for everyone",
    description: "Students save money, drivers get guaranteed rides. Win-win.",
    accent: "bg-amber-50 border-amber-100",
    iconBg: "bg-amber-100",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function WhyChalo() {
  return (
    <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100 mb-4">
            The advantage
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-chalo-navy">
            Why Chalo?
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {reasons.map((r) => (
            <motion.div
              key={r.title}
              variants={item}
              className={`p-6 sm:p-7 rounded-2xl ${r.accent} border
                         hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
            >
              <div className={`w-12 h-12 rounded-xl ${r.iconBg} flex items-center justify-center text-2xl mb-4`}>
                {r.icon}
              </div>
              <h3 className="text-lg font-bold text-chalo-navy mb-2">
                {r.title}
              </h3>
              <p className="text-sm text-chalo-slate/70 leading-relaxed">
                {r.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
