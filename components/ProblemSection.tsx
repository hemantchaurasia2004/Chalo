"use client";

import { motion } from "framer-motion";
import { IconMapOff, IconPhoneCall, IconAlertTriangle, IconRouteOff } from "./Icons";

const problems = [
  {
    icon: <IconMapOff className="w-5 h-5" />,
    title: "No ride-hailing coverage near campuses",
    description: "Ola and Uber don't operate in most tier-2 and tier-3 college areas. Students are left with no structured option.",
    color: "from-red-50/80 to-white",
    border: "border-red-100/80 hover:border-red-200",
    iconColor: "text-red-500 bg-red-50",
  },
  {
    icon: <IconPhoneCall className="w-5 h-5" />,
    title: "Calling 3–4 drivers for one ride",
    description: "Without a system, students resort to calling multiple drivers manually, wasting time and creating confusion.",
    color: "from-orange-50/80 to-white",
    border: "border-orange-100/80 hover:border-orange-200",
    iconColor: "text-orange-500 bg-orange-50",
  },
  {
    icon: <IconAlertTriangle className="w-5 h-5" />,
    title: "Unreliable pickups, constant uncertainty",
    description: "No confirmations, no ETAs. Students wait without knowing if a driver is actually coming.",
    color: "from-yellow-50/80 to-white",
    border: "border-yellow-100/80 hover:border-yellow-200",
    iconColor: "text-yellow-600 bg-yellow-50",
  },
  {
    icon: <IconRouteOff className="w-5 h-5" />,
    title: "Drivers lose time on cancelled trips",
    description: "Drivers arrive at pickup points only to find the student already left with another auto.",
    color: "from-rose-50/80 to-white",
    border: "border-rose-100/80 hover:border-rose-200",
    iconColor: "text-rose-500 bg-rose-50",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function ProblemSection() {
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
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-red-50 text-red-500 border border-red-100 mb-4">
            The reality
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-chalo-navy">
            The Problem
          </h2>
          <p className="mt-4 text-chalo-slate/60 max-w-lg mx-auto">
            Campus rides are broken. Here&apos;s what students and drivers deal with every single day.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {problems.map((p) => (
            <motion.div
              key={p.title}
              variants={item}
              className={`group p-6 sm:p-7 rounded-2xl bg-gradient-to-br ${p.color} border ${p.border}
                         hover:shadow-xl hover:shadow-gray-100/60 hover:-translate-y-1 transition-all duration-300`}
            >
              <div className={`w-10 h-10 rounded-lg ${p.iconColor} flex items-center justify-center mb-4`}>
                {p.icon}
              </div>
              <h3 className="text-base font-bold text-chalo-navy mb-2">
                {p.title}
              </h3>
              <p className="text-sm text-chalo-slate/65 leading-relaxed">
                {p.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
