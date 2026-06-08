"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  ZapIcon,
  SearchIcon,
  ActivityIcon,
  ShieldCheckIcon,
  CalendarDaysIcon,
  AlarmClockIcon,
} from 'lucide-animated';

export type FilterType = 'sport' | 'value' | 'confidence' | 'timeframe';

export interface FilterChip {
  id: string;
  label: string;
  icon: any;
  type: FilterType;
}

interface QuickFilterChipsProps {
  selectedSport: string;
  selectedTimeframe: string;
  showOnlyValueBets: boolean;
  showHighConfidence: boolean;
  onSportChange: (sport: string) => void;
  onTimeframeChange: (timeframe: string) => void;
  onValueBetChange: (value: boolean) => void;
  onConfidenceChange: (value: boolean) => void;
}

const FILTERS: FilterChip[] = [
  { id: 'all', label: 'Tous', icon: ActivityIcon, type: 'sport' },
  { id: 'today', label: "Aujourd'hui", icon: AlarmClockIcon, type: 'timeframe' },
  { id: 'tomorrow', label: 'Demain', icon: CalendarDaysIcon, type: 'timeframe' },
  { id: 'football', label: 'Football', icon: ActivityIcon, type: 'sport' },
  { id: 'basketball', label: 'Basketball', icon: ZapIcon, type: 'sport' },
  { id: 'tennis', label: 'Tennis', icon: ZapIcon, type: 'sport' },
  { id: 'value', label: 'Value Bets', icon: ZapIcon, type: 'value' },
  { id: 'confidence', label: 'Haute Confiance', icon: ShieldCheckIcon, type: 'confidence' },
];

const BEZIER_CURVE = [0.22, 1, 0.36, 1];

export const QuickFilterChips: React.FC<QuickFilterChipsProps> = ({
  selectedSport,
  selectedTimeframe,
  showOnlyValueBets,
  showHighConfidence,
  onSportChange,
  onTimeframeChange,
  onValueBetChange,
  onConfidenceChange,
}) => {
  return (
    <div className="relative w-full overflow-hidden group/ribbon">
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
      <div
        className="relative flex items-center gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory py-2 backdrop-blur-sm"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {FILTERS.map((filter) => {
          const isActive =
            (filter.type === 'sport' && selectedSport === filter.id) ||
            (filter.type === 'timeframe' && selectedTimeframe === filter.id) ||
            (filter.type === 'value' && showOnlyValueBets && filter.id === 'value') ||
            (filter.type === 'confidence' && showHighConfidence && filter.id === 'confidence');

          const Icon = filter.icon;

          return (
            <motion.button
              key={filter.id}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                if (filter.type === 'sport') {
                  onSportChange(filter.id);
                } else if (filter.type === 'timeframe') {
                  onTimeframeChange(selectedTimeframe === filter.id ? 'all' : filter.id);
                } else if (filter.type === 'value') {
                  onValueBetChange(!showOnlyValueBets);
                } else if (filter.type === 'confidence') {
                  onConfidenceChange(!showHighConfidence);
                }
              }}
              className={`
                relative flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 snap-start
                font-mono text-xs font-medium whitespace-nowrap
                ${isActive
                  ? 'bg-accent-neon text-black border-accent-neon shadow-[0_0_15px_rgba(184,242,122,0.3)]'
                  : 'bg-[#121212]/60 backdrop-blur-md text-white border-white/5 hover:border-white/20'}
              `}
            >
              <motion.div
                animate={isActive ? {
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                } : {}}
                transition={{
                  duration: 0.4,
                  ease: BEZIER_CURVE as any,
                  repeat: isActive ? 1 : 0
                }}
              >
                <Icon size={14} strokeWidth={2.5} />
              </motion.div>

              <span className="relative z-10">{filter.label}</span>

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
