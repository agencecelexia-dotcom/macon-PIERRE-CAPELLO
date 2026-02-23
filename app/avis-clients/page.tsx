import type { Metadata } from "next";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StarRating } from "@/components/ui/StarRating";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Quote, ExternalLink } from "lucide-react";
import { testimonials, aggregateRating } from "@/lib/data/testimonials";

export const metadata: Metadata = {
  title: "Avis Clients | Témoignages",
  description:
    "Découvrez les avis de nos clients satisfaits. Note moyenne de 4.8/5 sur Google. Témoignages vérifiés de nos chantiers de maçonnerie.",
};

export default function AvisClientsPage() {
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
            Avis de nos clients
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
            La satisfaction de nos clients est notre meilleure carte de visite.
            Découvrez leurs témoignages.
          </p>
        </div>
      </section>

      {/* Aggregate Rating */}
      <SectionWrapper>
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex flex-col items-center bg-white rounded-2xl px-12 py-10 shadow-premium border border-neutral-100">
              <p className="text-6xl font-extrabold text-primary mb-2 tracking-tight">
                {aggregateRating.average}
                <span className="text-2xl text-neutral-300 font-normal">/5</span>
              </p>
              <StarRating rating={aggregateRating.average} size={28} className="mb-3" />
              <p className="text-neutral-400 text-sm">
                {aggregateRating.count} avis Google
              </p>

              {/* Distribution bars */}
              <div className="mt-6 w-full max-w-xs space-y-2">
                {([5, 4, 3, 2, 1] as const).map((star) => {
                  const count = aggregateRating.distribution[star];
                  const percentage = (count / aggregateRating.count) * 100;
                  return (
                    <div key={star} className="flex items-center gap-3 text-sm">
                      <span className="w-3 text-neutral-400 font-medium">{star}</span>
                      <div className="flex-1 h-2 bg-neutral-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-accent to-accent-300 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="w-6 text-right text-neutral-400 text-xs">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Testimonials Grid */}
        <ScrollReveal>
          <SectionTitle
            title="Ce que disent nos clients"
            subtitle="Tous les avis proviennent de clients ayant réalisé des travaux avec nous."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <ScrollReveal key={testimonial.id} delay={i * 0.06}>
              <Card>
                <CardContent>
                  {/* Quote icon */}
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center mb-4 border border-accent/10">
                    <Quote size={12} className="text-accent" />
                  </div>

                  <blockquote className="text-neutral-600 text-sm leading-relaxed mb-4">
                    &ldquo;{testimonial.text}&rdquo;
                  </blockquote>

                  <StarRating rating={testimonial.rating} size={14} className="mb-4" />

                  <div className="h-px bg-neutral-100 mb-4" />

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center shrink-0">
                      <span className="text-primary font-bold text-xs">{testimonial.initials}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-primary">{testimonial.name}</p>
                      <p className="text-xs text-neutral-400">{testimonial.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-neutral-400 mt-3 pt-3 border-t border-neutral-50">
                    <span>{testimonial.projectType}</span>
                    <time dateTime={testimonial.date}>
                      {new Date(testimonial.date).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                      })}
                    </time>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA to leave a review */}
      <SectionWrapper background="neutral">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto">
            <div className="divider-accent mx-auto mb-8" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-primary mb-4 tracking-tight">
              Vous avez travaillé avec nous ?
            </h2>
            <p className="text-neutral-500 mb-8 leading-relaxed">
              Votre avis compte ! Partagez votre expérience sur Google pour aider
              d&apos;autres propriétaires à faire le bon choix.
            </p>
            <Button
              href="https://g.page/review"
              variant="accent"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
              className="shadow-accent-glow"
            >
              <ExternalLink size={18} className="mr-2" />
              Laisser un avis Google
            </Button>
          </div>
        </ScrollReveal>
      </SectionWrapper>
    </>
  );
}
