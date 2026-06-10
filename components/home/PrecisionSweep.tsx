"use client";

import { motion } from "framer-motion";

export const PrecisionSweep = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <motion.div
        className="absolute w-[150%] h-full -left-1/4 rotate-45"
        initial={{ x: "-100%" }}
        animate={{
          x: "100%"
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div
          className="h-full w-full bg-gradient-to-r from-transparent via-accent-neon/5 to-transparent"
          style={{
            filter: 'blur(60px)',
          }}
        />
      </motion.div>
    </div>
  );
};
