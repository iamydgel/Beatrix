"use client";

import React, { useRef } from 'react';
import { 
  TrophyIcon, 
  DribbbleIcon, 
  SparklesIcon, 
  ActivityIcon,
  TrendingUpIcon,
  CircleCheckIcon
} from 'lucide-animated';

// Define the Filter Schema
export interface FilterChip {
  id: string;
  label: string;
  // Type as ElementType since lucide-animated uses ForwardRefExoticComponent
  icon: React.ElementType;
  type: 'sport' | 'value' | 'confidence';
}

interface QuickFilterChipsProps {
  selectedSport: string;
  onSportChange: (sport: string) => void;
  showOnlyValueBets: boolean;
  onValueBetsToggle: (show: boolean) => void;
  minConfidence: number | null;
  onMinConfidenceToggle: (minConf: number | null) => void;
}

const FILTER_CHIPS: FilterChip[] = [
  { id: 'all', label: 'Tous', icon: SparklesIcon, type: 'sport' },
  { id: 'football', label: 'Football', icon: TrophyIcon, type: 'sport' },
  { id: 'basketball', label: 'Basketball', icon: DribbbleIcon, type: 'sport' },
  { id: 'tennis', label: 'Tennis', icon: ActivityIcon, type: 'sport' },
  { id: 'value_bets', label: 'Value Bets', icon: TrendingUpIcon, type: 'value' },
  { id: 'high_confidence', label: 'Confiance > 80%', icon: CircleCheckIcon, type: 'confidence' }
];

export const QuickFilterChips = ({
  selectedSport,
  onSportChange,
  showOnlyValueBets,
  onValueBetsToggle,
  minConfidence,
  onMinConfidenceToggle,
}: QuickFilterChipsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleChipClick = (chip: FilterChip, element: HTMLButtonElement) => {
    // Scroll chip to center in the horizontal scroller
    if (containerRef.current && element) {
      const container = containerRef.current;
      const scrollLeft = element.offsetLeft - container.offsetWidth / 2 + element.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }

    // Connect to states
    if (chip.type === 'sport') {
      onSportChange(chip.id);
    } else if (chip.type === 'value') {
      onValueBetsToggle(!showOnlyValueBets);
    } else if (chip.type === 'confidence') {
      onMinConfidenceToggle(minConfidence ? null : 80);
    }
  };

  const isChipActive = (chip: FilterChip) => {
    if (chip.type === 'sport') {
      return selectedSport === chip.id;
    }
    if (chip.type === 'value') {
      return showOnlyValueBets;
    }
    if (chip.type === 'confidence') {
      return minConfidence !== null;
    }
    return false;
  };

  return (
    <div 
      ref={containerRef}
      className="flex gap-2 overflow-x-auto py-2 px-1 scrollbar-hide snap-x snap-mandatory touch-pan-x"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
    >
      <style jsx global>{`
        /* Hide scrollbars for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {FILTER_CHIPS.map((chip) => {
        const Icon = chip.icon;
        const active = isChipActive(chip);
        
        return (
          <button
            key={chip.id}
            onClick={(e) => handleChipClick(chip, e.currentTarget)}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold uppercase rounded-full border transition-all duration-300 snap-center outline-none shrink-0 cursor-pointer ${
              active
                ? 'border-accent-neon bg-accent-neon/15 text-accent-neon shadow-[0_0_12px_rgba(0,255,159,0.15)] scale-102'
                : 'border-white/5 bg-white/[0.02] text-text-secondary hover:text-white hover:border-white/10 hover:bg-white/[0.04]'
            }`}
          >
            <Icon 
              size={14} 
              className={`transition-transform duration-300 ${active ? 'scale-110 text-accent-neon' : ''}`}
            />
            <span>{chip.label}</span>
          </button>
        );
      })}
    </div>
  );
};
