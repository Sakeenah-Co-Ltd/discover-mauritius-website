# PENDING-CLARIFICATIONS

> **Superseded (2026-08-18):** the live, prioritised checklist of everything still needed from the
> client is now **`NEXT_SESSION_REQUIREMENTS.md`**. This file is kept as the original question log.

Open questions awaiting answers from the client. **The build proceeds now with clearly-marked
placeholders**; real content swaps in later without touching components (typed content + copy layers).
Every placeholder is cross-referenced in `HANDOVER.md` (Phase 7).

| # | Item | Status | Impact on build |
|---|------|--------|-----------------|
| 1 | **Bookings & payments approach** — quote-first confirmed by us; awaiting client's confirmation. Possible phase 2: online payment for fixed-price airport transfers. | ⏳ Asked by email | Build quote flow only; architect transfer page so instant booking can be added later |
| 2 | **Real tour list** — names, durations, starting prices, inclusions | ⏳ Asked by email | All tours are `draft: true` placeholders with `PLACEHOLDER` prices |
| 3 | **Photos** — own photos of tours, vehicles, guides; else licensed stock | ⏳ Asked by email | Placeholder image slots + `IMAGE-SHOTLIST.md` |
| 4 | **Reviews** — Google / TripAdvisor / Facebook reviews to feature | ⏳ Asked by email | Testimonials marked `[SAMPLE]` |
| 5 | **Domain & hosting** — ownership unknown (form Q46–47 unanswered) | ⏳ Asked by email | Deploy-agnostic build; recommend Vercel |
| 6 | **Deadline** — none given | ⏳ Asked by email | — |
| 7 | **Certificates** — client says he has them; files not yet received | Not yet requested | Placeholder frames on About |
| 8 | **Google Business Profile** — client "not sure" if one exists | Post-launch task | Covered in `SEO-NOTES.md` |
| 9 | **Legal copy** — privacy policy + booking/cancellation terms need client approval | Not yet requested | Draft placeholders marked for approval |
| 10 | **Languages** — French / Arabic for target markets (Saudi, Europe)? | Not yet asked | English-only launch; copy layer kept i18n-ready |
| 11 | **Starting-price currency** — EUR, USD, or MUR? Audience is multi-market | Not yet asked | Default EUR placeholder |
| 12 | **Logo** — none mentioned in discovery | Not yet asked | Design a simple wordmark placeholder |

## Decisions made by us (pending client veto, not blocking)
- **Typography:** Fraunces (display serif) + Inter (body) — premium travel-publication pairing. See `NOTES.md §3`.
- **Signature element:** "The Lagoon Line" ocean→lagoon→sand gradient + reef-wave dividers. See `NOTES.md §4`.
- **Stack:** Next.js 15 (App Router, static-first) + Tailwind v4. Recommend Vercel hosting.
- **Currency:** EUR placeholder shown as "From €XX" until client confirms (#11).
