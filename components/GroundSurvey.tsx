"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const photos = [
  {
    src: "/images/survey-1.png",
    alt: "Chalo team conducting field survey with auto drivers",
    caption: "Understanding driver pain points firsthand",
  },
  {
    src: "/images/survey-2.png",
    alt: "Auto drivers sharing their daily challenges",
    caption: "Listening to drivers who face daily cancellations",
  },
  {
    src: "/images/survey-3.png",
    alt: "On-ground research at auto stands near campus",
    caption: "Mapping real routes and pricing at auto stands",
  },
];

const stats = [
  { value: "50+", label: "Drivers interviewed" },
  { value: "200+", label: "Students surveyed" },
  { value: "3", label: "Campuses covered" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function GroundSurvey() {
  return (
    <section className="py-24 sm:py-32 bg-chalo-bg relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-chalo-navy/5 text-chalo-navy border border-chalo-navy/10 mb-4">
            On the ground
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-chalo-navy">
            We Didn&apos;t Guess. We Asked.
          </h2>
          <p className="mt-4 text-chalo-slate/60 max-w-xl mx-auto leading-relaxed">
            Before writing a single line of code, we spent weeks at auto stands and college gates,
            talking to drivers and students about what&apos;s actually broken.
          </p>
        </motion.div>

        {/* Photo grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16"
        >
          {photos.map((photo) => (
            <motion.div
              key={photo.src}
              variants={item}
              className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm
                         hover:shadow-xl transition-all duration-500"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-sm font-medium text-white leading-snug">
                  {photo.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-chalo-navy">{stat.value}</div>
              <div className="text-sm text-chalo-slate/60 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
