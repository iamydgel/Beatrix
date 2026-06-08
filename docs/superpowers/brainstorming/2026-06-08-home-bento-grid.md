# 🧠 Journal de Brainstorming : Home Page Bento-Grid
**Date :** 2026-06-08
**Objectif :** Transformer la page d'accueil en un tableau de bord de haute densité utilisant une grille asymétrique pour maximiser la visibilité des opportunités (Value Bets).

---

## 🚩 Le Problème
L'accueil actuelle est trop linéaire et ne reflète pas la hiérarchie de valeur. Un parieur professionnel doit pouvoir identifier "l'Alpha" (le meilleur pari du moment) en un coup d'œil sans avoir à scroller ou filtrer.

## 🛠️ Solutions & Décisions

### 1. Structure de la Grille : Le Modèle Bento (Choisi)
L'approche retenue est la **Bento-Grid** pour créer une hiérarchie visuelle immédiate :
- **L'Opportunité Alpha** : Une carte massive (2x2) en haut à gauche, capturant l'attention dès l'entrée.
- **Les Soutiens** : Deux cartes verticales (1x2) pour les opportunités secondaires.
- **Le Flux de Précision** : Une grille asymétrique de cartes compactes (1x1) pour le reste du Top Picks.
- **Esthétique** : Canaux de lumière `1px white/5` entre les cartes sur fond `#0A0A0A`.

### 2. Conception de la "Carte Évidence"
Fusion de la preuve mathématique et de la logique analytique pour éliminer le doute :
- **Preuve Mathématique** : Probabilité Beatrix en `JetBrains Mono` géant, contrastée avec la probabilité bookmaker. Mise en avant de l'**Edge** via un badge néon pulsant.
- **Logique Analytique** : Intégration d'un panneau "Pourquoi" ultra-compact avec des icônes `lucide-animated` pour justifier la valeur (Forme, Absences, etc.).
- **Verdict** : `ConfidenceBar` luminescente et bouton "Analyser" avec effet spotlight.

### 3. Dynamique & Sensation "Instrument"
L'interface doit suggérer un moteur de calcul actif et constant :
- **Ambient Glow** : Pulsation lumineuse des cartes proportionnelle à la force de l'Edge.
- **Precision Sweep** : Ligne de scan horizontale ultra-fine traversant la grille périodiquement pour simuler le rafraîchissement des données.
- **Mouvement** : Entrée en cascade (Staggered) via la courbe de Bézier Quintique `[0.22, 1, 0.36, 1]`.

## 🎯 Résultat Final
Le design est validé et consigné dans la spec : `docs/superpowers/specs/2026-06-08-home-bento-grid-design.md`.

**Prochaine étape :** Passage au skill `writing-plans` pour l'implémentation technique.
