"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { company } from "@/lib/data/company";

export function ClickToCall() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  return (
    <a
      href={`tel:${company.phoneRaw}`}
      className={`fixed bottom-6 right-6 z-40 md:hidden w-14 h-14 bg-accent text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-accent-600 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
      aria-label={`Appeler ${company.phone}`}
    >
      <Phone size={24} />
    </a>
  );
}
