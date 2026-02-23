import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { readSubmissions, readAnalytics } from "@/lib/storage";
import type { Submission, AnalyticsEvent } from "@/lib/storage";
import { DashboardClient } from "./DashboardClient";

function computeDashboardData(
  submissions: Submission[],
  events: AnalyticsEvent[]
) {
  const now = new Date();

  // --- Top pages ---
  const pageMap = new Map<string, number>();
  events
    .filter((e) => e.type === "page_view")
    .forEach((e) => pageMap.set(e.page, (pageMap.get(e.page) || 0) + 1));
  const topPages = [...pageMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([page, count]) => ({ page, count }));

  // --- Top CTA clicks ---
  const ctaMap = new Map<string, number>();
  events
    .filter((e) => e.type === "cta_click" && e.label)
    .forEach((e) =>
      ctaMap.set(e.label!, (ctaMap.get(e.label!) || 0) + 1)
    );
  const topCTAs = [...ctaMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([label, count]) => ({ label, count }));

  // --- Daily views (last 14 days) ---
  const dailyViews: { date: string; views: number; clicks: number }[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const views = events.filter(
      (e) => e.type === "page_view" && e.createdAt.startsWith(key)
    ).length;
    const clicks = events.filter(
      (e) => e.type === "cta_click" && e.createdAt.startsWith(key)
    ).length;
    dailyViews.push({ date: key, views, clicks });
  }

  // --- Weekly comparison ---
  const thisWeekStart = new Date(now);
  thisWeekStart.setDate(thisWeekStart.getDate() - 6);
  thisWeekStart.setHours(0, 0, 0, 0);

  const lastWeekStart = new Date(thisWeekStart);
  lastWeekStart.setDate(lastWeekStart.getDate() - 7);

  const thisWeekViews = events.filter(
    (e) => e.type === "page_view" && new Date(e.createdAt) >= thisWeekStart
  ).length;
  const lastWeekViews = events.filter(
    (e) =>
      e.type === "page_view" &&
      new Date(e.createdAt) >= lastWeekStart &&
      new Date(e.createdAt) < thisWeekStart
  ).length;

  const thisWeekClicks = events.filter(
    (e) => e.type === "cta_click" && new Date(e.createdAt) >= thisWeekStart
  ).length;
  const lastWeekClicks = events.filter(
    (e) =>
      e.type === "cta_click" &&
      new Date(e.createdAt) >= lastWeekStart &&
      new Date(e.createdAt) < thisWeekStart
  ).length;

  // --- Service breakdown ---
  const serviceMap = new Map<string, number>();
  submissions.forEach((s) =>
    serviceMap.set(s.projectType, (serviceMap.get(s.projectType) || 0) + 1)
  );
  const serviceBreakdown = [...serviceMap.entries()].map(([service, count]) => ({
    service,
    count,
  }));

  // --- Conversion rate ---
  const totalViews = events.filter((e) => e.type === "page_view").length;
  const totalSubmits = events.filter((e) => e.type === "form_submit").length;
  const conversionRate =
    totalViews > 0 ? ((totalSubmits / totalViews) * 100).toFixed(1) : "0";

  // --- Form completion rate ---
  const formStarts = events.filter((e) => e.type === "form_start").length;
  const formCompletionRate =
    formStarts > 0 ? ((totalSubmits / formStarts) * 100).toFixed(0) : "0";

  // --- Unread count ---
  const unreadCount = submissions.filter((s) => !s.read).length;

  return {
    submissions,
    topPages,
    topCTAs,
    dailyViews,
    thisWeekViews,
    lastWeekViews,
    thisWeekClicks,
    lastWeekClicks,
    serviceBreakdown,
    conversionRate,
    formCompletionRate,
    totalViews,
    totalSubmits,
    unreadCount,
  };
}

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const auth = cookieStore.get("admin_auth");
  if (!auth || auth.value !== "macon-admin-session-v1") {
    redirect("/admin/login");
  }

  const submissions = readSubmissions();
  const events = readAnalytics();
  const data = computeDashboardData(submissions, events);

  return <DashboardClient data={data} />;
}
