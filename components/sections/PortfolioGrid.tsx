"use client";

import { useState } from "react";
import { BeforeAfterSlider } from "@/components/sections/BeforeAfterSlider";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import {
  portfolioItems,
  portfolioCategories,
  type PortfolioCategory,
} from "@/lib/data/portfolio";
import { MapPin, Clock, Maximize } from "lucide-react";

export function PortfolioGrid() {
  const [activeFilter, setActiveFilter] = useState<PortfolioCategory | "all">(
    "all"
  );

  const filteredItems =
    activeFilter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  const categoryLabels: Record<PortfolioCategory, string> = {
    demoussage: "Démoussage Toiture",
    ravalement: "Ravalement Façade",
    peinture: "Peinture",
  };

  return (
    <>
      {/* Filter tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {portfolioCategories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveFilter(cat.value)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeFilter === cat.value
                ? "bg-accent text-white shadow-md"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <Card key={item.id}>
            <BeforeAfterSlider
              beforeImage={item.imageBefore}
              afterImage={item.imageAfter}
              beforeAlt={`${item.title} — Avant`}
              afterAlt={`${item.title} — Après`}
            />
            <CardContent>
              <div className="flex items-center justify-between mb-3">
                <Badge>{categoryLabels[item.category]}</Badge>
                <span className="text-xs text-neutral-400">{item.year}</span>
              </div>
              <h3 className="font-bold text-primary text-lg mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-neutral-500 mb-4 line-clamp-2">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-4 text-xs text-neutral-400">
                <span className="flex items-center gap-1">
                  <MapPin size={14} />
                  {item.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {item.duration}
                </span>
                {item.surface && (
                  <span className="flex items-center gap-1">
                    <Maximize size={14} />
                    {item.surface}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <p className="text-center text-neutral-400 py-12">
          Aucun projet dans cette catégorie pour le moment.
        </p>
      )}
    </>
  );
}
