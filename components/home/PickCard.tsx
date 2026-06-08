"use client";

import Link from 'next/link';
import { NeonCard } from '@/components/ui/NeonCard';
import { ProbabilityValue } from '@/components/ui/ProbabilityValue';
import { ConfidenceBar } from '@/components/ui/ConfidenceBar';
import { StatusIcon } from '@/components/ui/StatusIcon';
import { ArrowRight, Bookmark, BookmarkCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWatchlist } from '@/lib/watchlist-context';

export interface PickData {
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
}

interface PickCardProps {
  pick: PickData;
}

export const PickCard = ({ pick }: PickCardProps) => {
  const { addToWatchlist, isInWatchlist } = useWatchlist();
  const isBookmarked = isInWatchlist(pick.id);
  const edge = (pick.beatrixProb - pick.bookmakerProb).toFixed(1);
  const edgeValue = parseFloat(edge);

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 100 }}
      dragElastic={0.1}
      onDragEnd={(_, info) => {
        if (info.offset.x > 80) {
          addToWatchlist(pick.id);
        }
      }}
      className="relative"
    >
      {/* Swipe Indicator (Visible behind during drag) */}
      <div className="absolute left-0 top-0 bottom-0 w-24 flex items-center justify-start pl-6 pointer-events-none -z-10">
        <div className="flex flex-col items-center gap-1">
          <Bookmark className="text-accent-neon animate-pulse" size={16} />
          <span className="text-[8px] font-mono text-accent-neon uppercase tracking-tighter">Save</span>
        </div>
      </div>

      <NeonCard className={`flex flex-col justify-between h-full min-h-[220px] p-3 transition-colors duration-500 ${isBookmarked ? 'border-accent-neon/30 bg-accent-neon/[0.02]' : ''}`}>
        <div className="space-y-3">
          {/* Card Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono text-accent-neon uppercase tracking-tighter bg-accent-neon/10 px-1.5 py-0.5 rounded border border-accent-neon/20 truncate max-w-[100px]">
                {pick.league}
              </span>
              <p className="text-[9px] font-mono text-text-secondary uppercase opacity-60">
                {pick.date}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {isBookmarked && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-accent-neon"
                >
                  <BookmarkCheck size={14} />
                </motion.div>
              )}
              <StatusIcon type={pick.status} size={14} />
            </div>
          </div>

          {/* Teams & Confidence Bar */}
          <div className="grid grid-cols-1 gap-1 py-1">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-sm font-bold text-white font-mono leading-tight truncate uppercase tracking-tight">
                {pick.homeTeam}
              </h3>
              <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden relative">
                <ConfidenceBar progress={pick.confidence} />
              </div>
              <h3 className="text-sm font-bold text-white font-mono leading-tight truncate uppercase tracking-tight text-right">
                {pick.awayTeam}
              </h3>
            </div>
            <div className="flex justify-between text-[9px] font-mono text-text-secondary uppercase px-0.5">
              <span>Confiance: {pick.confidence}%</span>
            </div>
          </div>

          {/* Prediction Main stats */}
          <div className="flex items-center justify-between py-2 border-y border-white/5">
            <div className="space-y-0.5">
              <span className="text-[8px] font-mono text-text-secondary uppercase block opacity-70">
                Prob. Beatrix
              </span>
              <ProbabilityValue value={pick.beatrixProb} isValueBet={pick.isValueBet} />
            </div>
            <div className="text-right space-y-0.5">
              <span className="text-[8px] font-mono text-text-secondary uppercase block opacity-70">
                Cote Bookie
              </span>
              <span className="font-mono text-xl font-bold text-white block leading-none">
                {pick.odd.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Edge / Value indicator */}
          <div className="flex justify-between items-center text-[10px] font-mono">
            <span className="text-text-secondary opacity-70">Edge:</span>
            <span className={`font-bold ${edgeValue > 0 ? 'text-accent-neon' : 'text-text-secondary'}`}>
              {edgeValue > 0 ? `+${edge}%` : `${edge}%`}
            </span>
          </div>
        </div>

        {/* Card Action Link */}
        <div className="pt-3 mt-auto">
          <Link
            href={`/match/${pick.id}`}
            className="w-full flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-accent-neon hover:text-black rounded-md text-[10px] font-mono font-bold uppercase transition-all duration-300 group/btn"
          >
            Analyse
            <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </NeonCard>
    </motion.div>
  );
}
