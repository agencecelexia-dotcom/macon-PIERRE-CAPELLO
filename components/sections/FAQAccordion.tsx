"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FAQ } from "@/lib/data/services";

interface FAQAccordionProps {
  faqs: FAQ[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className={cn(
            "bg-white border rounded-2xl overflow-hidden transition-all duration-300",
            openIndex === i
              ? "border-accent/20 shadow-premium"
              : "border-neutral-100 shadow-sm hover:shadow-premium"
          )}
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
          >
            <span className="font-semibold text-primary pr-4 tracking-tight">{faq.question}</span>
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300",
              openIndex === i
                ? "bg-accent/10 text-accent rotate-180"
                : "bg-neutral-50 text-neutral-400"
            )}>
              <ChevronDown size={16} />
            </div>
          </button>
          <div
            className={cn(
              "grid transition-all duration-300",
              openIndex === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            )}
          >
            <div className="overflow-hidden">
              <div className="px-6 pb-5 text-neutral-500 text-sm leading-relaxed">
                {faq.answer}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
