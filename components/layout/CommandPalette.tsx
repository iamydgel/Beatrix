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
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && query === '/guide') {
                      setIsGuideOpen(true);
                      setQuery("");
                    }
                  }}
                  placeholder="Search for anything..."
                  className="w-full bg-transparent text-white outline-none text-lg font-mono placeholder:text-text-secondary"
                />

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
