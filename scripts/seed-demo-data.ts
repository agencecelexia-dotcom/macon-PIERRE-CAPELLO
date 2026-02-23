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
const types = ["construction", "renovation", "extension", "autre"];
const timelines = ["urgent", "3-mois", "6-mois", "estimation"];
const codes = ["26200", "26130", "26290", "26700", "26780", "07400", "07150", "26220", "26230", "07700"];
const messages = [
  "Nous souhaitons construire une maison neuve sur un terrain acquis récemment.",
  "Rénovation complète d'une maison des années 60, murs porteurs à reprendre.",
  "Extension de 30m² à l'arrière de notre pavillon pour un salon plus grand.",
  "Création d'un garage attenant à la maison avec fondations.",
  "Reprise de fissures sur façade et renforcement de la structure.",
  "Surélévation d'un étage sur maison plain-pied existante.",
  "Mur de clôture en parpaing + enduit sur 40 mètres linéaires.",
  "Ouverture dans un mur porteur pour agrandir la cuisine.",
  "",
  "Terrasse en béton décoratif 50m² + muret de soutènement.",
  "Réfection complète de la toiture avec charpente à reprendre.",
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
  "/construction-neuve", "/construction-neuve",
  "/renovation-maconnerie", "/renovation-maconnerie",
  "/gros-oeuvre",
  "/realisations", "/realisations",
  "/avis-clients",
  "/a-propos",
  "/blog",
  "/blog/prix-maconnerie-2026",
  "/blog/choisir-son-macon",
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
      page: Math.random() > 0.5 ? "/" : "/construction-neuve",
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
