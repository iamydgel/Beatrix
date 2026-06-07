"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import CommandPalette from '@/components/layout/CommandPalette';

interface PaletteContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  togglePalette: () => void;
}

const PaletteContext = createContext<PaletteContextType | undefined>(undefined);

export function PaletteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const togglePalette = () => setIsOpen((prev) => !prev);

  return (
    <PaletteContext.Provider value={{ isOpen, setIsOpen, togglePalette }}>
      {children}
      <CommandPalette />
    </PaletteContext.Provider>
  );
}

export function usePalette() {
  const context = useContext(PaletteContext);
  if (context === undefined) {
    throw new Error('usePalette must be used within a PaletteProvider');
  }
  return context;
}
