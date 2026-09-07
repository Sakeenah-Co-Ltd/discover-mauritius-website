import type { IconName } from "@/lib/types";

/**
 * Single source of truth for business facts. All client-supplied and verbatim
 * from the discovery brief — do NOT invent awards, review counts, or claims.
 */
export const site = {
  name: "Discover Mauritius",
  legalName: "N.K. TAHER CO LTD",
  tagline: "Easy. Trusted. Affordable.",
  oneLiner:
    "We help visitors discover and enjoy Mauritius with authentic experiences, customized tours, and complete travel solutions — without the hassle of complicated planning.",
  founded: "26 April 2019",
  foundedISO: "2019-04-26",
  director: "Nadiim Taher",

  email: "info@nktahercoltd.com",

  // Numbers corrected by the client 7 Sep 2026, replacing the single
  // discovery-brief number. The first line is primary (and the WhatsApp line).
  phoneDisplay: "+230 5941 4025",
  phoneHref: "+23059414025",
  phoneAltDisplay: "+230 5757 4530",
  phoneAltHref: "+23057574530",

  whatsappNumber: "23059414025",
  whatsappUrl: "https://wa.me/23059414025",
  whatsappMessage: "Hello! I'd like to plan a Mauritius trip…",

  // PENDING #: exact Facebook page URL not supplied — page name is
  // "Mauritius Tours with NK Taher". Functional search link until confirmed.
  facebookLabel: "Mauritius Tours with NK Taher",
  facebookUrl:
    "https://www.facebook.com/search/top?q=Mauritius%20Tours%20with%20NK%20Taher",

  // Domain settled (GoDaddy-registered, Cloudflare DNS). The apex is canonical;
  // www 308s to it. NEXT_PUBLIC_SITE_URL still wins so previews can override.
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://discover-mauritius.com",

  // PENDING: precise street address not in brief — needed for LocalBusiness schema
  // and the contact map. Country is safe; street is a placeholder.
  address: {
    street: "[Office address — to be supplied]",
    locality: "Mauritius",
    country: "Mauritius",
    countryCode: "MU",
  },

  defaultCurrency: "USD", // the operator quotes in USD (tour + transfer PDFs, 25 Aug 2026)
} as const;

export interface TrustBadge {
  label: string;
  icon: IconName;
  detail: string;
}

/** Used under the hero and in the footer (brief §10). */
export const trustBadges: TrustBadge[] = [
  {
    label: "Licensed Tour Operator",
    icon: "shield",
    detail: "A licensed travel operator in Mauritius.",
  },
  {
    label: "IATA Accredited",
    icon: "iata",
    detail: "IATA-accredited travel agency for air ticketing.",
  },
  {
    label: "Established 2019",
    icon: "calendar",
    detail: "Serving travellers since 26 April 2019.",
  },
  {
    label: "WhatsApp Support",
    icon: "whatsapp",
    detail: "Fast, friendly help on WhatsApp.",
  },
];

export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  children: NavLink[];
}

/** Primary navigation. Services collapse into a dropdown to keep the bar calm. */
export const primaryNav: (NavLink | NavGroup)[] = [
  { label: "Tours", href: "/tours" },
  {
    label: "Services",
    children: [
      { label: "Airport Transfers", href: "/airport-transfers" },
      { label: "Holiday Packages", href: "/packages" },
      { label: "Air Ticketing", href: "/air-ticketing" },
      { label: "Hotel Assistance", href: "/hotel-booking" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

/** Flat list used for the mobile menu and the footer sitemap. */
export const allNavLinks: NavLink[] = [
  { label: "Tours & Experiences", href: "/tours" },
  { label: "Airport Transfers", href: "/airport-transfers" },
  { label: "Holiday Packages", href: "/packages" },
  { label: "Air Ticketing", href: "/air-ticketing" },
  { label: "Hotel Assistance", href: "/hotel-booking" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function isNavGroup(item: NavLink | NavGroup): item is NavGroup {
  return (item as NavGroup).children !== undefined;
}
