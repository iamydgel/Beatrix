# 🧠 Journal de Brainstorming : Explorateur d'Opportunités Mobile (`/search`)
**Date :** 2026-06-07
**Objectif :** Transformer la route `/search` d'une page de recherche générique en un instrument de découverte de valeur optimisé pour mobile.

---

## 🚩 Le Problème (Analyse Critique)
L'implémentation actuelle de la route `/search` est jugée trop "standard" et "AI Slop". Elle propose une expérience de recherche classique (Saisie $\rightarrow$ Filtres $\rightarrow$ Résultats) qui contredit la vision de Beatrix :
- La recherche devrait être une action rapide (`Cmd+K`) et non une destination.
- Sur mobile, l'absence de clavier rend la recherche active difficile ; l'utilisateur doit donc être guidé vers la valeur.
- Manque de "Sensation de Précision" : les composants sont trop génériques et ne reflètent pas le "Tunnel de Décision".

## 🛠️ Solutions & Décisions

### 1. Pivot Conceptuel : De la Recherche $\rightarrow$ L'Exploration
L'objectif n'est plus de permettre à l'utilisateur de "chercher un match", mais de lui permettre de "découvrir l'avantage (l'Edge)".
- **Décision :** Maintenir la route `/search` uniquement pour le mobile, mais la redéfinir comme un **"Explorateur d'Opportunités"**.

### 2. Choix de l'Approche UX
Trois approches ont été analysées :
- **Flux de Valeur Dynamique (Choisie) :** Priorité absolue à la valeur immédiate. Flux vertical de cartes triées par pertinence mathématique.
- **Hub de Précision :** Trop statique, ralentit l'accès aux données.
- **Explorateur Comparatif :** Trop niche, limite la découverte globale.

### 3. Interface & Interactions (Mobile-First)
- **Le Ruban de Contrôle :** 
    - Choix de l'**Option A (Chips horizontaux défilants)**. 
    - Raison : Vitesse d'exécution maximale, ergonomie moderne, et maintien des résultats dans le champ de vision.
- **La Hiérarchie Visuelle :**
    - En-tête $\rightarrow$ Chips de filtrage $\rightarrow$ Flux de `PickCard` haute densité $\rightarrow$ Indicateur d'activité moteur.

### 4. Rigueur "Precision Dark" & Technique
Réalignement strict avec le `session-context.md` :
- **Luxe de Production :** Intégration de textures de grain, glassmorphism et luminescence néon.
- **Trio Visuel :** Orchestration obligatoire de `ReactBits` (transitions), `Framer Motion` (courbes de Bézier) et `Lucide Animated` (icônes d'état).
- **Stack Technique :** Validation systématique via `context7` pour Next.js 16 (Params as Promises), React 19 et Tailwind v4.

---

## 🎯 Résultat Final
Le design est validé et consigné dans la spec : `docs/superpowers/specs/2026-06-07-mobile-explorer-design.md`. 

**Prochaine étape :** Passage au skill `writing-plans` pour l'implémentation technique.
