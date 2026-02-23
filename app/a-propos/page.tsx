import type { Metadata } from "next";
import Image from "next/image";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CTABanner } from "@/components/sections/CTABanner";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { company } from "@/lib/data/company";
import {
  Shield,
  Users,
  Eye,
  ThumbsUp,
  Award,
  CheckCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "À Propos | Ravalement Nettoyage Capello — Ravalement & Nettoyage",
  description: `Découvrez ${company.name}, entreprise de ravalement, nettoyage et peinture fondée en ${company.yearFounded} à Nantes. ${company.yearsExperience} ans d'expérience, ${company.projectsCompleted}+ projets réalisés. Qualité, proximité et transparence.`,
};

const values = [
  {
    icon: CheckCircle,
    title: "Qualité",
    description:
      "Nous utilisons exclusivement des produits professionnels (Dalep, Algimouss, Zolpan) et appliquons les techniques les plus rigoureuses pour garantir la durabilité de chaque intervention.",
  },
  {
    icon: Users,
    title: "Proximité",
    description:
      "Artisan local basé à Nantes, nous connaissons parfaitement les spécificités climatiques de la Loire-Atlantique et restons disponibles et réactifs pour chaque client.",
  },
  {
    icon: Eye,
    title: "Transparence",
    description:
      "Devis détaillés, suivi de chantier régulier, communication claire. Pas de mauvaise surprise, vous savez exactement où en est votre projet.",
  },
  {
    icon: ThumbsUp,
    title: "Fiabilité",
    description:
      "Respect des délais, des engagements et du budget. Notre réputation repose sur la confiance que nos clients nous accordent.",
  },
];

const certifications = [
  {
    icon: Shield,
    title: "Assurance RC Pro",
    description:
      "Responsabilité civile professionnelle couvrant l'ensemble de nos interventions sur vos chantiers.",
  },
  {
    icon: Award,
    title: "Chambre des Métiers",
    description:
      "Entreprise immatriculée à la Chambre des Métiers et de l'Artisanat, garantie de notre statut d'artisan qualifié.",
  },
];

const teamMembers = [
  {
    name: "Pierre Capello",
    role: "Fondateur & Gérant",
    description:
      "Expert en ravalement, nettoyage et peinture depuis plus de 15 ans. Passionné par la rénovation et le travail bien fait, Pierre dirige chaque chantier avec rigueur et exigence.",
  },
  {
    name: "Équipe Nettoyage",
    role: "Spécialistes Toiture",
    description:
      "Une équipe de professionnels expérimentés spécialisés dans le démoussage, le nettoyage haute pression et le traitement hydrofuge des toitures.",
  },
  {
    name: "Équipe Ravalement",
    role: "Spécialistes Façade",
    description:
      "Des professionnels maîtrisant les techniques de ravalement de façade, nettoyage et peinture extérieure adaptées au climat de la Loire-Atlantique.",
  },
];

export default function AProposPage() {
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
            À propos de {company.name}
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
            Une entreprise de ravalement, nettoyage et peinture fondée sur l&apos;excellence, la
            proximité et la confiance depuis {company.yearFounded}.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <SectionTitle
              title="Notre histoire"
              subtitle="L'expertise du ravalement et du nettoyage au service de vos projets."
              align="left"
            />
            <div className="space-y-4 text-neutral-600 leading-relaxed">
              <p>
                Fondée en <strong>{company.yearFounded}</strong> par Pierre Capello,{" "}
                {company.name} est née de la passion d&apos;un artisan pour le
                métier du ravalement et du nettoyage. Depuis plus de{" "}
                <strong>{company.yearsExperience} ans</strong>, nous mettons
                notre savoir-faire en ravalement, nettoyage et peinture au service des particuliers et des
                professionnels de la région {company.address.region}.
              </p>
              <p>
                Basés à Nantes, nous intervenons en Loire-Atlantique, en Vendée
                et dans le Calvados. Notre mission : redonner vie à vos façades et toitures
                avec la plus grande exigence de qualité,
                tout en respectant vos délais et votre budget.
              </p>
              <p>
                Avec plus de{" "}
                <strong>{company.projectsCompleted} projets réalisés</strong> et{" "}
                <strong>{company.clientsSatisfied} clients satisfaits</strong>,
                notre réputation s&apos;est construite sur la confiance et le
                bouche-à-oreille. Nous en sommes fiers.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.15}>
            <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-premium">
              <Image
                src="/images/about/equipe.jpg"
                alt="L'équipe Ravalement Nettoyage Capello sur chantier"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      {/* Values */}
      <SectionWrapper background="neutral">
        <ScrollReveal>
          <SectionTitle
            title="Nos valeurs"
            subtitle="Les principes qui guident chacune de nos interventions."
          />
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, i) => (
            <ScrollReveal key={value.title} delay={i * 0.08}>
              <div className="bg-white rounded-2xl p-6 text-center shadow-premium border border-neutral-100 hover:shadow-premium-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 text-accent flex items-center justify-center mx-auto mb-4 border border-accent/10">
                  <value.icon size={24} />
                </div>
                <h3 className="font-bold text-primary text-lg mb-2 tracking-tight">
                  {value.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* Team */}
      <SectionWrapper>
        <ScrollReveal>
          <SectionTitle
            title="Notre équipe"
            subtitle="Des professionnels passionnés à votre service."
          />
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, i) => (
            <ScrollReveal key={member.name} delay={i * 0.1}>
              <div className="text-center">
                {/* Photo placeholder */}
                <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 border-2 border-primary/5 mx-auto mb-5 flex items-center justify-center text-primary-300 shadow-premium">
                  <Users size={36} />
                </div>
                <h3 className="font-bold text-primary text-lg tracking-tight">{member.name}</h3>
                <p className="text-accent font-semibold text-sm mb-2">
                  {member.role}
                </p>
                <p className="text-sm text-neutral-500 max-w-xs mx-auto leading-relaxed">
                  {member.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* Certifications */}
      <SectionWrapper background="neutral">
        <ScrollReveal>
          <SectionTitle
            title="Nos certifications"
            subtitle="Des qualifications reconnues pour votre tranquillité d'esprit."
          />
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {certifications.map((cert, i) => (
            <ScrollReveal key={cert.title} delay={i * 0.1}>
              <div className="bg-white rounded-2xl p-8 text-center shadow-premium border border-neutral-100 hover:shadow-premium-lg transition-shadow duration-300">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary flex items-center justify-center mx-auto mb-4 border border-primary/10">
                  <cert.icon size={28} />
                </div>
                <h3 className="font-bold text-primary text-lg mb-2 tracking-tight">
                  {cert.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {cert.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <CTABanner
        title="Envie de travailler avec nous ?"
        subtitle="Contactez-nous pour discuter de votre projet. Devis gratuit et sans engagement."
      />
    </>
  );
}
