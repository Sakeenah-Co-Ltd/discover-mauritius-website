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

**2026-09-07:** the client bought **`discover-mauritius.com`** (GoDaddy). Hosting stays on
Cloudflare Workers — a static export was tested and is not viable for this build (`/contact`
depends on `await searchParams` for the planner prefill, and `/api/quote` is a POST handler), so
any PHP/shared host would mean deleting the enquiry funnel. The apex is canonical, `www` 308s to
it, and both are declared as Custom Domains in `wrangler.jsonc`. Awaiting the client's nameserver
change at GoDaddy before the branch can merge. *(Done — live since 7 Sep.)* The sample
testimonials were also removed: they were invented, and the client asked for them to be shown as
anonymous reviews, which would have made them fabricated reviews on a live commercial site. A
credentials band built only from verifiable facts stands in that slot instead.

## 2. In flight

- **Branch:** `docs/domain-live` (off `main`). PR #8 (custom domain) is **merged and deployed**.
- **Branch was:** `chore/custom-domain` (off `main`). PRs #5 (real tours + logo), #6 (auto-deploy) and
  #7 (client photos) are all **merged** — the photos are live. The repo lives under the
  `Sakeenah-Co-Ltd` org; the old `kcelerie/…` URL (still in `origin`) redirects to it — worth a
  `git remote set-url`.
- **Verified (2026-09-07, custom domain):** `npm run build` passes 28/28 with the redirect in place.
  Against `next start`, `Host: www.discover-mauritius.com` returns **308 → `https://discover-mauritius.com`**
  with the path preserved on both `/tours` and a deep tour URL, while the apex returns **200** (no
  loop). Canonical, `og:url`, `og:image` and every `<loc>` in the sitemap now carry the apex, with
  **zero** `www.` occurrences left in the rendered home page. `robots.txt` is still `Disallow: /`
  and pages still carry `noindex, nofollow` — the launch gate is untouched.
- **⚠️ Not yet merged, and must not be until the Cloudflare zone is active.** The branch adds
  Custom Domain routes; deploying them against a zone that does not exist in the account fails the
  workflow, and `main` is production. The nameserver change at GoDaddy is the client's step.
- **Verified LIVE (2026-09-07, `discover-mauritius.com`)** — deploy run 34092850314 succeeded in
  1m32s and the Custom Domains attached. Tested with `curl --resolve` against `104.21.32.213`, which
  bypasses DNS cache entirely: apex `/` = **HTTP/2 200** (`server: cloudflare`); `www/tours` =
  **308 → `https://discover-mauritius.com/tours`**, path preserved — this closes the previously
  unverified item, the redirect now confirmed on the real Workers runtime, not just `next start`.
  `/`, `/tours`, `/tours/port-louis-north`, `/contact`, `/airport-transfers`, `/opengraph-image`
  and `/sitemap.xml` all **200**. Canonical = apex. `next/image` serves **AVIF, 47,241 bytes** vs
  the 201,034-byte original. TLS cert issued by Google Trust Services (CN=discover-mauritius.com,
  2026-09-07 → 2026-12-06). Cloudflare created proxied A (`104.21.32.213`, `172.67.136.21`) and
  AAAA records for both hostnames.
- **⚠️ Finding — Cloudflare's Managed robots.txt overrides the launch gate.** The zone injects a
  managed block *above* the app's output, so `/robots.txt` now serves **two** `User-agent: *`
  groups: Cloudflare's `Allow: /` and the app's `Disallow: /`. RFC 9309 merges same-agent groups,
  and on an equal-specificity Allow/Disallow conflict the least restrictive rule generally wins —
  so the robots half of `lib/seo-flags.ts` is effectively **not blocking** any more. The site is
  still safe from indexing: `noindex, nofollow` is intact on every page and is the decisive signal
  (arguably more reliable now, since a crawler that can fetch the page will actually read it). But
  the documented "fully blocked" behaviour is no longer what is served. **Fix:** disable Managed
  robots.txt for the zone (Cloudflare → the domain → AI Crawl Control / robots.txt), so the app's
  own file is served verbatim. Only matters pre-launch — once `NEXT_PUBLIC_ALLOW_INDEXING=true`
  both blocks agree.
- **Unverified:** no in-page visual pass on the live domain; DNS still propagating at the time of
  writing (see §5).
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
**Screenshot/QA harness — working recipe (2026-09-07).** There is no Google Chrome on this machine
(the user runs Arc), and the Claude-in-Chrome extension has never responded here. What *does* work,
with zero npm installs:

1. Chrome for Testing already sits in the puppeteer cache:
   `~/.cache/puppeteer/chrome/mac_arm-*/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`
2. Launch it headless with `--remote-debugging-port=9333 --user-data-dir=<tmp>` **as a background
   task** — a trailing `&` gets reaped and the port never opens.
3. Drive it from plain Node (v22+ has a global `WebSocket`, so no puppeteer needed):
   `Emulation.setDeviceMetricsOverride` for the viewport, then `Page.captureScreenshot` with
   `captureBeyondViewport: true`.

⚠️ **Do not screenshot with the plain `--screenshot` CLI flag and a narrow `--window-size`.** It lays
the page out wider than the window and silently crops, which reads as horizontal overflow that is not
there. Use `Emulation.setDeviceMetricsOverride` and assert
`document.documentElement.scrollWidth === innerWidth` instead of trusting the picture.

## 4. Where to look in code

| Area | File(s) | Notes |
|---|---|---|
| Home page order | `app/page.tsx` | `Hero` → `FeaturedTours` → `ServicesSection` → `WhyUs` → `HowItWorks` → **`Credentials`** → `Faqs` → `QuoteCta` |
| **Credentials band** | `components/sections/Credentials.tsx` | Replaced the sample testimonials 7 Sep. Registered-entity card + 4 checkable facts, all sourced from `content/site.ts` and `GUIDE_LANGUAGES` in `content/tours.ts`. Copy in `copy.home.credentials`. Deliberately distinct from `WhyUs`: that one is qualitative benefits, this one is verifiable specifics |
| **Testimonials (parked)** | `components/sections/Testimonials.tsx`, `content/testimonials.ts` | Not rendered. Entries are invented placeholders — do **not** re-add to `app/page.tsx` until real reviews replace them (§2.4). Kept so restoring is a one-line change |
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
(Settings → Secrets and variables → Actions → *Secrets*). **Both were added 2026-08-25 and the
workflow has run green since — this is recorded for rebuild-from-scratch, not as an open task:**

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

### Custom domain (added 2026-09-07)

`discover-mauritius.com` — **registered at GoDaddy, DNS delegated to Cloudflare.** Not a transfer:
registration stays with GoDaddy, only the nameservers point at Cloudflare.

Both hostnames are declared as Custom Domains in `wrangler.jsonc` → `routes`, so `wrangler deploy`
attaches them itself; there is no dashboard step to repeat. The **apex is canonical** and
`www` 308s to it via `redirects()` in `next.config.mjs` — deliberately in code rather than a
Cloudflare Redirect Rule, so it is version-controlled and reviewable.

⚠️ **The routes only attach once the zone is active in the Cloudflare account.** Deploying while
the zone is missing fails the workflow, and `main` is production. Confirm the zone is active
*before* merging anything that carries these routes.

`content/site.ts` now falls back to `https://discover-mauritius.com` instead of a guessed
placeholder, so local and preview builds emit correct canonicals even with no env var set.
`NEXT_PUBLIC_SITE_URL` is set as a repo variable to the same value and still wins if present.

## 6. Docs map
- `NEXT_SESSION_REQUIREMENTS.md` — **client checklist** (what we still need, by priority, with history).
- `NOTES.md` — design system + dated design log (why things look the way they do).
- `IMAGE-SHOTLIST.md` — photo brief per slot. `SEO-NOTES.md` — technical SEO + post-launch playbook.
- `PENDING-CLARIFICATIONS.md` — original question log (kept for history; superseded by the requirements file).
- `README.md` — stack, scripts, structure.
