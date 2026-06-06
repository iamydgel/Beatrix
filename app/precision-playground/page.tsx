import React from 'react';
import { NeonCard } from "@/components/ui/NeonCard";
import { ProbabilityValue } from "@/components/ui/ProbabilityValue";
import { ConfidenceBar } from "@/components/ui/ConfidenceBar";
import { StatusIcon } from "@/components/ui/StatusIcon";

export default function Playground() {
  return (
    <div className="p-8 md:p-16 space-y-12 bg-background min-h-screen text-text-primary">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter font-mono">
          Beatrix <span className="text-accent-neon">// Precision Playground</span>
        </h1>
        <p className="text-text-secondary font-mono text-sm">
          Audit visuel des atomes de précision. Vérification des animations et de la luminescence.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Scénario 1: Value Bet (Luxe) */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono text-text-secondary uppercase tracking-widest px-2">Sujet : Value Bet (Haut Edge)</h2>
          <NeonCard>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-text-secondary font-mono">Real Madrid vs PSG</span>
                <StatusIcon type="success" />
              </div>
              <div className="py-4">
                <ProbabilityValue value={74.2} isValueBet={true} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-end text-[10px] font-mono text-text-secondary uppercase">
                  <span>Indice de Confiance</span>
                  <span>85%</span>
                </div>
                <ConfidenceBar progress={85} />
              </div>
            </div>
          </NeonCard>
        </div>

        {/* Scénario 2: Standard (Neutre) */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono text-text-secondary uppercase tracking-widest px-2">Sujet : Standard (Neutre)</h2>
          <NeonCard>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-text-secondary font-mono">Arsenal vs Liverpool</span>
                <StatusIcon type="warning" />
              </div>
              <div className="py-4">
                <ProbabilityValue value={48.5} isValueBet={false} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-end text-[10px] font-mono text-text-secondary uppercase">
                  <span>Indice de Confiance</span>
                  <span>40%</span>
                </div>
                <ConfidenceBar progress={40} />
              </div>
            </div>
          </NeonCard>
        </div>

        {/* Scénario 3: Risque (Faible) */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono text-text-secondary uppercase tracking-widest px-2">Sujet : Risque (Faible)</h2>
          <NeonCard>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-text-secondary font-mono">Napoli vs Milan</span>
                <StatusIcon type="error" />
              </div>
              <div className="py-4">
                <ProbabilityValue value={21.0} isValueBet={false} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-end text-[10px] font-mono text-text-secondary uppercase">
                  <span>Indice de Confiance</span>
                  <span>15%</span>
                </div>
                <ConfidenceBar progress={15} />
              </div>
            </div>
          </NeonCard>
        </div>
      </div>

      <footer className="pt-12 border-t border-white/5 flex justify-between items-center">
        <p className="text-[10px] font-mono text-text-secondary uppercase">
          Sytème de vérification v1.0 // Beatrix Core
        </p>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent-neon animate-pulse" />
            <span className="text-[10px] font-mono text-text-secondary">SENSORS ACTIVE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
