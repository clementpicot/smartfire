# Smartfire

## Introduction

Ce projet est une implémentation d'un menu WordPress personnalisé respectant la maquette fournie sur Figma. L'objectif était de créer un menu performant, modulaire et esthétiquement fidèle aux spécifications demandées.
Pour la réalisation de ce projet, j'ai utilisé **Next.js 15** pour le front-end avec **TailwindCSS**, **Motion** pour les animations et **Shadcn** pour un design system rapide et efficace.
Wordpress quant à lui est utilisé en Headless via l'API REST. Le mégamenu est entièrement modulaire et administrable directement via le back-office de WordPress (Apparence > Menus). J'ai utilisé ACF afin de rajouter des champs personnalisés afin de faire correspondre les entrées menus à la maquette (image, localisation, description).
Le menu est également entièrement responsive.

---

## Installation

1. **Cloner le dépôt** :
   ```bash
   git clone https://github.com/votre-repo/smartfire-menu.git
   cd smartfire
   ```
2. **Installer les dépendances** :
   ```bash
   npm install
   ```
3. **Démarrer l'application** :
   ```bash
   npm run dev
   ```
   L'application sera accessible sur `http://localhost:3000`

---

## Technologies utilisées

- **Next.js 15** : Framework React moderne pour une performance et une modularité optimales
- **TailwindCSS** : Stylisation rapide et optimisée avec classes utilitaires
- **Motion** : Gestion fluide des animations
- **Shadcn** : Composants UI pour un design system cohérent et rapide
- **WordPress REST API** : Récupération dynamique du menu WordPress via une route API custom

---

## Fonctionnalités

✔ **Mega-menu au clic** : Les éléments avec enfants s'affichent sous forme de mega-menu
✔ **Accessible** : Le menu est entièrement accessible et respecte les standards moderne d'accesibilité
✔ **Administrable** : Tous les éléments du méga-menu sont administrables, il n'y a pas besoin de toucher au code
✔ **Indication visuelle** : L'élément actif est mis en évidence
✔ **Animations fluides** : Transitions élégantes grâce à Framer Motion
✔ **Responsive (optionnel)** : Le méga-menu est entièrement responsive
✔ **Compatibilité navigateurs** : Testé sur Chrome, Firefox, Safari et Edge

---

## 🎬 Explication des choix techniques

### 1️⃣ Next.js 15

J'ai choisi **Next.js** car je trouve que ce framework fonctionne extrêmement bien lorsqu'il s'agit de travailler avec WordPress en headless. Je suis très familier avec l'environnement PHP de WordPress Natif mais je tends de plus en plus à utiliser un environnement JavaScript car je trouve la solution beaucoup plus modulaire.

### 2️⃣ TailwindCSS

L'utilisation de **TailwindCSS** permet une réelle rapidité d'intégration, une flexibilité totale sans surcharge inutile et une gestion optimisée des classes CSS.

### 3️⃣ Motion

Pour offrir une **expérience utilisateur fluide et engageante**, j'ai utilisé **Motion**. Il permet de gérer facilement les animations et transitions pour le menu et le mega-menu.

### 4️⃣ Shadcn

J'ai utilisé **Shadcn** comme design system afin de standardiser les composants UI et accélérer le développement sans sacrifier la qualité du rendu visuel. En plus, tous les composants sont accessibles, parfait pour les standards actuels!

### 5️⃣ WordPress REST API

Les menus sont récupérés dynamiquement via l'API REST de WordPress. J'ai mis en place un **fetch asynchrone** en utilisant **TanStack Query** avec un traitement des données côté WordPress pour structurer les menus de façon hiérarchique.

---

## Instructions pour tester

J'ai déployé le WordPress avec le menu administrable sur l'URL suivante : [Wordpress en ligne](https://github.com/votre-profil)
Les identifiants de l'admin se trouvent dans le mail que je vous ai envoyé!

1. Cloner le projet Next.js (J'ai volontairement commit le .env.local pour simplifier les tests de votre côté, pas d'inquiétude!)
2. Lancer le projet via `npm run dev` et observez le menu généré dynamiquement.
3. (Optionnel) Si vous souhaitez modifier le menu directement, rendez-vous sur l'admin du WordPress puis dans Apparence > Menus.

---

## Notes importantes

J'ai pris la liberté de modifier quelques propriétés de certains éléments de la maquette que je trouvais assez incohérent. Certaines marges et font-size n'étaient pas vraiment raccord avec le reste des éléments de la maquette, j'ai donc préféré assurer une cohérence UI quitte à ce que la maquette ne soit pas reproduite pixel-perfect.
Exemples :
- Certains éléments textuels étaient à 11px tandis que la majorité des autres se trouvent être à 12px.
- Certaines marges ne reprenaient pas la règle de 8 (il y a des marges horizontales à 30px et des marges verticales à 70px). J'ai préféré tout basculer dans une règle de 8 (32, 40, 72, 80...)

---

## Amélioration souhaitées

- J'aurais aimé refacto le code de **main-nav.tsx** que je ne trouve pas assez modulaire, le séparer en petits composants et permettre une lecture claire du fichier.
- Améliorer l'UI globale de la version mobile
