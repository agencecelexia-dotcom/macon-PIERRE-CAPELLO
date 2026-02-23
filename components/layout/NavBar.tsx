"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { navLinks } from "@/lib/data/navigation";
import { company } from "@/lib/data/company";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled || !isHome
          ? "glass border-b border-neutral-200/50 shadow-premium"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              "font-heading font-extrabold text-xl md:text-2xl transition-colors duration-300 tracking-tight",
              isScrolled || !isHome ? "text-primary" : "text-white"
            )}
          >
            {company.name}
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm font-medium transition-all duration-300 px-4 py-2 rounded-lg",
                  pathname === link.href
                    ? isScrolled || !isHome
                      ? "text-accent bg-accent/5"
                      : "text-accent"
                    : isScrolled || !isHome
                      ? "text-primary-600 hover:text-primary hover:bg-neutral-100"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${company.phoneRaw}`}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors duration-300",
                isScrolled || !isHome
                  ? "text-primary-600 hover:text-accent"
                  : "text-white/80 hover:text-white"
              )}
            >
              <Phone size={15} />
              {company.phone}
            </a>
            <Button href="/contact" variant="accent" size="sm" className="shadow-accent-glow">
              Devis gratuit
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "lg:hidden p-2 rounded-lg transition-all duration-300 cursor-pointer",
              isScrolled || !isHome
                ? "text-primary hover:bg-neutral-100"
                : "text-white hover:bg-white/10"
            )}
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden glass border-t border-neutral-200/50">
          <div className="px-4 py-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block text-base font-medium transition-colors rounded-lg px-4 py-3",
                  pathname === link.href
                    ? "text-accent bg-accent/5"
                    : "text-primary hover:bg-neutral-100"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-neutral-200/50 mt-4 space-y-3">
              <a
                href={`tel:${company.phoneRaw}`}
                className="flex items-center gap-2 text-primary font-medium px-4"
              >
                <Phone size={18} />
                {company.phone}
              </a>
              <Button href="/contact" variant="accent" size="md" className="w-full shadow-accent-glow">
                Demander un devis gratuit
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
