"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface SportFilterProps {
  selectedSport: string;
  onSportChange: (sport: string) => void;
  showOnlyValueBets: boolean;
  onValueBetsToggle: (show: boolean) => void;
}

const SPORTS = [
  { id: 'all', label: 'Tous les sports' },
  { id: 'football', label: 'Football' },
  { id: 'basketball', label: 'Basketball' },
  { id: 'tennis', label: 'Tennis' },
];

export const SportFilter = ({
  selectedSport,
  onSportChange,
  showOnlyValueBets,
  onValueBetsToggle
}: SportFilterProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl border border-white/5 bg-[#121212]/40 backdrop-blur-md">
      {/* Sports list tabs */}
      <div className="flex flex-wrap gap-2">
        {SPORTS.map((sport) => {
          const isActive = selectedSport === sport.id;
          return (
            <button
              key={sport.id}
              onClick={() => onSportChange(sport.id)}
              className={`relative px-4 py-2 text-xs font-mono font-bold uppercase rounded-lg transition-colors duration-200 outline-none ${
                isActive ? 'text-black' : 'text-text-secondary hover:text-white'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeSportPill"
                  className="absolute inset-0 bg-accent-neon rounded-lg"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{sport.label}</span>
            </button>
          );
        })}
      </div>

      {/* Value bet toggle switch */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono text-text-secondary uppercase">
          Value Bets uniquement
        </span>
        <button
          onClick={() => onValueBetsToggle(!showOnlyValueBets)}
          className={`relative w-10 h-5 rounded-full transition-colors duration-200 outline-none ${
            showOnlyValueBets ? 'bg-accent-neon' : 'bg-white/10'
          }`}
        >
          <motion.div
            animate={{ x: showOnlyValueBets ? 22 : 2 }}
            className={`w-4 h-4 rounded-full ${
              showOnlyValueBets ? 'bg-black' : 'bg-white/60'
            }`}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </button>
      </div>
    </div>
  );
};
