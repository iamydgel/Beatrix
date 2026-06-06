"use client";

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ProbabilityValue } from "@/components/ui/ProbabilityValue";
import { StatusIcon } from "@/components/ui/StatusIcon";

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

export const CommandPaletteSearch = ({ query }: { query: string }) => {
  const results = useMemo(() => {
    return MOCK_MATCHES.filter(match =>
      match.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  if (results.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-text-secondary font-mono text-sm italic">
          No matches found for "{query}"
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-2 gap-1">
      {results.map(match => (
        <motion.div
          key={match.id}
          layout
          className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors group"
        >
          <div className="flex items-center gap-3">
            <StatusIcon type={match.status} size={14} />
            <span className="text-sm font-mono text-text-primary group-hover:text-white transition-colors">
              {match.name}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
               <ProbabilityValue value={match.prob} isValueBet={match.isValueBet} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
