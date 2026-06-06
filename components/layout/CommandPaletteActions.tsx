"use client";

import React from 'react';
import { NeonCard } from "@/components/ui/NeonCard";
import { Zap, Target, TrendingUp, BookOpen, Settings, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface Action {
  id: string;
  label: string;
  desc: string;
  icon: LucideIcon;
  cmd: string;
}

const ACTIONS: Action[] = [
  { id: 'top', label: 'Top Picks', desc: 'Meilleures opportunités', icon: Zap, cmd: '/top' },
  { id: 'edge', label: 'Avantages', desc: 'Détecter les plus gros edges', icon: Target, cmd: '/edge' },
  { id: 'true', label: 'Probabilité Pure', desc: 'Calculer sans la marge', icon: TrendingUp, cmd: '/true' },
  { id: 'guide', label: 'Guide Pro', desc: 'Apprendre la stratégie', icon: BookOpen, cmd: '/guide' },
  { id: 'settings', label: 'Paramètres', desc: 'Configuration du système', icon: Settings, cmd: '/settings' },
];

export const CommandPaletteActions = () => {
  return (
    <motion.div
      layout
      className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4"
    >
      {ACTIONS.map(action => (
        <NeonCard
          key={action.id}
          className="cursor-pointer group p-3 hover:border-accent-neon/60 transition-colors"
        >
          <div className="flex flex-col items-start gap-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-accent-neon"
            >
              <action.icon size={20} />
            </motion.div>
            <div className="space-y-1">
              <p className="text-xs font-bold font-mono text-white leading-tight">
                {action.label}
              </p>
              <p className="text-[10px] text-text-secondary font-mono leading-tight opacity-80">
                {action.desc}
              </p>
            </div>
          </div>
        </NeonCard>
      ))}
    </motion.div>
  );
};
