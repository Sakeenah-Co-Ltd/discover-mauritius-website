import { Section, SectionHeader } from "@/components/ui/Section";
import { Stars } from "@/components/ui/Stars";
import { Icon } from "@/components/ui/Icon";
import { testimonials } from "@/content/testimonials";
import { copy } from "@/content/copy";
import type { Surface } from "@/lib/types";

/**
 * PARKED — not rendered. `Credentials` occupies this slot on the home page until real
 * reviews arrive (§2.4). Do not re-add to `app/page.tsx` while the entries in
 * `content/testimonials.ts` are still the invented placeholders.
 *
 * SAMPLE testimonials, clearly labelled (brief §10, Pending #4).
 * A visible banner + per-card "SAMPLE" stamp make it unmistakable these are
 * placeholders, so nothing here reads as a fabricated genuine review.
 */
export function Testimonials({ waveInto }: { waveInto?: Surface }) {
  return (
    <Section surface="sand-mist" waveInto={waveInto}>
      <div className="flex flex-col gap-10">
        <SectionHeader
          eyebrow={copy.home.testimonials.eyebrow}
          title={copy.home.testimonials.title}
          subtitle={copy.home.testimonials.subtitle}
        />

        <div
          role="note"
          className="mx-auto flex items-center gap-2 rounded-full border border-gold/40 bg-white px-4 py-2 text-sm font-medium text-gold-ink"
        >
          <Icon name="sparkles" size={16} />
          Sample reviews — real, verified guest testimonials will replace these before launch.
        </div>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <li
              key={i}
              className="relative flex flex-col gap-4 rounded-card border border-hairline bg-white p-7 shadow-card"
            >
              <span className="absolute right-4 top-4 rounded-full bg-sand-mist px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-ink">
                Sample
              </span>
              <Stars rating={t.rating} />
              <blockquote className="leading-relaxed text-ink">“{t.quote}”</blockquote>
              <div className="mt-auto border-t border-hairline pt-4">
                <p className="text-sm font-semibold text-ink">{t.name}</p>
                <p className="text-sm text-muted">
                  {t.origin} · {t.trip}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
