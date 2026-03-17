"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import ChatBubble, { BubbleVariant } from "./ChatBubble";

interface ChatMessage {
  message: string;
  variant: BubbleVariant;
  label?: string;
  frustration?: boolean;
}

const beforeMessages: ChatMessage[] = [
  { message: "Bhaiya station chaloge?", variant: "student", label: "Student" },
  { message: "10 min mein aata hoon", variant: "driver", label: "Driver 1" },
  { message: "Bhaiya station? Kitna time?", variant: "student", label: "Calls another..." },
  { message: "5 min", variant: "driver", label: "Driver 2" },
  { message: "Arre bhaiya kahan ho?", variant: "driver", label: "Driver 1 arrives...", frustration: true },
  { message: "Auto mil gaya", variant: "student", frustration: true },
  { message: "🙂", variant: "driver", frustration: true },
];

const afterMessages: ChatMessage[] = [
  { message: "Chalo Station", variant: "student", label: "Student" },
  { message: "Finding best ride...", variant: "system", label: "Chalo" },
  { message: "₹120", variant: "driver", label: "Drivers bidding" },
  { message: "₹100", variant: "driver" },
  { message: "₹90", variant: "driver" },
  { message: "Ride confirmed at ₹90 ✓", variant: "system" },
  { message: "2 min mein pahunch raha hoon", variant: "driver", label: "Driver" },
  { message: "👍", variant: "student" },
];

function ChatBubbleWithProgress({
  msg,
  progress,
  threshold,
}: {
  msg: ChatMessage;
  progress: MotionValue<number>;
  threshold: number;
}) {
  const opacity = useTransform(progress, [threshold, threshold + 0.04], [0, 1]);
  const y = useTransform(progress, [threshold, threshold + 0.04], [16, 0]);

  return (
    <motion.div style={{ opacity, y }}>
      <ChatBubble
        message={msg.message}
        variant={msg.variant}
        label={msg.label}
        isVisible={true}
        frustration={msg.frustration}
      />
    </motion.div>
  );
}

function ChatPane({
  messages,
  progress,
  startAt,
  endAt,
}: {
  messages: ChatMessage[];
  progress: MotionValue<number>;
  startAt: number;
  endAt: number;
}) {
  const step = (endAt - startAt) / messages.length;

  return (
    <div className="flex flex-col gap-3">
      {messages.map((msg, i) => (
        <ChatBubbleWithProgress
          key={`${msg.message}-${i}`}
          msg={msg}
          progress={progress}
          threshold={startAt + step * i}
        />
      ))}
    </div>
  );
}

function CharacterPanel({
  type,
  mood,
}: {
  type: "student" | "driver";
  mood: "before" | "after";
}) {
  const isStudent = type === "student";

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`relative w-28 h-40 sm:w-36 sm:h-52 md:w-44 md:h-60 rounded-2xl overflow-hidden
          ${mood === "before"
            ? "bg-gradient-to-b from-red-50 to-orange-50/50"
            : "bg-gradient-to-b from-emerald-50 to-green-50/50"
          }
          border ${mood === "before" ? "border-red-100" : "border-emerald-100"}
          shadow-lg`}
      >
        <Image
          src={isStudent ? "/images/student.png" : "/images/driver.png"}
          alt={isStudent ? "Student" : "Auto Driver"}
          fill
          className="object-contain object-bottom p-1"
          sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, 176px"
        />
      </div>
      <span className={`text-xs font-bold tracking-wider uppercase
        ${mood === "before" ? "text-red-400" : "text-emerald-500"}`}
      >
        {isStudent ? "Student" : "Driver"}
      </span>
    </div>
  );
}

export default function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const beforeOpacity = useTransform(scrollYProgress, [0, 0.42, 0.48], [1, 1, 0]);
  const afterOpacity = useTransform(scrollYProgress, [0.48, 0.54, 1], [0, 1, 1]);

  const beforeProgress = useTransform(scrollYProgress, [0.04, 0.42], [0, 1]);
  const afterProgress = useTransform(scrollYProgress, [0.56, 0.95], [0, 1]);

  return (
    <section id="story" ref={containerRef} className="relative min-h-[450vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            style={{ opacity: beforeOpacity }}
            className="absolute inset-0 bg-gradient-to-b from-red-50/50 via-orange-50/20 to-white"
          />
          <motion.div
            style={{ opacity: afterOpacity }}
            className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 via-green-50/20 to-white"
          />
        </div>

        {/* ── BEFORE CHALO ── */}
        <motion.div
          style={{ opacity: beforeOpacity }}
          className="absolute inset-0 flex flex-col items-center z-10"
        >
          {/* Title */}
          <div className="pt-20 sm:pt-24 pb-4 text-center">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-red-50 text-red-500 border border-red-200 mb-3">
              The struggle is real
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-chalo-navy">
              Before Chalo
            </h2>
          </div>

          {/* Characters + Chat */}
          <div className="flex-1 flex items-start justify-center w-full max-w-5xl mx-auto px-4 sm:px-8 pt-4 sm:pt-6">
            {/* Student character */}
            <div className="hidden md:flex flex-shrink-0 pt-8">
              <CharacterPanel type="student" mood="before" />
            </div>

            {/* Chat area */}
            <div className="flex-1 max-w-md mx-4 sm:mx-8 md:mx-12 overflow-y-auto max-h-[55vh] scrollbar-hide px-1">
              {/* Mobile avatars row */}
              <div className="flex md:hidden justify-center gap-6 mb-4">
                <CharacterPanel type="student" mood="before" />
                <CharacterPanel type="driver" mood="before" />
              </div>
              <ChatPane
                messages={beforeMessages}
                progress={beforeProgress}
                startAt={0}
                endAt={1}
              />
            </div>

            {/* Driver character */}
            <div className="hidden md:flex flex-shrink-0 pt-8">
              <CharacterPanel type="driver" mood="before" />
            </div>
          </div>
        </motion.div>

        {/* ── WITH CHALO ── */}
        <motion.div
          style={{ opacity: afterOpacity }}
          className="absolute inset-0 flex flex-col items-center z-10"
        >
          {/* Title */}
          <div className="pt-20 sm:pt-24 pb-4 text-center">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200 mb-3">
              Smooth & simple
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-chalo-navy">
              With Chalo
            </h2>
          </div>

          {/* Characters + Chat */}
          <div className="flex-1 flex items-start justify-center w-full max-w-5xl mx-auto px-4 sm:px-8 pt-4 sm:pt-6">
            {/* Student character */}
            <div className="hidden md:flex flex-shrink-0 pt-8">
              <CharacterPanel type="student" mood="after" />
            </div>

            {/* Chat area */}
            <div className="flex-1 max-w-md mx-4 sm:mx-8 md:mx-12 overflow-y-auto max-h-[55vh] scrollbar-hide px-1">
              {/* Mobile avatars row */}
              <div className="flex md:hidden justify-center gap-6 mb-4">
                <CharacterPanel type="student" mood="after" />
                <CharacterPanel type="driver" mood="after" />
              </div>
              <ChatPane
                messages={afterMessages}
                progress={afterProgress}
                startAt={0}
                endAt={1}
              />
            </div>

            {/* Driver character */}
            <div className="hidden md:flex flex-shrink-0 pt-8">
              <CharacterPanel type="driver" mood="after" />
            </div>
          </div>
        </motion.div>

        {/* Scroll progress dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
          <motion.div
            style={{ opacity: beforeOpacity }}
            className="flex items-center gap-1.5"
          >
            <div className="w-2 h-2 rounded-full bg-red-400" />
            <span className="text-[10px] font-medium text-red-400">Before</span>
          </motion.div>
          <div className="w-px h-3 bg-gray-200" />
          <motion.div
            style={{ opacity: afterOpacity }}
            className="flex items-center gap-1.5"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-[10px] font-medium text-emerald-500">After</span>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]) }}
          className="absolute bottom-6 right-6 flex items-center gap-2 text-gray-300 z-20"
        >
          <span className="text-xs font-medium">Scroll to see the story</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3v10m0 0l3-3m-3 3L5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
