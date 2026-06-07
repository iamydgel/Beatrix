"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { NeonCard } from '@/components/ui/NeonCard';
import { ProbabilityValue } from '@/components/ui/ProbabilityValue';
import { ConfidenceBar } from '@/components/ui/ConfidenceBar';
import { StatusIcon } from '@/components/ui/StatusIcon';
import { ArrowRight, Star } from 'lucide-react';

export interface PickData {
  id: string;
  sport: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  beatrixProb: number;
  bookmakerProb: number;
  confidence: number;
  status: 'success' | 'warning' | 'error';
  isValueBet: boolean;
  odd: number;
}

interface PickCardProps {
  pick: PickData;
}

export const PickCard = ({ pick }: PickCardProps) => {
  const edge = (pick.beatrixProb - pick.bookmakerProb).toFixed(1);
  const edgeValue = parseFloat(edge);
  const [isWatched, setIsWatched] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-xl">
      {/* Swipe underlay background action */}
      <div className="absolute inset-0 bg-accent-neon/15 flex items-center pl-4 rounded-xl pointer-events-none transition-opacity duration-300">
        <div className="flex items-center gap-2 text-accent-neon text-xs font-mono font-bold">
          <Star size={16} className={isWatched ? "fill-accent-neon" : "animate-pulse"} />
          <span>{isWatched ? "Suivi !" : "Glisser pour suivre"}</span>
        </div>
      </div>

      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 120 }}
        dragElastic={{ left: 0.05, right: 0.3 }}
        onDragEnd={(event, info) => {
          if (info.offset.x > 80) {
            setIsWatched(!isWatched);
          }
        }}
        className="relative z-10 cursor-grab active:cursor-grabbing"
      >
        <NeonCard className="flex flex-col justify-between h-full min-h-[220px] p-4 bg-[#121212]/95 backdrop-blur-md">
          <div className="space-y-3">
            {/* Card Header */}
            <div className="flex justify-between items-start">
              <div className="space-y-0.5">
                <span className="text-[9px] font-mono text-accent-neon uppercase tracking-wider bg-accent-neon/10 px-1.5 py-0.5 rounded truncate max-w-[120px] inline-block">
                  {pick.league}
                </span>
                <p className="text-[9px] font-mono text-text-secondary uppercase">
                  {pick.date}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {isWatched && <Star size={12} className="text-accent-neon fill-accent-neon" />}
                <StatusIcon type={pick.status} size={14} />
              </div>
            </div>

            {/* Teams & Confidence (Aligned Horizontally) */}
            <div className="flex items-center justify-between py-1 gap-3 border-b border-white/5">
              <div className="space-y-0.5 flex-1 min-w-0">
                <h3 className="text-sm font-bold text-white font-mono leading-tight truncate">
                  {pick.homeTeam}
                </h3>
                <span className="text-[9px] font-mono text-text-secondary">vs</span>
                <h3 className="text-sm font-bold text-white font-mono leading-tight truncate">
                  {pick.awayTeam}
                </h3>
              </div>
              
              {/* Confidence Score Bar aligned horizontally with the team names */}
              <div className="w-20 shrink-0 space-y-1">
                <div className="flex justify-between text-[9px] font-mono text-text-secondary uppercase">
                  <span>Confiance</span>
                  <span className="text-white font-bold">{pick.confidence}%</span>
                </div>
                <ConfidenceBar progress={pick.confidence} />
              </div>
            </div>

            {/* Prediction Main stats */}
            <div className="grid grid-cols-3 gap-2 py-1.5 items-center">
              <div className="space-y-0.5">
                <span className="text-[9px] font-mono text-text-secondary uppercase block">
                  Probabilité
                </span>
                <div className="flex justify-start">
                  <ProbabilityValue value={pick.beatrixProb} isValueBet={pick.isValueBet} />
                </div>
              </div>
              
              <div className="space-y-0.5 text-center">
                <span className="text-[9px] font-mono text-text-secondary uppercase block">
                  Cote
                </span>
                <span className="font-mono text-lg font-bold text-white block">
                  {pick.odd.toFixed(2)}
                </span>
              </div>

              <div className="space-y-0.5 text-right">
                <span className="text-[9px] font-mono text-text-secondary uppercase block">
                  Edge (Avantage)
                </span>
                <span className={`font-mono text-sm font-bold block ${edgeValue > 0 ? 'text-accent-neon' : 'text-text-secondary'}`}>
                  {edgeValue > 0 ? `+${edge}%` : `${edge}%`}
                </span>
              </div>
            </div>
          </div>

          {/* Card Action Link */}
          <div className="pt-2 mt-auto">
            <Link
              href={`/match/${pick.id}`}
              className="w-full flex items-center justify-center gap-1.5 py-1.5 bg-white/5 hover:bg-accent-neon hover:text-black rounded-lg text-[10px] font-mono font-bold uppercase transition-all duration-300 group/btn"
            >
              Analyse Détaillée
              <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </NeonCard>
      </motion.div>
    </div>
  );
};
