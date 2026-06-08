---
name: home-bento-grid-design
description: Spécifications de design pour la Home Page de Beatrix, basée sur une grille asymétrique (Bento-Grid) de Top Picks.
date: 2026-06-08
status: approved
---

# Spécifications de Design : Home Page (Bento-Grid)

## 1. Vision du Produit
La Home Page de Beatrix doit cesser d'être une liste de pronostics pour devenir un **tableau de bord de haute densité**. L'objectif est l'immédiateté de la valeur : l'utilisateur doit identifier l'opportunité la plus rentable (l'Alpha) en moins d'une seconde grâce à une hiérarchie visuelle forte.

L'esthétique est celle d'un instrument de précision : sombre, technique, et luxueux.

## 2. Architecture de la Grille (Bento-Grid)
L'interface utilise une grille asymétrique pour briser la monotonie et diriger l'attention.

### 2.1 Distribution des Cartes
- **Le Hero (L'Opportunité Alpha)** : 
    - Taille : 2 colonnes x 2 lignes.
    - Rôle : Affiche le pari avec le plus gros "Edge" du moment.
    - Position : Top-Left (Point d'entrée visuel).
- **Les Soutiens (Top Value)** : 
    - Taille : 1 colonne x 2 lignes.
    - Rôle : Deux opportunités secondaires très solides.
    - Position : Flanquent le Hero.
- **Le Flux de Précision** : 
    - Taille : 1 colonne x 1 ligne.
    - Rôle : Grille asymétrique de cartes compactes pour le reste du Top Picks.
    - Position : Partie inférieure de la page.

### 2.2 Structure Visuelle
- **Canaux de Lumière** : Espaces entre les cartes définis par des bordures ultra-fines `1px white/5`.
- **Fond** : Noir profond `#0A0A0A` avec un motif de grille technique discret en arrière-plan.

## 3. Anatomie de la "Carte Évidence"
Chaque carte est un condensé d'analyse fusionnant preuve mathématique et logique.

### 3.1 La Zone de Choc (Preuve Mathématique)
- **Probabilité Beatrix** : Affichage massif en `JetBrains Mono`, blanc pur.
- **L'Edge** : Comparaison directe avec la probabilité bookmaker. L'écart est mis en avant via un badge néon pulsant `#00FF9F` (ex: `Edge +12.4%`).
- **Luminescence** : Halo extérieur `#00FF9F` dont l'intensité est proportionnelle à la valeur du pari.

### 3.2 Le Justificatif (Logique Analytique)
- **Panneau "Pourquoi"** : Liste ultra-compacte de facteurs d'influence.
- **Indicateurs de Statut** : Chaque facteur est accompagné d'une icône `lucide-animated` (ex: Bouclier pour la défense, Éclair pour l'attaque).
- **Labels** : Uppercase, tracking serré, police *Inter* (ex: `FORME : EXCELLENTE`).

### 3.3 Le Verdict (Confiance)
- **ConfidenceBar** : Barre luminescente horizontale synchronisant la probabilité et le sentiment de fiabilité.
- **CTA** : Bouton "Analyser" avec effet "Spotlight" au survol.

## 4. Dynamique et Sensation (L'Âme de l'Instrument)

### 4.1 Respiration Luminescente (Ambient Glow)
Les cartes possèdent un halo néon qui pulse lentement. La fréquence et l'intensité de la pulsation sont liées à la force de l'Edge, signalant instinctivement la rentabilité.

### 4.2 Le Scan Algorithmique (Precision Sweep)
Une ligne de lumière horizontale ultra-fine (1px) traverse périodiquement la grille de haut en bas, simulant un rafraîchissement en temps réel des données par le moteur Beatrix.

### 4.3 Orchestration du Mouvement
- **Entrée** : "Staggered Fade-In" (cascade) utilisant la courbe de Bézier Quintique `[0.22, 1, 0.3 la 36, 1]`.
- **Interaction** : Effet de focus "Spotlight" sur les bordures lors du survol.

## 5. Stack Technique & Protocoles (STRICT)
- **Validation** : Passage obligatoire par `context7` pour Next.js 16, React 19 et Tailwind v4.
- **Qualité Visuelle** : 
    - `ReactBits` pour les textures de grain et les effets de fond premium.
    - `Framer Motion` pour l'orchestration des mouvements et les courbes Quintiques.
    - `Lucide Animated` pour toutes les icônes de statut et d'action.
- **Zéro AI Slop** : Interdiction des composants génériques. Chaque élément doit suggérer la précision et le luxe.
