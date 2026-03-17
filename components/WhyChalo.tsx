"use client";

import { motion } from "framer-motion";
import { IconBuilding, IconWhatsapp, IconScale, IconHandshake } from "./Icons";
import { ReactNode } from "react";

const reasons: { icon: ReactNode; title: string; description: string; accent: string; iconColor: string }[] = [
  {
    icon: <IconBuilding className="w-5 h-5" />,
    title: "Designed for campuses",
    description: "Purpose-built for the unique geography and patterns of college areas where mainstream apps fail.",
    accent: "bg-blue-50/80 border-blue-100",
    iconColor: "text-blue-600 bg-blue-100",
  },
  {
    icon: <IconWhatsapp className="w-5 h-5" />,
    title: "Works on WhatsApp",
    description: "Zero friction. No app download, no sign-up. Students use what they already have.",
    accent: "bg-emerald-50/80 border-emerald-100",
    iconColor: "text-emerald-600 bg-emerald-100",
  },
  {
    icon: <IconScale className="w-5 h-5" />,
    title: "Fair pricing via bidding",
    description: "Drivers compete on price transparently. No hidden charges, no surge pricing.",
    accent: "bg-violet-50/80 border-violet-100",
    iconColor: "text-violet-600 bg-violet-100",
  },
  {
    icon: <IconHandshake className="w-5 h-5" />,
    title: "Win-win for both sides",
    description: "Students get reliable, affordable rides. Drivers get guaranteed earnings. No one loses.",
    accent: "bg-amber-50/80 border-amber-100",
    iconColor: "text-amber-600 bg-amber-100",
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
              <div className={`w-10 h-10 rounded-lg ${r.iconColor} flex items-center justify-center mb-4`}>
                {r.icon}
              </div>
              <h3 className="text-base font-bold text-chalo-navy mb-2">
                {r.title}
              </h3>
              <p className="text-sm text-chalo-slate/65 leading-relaxed">
                {r.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
