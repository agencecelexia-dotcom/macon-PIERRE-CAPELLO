import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { blogPosts } from "@/lib/data/blog-posts";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog Ravalement & Nettoyage | Conseils, Prix & Guides",
  description:
    "Retrouvez nos articles et guides sur le ravalement et le nettoyage : prix démoussage, entretien toiture, produits professionnels, aides financières.",
};

export default function BlogPage() {
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
            Notre blog
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
            Conseils, guides pratiques et actualités du ravalement et nettoyage pour vous
            aider dans vos projets d&apos;entretien et rénovation.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <SectionWrapper>
        <ScrollReveal>
          <SectionTitle
            title="Nos derniers articles"
            subtitle="Guides, conseils et informations utiles pour vos projets."
          />
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 0.1}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <Card className="h-full">
                  {/* Image */}
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <CardContent>
                    <div className="flex items-center gap-3 mb-3">
                      <Badge>{post.category}</Badge>
                    </div>
                    <h2 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-300 tracking-tight">
                      {post.title}
                    </h2>
                    <p className="text-neutral-500 text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-neutral-400">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString("fr-FR", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </time>
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {post.readingTime} min
                        </span>
                      </div>
                      <ArrowRight size={16} className="text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
