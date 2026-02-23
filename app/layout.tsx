import type { Metadata } from "next";
import { montserrat, inter } from "./fonts";
import "./globals.css";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { ClickToCall } from "@/components/ui/ClickToCall";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { AnalyticsTracker } from "@/components/features/AnalyticsTracker";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ravalement-nettoyage-capello.com"),
  title: {
    default: "Ravalement Nettoyage Capello | Démoussage & Nettoyage à Nantes",
    template: "%s | Ravalement Nettoyage Capello",
  },
  description:
    "Spécialiste du ravalement de façade, démoussage de toiture et peinture à Nantes et Loire-Atlantique. Devis gratuit sous 48h. Produits professionnels Dalep, Zolpan.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Ravalement Nettoyage Capello",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="antialiased">
        <JsonLdScript />
        <NavBar />
        <main>{children}</main>
        <Footer />
        <ClickToCall />
        <CookieConsent />
        <AnalyticsTracker />
      </body>
    </html>
  );
}
