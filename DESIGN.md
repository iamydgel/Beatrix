---
version: 1.0.0
name: beatrix-precision-dark
description: "Identité visuelle haute précision pour Beatrix. Un environnement sombre profond (#0A0A0A) avec des accents vert néon (#00FF9F) pour une lecture analytique immédiate. Inspiré par l'esthétique de précision et les outils de décision pro."

colors:
  primary: "#00FF9F" # Accent Néon / Value Bet
  on-primary: "#000000"
  canvas: "#0A0A0A" # Fond profond
  surface: "#121212" # Cartes et panneaux
  surface-hover: "#1A1A1A"
  ink: "#FFFFFF" # Texte primaire
  ink-muted: "#888888" # Texte secondaire
  ink-subtle: "#444444"
  hairline: "rgba(255, 255, 255, 0.05)"
  hairline-accent: "rgba(0, 255, 159, 0.2)"
  semantic-success: "#00FF9F"
  semantic-warning: "#FFB800"
  semantic-error: "#FF4B4B"

typography:
  display:
    fontFamily: "var(--font-geist-sans), Inter, sans-serif"
    fontWeight: 800
    letterSpacing: "-0.05em"
  data:
    fontFamily: "var(--font-jetbrains-mono), monospace"
    fontWeight: 500
  body:
    fontFamily: "var(--font-geist-sans), Inter, sans-serif"
    fontWeight: 400

components:
  neon-card:
    backgroundColor: "{colors.surface}"
    borderRadius: "16px"
    border: "1px solid {colors.hairline}"
    hover:
      borderColor: "{colors.primary}"
      boxShadow: "0 0 20px rgba(0, 255, 159, 0.1)"
  
  probability-value:
    typography: "{typography.data}"
    color: "{colors.ink}"
    highlightColor: "{colors.primary}"
  
  confidence-bar:
    height: "2px"
    trackColor: "rgba(255, 255, 255, 0.05)"
    progressColor: "{colors.primary}"

## Overview

Beatrix utilise le système **Precision Dark**. L'interface est conçue comme un instrument de mesure plutôt que comme une application classique. Le noir profond (`#0A0A0A`) réduit la fatigue visuelle, tandis que le vert néon (`#00FF9F`) agit comme un signal critique pour identifier les opportunités de valeur (Value Bets).

### Principes Clés
1. **Zéro Bruit** : Chaque pixel doit servir la décision.
2. **Hiérarchie Monospace** : Les données numériques cruciales (probabilités, cotes, edge) utilisent systématiquement une police Monospace pour une clarté technique.
3. **Luminescence Fonctionnelle** : Le "glow" et les effets de lumière sont réservés aux éléments ayant une valeur attendue positive (EV+).
4. **Interaction au pouce** : Navigation optimisée pour le Mobile Explorer avec des zones de tap larges et des gestes de swipe.

## Navigation & Contrôle

### Command Palette (Cmd+K)
Le centre nerveux de l'application. Elle permet :
- Recherche instantanée de matchs.
- Exécution de commandes (/top, /edge, /stake).
- Accès rapide aux outils de calcul.

### Bottom Nav (Mobile)
Navigation simplifiée : **Explorer (Home)**, **Search (Cmd+K)**, **Analytics**, **Profile**.

## Comportements Visuels
- **Staggered Entrance** : Les listes de matchs apparaissent avec un léger décalage (stagger) pour renforcer la sensation de chargement de données en temps réel.
- **Progressive Counters** : Les pourcentages s'animent de 0 vers leur valeur cible.
- **Glassmorphism** : Utilisation de `backdrop-blur` sur les éléments flottants pour maintenir la profondeur.
