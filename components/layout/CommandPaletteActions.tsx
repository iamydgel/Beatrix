"use client";

import React from 'react';
import { NeonCard } from "@/components/ui/NeonCard";
import { 
  ZapIcon, 
  TrendingUpIcon, 
  SettingsIcon, 
  ChartLineIcon,
  ShieldCheckIcon,
  AlarmClockIcon,
  LockIcon,
  BookmarkPlusIcon,
  SearchIcon
} from "lucide-animated";

import { motion } from "framer-motion";

interface Action {
  id: string;
  label: string;
  desc: string;
  icon: any;
  cmd: string;
  pro?: boolean;
  proTip?: string;
}

const ACTIONS: Action[] = [
  { id: 'top', label: 'Top Picks', desc: 'Signaux EV+ détectés', icon: ZapIcon, cmd: '/top', pro: true, proTip: 'Analyse basée sur la variance historique et le volume' },
  { id: 'edge', label: 'Avantages', desc: 'Plus gros écarts bookies', icon: SearchIcon, cmd: '/edge', pro: true, proTip: 'Détection d\'anomalies via filtrage Poisson' },
  { id: 'true', label: 'Probabilité Pure', desc: 'Retrait de la marge (Vig)', icon: TrendingUpIcon, cmd: '/true', pro: true, proTip: 'Calcul du devigging multi-sources' },
  { id: 'stake', label: 'Calcul Mise', desc: 'Gestion de bankroll Kelly', icon: AlarmClockIcon, cmd: '/stake', pro: true, proTip: 'Optimisation du critère de Kelly fractionné' },
  { id: 'audit', label: 'Audit Performance', desc: 'Analyse de votre CLV', icon: ChartLineIcon, cmd: '/audit', pro: true },
  { id: 'guide', label: 'Guide Stratégie', desc: 'Apprendre les concepts', icon: BookmarkPlusIcon, cmd: '/guide' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  show: { opacity: 1, scale: 1, y: 0 }
};

export const CommandPaletteActions = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 md:grid-cols-3 gap-3 p-2"
    >
      {ACTIONS.map(action => (
        <motion.div key={action.id} variants={itemVariants}>
          <NeonCard
            className="cursor-pointer group p-4 h-full hover:border-accent-neon/60 transition-all duration-300 relative overflow-hidden"
          >
            <div className="flex flex-col items-start gap-3">
              <div className="text-accent-neon bg-accent-neon/5 p-2 rounded-lg border border-accent-neon/10 group-hover:border-accent-neon/30 group-hover:bg-accent-neon/10 transition-colors">
                <action.icon size={22} strokeWidth={2} />
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-bold font-mono text-white leading-tight flex items-center gap-1.5 uppercase tracking-tighter">
                  {action.label}
                  {action.pro && (
                    <span className="text-[7px] bg-accent-neon text-black px-1 py-0.5 rounded-sm font-black uppercase leading-none">
                      Pro
                    </span>
                  )}
                </p>
                <p className="text-[9px] text-text-secondary font-mono leading-tight opacity-60 group-hover:opacity-100 transition-opacity uppercase tracking-tight">
                  {action.desc}
                </p>
              </div>
            </div>

            {/* Pro Tip Overlay - Precise & Technical */}
            {action.proTip && (
              <div className="absolute inset-0 bg-[#0A0A0A]/95 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center pointer-events-none">
                <div className="space-y-2">
                  <div className="w-1 h-1 bg-accent-neon rounded-full mx-auto animate-pulse" />
                  <p className="text-[10px] text-accent-neon font-mono font-bold leading-relaxed uppercase tracking-tighter">
                    {action.proTip}
                  </p>
                </div>
              </div>
            )}
          </NeonCard>
        </motion.div>
      ))}
    </motion.div>
  );
};
