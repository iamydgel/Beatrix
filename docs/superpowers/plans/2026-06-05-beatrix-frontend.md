# Beatrix Frontend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the frontend of Beatrix, a sports prediction tool, following the "Precision Dark" aesthetic and "Tunnel de Décision" UX.

**Architecture:** Next.js 15 App Router with a modular component architecture. Layout uses a Hybrid-Shell (Sidebar Desktop / BottomNav Mobile).

**Tech Stack:** Next.js 15, Tailwind CSS, TypeScript, ReactBits (via MCP), Geist/Inter fonts.

---

## File Map

### Layout & Global
- `app/layout.tsx`: Root layout and providers.
- `app/globals.css`: Precision Dark theme variables and Tailwind directives.
- `components/layout/Sidebar.tsx`: Desktop navigation.
- `components/layout/BottomNav.tsx`: Mobile navigation.
- `components/layout/CommandPalette.tsx`: Global search/navigation (`Cmd+K`).

### UI Components (The "Precision" Kit)
- `components/ui/ConfidenceBar.tsx`: Neon progress bar for confidence scores.
- `components/ui/ProbabilityValue.tsx`: Monospace display for percentages.
- `components/ui/NeonCard.tsx`: Card with subtle gradient borders.
- `components/ui/StatusIcon.tsx`: ✅/⚠️/❌ indicators.

### Pages
- `app/page.tsx`: Home / Top Picks Grid.
- `app/search/page.tsx`: Discovery / Filter interface.
- `app/match/[id]/page.tsx`: Detailed probabilistic analysis.

---

## Implementation Tasks

### Task 1: Project Initialization & Theming
**Files:**
- Create: `app/globals.css`
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Define Precision Dark palette in CSS variables**
```css
:root {
  --background: #0A0A0A;
  --surface: #121212;
  --accent-neon: #00FF9F;
  --text-primary: #FFFFFF;
  --text-secondary: #888888;
}
```
- [ ] **Step 2: Configure Tailwind to use these variables**
- [ ] **Step 3: Setup fonts (Inter/Geist for text, JetBrains Mono for numbers)**
- [ ] **Step 4: Verify theme by creating a basic page with these colors**
- [ ] **Step 5: Commit**
`git commit -m "feat: setup precision dark theme and project config"`

### Task 2: The Layout Shell
**Files:**
- Create: `components/layout/Sidebar.tsx`
- Create: `components/layout/BottomNav.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Implement Sidebar (Desktop only, retractable)**
- [ ] **Step 2: Implement BottomNav (Mobile only, Glassmorphism)**
- [ ] **Step 3: Integrate both into root layout with conditional rendering**
- [ ] **Step 4: Test responsiveness (Switch between 375px and 1440px)**
- [ ] **Step 5: Commit**
`git commit -m "feat: implement hybrid layout shell"`

### Task 3: Command Palette (The Brain)
**Files:**
- Create: `components/layout/CommandPalette.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create the modal UI for the palette**
- [ ] **Step 2: Implement keyboard listener for `Cmd+K` / `Ctrl+K`**
- [ ] **Step 3: Add mock search results for teams/leagues**
- [ ] **Step 4: Verify accessibility (focus trap, escape to close)**
- [ ] **Step 5: Commit**
`git commit -m "feat: add global command palette"`

### Task 4: UI Precision Kit (Atoms)
**Files:**
- Create: `components/ui/ConfidenceBar.tsx`
- Create: `components/ui/ProbabilityValue.tsx`
- Create: `components/ui/NeonCard.tsx`

- [ ] **Step 1: Implement `ProbabilityValue` (Monospace, high contrast)**
- [ ] **Step 2: Implement `ConfidenceBar` (Neon accent, smooth transition)**
- [ ] **Step 3: Implement `NeonCard` (1px border, subtle gradient on hover)**
- [ ] **Step 4: Create a "UI Playground" page to verify all atoms visually**
- [ ] **Step 5: Commit**
`git commit -m "feat: add precision ui atoms"`

### Task 5: Home Page & Top Picks Grid
**Files:**
- Modify: `app/page.tsx`
- Create: `components/home/TopPicksGrid.tsx`
- Create: `components/home/PickCard.tsx`

- [ ] **Step 1: Build the Hero section (`Beatrix // Probabilités`)**
- [ ] **Step 2: Implement the `PickCard` using `NeonCard` and `ProbabilityValue`**
- [ ] **Step 3: Create the `TopPicksGrid` with mock data**
- [ ] **Step 4: Implement the "Slicer" (Sport filters) with instant state updates**
- [ ] **Step 5: Verify visual consistency with "Precision Dark" spec**
- [ ] **Step 6: Commit**
`git commit -m "feat: implement home page and top picks grid"`

### Task 6: Search & Discovery Interface
**Files:**
- Create: `app/search/page.tsx`
- Create: `components/search/FilterPanel.tsx`

- [ ] **Step 1: Implement the search input with real-time filtering**
- [ ] **Step 2: Build the `FilterPanel` (League, Sport, Timeframe)**
- [ ] **Step 3: Implement the results list with a simplified version of `PickCard`**
- [ ] **Step 4: Verify "Empty State" UI when no results are found**
- [ ] **Step 5: Commit**
`git commit -m "feat: implement search and discovery page"`

### Task 7: Match Detail Page (The Core Analysis)
**Files:**
- Create: `app/match/[id]/page.tsx`
- Create: `components/match/Scorecard.tsx`
- Create: `components/match/JustificationPanel.tsx`
- Create: `components/match/DistributionGraph.tsx`

- [ ] **Step 1: Implement `Scorecard` showing Beatrix Prob vs Bookmaker Prob**
- [ ] **Step 2: Build the `JustificationPanel` with StatusIcons (✅/⚠️/❌)**
- [ ] **Step 3: Create the `DistributionGraph` (simplified visual representation of variance)**
- [ ] **Step 4: Add the "Decision" action button**
- [ ] **Step 5: Test the full flow from Home $\rightarrow$ Match Detail**
- [ ] **Step 6: Commit**
`git commit -m "feat: implement match analysis detail page"`

### Task 8: ReactBits Premium Integration
**Files:**
- Modify: `app/page.tsx`
- Modify: `app/match/[id]/page.tsx`
- Modify: `components/ui/NeonCard.tsx`

- [ ] **Step 1: Use `list_components` (MCP) to find suitable animations**
- [ ] **Step 2: Integrate a "Counter" animation for probability updates in `ProbabilityValue`**
- [ ] **Step 3: Add a subtle "Background" animation to the Hero section**
- [ ] **Step 4: Implement a "Hover" effect from ReactBits for Top Picks cards**
- [ ] **Step 5: Verify performance (ensure animations don't cause layout shift)**
- [ ] **Step 6: Commit**
`git commit -m "feat: integrate reactbits premium animations"`

### Task 9: Final Polish & Responsive Audit
**Files:**
- Modify: All existing components

- [ ] **Step 1: Audit mobile views (375px) and ensure no horizontal overflow**
- [ ] **Step 2: Review "Precision Dark" contrast ratios for accessibility**
- [ ] **Step 3: Final pass on French translations and terminology**
- [ ] **Step 4: Run a full "Tunnels de Décision" walkthrough (User Journey test)**
- [ ] **Step 5: Final Commit**
`git commit -m "perf: final polish and responsive audit for Beatrix"`
