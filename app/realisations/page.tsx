import type { Metadata } from "next";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Nos Réalisations | Photos Avant/Après",
  description:
    "Découvrez nos réalisations en ravalement et nettoyage : démoussage toiture, ravalement façade, peinture. Photos avant/après de nos chantiers récents.",
};

export default function RealisationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-800 to-primary-700" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(230,126,34,0.12),transparent_60%)]" />
        <div className="absolute inset-0 grain overflow-hidden" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 tracking-tight">
            Nos réalisations
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
            Découvrez nos chantiers récents et la qualité de notre travail à
            travers nos photos avant/après.
          </p>
        </div>
      </section>

      {/* Portfolio Grid with Filters */}
      <SectionWrapper>
        <ScrollReveal>
          <PortfolioGrid />
        </ScrollReveal>
      </SectionWrapper>
    </>
  );
}
