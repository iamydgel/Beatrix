"use client";

import React from 'react';
import { motion } from 'framer-motion';

export interface Outcome {
  label: string;
  prob: number;
  odd: number;
}

interface DistributionGraphProps {
  outcomes: Outcome[];
}

export const DistributionGraph = ({ outcomes }: DistributionGraphProps) => {
  return (
    <div className="p-6 rounded-2xl border border-white/5 bg-[#121212]/40 backdrop-blur-md space-y-6">
      <div className="border-b border-white/5 pb-3">
        <h3 className="text-xs font-mono text-text-secondary uppercase tracking-widest font-bold">
          Distribution des Résultats Prédits (1N2)
        </h3>
      </div>

      <div className="space-y-4">
        {outcomes.map((outcome, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-white font-bold uppercase">{outcome.label}</span>
              <div className="flex items-center gap-4">
                <span className="text-text-secondary">Cote: {outcome.odd.toFixed(2)}</span>
                <span className="text-accent-neon font-bold">{outcome.prob.toFixed(1)}%</span>
              </div>
            </div>

            {/* Glowing bar */}
            <div className="relative w-full h-3 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${outcome.prob}%` }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.1 }}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent-neon/30 to-accent-neon rounded-full"
              >
                {/* Luminescent head highlight */}
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-accent-neon shadow-[0_0_8px_#00FF9F]" />
              </motion.div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[10px] font-mono text-text-secondary text-center">
        * Les probabilités affichées incluent les simulations de Monte Carlo exécutées en continu (10 000 itérations).
      </p>
    </div>
  );
};
