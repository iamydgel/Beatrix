"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ProbabilityValue } from '@/components/ui/ProbabilityValue';
import { Target, TrendingUp } from 'lucide-react';

interface ScorecardProps {
  beatrixProb: number;
  bookmakerProb: number;
  odd: number;
  isValueBet: boolean;
}

export const Scorecard = ({
  beatrixProb,
  bookmakerProb,
  odd,
  isValueBet,
}: ScorecardProps) => {
  const edge = (beatrixProb - bookmakerProb).toFixed(1);
  const edgeValue = parseFloat(edge);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 rounded-2xl border border-white/5 bg-[#121212]/40 backdrop-blur-md">
      {/* Beatrix Model Probability Card */}
      <div className="flex flex-col justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-4">
        <div className="flex items-center gap-2 text-text-secondary text-xs font-mono uppercase tracking-wider">
          <Target size={14} className="text-accent-neon" />
          Probabilité Modèle
        </div>
        <div className="flex items-center gap-3">
          <ProbabilityValue value={beatrixProb} isValueBet={isValueBet} />
          {isValueBet && (
            <span className="text-[9px] font-mono bg-accent-neon text-black font-black px-1.5 py-0.5 rounded uppercase">
              Value
            </span>
          )}
        </div>
        <p className="text-[10px] font-mono text-text-secondary">
          Probabilité mathématique pure déduite par notre modèle prédictif.
        </p>
      </div>

      {/* Bookmaker Odds / Probability Card */}
      <div className="flex flex-col justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-4">
        <div className="flex items-center gap-2 text-text-secondary text-xs font-mono uppercase tracking-wider">
          <TrendingUp size={14} />
          Cote Bookmaker
        </div>
        <div className="space-y-1">
          <span className="font-mono text-3xl font-bold text-white leading-none">
            {odd.toFixed(2)}
          </span>
          <span className="text-[10px] font-mono text-text-secondary block">
            Implique {bookmakerProb.toFixed(1)}% de probabilité
          </span>
        </div>
        <p className="text-[10px] font-mono text-text-secondary">
          Probabilité implicite estimée par le bookmaker, avec marge déduite.
        </p>
      </div>

      {/* Mathematical Edge Card */}
      <div className="flex flex-col justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-4">
        <div className="text-text-secondary text-xs font-mono uppercase tracking-wider">
          Avantage Mathématique (Edge)
        </div>
        <div className="space-y-1">
          <span className={`font-mono text-3xl font-bold leading-none ${edgeValue > 0 ? 'text-accent-neon' : 'text-text-secondary'}`}>
            {edgeValue > 0 ? `+${edge}%` : `${edge}%`}
          </span>
          <span className="text-[10px] font-mono text-text-secondary block">
            {edgeValue > 0 ? 'Écart à notre avantage' : 'Aucun écart détecté'}
          </span>
        </div>
        <p className="text-[10px] font-mono text-text-secondary">
          {edgeValue > 0
            ? 'L\'écart statistique est suffisant pour justifier un pari rentable à long terme.'
            : 'L\'écart n\'est pas suffisant pour surmonter la marge appliquée par le bookmaker.'}
        </p>
      </div>
    </div>
  );
};
