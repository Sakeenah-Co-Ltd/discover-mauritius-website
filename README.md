# Discover Mauritius

Production website for **Discover Mauritius**, by **N.K. TAHER CO LTD** — a licensed tour operator
and IATA-accredited travel agency. A marketplace-style travel site (not a brochure): beautiful
visuals, clear products, trust signals, and an easy quote-first booking flow.

> **Model:** quote-first. No online payments, checkout or cart. Every page funnels to
> *"Request your personalized Mauritius travel plan / quote."*

## Tech stack
- **Next.js 15** (App Router, static-first) · **React 19**
- **Tailwind CSS v4** with a custom design-token layer (`app/globals.css`)
- **Fraunces** (display) + **Inter** (body) via `next/font`
- TypeScript, zero UI-component-library dependencies (bespoke design system)

## Getting started
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (statically prerenders all pages)
npm start        # serve the production build
```

## Environment
```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://your-domain.com   # canonicals, OG, sitemap, JSON-LD
```

## Project structure
```
app/                 Routes (Home, /tours, /tours/[slug], service pages, About, FAQ, Contact, legal)
  api/quote/         Quote-request endpoint (logs now; wire mail/WhatsApp later)
  globals.css        Design tokens (@theme), base styles, "Lagoon Line" signature utilities
  sitemap.ts robots.ts manifest.ts opengraph-image.tsx icon.svg
components/
  layout/            Header, Footer, floating WhatsApp button
  ui/                Design-system primitives (Button, Section, SmartImage, Icon, PageHeader, …)
  sections/          Reusable page sections (Hero pieces, FeaturedTours, Faqs, QuoteCta, …)
  cards/ tours/ services/ contact/ legal/ seo/
content/             ← EDIT HERE: site facts, copy, tours, services, faqs, testimonials
lib/                 Types, product helpers, schema (JSON-LD), utils
```

## Where to edit content (no component changes needed)
| Want to change… | File |
|---|---|
| Business facts (phone, email, WhatsApp, nav) | `content/site.ts` |
| Marketing copy / labels (i18n-ready) | `content/copy.ts` |
| Tours & products (prices, itineraries) | `content/tours.ts` |
| Services | `content/services.ts` |
| FAQs | `content/faqs.ts` |
| Testimonials | `content/testimonials.ts` |
| Design tokens (colours, type, radii) | `app/globals.css` (`@theme`) |

## Images
One real photo is wired: `public/images/le-morne-photo.jpg` (home hero + `/tours` header + the
South tour). Its companion `le-morne-ridge.png` is a sky-boundary cutout that lets the hero
aircraft disappear behind Le Morne — regenerate it if the photo is ever replaced (see NOTES.md,
2026-08-04). Every other slot still renders a branded gradient placeholder. To add a real photo,
set `src` (and optionally `position`) on the slot and drop the file in `/public/images`. See
**`IMAGE-SHOTLIST.md`**.

## Project docs
- **`NOTES.md`** — design analysis of the references + the design system + signature element (design log).
- **`PENDING-CLARIFICATIONS.md`** — open questions from the client.
- **`HANDOVER.md`** — every placeholder and exactly where to replace it.
- **`IMAGE-SHOTLIST.md`** — the photography brief.
- **`SEO-NOTES.md`** — technical SEO built in + post-launch growth playbook.

## Deploy
Deploy-agnostic; **Vercel** recommended (zero-config for Next.js). Set `NEXT_PUBLIC_SITE_URL`.
The only server-rendered routes are `/contact` (reads query params) and `/api/quote`; everything
else is static.

---
Discover Mauritius is a trading name of N.K. TAHER CO LTD, established 26 April 2019.
