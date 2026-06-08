"use client";

import { motion } from "framer-motion";

export const PrecisionSweep = () => {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      initial={{ top: "-10%" }}
      animate={{
        top: "110%"
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear"
      }}
    >
      <div
        className="h-px w-full bg-[#00FF9F] shadow-[0_0_15px_rgba(0,255,159,0.5)]"
        style={{
          filter: 'blur(0.5px)',
          opacity: 0.4
        }}
      />
    </motion.div>
  );
};
