import type { Testimonial } from "@/lib/types";

/**
 * PARKED — not rendered anywhere. `Credentials` stands in this slot on the home page
 * until the client supplies real reviews (NEXT_SESSION_REQUIREMENTS §2.4). Kept rather
 * than deleted so restoring the section is a one-line change in `app/page.tsx` once the
 * entries below are replaced with genuine, permissioned reviews.
 *
 * SAMPLE testimonials only — clearly flagged (brief §10, Pending #4).
 * These are illustrative of tone/format and MUST be replaced with real, verifiable
 * reviews before launch. Do NOT present these as genuine customer reviews.
 * Every entry carries `sample: true` and the UI stamps a visible "SAMPLE" label.
 */
export const testimonials: Testimonial[] = [
  {
    sample: true,
    quote:
      "From the airport pickup to the last day, everything was organised and easy. Our guide knew exactly where to take us to avoid the crowds.",
    name: "[SAMPLE — replace with real review]",
    origin: "Traveller from Europe",
    trip: "Five-Day Package",
    rating: 5,
  },
  {
    sample: true,
    quote:
      "We wanted a private tour of the south and they tailored the whole day around us. Professional, friendly and completely stress-free.",
    name: "[SAMPLE — replace with real review]",
    origin: "Traveller from the Middle East",
    trip: "South Island Discovery",
    rating: 5,
  },
  {
    sample: true,
    quote:
      "They handled our flights, hotel and transfers together, so we only had one team to talk to. Exactly what you want when you're travelling far.",
    name: "[SAMPLE — replace with real review]",
    origin: "Traveller from South Africa",
    trip: "Flights + Hotel + Transfers",
    rating: 5,
  },
];
