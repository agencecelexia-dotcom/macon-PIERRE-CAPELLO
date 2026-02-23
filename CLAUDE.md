# CLAUDE.md — Conventions & Setup du projet Ravalement Nettoyage Capello

## Stack technique

- **Framework** : Next.js 16 (App Router)
- **Style** : Tailwind CSS v4 (CSS-first config via `@theme inline`)
- **Language** : TypeScript 5
- **Package manager** : npm
- **Node** : v24.x
- **Form** : react-hook-form + zod v4
- **Animations** : CSS animations + IntersectionObserver (ScrollReveal)
- **Icônes** : lucide-react

## Structure du projet

```
ravalement-nettoyage-capello/
├── app/                          # App Router (pages, layouts, API routes)
│   ├── layout.tsx               # Root layout (fonts, nav, footer, cookie)
│   ├── page.tsx                 # Page d'accueil
│   ├── globals.css              # Tailwind + design system
│   ├── fonts.ts                 # Montserrat + Inter
│   ├── api/quote/route.ts       # API formulaire devis
│   ├── services/                # Page listing services
│   ├── demoussage-toiture/      # Page SEO démoussage
│   ├── ravalement-facade/       # Page SEO ravalement
│   ├── peinture/                # Page SEO peinture
│   ├── realisations/            # Portfolio avant/après
│   ├── avis-clients/            # Avis clients
│   ├── a-propos/                # À propos
│   ├── contact/                 # Formulaire devis
│   ├── blog/                    # Blog listing + [slug]
│   └── mentions-legales/        # Pages légales
├── components/
│   ├── layout/                  # NavBar, Footer, SectionWrapper
│   ├── ui/                      # Button, Badge, Card, StarRating, etc.
│   ├── sections/                # HeroSection, CTABanner, etc.
│   ├── forms/                   # QuoteForm multi-étapes
│   ├── templates/               # ServicePageTemplate (partagé)
│   └── seo/                     # JsonLdScript, BreadcrumbJsonLd
├── lib/
│   ├── data/                    # Données statiques TypeScript
│   ├── schemas/                 # Schémas Zod
│   └── utils.ts                 # cn(), formatPhone()
├── public/images/               # Assets
└── CLAUDE.md
```

## Design system

### Couleurs (définies dans globals.css @theme)
- **Primary** : `#2C3E50` (bleu acier) → `bg-primary`, `text-primary`
- **Accent** : `#E67E22` (orange) → `bg-accent`, `text-accent`
- **Neutral** : `#ECF0F1` (gris clair) → `bg-neutral`, `bg-neutral-50`

### Typographie
- Titres : `font-heading` (Montserrat Bold)
- Corps : `font-body` (Inter)
- Mobile : 16px base | Desktop : 18px base

## Conventions de code

### TypeScript
- Toujours typer les props avec interface
- Pas de `any`
- Named exports pour les composants UI, default exports pour les pages

### Composants React
- Un composant = un fichier en PascalCase
- `"use client"` uniquement si nécessaire
- Composants serveur par défaut

### Tailwind CSS v4
- Utiliser les classes utilitaires en priorité
- Design system dans `globals.css` via `@theme inline { }`
- Pas de `tailwind.config.ts` (Tailwind v4 = CSS-first)

## Images

### Services (`public/images/services/`) — 3 images, 1800×1200

| Fichier | Description |
|---------|-------------|
| `demoussage-toiture.jpg` | Toiture en cours de nettoyage |
| `ravalement-facade.jpg` | Façade avant/après ravalement |
| `peinture.jpg` | Artisan peintre au travail |

### Blog (`public/images/blog/`) — 5 images, 1800×1200

| Fichier | Description |
|---------|-------------|
| `prix-demoussage.jpg` | Calculatrice, devis, échantillons |
| `entretien-toiture.jpg` | Toiture propre vue du jardin |
| `choisir-professionnel.jpg` | Artisan avec client |
| `produits-professionnels.jpg` | Produits Dalep, Algimouss |
| `aides-ravalement.jpg` | Tirelire maison + documents |

### Portfolio (`public/images/portfolio/`) — 12 images (6 projets × avant/après), 1200×900

| Projet | Fichiers |
|--------|----------|
| Toiture tuiles | `toiture-tuiles-avant.jpg`, `toiture-tuiles-apres.jpg` |
| Façade enduit | `facade-enduit-avant.jpg`, `facade-enduit-apres.jpg` |
| Peinture intérieure | `peinture-interieure-avant.jpg`, `peinture-interieure-apres.jpg` |
| Toiture ardoise | `toiture-ardoise-avant.jpg`, `toiture-ardoise-apres.jpg` |
| Façade pierre | `facade-pierre-avant.jpg`, `facade-pierre-apres.jpg` |
| Peinture volets | `peinture-volets-avant.jpg`, `peinture-volets-apres.jpg` |

## Commandes

```bash
npm run dev          # Dev server (Turbopack) → http://localhost:3000
npm run build        # Build production + sitemap
npm run lint         # ESLint
npm run type-check   # TypeScript check
```

## Workflow Git

- Commits conventionnels : `feat:`, `fix:`, `style:`, `refactor:`, `chore:`
- Git config : Thomas / agence.celexia@gmail.com

## Informations entreprise

- **Entreprise** : Ravalement Nettoyage Capello
- **Gérant** : Pierre Capello
- **SIREN** : 538 104 498
- **SIRET** : 538 104 498 00034
- **Adresse** : 1 Avenue des Jades, 44300 Nantes
- **Téléphone** : 06 61 11 88 86
- **Email** : pierrecapello70@gmail.com
- **Activité** : Nettoyage courant des bâtiments (8121Z)
- **Zone** : Loire-Atlantique (44), Vendée (85), Calvados (14)
