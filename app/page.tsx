import React from 'react';
import { BentoGrid } from "@/components/home/BentoGrid";
import { EvidenceCard } from "@/components/home/EvidenceCard";
import { PrecisionSweep } from "@/components/home/PrecisionSweep";
import { MOCK_PICKS } from "@/data/mock-picks";

export default function Page() {
  return (
    <div className="min-h-screen p-8 md:p-12 space-y-12 max-w-7xl mx-auto relative overflow-hidden">
      {/* Luxury Grain Overlay */}
      <div className="fixed inset-0 z-40 pointer-events-none opacity-[0.03] mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      <PrecisionSweep />

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      {/* Hero Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-neon/10 border border-accent-neon/20 rounded-full text-xs font-mono text-accent-neon uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-neon animate-pulse" />
            Moteur Probabiliste Actif
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-mono text-white leading-none">
            BEATRIX <span className="text-accent-neon">// PROBABILITÉS</span>
          </h1>
          <p className="text-sm md:text-base text-text-secondary max-w-xl font-mono">
            Optimisation et détection algorithmique de Value Bets. L'instrument de décision ultime pour les parieurs professionnels.
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="text-right">
            <span className="text-[10px] font-mono text-text-secondary uppercase block">
              Algorithmes Actifs
            </span>
            <span className="text-sm font-mono font-bold text-white block">
              Poisson / Monte Carlo
            </span>
          </div>
        </div>
      </header>

      {/* Main Grid Content */}
      <BentoGrid>
        {MOCK_PICKS.map((pick) => (
          <EvidenceCard key={pick.id} pick={pick} />
        ))}
      </BentoGrid>
    </div>
  );
}

