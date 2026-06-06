# 🧠 État du Projet : Beatrix (Session Context)
**Dernière mise à jour :** 2026-06-06
**Objectif du document :** Permettre une reprise instantanée du projet avec le même niveau de précision et de contexte.

---

## 🛠️ Frameworks & Protocoles Opérationnels (STRICT)

Le projet est géré selon le **Framework Superpower**. Toute action doit suivre ce cycle :
`Brainstorming` $\rightarrow$ `Design Spec` $\rightarrow$ `Implementation Plan` $\rightarrow$ `Code`.

**Contraintes d'exécution :**
- **Interdiction du "AI Slop" :** Refus systématique des composants génériques. Recherche d'une esthétique "Production-Grade Luxury".
- **Vérification Technique :** Utilisation systématique du MCP `context7` avant tout code pour valider la compatibilité avec les versions spécifiques :
  - **Next.js 16** (App Router, `params` as Promises).
  - **React 19**.
  - **Tailwind CSS v4** (Configuration CSS-First avec `@theme`).
- **Qualité Visuelle :** Combinaison de `ReactBits` (composants premium), `Framer Motion` (orchestration), et `Lucide Animated` (icônes organiques).

---

## 🌌 Vision Produit : "Precision Dark"

Beatrix est un instrument de précision pour le betting sportif, et non un simple site de pronostics.
- **Esthétique :** Inspirée de Linear. Fond `#0A0A0A`, Surfaces `#121212`, Accents `#00FF9F` (Vert Néon).
- **UX "Tunnel de Décision" :** Flux optimisé de la découverte $\rightarrow$ analyse $\rightarrow$ décision.
- **Sensation :** L'interface doit suggérer un calcul constant (animations de montée, luminescence, textures de verre).

---

## 🎯 État d'Avancement & Décisions Clés

### ✅ Terminé
- [x] **T1 : Thème & Initialisation** $\rightarrow$ Migration complète vers Tailwind v4 terminée.
- [x] **T2 : Hybrid Layout Shell** $\rightarrow$ Sidebar (PC) et BottomNav (Mobile) fonctionnels.

### 📐 Designé & Spécifié (Prêt pour implémentation)
- **Système de Contrôle (T3 & T4) :**
    - **Command Palette (`Cmd+K`) :**
      - Hybride : Champ de saisie + Grille d'actions rapides (Quick-Grid) pour PC et Mobile.
      - Valeur Immédiate : Résultats enrichis avec probabilités et confiance (Zero-Click Value).
      - Commandes Pro : Set complet de commandes en français (`/top`, `/edge`, `/true`, `/stake`, `/clv`, `/audit`, `/guide`).
    - **UI Precision Kit :**
      - `ProbabilityValue` : Compteur animé (0% $\rightarrow$ X%) avec éclat pour les Value Bets.
      - `ConfidenceBar` : Barre luminescente synchronisée.
      - `NeonCard` : Bordures dynamiques, effet spotlight au survol.
      - `StatusIcon` : Icônes `lucide-animated` avec animations de validation.
    - **Accompagnement :** Système d'infobulles et de guide intégré pour vulgariser les concepts pro (EV, Kelly, etc.).

---

## 🗺️ Roadmap Immédiate
1. **Lancer `writing-plans`** pour le Système de Contrôle (T3 & T4).
2. **Implémentation du UI Kit (T4)** $\rightarrow$ Création des atomes de précision.
3. **Implémentation de la Command Palette (T3)** $\rightarrow$ Développement du centre de commande hybride.
4. **Home Page (T5)** $\rightarrow$ Transformation de la page d'accueil en grille de Top Picks asymétrique.

---

## 🔗 Références Documents
- **Design Global :** `docs/superpowers/specs/2026-06-05-beatrix-design.md`
- **Plan Frontend Initial :** `docs/superpowers/plans/2026-06-05-beatrix-frontend.md`
- **Journal de Brainstorming :** `docs/superpowers/brainstorming/2026-06-06-control-system.md`
- **Spec Système de Contrôle :** `docs/superpowers/specs/2026-06-06-control-system-design.md`
