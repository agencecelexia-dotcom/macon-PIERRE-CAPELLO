"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/data/testimonials";
import { StarRating } from "@/components/ui/StarRating";

export function TestimonialCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 370;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {/* Scroll buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 hidden md:flex w-11 h-11 bg-white shadow-premium rounded-xl items-center justify-center hover:shadow-premium-lg hover:scale-105 transition-all duration-300 cursor-pointer border border-neutral-100"
        aria-label="Avis précédent"
      >
        <ChevronLeft size={18} className="text-primary" />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 hidden md:flex w-11 h-11 bg-white shadow-premium rounded-xl items-center justify-center hover:shadow-premium-lg hover:scale-105 transition-all duration-300 cursor-pointer border border-neutral-100"
        aria-label="Avis suivant"
      >
        <ChevronRight size={18} className="text-primary" />
      </button>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-4 -mx-4 px-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="min-w-[320px] max-w-[360px] snap-start shrink-0 bg-white rounded-2xl shadow-premium border border-neutral-200/60 p-6 transition-all duration-300 hover:shadow-premium-lg"
          >
            {/* Quote icon */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center mb-4 border border-accent/10">
              <Quote size={16} className="text-accent" />
            </div>

            {/* Text */}
            <p className="text-sm text-neutral-600 leading-relaxed line-clamp-4 mb-5">
              &ldquo;{t.text}&rdquo;
            </p>

            {/* Rating */}
            <StarRating rating={t.rating} size={14} className="mb-4" />

            {/* Divider */}
            <div className="h-px bg-neutral-100 mb-4" />

            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-xs">{t.initials}</span>
              </div>
              <div>
                <p className="font-semibold text-sm text-primary">{t.name}</p>
                <p className="text-xs text-neutral-400">{t.location} — {t.projectType}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
