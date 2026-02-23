import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

// --------------- Types ---------------

export interface Submission {
  id: string;
  createdAt: string;
  projectType: string;
  surface: number;
  timeline: string;
  postalCode: string;
  fullName: string;
  phone: string;
  email: string;
  message?: string;
  read: boolean;
}

export interface AnalyticsEvent {
  id: string;
  createdAt: string;
  type: "page_view" | "cta_click" | "form_start" | "form_submit";
  page: string;
  label?: string;
  referrer?: string;
  ua?: string;
}

// --------------- Paths ---------------

// On Vercel: write to /tmp (writable), read from /tmp or fall back to repo's storage/ (seed data)
const WRITE_DIR = process.env.VERCEL
  ? join("/tmp", "storage")
  : join(process.cwd(), "storage");
const SEED_DIR = join(process.cwd(), "storage");

const SUBMISSIONS_WRITE = join(WRITE_DIR, "submissions.json");
const ANALYTICS_WRITE = join(WRITE_DIR, "analytics.json");
const SUBMISSIONS_SEED = join(SEED_DIR, "submissions.json");
const ANALYTICS_SEED = join(SEED_DIR, "analytics.json");

function ensureDir() {
  try {
    if (!existsSync(WRITE_DIR)) {
      mkdirSync(WRITE_DIR, { recursive: true });
    }
  } catch {
    // Read-only filesystem — ignore
  }
}

function readJson<T>(writePath: string, seedPath: string): T[] {
  // Try write location first (has live data on local or from previous Vercel writes)
  if (existsSync(writePath)) {
    try { return JSON.parse(readFileSync(writePath, "utf-8")); } catch { /* fall through */ }
  }
  // Fall back to seed file committed to repo
  if (existsSync(seedPath)) {
    try { return JSON.parse(readFileSync(seedPath, "utf-8")); } catch { /* fall through */ }
  }
  return [];
}

// --------------- Submissions ---------------

export function readSubmissions(): Submission[] {
  ensureDir();
  return readJson<Submission>(SUBMISSIONS_WRITE, SUBMISSIONS_SEED);
}

export function saveSubmission(
  data: Omit<Submission, "id" | "createdAt" | "read">
): Submission {
  ensureDir();
  const submissions = readSubmissions();
  const submission: Submission = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    read: false,
    ...data,
  };
  submissions.unshift(submission);
  try {
    writeFileSync(SUBMISSIONS_WRITE, JSON.stringify(submissions, null, 2));
  } catch {
    // Read-only filesystem — data won't persist
  }
  return submission;
}

export function markSubmissionRead(id: string): boolean {
  const submissions = readSubmissions();
  const sub = submissions.find((s) => s.id === id);
  if (!sub) return false;
  sub.read = true;
  try {
    writeFileSync(SUBMISSIONS_WRITE, JSON.stringify(submissions, null, 2));
  } catch {
    return false;
  }
  return true;
}

export function deleteSubmission(id: string): boolean {
  const submissions = readSubmissions();
  const idx = submissions.findIndex((s) => s.id === id);
  if (idx === -1) return false;
  submissions.splice(idx, 1);
  try {
    writeFileSync(SUBMISSIONS_WRITE, JSON.stringify(submissions, null, 2));
  } catch {
    return false;
  }
  return true;
}

// --------------- Analytics ---------------

const MAX_EVENTS = 10_000;

export function readAnalytics(): AnalyticsEvent[] {
  ensureDir();
  return readJson<AnalyticsEvent>(ANALYTICS_WRITE, ANALYTICS_SEED);
}

export function saveEvent(
  data: Omit<AnalyticsEvent, "id" | "createdAt">
): AnalyticsEvent {
  ensureDir();
  const events = readAnalytics();
  const event: AnalyticsEvent = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...data,
  };
  events.push(event);
  // Keep only last MAX_EVENTS
  if (events.length > MAX_EVENTS) {
    events.splice(0, events.length - MAX_EVENTS);
  }
  try {
    writeFileSync(ANALYTICS_WRITE, JSON.stringify(events, null, 2));
  } catch {
    // Read-only filesystem — event won't persist
  }
  return event;
}
