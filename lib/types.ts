/**
 * Shared content types. The whole site renders from these, so the client's real
 * tour list / pricing / copy can be dropped into /content without touching any
 * component. See PENDING-CLARIFICATIONS.md #2, #11.
 */

export type Surface = "canvas" | "lagoon-mist" | "sand-mist" | "ocean" | "ink";

export type GradientTone =
  | "ocean"
  | "lagoon"
  | "sunset"
  | "forest"
  | "sand"
  | "reef";

export type Orientation = "landscape" | "portrait" | "square" | "wide";

/**
 * A placeholder-aware image slot. `src` is null until the client supplies photos
 * (Pending #3); <SmartImage> then renders a branded gradient block with the alt
 * text as an accessible label. Every slot here is mirrored in IMAGE-SHOTLIST.md.
 */
export interface ImageSlot {
  /** descriptive, filename-style id, e.g. "chamarel-seven-coloured-earths" */
  id: string;
  /** alt text describing the *intended* photograph */
  alt: string;
  tone?: GradientTone;
  orientation?: Orientation;
  /** real asset path once supplied, e.g. "/images/tours/south-hero.jpg" */
  src?: string | null;
  /** CSS object-position for art-directing the crop, e.g. "50% 25%" */
  position?: string;
}

export interface ItineraryStop {
  title: string;
  description: string;
}

export type ProductType = "tour" | "package" | "transfer";

/**
 * One row of the operator's price list. Tours and transfers are sold **per
 * vehicle**, not per person, so a single "from" figure is never the whole story
 * — `Product.pricing` carries the full list and the UI shows it verbatim.
 */
export interface VehiclePrice {
  /** "Car", "Van" */
  vehicle: string;
  /** capacity exactly as the operator states it, e.g. "Up to 3 people" */
  capacity: string;
  price: number;
}

export interface Product {
  slug: string;
  productType: ProductType;
  title: string;
  /** one-line card hook */
  hook: string;
  /** longer intro paragraph */
  summary: string;
  region: string;
  /** display string, e.g. "Full day · about 8 hours" */
  duration: string;
  /** numeric starting price — the cheapest row of `pricing` when that is present */
  fromPrice: number;
  currency: string;
  /** what the "from" figure covers, e.g. "Per vehicle, not per person" */
  priceNote: string;
  /** the operator's full per-vehicle price list, when one has been supplied */
  pricing?: VehiclePrice[];
  /** languages the driver-guide speaks */
  languages?: string[];
  /** accessibility notes, as supplied by the operator */
  accessibility?: string[];
  groupType: string;
  highlights: string[];
  included: string[];
  excluded: string[];
  itinerary: ItineraryStop[];
  tags: string[];
  /** approximate map focus for the per-tour area map */
  mapArea: { label: string; query: string };
  hero: ImageSlot;
  gallery: ImageSlot[];
  featured?: boolean;
  /** true while this is placeholder inventory awaiting the real list (Pending #2) */
  draft?: boolean;
}

/** Keys the quote form understands (QuoteForm `service` field + `?service=` prefill). */
export type QuoteServiceKey = "tour" | "transfer" | "package" | "flights" | "hotel";

export interface Service {
  slug: string;
  /** short nav/label name */
  name: string;
  /** one-word label for tight UI (hero planner tabs) */
  shortName: string;
  /** which quote-form service this maps to */
  quoteKey: QuoteServiceKey;
  /** marketing title */
  title: string;
  hook: string;
  description: string;
  icon: IconName;
  href: string;
  bullets: string[];
  cta: string;
  /** revenue priority for ordering (1 = highest) */
  priority: number;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Testimonial {
  /** clearly a sample until real reviews arrive (Pending #4) */
  sample: true;
  quote: string;
  name: string;
  origin: string;
  trip: string;
  rating: number;
}

export type IconName =
  | "route"
  | "car"
  | "calendar"
  | "plane"
  | "hotel"
  | "shield"
  | "iata"
  | "whatsapp"
  | "star"
  | "map-pin"
  | "clock"
  | "users"
  | "check"
  | "x"
  | "phone"
  | "mail"
  | "facebook"
  | "arrow-right"
  | "chevron-down"
  | "sparkles"
  | "compass"
  | "sun"
  | "wave"
  | "menu"
  | "close"
  | "search"
  | "globe"
  | "arrow-up-right";
