"use client";

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface NeonCardProps {
  children: React.ReactNode;
  className?: string;
}

export const NeonCard = ({ children, className = "" }: NeonCardProps) => {
  // Motion values for mouse position to avoid constant re-renders
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth the mouse movement for a more elegant "spotlight" effect
  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  // We use a state or useEffect to handle the style update since
  // radial-gradient doesn't natively accept MotionValues in CSS strings
  // and the provided plan had a slight logic gap in the style attribute.
  const [spotlightStyle, setSpotlightStyle] = useState({ background: '' });

  useEffect(() => {
    const unsubscribeX = smoothX.on("change", (latest) => {
      setSpotlightStyle({
        background: `radial-gradient(600px circle at ${latest}px ${smoothY.get()}px, rgba(0, 255, 159, 0.08), transparent 40%)`
      });
    });
    const unsubscribeY = smoothY.on("change", (latest) => {
      setSpotlightStyle({
        background: `radial-gradient(600px circle at ${smoothX.get()}px ${latest}px, rgba(0, 255, 159, 0.08), transparent 40%)`
      });
    });

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [smoothX, smoothY]);

  function handleMouseMove({ clientX, clientY, currentTarget }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`relative group rounded-xl border border-white/10 bg-[#121212] p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent-neon/40 ${className}`}
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={spotlightStyle}
      />

      {/* Dynamic Border Glow (using an absolute inner border for better control) */}
      <div className="absolute inset-0 rounded-xl border border-transparent transition-all duration-300 group-hover:border-accent-neon/20 group-hover:shadow-[0_0_15px_rgba(0,255,159,0.1)] pointer-events-none" />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
