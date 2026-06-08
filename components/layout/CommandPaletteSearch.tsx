"use client";

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProbabilityValue } from "@/components/ui/ProbabilityValue";
import { ActivityIcon, ShieldCheckIcon, SearchIcon, ZapIcon } from "lucide-animated";

interface MatchResult {
  id: string;
  name: string;
  prob: number;
  confidence: number;
  status: 'success' | 'warning' | 'error';
  isValueBet: boolean;
}

const MOCK_MATCHES: MatchResult[] = [
  { id: '1', name: 'Real Madrid vs Barcelona', prob: 64.2, confidence: 88, status: 'success', isValueBet: true },
  { id: '2', name: 'Manchester City vs Liverpool', prob: 52.1, confidence: 72, status: 'warning', isValueBet: false },
  { id: '3', name: 'Bayern Munich vs Dortmund', prob: 71.5, confidence: 91, status: 'success', isValueBet: true },
  { id: '4', name: 'PSG vs Monaco', prob: 44.8, confidence: 65, status: 'error', isValueBet: false },
  { id: '5', name: 'Inter Milan vs AC Milan', prob: 58.9, confidence: 78, status: 'success', isValueBet: false },
  { id: '6', name: 'Arsenal vs Chelsea', prob: 61.0, confidence: 82, status: 'warning', isValueBet: true },
  { id: '7', name: 'Atletico Madrid vs Sevilla', prob: 49.2, confidence: 60, status: 'error', isValueBet: false },
  { id: '8', name: 'Napoli vs Lazio', prob: 55.4, confidence: 74, status: 'success', isValueBet: false },
  { id: '9', name: 'Juventus vs Roma', prob: 67.8, confidence: 85, status: 'success', isValueBet: true },
  { id: '10', name: 'Benfica vs Porto', prob: 38.5, confidence: 58, status: 'error', isValueBet: false },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0 }
};

export const CommandPaletteSearch = ({ query }: { query: string }) => {
  const results = useMemo(() => {
    return MOCK_MATCHES.filter(match =>
      match.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);
if (results.length === 0) {
  return (
    <div className="p-12 text-center space-y-2">
      <ActivityIcon size={24} className="mx-auto text-text-secondary opacity-20" />
      <p className="text-text-secondary font-mono text-[10px] uppercase tracking-widest italic">
        Aucun signal détecté pour "{query}"
      </p>
    </div>
  );
}

return (
  <motion.div 
    variants={containerVariants}
    initial="hidden"
    animate="show"
    className="flex flex-col p-1 gap-1"
  >
    <div className="px-3 py-1 mb-2 border-b border-white/5">
      <span className="text-[8px] font-mono text-text-secondary uppercase tracking-[0.2em]">
        Résultats de l'analyse ({results.length})
      </span>
    </div>

    {results.map(match => (
      <motion.div
        key={match.id}
        variants={itemVariants}
        className="flex items-center justify-between p-3 hover:bg-white/[0.03] rounded-xl cursor-pointer transition-all group border border-transparent hover:border-white/5"
      >
        <div className="flex items-center gap-4">
          <div className={`p-1.5 rounded-lg ${
            match.status === 'success' ? 'bg-accent-neon/10 text-accent-neon' :
            match.status === 'warning' ? 'bg-semantic-warning/10 text-semantic-warning' :
            'bg-semantic-error/10 text-semantic-error'
          }`}>
            {match.isValueBet ? <ZapIcon size={14} /> : <SearchIcon size={14} />}
          </div>

...

            <div className="flex flex-col">
              <span className="text-xs font-bold font-mono text-text-primary group-hover:text-white transition-colors uppercase tracking-tight">
                {match.name}
              </span>
              <span className="text-[9px] font-mono text-text-secondary uppercase opacity-50">
                Match ID: {match.id}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end gap-1">
              <ProbabilityValue value={match.prob} isValueBet={match.isValueBet} />
            </div>
            
            {/* Confidence Point Indicator */}
            <div className="relative flex items-center justify-center w-4">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ repeat: Infinity, duration: 2 }}
                className={`absolute w-1.5 h-1.5 rounded-full blur-[2px] ${
                  match.confidence >= 85 ? 'bg-accent-neon' :
                  match.confidence >= 70 ? 'bg-semantic-warning' :
                  'bg-semantic-error'
                }`}
              />
              <div className={`w-1 h-1 rounded-full relative z-10 ${
                match.confidence >= 85 ? 'bg-accent-neon shadow-[0_0_8px_#00FF9F]' :
                match.confidence >= 70 ? 'bg-semantic-warning shadow-[0_0_8px_#FFB800]' :
                'bg-semantic-error shadow-[0_0_8px_#FF4B4B]'
              }`} />
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
