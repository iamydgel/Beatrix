"use client";

import React from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NeonCardProps {
  children: React.ReactNode;
  className?: string;
}

export const NeonCard = ({ children, className = "" }: NeonCardProps) => {
  // Motion values for mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth the mouse movement for a more elegant "spotlight" effect
  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  // Use motion template to bind background style dynamically without React state updates (60fps performance)
  const background = useMotionTemplate`radial-gradient(600px circle at ${smoothX}px ${smoothY}px, rgba(0, 255, 159, 0.08), transparent 40%)`;

  function handleMouseMove({ clientX, clientY, currentTarget }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn(
        "relative group rounded-xl border border-white/10 bg-[#121212] p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent-neon/40",
        className
      )}
    >
      {/* Spotlight Effect (Zero State-Update) */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background }}
      />

      {/* Dynamic Border Glow */}
      <div className="absolute inset-0 rounded-xl border border-transparent transition-all duration-300 group-hover:border-accent-neon/20 group-hover:shadow-[0_0_15px_rgba(0,255,159,0.1)] pointer-events-none" />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
