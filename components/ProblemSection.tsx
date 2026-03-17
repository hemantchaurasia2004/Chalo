"use client";

import { motion } from "framer-motion";

const problems = [
  {
    icon: "🚫",
    title: "No Ola/Uber near campuses",
    description: "Most ride-hailing apps simply don't cover remote college areas.",
    color: "from-red-50 to-rose-50",
    border: "border-red-100 hover:border-red-200",
    iconBg: "bg-red-100",
  },
  {
    icon: "📞",
    title: "Calling multiple drivers",
    description: "Students end up calling 3–4 drivers just to find one who'll come.",
    color: "from-orange-50 to-amber-50",
    border: "border-orange-100 hover:border-orange-200",
    iconBg: "bg-orange-100",
  },
  {
    icon: "😤",
    title: "Unreliable pickups",
    description: "Drivers cancel, students cancel — nobody knows who's actually coming.",
    color: "from-yellow-50 to-amber-50",
    border: "border-yellow-100 hover:border-yellow-200",
    iconBg: "bg-yellow-100",
  },
  {
    icon: "🛺",
    title: "Drivers wasting trips",
    description: "Drivers arrive only to find the student already left with someone else.",
    color: "from-rose-50 to-pink-50",
    border: "border-rose-100 hover:border-rose-200",
    iconBg: "bg-rose-100",
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
            Campus rides are broken. Here&apos;s what students and drivers deal with every day.
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
              <div className={`w-12 h-12 rounded-xl ${p.iconBg} flex items-center justify-center text-2xl mb-4`}>
                {p.icon}
              </div>
              <h3 className="text-lg font-bold text-chalo-navy mb-2">
                {p.title}
              </h3>
              <p className="text-sm text-chalo-slate/70 leading-relaxed">
                {p.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
