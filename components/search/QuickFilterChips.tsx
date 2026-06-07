"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  Zap,
  Target,
  Activity,
  Flame,
  ShieldCheck,
  type LucideIcon
} from 'lucide-react';

export type FilterType = 'sport' | 'value' | 'confidence';

export interface FilterChip {
  id: string;
  label: string;
  icon: LucideIcon;
  type: FilterType;
}

interface QuickFilterChipsProps {
  selectedSport: string;
  showOnlyValueBets: boolean;
  onSportChange: (sport: string) => void;
  onValueBetChange: (value: boolean) => void;
}

const FILTERS: FilterChip[] = [
  { id: 'all', label: 'Tous', icon: Activity, type: 'sport' },
  { id: 'football', label: 'Football', icon: Trophy, type: 'sport' },
  { id: 'basketball', label: 'Basketball', icon: Target, type: 'sport' },
  { id: 'tennis', label: 'Tennis', icon: Flame, type: 'sport' },
  { id: 'value', label: 'Value Bets', icon: Zap, type: 'value' },
  { id: 'confidence', label: 'Haute Confiance', icon: ShieldCheck, type: 'confidence' },
];

const BEZIER_CURVE = [0.22, 1, 0.36, 1];

export const QuickFilterChips: React.FC<QuickFilterChipsProps> = ({
  selectedSport,
  showOnlyValueBets,
  onSportChange,
  onValueBetChange,
}) => {
  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex items-center gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory py-2"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {FILTERS.map((filter) => {
          const isActive =
            (filter.type === 'sport' && selectedSport === filter.id) ||
            (filter.type === 'value' && showOnlyValueBets);

          const Icon = filter.icon;

          return (
            <motion.button
              key={filter.id}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                if (filter.type === 'sport') {
                  onSportChange(filter.id);
                } else if (filter.type === 'value') {
                  onValueBetChange(!showOnlyValueBets);
                }
                // Confidence filter logic can be added here if state is implemented in parent
              }}
              className={`
                relative flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 snap-start
                font-mono text-xs font-medium whitespace-nowrap
                ${isActive
                  ? 'bg-accent-neon text-black border-accent-neon shadow-[0_0_15px_rgba(184,242,122,0.3)]'
                  : 'bg-[#121212] text-white border-white/10 hover:border-white/20'}
              `}
            >
              <motion.div
                animate={isActive ? {
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                } : {}}
                transition={{
                  duration: 0.4,
                  ease: BEZIER_CURVE,
                  repeat: isActive ? 1 : 0
                }}
              >
                <Icon size={14} strokeWidth={2.5} />
              </motion.div>

              <span>{filter.label}</span>

              {isActive && (
                <motion.div
                  layoutId="active-glow"
                  className="absolute inset-0 rounded-full ring-1 ring-accent-neon/50"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
