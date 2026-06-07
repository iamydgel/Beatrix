"use client";

import React from 'react';
import { StatusIcon } from '@/components/ui/StatusIcon';
import { HelpCircle } from 'lucide-react';

export interface Factor {
  id: string;
  title: string;
  desc: string;
  status: 'success' | 'warning' | 'error';
}

interface JustificationPanelProps {
  factors: Factor[];
}

export const JustificationPanel = ({ factors }: JustificationPanelProps) => {
  return (
    <div className="p-6 rounded-2xl border border-white/5 bg-[#121212]/40 backdrop-blur-md space-y-6">
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <h3 className="text-xs font-mono text-text-secondary uppercase tracking-widest font-bold">
          Facteurs d'Influence du Modèle
        </h3>
        <div className="group relative cursor-pointer">
          <HelpCircle size={16} className="text-text-secondary hover:text-white transition-colors" />
          <div className="absolute right-0 bottom-full mb-2 w-64 p-3 bg-zinc-900 border border-white/10 rounded-xl text-[10px] font-mono text-text-secondary leading-relaxed opacity-0 group-hover:opacity-100 pointer-events-none transition-all z-50 shadow-2xl">
            Chaque facteur est audité en continu. Un statut au vert (✅) favorise notre prédiction, orange (⚠️) indique une incertitude, rouge (❌) s'y oppose.
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {factors.map((factor) => (
          <div
            key={factor.id}
            className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.01] border border-white/5 hover:border-white/10 transition-colors"
          >
            <div className="mt-0.5">
              <StatusIcon type={factor.status} size={16} />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wide">
                {factor.title}
              </h4>
              <p className="text-xs font-mono text-text-secondary leading-relaxed">
                {factor.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
