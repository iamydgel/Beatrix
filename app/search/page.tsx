"use client";

import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { PickCard, PickData } from '@/components/home/PickCard';
import { QuickFilterChips } from '@/components/search/QuickFilterChips';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_PICKS } from '@/data/mock-picks';

const BEZIER_CURVE = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2
    }
  }
} as any;

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: BEZIER_CURVE
    }
  }
} as any;

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedLeague, setSelectedLeague] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');
  const [showOnlyValueBets, setShowOnlyValueBets] = useState(false);
  const [showHighConfidence, setShowHighConfidence] = useState(false);

  const filteredAndSortedPicks = useMemo(() => {
    let results = MOCK_PICKS.filter((pick) => {
      const searchMatch =
        pick.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pick.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pick.league.toLowerCase().includes(searchQuery.toLowerCase());

      const sportMatch = selectedSport === 'all' || pick.sport === selectedSport;
      const leagueMatch = selectedLeague === 'all' || pick.league === selectedLeague;
      const valueMatch = !showOnlyValueBets || pick.isValueBet;
      const confidenceMatch = !showHighConfidence || pick.confidence >= 80;

      let timeframeMatch = true;
      if (selectedTimeframe === 'today') {
        timeframeMatch = pick.date.includes("Aujourd'hui");
      } else if (selectedTimeframe === 'tomorrow') {
        timeframeMatch = pick.date.includes("Demain");
      } else if (selectedTimeframe === 'week') {
        timeframeMatch = !pick.date.includes("Dans 3 jours");
      }

      return searchMatch && sportMatch && leagueMatch && valueMatch && confidenceMatch && timeframeMatch;
    });

    results.sort((a, b) => a.id.localeCompare(b.id));
    return results;
  }, [searchQuery, selectedSport, selectedLeague, selectedTimeframe, showOnlyValueBets, showHighConfidence]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-accent-neon selection:text-black">
      <div className="max-w-xl mx-auto px-4 py-6 md:py-12 space-y-8">

        {/* Header - Simplified for Mobile Explorer Feed */}
        <header className="space-y-1">
          <h1 className="text-2xl font-black font-mono tracking-tighter uppercase italic">
            Explorer<span className="text-accent-neon">.</span>
          </h1>
          <p className="text-[10px] font-mono text-text-secondary uppercase tracking-widest opacity-50">
            Analyse probabiliste en temps réel
          </p>
        </header>

        {/* Svelte Search Bar */}
        <div className="relative group">
          <motion.div
            initial={false}
            animate={{
              width: isFocused ? '100%' : '100%',
              backgroundColor: isFocused ? 'rgba(20, 20, 20, 0.8)' : 'rgba(18, 18, 18, 0.4)',
              borderColor: isFocused ? '#00FF9F' : 'rgba(255, 255, 255, 0.1)'
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative flex items-center bg-[#121212]/40 backdrop-blur-xl border rounded-2xl px-4 py-3 transition-shadow focus-within:shadow-[0_0_20px_rgba(0,255,159,0.15)]"
          >
            <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-20 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            <motion.div
              animate={{
                scale: isFocused ? 1.1 : 1,
                color: isFocused ? '#00FF9F' : '#666'
              }}
            >
              <Search size={18} strokeWidth={2.5} />
            </motion.div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Rechercher un match..."
              className="w-full bg-transparent text-white outline-none font-mono text-sm ml-3 placeholder:text-text-secondary/40 relative z-10"
            />
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setSearchQuery('')}
                className="text-text-secondary hover:text-white text-[10px] font-mono uppercase tracking-tighter relative z-10"
              >
                Effacer
              </motion.button>
            )}
          </motion.div>
        </div>

        {/* Integration of the Ruban */}
        <div className="py-2">
          <QuickFilterChips
            selectedSport={selectedSport}
            selectedTimeframe={selectedTimeframe}
            showOnlyValueBets={showOnlyValueBets}
            showHighConfidence={showHighConfidence}
            onSportChange={setSelectedSport}
            onTimeframeChange={setSelectedTimeframe}
            onValueBetChange={setShowOnlyValueBets}
            onConfidenceChange={setShowHighConfidence}
          />
        </div>

        {/* Staggered Feed */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-4 pb-24"
        >
          <AnimatePresence mode="popLayout">
            {filteredAndSortedPicks.map((pick) => (
              <motion.div
                key={pick.id}
                variants={itemVariants}
                layout
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              >
                <PickCard pick={pick} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredAndSortedPicks.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 space-y-4 font-mono"
          >
            <div className="text-text-secondary/40 text-sm uppercase tracking-widest">
              Aucun signal détecté
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSport('all');
                setSelectedLeague('all');
                setSelectedTimeframe('all');
                setShowOnlyValueBets(false);
                setShowHighConfidence(false);
              }}
              className="px-6 py-2 border border-white/10 rounded-full hover:border-accent-neon hover:text-accent-neon transition-all text-[10px] uppercase tracking-widest"
            >
              Réinitialiser l'analyse
            </button>
          </motion.div>
        )}

        {/* Activity Indicator */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.5 }}
            className="flex items-center gap-3 px-4 py-2 rounded-full bg-[#121212]/90 backdrop-blur-md border border-white/10 shadow-2xl"
          >
            <div className="relative flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute w-2 h-2 bg-accent-neon rounded-full"
              />
              <div className="relative w-2 h-2 bg-accent-neon rounded-full shadow-[0_0_8px_#00FF9F]" />
            </div>
            <span className="text-[10px] font-mono text-white/80 uppercase tracking-tighter">
              Moteur d'analyse : <span className="text-accent-neon font-bold">Actif</span>
            </span>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
