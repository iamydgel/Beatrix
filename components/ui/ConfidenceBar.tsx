"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ConfidenceBarProps {
  progress: number; // 0 to 100
}

export const ConfidenceBar = ({ progress }: ConfidenceBarProps) => {
  return (
    <div className="relative w-full h-0.5 bg-white/10 rounded-full overflow-visible">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-gray-500 via-accent-neon to-accent-neon rounded-full"
      >
        {/* Luminescent Head */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut"
          }}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-1 h-1 bg-accent-neon rounded-full shadow-[0_0_8px_#00FF9F]"
        />
      </motion.div>
    </div>
  );
};
