export interface FAQ {
  question: string;
  answer: string;
}

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  icon: string;
  image: string;
  features: ServiceFeature[];
  process: ProcessStep[];
  faqs: FAQ[];
  seoTitle: string;
  seoDescription: string;
}

export const services: Service[] = [
  {
    id: "demoussage-toiture",
    slug: "demoussage-toiture",
    title: "Démoussage & Nettoyage Toiture",
    shortDescription: "Nettoyage professionnel de toiture, démoussage, traitement anti-mousse et hydrofuge pour prolonger la durée de vie de votre toit.",
    longDescription: "Ravalement Nettoyage Capello vous propose un service complet de démoussage et nettoyage de toiture à Nantes et sur toute la Loire-Atlantique. Avec plus de 15 ans d'expérience, Pierre Capello et son équipe utilisent des produits professionnels homologués (Dalep 2100, Algimouss Pro) pour éliminer durablement mousses, lichens et algues de votre toiture. Nous intervenons sur tous types de couvertures : ardoises, tuiles, fibrociment. Chaque intervention comprend un diagnostic complet, un nettoyage adapté au type de couverture et l'application d'un traitement préventif longue durée.",
    icon: "Home",
    image: "/images/services/demoussage-toiture.jpg",
    features: [
      { title: "Nettoyage haute pression adapté", description: "Nettoyage basse ou haute pression selon le type de couverture, pour éliminer mousses et salissures sans abîmer vos tuiles ou ardoises." },
      { title: "Traitement anti-mousse professionnel", description: "Application de produits certifiés (Dalep 2100, Algimouss Pro) pour une protection durable contre la repousse des mousses et lichens." },
      { title: "Hydrofuge de toiture", description: "Application d'un traitement hydrofuge imperméabilisant qui protège votre couverture contre les infiltrations et le gel." },
      { title: "Nettoyage des gouttières", description: "Débouchage et nettoyage complet des gouttières et descentes d'eaux pluviales pour assurer un bon écoulement." },
      { title: "Diagnostic de l'état de la toiture", description: "Inspection visuelle complète de votre couverture pour détecter les tuiles cassées, faîtages abîmés ou problèmes d'étanchéité." },
      { title: "Tous types de couvertures", description: "Intervention sur ardoises, tuiles terre cuite, tuiles béton, fibrociment et toitures terrasses." },
    ],
    process: [
      { step: 1, title: "Diagnostic gratuit", description: "Visite sur site, inspection de la toiture, photos de l'état actuel et devis détaillé gratuit sous 48h." },
      { step: 2, title: "Nettoyage", description: "Nettoyage haute ou basse pression adapté au matériau, élimination des mousses, lichens et dépôts verts." },
      { step: 3, title: "Traitement", description: "Application du traitement anti-mousse professionnel et hydrofuge pour une protection longue durée." },
      { step: 4, title: "Contrôle final", description: "Vérification de la qualité du travail, nettoyage du chantier et remise du compte-rendu d'intervention." },
    ],
    faqs: [
      { question: "À quelle fréquence faut-il démousser sa toiture ?", answer: "En règle générale, un démoussage est recommandé tous les 3 à 5 ans, selon l'exposition de votre toiture. En Loire-Atlantique, le climat océanique favorise la pousse des mousses." },
      { question: "Le nettoyage haute pression abîme-t-il les tuiles ?", answer: "Nous adaptons systématiquement la pression au type de couverture. Sur les tuiles fragiles ou anciennes, nous utilisons un nettoyage basse pression avec des produits biodégradables." },
      { question: "Quels produits utilisez-vous ?", answer: "Nous utilisons des produits professionnels certifiés : Dalep 2100, Algimouss Pro et des hydrofuges de marques reconnues (Zolpan, Seigneurie)." },
      { question: "Combien coûte un démoussage de toiture ?", answer: "Comptez en moyenne 15 à 30 €/m² pour un démoussage complet avec traitement. Nous établissons un devis gratuit et détaillé avant chaque intervention." },
      { question: "Intervenez-vous sur les toitures en ardoise ?", answer: "Oui, nous intervenons sur tous types de couvertures : ardoises naturelles, tuiles terre cuite, tuiles béton et fibrociment." },
    ],
    seoTitle: "Démoussage & Nettoyage Toiture à Nantes | Ravalement Nettoyage Capello",
    seoDescription: "Démoussage et nettoyage de toiture à Nantes et Loire-Atlantique. Traitement anti-mousse, hydrofuge professionnel. Artisan qualifié, devis gratuit sous 48h.",
  },
  {
    id: "ravalement-facade",
    slug: "ravalement-facade",
    title: "Ravalement de Façade",
    shortDescription: "Nettoyage, rénovation et embellissement de façades : crépi, enduit, peinture extérieure pour redonner vie à votre maison.",
    longDescription: "Le ravalement de façade est notre spécialité chez Ravalement Nettoyage Capello. Pierre Capello intervient à Nantes et dans toute la Loire-Atlantique pour redonner à vos façades leur éclat d'origine. Qu'il s'agisse d'un simple nettoyage, d'une réfection d'enduit ou d'une peinture extérieure complète, nous maîtrisons toutes les techniques de ravalement. Nous utilisons des produits de qualité professionnelle (Zolpan, Seigneurie Gauthier) pour des finitions durables et esthétiques.",
    icon: "Building2",
    image: "/images/services/ravalement-facade.jpg",
    features: [
      { title: "Nettoyage de façade", description: "Nettoyage haute pression, gommage ou nébulisation selon le type de support pour éliminer salissures, traces noires et pollution." },
      { title: "Réfection d'enduit", description: "Réparation et application d'enduit monocouche ou traditionnel pour corriger fissures, décollements et imperfections." },
      { title: "Peinture extérieure", description: "Application de peintures extérieures de haute qualité (Zolpan, Seigneurie) pour protéger et embellir durablement vos façades." },
      { title: "Traitement anti-mousse", description: "Application de produits fongicides et algicides pour éliminer et prévenir la repousse des micro-organismes sur vos murs." },
      { title: "Imperméabilisation", description: "Application d'un hydrofuge de façade pour protéger vos murs contre les infiltrations d'eau et les dégradations liées à l'humidité." },
      { title: "Traitement des fissures", description: "Diagnostic et réparation des fissures superficielles et structurelles avec des techniques adaptées." },
    ],
    process: [
      { step: 1, title: "Diagnostic façade", description: "Visite sur site, analyse de l'état de la façade, identification des pathologies et devis détaillé gratuit." },
      { step: 2, title: "Préparation", description: "Installation de l'échafaudage si nécessaire, protection des menuiseries et nettoyage du support." },
      { step: 3, title: "Travaux de ravalement", description: "Réparations, application d'enduit, peinture ou traitement selon le diagnostic. Finitions soignées." },
      { step: 4, title: "Réception", description: "Contrôle qualité, nettoyage du chantier, démontage de l'échafaudage et remise du compte-rendu." },
    ],
    faqs: [
      { question: "Faut-il une autorisation pour un ravalement de façade ?", answer: "Oui, une déclaration préalable de travaux est obligatoire en mairie pour tout ravalement de façade." },
      { question: "Combien coûte un ravalement de façade ?", answer: "Le prix varie de 30 à 100 €/m² selon l'état de la façade, le type de traitement et la hauteur du bâtiment." },
      { question: "Quelle est la durée d'un ravalement de façade ?", answer: "Un ravalement complet dure en moyenne 1 à 3 semaines selon la surface et la nature des travaux." },
      { question: "Quels types de façades traitez-vous ?", answer: "Nous intervenons sur tous types de façades : enduit, crépi, pierre, brique, béton, bardage." },
      { question: "Existe-t-il des aides pour le ravalement de façade ?", answer: "Oui, une TVA à 10 % s'applique sur les travaux de ravalement pour les logements de plus de 2 ans. Des aides ANAH sont aussi possibles." },
    ],
    seoTitle: "Ravalement de Façade à Nantes | Ravalement Nettoyage Capello",
    seoDescription: "Ravalement de façade à Nantes et Loire-Atlantique. Nettoyage, enduit, peinture extérieure, traitement anti-mousse. Artisan qualifié, devis gratuit sous 48h.",
  },
  {
    id: "peinture",
    slug: "peinture",
    title: "Peinture Intérieure & Extérieure",
    shortDescription: "Travaux de peinture intérieure et extérieure pour particuliers : murs, plafonds, boiseries, volets, portails.",
    longDescription: "Ravalement Nettoyage Capello propose un service complet de peinture intérieure et extérieure à Nantes et dans toute la Loire-Atlantique. Pierre Capello apporte le même soin et la même exigence de qualité à vos travaux de peinture qu'à ses prestations de ravalement. Nous utilisons exclusivement des peintures professionnelles de grandes marques (Zolpan, Seigneurie Gauthier) pour garantir un rendu impeccable et durable.",
    icon: "Paintbrush",
    image: "/images/services/peinture.jpg",
    features: [
      { title: "Peinture intérieure", description: "Mise en peinture de murs, plafonds et boiseries intérieures avec préparation soignée des supports." },
      { title: "Peinture extérieure", description: "Peinture de façades, murs extérieurs, clôtures et murets avec des peintures résistantes aux intempéries." },
      { title: "Peinture de volets et portails", description: "Décapage, ponçage, sous-couche et peinture de vos volets bois ou métal et portails pour un rendu neuf." },
      { title: "Lasure et vernis", description: "Application de lasures et vernis sur boiseries extérieures pour nourrir et protéger le bois." },
      { title: "Préparation des supports", description: "Rebouchage des fissures, ponçage, application d'enduit de lissage et de sous-couche pour un résultat parfait." },
      { title: "Conseil couleurs", description: "Aide au choix des couleurs et des finitions en fonction de vos goûts et des contraintes du support." },
    ],
    process: [
      { step: 1, title: "Visite et devis", description: "Visite sur site, prise de mesures, conseil sur les couleurs et finitions, devis détaillé gratuit sous 48h." },
      { step: 2, title: "Préparation", description: "Protection du mobilier et des sols, préparation minutieuse des supports." },
      { step: 3, title: "Mise en peinture", description: "Application des couches de peinture avec le plus grand soin, respect des temps de séchage." },
      { step: 4, title: "Finitions et nettoyage", description: "Retouches, vérification du rendu final, nettoyage complet du chantier." },
    ],
    faqs: [
      { question: "Quelles marques de peinture utilisez-vous ?", answer: "Nous utilisons exclusivement des peintures professionnelles Zolpan et Seigneurie Gauthier." },
      { question: "Combien coûte la peinture au m² ?", answer: "Le prix varie de 20 à 45 €/m² selon le type de support, l'état des murs et la qualité de peinture choisie." },
      { question: "Faut-il vider la pièce avant les travaux ?", answer: "Pas nécessairement. Nous déplaçons et protégeons votre mobilier avec des bâches." },
      { question: "Combien de couches de peinture appliquez-vous ?", answer: "En règle générale, une sous-couche puis deux couches de finition." },
      { question: "Intervenez-vous aussi pour de la peinture extérieure ?", answer: "Oui, nous réalisons tous types de travaux de peinture extérieure : façades, volets, portails, clôtures, bardages." },
    ],
    seoTitle: "Peinture Intérieure & Extérieure à Nantes | Ravalement Nettoyage Capello",
    seoDescription: "Travaux de peinture intérieure et extérieure à Nantes et Loire-Atlantique. Peintures professionnelles Zolpan, Seigneurie. Devis gratuit.",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
