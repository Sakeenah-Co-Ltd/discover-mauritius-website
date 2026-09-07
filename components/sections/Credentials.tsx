import { Section, SectionHeader } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/content/site";
import { copy } from "@/content/copy";
import { GUIDE_LANGUAGES } from "@/content/tours";
import type { IconName, Surface } from "@/lib/types";

/**
 * Verifiable credentials, standing where the sample testimonials used to (brief §10, Pending #4).
 *
 * The testimonials this replaced were invented placeholders. Rather than dress them up as
 * anonymous guest reviews — which would be a fabricated review on a commercial site — this band
 * does the same reassurance job using only facts already in `content/site.ts` and
 * `content/tours.ts`. Every claim here is checkable: the company is registered, the IATA
 * accreditation is independently verifiable, the languages are the ones the guides actually speak
 * and the pricing model is the one the tour pages quote.
 *
 * `WhyUs` answers "why choose us" qualitatively; this answers "who is actually taking my money"
 * with specifics, so the two do not overlap.
 *
 * When the client supplies real reviews (§2.4), `Testimonials` is still in the repo and can be
 * restored alongside this section — they are complementary, not alternatives.
 */

const facts: { icon: IconName; label: string; detail: string }[] = [
  {
    icon: "shield",
    label: "Licensed tour operator",
    detail: "Registered and licensed to operate tours in Mauritius.",
  },
  {
    icon: "iata",
    label: "IATA accredited",
    detail: "An accredited agency for international and regional air ticketing.",
  },
  {
    icon: "globe",
    label: `${GUIDE_LANGUAGES.length} guide languages`,
    detail: GUIDE_LANGUAGES.join(", ").replace(/, ([^,]*)$/, " and $1") + ".",
  },
  {
    icon: "car",
    label: "Priced per vehicle",
    detail: "Tour and transfer prices are per vehicle, never per person.",
  },
];

export function Credentials({ waveInto }: { waveInto?: Surface }) {
  const { credentials } = copy.home;

  const registration: { term: string; value: string }[] = [
    { term: "Trading as", value: site.name },
    { term: "Director", value: site.director },
    { term: "Established", value: site.founded },
  ];

  return (
    <Section surface="sand-mist" waveInto={waveInto}>
      <div className="flex flex-col gap-12">
        <SectionHeader
          eyebrow={credentials.eyebrow}
          title={credentials.title}
          subtitle={credentials.subtitle}
        />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
          {/* The legal entity, stated plainly. */}
          <div className="flex h-full flex-col gap-6 rounded-card border border-hairline bg-white p-7 shadow-card md:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lagoon-mist text-ocean">
                <Icon name="shield" size={22} />
              </span>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-wider text-muted">Registered operator</p>
                <p className="truncate font-semibold text-ink">{site.legalName}</p>
              </div>
            </div>

            <dl className="flex flex-col gap-3 border-t border-hairline pt-5 text-sm">
              {registration.map((row) => (
                <div key={row.term} className="flex items-baseline justify-between gap-4">
                  <dt className="shrink-0 text-muted">{row.term}</dt>
                  <dd className="text-right font-medium text-ink">{row.value}</dd>
                </div>
              ))}
            </dl>

            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-ocean"
            >
              <Icon name="whatsapp" size={18} />
              Talk to us on WhatsApp
            </a>
          </div>

          {/* The checkable facts. */}
          <ul className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
            {facts.map((f) => (
              <li key={f.label} className="flex flex-col gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-ocean shadow-card">
                  <Icon name={f.icon} size={22} />
                </span>
                <h3 className="text-lg">{f.label}</h3>
                <p className="text-sm leading-relaxed text-muted">{f.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
