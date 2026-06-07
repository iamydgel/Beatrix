"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { NeonCard } from '@/components/ui/NeonCard';
import { TrendingUp, Award, Clock, DollarSign } from 'lucide-react';

interface PastBet {
  id: string;
  match: string;
  sport: string;
  odd: number;
  beatrixProb: number;
  result: 'win' | 'loss';
  profit: number; // in units
  date: string;
}

const PAST_BETS: PastBet[] = [
  { id: '1', match: 'Real Madrid vs Chelsea', sport: 'football', odd: 1.85, beatrixProb: 65.2, result: 'win', profit: 0.85, date: '04 Juin, 21:00' },
  { id: '2', match: 'LA Lakers vs Golden State', sport: 'basketball', odd: 1.95, beatrixProb: 59.8, result: 'win', profit: 0.95, date: '03 Juin, 04:30' },
  { id: '3', match: 'PSG vs Monaco', sport: 'football', odd: 1.55, beatrixProb: 75.0, result: 'loss', profit: -1.00, date: '02 Juin, 20:45' },
  { id: '4', match: 'Djokovic vs Nadal', sport: 'tennis', odd: 2.10, beatrixProb: 58.4, result: 'win', profit: 1.10, date: '01 Juin, 15:00' },
  { id: '5', match: 'Arsenal vs Liverpool', sport: 'football', odd: 2.30, beatrixProb: 51.5, result: 'loss', profit: -1.00, date: '30 Mai, 17:30' },
];

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen p-8 md:p-12 space-y-10 max-w-7xl mx-auto">
      {/* Header */}
      <header className="space-y-2 border-b border-white/5 pb-4">
        <h1 className="text-3xl font-extrabold font-mono tracking-tight text-white uppercase">
          Tableau des Analytiques
        </h1>
        <p className="text-sm text-text-secondary font-mono">
          Suivi de la performance algorithmique et audit historique de la valeur générée.
        </p>
      </header>

      {/* Main Stats Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <NeonCard className="flex flex-col justify-between p-4 min-h-[120px]">
          <div className="flex items-center justify-between text-text-secondary text-xs font-mono uppercase">
            <span>ROI Global</span>
            <TrendingUp size={16} className="text-accent-neon" />
          </div>
          <span className="font-mono text-3xl font-bold text-accent-neon mt-2">+12.4%</span>
          <p className="text-[10px] font-mono text-text-secondary mt-1">Calculé sur 142 paris enregistrés.</p>
        </NeonCard>

        <NeonCard className="flex flex-col justify-between p-4 min-h-[120px]">
          <div className="flex items-center justify-between text-text-secondary text-xs font-mono uppercase">
            <span>Taux de Réussite</span>
            <Award size={16} className="text-white" />
          </div>
          <span className="font-mono text-3xl font-bold text-white mt-2">58.3%</span>
          <p className="text-[10px] font-mono text-text-secondary mt-1">83 pronostics gagnants au total.</p>
        </NeonCard>

        <NeonCard className="flex flex-col justify-between p-4 min-h-[120px]">
          <div className="flex items-center justify-between text-text-secondary text-xs font-mono uppercase">
            <span>Battement CLV</span>
            <Clock size={16} className="text-accent-neon" />
          </div>
          <span className="font-mono text-3xl font-bold text-accent-neon mt-2">84.1%</span>
          <p className="text-[10px] font-mono text-text-secondary mt-1">Cote jouée supérieure à la cote de clôture.</p>
        </NeonCard>

        <NeonCard className="flex flex-col justify-between p-4 min-h-[120px]">
          <div className="flex items-center justify-between text-text-secondary text-xs font-mono uppercase">
            <span>Profit Cumulé</span>
            <DollarSign size={16} className="text-white" />
          </div>
          <span className="font-mono text-3xl font-bold text-white mt-2">+24.8 u</span>
          <p className="text-[10px] font-mono text-text-secondary mt-1">Unités de mise gagnées sur le long terme.</p>
        </NeonCard>
      </div>

      {/* Capital Growth SVG Chart */}
      <NeonCard className="p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-3">
            <h3 className="text-xs font-mono text-text-secondary uppercase tracking-widest font-bold">
              Courbe de Croissance du Capital
            </h3>
            <span className="text-[10px] font-mono text-accent-neon uppercase">Mise à jour : Temps Réel</span>
          </div>

          <div className="w-full h-64 relative">
            <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00FF9F" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#00FF9F" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Glow Area Under Line */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                d="M 10 180 Q 100 130 200 150 T 400 60 L 490 30 L 490 190 L 10 190 Z"
                fill="url(#chartGlow)"
              />
              {/* Glowing Line */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                d="M 10 180 Q 100 130 200 150 T 400 60 L 490 30"
                fill="none"
                stroke="#00FF9F"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex justify-between items-end pointer-events-none text-[8px] font-mono text-text-secondary px-2">
              <span>MAI 30</span>
              <span>JUIN 01</span>
              <span>JUIN 03</span>
              <span>JUIN 05</span>
            </div>
          </div>
        </div>
      </NeonCard>

      {/* Past Bets Table List */}
      <div className="p-6 rounded-2xl border border-white/5 bg-[#121212]/40 backdrop-blur-md space-y-6">
        <h3 className="text-xs font-mono text-text-secondary uppercase tracking-widest font-bold border-b border-white/5 pb-3">
          Historique des Paris Récents
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-white/10 text-text-secondary text-[10px] uppercase">
                <th className="py-3 px-2">Date</th>
                <th className="py-3 px-2">Match</th>
                <th className="py-3 px-2 text-center">Cote</th>
                <th className="py-3 px-2 text-center">Prob. Beatrix</th>
                <th className="py-3 px-2 text-center">Statut</th>
                <th className="py-3 px-2 text-right">Profit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-text-primary">
              {PAST_BETS.map((bet) => (
                <tr key={bet.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-2 text-text-secondary">{bet.date}</td>
                  <td className="py-3 px-2 font-bold">{bet.match}</td>
                  <td className="py-3 px-2 text-center">{bet.odd.toFixed(2)}</td>
                  <td className="py-3 px-2 text-center">{bet.beatrixProb.toFixed(1)}%</td>
                  <td className="py-3 px-2 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      bet.result === 'win'
                        ? 'bg-accent-neon/10 text-accent-neon'
                        : 'bg-red-500/10 text-red-500'
                    }`}>
                      {bet.result === 'win' ? 'Gagné' : 'Perdu'}
                    </span>
                  </td>
                  <td className={`py-3 px-2 text-right font-bold ${
                    bet.profit > 0 ? 'text-accent-neon' : 'text-red-500'
                  }`}>
                    {bet.profit > 0 ? `+${bet.profit.toFixed(2)} u` : `${bet.profit.toFixed(2)} u`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
