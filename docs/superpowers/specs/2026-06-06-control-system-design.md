---
name: control-system-design
description: Spécifications de design pour le Système de Contrôle de Beatrix (Command Palette & UI Precision Kit).
date: 2026-06-06
status: draft
---

# Spécifications de Design : Système de Contrôle Beatrix

## 1. Vision & Philosophie
Le Système de Contrôle n'est pas une simple interface de navigation, mais un **instrument de précision**. Il doit transformer la donnée statistique froide en une conviction visuelle immédiate.

**Piliers de design :**
- **Precision Dark :** Fond `#0A0A0 ownA`, surfaces `#121212`, accents `#00FF9F`.
- **Zero-Click Value :** L'utilisateur doit obtenir la valeur (probabilité, avantage) sans action supplémentaire.
- **Sensation de Calcul :** L'interface doit suggérer que Beatrix "travaille" en temps réel via des animations de montée et de luminescence.
- **Accompagnement Élite :** Intégration de concepts pro (EV, Kelly, CLV) avec un guidage pédagogique discret mais efficace.

---

## 2. La Command Palette (`Cmd+K`)
L'interface nerveuse de l'application, unifiée pour PC et Mobile.

### 2.1 Architecture & Layout
- **L'Écran :** Overlay centré, `backdrop-blur-xl`, bordure `1px` en gradient subtil.
- **Saisie (Haut) :** Champ de texte minimaliste, curseur `accent-neon`, focus trap rigoureux.
- **Corps Dynamique (Bas) :**
    - **Mode Repos (Saisie vide) :** Grille d'Actions Rapides (Quick-Grid). Des tuiles `NeonCard` avec icônes `lucide-animated` et descriptions courtes.
    - **Mode Recherche (Saisie active) :** Liste de résultats analytiques.
- **Navigation Mobile :** Activée via un bouton central "⚡" dans la `BottomNav`.

### 2.2 Rendu Analytique des Résultats
Chaque résultat de recherche de match suit la structure :
`[Icône Lucide Animated] Nom du Match --- [Probabilité %] [Indicateur Confiance]`
- **Value Bet :** Le pourcentage s'affiche en `accent-neon`.
- **Confiance :** Point lumineux (Vert/Jaune/Rouge) basé sur la fiabilité du modèle.

### 2.3 Centre de Commandement (Slash Commands)
Les commandes sont en français et regroupées par niveau de puissance :
- **Exploration :** `/top` (Top Picks), `/scan [ligue]` (Scan d'anomalies).
- **Analyse :** `/edge` (Avantages massifs), `/true` (Probabilité pure/Devigging), `/sharp` (Analyse des books pro).
- **Exécution :** `/stake` (Calculateur de mise Kelly), `/clv` (Audit valeur de clôture), `/audit` (Analyse performance).
- **Éducation :** `/guide` (Accès à la documentation des concepts).

---

## 3. UI Precision Kit (Atomes)

### 3.1 `ProbabilityValue`
- **Rendu :** Typographie `JetBrains Mono` massive.
- **Animation :** 
    - Montée progressive de 0% à la valeur finale (600ms).
    - **Effet "Value" :** Micro-rebond final et halo lumineux si le résultat est un Value Bet.

### 3.2 `ConfidenceBar`
- **Rendu :** Ligne ultra-fine `2px`, dégradé gris $\rightarrow$ `accent-neon`.
- **Animation :** Remplissage synchronisé avec le `ProbabilityValue`.
- **Détail :** Tête de barre luminescente et pulsante.

### 3.3 `NeonCard`
- **Rendu :** Fond `#121212`, bordure `1px` quasi invisible, `backdrop-blur`.
- **Interaction :**
    - Au survol : La bordure s'illumine via un gradient linéaire.
    - Effet "Spotlight" : Reflet suivant la souris à l'intérieur de la carte.

### 3.4 `StatusIcon`
- **Rendu :** Icônes `lucide-animated` minimalistes.
- **Animation :** Apparition en `scale-in` avec un léger glow externe.

---

## 4. Système Pédagogique (L'Accompagnement)
Pour rendre l'outil accessible sans sacrifier son aspect pro :
- **Infobulles de Précision :** Apparaissent au survol des commandes pro dans la palette.
- **Notes Contextuelles :** Symboles $\small\textsf{?}$ à côté des termes techniques (EV, CLV) sur les pages d'analyse.
- **Le Guide :** Page dédiée accessible via `/guide` expliquant la philosophie de la "Valeur Attendue".

---

## 5. Stack Technique & Contraintes
- **Framework :** Next.js 16 (App Router), React 19.
- **Styling :** Tailwind CSS v4 (CSS-First configuration).
- **Animations :** Framer Motion pour les transitions, Lucide Animated pour les icônes, et **ReactBits (via MCP)** pour les composants visuels complexes et les effets d'animation premium.
- **Performance :** Zéro layout shift lors des animations de compteurs.
