---
name: beatrix-design
description: Spécifications de design pour Beatrix, l'outil décisionnel de prédictions sportives.
date: 2026-06-05
status: approved
---

# Spécifications de Design : Beatrix

## 1. Vision du Produit
Beatrix est un outil d'aide à la décision pour les parieurs sportifs. L'application transforme des données statistiques complexes en prédictions probabilistes claires, permettant d'identifier des "Value Bets" (paris dont la probabilité réelle est supérieure à celle suggérée par la cote du bookmaker).

**Objectif principal :** Réduire le bruit informationnel et fournir une conviction visuelle basée sur la donnée.

## 2. Identité Visuelle (The Precision Dark)
L'esthétique est inspirée de **Linear** : minimalisme, haute précision et atmosphère technologique.

- **Palette de Couleurs :**
    - Fond Principal : `#0A0A0A` (Noir profond)
    - Surfaces/Cartes : `#121212` (Gris très sombre)
    - Accents de Précision : `#00FF9F` (Vert Acide/Néon) pour les opportunités à haute valeur.
    - Texte Primaire : `#FFFFFF` (Blanc pur)
    - Texte Secondaire : `#888888` (Gris moyen)
- **Typographie :**
    - Titres et Corps : *Inter* ou *Geist* (Sans-Serif géométrique).
    - Données et Probabilités : *JetBrains Mono* ou *Roboto Mono* (Monospace) pour renforcer l'aspect analytique.
- **Effets :** Bordures fines (`1px`), flou de fond (Glassmorphism) sur les éléments de navigation, transitions fluides via ReactBits.

## 3. Architecture & UX (Le Tunnel de Décision)
L'expérience utilisateur est conçue comme un entonnoir : **Découverte $\rightarrow$ Filtrage $\rightarrow$ Analyse $\rightarrow$ Décision**.

### 3.1 Layout (Hybrid-Shell)
- **Desktop :** Sidebar ultra-fine rétractable à gauche.
- **Mobile :** Bottom Tab Bar avec navigation au pouce.
- **Global :** Barre de commande `Cmd+K` omniprésente pour la recherche instantanée de matchs/équipes.

### 3.2 Parcours Utilisateur
#### A. Flux de Découverte (Accueil)
- **Hero Section :** Titre `Beatrix // Probabilités` et indicateur d'activité du moteur d'analyse.
- **Grille Top Picks :** Cartes de haute densité présentant :
    - Équipes en présence.
    - Probabilité prédite (ex: `74%`) en grand format monospace.
    - Barre d'indice de confiance (Confidence Score).
    - Badge "Value Bet" si l'écart avec le bookmaker est significatif.
- **Slicer de Filtres :** Accès rapide par sport/ligue.

#### B. Analyse Profonde (Fiche Match)
- **Scorecard Probabiliste :** Comparaison visuelle directe entre la probabilité Beatrix et celle du bookmaker. Mise en évidence du "Edge" (avantage).
- **Le Panneau "Pourquoi" :** Liste des facteurs d'influence (Forme, Absences, Historique) avec indicateurs de statut (✅/⚠️/❌).
- **Visualisation de Variance :** Graphique de distribution pour évaluer la solidité de la prédiction.
- **Call to Action :** Bouton de décision pour le suivi du pari.

## 4. Stack Technique
- **Framework :** Next.js 15+ (App Router)
- **Styling :** Tailwind CSS
- **Composants Animés :** ReactBits (via MCP Server)
- **Langue :** Français (Ton analytique et professionnel)

## 5. Critères de Succès (KPI Design)
- **Lisibilité :** Un utilisateur doit identifier un "Value Bet" en moins de 2 secondes sur la Home.
- **Clarté :** La justification d'une prédiction doit être compréhensible sans expertise statistique avancée.
- **Performance :** Transitions fluides entre la découverte et l'analyse.
