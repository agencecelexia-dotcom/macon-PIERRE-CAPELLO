"use client";

import { Button } from "@/components/ui/Button";
import { Phone, Star, ChevronDown } from "lucide-react";
import { company } from "@/lib/data/company";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  showBadges?: boolean;
}

export function HeroSection({
  title = `Votre spécialiste ravalement & nettoyage à ${company.address.city}`,
  subtitle = "Démoussage toiture, ravalement de façade, peinture — Devis gratuit sous 48h",
  showBadges = true,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-800 to-primary-700" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(230,126,34,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(44,62,80,0.4),transparent_60%)]" />

      {/* Grain texture */}
      <div className="absolute inset-0 grain overflow-hidden" />

      {/* Decorative grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating accent orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/6 w-64 h-64 bg-accent/5 rounded-full blur-2xl" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white pt-20">
        {/* Badge */}
        <div
          className="opacity-0"
          style={{ animation: "hero-in 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s forwards" }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm text-white/90 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            Spécialiste ravalement & nettoyage à Nantes et environs
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight opacity-0"
          style={{ animation: "hero-in 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s forwards" }}
        >
          {title.split(company.address.city).map((part, i, arr) =>
            i < arr.length - 1 ? (
              <span key={i}>
                {part}
                <span className="gradient-text">{company.address.city}</span>
              </span>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg sm:text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto font-light opacity-0"
          style={{ animation: "hero-in 0.6s cubic-bezier(0.16,1,0.3,1) 0.4s forwards" }}
        >
          {subtitle}
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16 opacity-0"
          style={{ animation: "hero-in 0.6s cubic-bezier(0.16,1,0.3,1) 0.5s forwards" }}
        >
          <Button href="/contact" variant="accent" size="lg" className="shadow-accent-glow" data-track="hero-devis">
            Demander un devis gratuit
          </Button>
          <Button
            href={`tel:${company.phoneRaw}`}
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:bg-white/10 hover:border-white/50"
            data-track="hero-appel"
          >
            <Phone size={20} className="mr-2" />
            Appelez-nous
          </Button>
        </div>

        {/* Trust badges */}
        {showBadges && (
          <div
            className="flex flex-wrap justify-center gap-4 md:gap-8 opacity-0"
            style={{ animation: "hero-in 0.6s cubic-bezier(0.16,1,0.3,1) 0.7s forwards" }}
          >
            {[
              { label: "Produits professionnels" },
              { label: "Garantie satisfaction" },
              { label: `${company.googleRating}/5 — ${company.googleReviewCount} avis`, icon: true },
            ].map((badge) => (
              <span
                key={badge.label}
                className="flex items-center gap-2 text-sm text-white/60 px-4 py-2 rounded-full border border-white/10 bg-white/5"
              >
                {badge.icon ? (
                  <Star size={14} className="fill-accent text-accent" />
                ) : (
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                )}
                {badge.label}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 opacity-0"
        style={{ animation: "fade-in 0.6s ease 1.2s forwards" }}
      >
        <div style={{ animation: "bounce-down 2s ease-in-out infinite" }}>
          <ChevronDown size={24} className="text-white/30" />
        </div>
      </div>
    </section>
  );
}
