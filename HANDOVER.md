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

## 1. State (2026-08-25)

Static-first Next.js 15 (App Router) + Tailwind v4 site, 28 routes, all pages built and SEO wired
(JSON-LD, sitemap, robots, OG image). **This session** replaced the invented inventory with the
client's first four real products (3 tours + the private transfer, typed verbatim from PDFs) and
switched the whole site from per-person EUR placeholders to **per-vehicle USD**, which the cards,
the booking card and the transfer landing page now all say explicitly. The real N.K. Taher logo went
in: the supplied JPG was keyed to transparency (flood-fill + morphological closing so the white
aircraft stays opaque rather than becoming a hole), with a reversed variant for `bg-ink`, and it now
drives the header, footer, favicon, apple-touch icon and the OG card. Three invented products remain,
still `draft: true` behind the "sample itinerary" banner, pending the client's next batch.
**Also this session:** auto-deploy wired (push to `main` → Cloudflare Workers, live at
https://discover-mauritius-website.kcelerie.workers.dev, search engines blocked by default), and the
client's first 17 photographs placed — every tour card and the home hero now show real photography.
Still placeholder: reviews, the five-day package, and the transfer/packages/about image slots.

## 2. In flight

- **Branch:** `feature/client-photos` (off `main`). PRs #5 (real tours + logo) and #6 (auto-deploy) are **merged**. The repo lives under the `Sakeenah-Co-Ltd` org; the old `kcelerie/…` URL (still in `origin`) redirects to it — worth a `git remote set-url`.
- **Verified** (2026-08-25, local production build + `curl` against `npm start`):
  `npm run build` passes (28/28 pages) and prerenders the three new tour slugs; `/`, `/tours`, the
  three new tour pages, `/tours/airport-transfer-private`, `/airport-transfers`, `/icon.png`,
  `/apple-icon.png`, `/opengraph-image`, `/manifest.webmanifest` and both brand PNGs all return 200;
  the rendered HTML carries the real figures (`From $84`, `$125`, `Up to 3 people`, `5 to 10 people`,
  `From $45`, `$120`), the guide languages, `Per vehicle, not per person` and the "Good to know"
  block; the draft banner appears on draft products only and not on the four real ones; no `€`
  remains anywhere in `app/`, `components/` or `content/`. The **OG card was rendered and inspected**
  — the reversed mark and wordmark composite correctly. The **keyed logo was inspected** as a proof
  sheet over white, `bg-ink` and gold: no white halo, aircraft opaque, edges clean.
- **Unverified — the visual in-page pass did not happen.** The Chrome extension did not respond
  (three attempts), so nothing was screenshotted in the running site: **the logo's size and optical
  balance in the real header and footer, the per-vehicle price table inside the booking card, and
  the 390px layout are all unconfirmed.** Do this first next session.
- **Verified (2026-08-25, deploy work):** `npx opennextjs-cloudflare build` completes and bundles
  `.open-next/worker.js` (this was previously untested). Indexing gate checked in both directions:
  with the flag unset, `robots.txt` is `Disallow: /` and pages carry `noindex, nofollow`; with
  `NEXT_PUBLIC_ALLOW_INDEXING=true`, `robots.txt` allows and pages carry `index, follow`.
- **Verified (2026-08-25, photos):** all 17 images return 200 from the running build, `next/image`
  optimisation serves them, and each page renders the slots expected of it (home + `/tours` cards
  from the tour heroes, each tour page its own gallery). `npm run build` passes 28/28.
- **Verified (2026-08-25, deploy):** the workflow ran on the merge of PR #6 and succeeded in 1m33s;
  the live URL returns 200 across `/`, `/tours`, the tour pages, the brand assets and the favicon,
  with `robots.txt` = `Disallow: /` and `noindex` on pages, as intended pre-launch.
- **Unverified (carried over):** real devices (iOS Safari date inputs), Lighthouse. **No in-page
  visual pass has ever happened** — the Chrome extension has not responded in this project. Header
  logo balance, the booking-card price table and the 390px layout remain unconfirmed, and now so
  does how the new photography crops in each slot.

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
| **Inventory** | `content/tours.ts` | 7 products. The 4 with `draft: false` are the client's real ones (typed verbatim from the 25 Aug PDFs) — do not reword them. `PER_VEHICLE` / `PRICE_NOTE` consts mark real vs placeholder pricing; `GUIDE_LANGUAGES` is shared |
| **Pricing model** | `lib/types.ts` (`VehiclePrice`), `lib/products.ts` (`formatMoney`) | Prices are **per vehicle in USD**, never per person. `Product.pricing` holds the car/van table; `fromPrice` is just the cheapest row for the cards |
| **Brand assets** | `public/images/brand/*.png`, `app/icon.png`, `app/apple-icon.png`, `lib/brand-mark.ts` | Keyed from `brand-source/nk-taher-logo-source.jpg` (kept out of `public/`). `-white` variants are for dark surfaces. `lib/brand-mark.ts` inlines the mark as a data URI because the OG route has no `fs` on Workers |
| **Logo** | `components/ui/Logo.tsx` | Mark image + "Discover Mauritius / by N.K. Taher Co Ltd" wordmark; `onDark` swaps to the reversed mark |
| Booking card | `components/tours/BookingCard.tsx` | Renders `product.pricing` as a car/van table and `product.languages` as a fact row; falls back to the old "per person · indicative" line for drafts |
| Types | `lib/types.ts` | `Service` gained `shortName` + `quoteKey`; `QuoteServiceKey`; `Product` gained `pricing`, `languages`, `accessibility`; `IconName` gained `search`, `arrow-up-right`, `globe` |
| Icons | `components/ui/Icon.tsx` | Stroke set; add new names to `IconName` too |
| **Images** | `public/images/tours/<slot-id>.jpg` (one file per slot, named for the slot id), `public/images/le-morne-aerial.jpg` (shared: home hero, `/tours` header, Wild South hero, `island-mountain`) | 17 client photos, placed 25 Aug. `components/ui/SmartImage.tsx` swaps placeholder → `next/image`. Slot brief + per-slot resolutions in `IMAGE-SHOTLIST.md` |
| Superseded image | `public/images/le-morne-photo.jpg` | The Aug-04 photo (1536×1536 but upscaled from a 512px original). Unreferenced, kept deliberately: it is the one image we know the client owns, so it is the fallback if `le-morne-aerial.jpg` turns out to have a rights problem |
| Interior page headers | `components/ui/PageHeader.tsx` | Dark band with optional photo; unchanged this session |
| SEO | `lib/schema.ts`, `components/seo/JsonLd.tsx`, `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx` | |
| Deploy | `.github/workflows/deploy.yml`, `wrangler.jsonc`, `open-next.config.ts` | Push to `main` → build → Cloudflare Workers. See §6 |
| **Indexing gate** | `lib/seo-flags.ts`, `app/robots.ts`, `app/layout.tsx` | Search engines are blocked **by default**. Opening the site at launch is one repo variable — see §6 |

Removed this session: `app/icon.svg` (replaced by `app/icon.png`), and the two invented tours the real
inventory duplicated — `port-louis-cultural-market` and `black-river-gorges-hiking`. Slugs changed:
`south-island-discovery` → `seven-coloured-earth-south-coast`, `north-cap-malheureux` → `port-louis-north`;
`vallee-advenature-wild-south` is new. Nothing outside `content/tours.ts` referenced the old slugs.

**How the logo was keyed** (rebuild from this if the client sends a better original): `sips` JPG→PNG,
then pure-Python (no PIL/numpy on this machine) — alpha from distance-to-white, flood fill the
background from the image border across an ink mask dilated by 4px, then dilate the background back
by 4px. That closing seals the narrow channel where the aircraft's nose meets the outer white, so the
aircraft reads as opaque white instead of a knockout hole; letter counters in the wordmark are
deliberately left transparent. Soft edge pixels take the colour of the nearest solid ink.

## 5. Deploy

Every push to `main` builds and deploys to Cloudflare Workers via
`.github/workflows/deploy.yml`. There is no staging environment — `main` is production.

**Two repository secrets are required before the workflow can succeed**
(Settings → Secrets and variables → Actions → *Secrets*):

| Secret | Where it comes from |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Cloudflare dashboard → My Profile → API Tokens → *Edit Cloudflare Workers* template |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare dashboard → Workers & Pages → right-hand sidebar |

**Two optional repository *variables*** (same page, *Variables* tab — these are not secrets):

| Variable | Effect |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, robots host and share-card URLs. Unset → falls back to the placeholder `https://www.discover-mauritius.com` in `content/site.ts` |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `true` opens the site to search engines. **Anything else keeps it fully blocked**, which is the deliberate default while content is unfinished |

⚠️ **At launch, `NEXT_PUBLIC_ALLOW_INDEXING` must be set to `true` and the site redeployed**, or the
live site will stay invisible to Google. Both flags are read at *build* time, so changing a variable
only takes effect on the next deploy — re-run the workflow after changing one.

No Cloudflare Git integration is used. As of 2026-08-25 the Cloudflare GitHub App was **not**
installed on the `Sakeenah-Co-Ltd` org (likely lost when the repo moved out of `kcelerie/`), so
dashboard-driven builds were not firing. Note this project is a **Workers** app (OpenNext), not a
Pages app — a Cloudflare *Pages* project cannot build it.

Manual deploy from a workstation still works: `wrangler login` then `npm run deploy`.

## 6. Docs map
- `NEXT_SESSION_REQUIREMENTS.md` — **client checklist** (what we still need, by priority, with history).
- `NOTES.md` — design system + dated design log (why things look the way they do).
- `IMAGE-SHOTLIST.md` — photo brief per slot. `SEO-NOTES.md` — technical SEO + post-launch playbook.
- `PENDING-CLARIFICATIONS.md` — original question log (kept for history; superseded by the requirements file).
- `README.md` — stack, scripts, structure.
