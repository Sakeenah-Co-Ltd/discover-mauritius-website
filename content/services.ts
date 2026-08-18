import type { Service } from "@/lib/types";

/**
 * The five revenue services (brief §1). Ordered by revenue priority; each has its
 * own SEO landing page (brief §4). Growth focus: hotel booking, transfers, ticketing.
 */
export const services: Service[] = [
  {
    slug: "tours",
    shortName: "Tours",
    quoteKey: "tour",
    name: "Private & Guided Tours",
    title: "Private & Guided Island Tours",
    hook: "See the real Mauritius with an experienced local guide.",
    description:
      "Customized private and guided tours across the island — history, culture, nature and hidden gems, at your own pace with a driver-guide who knows Mauritius intimately.",
    icon: "route",
    href: "/tours",
    bullets: [
      "Experienced, licensed local guides",
      "Fully customizable to your interests and pace",
      "Private vehicles with hotel pickup",
      "Half-day, full-day and multi-day options",
    ],
    cta: "Explore Tours",
    priority: 1,
  },
  {
    slug: "airport-transfers",
    shortName: "Transfers",
    quoteKey: "transfer",
    name: "Airport Transfers",
    title: "Airport Transfers, Anywhere in Mauritius",
    hook: "Reliable pickup and drop-off, anywhere on the island.",
    description:
      "Private airport transfers to and from your hotel or any location in Mauritius. A driver is waiting when you land — no queues, no haggling, no surprises.",
    icon: "car",
    href: "/airport-transfers",
    bullets: [
      "Meet & greet at Sir Seewoosagur Ramgoolam International Airport",
      "Pickup and drop-off anywhere in Mauritius",
      "Clean, comfortable, air-conditioned vehicles",
      "Fixed, transparent starting prices",
    ],
    cta: "Book Airport Transfer",
    priority: 2,
  },
  {
    slug: "packages",
    shortName: "Packages",
    quoteKey: "package",
    name: "Holiday Packages",
    title: "Complete Mauritius Holiday Packages",
    hook: "One team plans your whole trip — flights to farewell.",
    description:
      "Five-day and fully customized holiday packages combining accommodation, transfers, tours, activities and travel support — a complete Mauritius holiday, organised end to end.",
    icon: "calendar",
    href: "/packages",
    bullets: [
      "Five-day signature package or fully bespoke",
      "Accommodation, transfers, tours and activities",
      "Tailored to your interests, time and budget",
      "One point of contact for the entire trip",
    ],
    cta: "Plan My Holiday",
    priority: 3,
  },
  {
    slug: "air-ticketing",
    shortName: "Flights",
    quoteKey: "flights",
    name: "Air Ticketing",
    title: "Air Ticketing by an IATA-Accredited Agency",
    hook: "Flights booked by an IATA-accredited travel agency.",
    description:
      "As an IATA-accredited agency, we arrange international and regional air tickets to and from Mauritius — with professional support before, during and after your journey.",
    icon: "plane",
    href: "/air-ticketing",
    bullets: [
      "IATA-accredited travel agency",
      "International and regional flights",
      "Personal help with dates, routes and changes",
      "Coordinated with your transfers and tours",
    ],
    cta: "Request Flight Quote",
    priority: 4,
  },
  {
    slug: "hotel-booking",
    shortName: "Hotels",
    quoteKey: "hotel",
    name: "Hotel Assistance",
    title: "Hotel Booking Assistance",
    hook: "The right hotel for your budget and plans.",
    description:
      "We help you choose and book the right accommodation for your preferences, budget and holiday requirements — from beach resorts to boutique stays across the island.",
    icon: "hotel",
    href: "/hotel-booking",
    bullets: [
      "Matched to your preferences and budget",
      "Beach resorts, boutique hotels and guesthouses",
      "Local knowledge of every coast and region",
      "Booked alongside your tours and transfers",
    ],
    cta: "Get Hotel Help",
    priority: 5,
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
