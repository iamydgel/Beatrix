import React from 'react';
import { BentoGrid } from "@/components/home/BentoGrid";
import { EvidenceCard } from "@/components/home/EvidenceCard";
import { PrecisionSweep } from "@/components/home/PrecisionSweep";

export default function Page() {
  return (
    <div className="min-h-screen p-8 md:p-12 space-y-12 max-w-7xl mx-auto relative overflow-hidden">
      <PrecisionSweep />
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      {/* Hero Section */}
      <header className="relative flex flex-col md:flex-row md:items-end justify-between gap-6 p-6 rounded-2xl border border-white/5 bg-[#121212]/60 backdrop-blur-xl overflow-hidden">
        {/* Grain Overlay */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }} />
        
        <div className="space-y-3 relative z-10">
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
        {[...Array(6)].map((_, i) => (
          <EvidenceCard key={i} />
        ))}
      </BentoGrid>
    </div>
  );
}

