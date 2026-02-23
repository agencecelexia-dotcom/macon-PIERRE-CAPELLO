export type PortfolioCategory = "demoussage" | "ravalement" | "peinture";

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: PortfolioCategory;
  location: string;
  year: number;
  imageBefore: string;
  imageAfter: string;
  duration: string;
  surface?: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: "toiture-tuiles-nantes",
    title: "Démoussage toiture tuiles 120m²",
    description: "Démoussage complet d'une toiture en tuiles terre cuite avec traitement anti-mousse Dalep 2100 et application d'hydrofuge. Résultat spectaculaire.",
    category: "demoussage",
    location: "Nantes (44)",
    year: 2025,
    imageBefore: "/images/portfolio/toiture-tuiles-avant.jpg",
    imageAfter: "/images/portfolio/toiture-tuiles-apres.jpg",
    duration: "2 jours",
    surface: "120 m²",
  },
  {
    id: "facade-enduit-coueron",
    title: "Ravalement façade enduit",
    description: "Nettoyage et ravalement complet d'une façade enduit avec réparation des fissures, application d'un nouvel enduit et peinture extérieure.",
    category: "ravalement",
    location: "Couëron (44)",
    year: 2025,
    imageBefore: "/images/portfolio/facade-enduit-avant.jpg",
    imageAfter: "/images/portfolio/facade-enduit-apres.jpg",
    duration: "2 semaines",
    surface: "80 m²",
  },
  {
    id: "peinture-interieure-thouare",
    title: "Peinture intérieure maison",
    description: "Remise en peinture complète d'une maison : séjour, chambres, couloirs et plafonds. Préparation soignée des supports et 2 couches de peinture Seigneurie.",
    category: "peinture",
    location: "Thouaré-sur-Loire (44)",
    year: 2024,
    imageBefore: "/images/portfolio/peinture-interieure-avant.jpg",
    imageAfter: "/images/portfolio/peinture-interieure-apres.jpg",
    duration: "1 semaine",
    surface: "150 m²",
  },
  {
    id: "toiture-ardoise-deauville",
    title: "Nettoyage toiture ardoise",
    description: "Nettoyage basse pression d'une toiture en ardoises naturelles avec traitement anti-mousse doux et nettoyage des gouttières. Résultat impeccable.",
    category: "demoussage",
    location: "Deauville (14)",
    year: 2024,
    imageBefore: "/images/portfolio/toiture-ardoise-avant.jpg",
    imageAfter: "/images/portfolio/toiture-ardoise-apres.jpg",
    duration: "2 jours",
    surface: "100 m²",
  },
  {
    id: "facade-pierre-la-roche",
    title: "Ravalement façade pierre",
    description: "Nettoyage et rejointoiement d'une façade en pierres apparentes. Traitement anti-mousse, réfection des joints à la chaux et hydrofuge de protection.",
    category: "ravalement",
    location: "La Roche-sur-Yon (85)",
    year: 2025,
    imageBefore: "/images/portfolio/facade-pierre-avant.jpg",
    imageAfter: "/images/portfolio/facade-pierre-apres.jpg",
    duration: "10 jours",
    surface: "65 m²",
  },
  {
    id: "peinture-volets-challans",
    title: "Peinture volets et portail",
    description: "Décapage, ponçage et remise en peinture de 12 volets bois et d'un portail métallique. Sous-couche et 2 couches de peinture extérieure Zolpan.",
    category: "peinture",
    location: "Challans (85)",
    year: 2024,
    imageBefore: "/images/portfolio/peinture-volets-avant.jpg",
    imageAfter: "/images/portfolio/peinture-volets-apres.jpg",
    duration: "4 jours",
  },
];

export const portfolioCategories: { value: PortfolioCategory | "all"; label: string }[] = [
  { value: "all", label: "Tous les projets" },
  { value: "demoussage", label: "Démoussage Toiture" },
  { value: "ravalement", label: "Ravalement Façade" },
  { value: "peinture", label: "Peinture" },
];
