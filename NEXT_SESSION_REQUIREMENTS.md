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

### 1.2 ⬜ The real tour list
- **Needed for:** the tour cards, the tour detail pages, the "Which tour?" list in the hero planner
  and the search-engine listings. Everything shown today is realistic **placeholder** inventory
  (8 items marked *draft*).
- **What to send (per tour):** name · short one-line hook · 3–5 sentence description ·
  duration (e.g. "Full day, about 8 hours") · region · private / small-group ·
  what is **included** · what is **excluded** · itinerary stops in order (name + one line each) ·
  any fixed operating days.
- **Format:** a Word/Google Doc or a spreadsheet, one tour per row/section is perfect.
- **Where it is used:** `content/tours.ts` (I do the typing; you only need to send the content).

### 1.3 ⬜ Starting prices and the currency to display
- **Needed for:** "From €XX" on every tour card, the tour pages and the packages page. All prices
  shown today are **placeholders** and are labelled as such in the code.
- **What to send:** the starting price for each tour / the package / the airport transfer, whether
  it is per person or per vehicle, and the currency you want shown (EUR, USD or MUR).
- **Where it is used:** `content/tours.ts` and `content/site.ts`.

### 1.4 ⬜ Photographs (the single biggest upgrade left)
- **Needed for:** every image slot except one. Today only the Le Morne aerial is a real photo
  (home hero, /tours header, South tour). Every other card and page shows a branded gradient
  placeholder. The site is designed to be photography-led, so this is what makes it feel finished.
- **What to send:** see the full, slot-by-slot brief in `IMAGE-SHOTLIST.md`. Priorities:
  1. **Home hero photo** (new shape since 18 Aug): a photo that works as a **near-square crop with
     the subject on the right-hand side** (the left third fades into the page). Ideal: an aerial or
     wide shot of lagoon + mountain/resort, **at least 2000px on the long edge**. The current Le
     Morne image is an upscaled 512px original and is the weakest asset on the page.
  2. **One landscape photo per tour** (min 1600×1200, JPG or WebP) for the cards and detail pages.
  3. Airport transfer vehicle, packages/resort, and one team/guide photo for the About page.
- **Rights:** your own photos, or stock you have licensed. Please tell me which is which.
- **Where it is used:** `/public/images` + the `src` field on each slot in `content/*`.

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

---

## 2. Required before launch

### 2.1 ⬜ Logo and brand assets
- **Needed for:** the header, footer, browser tab icon and the image shown when a link is shared on
  WhatsApp/Facebook. Today a placeholder compass wordmark is used.
- **What to send:** the logo as SVG (best) or a large transparent PNG; any brand colour codes or a
  brand guide if one exists.
- **Where it is used:** `components/ui/Logo.tsx`, `app/icon.svg`, `app/opengraph-image.tsx`.

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

### 2.9 ⬜ Domain and hosting
- **Needed for:** going live, correct links in search results and share previews.
- **What I need to know:** the domain name you own (or want to buy), and whether you want me to
  host on **Cloudflare** (the project already contains a Cloudflare Workers configuration) or
  **Vercel** (simplest for Next.js). Both have free tiers suitable for this site.
- **What to send:** domain name + registrar login *or* an invitation for me to manage DNS; the
  choice of host.
- **Where it is used:** environment variable `NEXT_PUBLIC_SITE_URL`, deploy config.

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

---

*Related files for developers:* `HANDOVER.md` (technical state and where things live in code),
`PENDING-CLARIFICATIONS.md` (original question log), `IMAGE-SHOTLIST.md` (photo brief),
`SEO-NOTES.md` (post-launch playbook).
