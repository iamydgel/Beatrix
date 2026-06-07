"use client";

import React from 'react';
import Link from 'next/link';
import { NeonCard } from '@/components/ui/NeonCard';
import { ProbabilityValue } from '@/components/ui/ProbabilityValue';
import { ConfidenceBar } from '@/components/ui/ConfidenceBar';
import { StatusIcon } from '@/components/ui/StatusIcon';
import { ArrowRight, Trophy } from 'lucide-react';

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

  return (
    <NeonCard className="flex flex-col justify-between h-full min-h-[300px]">
      <div className="space-y-4">
        {/* Card Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-accent-neon uppercase tracking-wider bg-accent-neon/10 px-2 py-0.5 rounded truncate max-w-[140px] inline-block">
              {pick.league}
            </span>
            <p className="text-[10px] font-mono text-text-secondary uppercase">
              {pick.date}
            </p>
          </div>
          <StatusIcon type={pick.status} size={16} />
        </div>

        {/* Teams */}
        <div className="space-y-1 py-1">
          <h3 className="text-lg font-bold text-white font-mono leading-tight truncate">
            {pick.homeTeam}
          </h3>
          <span className="text-xs font-mono text-text-secondary">vs</span>
          <h3 className="text-lg font-bold text-white font-mono leading-tight truncate">
            {pick.awayTeam}
          </h3>
        </div>

        {/* Prediction Main stats */}
        <div className="flex items-center justify-between py-2 border-y border-white/5">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-text-secondary uppercase">
              Probabilité Beatrix
            </span>
            <ProbabilityValue value={pick.beatrixProb} isValueBet={pick.isValueBet} />
          </div>
          <div className="text-right space-y-1">
            <span className="text-[10px] font-mono text-text-secondary uppercase block">
              Cote Bookmaker
            </span>
            <span className="font-mono text-2xl font-bold text-white block">
              {pick.odd.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Edge / Value indicator */}
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="text-text-secondary">Avantage (Edge) :</span>
          <span className={`font-bold ${edgeValue > 0 ? 'text-accent-neon' : 'text-text-secondary'}`}>
            {edgeValue > 0 ? `+${edge}%` : `${edge}%`}
          </span>
        </div>

        {/* Confidence Score Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between text-[10px] font-mono text-text-secondary uppercase">
            <span>Confiance</span>
            <span>{pick.confidence}%</span>
          </div>
          <ConfidenceBar progress={pick.confidence} />
        </div>
      </div>

      {/* Card Action Link */}
      <div className="pt-6 mt-auto">
        <Link
          href={`/match/${pick.id}`}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-accent-neon hover:text-black rounded-lg text-xs font-mono font-bold uppercase transition-all duration-300 group/btn"
        >
          Analyse Détaillée
          <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </NeonCard>
  );
};
