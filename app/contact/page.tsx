import type { Metadata } from "next";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Phone, Mail, MapPin, Clock, Shield, Award } from "lucide-react";
import { company } from "@/lib/data/company";

export const metadata: Metadata = {
  title: "Devis Gratuit | Contactez-nous",
  description:
    "Demandez votre devis gratuit pour vos travaux de nettoyage et ravalement. Réponse sous 48h. Appelez-nous ou remplissez le formulaire en ligne.",
};

export default function ContactPage() {
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
            Demandez votre devis gratuit
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
            Remplissez le formulaire ci-dessous et recevez une réponse personnalisée sous 48h.
          </p>
        </div>
      </section>

      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Formulaire multi-étapes */}
          <ScrollReveal className="lg:col-span-3" direction="left">
            <QuoteForm />
          </ScrollReveal>

          {/* Contact info */}
          <ScrollReveal className="lg:col-span-2 space-y-8" direction="right" delay={0.15}>
            <div>
              <h3 className="font-bold text-primary mb-5 tracking-tight">Nos coordonnées</h3>
              <ul className="space-y-4">
                <li>
                  <a href={`tel:${company.phoneRaw}`} className="flex items-start gap-3 text-neutral-600 hover:text-accent transition-colors duration-300">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center border border-accent/10 shrink-0">
                      <Phone size={16} className="text-accent" />
                    </div>
                    <div className="pt-1">
                      <p className="font-medium">{company.phone}</p>
                      <p className="text-sm text-neutral-400">Lun-Ven 8h-18h</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${company.email}`} className="flex items-start gap-3 text-neutral-600 hover:text-accent transition-colors duration-300">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center border border-accent/10 shrink-0">
                      <Mail size={16} className="text-accent" />
                    </div>
                    <span className="pt-2.5">{company.email}</span>
                  </a>
                </li>
                <li className="flex items-start gap-3 text-neutral-600">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center border border-accent/10 shrink-0">
                    <MapPin size={16} className="text-accent" />
                  </div>
                  <span className="pt-2.5">
                    {company.address.street}<br />
                    {company.address.postalCode} {company.address.city}
                  </span>
                </li>
                <li className="flex items-start gap-3 text-neutral-600">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center border border-accent/10 shrink-0">
                    <Clock size={16} className="text-accent" />
                  </div>
                  <span className="pt-2.5">{company.hours}</span>
                </li>
              </ul>
            </div>

            <div className="h-px bg-neutral-100" />

            <div>
              <h3 className="font-bold text-primary mb-5 tracking-tight">Nos garanties</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center border border-accent/10 shrink-0">
                    <Shield size={14} className="text-accent" />
                  </div>
                  <span>Assurance décennale</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center border border-accent/10 shrink-0">
                    <Award size={14} className="text-accent" />
                  </div>
                  <span>{company.yearsExperience}+ ans d&apos;expérience</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center border border-accent/10 shrink-0">
                    <Clock size={14} className="text-accent" />
                  </div>
                  <span>Réponse garantie sous 48h</span>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="aspect-[4/3] bg-neutral-50 rounded-2xl flex items-center justify-center text-neutral-400 text-sm border border-neutral-100 shadow-premium">
              Carte Google Maps (à intégrer)
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>
    </>
  );
}
