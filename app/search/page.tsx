"use client";

import React, { useState, useMemo } from 'react';
import { SearchIcon } from 'lucide-animated';
import { QuickFilterChips } from '@/components/search/QuickFilterChips';
import { PickCard, PickData } from '@/components/home/PickCard';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_PICKS: PickData[] = [
  {
    id: '1',
    sport: 'football',
    league: 'La Liga',
    homeTeam: 'Real Madrid',
    awayTeam: 'FC Barcelone',
    date: 'Aujourd\'hui, 21:00',
    beatrixProb: 74.2,
    bookmakerProb: 60.5,
    confidence: 88,
    status: 'success',
    isValueBet: true,
    odd: 1.65,
  },
  {
    id: '2',
    sport: 'football',
    league: 'Premier League',
    homeTeam: 'Arsenal',
    awayTeam: 'Liverpool',
    date: 'Demain, 17:30',
    beatrixProb: 48.5,
    bookmakerProb: 45.0,
    confidence: 65,
    status: 'warning',
    isValueBet: false,
    odd: 2.20,
  },
  {
    id: '3',
    sport: 'basketball',
    league: 'NBA',
    homeTeam: 'LA Lakers',
    awayTeam: 'Golden State',
    date: 'Aujourd\'hui, 04:30',
    beatrixProb: 68.0,
    bookmakerProb: 52.0,
    confidence: 82,
    status: 'success',
    isValueBet: true,
    odd: 1.92,
  },
  {
    id: '4',
    sport: 'tennis',
    league: 'Roland Garros',
    homeTeam: 'Carlos Alcaraz',
    awayTeam: 'Jannik Sinner',
    date: 'Demain, 15:00',
    beatrixProb: 55.4,
    bookmakerProb: 53.0,
    confidence: 74,
    status: 'success',
    isValueBet: false,
    odd: 1.88,
  },
  {
    id: '5',
    sport: 'football',
    league: 'Serie A',
    homeTeam: 'Napoli',
    awayTeam: 'AC Milan',
    date: 'Demain, 20:45',
    beatrixProb: 21.0,
    bookmakerProb: 35.0,
    confidence: 40,
    status: 'error',
    isValueBet: false,
    odd: 2.85,
  },
  {
    id: '6',
    sport: 'basketball',
    league: 'EuroLeague',
    homeTeam: 'Real Madrid Baloncesto',
    awayTeam: 'Monaco',
    date: 'Aujourd\'hui, 20:30',
    beatrixProb: 81.5,
    bookmakerProb: 70.0,
    confidence: 91,
    status: 'success',
    isValueBet: true,
    odd: 1.42,
  },
  {
    id: '7',
    sport: 'football',
    league: 'Premier League',
    homeTeam: 'Manchester City',
    awayTeam: 'Chelsea',
    date: 'Aujourd\'hui, 18:30',
    beatrixProb: 61.0,
    bookmakerProb: 50.0,
    confidence: 82,
    status: 'warning',
    isValueBet: true,
    odd: 2.00,
  },
  {
    id: '8',
    sport: 'tennis',
    league: 'Roland Garros',
    homeTeam: 'Novak Djokovic',
    awayTeam: 'Rafael Nadal',
    date: 'Dans 3 jours, 16:00',
    beatrixProb: 67.8,
    bookmakerProb: 55.0,
    confidence: 85,
    status: 'success',
    isValueBet: true,
    odd: 1.80,
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04
    }
  }
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      ease: [0.22, 1, 0.36, 1],
      duration: 0.6
    } 
  }
} as const;

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('all');
  const [showOnlyValueBets, setShowOnlyValueBets] = useState(false);
  const [minConfidence, setMinConfidence] = useState<number | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const filteredAndSortedPicks = useMemo(() => {
    return MOCK_PICKS.filter((pick) => {
      // Search query match
      const searchMatch =
        pick.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pick.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pick.league.toLowerCase().includes(searchQuery.toLowerCase());

      // Sport match
      const sportMatch = selectedSport === 'all' || pick.sport === selectedSport;

      // Value bets only match
      const valueMatch = !showOnlyValueBets || pick.isValueBet;

      // Confidence match
      const confidenceMatch = minConfidence === null || pick.confidence >= minConfidence;

      return searchMatch && sportMatch && valueMatch && confidenceMatch;
    }).sort((a, b) => {
      // Default: show highest edge first on explorer
      const edgeA = a.beatrixProb - a.bookmakerProb;
      const edgeB = b.beatrixProb - b.bookmakerProb;
      return edgeB - edgeA;
    });
  }, [searchQuery, selectedSport, showOnlyValueBets, minConfidence]);

  return (
    <div className="min-h-screen px-4 py-6 md:p-8 space-y-6 max-w-3xl mx-auto pb-24">
      {/* Page Header */}
      <header className="space-y-1.5">
        <h1 className="text-2xl font-extrabold font-mono tracking-tight text-white uppercase">
          Opportunity Explorer
        </h1>
        <p className="text-xs text-text-secondary font-mono">
          Feed d'opportunités en temps réel optimisé pour mobile.
        </p>
      </header>

      {/* Svelte Search Bar */}
      <motion.div 
        animate={{ 
          borderColor: isSearchFocused ? "#00FF9F" : "rgba(255, 255, 255, 0.08)",
          boxShadow: isSearchFocused ? "0 0 15px rgba(0, 255, 159, 0.1)" : "none"
        }}
        transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
        className="relative flex items-center bg-[#121212]/40 border rounded-xl px-3 py-2.5"
      >
        <SearchIcon 
          size={16} 
          className={`mr-2.5 transition-colors duration-300 ${isSearchFocused ? 'text-accent-neon' : 'text-text-secondary'}`} 
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          placeholder="Rechercher équipe, match..."
          className="w-full bg-transparent text-white outline-none font-mono text-xs placeholder:text-text-secondary"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-text-secondary hover:text-white text-[10px] font-mono px-1"
          >
            EFFACER
          </button>
        )}
      </motion.div>

      {/* Quick-Filter Ruban */}
      <QuickFilterChips 
        selectedSport={selectedSport}
        onSportChange={setSelectedSport}
        showOnlyValueBets={showOnlyValueBets}
        onValueBetsToggle={setShowOnlyValueBets}
        minConfidence={minConfidence}
        onMinConfidenceToggle={setMinConfidence}
      />

      {/* Waterfall Staggered Feed */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredAndSortedPicks.map((pick) => (
            <motion.div
              key={pick.id}
              variants={itemVariants}
              layout
              initial="hidden"
              animate="show"
              exit={{ scale: 0.95, opacity: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
              transition={{ layout: { type: "spring", stiffness: 180, damping: 22 } }}
            >
              <PickCard pick={pick} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredAndSortedPicks.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16 border border-white/5 rounded-xl bg-[#121212]/20 font-mono text-text-secondary"
        >
          <p className="text-xs">Aucune opportunité ne correspond aux critères.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedSport('all');
              setShowOnlyValueBets(false);
              setMinConfidence(null);
            }}
            className="mt-3 px-3 py-1.5 border border-white/10 rounded-lg hover:border-accent-neon hover:text-accent-neon transition-colors text-[10px] uppercase font-bold"
          >
            Réinitialiser
          </button>
        </motion.div>
      )}

      {/* Activity Indicator (Floating Bottom Badge) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#121212]/90 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 flex items-center gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF9F] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF9F]"></span>
        </span>
        <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-white">
          Moteur d'analyse : <span className="text-[#00FF9F]">Actif</span>
        </span>
      </div>
    </div>
  );
}
