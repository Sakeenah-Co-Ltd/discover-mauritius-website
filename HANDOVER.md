# HANDOVER — Discover Mauritius (developer state)

> **Read this first in every session.** It is the technical state of the project: what exists, what
> branch/PR is in flight, where things live in code, and how to verify. Client-facing needs (content,
> photos, decisions, approvals) live in **`NEXT_SESSION_REQUIREMENTS.md`** — do not duplicate them here.
>
> **Rules for updating this file (end of every session):**
> 1. Update **§1 State** (one paragraph, dated) and **§2 In flight** (branch, PR, what is Verified vs Unverified).
> 2. If you added/moved/removed a component, route or content file, fix **§4 Where to look in code**.
> 3. Anything the *client* must provide goes to `NEXT_SESSION_REQUIREMENTS.md`, not here.
> 4. Design decisions and rationale go to `NOTES.md` (design log). Keep this file operational.

---

## 1. State (2026-08-18)

Static-first Next.js 15 (App Router) + Tailwind v4 site, 28 routes, all pages built and SEO wired
(JSON-LD, sitemap, robots, OG image). Content is placeholder-heavy (draft tours, placeholder prices,
one real photo, sample reviews, placeholder logo). **This session** rebuilt the home hero in the
direction of `template1.webp` (light floating card + tabbed trip planner that pre-fills the quote
form), retired the aircraft sequence and the category quick-nav, and did a cohesion pass (card
radius 20px, CTA pill + arrow-circle pattern, featured grid fix). Interior pages unchanged.

## 2. In flight

- **Branch:** `feature/hero-template-upgrade` (off `origin/main` at `39937e8`). Not yet merged.
- **Verified** (2026-08-18, local production build, headless Chrome 1440×900 + 390×844):
  `npm run build` passes (28/28 pages); no console errors on `/`, `/tours`, `/tours/[slug]`,
  `/about`, `/airport-transfers`, `/faq`, `/contact`; no horizontal overflow at 390px; no broken
  images; exactly one `<h1>` per page; planner tabs (click + arrow keys) switch service; planner
  submit navigates to `/contact?service=…&item=…&arrival=…&departure=…&adults=…&children=…` and the
  quote form opens at step 3 with a recap + "Edit"; `flexible=1` path works; bad params (departure
  before arrival, adults=99) fall back safely to step 1; header is transparent at the top of Home
  and becomes the white bar after scroll; all header/footer links return 200.
- **Unverified:** real devices (iOS Safari date inputs), Cloudflare `npm run preview`, Lighthouse.

## 3. How to verify after any change
```bash
npm run build      # must pass; types + prerender of all pages
npm start          # then click through Home → planner → /contact, /tours, a tour, About, FAQ
```
Screenshot/QA harness used this session (not in repo): puppeteer-core against the local build,
viewports 1440×900 and 390×844, scroll-through before full-page capture (scroll reveals), console +
overflow + broken-image checks. Rebuild it from that description if needed; nothing project-specific.

## 4. Where to look in code

| Area | File(s) | Notes |
|---|---|---|
| Home page order | `app/page.tsx` | `Hero` → `FeaturedTours` → `ServicesSection` → `WhyUs` → `HowItWorks` → `Testimonials` → `Faqs` → `QuoteCta` |
| **Home hero** | `components/home/Hero.tsx` | Floating card, copy column, photo (right half on `lg`, inset panel below `lg` via `lg:contents` trick), planner overlap (`-mt-20 lg:-mt-32`), trust strip |
| **Trip planner** | `components/home/HeroPlanner.tsx` | Client component. Tabs from `content/services.ts` (`shortName`, `quoteKey`, `priority`); plain **GET form → `/contact`**; per-tab primary field (tours/packages from products, transfers + coasts are constants at the top); dates + travellers; gold submit |
| Hero CSS | `app/globals.css` → "Home hero — floating card" | `.hero-card` gradient, `@utility hero-photo-mask`, `.hero-kenburns`, `.hero-line*`, `.hero-fade`, `@utility no-scrollbar`; reduced-motion block at the bottom |
| Quote form prefill | `components/contact/QuoteForm.tsx`, `app/contact/page.tsx` | Accepts `service,item,arrival,departure,flexible,adults,children` (sanitised); starts at step 2 when service + usable dates are present; recap banner with Edit |
| Quote delivery | `app/api/quote/route.ts` | Logs only; marked TODO for Resend/SMTP/WhatsApp |
| Header | `components/layout/Header.tsx` | Fixed + transparent on Home until `0.45 × innerHeight`, sticky white bar elsewhere; ink text in both states |
| CTA pair | `components/ui/Button.tsx` + `components/ui/ArrowCircle.tsx` | Pill + round arrow companion (light / dark / onDark); circle is decorative unless `label` is passed |
| Featured grid | `components/sections/FeaturedTours.tsx`, `components/cards/TourCard.tsx` | Lead card (`variant="feature"`, image grows: body `lg:flex-none`) + supporting cards; header row uses the CTA pair |
| Design tokens | `app/globals.css` `@theme` | Colours, radii (`--radius-card` 20px), shadows, easing |
| Section rhythm | `components/ui/Section.tsx`, `components/ui/ReefWave.tsx` | Surface bands + reef-wave transitions |
| Content (edit here) | `content/site.ts`, `content/copy.ts`, `content/tours.ts`, `content/services.ts`, `content/faqs.ts`, `content/testimonials.ts` | `copy.home.planner` holds the planner strings; `copy.home.hero.eyebrow` = client tagline |
| Types | `lib/types.ts` | `Service` gained `shortName` + `quoteKey`; `QuoteServiceKey`; `IconName` gained `search`, `arrow-up-right` |
| Icons | `components/ui/Icon.tsx` | Stroke set; add new names to `IconName` too |
| Images | `public/images/le-morne-photo.jpg` (only real photo), `components/ui/SmartImage.tsx` (placeholder → `next/image` swap) | Slot brief in `IMAGE-SHOTLIST.md` |
| Interior page headers | `components/ui/PageHeader.tsx` | Dark band with optional photo; unchanged this session |
| SEO | `lib/schema.ts`, `components/seo/JsonLd.tsx`, `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx` | |
| Deploy | `wrangler.jsonc`, `open-next.config.ts` (Cloudflare Workers via `@opennextjs/cloudflare`); `NEXT_PUBLIC_SITE_URL` env | Vercel also fine |

Removed this session: `components/home/HeroScene.tsx` (aircraft), `components/sections/CategoryCards.tsx`
(replaced by the planner tabs), `.hero-sky-clip` / `.hero-plane-path` / `.hero-grain` / scroll-cue CSS.

## 5. Docs map
- `NEXT_SESSION_REQUIREMENTS.md` — **client checklist** (what we still need, by priority, with history).
- `NOTES.md` — design system + dated design log (why things look the way they do).
- `IMAGE-SHOTLIST.md` — photo brief per slot. `SEO-NOTES.md` — technical SEO + post-launch playbook.
- `PENDING-CLARIFICATIONS.md` — original question log (kept for history; superseded by the requirements file).
- `README.md` — stack, scripts, structure.
