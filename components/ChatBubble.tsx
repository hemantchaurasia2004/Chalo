"use client";

import { motion } from "framer-motion";

export type BubbleVariant = "student" | "driver" | "system";

interface ChatBubbleProps {
  message: string;
  variant: BubbleVariant;
  label?: string;
  isVisible: boolean;
  frustration?: boolean;
}

export default function ChatBubble({
  message,
  variant,
  label,
  isVisible,
  frustration = false,
}: ChatBubbleProps) {
  if (variant === "system") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="flex flex-col items-center gap-1 my-1"
      >
        {label && (
          <span className="text-[10px] font-semibold tracking-widest uppercase text-gray-400">
            {label}
          </span>
        )}
        <div className="px-5 py-2 rounded-full bg-chalo-navy text-white text-sm font-medium shadow-md">
          {message}
        </div>
      </motion.div>
    );
  }

  const isStudent = variant === "student";

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.95 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 14, scale: 0.95 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`flex flex-col gap-0.5 ${isStudent ? "items-start" : "items-end"}`}
    >
      {label && (
        <span className={`text-[10px] font-semibold tracking-widest uppercase text-gray-400 ${isStudent ? "ml-3" : "mr-3"}`}>
          {label}
        </span>
      )}
      <div className="relative">
        <motion.div
          animate={frustration && isVisible ? { x: [0, -4, 4, -3, 3, 0] } : {}}
          transition={frustration ? { duration: 0.5, delay: 0.3 } : {}}
          className={`
            relative px-5 py-3 text-[15px] leading-relaxed shadow-sm
            ${isStudent
              ? "bg-chalo-light text-chalo-navy rounded-2xl rounded-bl-md"
              : "bg-white text-chalo-navy border border-gray-100 rounded-2xl rounded-br-md"
            }
            ${frustration ? "ring-2 ring-red-200/60" : ""}
          `}
        >
          {message}
        </motion.div>
        {/* Speech bubble tail */}
        <div
          className={`absolute bottom-1 w-3 h-3 ${
            isStudent
              ? "-left-1.5 bg-chalo-light"
              : "-right-1.5 bg-white border-r border-b border-gray-100"
          }`}
          style={{
            clipPath: isStudent
              ? "polygon(100% 0, 100% 100%, 0 100%)"
              : "polygon(0 0, 100% 100%, 0 100%)",
          }}
        />
      </div>
    </motion.div>
  );
}
