import type { Metadata } from "next";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { CTABanner } from "@/components/sections/CTABanner";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Nos Services de Ravalement & Nettoyage",
  description:
    "Découvrez nos services de ravalement de façade, démoussage de toiture et peinture à Nantes et Loire-Atlantique. Artisan qualifié, produits professionnels. Devis gratuit sous 48h.",
};

export default function ServicesPage() {
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
            Nos services de nettoyage & ravalement
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
            Du démoussage de toiture au ravalement de façade en passant par la peinture,
            nous réalisons tous vos projets de nettoyage et rénovation avec expertise.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <SectionWrapper>
        <ScrollReveal>
          <SectionTitle
            title="Nos prestations"
            subtitle="Chaque projet est unique. Nous adaptons nos interventions à vos besoins spécifiques."
          />
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <ScrollReveal key={service.id} delay={i * 0.1}>
              <ServiceCard service={service} />
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      <CTABanner />
    </>
  );
}
