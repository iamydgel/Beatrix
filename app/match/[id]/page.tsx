import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Scorecard } from '@/components/match/Scorecard';
import { JustificationPanel, Factor } from '@/components/match/JustificationPanel';
import { DistributionGraph, Outcome } from '@/components/match/DistributionGraph';
import { ArrowLeft, Check } from 'lucide-react';

interface MatchDetails {
  id: string;
  sport: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  beatrixProb: number;
  bookmakerProb: number;
  confidence: number;
  status: 'success' | 'warning' | 'error';
  isValueBet: boolean;
  odd: number;
  factors: Factor[];
  outcomes: Outcome[];
}

const MATCHES_DATABASE: Record<string, MatchDetails> = {
  '1': {
    id: '1',
    sport: 'football',
    league: 'La Liga',
    homeTeam: 'Real Madrid',
    awayTeam: 'FC Barcelone',
    date: 'Aujourd\'hui, 21:00',
    beatrixProb: 74.2,
    bookmakerProb: 60.5,
    confidence: 88,
    status: 'success',
    isValueBet: true,
    odd: 1.65,
    factors: [
      { id: 'f1', title: 'Forme à domicile', desc: 'Real Madrid a remporté ses 8 derniers matchs à domicile en championnat.', status: 'success' },
      { id: 'f2', title: 'Absences clés', desc: 'Robert Lewandowski est suspendu côté FC Barcelone.', status: 'success' },
      { id: 'f3', title: 'Stabilité défensive', desc: 'Seulement 2 buts encaissés lors des 5 dernières confrontations directes.', status: 'success' },
      { id: 'f4', title: 'Fatigue européenne', desc: 'Le Real a joué en Ligue des Champions il y a seulement 3 jours.', status: 'warning' },
    ],
    outcomes: [
      { label: 'Victoire Real Madrid (1)', prob: 74.2, odd: 1.65 },
      { label: 'Match Nul (N)', prob: 17.3, odd: 3.80 },
      { label: 'Victoire FC Barcelone (2)', prob: 8.5, odd: 5.50 },
    ],
  },
  '2': {
    id: '2',
    sport: 'football',
    league: 'Premier League',
    homeTeam: 'Arsenal',
    awayTeam: 'Liverpool',
    date: 'Demain, 17:30',
    beatrixProb: 48.5,
    bookmakerProb: 45.0,
    confidence: 65,
    status: 'warning',
    isValueBet: false,
    odd: 2.20,
    factors: [
      { id: 'f1', title: 'Forme du moment', desc: 'Les deux équipes sont sur une série de 3 victoires consécutives.', status: 'warning' },
      { id: 'f2', title: 'Retours de blessure', desc: 'Bukayo Saka est annoncé titulaire pour Arsenal.', status: 'success' },
      { id: 'f3', title: 'Défense affaiblie', desc: 'Virgil van Dijk est incertain côté Liverpool.', status: 'success' },
      { id: 'f4', title: 'Historique des face-à-face', desc: 'Les 4 derniers duels se sont soldés par 3 matchs nuls.', status: 'warning' },
    ],
    outcomes: [
      { label: 'Victoire Arsenal (1)', prob: 48.5, odd: 2.20 },
      { label: 'Match Nul (N)', prob: 28.0, odd: 3.40 },
      { label: 'Victoire Liverpool (2)', prob: 23.5, odd: 3.10 },
    ],
  },
  '3': {
    id: '3',
    sport: 'basketball',
    league: 'NBA',
    homeTeam: 'LA Lakers',
    awayTeam: 'Golden State',
    date: 'Aujourd\'hui, 04:30',
    beatrixProb: 68.0,
    bookmakerProb: 52.0,
    confidence: 82,
    status: 'success',
    isValueBet: true,
    odd: 1.92,
    factors: [
      { id: 'f1', title: 'Avantage terrain', desc: 'Les Lakers affichent un taux de victoire de 80% à la Crypto.com Arena.', status: 'success' },
      { id: 'f2', title: 'Impact offensif', desc: 'Le modèle prévoit une efficacité offensive accrue suite aux ajustements tactiques.', status: 'success' },
      { id: 'f3', title: 'Fatigue accumulée', desc: 'Golden State est sur le deuxième match d\'un back-to-back.', status: 'success' },
      { id: 'f4', title: 'Facteur fatigue Lakers', desc: 'Les Lakers n\'ont pas eu de repos prolongé non plus.', status: 'warning' },
    ],
    outcomes: [
      { label: 'Victoire LA Lakers (1)', prob: 68.0, odd: 1.92 },
      { label: 'Victoire Golden State (2)', prob: 32.0, odd: 2.10 },
    ],
  },
};

// Page component expects params as a Promise in Next.js 16/15
export default async function MatchPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const match = MATCHES_DATABASE[resolvedParams.id];

  if (!match) {
    notFound();
  }

  return (
    <div className="min-h-screen p-6 md:p-12 space-y-10 max-w-7xl mx-auto">
      {/* Navigation and Title */}
      <header className="space-y-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-text-secondary hover:text-white transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Retour aux opportunités
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono text-accent-neon uppercase tracking-wider bg-accent-neon/10 px-2 py-0.5 rounded">
              {match.league}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold font-mono text-white tracking-tight uppercase mt-2">
              {match.homeTeam} <span className="text-text-secondary">vs</span> {match.awayTeam}
            </h1>
            <p className="text-xs font-mono text-text-secondary mt-1">{match.date}</p>
          </div>
          {match.isValueBet && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-neon/10 border border-accent-neon/20 rounded-full text-xs font-mono text-accent-neon uppercase tracking-wider self-start md:self-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-neon animate-pulse" />
              Value Bet Détecté
            </div>
          )}
        </div>
      </header>

      {/* Main Analysis Sections */}
      <div className="space-y-8">
        {/* Comparison Scorecard */}
        <Scorecard
          beatrixProb={match.beatrixProb}
          bookmakerProb={match.bookmakerProb}
          odd={match.odd}
          isValueBet={match.isValueBet}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Distribution Graph */}
          <DistributionGraph outcomes={match.outcomes} />

          {/* Model Justifications */}
          <JustificationPanel factors={match.factors} />
        </div>

        {/* CTA Banner */}
        {match.isValueBet && (
          <div className="p-6 rounded-2xl border border-accent-neon/30 bg-accent-neon/[0.02] flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center md:text-left">
              <h4 className="text-sm font-bold font-mono text-white uppercase tracking-wider flex items-center justify-center md:justify-start gap-2">
                <Check size={16} className="text-accent-neon" />
                Opportunité à haute rentabilité
              </h4>
              <p className="text-xs font-mono text-text-secondary">
                L'indice de confiance est élevé ({match.confidence}%) et l'avantage théorique est de +{(match.beatrixProb - match.bookmakerProb).toFixed(1)}%.
              </p>
            </div>
            <button className="px-6 py-3 bg-accent-neon hover:bg-accent-neon/80 text-black text-xs font-bold font-mono uppercase rounded-lg transition-colors shadow-[0_0_15px_rgba(0,255,159,0.2)]">
              Suivre la prédiction
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
