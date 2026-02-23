import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { company } from "@/lib/data/company";
import { footerServices, footerLinks } from "@/lib/data/navigation";

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      {/* Main footer */}
      <div className="bg-primary-950 text-white">
        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Column 1: Company */}
            <div className="lg:col-span-1">
              <h3 className="font-heading text-xl font-extrabold mb-4 tracking-tight">{company.name}</h3>
              <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
                Spécialiste ravalement de façade, démoussage toiture et peinture à {company.address.city} et environs.
                Nettoyage, ravalement, peinture — Devis gratuit sous 48h.
              </p>
              <div className="flex flex-wrap gap-2">
                {company.certifications.map((cert) => (
                  <span
                    key={cert}
                    className="inline-block bg-white/5 text-xs px-3 py-1.5 rounded-lg border border-white/10 text-neutral-300"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Column 2: Services */}
            <div>
              <h4 className="font-heading text-xs font-bold uppercase tracking-widest mb-6 text-neutral-500">
                Nos services
              </h4>
              <ul className="space-y-3">
                {footerServices.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1 text-neutral-400 text-sm hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                      <ArrowUpRight size={12} className="opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Quick links */}
            <div>
              <h4 className="font-heading text-xs font-bold uppercase tracking-widest mb-6 text-neutral-500">
                Liens rapides
              </h4>
              <ul className="space-y-3">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1 text-neutral-400 text-sm hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                      <ArrowUpRight size={12} className="opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
              <h4 className="font-heading text-xs font-bold uppercase tracking-widest mb-6 text-neutral-500">
                Contact
              </h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href={`tel:${company.phoneRaw}`}
                    className="flex items-start gap-3 text-neutral-400 text-sm hover:text-accent transition-colors duration-300"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                      <Phone size={14} />
                    </div>
                    <span className="pt-1">{company.phone}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${company.email}`}
                    className="flex items-start gap-3 text-neutral-400 text-sm hover:text-accent transition-colors duration-300"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                      <Mail size={14} />
                    </div>
                    <span className="pt-1">{company.email}</span>
                  </a>
                </li>
                <li className="flex items-start gap-3 text-neutral-400 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin size={14} />
                  </div>
                  <span className="pt-1">
                    {company.address.street}<br />
                    {company.address.postalCode} {company.address.city}
                  </span>
                </li>
                <li className="flex items-start gap-3 text-neutral-400 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock size={14} />
                  </div>
                  <span className="pt-1">{company.hours}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-neutral-500 text-xs">
              &copy; {new Date().getFullYear()} {company.name}. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              <Link
                href="/mentions-legales"
                className="text-neutral-500 text-xs hover:text-neutral-300 transition-colors duration-300"
              >
                Mentions légales
              </Link>
              <a
                href="/admin/login"
                className="text-neutral-500 text-xs hover:text-neutral-300 transition-colors duration-300"
              >
                Admin
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
