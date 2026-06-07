# Global Command Palette Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the "Command Center" (Cmd+K) for Beatrix, providing a hybrid interface of rapid action tiles and analytical search results.

**Architecture:** A singleton modal managed by a keyboard listener, splitting its view between a `Quick-Grid` of action tiles (when empty) and an `Analytical List` (when searching).

**Tech Stack:** Next.js 16, Tailwind CSS v4, Framer Motion (for layout transitions), Lucide Animated, React 19.

---

## File Map
- `components/layout/CommandPalette.tsx`: Root component, keyboard state management, and view switching.
- `components/layout/CommandPaletteActions.tsx`: Grid of action tiles utilizing `NeonCard` and `lucide-animated`.
- `components/layout/CommandPaletteSearch.tsx`: Search results list with "Zero-Click Value" rendering.
- `app/layout.tsx`: Integration of the Palette into the root layout.

---

## Implementation Tasks

### Task 1: Command Palette Root & Keyboard Logic

**Files:**
- Create: `components/layout/CommandPalette.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Implement the basic Modal shell with `backdrop-blur-xl` and gradient border.**
```tsx
// components/layout/CommandPalette.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/60 backdrop-blur-xl"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-2xl rounded-2xl border border-white/10 bg-surface shadow-2xl overflow-hidden"
          >
             {/* Content will be added in next tasks */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Implement the search input with the `accent-neon` cursor.**
- [ ] **Step 3: Integrate `CommandPalette` into `app/layout.tsx`.**
- [ ] **Step 4: Commit**
`git commit -m "feat: implement basic command palette shell and keyboard listener"`

---

### Task 2: Quick-Grid Action Tiles

**Files:**
- Create: `components/layout/CommandPaletteActions.tsx`
- Modify: `components/layout/CommandPalette.tsx`

- [ ] **Step 1: Define the action schema (Command, Label, Description, Icon).**
- [ ] **Step 2: Implement the `CommandPaletteActions` grid using `NeonCard`.**
```tsx
// components/layout/CommandPaletteActions.tsx
import { NeonCard } from "@/components/ui/NeonCard";
import { Zap, Target, TrendingUp, BookOpen, Settings } from "lucide-react";

const ACTIONS = [
  { id: 'top', label: 'Top Picks', desc: 'Meilleures opportunités', icon: Zap, cmd: '/top' },
  { id: 'edge', label: 'Avantages', desc: 'Détecter les plus gros edges', icon: Target, cmd: '/edge' },
  { id: 'true', label: 'Probabilité Pure', desc: 'Calculer sans la marge', icon: TrendingUp, cmd: '/true' },
  { id: 'guide', label: 'Guide Pro', desc: 'Apprendre la stratégie', icon: BookOpen, cmd: '/guide' },
  { id: 'settings', label: 'Paramètres', desc: 'Configuration du système', icon: Settings, cmd: '/settings' },
];

export const CommandPaletteActions = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4">
    {ACTIONS.map(action => (
      <NeonCard key={action.id} className="cursor-pointer group p-3">
        <div className="flex flex-col items-start gap-2">
          <action.icon size={20} className="text-accent-neon group-hover:scale-110 transition-transform" />
          <div className="space-y-1">
            <p className="text-xs font-bold font-mono text-white">{action.label}</p>
            <p className="text-[10px] text-text-secondary font-mono">{action.desc}</p>
          </div>
        </div>
      </NeonCard>
    ))}
  </div>
);
```

- [ ] **Step 3: Integrate `CommandPaletteActions` into `CommandPalette.tsx` when query is empty.**
- [ ] **Step 4: Commit**
`git commit -m "feat: implement command palette quick-grid actions"`

---

### Task 3: Analytical Search Results (Zero-Click Value)

**Files:**
- Create: `components/layout/CommandPaletteSearch.tsx`
- Modify: `components/layout/CommandPalette.tsx`

- [ ] **Step 1: Implement a mock database of matches with probabilities and confidence.**
- [ ] **Step 2: Create the `CommandPaletteSearch` result list with the analytical layout.**
```tsx
// components/layout/CommandPaletteSearch.tsx
import { ProbabilityValue } from "@/components/ui/ProbabilityValue";
import { StatusIcon } from "@/components/ui/StatusIcon";

export const CommandPaletteSearch = ({ query }: { query: string }) => {
  // Mock data filtering logic...
  return (
    <div className="flex flex-col p-2">
      {results.map(match => (
        <div className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors group">
          <div className="flex items-center gap-3">
            <StatusIcon type={match.status} />
            <span className="text-sm font-mono text-text-primary">{match.name}</span>
          </div>
          <div className="flex items-center gap-4">
            <ProbabilityValue value={match.prob} isValueBet={match.isValueBet} />
          </div>
        </div>
      ))}
    </div>
  );
};
```

- [ ] **Step 3: Implement the smooth transition between "Actions" and "Search" using Framer Motion `layout` prop.**
- [ ] **Step 4: Commit**
`git commit -m "feat: implement analytical search results with zero-click value"`

---

### Task 4: Mobile Adaptation & BottomNav Integration

**Files:**
- Modify: `components/layout/BottomNav.tsx`
- Modify: `components/layout/CommandPalette.tsx`

- [ ] **Step 1: Add a "⚡" trigger button to `BottomNav`.**
- [ ] **Step 2: Adapt the Palette layout for mobile (Full-screen overlay, optimized grid spacing).**
- [ ] **Step 3: Commit**
`git commit -m "feat: integrate command palette with mobile BottomNav"`

---

### Task 5: Pedagogical Guidance (The "Pro-Guide")

**Files:**
- Create: `components/layout/CommandGuide.tsx`
- Modify: `components/layout/CommandPalette.tsx`

- [ ] **Step 1: Implement the `/guide` command to open a simplified explanation of EV, Kelly, and CLV.**
- [ ] **Step 2: Add tooltips to "Pro" actions in the Quick-Grid.**
- [ ] **Step 3: Commit**
`git commit -m "feat: add pedagogical guide and tooltips to command palette"`
