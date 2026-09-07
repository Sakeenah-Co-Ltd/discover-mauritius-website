import { site } from "@/content/site";
import type { Product, Faq, Service } from "@/lib/types";

const abs = (path: string) => (path.startsWith("http") ? path : `${site.url}${path}`);

/** Sitewide TravelAgency / LocalBusiness (brief §12). Expanded in Phase 6. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    email: site.email,
    telephone: [site.phoneHref, site.phoneAltHref],
    foundingDate: site.foundedISO,
    description: site.oneLiner,
    slogan: site.tagline,
    areaServed: { "@type": "Country", name: "Mauritius" },
    address: {
      "@type": "PostalAddress",
      addressCountry: "MU",
      addressLocality: "Mauritius",
    },
    sameAs: [site.facebookUrl],
  };
}

/** WebSite node (brief §12). */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { "@id": `${site.url}/#organization` },
    inLanguage: "en",
  };
}

/** BreadcrumbList (brief §12). */
export function breadcrumbSchema(items: { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: abs(item.href),
    })),
  };
}

/**
 * TouristTrip + Product/Offer for a tour page (brief §12).
 * NOTE: `price` is an indicative placeholder until real pricing lands (Pending #2/#11).
 */
export function tourSchema(product: Product) {
  const url = abs(`/tours/${product.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${url}#trip`,
    name: product.title,
    description: product.summary,
    url,
    touristType: product.tags,
    provider: { "@id": `${site.url}/#organization` },
    itinerary: {
      "@type": "ItemList",
      itemListElement: product.itinerary.map((stop, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: stop.title,
        description: stop.description,
      })),
    },
    offers: {
      "@type": "Offer",
      price: product.fromPrice,
      priceCurrency: product.currency,
      availability: "https://schema.org/InStock",
      url: abs(`/contact?service=${product.productType}&item=${product.slug}`),
      description: "Indicative starting price — every trip is quoted individually.",
    },
  };
}

/** FAQPage (brief §12). */
export function faqSchema(items: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** Service node for a service landing page (brief §12). */
export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    serviceType: service.name,
    url: abs(service.href),
    areaServed: { "@type": "Country", name: "Mauritius" },
    provider: { "@id": `${site.url}/#organization` },
  };
}
