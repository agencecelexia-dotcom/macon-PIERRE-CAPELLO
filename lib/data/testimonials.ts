export interface Testimonial {
  id: string;
  name: string;
  initials: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  projectType: string;
  videoUrl?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Marie-Claude D.",
    initials: "MD",
    location: "Nantes (44)",
    rating: 5,
    text: "Pierre Capello a réalisé le démoussage de notre toiture en tuiles. Travail remarquable, la toiture a retrouvé sa couleur d'origine ! Très professionnel, ponctuel et soigné. Je recommande vivement.",
    date: "2025-12-10",
    projectType: "Démoussage toiture",
  },
  {
    id: "2",
    name: "François et Isabelle M.",
    initials: "FM",
    location: "Couëron (44)",
    rating: 5,
    text: "Ravalement de façade complet de notre maison. Pierre est un artisan consciencieux qui prend le temps de bien faire. Le résultat est superbe, notre maison semble neuve. Prix très raisonnable.",
    date: "2025-11-15",
    projectType: "Ravalement façade",
  },
  {
    id: "3",
    name: "Jean-Pierre L.",
    initials: "JL",
    location: "Thouaré-sur-Loire (44)",
    rating: 5,
    text: "Peinture intérieure de tout notre rez-de-chaussée. Travail impeccable, préparation des murs très soignée. Pierre est de bon conseil pour le choix des couleurs. Chantier toujours propre.",
    date: "2025-10-05",
    projectType: "Peinture intérieure",
  },
  {
    id: "4",
    name: "Sylvie R.",
    initials: "SR",
    location: "La Roche-sur-Yon (85)",
    rating: 5,
    text: "Nettoyage et traitement de notre façade en pierres. Un travail d'artisan passionné ! Pierre a su adapter sa technique au type de pierre et le résultat est magnifique. Les joints refaits à la chaux sont parfaits.",
    date: "2025-09-20",
    projectType: "Ravalement façade",
  },
  {
    id: "5",
    name: "Alain et Martine B.",
    initials: "AB",
    location: "Deauville (14)",
    rating: 5,
    text: "Nettoyage de toiture en ardoises de notre maison normande. Pierre s'est déplacé depuis Nantes et a fait un travail remarquable. Très professionnel, il connaît parfaitement son métier.",
    date: "2025-08-18",
    projectType: "Démoussage toiture",
  },
  {
    id: "6",
    name: "Nathalie G.",
    initials: "NG",
    location: "Challans (85)",
    rating: 4,
    text: "Remise en peinture de nos 12 volets en bois et du portail. Le décapage a été fait avec soin et la peinture est de très bonne qualité. Petit délai supplémentaire à cause de la pluie mais résultat parfait.",
    date: "2025-07-12",
    projectType: "Peinture extérieure",
  },
  {
    id: "7",
    name: "Christophe V.",
    initials: "CV",
    location: "Les Sables-d'Olonne (85)",
    rating: 5,
    text: "Nettoyage complet de notre terrasse et allées en dalles. Pierre a également traité les murs du jardin. Tout est propre, comme neuf ! Un artisan de confiance que je recommande les yeux fermés.",
    date: "2025-06-25",
    projectType: "Nettoyage terrasse",
  },
  {
    id: "8",
    name: "Patrick et Dominique H.",
    initials: "PH",
    location: "Caen (14)",
    rating: 5,
    text: "Démoussage de toiture et nettoyage de façade. Pierre a fait les deux prestations en une semaine. Le rapport qualité-prix est excellent. Notre maison a retrouvé une seconde jeunesse !",
    date: "2025-05-30",
    projectType: "Démoussage toiture",
  },
];

export const aggregateRating = {
  average: 4.8,
  count: 42,
  distribution: {
    5: 35,
    4: 6,
    3: 1,
    2: 0,
    1: 0,
  },
};
