"use client";

import React, { useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface ProbabilityValueProps {
  value: number; // 0 to 100
  isValueBet?: boolean;
}

export const ProbabilityValue = ({ value, isValueBet }: ProbabilityValueProps) => {
  // High-precision spring for a smooth "counting" feel
  const spring = useSpring(0, {
    stiffness: isValueBet ? 85 : 55,
    damping: isValueBet ? 15 : 20,
    mass: 1
  });

  // Transform the spring value into a formatted percentage string
  const displayValue = useTransform(spring, (latest) =>
    `${latest.toFixed(1)}%`
  );

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return (
    <div className="relative flex items-center justify-center">
      <motion.span
        className={`font-mono text-3xl font-bold transition-colors duration-300 ${
          isValueBet ? 'text-accent-neon' : 'text-white'
        }`}
        animate={isValueBet ? {
          scale: [1, 1.08, 1],
          textShadow: [
            "0 0 0px rgba(0, 255, 159, 0)",
            "0 0 12px rgba(0, 255, 159, 0.6)",
            "0 0 0px rgba(0, 255, 159, 0)"
          ]
        } : {}}
        transition={{
          scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
          textShadow: { repeat: Infinity, duration: 2, ease: "easeInOut" }
        }}
      >
        {displayValue}
      </motion.span>

      {/* Halo glow effect for value bets */}
      {isValueBet && (
        <div className="absolute inset-0 blur-xl bg-accent-neon/20 pointer-events-none rounded-full" />
      )}
    </div>
  );
};
