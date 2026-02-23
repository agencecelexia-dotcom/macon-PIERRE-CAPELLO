"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const consent = document.cookie
      .split("; ")
      .find((row) => row.startsWith("cookie-consent="));
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  if (pathname.startsWith("/admin")) return null;

  const handleConsent = (value: "accepted" | "rejected") => {
    setIsVisible(false);
    document.cookie = `cookie-consent=${value}; max-age=${13 * 30 * 24 * 60 * 60}; path=/; SameSite=Lax`;

    if (value === "accepted") {
      // GA4 will be loaded dynamically here
      const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
      if (gaId) {
        const script = document.createElement("script");
        script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        script.async = true;
        document.head.appendChild(script);
        script.onload = () => {
          window.dataLayer = window.dataLayer || [];
          function gtag(...args: unknown[]) {
            window.dataLayer.push(args);
          }
          gtag("js", new Date());
          gtag("config", gaId);
        };
      }
    }
  };

  if (!isVisible) return null;

  return (
    <div className="sticky bottom-0 z-50 bg-white border-t border-neutral-200 p-4 md:p-6 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-4">
        <p className="text-sm text-neutral-600 flex-1">
          Nous utilisons des cookies pour analyser le trafic de notre site.{" "}
          <Link href="/mentions-legales" className="underline hover:text-primary">
            En savoir plus
          </Link>
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => handleConsent("rejected")}
            className="px-6 py-2 border border-neutral-300 rounded-lg text-sm font-medium hover:bg-neutral-50 transition-colors cursor-pointer"
          >
            Refuser
          </button>
          <button
            onClick={() => handleConsent("accepted")}
            className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors cursor-pointer"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}
