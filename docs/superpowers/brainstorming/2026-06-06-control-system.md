# Brainstorming : Système de Contrôle Beatrix
**Date :** 2026-06-06
**Statut :** En cours d'affinage
**Objectif :** Concevoir l'interface nerveuse de Beatrix (Command Palette & UI Kit) pour transformer la donnée statistique en conviction visuelle.

---

## 🌌 Vision & Intentions
L'objectif est de s'éloigner des dashboards classiques pour créer un **instrument de précision**. Chaque interaction doit suggérer que Beatrix "réfléchit", "calcule" et "distille" la donnée.
- **Esthétique :** Precision Dark (Linear-style).
- **Philosophie :** "Zero-Click Value" (donner la valeur avant même le clic).
- **Sensation :** Fluidité absolue, réactions instantanées, précision mathématique.

---

## ⌨️ Command Palette (`Cmd+K`)
L'élément central de navigation et d'exécution.

### 1. Rôle & Fonctionnalité
- **Type :** Centre de Commandement (Option B).
- **Capacités :** 
  - Recherche rapide de matchs/équipes.
  - Exécution d'actions directes via slash-commands (ex: `/analyse`, `/top-picks`).
  - Navigation instantanée vers les sections clés.

### 2. Rendu Visuel & UX
- **Structure :** Groupement par catégories (`ACTIONS`, `MATCHS`, `ÉQUIPES`, `HISTORIQUE`) en typographie monospace discrète.
- **Affichage Analytique :** 
  - Résultats de recherche enrichis : `Nom du Match` $\rightarrow$ `[ Probabilité % ]` $\rightarrow$ `Indicateur de Confiance`.
  - Mise en avant immédiate des "Value Bets" via la couleur `accent-neon`.
- **Interactions :** Glassmorphism, transitions fluides, focus trap rigoureux.

---

## 🧪 UI Precision Kit (Atomes)
Les briques élémentaires de l'interface.

### 1. ProbabilityValue (Le Chiffre)
- **Comportement :** Animation de "montée" (counter) du 0% vers la valeur finale pour simuler un calcul en temps réel.
- **Profils d'Animation :**
  - *Standard :* Montée rapide et fluide.
  - *Value Bet :* Animation avec un effet de "saut" ou éclat lumineux final pour signaler une opportunité rare.
- **Typographie :** JetBrains Mono (Haute visibilité, aspect analytique).

### 2. ConfidenceBar (L'Indice)
- **Design :** Barre de précision luminescente, pas une simple barre de progression.
- **Interaction :** Animation synchronisée avec la montée de la probabilité.

### 3. NeonCard (Le Conteneur)
- **Design :** Bordure 1px avec gradient subtil, effet de profondeur via backdrop-blur.
- **Interaction :** "S'allume" au survol, renforçant la sensation de précision technologique.

---

## ⏳ Décisions en attente / À affiner
- [ ] Définition précise des slash-commands disponibles dans la palette.
- [ ] Choix des micro-interactions de transition entre la Palette et la Page de Match.
- [ ] Validation des paliers de couleur pour l'indice de confiance (ex: Vert $\rightarrow$ Jaune $\rightarrow$ Rouge).
