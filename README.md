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
   git clone https://github.com/clementpicot/smartfire
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

- ✔ **Mega-menu au clic** : Les éléments avec enfants s'affichent sous forme de mega-menu
- ✔ **Accessible** : Le menu est entièrement accessible et respecte les standards moderne d'accesibilité
- ✔ **Administrable** : Tous les éléments du méga-menu sont administrables, il n'y a pas besoin de toucher au code
- ✔ **Indication visuelle** : L'élément actif est mis en évidence
- ✔ **Animations fluides** : Transitions élégantes grâce à Framer Motion
- ✔ **Responsive (optionnel)** : Le méga-menu est entièrement responsive
- ✔ **Compatibilité navigateurs** : Testé sur Chrome, Firefox, Safari et Edge

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

J'ai déployé le WordPress avec le menu administrable sur l'URL suivante : [Wordpress en ligne](https://smartfire.clmntpct.xyz/wp-admin)
Les identifiants de l'admin se trouvent dans le mail que je vous ai envoyé!

1. Cloner le projet Next.js (J'ai volontairement commit le .env.local pour simplifier les tests de votre côté, pas d'inquiétude!)
2. Ajouter la variable d'environnement `NEXT_PUBLIC_WORDPRESS_URL=https://smartfire.clmntpct.xyz` dans le fichier `.env.local` à la racine du projet pour faire le pont entre WordPress et le front.
3. Lancer le projet via `npm run dev` et observez le menu généré dynamiquement.
4. (Optionnel) Si vous souhaitez modifier le menu directement, rendez-vous sur l'admin du WordPress puis dans Apparence > Menus.

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

---

## QCM

### 1. Questions basiques

1. Écrivez une requête pour récupérer tous les articles publiés (post_type = 'post' et post_status = 'publish'), triés par date de publication (du plus récent au plus ancien).
```bash
SELECT *
FROM wp_posts
WHERE post_type = 'post' AND post_status = 'publish'
ORDER BY post_date DESC;
```

2. Écrivez une requête pour compter le nombre d'articles publiés par auteur, en affichant le nom de l'auteur et le nombre d'articles.
```bash
SELECT wp_users.display_name AS author, COUNT(wp_posts.ID) AS article_count
FROM wp_posts
JOIN wp_users ON wp_posts.post_author = wp_users.ID
WHERE wp_posts.post_status = 'publish' AND wp_posts.post_type = 'post'
GROUP BY wp_users.ID
ORDER BY article_count DESC;
```

3. Écrivez une requête pour récupérer le titre et la valeur d'une méta-donnée spécifique (par exemple '\_thumbnail_id') pour tous les articles publiés qui possèdent cette méta-donnée.
```bash
SELECT wp_posts.post_title, wp_postmeta.meta_value AS thumbnail_id
FROM wp_posts
JOIN wp_postmeta ON wp_posts.ID = wp_postmeta.post_id
WHERE wp_posts.post_status = 'publish'
  AND wp_posts.post_type = 'post'
  AND wp_postmeta.meta_key = '_thumbnail_id';
```

### 2. Requêtes intermédiaires

1. Écrivez une requête pour trouver les 5 articles les plus récents avec leur auteur (nom d'affichage) et le nombre de métadonnées associées à chaque article.
```bash
SELECT 
    wp_posts.ID AS post_id,
    wp_posts.post_title,
    wp_users.display_name AS author,
    COUNT(wp_postmeta.meta_id) AS meta_count
FROM wp_posts
JOIN wp_users ON wp_posts.post_author = wp_users.ID
LEFT JOIN wp_postmeta ON wp_posts.ID = wp_postmeta.post_id
WHERE wp_posts.post_status = 'publish' 
AND wp_posts.post_type = 'post'
GROUP BY wp_posts.ID, wp_posts.post_title, wp_users.display_name
ORDER BY wp_posts.post_date DESC
LIMIT 5;
```

2. Écrivez une requête pour récupérer tous les articles qui contiennent le mot "WordPress" dans leur contenu ou titre, en affichant l'ID, le titre et la date de publication.
```bash
SELECT 
    wp_posts.ID AS post_id,
    wp_posts.post_title,
    wp_posts.post_date
FROM wp_posts
WHERE (wp_posts.post_content LIKE '%WordPress%' 
       OR wp_posts.post_title LIKE '%WordPress%')
AND wp_posts.post_status = 'publish' 
AND wp_posts.post_type = 'post';
```

3. Écrivez une requête pour trouver tous les utilisateurs qui n'ont jamais publié d'article.
```bash
SELECT wp_users.ID, wp_users.user_login, wp_users.display_name, wp_users.user_email
FROM wp_users
LEFT JOIN wp_posts ON wp_users.ID = wp_posts.post_author 
    AND wp_posts.post_status = 'publish' 
    AND wp_posts.post_type = 'post'
WHERE wp_posts.ID IS NULL;
```

### 3. Requête avancée

- Écrivez une requête SQL pour obtenir un rapport des ventes mensuelles pour l'année 2023, avec les informations suivantes : Mois (au format 'YYYY-MM'), nombre total de commandes, montant total des ventes, panier moyen, produit le plus vendu du mois (nom du produit).
```bash
WITH MonthlySales AS (
    SELECT 
        DATE_FORMAT(wp_posts.post_date, '%Y-%m') AS month,
        COUNT(wp_posts.ID) AS total_orders,
        SUM(CAST(order_total.meta_value AS DECIMAL(10,2))) AS total_sales,
        (SUM(CAST(order_total.meta_value AS DECIMAL(10,2))) / COUNT(wp_posts.ID)) AS average_cart_value
    FROM wp_posts
    JOIN wp_postmeta AS order_total 
        ON wp_posts.ID = order_total.post_id 
        AND order_total.meta_key = '_order_total'
    WHERE wp_posts.post_type = 'shop_order'
        AND wp_posts.post_status IN ('wc-completed', 'wc-processing') -- Inclure les commandes valides
        AND wp_posts.post_date BETWEEN '2023-01-01' AND '2023-12-31'
    GROUP BY month
), 

TopProducts AS (
    SELECT 
        DATE_FORMAT(wp_posts.post_date, '%Y-%m') AS month,
        wp_wc_order_items.order_item_name AS top_product,
        COUNT(wp_wc_order_items.order_item_id) AS product_sales,
        RANK() OVER (PARTITION BY DATE_FORMAT(wp_posts.post_date, '%Y-%m') ORDER BY COUNT(wp_wc_order_items.order_item_id) DESC) AS product_rank
    FROM wp_posts
    JOIN wp_wc_order_items ON wp_posts.ID = wp_wc_order_items.order_id
    WHERE wp_posts.post_type = 'shop_order'
        AND wp_posts.post_status IN ('wc-completed', 'wc-processing')
        AND wp_posts.post_date BETWEEN '2023-01-01' AND '2023-12-31'
    GROUP BY month, wp_wc_order_items.order_item_name
)

SELECT 
    MonthlySales.month,
    MonthlySales.total_orders,
    MonthlySales.total_sales,
    MonthlySales.average_cart_value,
    TopProducts.top_product AS best_selling_product
FROM MonthlySales
LEFT JOIN TopProducts ON MonthlySales.month = TopProducts.month AND TopProducts.product_rank = 1
ORDER BY MonthlySales.month;
```
