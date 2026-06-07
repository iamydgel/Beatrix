---
name: analytics-profile-design
description: Spécifications de design pour les pages Analytiques (/analytics) et Profil (/profile) de Beatrix.
date: 2026-06-07
status: draft
---

# Spécifications de Design : Analytiques & Profil

Ce document définit l'architecture visuelle et fonctionnelle des pages manquantes `/analytics` et `/profile` pour s'aligner sur la charte "Precision Dark" et le tunnel décisionnel de Beatrix.

---

## 1. Page Analytiques (`/analytics`)

L'objectif de cette page est de fournir au parieur un tableau de bord de sa performance passée et de l'avantage accumulé contre le marché (Value Tracking).

### 1.1 Composants clés
* **Panneau de Métriques Principales (High-Density Cards) :**
  * **ROI (Retour sur Investissement) :** En valeur pourcentage monospace (ex: `+12.4%`).
  * **Taux de Réussite (Win Rate) :** ex: `58.3%`.
  * **Indicateur CLV (Closing Line Value) :** Pourcentage de paris ayant battu la cote finale de clôture (ex: `84.1%`).
  * **Profit Total :** En unités de bankroll (ex: `+24.8 u`).
* **Graphique de Croissance (Framer Motion / SVG) :**
  * Graphique linéaire stylisé représentant la courbe de croissance du capital (ou du profit cumulé) avec un dégradé luminescent Vert Néon.
* **Historique des Paris Récents (Liste de précision) :**
  * Lignes compactes affichant : `Date`, `Match`, `Cote jouée`, `Probabilité Beatrix`, `Résultat (Gagné/Perdu)` avec les couleurs sémantiques vertes ou rouges atténuées.

---

## 2. Page Profil (`/profile`)

L'objectif de cette page est de configurer le moteur de calcul de mise (Kelly Criterion) et les préférences globales de l'utilisateur.

### 2.1 Composants clés
* **Configuration de Bankroll & Kelly (Formulaire de précision) :**
  * **Taille du Capital (Bankroll) :** Saisie numérique (ex: `10 000 €`).
  * **Fraction de Kelly (Multiplier) :** Curseur ou saisie pour ajuster la fraction de Kelly à miser (ex: `0.25` pour du quart de Kelly, idéal pour limiter la variance).
  * **Format des cotes :** Sélecteur (Décimal, Américain, Fractionnaire).
* **Préférences des Bookmakers :**
  * Liste de sélection de bookmakers favoris pour filtrer les meilleures cotes proposées.
* **Statut du Compte :**
  * Affichage du niveau de licence ("PRO Account" ou "VIP Access") avec un badge néon et des options de gestion.

---

## 3. Identité Visuelle & Intégration
* Les deux pages respecteront scrupuleusement la charte établie : fond `#0A0A0A`, conteneurs `#121212`, bordures fines `1px border-white/10` et police `JetBrains Mono` pour les données chiffrées.
