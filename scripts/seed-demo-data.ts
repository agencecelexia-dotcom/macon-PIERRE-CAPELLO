/**
 * Seed demo data for the admin dashboard.
 * Run: npx tsx scripts/seed-demo-data.ts
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const STORAGE_DIR = join(process.cwd(), "storage");
if (!existsSync(STORAGE_DIR)) mkdirSync(STORAGE_DIR, { recursive: true });

// -------- Submissions --------

const prenoms = ["Marie", "Pierre", "Sophie", "Laurent", "Isabelle", "Nicolas", "Catherine", "Antoine", "Nathalie", "François"];
const noms = ["Martin", "Bernard", "Petit", "Robert", "Richard", "Morel", "Moreau", "Simon", "Laurent", "Michel"];
const types = ["toiture", "facade", "peinture", "autre"];
const timelines = ["urgent", "3-mois", "6-mois", "estimation"];
const codes = ["44300", "44220", "44470", "44800", "44400", "44100", "44120", "85000", "85300", "14800"];
const messages = [
  "Toiture couverte de mousse depuis plusieurs années, besoin d'un démoussage complet avec traitement.",
  "Ravalement de façade sur maison des années 70, crépi fissuré par endroits.",
  "Peinture intérieure complète d'un appartement T3 (salon, 2 chambres, cuisine).",
  "Nettoyage de terrasse en dalles + traitement anti-mousse.",
  "Hydrofuge de toiture après démoussage, tuiles terre cuite.",
  "Ravalement façade + peinture volets et portail.",
  "Démoussage toiture ardoise 120m² + nettoyage gouttières.",
  "Peinture extérieure façade après ravalement, 2 couches.",
  "",
  "Nettoyage façade pierre + traitement anti-mousse préventif.",
  "Démoussage toiture fibrociment + application hydrofuge.",
  "",
];

const submissions = [];
const now = Date.now();

for (let i = 0; i < 12; i++) {
  const createdAt = new Date(now - (i * 2 + Math.random() * 3) * 86400000);
  const prenom = prenoms[i % prenoms.length];
  const nom = noms[i % noms.length];
  submissions.push({
    id: crypto.randomUUID(),
    createdAt: createdAt.toISOString(),
    projectType: types[i % types.length],
    surface: Math.floor(40 + Math.random() * 160),
    timeline: timelines[i % timelines.length],
    postalCode: codes[i % codes.length],
    fullName: `${prenom} ${nom}`,
    phone: `06 ${String(Math.floor(10000000 + Math.random() * 89999999)).replace(/(\d{2})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4")}`,
    email: `${prenom.toLowerCase()}.${nom.toLowerCase()}@email.com`,
    message: messages[i % messages.length] || undefined,
    read: i > 4, // first 5 unread
  });
}

writeFileSync(
  join(STORAGE_DIR, "submissions.json"),
  JSON.stringify(submissions, null, 2)
);
console.log(`✓ ${submissions.length} soumissions créées`);

// -------- Analytics Events --------

const pages = [
  "/", "/", "/", "/", "/",
  "/contact", "/contact", "/contact",
  "/services", "/services",
  "/demoussage-toiture", "/demoussage-toiture",
  "/ravalement-facade", "/ravalement-facade",
  "/peinture",
  "/realisations", "/realisations",
  "/avis-clients",
  "/a-propos",
  "/blog",
  "/blog/prix-demoussage-toiture-2026",
  "/blog/entretenir-toiture-guide-complet",
  "/mentions-legales",
];

const ctaLabels = [
  "hero-devis", "hero-devis", "hero-devis",
  "hero-appel", "hero-appel",
  "cta-devis", "cta-devis", "cta-devis",
  "cta-appel",
];

const events: {
  id: string;
  createdAt: string;
  type: string;
  page: string;
  label?: string;
  referrer?: string;
  ua?: string;
}[] = [];

// Generate 14 days of data
for (let day = 13; day >= 0; day--) {
  const baseDate = new Date(now - day * 86400000);

  // Page views: 15-45 per day, more on recent days
  const viewCount = Math.floor(15 + Math.random() * 30 + (14 - day) * 1.5);
  for (let v = 0; v < viewCount; v++) {
    const hour = Math.floor(7 + Math.random() * 15);
    const minute = Math.floor(Math.random() * 60);
    const d = new Date(baseDate);
    d.setHours(hour, minute, Math.floor(Math.random() * 60));
    events.push({
      id: crypto.randomUUID(),
      createdAt: d.toISOString(),
      type: "page_view",
      page: pages[Math.floor(Math.random() * pages.length)],
      referrer: Math.random() > 0.6 ? "https://www.google.com/" : "",
      ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    });
  }

  // CTA clicks: 3-10 per day
  const clickCount = Math.floor(3 + Math.random() * 7);
  for (let c = 0; c < clickCount; c++) {
    const hour = Math.floor(8 + Math.random() * 14);
    const minute = Math.floor(Math.random() * 60);
    const d = new Date(baseDate);
    d.setHours(hour, minute, Math.floor(Math.random() * 60));
    events.push({
      id: crypto.randomUUID(),
      createdAt: d.toISOString(),
      type: "cta_click",
      page: Math.random() > 0.5 ? "/" : "/demoussage-toiture",
      label: ctaLabels[Math.floor(Math.random() * ctaLabels.length)],
      ua: "Mozilla/5.0",
    });
  }

  // Form starts: 1-4 per day
  const formStartCount = Math.floor(1 + Math.random() * 3);
  for (let f = 0; f < formStartCount; f++) {
    const d = new Date(baseDate);
    d.setHours(Math.floor(9 + Math.random() * 12), Math.floor(Math.random() * 60));
    events.push({
      id: crypto.randomUUID(),
      createdAt: d.toISOString(),
      type: "form_start",
      page: "/contact",
      ua: "Mozilla/5.0",
    });
  }

  // Form submits: 0-2 per day
  const formSubmitCount = Math.floor(Math.random() * 2.5);
  for (let f = 0; f < formSubmitCount; f++) {
    const d = new Date(baseDate);
    d.setHours(Math.floor(10 + Math.random() * 10), Math.floor(Math.random() * 60));
    events.push({
      id: crypto.randomUUID(),
      createdAt: d.toISOString(),
      type: "form_submit",
      page: "/contact",
      ua: "Mozilla/5.0",
    });
  }
}

// Sort by date
events.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

writeFileSync(
  join(STORAGE_DIR, "analytics.json"),
  JSON.stringify(events, null, 2)
);
console.log(`✓ ${events.length} événements analytics créés`);
console.log("\nDonnées de démo prêtes !");
