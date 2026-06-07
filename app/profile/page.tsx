"use client";

import React, { useState } from 'react';
import { NeonCard } from '@/components/ui/NeonCard';
import { User, Settings, Shield, Wallet, Percent, BookOpen } from 'lucide-react';

export default function ProfilePage() {
  const [bankroll, setBankroll] = useState(10000);
  const [kellyFraction, setKellyFraction] = useState(0.25);
  const [oddsFormat, setOddsFormat] = useState('decimal');
  const [selectedBookmakers, setSelectedBookmakers] = useState<string[]>(['betclic', 'winamax']);

  const bookmakers = [
    { id: 'betclic', name: 'Betclic' },
    { id: 'winamax', name: 'Winamax' },
    { id: 'unibet', name: 'Unibet' },
    { id: 'pmu', name: 'PMU Sport' },
    { id: 'parionssport', name: 'Parions Sport' },
  ];

  const handleBookmakerToggle = (id: string) => {
    setSelectedBookmakers((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen p-8 md:p-12 space-y-10 max-w-7xl mx-auto">
      {/* Header */}
      <header className="space-y-2 border-b border-white/5 pb-4">
        <h1 className="text-3xl font-extrabold font-mono tracking-tight text-white uppercase">
          Profil & Configuration
        </h1>
        <p className="text-sm text-text-secondary font-mono">
          Ajustez les paramètres du calculateur de mise et gérez votre profil professionnel.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: User Overview & Account Status */}
        <div className="lg:col-span-1 space-y-6">
          <NeonCard className="text-center p-6 space-y-4">
            <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 border border-white/10 flex items-center justify-center">
              <User size={36} className="text-text-secondary" />
            </div>
            <div className="space-y-1">
              <h3 className="font-mono text-lg font-bold text-white uppercase">Parieur Pro</h3>
              <p className="font-mono text-[10px] text-text-secondary">Membre depuis Juin 2026</p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-neon/10 border border-accent-neon/20 rounded-full text-xs font-mono text-accent-neon uppercase tracking-wider">
              <Shield size={12} />
              Licence PRO Active
            </div>
          </NeonCard>

          <div className="p-5 rounded-2xl border border-white/5 bg-[#121212]/40 backdrop-blur-md space-y-4 font-mono text-xs">
            <h4 className="text-[10px] text-text-secondary uppercase tracking-wider border-b border-white/5 pb-2 font-bold">
              Résumé d'Abonnement
            </h4>
            <div className="flex justify-between">
              <span className="text-text-secondary">Statut :</span>
              <span className="text-accent-neon font-bold">Actif (Annuel)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Prochain prélèvement :</span>
              <span className="text-white">01 Juin 2027</span>
            </div>
          </div>
        </div>

        {/* Right: Engine Settings Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl border border-white/5 bg-[#121212]/40 backdrop-blur-md space-y-6">
            <h3 className="text-xs font-mono text-text-secondary uppercase tracking-widest font-bold border-b border-white/5 pb-3 flex items-center gap-2">
              <Settings size={14} className="text-accent-neon" />
              Paramètres du Moteur Decisionnel
            </h3>

            {/* Bankroll Size Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-text-secondary uppercase tracking-wider flex items-center gap-1.5">
                <Wallet size={12} />
                Taille du Capital (Bankroll)
              </label>
              <div className="relative flex items-center bg-[#121212]/60 border border-white/10 rounded-lg px-3 py-2.5 focus-within:border-accent-neon transition-colors">
                <input
                  type="number"
                  value={bankroll}
                  onChange={(e) => setBankroll(Number(e.target.value))}
                  className="w-full bg-transparent text-white outline-none font-mono text-sm"
                />
                <span className="text-xs font-mono text-text-secondary ml-2">EUR</span>
              </div>
            </div>

            {/* Kelly Criterion Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-mono text-text-secondary uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Percent size={12} />
                  Fraction de Kelly active
                </span>
                <span className="text-accent-neon font-bold">x{kellyFraction.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="1.0"
                step="0.05"
                value={kellyFraction}
                onChange={(e) => setKellyFraction(Number(e.target.value))}
                className="w-full accent-accent-neon bg-white/10 h-1 rounded-lg cursor-pointer"
              />
              <p className="text-[10px] font-mono text-text-secondary leading-relaxed">
                Le multiplicateur applique une réduction sur la mise conseillée Kelly pour atténuer la variance de votre capital (0.25 est recommandé pour la sécurité).
              </p>
            </div>

            {/* Odds Format Selector */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-text-secondary uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen size={12} />
                Format des cotes
              </label>
              <div className="flex gap-3">
                {['decimal', 'american', 'fractional'].map((format) => (
                  <button
                    key={format}
                    onClick={() => setOddsFormat(format)}
                    className={`flex-1 py-2 text-xs font-mono font-bold uppercase rounded-lg border transition-colors outline-none text-center ${
                      oddsFormat === format
                        ? 'border-accent-neon bg-accent-neon/10 text-accent-neon'
                        : 'border-white/5 bg-white/[0.02] text-text-secondary hover:text-white'
                    }`}
                  >
                    {format}
                  </button>
                ))}
              </div>
            </div>

            {/* Bookmakers Preferences Checkboxes */}
            <div className="space-y-3 pt-3 border-t border-white/5">
              <label className="text-[10px] font-mono text-text-secondary uppercase tracking-wider block">
                Bookmakers à auditer
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {bookmakers.map((bm) => {
                  const isChecked = selectedBookmakers.includes(bm.id);
                  return (
                    <button
                      key={bm.id}
                      onClick={() => handleBookmakerToggle(bm.id)}
                      className={`flex items-center justify-between p-3 rounded-lg border text-left font-mono text-xs transition-colors ${
                        isChecked
                          ? 'border-accent-neon/40 bg-accent-neon/[0.02] text-white'
                          : 'border-white/5 bg-white/[0.01] text-text-secondary hover:text-white hover:border-white/10'
                      }`}
                    >
                      <span>{bm.name}</span>
                      <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center text-[8px] font-black ${
                        isChecked ? 'bg-accent-neon border-accent-neon text-black' : 'border-white/20 bg-transparent'
                      }`}>
                        {isChecked && '✓'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-3 flex justify-end">
              <button className="px-6 py-2.5 bg-accent-neon hover:bg-accent-neon/80 text-black text-xs font-bold font-mono uppercase rounded-lg transition-colors">
                Enregistrer les préférences
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
