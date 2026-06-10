"use client";

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  ActivityIcon as Activity,
  TrendingUpIcon as TrendingUp,
  ShieldCheckIcon as ShieldCheck,
  ZapIcon as Zap,
} from 'lucide-animated';
import {
  Target,
  Info
} from 'lucide-react';
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

interface EvidenceCardProps {
  pick: PickData;
}

export const EvidenceCard: React.FC<EvidenceCardProps> = ({ pick }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const edge = (pick.beatrixProb - pick.bookmakerProb).toFixed(1);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      animate={{
        boxShadow: [
          "0 0 0px rgba(0, 255, 159, 0)",
          "0 0 20px rgba(0, 255, 159, 0.1)",
          "0 0 0px rgba(0, 255, 159, 0)"
        ]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
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
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full animate-pulse shadow-[0_0_8px] ${
              pick.status === 'success' ? 'bg-accent-neon shadow-accent-neon' :
              pick.status === 'warning' ? 'bg-yellow-400 shadow-yellow-400' : 'bg-red-400 shadow-red-400'
            }`} />
            <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase font-mono">
              Evidence Engine v4.2
            </span>
          </div>
          <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border transition-colors ${
            pick.isValueBet
              ? 'border-accent-neon/30 bg-accent-neon/5 text-accent-neon'
              : 'border-white/10 bg-white/5 text-white/40'
          }`}>
            <span className="relative flex h-1.5 w-1.5">
              {pick.isValueBet && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-neon opacity-75"></span>}
              <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${pick.isValueBet ? 'bg-accent-neon' : 'bg-white/20'}`}></span>
            </span>
            <span className="text-[9px] font-bold uppercase tracking-tighter font-mono">
              {pick.isValueBet ? `Edge +${edge}%` : 'Standard Value'}
            </span>
          </div>
        </div>

        {/* Event Identity */}
        <div className="mb-6 min-h-[52px]">
          <div className="text-[10px] font-medium text-white/30 uppercase tracking-widest font-mono mb-1 truncate">
            {pick.league}
          </div>
          <div className="text-base md:text-lg font-bold text-white font-mono tracking-tight flex items-center gap-2">
            <span className="flex-1 text-right text-balance leading-tight">{pick.homeTeam}</span>
            <span className="text-white/20 text-[10px] font-normal shrink-0 uppercase px-1">vs</span>
            <span className="flex-1 text-left text-balance leading-tight">{pick.awayTeam}</span>
          </div>
        </div>

        {/* Proof Zone (Left/Top) */}
        <div className="flex flex-col items-start gap-4 mb-10">
          <div className="flex flex-col gap-1 w-full">
            <span className="text-[10px] font-medium text-white/30 uppercase tracking-widest font-mono">
              Calculated Probability
            </span>
            <div className="flex items-baseline gap-2">
              <ProbabilityValue value={pick.beatrixProb} isValueBet={pick.isValueBet} />
            </div>
          </div>

          <div className="w-full space-y-2">
            <ConfidenceBar progress={pick.confidence} />
            <div className="flex justify-between text-[9px] font-mono text-white/20 uppercase tracking-tighter">
              <span className="truncate">Confidence Level</span>
              <span className="shrink-0">{pick.confidence}%</span>
            </div>
          </div>
        </div>


        {/* Analytical Panel (Right/Bottom) */}
        <div className="mt-auto grid grid-cols-1 gap-3 w-full">
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5 group/factor hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-default">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="p-1.5 rounded-lg bg-white/5 text-white/60 shrink-0 group-hover/factor:text-accent-neon transition-colors">
                <Target size={14} />
              </div>
              <span className="text-[11px] font-bold text-white/70 uppercase tracking-tight font-mono truncate group-hover/factor:text-white transition-colors">
                Analysis Vector
              </span>
            </div>
            <Info size={12} className="text-white/20 shrink-0 group-hover/factor:text-white/40 transition-colors" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {FACTORS.map((factor) => (
              <motion.div
                key={factor.label}
                whileHover={{
                  y: -2,
                  scale: 1.02,
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  borderColor: "rgba(255, 255, 255, 0.2)"
                }}
                transition={{ duration: 0.2, ease: BEZIER_CURVE }}
                className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5 overflow-hidden cursor-default transition-colors"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <factor.icon
                    size={12}
                    className={`shrink-0 ${factor.impact === 'positive' ? 'text-accent-neon' :
                        factor.impact === 'negative' ? 'text-red-400' : 'text-white/40'
                      }`}
                  />
                  <span className="text-[9px] font-bold text-white/40 uppercase tracking-tighter font-mono truncate">
                    {factor.label}
                  </span>
                </div>
                <span className={`text-[10px] font-mono font-bold shrink-0 ml-1 ${factor.impact === 'positive' ? 'text-accent-neon' :
                    factor.impact === 'negative' ? 'text-red-400' : 'text-white/60'
                  }`}>
                  {factor.value}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
