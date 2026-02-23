import Link from "next/link";
import Image from "next/image";
import { Building2, Hammer, Maximize2, Wrench } from "lucide-react";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/lib/data/services";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Building2,
  Hammer,
  Maximize2,
  Wrench,
};

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || Building2;

  return (
    <Link href={`/${service.slug}`} className="group block h-full">
      <div className="h-full bg-white rounded-2xl shadow-premium border border-neutral-200/60 overflow-hidden transition-all duration-500 hover:shadow-premium-lg hover:-translate-y-2">
        {/* Image */}
        <div className="aspect-[16/10] relative overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 pt-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl flex items-center justify-center border border-accent/10">
              <Icon size={18} className="text-accent" />
            </div>
            <h3 className="text-lg font-bold text-primary tracking-tight">{service.title}</h3>
          </div>
          <p className="text-neutral-500 text-sm mb-5 line-clamp-2 leading-relaxed">
            {service.shortDescription}
          </p>
          <span className="inline-flex items-center gap-1.5 text-accent text-sm font-semibold group-hover:gap-3 transition-all duration-300">
            En savoir plus <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
