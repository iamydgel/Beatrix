"use client";

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Activity,
  TrendingUp,
  ShieldCheck,
  Zap,
  Target,
  Info
} from 'lucide-animated';
import { ProbabilityValue } from '@/components/ui/ProbabilityValue';
import { ConfidenceBar } from '@/components/ui/ConfidenceBar';

interface InfluenceFactor {
  label: string;
  value: string;
  icon: React.ElementType;
  impact: 'positive' | 'negative' | 'neutral';
}

const FACTORS: InfluenceFactor[] = [
  { label: 'HISTORICAL BIAS', value: '+12.4%', icon: TrendingUp, impact: 'positive' },
  { label: 'VOLATILITY INDEX', value: '-3.1%', icon: Activity, impact: 'negative' },
  { label: 'SYSTEM CONFIDENCE', value: 'HIGH', icon: ShieldCheck, impact: 'positive' },
  { label: 'SIGNAL NOISE', value: 'LOW', icon: Zap, impact: 'positive' },
];

const BEZIER_CURVE = [0.22, 1, 0.36, 1];

export const EvidenceCard = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-full group overflow-hidden rounded-3xl bg-[#121212] border border-white/10 transition-all duration-500 hover:border-white/20"
    >
      {/* Spotlight Hover Effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(0, 255, 159, 0.15), transparent 80%)`
          ),
        }}
      />

      {/* Content Layer */}
      <div className="relative z-10 flex h-full flex-col p-6">
        {/* Header / Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-accent-neon animate-pulse shadow-[0_0_8px_#00FF9F]" />
            <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase font-mono">
              Evidence Engine v4.2
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-accent-neon/30 bg-accent-neon/5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-neon opacity-75"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-neon"></span>
            </span>
            <span className="text-[9px] font-bold text-accent-neon uppercase tracking-tighter font-mono">
              Edge Verified
            </span>
          </div>
        </div>

        {/* Proof Zone (Left/Top) */}
        <div className="flex flex-col items-start gap-4 mb-10">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-medium text-white/30 uppercase tracking-widest font-mono">
              Calculated Probability
            </span>
            <div className="flex items-baseline gap-2">
              <ProbabilityValue value={87.4} isValueBet={true} />
            </div>
          </div>

          <div className="w-full max-w-[240px] space-y-2">
            <ConfidenceBar progress={87.4} />
            <div className="flex justify-between text-[9px] font-mono text-white/20 uppercase tracking-tighter">
              <span>Confidence Level</span>
              <span>87.4%</span>
            </div>
          </div>
        </div>

        {/* Analytical Panel (Right/Bottom) */}
        <div className="mt-auto grid grid-cols-1 gap-3">
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5 group/factor hover:bg-white/[0.06] transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-lg bg-white/5 text-white/60">
                <Target size={14} />
              </div>
              <span className="text-[11px] font-bold text-white/70 uppercase tracking-tight font-mono">
                Analysis Vector
              </span>
            </div>
            <Info size={12} className="text-white/20" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {FACTORS.map((factor) => (
              <motion.div
                key={factor.label}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2, ease: BEZIER_CURVE }}
                className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5"
              >
                <div className="flex items-center gap-2">
                  <factor.icon
                    size={12}
                    className={`${
                      factor.impact === 'positive' ? 'text-accent-neon' :
                      factor.impact === 'negative' ? 'text-red-400' : 'text-white/40'
                    }`}
                  />
                  <span className="text-[9px] font-bold text-white/40 uppercase tracking-tighter font-mono">
                    {factor.label}
                  </span>
                </div>
                <span className={`text-[10px] font-mono font-bold ${
                  factor.impact === 'positive' ? 'text-accent-neon' :
                  factor.impact === 'negative' ? 'text-red-400' : 'text-white/60'
                }`}>
                  {factor.value}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
