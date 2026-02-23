import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Badge } from "@/components/ui/Badge";
import { CTABanner } from "@/components/sections/CTABanner";
import { blogPosts } from "@/lib/data/blog-posts";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Article non trouvé" };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-br from-primary-800 to-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-white/20 text-white border-none mb-4">
            {post.category}
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-6 text-sm text-white/70">
            <span className="flex items-center gap-1.5">
              <Calendar size={16} />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={16} />
              {post.readingTime} min de lecture
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <SectionWrapper>
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Button href="/blog" variant="ghost" size="sm">
              <ArrowLeft size={16} className="mr-2" />
              Retour au blog
            </Button>
          </div>

          <article className="prose prose-lg prose-neutral max-w-none prose-headings:text-primary prose-a:text-accent hover:prose-a:text-accent-600 prose-strong:text-primary">
            <Markdown>{post.content}</Markdown>
          </article>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <CTABanner
        title="Un projet en tête ?"
        subtitle="Contactez-nous pour un devis gratuit et personnalisé. Nous répondons sous 48h."
      />
    </>
  );
}
