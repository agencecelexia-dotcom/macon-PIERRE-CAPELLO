import { company } from "@/lib/data/company";

export function JsonLdScript() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: company.name,
    telephone: company.phoneRaw,
    email: company.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      addressLocality: company.address.city,
      postalCode: company.address.postalCode,
      addressRegion: company.address.region,
      addressCountry: company.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: company.coordinates.lat,
      longitude: company.coordinates.lng,
    },
    openingHoursSpecification: company.hoursStructured.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    priceRange: "$$",
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: company.coordinates.lat,
        longitude: company.coordinates.lng,
      },
      geoRadius: "50000",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: company.googleRating,
      reviewCount: company.googleReviewCount,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
