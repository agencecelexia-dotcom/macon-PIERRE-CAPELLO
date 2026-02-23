"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Submission } from "@/lib/storage";

// --------------- Types ---------------

interface DashboardData {
  submissions: Submission[];
  topPages: { page: string; count: number }[];
  topCTAs: { label: string; count: number }[];
  dailyViews: { date: string; views: number; clicks: number }[];
  thisWeekViews: number;
  lastWeekViews: number;
  thisWeekClicks: number;
  lastWeekClicks: number;
  serviceBreakdown: { service: string; count: number }[];
  conversionRate: string;
  formCompletionRate: string;
  totalViews: number;
  totalSubmits: number;
  unreadCount: number;
}

// --------------- Constants ---------------

const SERVICE_LABELS: Record<string, string> = {
  construction: "Construction neuve",
  renovation: "Rénovation",
  extension: "Gros Œuvre",
  autre: "Autre",
};

const SERVICE_COLORS: Record<string, string> = {
  construction: "#E67E22",
  renovation: "#2C3E50",
  extension: "#27AE60",
  autre: "#95A5A6",
};

const TIMELINE_LABELS: Record<string, string> = {
  urgent: "Urgent (< 1 mois)",
  "3-mois": "Sous 3 mois",
  "6-mois": "Sous 6 mois",
  estimation: "Simple estimation",
};

// --------------- Charts ---------------

function AreaChart({
  data,
}: {
  data: { date: string; views: number; clicks: number }[];
}) {
  if (!data.length) return null;
  const maxVal = Math.max(...data.map((d) => d.views), 1);
  const W = 600;
  const H = 200;
  const px = W / (data.length - 1 || 1);

  function toPath(values: number[]) {
    const pts = values.map((v, i) => ({
      x: i * px,
      y: H - (v / maxVal) * (H - 20),
    }));
    if (pts.length < 2) return "";
    let d = `M${pts[0].x},${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const cp1x = pts[i - 1].x + px * 0.4;
      const cp1y = pts[i - 1].y;
      const cp2x = pts[i].x - px * 0.4;
      const cp2y = pts[i].y;
      d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${pts[i].x},${pts[i].y}`;
    }
    return d;
  }

  const viewsPath = toPath(data.map((d) => d.views));
  const clicksPath = toPath(data.map((d) => d.clicks));

  return (
    <svg viewBox={`0 0 ${W} ${H + 30}`} className="w-full">
      <defs>
        <linearGradient id="viewsFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E67E22" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#E67E22" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((r) => (
        <line
          key={r}
          x1="0"
          y1={H - r * (H - 20)}
          x2={W}
          y2={H - r * (H - 20)}
          stroke="#e5e7eb"
          strokeWidth="0.5"
          strokeDasharray="4"
        />
      ))}
      {/* Area fill */}
      <path
        d={`${viewsPath} L${W},${H} L0,${H} Z`}
        fill="url(#viewsFill)"
      />
      {/* Lines */}
      <path d={viewsPath} fill="none" stroke="#E67E22" strokeWidth="2" />
      <path
        d={clicksPath}
        fill="none"
        stroke="#2C3E50"
        strokeWidth="2"
        strokeDasharray="6"
      />
      {/* Dots */}
      {data.map((d, i) => (
        <circle
          key={i}
          cx={i * px}
          cy={H - (d.views / maxVal) * (H - 20)}
          r="3"
          fill="#E67E22"
        />
      ))}
      {/* X labels */}
      {data.map((d, i) =>
        i % 2 === 0 ? (
          <text
            key={i}
            x={i * px}
            y={H + 20}
            textAnchor="middle"
            fontSize="10"
            fill="#9CA3AF"
          >
            {new Date(d.date).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "short",
            })}
          </text>
        ) : null
      )}
    </svg>
  );
}

function DonutChart({
  data,
}: {
  data: { service: string; count: number }[];
}) {
  const total = data.reduce((s, d) => s + d.count, 0);
  if (!total) {
    return (
      <div className="text-center text-neutral-400 text-sm py-8">
        Aucune donnée
      </div>
    );
  }

  const R = 60;
  const CX = 80;
  const CY = 80;
  const circumference = 2 * Math.PI * R;
  let offset = 0;

  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 160 160" className="w-36 h-36 shrink-0">
        {data.map((d) => {
          const pct = d.count / total;
          const dash = pct * circumference;
          const thisOffset = offset;
          offset += dash;
          return (
            <circle
              key={d.service}
              cx={CX}
              cy={CY}
              r={R}
              fill="none"
              stroke={SERVICE_COLORS[d.service] || "#95A5A6"}
              strokeWidth="20"
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-thisOffset}
              transform={`rotate(-90 ${CX} ${CY})`}
            />
          );
        })}
        <text
          x={CX}
          y={CY - 6}
          textAnchor="middle"
          fontSize="22"
          fontWeight="700"
          fill="#2C3E50"
        >
          {total}
        </text>
        <text
          x={CX}
          y={CY + 12}
          textAnchor="middle"
          fontSize="10"
          fill="#9CA3AF"
        >
          demandes
        </text>
      </svg>
      <div className="space-y-2">
        {data.map((d) => (
          <div key={d.service} className="flex items-center gap-2 text-sm">
            <div
              className="w-3 h-3 rounded-full shrink-0"
              style={{
                backgroundColor: SERVICE_COLORS[d.service] || "#95A5A6",
              }}
            />
            <span className="text-neutral-600">
              {SERVICE_LABELS[d.service] || d.service}
            </span>
            <span className="text-neutral-400 ml-auto">{d.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BarRow({
  items,
  maxCount,
}: {
  items: { label: string; count: number }[];
  maxCount: number;
}) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.label}>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-neutral-600 truncate max-w-[200px]">
              {item.label}
            </span>
            <span className="text-neutral-400 shrink-0 ml-2">
              {item.count}
            </span>
          </div>
          <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent to-accent-300 rounded-full transition-all"
              style={{
                width: `${maxCount > 0 ? (item.count / maxCount) * 100 : 0}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function StatCard({
  label,
  value,
  prev,
  suffix,
}: {
  label: string;
  value: number | string;
  prev?: number;
  suffix?: string;
}) {
  const current = typeof value === "number" ? value : parseFloat(value);
  const trend =
    prev !== undefined && prev > 0
      ? (((current - prev) / prev) * 100).toFixed(0)
      : null;

  return (
    <div className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-sm">
      <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="text-2xl font-bold text-primary tracking-tight">
        {value}
        {suffix && (
          <span className="text-sm font-normal text-neutral-400 ml-1">
            {suffix}
          </span>
        )}
      </p>
      {trend !== null && (
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block ${
            Number(trend) >= 0
              ? "bg-green-50 text-green-600"
              : "bg-red-50 text-red-600"
          }`}
        >
          {Number(trend) >= 0 ? "+" : ""}
          {trend}%
        </span>
      )}
    </div>
  );
}

// --------------- Main Component ---------------

export function DashboardClient({ data }: { data: DashboardData }) {
  const router = useRouter();
  const [tab, setTab] = useState<"overview" | "submissions" | "analytics">(
    "overview"
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [submissions, setSubmissions] = useState(data.submissions);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  async function markRead(id: string) {
    await fetch("/api/admin/submissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, read: true } : s))
    );
  }

  async function deleteSub(id: string) {
    if (!confirm("Supprimer cette demande ?")) return;
    await fetch("/api/admin/submissions", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
  }

  const tabs = [
    { key: "overview" as const, label: "Vue d'ensemble", icon: "📊" },
    { key: "submissions" as const, label: "Demandes", icon: "📋" },
    { key: "analytics" as const, label: "Analytics", icon: "📈" },
  ];

  const unreadCount = submissions.filter((s) => !s.read).length;

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary-950 text-white transform transition-transform duration-300 lg:translate-x-0 lg:static ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-white/10">
          <h2 className="font-bold text-lg tracking-tight">
            B.C.M Construction
          </h2>
          <p className="text-white/40 text-xs mt-0.5">Administration</p>
        </div>

        <nav className="p-4 space-y-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => {
                setTab(t.key);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all cursor-pointer ${
                tab === t.key
                  ? "bg-white/10 text-white font-medium"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              <span>{t.icon}</span>
              {t.label}
              {t.key === "submissions" && unreadCount > 0 && (
                <span className="ml-auto bg-accent text-white text-xs px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/50 hover:text-white/80 hover:bg-white/5 transition-all cursor-pointer"
          >
            <span>🚪</span>
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-neutral-100 px-6 py-4 flex items-center gap-4 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 text-neutral-400 hover:text-neutral-600 cursor-pointer"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
          <div>
            <h1 className="text-lg font-bold text-primary tracking-tight">
              {tab === "overview" && "Vue d'ensemble"}
              {tab === "submissions" && "Demandes de devis"}
              {tab === "analytics" && "Analytics"}
            </h1>
            <p className="text-xs text-neutral-400">
              Bonjour Muammer — dernière mise à jour à l&apos;instant
            </p>
          </div>
          <button
            onClick={() => router.refresh()}
            className="ml-auto px-4 py-2 text-sm bg-neutral-50 hover:bg-neutral-100 rounded-xl text-neutral-600 transition-colors cursor-pointer"
          >
            ↻ Actualiser
          </button>
        </header>

        {/* Demo data banner */}
        <div className="mx-6 mt-4 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3 text-sm text-amber-700">
          <span className="text-lg">⚠️</span>
          <p>
            <strong>Mode démo</strong> — Les données affichées sont fictives et
            servent uniquement à illustrer le fonctionnement du tableau de bord.
          </p>
        </div>

        <div className="p-6 max-w-7xl">
          {/* ==================== OVERVIEW ==================== */}
          {tab === "overview" && (
            <div className="space-y-6">
              {/* Stat cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  label="Pages vues (7j)"
                  value={data.thisWeekViews}
                  prev={data.lastWeekViews}
                />
                <StatCard
                  label="Clics CTA (7j)"
                  value={data.thisWeekClicks}
                  prev={data.lastWeekClicks}
                />
                <StatCard
                  label="Taux conversion"
                  value={data.conversionRate}
                  suffix="%"
                />
                <StatCard
                  label="Demandes non lues"
                  value={unreadCount}
                />
              </div>

              {/* Chart */}
              <div className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-primary text-sm">
                    Trafic (14 derniers jours)
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-neutral-400">
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-0.5 bg-accent rounded" /> Pages
                      vues
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-0.5 bg-primary rounded border-dashed" />{" "}
                      Clics CTA
                    </span>
                  </div>
                </div>
                <AreaChart data={data.dailyViews} />
              </div>

              {/* Bottom grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Service breakdown */}
                <div className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm">
                  <h3 className="font-semibold text-primary text-sm mb-4">
                    Types de projets
                  </h3>
                  <DonutChart data={data.serviceBreakdown} />
                </div>

                {/* Top pages */}
                <div className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm">
                  <h3 className="font-semibold text-primary text-sm mb-4">
                    Pages les plus vues
                  </h3>
                  <BarRow
                    items={data.topPages.map((p) => ({
                      label: p.page,
                      count: p.count,
                    }))}
                    maxCount={data.topPages[0]?.count || 1}
                  />
                </div>

                {/* Top CTAs */}
                <div className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm">
                  <h3 className="font-semibold text-primary text-sm mb-4">
                    CTA les plus cliqués
                  </h3>
                  <BarRow
                    items={data.topCTAs.map((c) => ({
                      label: c.label,
                      count: c.count,
                    }))}
                    maxCount={data.topCTAs[0]?.count || 1}
                  />
                </div>
              </div>

              {/* Form funnel */}
              <div className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm">
                <h3 className="font-semibold text-primary text-sm mb-4">
                  Entonnoir formulaire
                </h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">
                      {data.totalViews}
                    </p>
                    <p className="text-xs text-neutral-400">Pages vues</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-accent">
                      {data.totalSubmits}
                    </p>
                    <p className="text-xs text-neutral-400">Soumissions</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">
                      {data.formCompletionRate}%
                    </p>
                    <p className="text-xs text-neutral-400">
                      Taux de complétion
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== SUBMISSIONS ==================== */}
          {tab === "submissions" && (
            <div className="space-y-4">
              {submissions.length === 0 ? (
                <div className="text-center py-16 text-neutral-400">
                  <p className="text-4xl mb-3">📋</p>
                  <p>Aucune demande de devis pour le moment.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {submissions.map((sub) => (
                    <div
                      key={sub.id}
                      className={`bg-white rounded-2xl border overflow-hidden transition-all ${
                        sub.read
                          ? "border-neutral-100"
                          : "border-accent/20 shadow-sm"
                      }`}
                    >
                      {/* Row header */}
                      <button
                        onClick={() =>
                          setExpandedRow(
                            expandedRow === sub.id ? null : sub.id
                          )
                        }
                        className="w-full flex items-center gap-4 px-6 py-4 text-left cursor-pointer hover:bg-neutral-50/50 transition-colors"
                      >
                        {!sub.read && (
                          <span className="w-2 h-2 bg-accent rounded-full shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-primary text-sm truncate">
                            {sub.fullName}
                          </p>
                          <p className="text-xs text-neutral-400">
                            {SERVICE_LABELS[sub.projectType] ||
                              sub.projectType}{" "}
                            — {sub.surface} m² —{" "}
                            {new Date(sub.createdAt).toLocaleDateString(
                              "fr-FR",
                              {
                                day: "numeric",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                        </div>
                        <svg
                          className={`w-4 h-4 text-neutral-400 transition-transform shrink-0 ${
                            expandedRow === sub.id ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>

                      {/* Expanded content */}
                      {expandedRow === sub.id && (
                        <div className="px-6 pb-5 border-t border-neutral-50">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm">
                            <div>
                              <span className="text-neutral-400">Projet :</span>{" "}
                              <span className="text-primary font-medium">
                                {SERVICE_LABELS[sub.projectType] ||
                                  sub.projectType}
                              </span>
                            </div>
                            <div>
                              <span className="text-neutral-400">
                                Surface :
                              </span>{" "}
                              <span className="text-primary font-medium">
                                {sub.surface} m²
                              </span>
                            </div>
                            <div>
                              <span className="text-neutral-400">Délai :</span>{" "}
                              <span className="text-primary font-medium">
                                {TIMELINE_LABELS[sub.timeline] || sub.timeline}
                              </span>
                            </div>
                            <div>
                              <span className="text-neutral-400">
                                Code postal :
                              </span>{" "}
                              <span className="text-primary font-medium">
                                {sub.postalCode}
                              </span>
                            </div>
                            <div>
                              <span className="text-neutral-400">Email :</span>{" "}
                              <a
                                href={`mailto:${sub.email}`}
                                className="text-accent hover:underline"
                              >
                                {sub.email}
                              </a>
                            </div>
                            <div>
                              <span className="text-neutral-400">Tél :</span>{" "}
                              <a
                                href={`tel:${sub.phone}`}
                                className="text-accent hover:underline"
                              >
                                {sub.phone}
                              </a>
                            </div>
                            {sub.message && (
                              <div className="sm:col-span-2">
                                <span className="text-neutral-400">
                                  Message :
                                </span>
                                <p className="text-primary mt-1 bg-neutral-50 rounded-lg p-3">
                                  {sub.message}
                                </p>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-neutral-50">
                            {!sub.read && (
                              <button
                                onClick={() => markRead(sub.id)}
                                className="px-4 py-2 text-xs bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors cursor-pointer"
                              >
                                Marquer comme lu
                              </button>
                            )}
                            <a
                              href={`mailto:${sub.email}?subject=Votre demande de devis - B.C.M Construction`}
                              className="px-4 py-2 text-xs bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                            >
                              Répondre par email
                            </a>
                            <a
                              href={`tel:${sub.phone}`}
                              className="px-4 py-2 text-xs bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                            >
                              Appeler
                            </a>
                            <button
                              onClick={() => deleteSub(sub.id)}
                              className="px-4 py-2 text-xs bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors ml-auto cursor-pointer"
                            >
                              Supprimer
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ==================== ANALYTICS ==================== */}
          {tab === "analytics" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  label="Total pages vues"
                  value={data.totalViews}
                />
                <StatCard
                  label="Total soumissions"
                  value={data.totalSubmits}
                />
                <StatCard
                  label="Taux conversion"
                  value={data.conversionRate}
                  suffix="%"
                />
                <StatCard
                  label="Taux complétion"
                  value={data.formCompletionRate}
                  suffix="%"
                />
              </div>

              {/* Chart */}
              <div className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm">
                <h3 className="font-semibold text-primary text-sm mb-4">
                  Trafic quotidien
                </h3>
                <AreaChart data={data.dailyViews} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top pages */}
                <div className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm">
                  <h3 className="font-semibold text-primary text-sm mb-4">
                    Pages les plus vues
                  </h3>
                  <BarRow
                    items={data.topPages.map((p) => ({
                      label: p.page,
                      count: p.count,
                    }))}
                    maxCount={data.topPages[0]?.count || 1}
                  />
                </div>

                {/* Top CTAs */}
                <div className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm">
                  <h3 className="font-semibold text-primary text-sm mb-4">
                    Clics CTA
                  </h3>
                  <BarRow
                    items={data.topCTAs.map((c) => ({
                      label: c.label,
                      count: c.count,
                    }))}
                    maxCount={data.topCTAs[0]?.count || 1}
                  />
                </div>
              </div>

              {/* Service breakdown */}
              <div className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm">
                <h3 className="font-semibold text-primary text-sm mb-4">
                  Répartition par type de projet
                </h3>
                <DonutChart data={data.serviceBreakdown} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
