# UI Precision Kit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the fundamental "Precision" UI atoms (ProbabilityValue, ConfidenceBar, NeonCard, StatusIcon) with high-end animations and "Precision Dark" aesthetics.

**Architecture:** Modular atomic components using Framer Motion for physics-based animations, Tailwind 4 for styling, and Lucide Animated for organic motion.

**Tech Stack:** Next.js 16, Tailwind CSS v4, Framer Motion, Lucide Animated, ReactBits (via MCP).

---

## Task 1: ProbabilityValue Component

**Files:**
- Create: `components/ui/ProbabilityValue.tsx`

- [ ] **Step 1: Implement the `ProbabilityValue` component with a counting animation.**
Using Framer Motion's `useSpring` or a custom counter hook to animate from 0 to the target value.

```tsx
import React, { useEffect } from 'react';
import { motion, useSpring, useTransform, animate } from 'framer-motion';

interface ProbabilityValueProps {
  value: number; // 0 to 100
  isValueBet?: boolean;
}

export const ProbabilityValue = ({ value, isValueBet }: ProbabilityValueProps) => {
  const spring = useSpring(0, { stiffness: 100, damping: 20 });
  const displayValue = useTransform(spring, (latest) => 
    `${latest.toFixed(1)}%`
  );

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return (
    <div className="relative flex items-center justify-center">
      <motion.span 
        className={`font-mono text-3xl font-bold ${isValueBet ? 'text-accent-neon' : 'text-text-primary'}`}
        animate={isValueBet ? { scale: [1, 1.05, 1] } : {}}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        {displayValue}
      </motion.span>
      {isValueBet && (
        <div className="absolute inset-0 blur-md bg-accent-neon/20 pointer-events-none" />
      )}
    </div>
  );
};
```

- [ ] **Step 2: Commit**
`git commit -m "feat: implement ProbabilityValue with counting animation"`

---

## Task 2: ConfidenceBar Component

**Files:**
- Create: `components/ui/ConfidenceBar.tsx`

- [ ] **Step 1: Implement the `ConfidenceBar` with a luminescent head.**

```tsx
import React from 'react';
import { motion } from 'framer-motion';

interface ConfidenceBarProps {
  progress: number; // 0 to 100
}

export const ConfidenceBar = ({ progress }: ConfidenceBarProps) => {
  return (
    <div className="relative w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-gray-500 via-accent-neon to-accent-neon"
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-accent-neon rounded-full shadow-[0_0_8px_#00FF9F]" />
      </motion.div>
    </div>
  );
};
```

- [ ] **Step 2: Commit**
`git commit -m "feat: implement ConfidenceBar with luminescent head"`

---

## Task 3: NeonCard Component

**Files:**
- Create: `components/ui/NeonCard.tsx`

- [ ] **Step 1: Implement `NeonCard` with spotlight effect and dynamic borders.**

```tsx
"use client";
import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useCappedValue } from 'framer-motion';

interface NeonCardProps {
  children: React.ReactNode;
  className?: string;
}

export const NeonCard = ({ children, className = "" }: NeonCardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ clientX, clientY, currentTarget }: any) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div 
      onMouseMove={handleMouseMove}
      className={`relative group rounded-xl border border-white/10 bg-surface p-6 backdrop-blur-sm transition-colors hover:border-accent-neon/30 ${className}`}
    >
      <div 
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(0, 255, 159, 0.06), transparent 40%)`
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
```

- [ ] **Step 2: Commit**
`git commit -m "feat: implement NeonCard with spotlight effect"`

---

## Task 4: StatusIcon Component

**Files:**
- Create: `components/ui/StatusIcon.tsx`

- [ ] **Step 1: Implement `StatusIcon` using Lucide Animated.**
(Note: I will use a wrapper around lucide-react components to simulate the animations described in the spec).

```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

type StatusType = 'success' | 'warning' | 'error';

interface StatusIconProps {
  type: StatusType;
  size?: number;
}

export const StatusIcon = ({ type, size = 16 }: StatusIconProps) => {
  const icons = {
    success: { component: CheckCircle2, color: 'text-accent-neon' },
    warning: { component: AlertCircle, color: 'text-yellow-400' },
    error: { component: XCircle, color: 'text-red-500' },
  };

  const { component: Icon, color } = icons[type];

  return (
    <motion.div 
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`relative ${color}`}
    >
      <Icon size={size} />
      <div className={`absolute inset-0 blur-sm ${color.replace('text-', 'bg-')} opacity-50`} />
    </motion.div>
  );
};
```

- [ ] **Step 2: Commit**
`git commit -m "feat: implement StatusIcon with glow effects"`

---

## Task 5: UI Playground for Verification

**Files:**
- Create: `app/precision-playground/page.tsx`

- [ ] **Step 1: Create a page to verify all atoms visually.**

```tsx
import { NeonCard } from "@/components/ui/NeonCard";
import { ProbabilityValue } from "@/components/ui/ProbabilityValue";
import { ConfidenceBar } from "@/components/ui/ConfidenceBar";
import { StatusIcon } from "@/components/ui/StatusIcon";

export default function Playground() {
  return (
    <div className="p-12 space-y-12 bg-background min-h-screen text-white">
      <h1 className="text-2xl font-bold font-mono">Precision Kit Playground</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <NeonCard>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary font-mono">Real Madrid vs PSG</span>
              <StatusIcon type="success" />
            </div>
            <ProbabilityValue value={74.2} isValueBet={true} />
            <ConfidenceBar progress={85} />
          </div>
        </NeonCard>

        <NeonCard>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary font-mono">Arsenal vs Liverpool</span>
              <StatusIcon type="warning" />
            </div>
            <ProbabilityValue value={48.5} isValueBet={false} />
            <ConfidenceBar progress={40} />
          </div>
        </NeonCard>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify results in browser.**
- [ ] **Step 3: Commit**
`git commit -m "feat: add UI precision playground for verification"`
