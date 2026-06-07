"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PickCard, PickData } from './PickCard';
import { SportFilter } from './SportFilter';

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
    date: '09 Juin, 15:00',
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
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
} as const;

export const TopPicksGrid = () => {
  const [selectedSport, setSelectedSport] = useState('all');
  const [showOnlyValueBets, setShowOnlyValueBets] = useState(false);

  const filteredPicks = useMemo(() => {
    return MOCK_PICKS.filter((pick) => {
      const matchSport = selectedSport === 'all' || pick.sport === selectedSport;
      const matchValue = !showOnlyValueBets || pick.isValueBet;
      return matchSport && matchValue;
    });
  }, [selectedSport, showOnlyValueBets]);

  return (
    <div className="space-y-8">
      {/* Slicer Filter Bar */}
      <SportFilter
        selectedSport={selectedSport}
        onSportChange={setSelectedSport}
        showOnlyValueBets={showOnlyValueBets}
        onValueBetsToggle={setShowOnlyValueBets}
      />

      {/* Grid Contenant */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredPicks.map((pick, index) => {
            // True Bento pattern: the very first high-value bet takes more space (2 columns on lg)
            const isLargeBentoItem = index === 0 && pick.isValueBet;
            return (
              <motion.div
                key={pick.id}
                variants={itemVariants}
                layout
                initial="hidden"
                animate="show"
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className={isLargeBentoItem ? 'md:col-span-2' : ''}
              >
                <PickCard pick={pick} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredPicks.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16 border border-white/5 rounded-2xl bg-[#121212]/20 font-mono text-text-secondary"
        >
          <p className="text-sm">Aucun Value Bet détecté pour cette sélection.</p>
        </motion.div>
      )}
    </div>
  );
};
