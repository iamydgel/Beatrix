# Home Bento-Grid Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the Home Page into a high-density asymmetrical Bento-Grid showcasing Top Picks with "Evidence Cards" and real-time analysis aesthetics.

**Architecture:** 
The page uses a CSS Grid layout with custom spans to create the asymmetrical Bento structure. The `EvidenceCard` is a new high-precision component that integrates numerical proofs and analytical justifications. A global `PrecisionSweep` overlay simulates real-time algorithmic scanning.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, Framer Motion, Lucide-Animated, ReactBits.

---

### Task 1: Precision Layout Core
Establish the grid system and the global a-symmetric layout.

**Files:**
- Modify: `app/page.tsx`
- Create: `components/home/BentoGrid.tsx`

- [ ] **Step 1: Implement the Bento Grid Container**
Create `components/home/BentoGrid.tsx` using a CSS grid with `grid-template-columns: repeat(4, 1fr)` and `grid-auto-rows: minmax(200px, auto)`.
- [ ] **Step 2: Define the Layout Mapping**
Implement a mapping for the Top Picks:
    - Index 0: `col-span-2 row-span-2` (The Hero)
    - Index 1: `col-span-1 row-span-2` (Soutien 1)
    - Index 2: `col-span-1 row-span-2` (Soutien 2)
    - Index 3+: `col-span-1 row-span-1` (Precision Feed)
- [ ] **Step 3: Integrate into `app/page.tsx`**
Replace `<TopPicksGrid />` with `<BentoGrid />`.
- [ ] **Step 4: Commit**
`git commit -m "feat(home): implement asymmetrical bento-grid layout"`

### Task 2: The Evidence Card (Analytical Instrument)
Creating the high-precision component that merges math and logic.

**Files:**
- Create: `components/home/EvidenceCard.tsx`
- Modify: `components/ui/ProbabilityValue.tsx` (to ensure glow variants are robust)

- [ ] **Step 1: Implement the "Proof Zone" (Left/Top)**
Create the layout for the probability display using `JetBrains Mono`. Add the `Edge` badge with a pulsing neon effect.
- [ ] **Step 2: Implement the "Analytical Panel" (Right/Bottom)**
Build the factor list using `lucide-animated` icons and compact uppercase labels.
- [ ] **Step 3: Integrate `ConfidenceBar` and `ProbabilityValue`**
Ensure the `ProbabilityValue` counter triggers on mount and the `ConfidenceBar` is synchronized.
- [ ] **Step 4: Add the "Spotlight" Hover Effect**
Use a mouse-tracking gradient that illuminates the card border upon hover.
- [ ] **Step 5: Commit**
`git commit -m "feat(ui): create high-precision EvidenceCard component"`

### Task 3: Algorithmic Life (Luminescence & Scan)
Adding the "Soul" of the instrument via ambient animations.

**Files:**
- Create: `components/home/PrecisionSweep.tsx`
- Modify: `components/home/BentoGrid.tsx`

- [ ] **Step 1: Implement the `PrecisionSweep` Component**
Create a full-screen overlay with a 1px horizontal line that translates Y from `-10%` to `110%` using a long, slow interval.
- [ ] **Step 2: Add the Ambient Glow (Respiration)**
Implement a `framer-motion` animation on `EvidenceCard` that varies the `box-shadow` (neon glow) intensity based on the `edge` value.
- [ ] **Step 3: Implement Staggered Entry**
Apply `variants` to the `BentoGrid` to ensure cards emerge in a cascading sequence using the curve `[0.22, 1, 0.36, 1]`.
- [ ] **Step 4: Commit**
`git commit -m "feat(home): add algorithmic scan and ambient luminescence"`

### Task 4: Luxury Polish & Final Verification
Applying the final "Production-Grade" layer.

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Apply Glassmorphism & Grain**
Add a noise SVG overlay and `backdrop-blur` to the Hero card and the page header.
- [ ] **Step 2: Refine Motion Curves**
Audit all `framer-motion` transitions to ensure they strictly use the Quintic curve `[0.22, 1, 0.36, 1]`.
- [ ] **Step 3: Full Loop Verification**
Verify:
    - [ ] Bento-Grid asymmetry on Desktop/Mobile.
    - [ ] `ProbabilityValue` count-up on load.
    - [ ] Precision Sweep invisibility (should be a subtle "easter egg").
    - [ ] `lucide-animated` icons triggering correctly.
- [ ] **Step 4: Final Commit**
`git commit -m "style(home): apply production-grade luxury polish to bento-grid"`
