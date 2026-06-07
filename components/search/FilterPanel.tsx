"use client";

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface FilterPanelProps {
  selectedSport: string;
  onSportChange: (sport: string) => void;
  selectedLeague: string;
  onLeagueChange: (league: string) => void;
  selectedTimeframe: string;
  onTimeframeChange: (timeframe: string) => void;
  showOnlyValueBets: boolean;
  onValueBetsToggle: (show: boolean) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const SPORTS = [
  { id: 'all', label: 'Tous' },
  { id: 'football', label: 'Football' },
  { id: 'basketball', label: 'Basketball' },
  { id: 'tennis', label: 'Tennis' },
];

const LEAGUES_BY_SPORT: Record<string, string[]> = {
  all: ['La Liga', 'Premier League', 'Serie A', 'NBA', 'EuroLeague', 'Roland Garros'],
  football: ['La Liga', 'Premier League', 'Serie A'],
  basketball: ['NBA', 'EuroLeague'],
  tennis: ['Roland Garros'],
};

const TIMEFRAMES = [
  { id: 'all', label: 'Tous' },
  { id: 'today', label: 'Aujourd\'hui' },
  { id: 'tomorrow', label: 'Demain' },
  { id: 'week', label: 'Cette semaine' },
];

const SORT_OPTIONS = [
  { id: 'date', label: 'Date' },
  { id: 'prob', label: 'Probabilité' },
  { id: 'edge', label: 'Edge' },
];

export const FilterPanel = ({
  selectedSport,
  onSportChange,
  selectedLeague,
  onLeagueChange,
  selectedTimeframe,
  onTimeframeChange,
  showOnlyValueBets,
  onValueBetsToggle,
  sortBy,
  onSortChange,
}: FilterPanelProps) => {
  const leagues = useMemo(() => {
    return LEAGUES_BY_SPORT[selectedSport] || [];
  }, [selectedSport]);

  return (
    <div className="space-y-6 p-5 rounded-2xl border border-white/5 bg-[#121212]/40 backdrop-blur-md h-full">
      <h3 className="text-xs font-mono text-text-secondary uppercase tracking-widest font-bold border-b border-white/5 pb-3">
        Filtres Analytiques
      </h3>

      {/* Sport Selector */}
      <div className="space-y-2">
        <label className="text-[10px] font-mono text-text-secondary uppercase tracking-wider">
          Sport
        </label>
        <div className="grid grid-cols-2 gap-2">
          {SPORTS.map((sport) => (
            <button
              key={sport.id}
              onClick={() => {
                onSportChange(sport.id);
                onLeagueChange('all');
              }}
              className={`px-3 py-2 text-xs font-mono font-bold uppercase rounded-lg border transition-colors outline-none text-center ${
                selectedSport === sport.id
                  ? 'border-accent-neon bg-accent-neon/10 text-accent-neon'
                  : 'border-white/5 bg-white/[0.02] text-text-secondary hover:text-white hover:border-white/10'
              }`}
            >
              {sport.label}
            </button>
          ))}
        </div>
      </div>

      {/* League Selector */}
      <div className="space-y-2">
        <label className="text-[10px] font-mono text-text-secondary uppercase tracking-wider">
          Ligue / Tournoi
        </label>
        <select
          value={selectedLeague}
          onChange={(e) => onLeagueChange(e.target.value)}
          className="w-full bg-[#121212] border border-white/10 rounded-lg p-2 text-xs font-mono text-white outline-none focus:border-accent-neon transition-colors"
        >
          <option value="all">Toutes les ligues</option>
          {leagues.map((league) => (
            <option key={league} value={league}>
              {league}
            </option>
          ))}
        </select>
      </div>

      {/* Timeframe Selector */}
      <div className="space-y-2">
        <label className="text-[10px] font-mono text-text-secondary uppercase tracking-wider">
          Horizon Temporel
        </label>
        <div className="flex flex-wrap gap-2">
          {TIMEFRAMES.map((timeframe) => (
            <button
              key={timeframe.id}
              onClick={() => onTimeframeChange(timeframe.id)}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors outline-none border ${
                selectedTimeframe === timeframe.id
                  ? 'bg-white text-black border-white font-bold'
                  : 'bg-transparent text-text-secondary border-white/10 hover:text-white hover:border-white/20'
              }`}
            >
              {timeframe.label}
            </button>
          ))}
        </div>
      </div>

      {/* Value Bets Toggle Switch */}
      <div className="flex items-center justify-between py-2 border-y border-white/5">
        <span className="text-[10px] font-mono text-text-secondary uppercase tracking-wider">
          Value Bets Uniquement
        </span>
        <button
          onClick={() => onValueBetsToggle(!showOnlyValueBets)}
          className={`relative w-8 h-4 rounded-full transition-colors duration-200 outline-none ${
            showOnlyValueBets ? 'bg-accent-neon' : 'bg-white/10'
          }`}
        >
          <motion.div
            animate={{ x: showOnlyValueBets ? 18 : 2 }}
            className={`w-3 h-3 rounded-full ${
              showOnlyValueBets ? 'bg-black' : 'bg-white/60'
            }`}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        </button>
      </div>

      {/* Sort Selector */}
      <div className="space-y-2">
        <label className="text-[10px] font-mono text-text-secondary uppercase tracking-wider">
          Trier Par
        </label>
        <div className="flex gap-2">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => onSortChange(option.id)}
              className={`flex-1 py-2 text-xs font-mono font-bold uppercase rounded-lg border transition-colors outline-none text-center ${
                sortBy === option.id
                  ? 'border-accent-neon bg-accent-neon/10 text-accent-neon'
                  : 'border-white/5 bg-white/[0.02] text-text-secondary hover:text-white'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
