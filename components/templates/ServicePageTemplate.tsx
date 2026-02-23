import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { CTABanner } from "@/components/sections/CTABanner";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { BeforeAfterSlider } from "@/components/sections/BeforeAfterSlider";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Home, Building2, Paintbrush, Wrench, CheckCircle } from "lucide-react";
import { portfolioItems } from "@/lib/data/portfolio";
import type { Service } from "@/lib/data/services";
import Link from "next/link";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Home,
  Building2,
  Paintbrush,
  Wrench,
};

interface ServicePageTemplateProps {
  service: Service;
}

export function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  const Icon = iconMap[service.icon] || Building2;
  const relatedProjects = portfolioItems.filter(
    (p) => p.category === service.id.split("-")[0] as string
  ).slice(0, 3);

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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link href="/" className="hover:text-white/80 transition-colors duration-300">Accueil</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white/80 transition-colors duration-300">Services</Link>
            <span>/</span>
            <span className="text-white/80">{service.title}</span>
          </nav>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/10">
              <Icon size={28} className="text-accent" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
              {service.title}
            </h1>
          </div>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl font-light leading-relaxed">
            {service.longDescription}
          </p>
          <div className="mt-10">
            <Button href="/contact" variant="accent" size="lg" className="shadow-accent-glow">
              Demander un devis gratuit
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <SectionWrapper>
        <ScrollReveal>
          <SectionTitle
            title="Ce que nous proposons"
            subtitle="Notre expertise couvre l'ensemble de vos besoins en nettoyage et ravalement."
          />
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {service.features.map((feature, i) => (
            <ScrollReveal key={feature.title} delay={i * 0.08}>
              <div className="flex gap-4 p-6 rounded-2xl bg-neutral-50/70 border border-neutral-100 hover:shadow-premium transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center border border-accent/10 shrink-0">
                  <CheckCircle size={18} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-primary mb-1 tracking-tight">{feature.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* Process */}
      <SectionWrapper background="neutral">
        <ScrollReveal>
          <SectionTitle
            title="Notre processus"
            subtitle="Un accompagnement structuré de A à Z pour votre projet."
          />
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <ProcessTimeline steps={service.process} />
        </ScrollReveal>
      </SectionWrapper>

      {/* Related projects */}
      {relatedProjects.length > 0 && (
        <SectionWrapper>
          <ScrollReveal>
            <SectionTitle
              title="Nos réalisations en images"
              subtitle="Découvrez nos projets récents dans ce domaine."
            />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProjects.map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 0.1}>
                <div>
                  <BeforeAfterSlider
                    beforeImage={item.imageBefore}
                    afterImage={item.imageAfter}
                    beforeAlt={`${item.title} — Avant`}
                    afterAlt={`${item.title} — Après`}
                  />
                  <h3 className="font-bold text-primary mt-4 mb-1 tracking-tight">{item.title}</h3>
                  <p className="text-sm text-neutral-400">{item.location} — {item.duration}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <div className="text-center mt-12">
              <Button href="/realisations" variant="outline">
                Voir toutes nos réalisations
              </Button>
            </div>
          </ScrollReveal>
        </SectionWrapper>
      )}

      {/* FAQ */}
      <SectionWrapper background="neutral">
        <ScrollReveal>
          <SectionTitle
            title="Questions fréquentes"
            subtitle={`Retrouvez les réponses aux questions les plus courantes sur nos services de ${service.title.toLowerCase()}.`}
          />
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <div className="max-w-3xl mx-auto">
            <FAQAccordion faqs={service.faqs} />
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* CTA */}
      <CTABanner
        title={`Prêt pour votre projet de ${service.title.toLowerCase()} ?`}
        subtitle="Contactez-nous dès maintenant pour un devis gratuit et personnalisé."
      />
    </>
  );
}
