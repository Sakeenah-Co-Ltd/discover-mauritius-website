# What I still need from you — Discover Mauritius website

**Who this is for:** the site owner (not a developer).
**What it is:** the single, living checklist of everything the website still needs *from you*
(content, photos, decisions, approvals, accounts) before it can be finished and launched.
Each item says **what** is needed, **why**, **what to send**, and **where it will be used**.

**How this file is maintained:** every development session updates it. When you provide
something, the item is ticked and moved to the *Resolved* section at the bottom (never deleted),
so there is always a history of what was settled and when.

Legend: ⬜ waiting on you · 🟨 partly provided · ✅ resolved

---

## 1. Required before the next development step

These block real progress. Without them the next session can only polish placeholders.

### 1.1 ⬜ Approve (or change) the new home page hero
- **Needed for:** locking the visual direction so the rest of the site can be finished to match.
- **What was done:** on 18 Aug 2026 the home hero was rebuilt in the direction of your reference
  image (`template1.webp`): a light, rounded "floating card" with the headline on the left, the
  Le Morne photograph on the right, and a tabbed **trip planner** (Tours · Transfers · Packages ·
  Flights · Hotels) that overlaps the bottom edge and pre-fills the quote form.
- **Decisions I made that you should confirm or veto:**
  1. The aircraft flight animation from the previous hero was **retired** (the reference is calm
     and light; the plane no longer had a sky to fly through).
  2. The row of five category cards under the old hero was **replaced** by the planner tabs
     (same five categories, one tap less to start a quote).
  3. Buttons stay **gold** (your brand accent) rather than the black pills in the reference.
  4. The small line above the headline now shows your tagline **"Easy. Trusted. Affordable."**
     (previously it repeated the company name that is already in the logo).
  5. Card corners across the site were rounded slightly more (16px → 20px) so cards, planner and
     hero read as one family.
- **What to send:** "approved", or a short list of what to change (feel free to annotate a
  screenshot).
- **Where it is used:** home page only; interior page headers are unchanged.

### 1.2 🟨 The real tour list — *first four received, more promised*
- **What arrived (25 Aug 2026):** four PDFs, now live on the site exactly as written —
  *Discover Port Louis & the North of Mauritius*, *Seven Coloured Earth & South Coast Wonders*,
  *Vallée Advenature Park & the Wild South*, and the *Private Airport & Hotel Transfer*. Your
  descriptions, stop durations, inclusions and prices are used verbatim.
- **Still waiting on:** the rest of the tours you said you would prepare later that week, and the
  real five-day package (§2.10).
- **Three invented tours are still on the site** — *Île aux Cerfs Catamaran Day*, *Full-Island
  Private Day* and the *Five-Day Package*. They carry a visible "sample itinerary" banner. Tell me
  whether to **hide them now** (leaving three real tours) or **leave them until your next batch
  arrives**. My recommendation: hide them, so nothing invented sits beside your real products.
- **What to send (per remaining tour):** name · one-line hook · description · duration ·
  the stops in order with how long you spend at each · what is **included** / **excluded** ·
  the car and van price. The four PDFs you already sent are the perfect format — just more of those.
- **Where it is used:** `content/tours.ts` (I do the typing; you only send the content).

### 1.3 🟨 Starting prices and the currency to display — *answered for the first four*
- **What arrived:** your PDFs price **per vehicle in USD** — tours at **$84 a car (up to 3)** and
  **$125 a van (5 to 10)**, transfers at **$45 a car (up to 2)** and **$120 a van (up to 6)**.
- **What I changed as a result:** the whole site now displays **USD**, and every price is labelled
  *per vehicle, not per person*. Cards show "From $84 · per vehicle" and each tour page carries the
  full car/van table. This matters — the site previously implied per-person pricing, which would
  have made you look roughly three times more expensive than you are.
- **Please confirm:** (a) USD is the currency you want shown to visitors — I inferred it from the
  PDFs; if you would rather show EUR or MUR, say so and I will convert. (b) Prices for the
  remaining tours and the package when you send them.
- **Where it is used:** `content/tours.ts` and `content/site.ts`.

### 1.4 🟨 Photographs — *17 received and live; two problems to settle*
- **What arrived (25 Aug 2026):** 17 photos across five folders. All are now in the site — every
  tour card and the home page hero show real photography instead of a grey placeholder. That is a
  big visual step up, and it is what makes the site finally look like a real tour operator's.
- **Two things need your attention:**

  **⬜ 1. They are all too small.** The largest is 1585×792; a full-width hero really wants
  2400×1350. Nothing can be done in software about this — enlarging a small photo does not add
  detail, it just makes the softness bigger. On a modern phone or laptop these will look slightly
  fuzzy, most noticeably the big header images. Two are especially weak: the aerial beach shot
  (500×400) and the moored-catamarans shot (768×260, so letterboxed it crops badly). **If you have
  the originals these were made from, send those** — same pictures, full size, and the problem
  disappears.

  **⬜ 2. Where did they come from?** Several arrived with filenames that suggest they were saved
  from other websites rather than taken by you — two are called `images.jpeg` and `images (1).jpeg`
  (the name a browser gives a picture saved from Google Images), and others carry the resizing
  suffixes that website software adds. The park photos look like Vallée Advenature's own marketing
  shots, and one catamaran photo appears to belong to another operator. **Using another company's
  photographs on your commercial website is a copyright risk** — the usual outcome is a takedown
  demand or an invoice, and it is the kind of thing a competitor notices. Please confirm for each
  batch whether it is: (a) your own, (b) licensed stock you bought, or (c) supplied with written
  permission by the park/operator. Anything that is none of those should be replaced before launch.
  I have kept every original file, so swapping any of them out is quick.

- **Still wanted (see `IMAGE-SHOTLIST.md` for the full list):** Grand Bassin, Cap Malheureux church,
  the Central Market, the botanic garden, Gris Gris, an airport-transfer vehicle, a resort shot for
  the packages page, and one team or guide photo for the About page.
- **Rights:** your own photos, or stock you have licensed. Please tell me which is which.
- **Where it is used:** `/public/images/tours/` (one file per slot, named after the slot) and
  `/public/images/le-morne-aerial.jpg`, wired to the `src` field on each slot in `content/tours.ts`.

### 1.5 ⬜ Where quote requests should go
- **Needed for:** delivering the enquiries people submit through the "Get my quote" planner and
  the contact form. Right now a submission is **only logged on the server**; the visitor is offered
  WhatsApp/email fallbacks, so nothing is lost, but nothing reaches your inbox automatically.
- **What to send:** the email address that should receive quote requests (and whether WhatsApp
  delivery is wanted too), and permission to create a free transactional-email account (e.g.
  Resend) in the company's name **or** SMTP details for your existing mailbox
  (send credentials securely, never in chat).
- **Where it is used:** `app/api/quote/route.ts` (one marked TODO).

### 1.6 ⬜ Confirm the planner's fixed choices
- **Needed for:** the drop-downs in the hero planner that I had to invent sensibly.
- **What to confirm or edit:**
  - Transfers tab: *Airport → Hotel*, *Hotel → Airport*, *Round trip (both ways)*.
  - Hotels tab: *North / West / East / South coast*.
  - Whether "children" should have an age range note (e.g. under 12).
- **Where it is used:** `components/home/HeroPlanner.tsx` (small constants at the top of the file).

### 1.7 ⬜ Four small questions about the tours you sent
These are places where your PDFs were ambiguous. I made the safest choice in each case and noted it
here rather than guessing silently.

1. **How long is the Wild South tour?** The other two PDFs give a total ("5–6 hr", "6–7 hours") but
   the Vallée Advenature one does not. Its stops add up to about 5½ hours before driving time. The
   site currently says just **"Full day"** — tell me the real figure and I will use it.
2. **Does the Port Louis tour stop at Caudan Waterfront?** Your stop list includes it (30 minutes),
   but the numbered itinerary at the end of the PDF starts at the Craft Market and leaves it out.
   I have **included it**, as the fuller of the two lists.
3. **Is "Advenature" the spelling you want?** It appears that way throughout your PDF (the park's
   own name is *La Vallée des Couleurs Nature Park*). I have kept **your** spelling rather than
   silently renaming your product — confirm, or tell me what to use.
4. **Van capacity "5 to 10 people".** Shown as written. If a van genuinely seats up to 10, the site
   should probably say "up to 10" — confirm and I will simplify.

---

## 2. Required before launch

### 2.1 🟨 Logo and brand assets — *logo received and live; vector still wanted*
- **What arrived (25 Aug 2026):** `discover-mauritius-logo.jpg` — the **N.K. Taher Group** logo
  (the leaf-and-aircraft mark plus the "NK TAHER GROUP" wordmark) on a white background.
- **What I did:** removed the white background so the mark sits cleanly on photographs and on the
  dark footer, made a reversed white version for dark backgrounds, and used it for the header, the
  footer, the browser tab icon and the WhatsApp/Facebook share image.
- **One decision to confirm or veto:** the file you sent carries the words "NK Taher Group", not
  "Discover Mauritius". Rather than show two competing wordmarks, I used **your mark beside the
  "Discover Mauritius / by N.K. Taher Co Ltd" wordmark**. If you would prefer the full N.K. Taher
  lockup used on its own — dropping "Discover Mauritius" from the header — say so and I will switch.
- **Still worth sending:** the logo as **SVG** or a large **transparent PNG**. What I have is a
  1019×594 JPG, and no amount of processing makes a JPG as crisp as a vector on a modern screen.
- **Also useful:** your brand colour codes. The mark is dark green and lime; the site's accent is
  currently gold with an ocean-blue base. They coexist, but if you want the site restyled to the
  N.K. Taher greens, that is a design decision worth making deliberately — tell me and I will scope it.
- **Where it is used:** `components/ui/Logo.tsx`, `app/icon.png`, `app/opengraph-image.tsx`,
  `public/images/brand/`.

### 2.2 ⬜ Office address
- **Needed for:** the contact page map and the "LocalBusiness" data Google reads. Street line is
  currently "[Office address — to be supplied]".
- **What to send:** full postal address (and, if you want the map pin exact, a Google Maps link).
- **Where it is used:** `content/site.ts` (`address`).

### 2.3 ⬜ Confirm contact details
- **Needed for:** every phone/WhatsApp/email link on the site. Current values come from the
  discovery brief: **+230 5774 2612**, **info@nktahercoltd.com**.
- **What to send:** "correct", or the corrected numbers/addresses; and the exact **Facebook page
  URL** (today it is a search link for "Mauritius Tours with NK Taher"). Instagram/TripAdvisor URLs
  if you have them.
- **Where it is used:** `content/site.ts`.

### 2.4 ⬜ Real reviews
- **Needed for:** the testimonials section, which is clearly labelled **SAMPLE** until then.
- **What to send:** 3–6 genuine reviews (name or first name + country, the trip they took, the
  text, and where it was posted, e.g. Google/TripAdvisor). Only reviews you have permission to
  show.
- **Where it is used:** `content/testimonials.ts`.

### 2.5 ⬜ Certificates and licences
- **Needed for:** the three "Certificate — to be supplied" frames on the About page (Tourism
  Authority licence, IATA accreditation, company registration or similar).
- **What to send:** scans or photos (JPG/PNG/PDF), and confirmation you are happy to publish them.
- **Where it is used:** `/public/images` + `app/about/page.tsx`.

### 2.6 ⬜ Booking rules, cancellation policy, payment information
- **Needed for:** the FAQ, the terms page, and the "good to know" text on tour pages. Currently
  drafted assumptions marked *for client review*.
- **What to send (plain answers are fine):**
  - Is a deposit required to confirm? How much, and when is the balance due?
  - Accepted payment methods (bank transfer, card, cash on the day, PayPal…)?
  - Cancellation policy (e.g. free up to 48h before; 50% within 48h; no-show 100%)?
  - Weather / bad-sea policy for boat trips?
  - Child pricing rules, pickup areas covered, and any surcharges (night transfers, public holidays).
- **Where it is used:** `content/faqs.ts`, `app/terms/page.tsx`, tour pages.

### 2.7 ⬜ Approve the legal pages
- **Needed for:** publishing the Privacy Policy and Terms. Both are drafts and are hidden from
  search engines until approved. A professional review is recommended.
- **What to send:** approval, or edits.
- **Where it is used:** `app/privacy/page.tsx`, `app/terms/page.tsx`.

### 2.8 ⬜ Company story for the About page
- **Needed for:** the About page reads well but is generic. A short real story converts better.
- **What to send:** 1–2 paragraphs about how the company started (26 April 2019), the director
  (Nadiim Taher) and the team, and what you want travellers to feel.
- **Where it is used:** `app/about/page.tsx` copy.

### 2.9 🟨 Domain and hosting — *host and domain both settled; one step is yours*
- **Settled (25 Aug 2026):** hosting is **Cloudflare Workers**, deployed automatically. Every time
  the site is updated, it now rebuilds and goes live on its own — no manual step.
- **✅ Cloudflare keys are in place.** Both `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` were
  added on 25 Aug and the automated deploy has run green twice since. Nothing further needed.
- **✅ Domain bought (7 Sep 2026): `discover-mauritius.com`, registered at GoDaddy.** The apex is
  canonical; `www` permanently redirects to it. `NEXT_PUBLIC_SITE_URL` is set to
  `https://discover-mauritius.com`, and the redirect + Custom Domain attachment are in the repo.
- **⬜ One step only you can do — repoint the nameservers.** The domain is at GoDaddy but the site
  is on Cloudflare, so Cloudflare has to be given control of the DNS:
  1. **Cloudflare → Add a site → `discover-mauritius.com` → Free plan.** It will show you two
     nameservers.
  2. **GoDaddy → My Products → Domains → Domain Settings → Nameservers → Change → "I'll use my own
     nameservers"** → paste Cloudflare's two → Save.
  3. Once Cloudflare emails to say the zone is **active**, delete any leftover GoDaddy parking
     `A`/`CNAME` on the apex or `www` under **DNS → Records**, or the site's domain attachment will
     collide with them.
  This is **not** a domain transfer — registration and billing stay at GoDaddy, and there is no
  60-day lock or fee. Tell me when the zone is active and I will merge the branch that attaches it.
- **No email is affected.** The contact address stays `info@nktahercoltd.com`, on a different
  domain, so moving these nameservers cannot interrupt mail. If you later want an
  `@discover-mauritius.com` mailbox, Cloudflare does not sell those — buy them from GoDaddy, Google
  or Zoho and I will add the mail records.
- **One thing to remember at launch:** the site is deliberately **hidden from Google** while the
  content is unfinished (sample reviews, placeholder prices). That is one setting to flip when you
  are ready — I will do it, but ask me, because a site nobody can find is easy to forget about.
- **Where it is used:** `.github/workflows/deploy.yml`, `wrangler.jsonc` (`routes`),
  `next.config.mjs` (`redirects`), `content/site.ts`, `NEXT_PUBLIC_SITE_URL`,
  `NEXT_PUBLIC_ALLOW_INDEXING`.

### 2.10 ⬜ Five-day package details
- **Needed for:** the packages page currently shows an invented sample itinerary.
- **What to send:** the real day-by-day plan, what is included/excluded, hotel category, and the
  starting price.
- **Where it is used:** `content/tours.ts` (package entry) and `app/packages/page.tsx`.

---

## 3. Nice to have / future improvements

### 3.1 ⬜ Other languages
- French and/or Arabic versions for your target markets. The site is built so translations can be
  added without redesign. Tell me if and when you want this and I will scope it.

### 3.2 ⬜ Online payment for fixed-price transfers (phase 2)
- The transfer page is built so an instant-booking button can be added later. Needs a payment
  provider account (Stripe/PayPal/local bank gateway) opened in the company's name.

### 3.3 ⬜ Google Business Profile, Search Console, analytics
- Post-launch growth tasks; see `SEO-NOTES.md`. I will need you to accept an invitation to (or
  create) the Google Business Profile, and to grant access to Search Console once the domain is
  live.

### 3.4 ⬜ Verifiable trust numbers
- Only if true and checkable: number of travellers served, years of operation, review count and
  average rating. Nothing invented will be shown.

### 3.5 ⬜ Deadline / launch date
- None given so far. A target date lets me plan the remaining sessions.

---

## Resolved (history)

| Date | Item | Outcome |
|---|---|---|
| 2026-07-15 | Typography direction | ✅ Confirmed: Fraunces (headings) + Inter (body). |
| 2026-08-04 | First photograph | ✅ Le Morne aerial supplied (512px original, upscaled). Now used on home hero, /tours header, South tour. A higher-resolution original is still wanted (see 1.4). |
| 2026-08-18 | Hero visual reference | ✅ `template1.webp` supplied and implemented (see 1.1 for approval). |
| 2026-08-25 | First four real products | ✅ Three tours + the private transfer supplied as PDFs and typed into the site verbatim (see 1.2). |
| 2026-08-25 | Pricing model | ✅ Per **vehicle**, in **USD** — car and van rates for every product supplied. Site switched from per-person EUR placeholders (see 1.3). |
| 2026-08-25 | Guide languages | ✅ Hindi, Arabic, English, French and Urdu — now shown on every real tour page. |
| 2026-08-25 | Logo | ✅ N.K. Taher Group logo supplied as JPG, background removed, now used site-wide. Vector original still wanted (see 2.1). |
| 2026-08-25 | First photographs | ✅ 17 photos supplied and placed across the three real tours, the two remaining drafts and the home hero. Resolution and rights both still open (see 1.4). |

---

*Related files for developers:* `HANDOVER.md` (technical state and where things live in code),
`PENDING-CLARIFICATIONS.md` (original question log), `IMAGE-SHOTLIST.md` (photo brief),
`SEO-NOTES.md` (post-launch playbook).
