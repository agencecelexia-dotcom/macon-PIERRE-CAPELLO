"use client";

import { Button } from "@/components/ui/Button";
import { Phone, ArrowRight } from "lucide-react";
import { company } from "@/lib/data/company";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface CTABannerProps {
  title?: string;
  subtitle?: string;
}

export function CTABanner({
  title = "Prêt à lancer votre projet ?",
  subtitle = "Contactez-nous dès maintenant pour un devis gratuit et personnalisé. Réponse sous 48h garantie.",
}: CTABannerProps) {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-800 to-primary-700" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(230,126,34,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(230,126,34,0.08),transparent_50%)]" />

      {/* Grain texture */}
      <div className="absolute inset-0 grain overflow-hidden" />

      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-1/3 right-1/6 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-accent/5 rounded-full blur-2xl" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
        <ScrollReveal>
          <div className="divider-accent mx-auto mb-8" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-5 tracking-tight">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-white/60 mb-12 max-w-xl mx-auto font-light leading-relaxed">
            {subtitle}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="accent" size="lg" className="shadow-accent-glow" data-track="cta-devis">
              Demander un devis gratuit
              <ArrowRight size={18} className="ml-2" />
            </Button>
            <Button
              href={`tel:${company.phoneRaw}`}
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10 hover:border-white/40"
              data-track="cta-appel"
            >
              <Phone size={18} className="mr-2" />
              {company.phone}
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
