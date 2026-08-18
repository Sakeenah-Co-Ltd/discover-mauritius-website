# Image Shotlist — Discover Mauritius

**Purpose:** the complete brief of every photograph the website needs (Pending #3). Until real
photos arrive, each slot renders as an on-brand gradient placeholder sized correctly, with the
"intended subject" shown as a hint and used as the accessible alt text.

**How to supply:** drop files into `/public/images/...` and set the `src` on the matching slot in
`/content/*` (e.g. `hero.src = "/images/tours/south-hero.jpg"`). `<SmartImage>` then swaps the
placeholder for an optimized `next/image` automatically — no code changes.

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

## Tour: South Island Discovery
| Slot id | Subject | Orientation |
|---|---|---|
| `south-chamarel-hero` | Aerial of Seven Coloured Earths dunes, Chamarel | Wide |
| `south-grand-bassin` | Sacred lake of Grand Bassin with temple statues | Landscape |
| `south-chamarel-falls` | Chamarel Waterfall plunging into forested gorge | Portrait |
| `south-black-river-view` | Panorama over Black River Gorges NP | Landscape |

## Tour: North Island & Cap Malheureux
| Slot id | Subject | Orientation |
|---|---|---|
| `north-cap-malheureux-hero` | Red-roofed church, turquoise sea, northern islets | Wide |
| `north-pamplemousses` | Giant Victoria water lilies, Pamplemousses garden | Landscape |
| `north-grand-baie` | Boats moored in the turquoise bay at Grand Baie | Landscape |
| `north-coast` | Northern coastline at golden hour | Portrait |

## Tour: Île aux Cerfs Catamaran Day
| Slot id | Subject | Orientation |
|---|---|---|
| `ile-aux-cerfs-hero` | Catamaran over turquoise lagoon near Île aux Cerfs | Wide |
| `cerfs-beach` | White-sand beach + casuarina trees on the island | Landscape |
| `cerfs-snorkel` | Snorkeller above a coral garden in clear water | Portrait |
| `cerfs-grse-waterfall` | Grand River South East waterfall meeting the sea | Landscape |

## Tour: Port Louis Cultural & Market
| Slot id | Subject | Orientation |
|---|---|---|
| `port-louis-hero` | Port Louis harbour + Caudan Waterfront + mountains | Wide |
| `pl-market` | Colourful spice/produce stalls in Central Market | Portrait |
| `pl-aapravasi` | Stone steps of the Aapravasi Ghat (UNESCO) | Landscape |
| `pl-citadel` | View over Port Louis rooftops from Fort Adelaide | Landscape |

## Tour: Black River Gorges Nature & Hiking
| Slot id | Subject | Orientation |
|---|---|---|
| `black-river-hero` | Misty view over forested valleys of the national park | Wide |
| `brg-alexandra-falls` | Alexandra Falls cascading into deep green forest | Portrait |
| `brg-trail` | Walking trail through native ebony forest | Landscape |
| `brg-bird` | Endemic Mauritius kestrel on a branch | Square |

## Tour: Full-Island Private Day
| Slot id | Subject | Orientation |
|---|---|---|
| `full-island-hero` | Coastal road along the shoreline, mountains inland | Wide |
| `island-beach` | Empty white-sand beach with turquoise lagoon | Landscape |
| `island-mountain` | Le Morne Brabant rising above the lagoon | Portrait |
| `island-food` | Mauritian street food and tropical fruit | Square |

## Product: Five-Day Mauritius Package
| Slot id | Subject | Orientation |
|---|---|---|
| `package-hero` | Resort infinity pool overlooking a lagoon at sunset | Wide |
| `package-resort` | Beachfront resort and palm trees on the coast | Landscape |
| `package-tour` | Guide + travellers at a scenic viewpoint | Landscape |
| `package-catamaran` | Catamaran sailing on a calm turquoise lagoon | Portrait |

## Product: Private Airport Transfer
| Slot id | Subject | Orientation |
|---|---|---|
| `transfer-hero` | Clean A/C transfer vehicle on a coastal road | Wide |
| `transfer-meet` | Driver holding a name board in arrivals | Landscape |
| `transfer-interior` | Comfortable A/C vehicle interior | Square |

---

### Also worth supplying (not yet slotted in code)
- **Logo / wordmark** (Pending #12) — replaces the placeholder compass wordmark.
- **Certificates** (Pending #7) — Tour Operator Licence, IATA Accreditation, Company Registration
  (scans/photos) for the About page frames.
- **Team / guide photos** — optional, to add real guide profiles on About later.
- **Real guest photos** — only if reviewers consent, for testimonials (Pending #4).
