"use client";

import React, { useEffect } from 'react';
import { motion, useSpring, useTransform, animate, useMotionValue } from 'framer-motion';

interface ProbabilityValueProps {
  value: number; // 0 to 100
  isValueBet?: boolean;
}

export const ProbabilityValue = ({ value, isValueBet }: ProbabilityValueProps) => {
  const count = useMotionValue(0);
  const spring = useSpring(count, {
    stiffness: isValueBet ? 200 : 100,
    damping: isValueBet ? 12 : 20,
    restDelta: 0.001
  });

  const displayValue = useTransform(spring, (latest) =>
    `${latest.toFixed(1)}%`
  );

  useEffect(() => {
    // Synchronized animation with ConfidenceBar (600ms)
    const animation = animate(count, value, {
      duration: 0.6,
      ease: "easeOut",
    });

    return animation.stop;
  }, [value, count]);

  return (
    <div className="relative flex items-center justify-center">
      <motion.span
        className={`font-mono text-3xl font-bold transition-colors duration-300 ${
          isValueBet ? 'text-accent-neon' : 'text-white'
        }`}
        animate={isValueBet ? {
          scale: [1, 1.05, 1],
          textShadow: [
            "0 0 0px rgba(0, 255, 159, 0)",
            "0 0 15px rgba(0, 255, 159, 0.4)",
            "0 0 0px rgba(0, 255, 159, 0)"
          ]
        } : {}}
        transition={isValueBet ? {
          scale: { repeat: Infinity, duration: 3, ease: "easeInOut" },
          textShadow: { repeat: Infinity, duration: 3, ease: "easeInOut" }
        } : {}}
      >
        {displayValue}
      </motion.span>

      {/* Halo glow effect for value bets */}
      {isValueBet && (
        <div
          data-testid="probability-glow"
          className="absolute inset-0 blur-xl bg-accent-neon/20 pointer-events-none rounded-full"
        />
      )}
    </div>
  );
};
