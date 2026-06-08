"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CommandPaletteActions } from './CommandPaletteActions';
import { CommandPaletteSearch } from './CommandPaletteSearch';
import CommandGuide from './CommandGuide';
import { usePalette } from '@/components/providers/PaletteProvider';

export default function CommandPalette() {
  const { isOpen, setIsOpen } = usePalette();
  const [query, setQuery] = useState("");
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Mirror `isOpen` in a ref so the keyboard handler always reads the latest value
  // without re-binding the listener on every toggle (avoids the stale-closure bug
  // and avoids the cost of add/removeEventListener on each state change).
  const isOpenRef = useRef(isOpen);
  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(!isOpenRef.current);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-12 bg-black/60 backdrop-blur-xl md:pt-20"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full h-full md:h-auto max-w-2xl rounded-none md:rounded-2xl border-none md:border border-white/10 bg-surface shadow-2xl overflow-hidden flex flex-col md:block"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 md:p-4 flex-1 overflow-y-auto pb-24 md:pb-4">
                <div className="relative flex items-center gap-3 border-b border-white/10 pb-4 mb-2">
                  <div className="relative flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute w-2 h-2 bg-accent-neon rounded-full blur-[2px]"
                    />
                    <div className="w-2 h-2 bg-accent-neon rounded-full shadow-[0_0_10px_#00FF9F]" />
                  </div>
                  <input
                    autoFocus
                    type="text"
                    value={query}
                    onChange={(e) => {
                      const val = e.target.value;
                      setQuery(val);
                      if (val === "/guide") {
                        setIsGuideOpen(true);
                        setQuery("");
                      }
                    }}
                    placeholder="Saisissez une commande ou recherchez un match..."
                    className="w-full bg-transparent text-white outline-none text-base font-mono placeholder:text-text-secondary/30 caret-accent-neon"
                  />
                  {query && (
                    <button 
                      onClick={() => setQuery("")}
                      className="text-[10px] font-mono text-text-secondary hover:text-white uppercase tracking-tighter"
                    >
                      Effacer
                    </button>
                  )}
                </div>

                <div className="mt-4">
                  <AnimatePresence mode="wait">
                    {query === "" ? (
                      <motion.div
                        key="actions"
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CommandPaletteActions />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="search"
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CommandPaletteSearch query={query} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <CommandGuide isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
    </>
  );
}
