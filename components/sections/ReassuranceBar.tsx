"use client";

import { Shield, Clock, Users, Award } from "lucide-react";
import { company } from "@/lib/data/company";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const items = [
  {
    icon: Award,
    label: `+ de ${company.yearsExperience} ans d'expérience`,
    sublabel: "Depuis 2018",
  },
  {
    icon: Shield,
    label: "Assurance décennale",
    sublabel: "Garantie 10 ans",
  },
  {
    icon: Clock,
    label: "Devis gratuit 48h",
    sublabel: "Sans engagement",
  },
  {
    icon: Users,
    label: `${company.clientsSatisfied}+ clients`,
    sublabel: "Satisfaits",
  },
];

export function ReassuranceBar() {
  return (
    <section className="relative py-8 md:py-6 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {items.map((item, i) => (
            <ScrollReveal key={item.label} delay={i * 0.1}>
              <div className="flex items-center gap-4 justify-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center border border-accent/10 shrink-0">
                  <item.icon size={22} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm font-bold text-primary leading-tight">{item.label}</p>
                  <p className="text-xs text-neutral-400 mt-0.5">{item.sublabel}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
