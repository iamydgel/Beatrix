"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface WatchlistContextType {
  watchlist: string[]; // Array of match IDs
  addToWatchlist: (matchId: string) => void;
  removeFromWatchlist: (matchId: string) => void;
  isInWatchlist: (matchId: string) => boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const WatchlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [watchlist, setWatchlist] = useState<string[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('beatrix-watchlist');
    if (saved) {
      try {
        setWatchlist(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse watchlist', e);
      }
    }
  }, []);

  // Save to localStorage when changed
  useEffect(() => {
    localStorage.setItem('beatrix-watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (matchId: string) => {
    setWatchlist((prev) => {
      if (prev.includes(matchId)) return prev;
      return [...prev, matchId];
    });
  };

  const removeFromWatchlist = (matchId: string) => {
    setWatchlist((prev) => prev.filter((id) => id !== matchId));
  };

  const isInWatchlist = (matchId: string) => watchlist.includes(matchId);

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
};
