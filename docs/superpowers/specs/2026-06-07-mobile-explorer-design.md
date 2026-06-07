---
name: mobile-explorer-design
description: Spécifications de design pour la transformation de la route /search en Explorateur d'Opportunités Mobile.
date: 2026-06-07
status: approved
---

# Spécifications de Design : Explorateur d'Opportunités Mobile (`/search`)

## 1. Vision du Produit
L'objectif est de transformer une page de recherche générique en un **instrument de découverte de valeur**. Pour l'utilisateur mobile, la recherche ne doit pas être une destination passive, mais un flux actif d'opportunités mathématiquement validées.

L'expérience doit passer de "Je cherche un match" à "Je découvre où se trouve l'avantage (l'Edge)".

## 2. Identité Visuelle & Esthétique (Precision Dark)
L'interface suit strictement la charte "Production-Grade Luxury" :
- **Fond :** `#0A0A0A` (Noir profond) avec des surfaces de cartes en `#121212`.
- **Accents :** `#00FF9F` (Vert Néon) utilisé comme source luminescente pour les Value Bets.
- **Typographie :** 
    - Navigation/Labels : *Inter* ou *Geist*.
    - Données Numériques : *JetBrains Mono* (pour l'aspect analytique et précision).
- **Effets :** Glassmorphism ultra-fin, bordures `1px white/10`, et glow néon synchronisé avec la valeur des probabilités.

## 3. Architecture de la Page (Layout Mobile-First)

La structure est optimisée pour le pouce et la prise de décision rapide :

### 3.1 L'En-tête de Précision (Sticky)
- **Titre :** `Beatrix // Explorateur` en uppercase, tracking serré.
- **Barre de Recherche Svelte :**
    - Design minimaliste au repos.
    - Transition fluide vers un état actif avec contour `accent-neon` et micro-vibration visuelle au focus.
    - Icône `Search` (`lucide-animated`) pulsante.

### 3.2 Le Ruban de Contrôle (Quick-Filters)
Un défilement horizontal de "Chips" permettant un filtrage instantané :
- **Comportement :** Sélection unique, transition de layout fluide.
- **Catégories de Chips :**
    - `🔥 Top Edge` (Tri par plus gros écart probabilité/cote).
    - `🛡️ Confiance > 80%` (Filtrage par indice de confiance).
    - `⚡ Surchauffés` (Matchs avec forte activité d'analyse).
    - `⚽ Football`, `🏀 NBA`, `🎾 Tennis` (Filtres sportifs).
- **Visuel :** Fond `#121212` $\rightarrow$ `accent-neon` (texte noir) lors de l'activation. Icônes `lucide-animated` intégrées.

### 3.3 Le Flux de Résultats (Dynamic Feed)
Un défilement vertical de `PickCard` haute densité :
- **Sensation :** Apparition "Staggered" (décalée) via Framer Motion pour simuler un flux de données en temps réel.
- **Composants de Précision :**
    - `ProbabilityValue` : Compteur animé (0% $\rightarrow$ X%) avec éclat néon pour les Value Bets.
    - `ConfidenceBar` : Barre luminescente synchronisée avec l'affichage du chiffre.
    - `StatusIcon` : Coche de validation animée (`lucide-animated`) confirmant la fiabilité.
- **Interaction :** Swipe horizontal pour ajout rapide à la "Watchlist".

### 3.4 L'Indicateur d'Activité (Floating Bottom)
- Badge discret : `Moteur d'analyse : Actif` avec un point vert pulsant, confirmant que les données sont fraîches.

## 4. Stack Technique & Protocoles (STRICT)
L'implémentation doit suivre rigoureusement ces contraintes :

- **Validation :** Utilisation obligatoire de `context7` avant codage pour :
    - **Next.js 16** (Params as Promises).
    - **React 19** (Nouveaux hooks et rendu).
    - **Tailwind CSS v4** (Configuration `@theme`).
- **Orchestration Visuelle :**
    - `ReactBits` pour les transitions de page et effets de fond premium.
    - `Framer Motion` pour les courbes de Bézier et les animations de flux.
    - `Lucide Animated` pour toutes les icônes d'état et d'action.
- **Zéro AI Slop :** Interdiction des composants génériques. Chaque élément doit avoir une justification analytique et une finition "Luxe".
