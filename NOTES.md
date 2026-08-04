# Discover Mauritius — Design Log & Direction

> Living document. Phase 1 is the design analysis + system definition below.
> Later phases append to the **Design Log** at the bottom as decisions are made.

---

## 1. What the `design-examples/` taught me

Two references were provided — **Hyer Aviation** (`example-1`) and **Going™** (`example-2`).
They sit at opposite ends of a spectrum but share a single, coherent design language.
That shared DNA — not the surface colors — is what I'm carrying into this build.

### Example 1 — Hyer Aviation → *austere luxury editorial*
- Extreme display typography: a single face at 131–187px, weight 700, **very tight negative tracking** (down to −3.74px). Headlines read as cast-metal objects.
- Austere **monochrome** system (deep ink `#000d10` + pure white) with **one** warm accent (clay `#bc7155`) used **once per page** on a single featured card.
- **No shadows.** Elevation is expressed purely through surface-color shifts: white → clay → dark slate → footer ink.
- Full-bleed sections that **alternate light and dark bands**; the color change *is* the divider (80px gaps, almost no rules).
- Body copy 18px at **1.61 line-height** — the most spacious block in the system.
- Hairline dividers (`#d5d3d4`) above section titles. Pill buttons (1000px) vs hard 0px panels — a deliberate shape tension.
- Photography-led: one hero object carries the whole page; product-crop logic, isolated on white.
- Signature move: hero headlines **end in a period** — "Beyond Travel."

### Example 2 — Going™ → *warm-paper travel journal*
- **Parchment** canvas (`#fffef0`, *never* pure white) — warm off-white to cut glare and feel printed.
- **Deep lagoon teal** (`#004449`) replaces black for **all** body text and icons — warm print, not cold digital.
- **One** electric-iris (`#483cff`) CTA per viewport carries all interactive weight; a neon lime is reserved for 2–5 word headline emphasis only.
- **Mint wash** bands (`#d7ffc2`) organize content — a **parchment → mint → parchment** rhythm is the signature.
- **Rounded, not floaty**: 24px cards + 900px pill buttons; **whisper shadow only** (`rgba(0,0,0,0.04) 0 2px 8px`).
- Humanist type (PP Mori) with a signature **475 weight** for body/UI; display sizes push tracking *outward* (up to 8px) for an editorial-poster feel.
- Trust furniture: social-proof pill badges, avatar stacks, press-logo strip, portrait testimonial cards.

### The shared design language (this is the brief)
1. **Premium travel editorial, never SaaS.** Both read like a travel publication.
2. **Single-accent discipline.** Exactly one chromatic action color, used sparingly (clay / iris). Everything else is structural.
3. **Surface-driven section rhythm.** Full-bleed color bands alternate to divide the page — not borders or heavy dividers. 1200px content max-width, **80px section gaps** (both agree exactly).
4. **Never pure black for text.** A deep brand-tinted near-black instead (deep-ink / deep-lagoon).
5. **Flat & paper-like.** No heavy shadows; elevation via color, with at most a whisper shadow.
6. **One signature typographic move** (tight tracking / expanded tracking) that becomes the brand's voice.
7. **Photography is the design.** Layouts frame images; they don't fight them.
8. **Pill is the action shape.** Full-radius buttons in both.
9. **Spacious.** 16–18px body, generous line-height, generous whitespace.

---

## 2. Translating that language to Discover Mauritius

The client palette maps almost one-to-one onto this DNA — Discover Mauritius is essentially the **warm Going model rebuilt in ocean tones**, with Hyer's editorial discipline keeping it premium.

| Design-language role | Hyer | Going | **Discover Mauritius** |
|---|---|---|---|
| Structural near-black (text, deep band, footer) | Deep ink | Deep lagoon | **Ocean Ink `#0E2A38`** (client-sanctioned deep blue) |
| Primary brand / mid dark band | — | — | **Ocean `#006994`** (trust) |
| Fresh secondary | — | Mint/lime | **Lagoon `#00BFA6`** |
| Single action accent (one per viewport) | Clay | Iris | **Gold/Sand `#D4A72C`** (CTAs + highlights only) |
| Canvas | White | Parchment | **White `#FFFFFF`** (client wants "space") |
| Section wash band | Dark slate | Mint wash | **Lagoon Mist `#EAF6F6`** + **Sand Mist `#FBF4E2`** |

**Palette guardrails honored:** never red / black / brown / purple. Text uses Ocean Ink `#0E2A38`, not `#000`. Gold is used *sparingly* and never as small text on white (fails contrast — see §3). The one WhatsApp-green element is an intentional, universally-recognized utility mark, not a palette color.

---

## 3. Design tokens (the Discover Mauritius system)

### Color
```
--color-ocean        #006994   Primary. Trust. Links, mid dark band, primary outlines.
--color-ocean-deep   #08394B   Darker ocean for hover on ocean fills.
--color-ink          #0E2A38   Primary text + deepest band + footer (the structural near-black).
--color-lagoon       #00BFA6   Secondary. Fresh teal — accents, the lagoon-line gradient, icon highlights.
--color-lagoon-deep  #008068   AA-safe lagoon for text/icons on white (4.9:1). [darkened from #00997F after contrast audit]
--color-gold         #D4A72C   Single action accent. CTA fills (with ink text), highlight underlines.
--color-gold-ink     #7F6417   AA-safe gold for gold-colored TEXT (5.6:1 on white, 5.1:1 on sand). [darkened from #8A6D18 after audit]
--color-white        #FFFFFF   Canvas.
--color-lagoon-mist  #EAF6F6   Pale aqua section wash band (the "mint" analog).
--color-sand-mist    #FBF4E2   Pale warm section band, used sparingly for warmth.
--color-hairline     #DCE7EC   Ocean-tinted hairline borders & dividers.
--color-muted        #52707C   Secondary/muted text (AA-verified on white during build).
```
> **Accessibility note carried into the build:** raw gold `#D4A72C` on white is ~2.0:1 — fails AA.
> Rule enforced in components: gold appears as a **fill** behind ink text (dark-on-gold passes),
> or as a decorative rule/underline — **never** as gold text on white. Gold *text* uses `--color-gold-ink`.
> All final pairings get a contrast check in Phase 6.

### Surfaces (the section-rhythm stack)
```
0  Canvas        #FFFFFF     default page background
1  Lagoon Mist   #EAF6F6     pale content band (features, how-it-works)
2  Sand Mist     #FBF4E2     warm band, sparing (testimonials / a single highlight)
3  Ocean         #006994     mid dark band — white text (trust / CTA bands)
4  Ink           #0E2A38     deepest band + footer — white text
```
Page oscillates Canvas → Mist → Canvas → Ocean/Ink, exactly like the references. The color change is the divider.

### Typography — decision & rationale
The client left type open but asked for "a premium travel **publication**, not a SaaS site."
Both examples use a single family; I'm making the one deliberate departure that best serves *that stated goal*: a **serif-display + humanist-sans pairing**, which is the defining move of premium travel print (Condé Nast Traveller, AFAR). I keep the examples' *discipline* (one voice per role, editorial tracking) while gaining warmth and a publication feel neither single-sans example reaches.

```
Display / Headings  →  Fraunces   (variable serif; opsz + soft axes = warm, editorial, premium)
Body / UI           →  Inter      (variable; superb legibility, i18n-ready for later FR; a11y-safe)
```
- Fraunces carries hero + section headings, weights 400–600, gentle *tight* tracking for elegance (serif doesn't need Hyer's extremes).
- Inter carries all body/UI at 16–18px, **line-height ~1.6** (adopting Hyer's spacious body rhythm).
- Both load via `next/font/google` (self-hosted, no layout shift, no external request).
- **Fallback plan for RTL Arabic (Pending #10):** swap Inter → a Naskh sans and Fraunces → a display Naskh in a future locale; copy already lives in a dictionary layer so no component changes are needed.

### Spacing, radius, elevation
```
Base unit            8px  (Going's cleaner scale; steps 8/16/24/32/40/48/64/80/104)
Content max-width    1200px  (both agree)   ·   Section gap  80px  (both agree)
Radius   buttons/badges 9999px (pill) · cards 16px · media 20px · inputs 12px
         → "rounded but not floaty": warm like Going, a touch tighter for premium restraint
Shadow   --shadow-sm  0 2px 8px rgba(14,42,56,.06)      (whisper, resting)
         --shadow-md  0 10px 30px rgba(14,42,56,.10)    (card hover lift — §6 requires subtle lift/zoom)
```

---

## 4. Signature element — **"The Lagoon Line"**

> The one memorable, Mauritius-specific move (§5 asks for exactly one; everything else stays disciplined).

**Concept.** Mauritius is visually *defined* by its geography: deep sapphire open ocean → a ring of turquoise lagoon → a line of white reef → golden sand. That cross-section — **ocean → lagoon → sand** — becomes a single reusable gradient and a soft **reef-wave** form:

- A **thin `ocean → lagoon → gold` gradient rule** ("the lagoon line") appears under the wordmark, beneath section eyebrows, and as the **active-nav underline**.
- **Reef-wave SVG dividers** transition between light and colored bands — a calm, low-amplitude wave echoing a reef break, *never* the cliché full-width scallop. Used only at band changes.
- A **lagoon gradient wash** sits behind the hero and one featured band.

**Why it earns its place:** it's unmistakably Mauritius (not generic "beach"), it's derived straight from the client palette (so it reinforces the brand rather than decorating over it), and it's *systematic* — one gradient token + one wave component reused, not a pile of ornaments. It respects `prefers-reduced-motion`: any drift animation is disabled there.

---

## 5. Component & layout conventions I'll follow (from the examples)

- **One primary CTA per viewport** = gold pill with ink text ("Plan My Holiday" / "Request Quote"). Secondary = ocean **outlined** pill. Tertiary = text link with lagoon-line hover underline.
- **Full-bleed colored bands**, 1200px inner content, 80px vertical gaps; color change divides sections.
- **Cards**: white on mist bands, 16px radius, 1px hairline, whisper shadow; **hover = subtle lift + image zoom** (tour card, §6).
- **Eyebrow → Heading → body** section header pattern: small lagoon-deep uppercase eyebrow above a Fraunces heading (echoes Going's "Feature Section Heading" + Hyer's hairline-above-title).
- **Trust furniture** (from Going): trust strip under hero (Licensed · IATA · Since 2019 · WhatsApp), badges, testimonial cards, avatar/stars.
- **Photography-led**: every section frames imagery; placeholder slots are correctly-sized gradient blocks with descriptive alt (see `IMAGE-SHOTLIST.md`, Phase 6).
- **No heavy shadows, no template chrome.** Elevation via surface color first.

---

## 6. Self-critique (against the examples, before building)

- **Am I copying, or learning the language?** Learning. I took the *system* (single-accent discipline, surface rhythm, editorial type, flat elevation, 1200/80) and rebuilt it natively in the client's ocean palette — not lifting Hyer's clay or Going's iris.
- **Is the serif departure justified?** Yes — it directly serves the client's stated "premium travel *publication*" goal, and the examples' real lesson is *editorial discipline*, which a serif-display/sans pairing expresses more, not less. Risk: Fraunces can feel trendy if over-bold — mitigated by keeping it ≤600 weight and letting whitespace carry it. **Flag for user sign-off.**
- **Contrast risk (gold).** The client already warned gold-on-white is weak. Encoded as a hard rule in §3 rather than discovered late.
- **Warmth vs. premium tension.** Going is warm but can read cheap; Hyer is premium but cold. Target sits between: white canvas + ocean ink + *sparing* gold + one warm sand band. Warmth comes from photography and Fraunces, not from loud color.
- **Does the signature stay disciplined?** It's one gradient token + one wave component + one active-underline treatment. If it starts appearing everywhere in build, cut it back — noted.
- **Open risk:** real photography will make or break this photography-led system; until client images arrive, placeholder gradients must still look intentional (see shotlist).

---

## Design Log
- **2026-07-15** — Phase 1 complete. Analysed both examples; defined the token system, Fraunces+Inter pairing, and the "Lagoon Line" signature above. Tech decision: **Next.js 15 (App Router) + Tailwind v4** (`@theme`, matching the examples' token syntax).
- **2026-07-15** — Typography **confirmed by client: Fraunces + Inter.**
- **2026-07-15** — Phases 2–7 built. Foundation (tokens, shell, content layer), all pages (Home, /tours, tour detail, quote flow, 4 service landings, About, FAQ, Contact, legal), SEO (JSON-LD, sitemap, robots, OG image, manifest), and handover docs. 28 routes, static-first; ~102 kB shared JS; FAQ uses zero-JS `<details>`.
- **2026-07-15** — **A11y contrast audit** (computed WCAG ratios on all key pairings). Two colours failed AA for small text and were darkened: `lagoon-deep` #00997F → **#008068**; `gold-ink` #8A6D18 → **#7F6417**. Everything else (ink 14.9:1, muted 5.7:1, ocean 6.1:1, ink-on-gold 6.7:1, white-on-ocean 6.1:1) passes. The client's own note about gold-on-white was the tell — gold is only ever a fill behind ink text or a darkened text shade, never raw gold text.
- **2026-07-15** — Runtime smoke test: all 18 checked routes 200 (404 works), correct content-types (OG=png, sitemap=xml), exactly one H1/page, JSON-LD present (TravelAgency/WebSite/TouristTrip/FAQPage/BreadcrumbList), quote API returns ok/400, form prefill from `?service=&item=` works.
- **2026-08-04** — **Cinematic hero + motion pass** (UI/UX-only session; no business logic touched).
  - **First real photograph wired**: `public/images/le-morne-photo.jpg` (512×512 aerial of Le Morne Brabant). Composition analysed from pixel data: open sky upper-left, summit top edge y≈46–75, left cliff edge (300,80)→(235,200), treeline y≈245, lagoon lower-left.
  - **Home hero rebuilt** around that composition: full-viewport photo, text anchored bottom-left over treeline/lagoon (sky and Le Morne stay clear), masked-line headline reveal (Fraunces italic gold-soft accent line), staggered fades, light bottom/left scrims, film-grain overlay (also masks the 512px upscale), Ken Burns settle.
  - **Aircraft sequence**: an SVG airliner flies a fixed path *in image coordinates* (`HeroScene` reproduces object-cover math, so the route is identical at every aspect ratio) — enters the open sky high-left ~1.8s in, descends on a shallow approach over ~9.5s and disappears **behind Le Morne's cliff** via `le-morne-ridge.png`, a column-scanned sky-boundary cutout of the photo layered above the plane. No JS / no `offset-path` support / reduced motion → no plane; hero stands alone.
  - **Header**: on Home it now overlays the photograph (transparent, white text) and becomes the white bar after ~55vh; active links carry a lagoon-line underline.
  - **Motion system**: strong easing tokens (`--ease-out-quart`, `--ease-in-out-strong`), one quiet site-wide scroll-reveal primitive (`Reveal`, fade + 18px rise, once; applied to section headers, featured grid, tour galleries), button/chip press feedback (`active:scale-0.98`), slower photographic card zoom.
  - **Featured tours**: asymmetric editorial grid (cover-story lead card — the tour with real photography — + supporting cards) replacing the equal 3-column row. `TourCard` gained a `feature` variant.
  - **Also**: `/tours` PageHeader uses the real photo with a lighter, text-side-only scrim; `ImageSlot` gained `position` for art-directed crops; mobile sticky tour CTA slides in after 320px scroll instead of sitting over the header; Fraunces italic style loaded.
- **2026-08-04** — **Visual QA round** (headless-Chromium screenshots at 1440×900 and 390×844, timed frames through the flight). Five bugs found and fixed:
  1. **`SmartImage` cover mode was invisible — pre-existing repo bug.** The root div combined `relative` (always) with `absolute inset-0` (cover); both display in the compiled CSS and stylesheet order made `relative` win, collapsing every cover-mode image/placeholder (tour cards, PageHeader) to zero height. Fix: apply `relative` only when not `cover`. Rule of thumb for this codebase: never emit two conflicting position utilities and rely on class order.
  2. `HeroScene` returned `null` until measured, but the measuring effect needed the ref'd element — so the aircraft never mounted. The wrapper now renders unconditionally (hidden until geometry exists).
  3. The original flight path (image y≈118→200) crossed straight through the headline block at wide crops. Re-routed through the sky corridor between nav and headline: `M -70 70 C 60 76, 150 82, 240 96 C 272 104, 304 114, 348 128`, occluding into the upper cliff (ridge boundary y=104 at x=288). Verified frame-by-frame: cruise above the eyebrow, dip, vanish behind the cliff with only the contrail lingering.
  4. `ReefWave` painted behind PageHeader's now-absolute photo (static vs positioned stacking) — root is now `relative`.
  5. Mobile header: the "Plan My Holiday" button's own `inline-flex` overrode its `hidden` class (same conflict family as #1) so it crowded the logo into a three-line wrap at 390px. Visibility moved to a `hidden sm:block` wrapper; wordmark lines set `whitespace-nowrap`.
- **2026-08-04** — **Category quick-nav + hero sharpness** (client feedback round).
  - **`CategoryCards`**: compact card-per-category nav directly below the hero (Tours, Transfers, Packages, Air Ticketing, Hotels), sourced from `content/services.ts` so categories stay in one place. Current design language: white cards, hairline, whisper shadow, icon tile that fills ocean on hover, arrow slide-in, press feedback, staggered reveal. Semantic `<nav aria-label="Booking categories">`.
  - **Hero blur diagnosed**: the source photo is 512×512 shown full-bleed, so browsers upscaled it ~3× with bilinear filtering; the 512px ridge matte PNG compounded it. Fix: (1) `le-morne-photo.jpg` regenerated as a 1536×1536 HighQualityBicubic upscale with a mild unsharp pass (amount 0.35), JPEG q88 — next/image now serves properly sized variants instead of stretching 512px; (2) the raster matte was **replaced by `.hero-sky-clip`**, a CSS polygon of the sky region traced from the ridge pixel profile (8px sampling) — resolution-independent occlusion, crisper edge, and 219KB of PNG deleted; (3) film grain lowered 0.06 → 0.045 now that it no longer needs to mask upscaling. No CSS blur existed; `object-fit: cover` sizing was already correct. True sharpness beyond this needs a higher-resolution original from the client (flagged in IMAGE-SHOTLIST terms: hero wants ≥2400px on the long edge).

### Self-critique after build (against the "best tour operator site in Mauritius" bar)
- **Photography risk still open.** The system is photography-led; branded gradient placeholders look intentional, but the site only reaches its ceiling once real Mauritius photos land (see `IMAGE-SHOTLIST.md`). This is the #1 thing to close.
- **Signature stayed disciplined.** The Lagoon Line appears as: the header ribbon, section eyebrows, the reef-wave band transitions, hero accent text, and placeholder wave texture — one gradient token + one wave component, not scattered ornament.
- **Single-accent discipline held.** Gold is the only chromatic CTA fill; secondary actions are ocean outlines; WhatsApp green is the one intentional utility exception.
- **Trust everywhere.** Licensed/IATA/2019/WhatsApp strip under hero + footer + booking cards; testimonials honestly marked SAMPLE; no fabricated awards, counts or claims.
