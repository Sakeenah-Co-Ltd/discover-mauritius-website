# Image Shotlist — Discover Mauritius

**Purpose:** the complete brief of every photograph the website needs (Pending #3). Until real
photos arrive, each slot renders as an on-brand gradient placeholder sized correctly, with the
"intended subject" shown as a hint and used as the accessible alt text.

**How to supply:** drop files into `/public/images/...` and set the `src` on the matching slot in
`/content/*` (e.g. `hero.src = "/images/tours/south-hero.jpg"`). `<SmartImage>` then swaps the
placeholder for an optimized `next/image` automatically — no code changes.

**Naming convention:** one file per slot, named for the slot id —
`/public/images/tours/<slot-id>.jpg`. The one image shared across several slots (the Le Morne
aerial, used by the home hero, the /tours header and the Wild South tour) sits at
`/public/images/le-morne-aerial.jpg`. Everything the site uses lives in this repository; nothing is
referenced from a folder outside it.

> ⚠️ **Every photo supplied on 25 Aug 2026 is below the minimum resolution in the table below** —
> the largest is 1585×792 against a 2400×1350 target for a hero. They are in use because they beat
> a grey placeholder, but each will look soft on a modern screen and the heroes are the worst
> affected. Replacing them with high-resolution originals is still the biggest single upgrade left.
> Provenance also needs settling before launch — see Requirements §1.4.

**Format guidance**
- Prefer landscape/wide originals at high resolution; we generate responsive/AVIF/WebP sizes.
- Natural, warm colour treatment (no heavy filters/duotone). Real Mauritius locations only.
- Avoid text in images. Leave some "quiet" area in hero shots for headline overlay.
- Licensing: client's own photography preferred; otherwise correctly licensed stock (never scraped).

**Orientation → minimum resolution**
| Orientation | Ratio | Min resolution |
|---|---|---|
| Wide (hero, full-bleed) | 16:9 | 2400 × 1350 |
| Landscape | 4:3 | 1600 × 1200 |
| Portrait | 3:4 | 1200 × 1600 |
| Square | 1:1 | 1200 × 1200 |

---

## Global / page heroes
| Slot id | Page | Subject | Orientation |
|---|---|---|---|
| `home-hero` | Home | Aerial: turquoise lagoon meeting white sand + green mountains. **Since 2026-08-18 the hero shows this as a near-square right-half inset on desktop (left third fades out) and a 16:10 panel on mobile — keep the subject on the right, low detail on the left, ≥2000px long edge** | Square-ish / wide (both crops must work) |
| `tours-hero` | /tours | Panoramic Mauritius coastline, lagoon + peaks | Wide |
| `transfers-hero` | /airport-transfers | Clean A/C vehicle on a scenic coastal road at sunrise | Wide |
| `packages-hero` | /packages | Beachfront resort + lagoon at golden hour | Wide |
| `air-hero` | /air-ticketing | Aircraft wing above the clouds en route to Mauritius | Wide |
| `hotel-hero` | /hotel-booking | Infinity pool + palm-lined beach at a resort | Wide |
| `about-hero` | /about | Local guide looking out over a lagoon at golden hour | Wide |
| `about-story` | /about | The team welcoming travellers to the island | Landscape |

## Tour: Seven Coloured Earth & South Coast Wonders *(real product)*
| Slot id | Subject | Orientation | Status |
|---|---|---|---|
| `south-chamarel-hero` | Coloured earth dunes and viewing platform, Chamarel | Wide | ✅ 1585×792 *(target 2400×1350)* |
| `south-chamarel-aerial` | Aerial of the undulating coloured strips | Landscape | ✅ 1200×628 |
| `south-chamarel-dunes` | The dunes and viewing pavilion from above | Landscape | ✅ 800×530 |
| `south-grand-bassin` | Sacred lake of Grand Bassin with temple statues | Landscape | ⬜ |
| *(also wanted)* | Alexandra Falls; Trou aux Cerfs crater; Black River Gorges viewpoint; Le Port ship models | — | ⬜ |

## Tour: Discover Port Louis & the North of Mauritius *(real product)*
| Slot id | Subject | Orientation | Status |
|---|---|---|---|
| `north-pereybere-hero` | Pereybere beach, Coin de Mire on the horizon | Wide | ✅ 1024×681 *(target 2400×1350)* |
| `north-caudan-waterfront` | The colonial waterfront building at Le Caudan | Landscape | ✅ 719×480 |
| `north-coin-de-mire` | Catamarans moored off a northern beach | Landscape | ✅ 768×260 — very letterboxed, crops hard |
| `north-beach-aerial` | Aerial of a palm-lined beach and jetty | Landscape | ✅ 500×400 — **lowest resolution on the site** |
| `north-central-market` | Spice and fruit stalls at the Central Market | Landscape | ⬜ |
| *(also wanted)* | Cap Malheureux red-roofed church; SSR Botanic Garden; Château de Labourdonnais; Fort Adelaide | — | ⬜ |

## Tour: Vallée Advenature Park & the Wild South *(real product)*
| Slot id | Subject | Orientation | Status |
|---|---|---|---|
| `south-le-morne-hero` | Le Morne aerial with the "underwater waterfall" | Wide | ✅ 900×600 *(shared: also home hero + /tours header)* |
| `wild-south-luge` | Luge karts on the track at the park | Landscape | ✅ 1520×900 |
| `wild-south-zipline` | Bicycle zipline above the trees | Landscape | ✅ 640×320 |
| `wild-south-nepalese-bridge` | A family crossing the suspension bridge | Landscape | ✅ 640×320 |
| `wild-south-maconde` | The coastal road curving around Maconde rock | Landscape | ✅ 1024×512 |
| *(also wanted)* | Gris Gris cliffs; Rivière des Galets pebble shore | — | ⬜ |

## Tour: Île aux Cerfs Catamaran Day *(still `draft` — but the client sent photos for it)*
| Slot id | Subject | Orientation | Status |
|---|---|---|---|
| `ile-aux-cerfs-hero` | Catamaran under full sail on the lagoon | Wide | ✅ 720×479 |
| `cerfs-catamaran` | Catamaran anchored off a white-sand islet | Square | ✅ 1080×1080 |
| `cerfs-bbq` | Barbecue lunch cooking on board | Landscape | ✅ 640×320 |
| `cerfs-grse-waterfall` | Grand River South East waterfall meeting the sea | Landscape | ⬜ |

## Tour: Full-Island Private Day *(still `draft` — but the client sent photos for it)*
| Slot id | Subject | Orientation | Status |
|---|---|---|---|
| `full-island-hero` | Coastal road along the shoreline, mountains inland | Wide | ⬜ |
| `island-beach` | Swimmers in shallow turquoise water | Landscape | ✅ 856×590 |
| `island-mountain` | Le Morne Brabant above the lagoon | Portrait | ✅ *(reuses the shared Le Morne aerial)* |
| `island-food` | Street vendor selling fried Mauritian snacks | Square | ✅ 800×800 |

## Product: Five-Day Mauritius Package
| Slot id | Subject | Orientation |
|---|---|---|
| `package-hero` | Resort infinity pool overlooking a lagoon at sunset | Wide |
| `package-resort` | Beachfront resort and palm trees on the coast | Landscape |
| `package-tour` | Guide + travellers at a scenic viewpoint | Landscape |
| `package-catamaran` | Catamaran sailing on a calm turquoise lagoon | Portrait |

## Product: Private Airport & Hotel Transfer *(real product)*
| Slot id | Subject | Orientation |
|---|---|---|
| `transfer-hero` | Clean A/C transfer vehicle on a coastal road | Wide |
| `transfer-meet` | Driver holding a name board in arrivals | Landscape |
| `transfer-interior` | Comfortable A/C vehicle interior | Square |

---

### Also worth supplying (not yet slotted in code)
- **Logo in vector** — the N.K. Taher mark is now live, keyed from the supplied JPG. An SVG or
  large transparent PNG original would render crisper at every size (see Requirements §2.1).
- **Certificates** (Pending #7) — Tour Operator Licence, IATA Accreditation, Company Registration
  (scans/photos) for the About page frames.
- **Team / guide photos** — optional, to add real guide profiles on About later.
- **Real guest photos** — only if reviewers consent, for testimonials (Pending #4).
