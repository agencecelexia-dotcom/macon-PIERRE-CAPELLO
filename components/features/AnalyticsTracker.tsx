"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function track(type: string, label?: string) {
  fetch("/api/analytics/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, page: window.location.pathname, label }),
  }).catch(() => {});
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const prev = useRef(pathname);

  // Track page views on route change
  useEffect(() => {
    if (pathname !== prev.current) {
      prev.current = pathname;
    }
    // Skip admin pages
    if (pathname.startsWith("/admin")) return;
    track("page_view");
  }, [pathname]);

  // Track CTA clicks via data-track attribute
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-track]");
      if (el) {
        track("cta_click", el.dataset.track);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
