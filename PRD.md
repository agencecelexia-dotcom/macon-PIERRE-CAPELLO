# PRD — Site Vitrine Maçonnerie Durand (Lyon)

## 1. Résumé

Site vitrine professionnel pour **Maçonnerie Durand**, entreprise de maçonnerie générale basée à **Lyon** (69). L'objectif est de présenter les services, inspirer confiance et générer des demandes de devis qualifiées via un formulaire multi-étapes.

**URL cible** : `www.maconnerie-durand.fr`

---

## 2. Objectifs

| Objectif | Indicateur |
|----------|------------|
| Générer des demandes de devis | Formulaire multi-étapes fonctionnel |
| Inspirer confiance | Portfolio avant/après, avis clients, certifications |
| Référencement local (SEO) | Top 5 Google "maçon Lyon" |
| Expérience mobile | Score PageSpeed mobile > 85 |
| Conformité RGPD | Cookie consent, mentions légales |

---

## 3. Stack technique

| Composant | Technologie |
|-----------|-------------|
| Framework | Next.js 16 (App Router, SSG) |
| Style | Tailwind CSS v4 (CSS-first) |
| Langage | TypeScript 5 |
| Formulaire | react-hook-form + zod v4 |
| Animations | framer-motion (sélectif) |
| Icônes | lucide-react |
| Blog | react-markdown |
| Package manager | npm |
| Déploiement | Vercel |

---

## 4. Design system

### Couleurs
- **Primary** : `#2C3E50` (bleu acier) — navbar, titres, footer
- **Accent** : `#E67E22` (orange) — CTA, boutons, liens actifs
- **Neutral** : `#ECF0F1` (gris clair) — fonds, séparateurs

### Typographie
- **Titres** : Montserrat Bold/ExtraBold (font-heading)
- **Corps** : Inter Regular/Medium (font-body)
- **Base** : 16px mobile / 18px desktop

### Composants UI
- Boutons : 4 variants (primary, accent, outline, ghost)
- Cartes : coin arrondi xl, ombre douce
- Sections : padding uniforme via SectionWrapper
- Icônes : lucide-react 18-24px

---

## 5. Architecture des pages

### 5.1 Page d'accueil (`/`)

| Section | Description |
|---------|-------------|
| Hero | Image fond + overlay + H1 "Votre maçon de confiance à Lyon" + 2 CTA (Devis gratuit, Appeler) |
| Réassurance | 4 badges : 15+ ans d'expérience, Assurance décennale, Devis sous 48h, 200+ projets |
| Services | 3 cartes cliquables (Construction, Rénovation, Extension) → pages dédiées |
| Réalisations | 3 sliders avant/après sélectionnés + lien "Voir toutes nos réalisations" |
| Témoignages | Carousel horizontal, 5 avis avec étoiles |
| CTA final | Bandeau accent "Prêt à lancer votre projet ?" + boutons |

### 5.2 Services (`/services`)

Listing des 3 services avec cartes détaillées, descriptions, et CTA vers les pages dédiées.

### 5.3 Pages SEO services (×3)

| Route | Service |
|-------|---------|
| `/construction-neuve` | Construction neuve |
| `/renovation-maconnerie` | Rénovation maçonnerie |
| `/extension-surelevation` | Extension & surélévation |

**Template partagé** (ServicePageTemplate) :
1. Hero avec breadcrumb
2. Description longue + grille de features (4 items)
3. Timeline processus (4 étapes)
4. Portfolio filtré par catégorie (3 projets avant/après)
5. FAQ accordion (3-4 questions, schema FAQPage)
6. CTA spécifique

### 5.4 Contact / Devis (`/contact`)

- **Gauche (3/5)** : Formulaire multi-étapes
  - Étape 1 : Type de projet (4 cartes : Construction, Rénovation, Extension, Autre)
  - Étape 2 : Détails (surface, délai, code postal)
  - Étape 3 : Coordonnées (nom, téléphone, email, message, consentement RGPD)
- **Droite (2/5)** : Coordonnées, garanties, carte Google Maps

**Soumission** : Le formulaire envoie les données vers une API route (`/api/quote`) qui valide côté serveur avec Zod. La stack d'envoi (email, CRM, webhook) sera configurée ultérieurement par le client.

### 5.5 Réalisations (`/realisations`)

- Filtres par catégorie (Tous, Construction, Rénovation, Extension)
- Grille de 6 projets avec sliders avant/après
- Chaque carte : titre, catégorie, localisation, durée, surface

### 5.6 Avis clients (`/avis-clients`)

- Score agrégé (4.8/5, 47 avis Google)
- Grille de 5 avis avec étoiles, noms, textes, dates
- CTA "Laissez un avis Google"
- Avis manuellement curés (données statiques TypeScript)

### 5.7 À propos (`/a-propos`)

- Histoire de l'entreprise (depuis 2010)
- Valeurs (4 items : Qualité, Transparence, Réactivité, Proximité)
- Photo d'équipe + 3 portraits
- Certifications (Garantie Décennale, RGE, Qualibat)
- CTA bas de page

### 5.8 Blog (`/blog` + `/blog/[slug]`)

- Listing : 3 articles SEO avec cartes (image, titre, extrait, date, catégorie)
- Détail : contenu Markdown + TOC sidebar + Article JSON-LD
- Pré-rendu statique via `generateStaticParams()`

**Articles** :
1. "Quel est le prix au m² pour de la maçonnerie en 2026 ?"
2. "Comment choisir son maçon : 7 critères essentiels"
3. "Extension maison : permis de construire ou déclaration préalable ?"

### 5.9 Mentions légales (`/mentions-legales`)

Page statique RGPD : éditeur, hébergeur, données personnelles, cookies, droits.

### 5.10 Page 404

Page personnalisée avec message, bouton retour accueil, liens utiles.

---

## 6. Données statiques

Toutes les données sont stockées dans des fichiers TypeScript (`lib/data/`). Pas de CMS ni de base de données.

| Fichier | Contenu |
|---------|---------|
| `company.ts` | Nom, téléphone, adresse Lyon, coordonnées GPS, certifications, stats |
| `services.ts` | 3 services avec features, processus, FAQ, SEO meta |
| `testimonials.ts` | 5 avis clients avec ratings, noms, localisations |
| `portfolio.ts` | 6 projets avec images avant/après, catégories |
| `blog-posts.ts` | 3 articles en Markdown + métadonnées |
| `navigation.ts` | Liens navbar, footer services, footer quick links |

---

## 7. Formulaire multi-étapes

### Schéma de validation (Zod v4)

```
Étape 1 — Type de projet
  projectType: "construction" | "renovation" | "extension" | "autre"

Étape 2 — Détails
  surface: number (10-500 m²)
  timeline: "urgent" | "3-mois" | "6-mois" | "flexible"
  postalCode: string (5 chiffres)

Étape 3 — Coordonnées
  firstName: string
  lastName: string
  phone: string (format français)
  email: string (email valide)
  message: string (optionnel)
  consent: boolean (requis = true)
```

### Flux
1. Validation par étape (pas de passage à l'étape suivante sans validation)
2. Barre de progression visuelle (3 étapes)
3. Animation de transition entre étapes (framer-motion)
4. Soumission POST vers `/api/quote`
5. API route : validation Zod serveur + réponse JSON
6. Message de confirmation dans le formulaire

---

## 8. SEO

### Metadata par page
Chaque page a un `title` et `description` uniques, optimisés pour le SEO local (Lyon, maçon, maçonnerie).

### JSON-LD
- **Global** : `HomeAndConstructionBusiness` (nom, adresse, horaires, avis)
- **Services** : `FAQPage` pour chaque page service
- **Blog** : `Article` pour chaque post
- **Navigation** : `BreadcrumbList` sur les pages services

### Sitemap & robots
- Généré par `next-sitemap` à chaque build
- Priorités : `/` = 1.0, `/contact` = 0.9, services = 0.8, blog = 0.6

---

## 9. Performance

| Métrique | Cible |
|----------|-------|
| PageSpeed mobile | > 85 |
| LCP | < 2.5s |
| CLS | < 0.1 |
| FID | < 100ms |

### Optimisations
- `next/image` avec formats WebP/AVIF automatiques
- Fonts auto-hébergées via `next/font` (pas de layout shift)
- Composants dynamiques lazy-loaded (`next/dynamic`)
- Toutes les pages SSG (statiques)
- Headers sécurité (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection)

---

## 10. RGPD

- **Cookie consent** : bandeau custom, Accept/Refuser même poids visuel, cookie 13 mois max
- **Analytics** : chargé uniquement après consentement explicite
- **Formulaire** : case de consentement explicite obligatoire
- **Mentions légales** : page dédiée complète
- **Liens légaux** : présents dans le footer de chaque page

---

## 11. Responsive

| Breakpoint | Viewport | Adaptation |
|------------|----------|------------|
| Mobile | < 640px | Navigation hamburger, colonnes empilées, CTA plein écran |
| Tablette | 640-1024px | 2 colonnes, navbar adaptée |
| Desktop | > 1024px | Layout complet, 3-5 colonnes, sidebar |

### Mobile-first
- Click-to-call FAB fixe en bas à droite (apparaît après scroll)
- Formulaire plein écran
- Carousel touch-friendly

---

## 12. Pages & routes

| Route | Page | Statut |
|-------|------|--------|
| `/` | Accueil | Implémenté |
| `/services` | Listing services | Implémenté |
| `/construction-neuve` | Construction neuve | Implémenté |
| `/renovation-maconnerie` | Rénovation | Implémenté |
| `/extension-surelevation` | Extension | Implémenté |
| `/contact` | Formulaire devis | Implémenté |
| `/realisations` | Portfolio | Implémenté |
| `/avis-clients` | Avis Google | Implémenté |
| `/a-propos` | À propos | Implémenté |
| `/blog` | Blog listing | Implémenté |
| `/blog/[slug]` | Article blog | Implémenté |
| `/mentions-legales` | Mentions légales | Implémenté |
| `/api/quote` | API formulaire | Implémenté (validation seule) |

---

## 13. Images requises

34 images au total — voir `IMAGES-PROMPTS.md` pour la liste complète avec prompts de génération et ratios.

| Catégorie | Nombre | Ratio |
|-----------|--------|-------|
| Hero | 1 | 16:9 |
| Services | 3 | 3:2 |
| Portfolio avant/après + détails | 22 | 4:3 |
| Blog thumbnails | 3 | 16:9 |
| Équipe | 4 | 1:1 + 4:3 |
| OG social | 1 | 16:9 |

---

## 14. Ce qui reste à faire par le client

| Tâche | Priorité |
|-------|----------|
| Générer/fournir les 34 images | Haute |
| Configurer le domaine `maconnerie-durand.fr` | Haute |
| Ajouter l'envoi des formulaires (email/CRM/webhook) | Moyenne |
| Intégrer Google Maps iframe | Moyenne |
| Configurer Google Analytics (GA4) | Moyenne |
| Ajouter l'ID Google My Business pour les avis | Basse |
| Déployer sur Vercel | Haute |
