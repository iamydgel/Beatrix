"use client";

import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
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
      staggerChildren: 0.05
    }
  }
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120 } }
} as const;

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedLeague, setSelectedLeague] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');
  const [showOnlyValueBets, setShowOnlyValueBets] = useState(false);
  // const [sortBy, setSortBy] = useState('date');

  const filteredAndSortedPicks = useMemo(() => {
    // 1. Filtering
    let results = MOCK_PICKS.filter((pick) => {
      // Search query match
      const searchMatch =
        pick.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pick.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pick.league.toLowerCase().includes(searchQuery.toLowerCase());

      // Sport match
      const sportMatch = selectedSport === 'all' || pick.sport === selectedSport;

      // League match
      const leagueMatch = selectedLeague === 'all' || pick.league === selectedLeague;

      // Value bets only match
      const valueMatch = !showOnlyValueBets || pick.isValueBet;

      // Timeframe match
      let timeframeMatch = true;
      if (selectedTimeframe === 'today') {
        timeframeMatch = pick.date.includes("Aujourd'hui");
      } else if (selectedTimeframe === 'tomorrow') {
        timeframeMatch = pick.date.includes("Demain");
      } else if (selectedTimeframe === 'week') {
        timeframeMatch = !pick.date.includes("Dans 3 jours"); // Rough logic based on mock dates
      }

      return searchMatch && sportMatch && leagueMatch && valueMatch && timeframeMatch;
    });

    // 2. Sorting
    results.sort((a, b) => {
      // Default / chronological order
      return a.id.localeCompare(b.id);
    });

    return results;
  }, [searchQuery, selectedSport, selectedLeague, selectedTimeframe, showOnlyValueBets]);

  return (
    <div className="min-h-screen p-8 md:p-12 space-y-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <header className="space-y-2 border-b border-white/5 pb-4">
        <h1 className="text-3xl font-extrabold font-mono tracking-tight text-white uppercase">
          Recherche & Découverte
        </h1>
        <p className="text-sm text-text-secondary font-mono">
          Explorez et filtrez l'intégralité du catalogue d'opportunités probabilistes.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Search Results Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search Input Bar */}
          <div className="relative flex items-center bg-[#121212]/40 border border-white/10 rounded-xl px-4 py-3 focus-within:border-accent-neon transition-colors">
            <Search className="text-text-secondary mr-3" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une équipe, un match, une ligue..."
              className="w-full bg-transparent text-white outline-none font-mono text-sm placeholder:text-text-secondary"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-text-secondary hover:text-white text-xs font-mono"
              >
                EFFACER
              </button>
            )}
          </div>

          {/* Results Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredAndSortedPicks.map((pick) => (
                <motion.div
                  key={pick.id}
                  variants={itemVariants}
                  layout
                  initial="hidden"
                  animate="show"
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                >
                  <PickCard pick={pick} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredAndSortedPicks.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 border border-white/5 rounded-2xl bg-[#121212]/20 font-mono text-text-secondary"
            >
              <p className="text-sm">Aucun résultat ne correspond à vos critères de recherche.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSport('all');
                  setSelectedLeague('all');
                  setSelectedTimeframe('all');
                  setShowOnlyValueBets(false);
                }}
                className="mt-4 px-4 py-2 border border-white/10 rounded-lg hover:border-accent-neon hover:text-accent-neon transition-colors text-xs uppercase"
              >
                Réinitialiser les filtres
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
