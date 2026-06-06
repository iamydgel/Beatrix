"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { X, HelpCircle, BookOpen, TrendingUp, Target, Zap } from 'lucide-react';

interface GuideSection {
  title: string;
  description: string;
  formula?: string;
  icon: React.ReactNode;
}

const SECTIONS: GuideSection[] = [
  {
    title: "Valeur Attendue (EV)",
    description: "L'EV est la moyenne pondérée des résultats possibles. Un EV positif signifie que le pari est rentable sur le long terme.",
    formula: "EV = (Probabilité de Gain × Gain) - (Probabilité de Perte × Perte)",
    icon: <TrendingUp className="text-accent-neon" size={20} />,
  },
  {
    title: "Critère de Kelly",
    description: "Définit la fraction optimale de votre capital à miser pour maximiser la croissance logarithmique tout en évitant la ruine.",
    formula: "f* = (bp - q) / b",
    icon: <Target className="text-accent-neon" size={20} />,
  },
  {
    title: "Valeur de Clôture (CLV)",
    description: "La probabilité réelle qu'un événement se produise, souvent différente de la probabilité implicite des cotes.",
    formula: "CLV = Prix Final / Probabilité Implicite",
    icon: <Zap className="text-accent-neon" size={20} />,
  },
];

export default function CommandGuide({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-lg bg-surface border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
      >
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-3">
            <BookOpen className="text-accent-neon" size={24} />
            <h2 className="text-xl font-bold font-mono text-white">Guide Stratégique Pro</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          <div className="flex gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
            <HelpCircle className="text-accent-neon shrink-0" size={24} />
            <p className="text-sm text-text-secondary font-mono italic">
              "L'avantage analytique consiste à trouver des écarts entre la probabilité réelle et la probabilité du marché."
            </p>
          </div>

          <div className="space-y-4">
            {SECTIONS.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-accent-neon/30 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  {section.icon}
                  <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wide">{section.title}</h3>
                </div>
                <p className="text-xs text-text-secondary font-mono mb-3 leading-relaxed">
                  {section.description}
                </p>
                {section.formula && (
                  <div className="p-2 bg-black/40 rounded border border-white/5 font-mono text-[10px] text-accent-neon/80 text-center">
                    {section.formula}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-white/5 border-t border-white/5 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-accent-neon text-black text-xs font-bold font-mono uppercase rounded-lg hover:bg-accent-neon/80 transition-colors"
          >
            Compris
          </button>
        </div>
      </motion.div>
    </div>
  );
}
