import { Section, SectionHeader } from "@/components/ui/Section";
import { TourCard } from "@/components/cards/TourCard";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { getFeatured } from "@/lib/products";
import { copy } from "@/content/copy";

/**
 * Editorial, asymmetric grid instead of equal columns: one cover-story card
 * (a tour with real photography leads when available) with the rest arranged
 * around it. Cards cascade in with a short stagger as the section scrolls in.
 */
export function FeaturedTours() {
  const tours = [...getFeatured(6)].sort(
    (a, b) => Number(Boolean(b.hero.src)) - Number(Boolean(a.hero.src)),
  );
  const [lead, ...rest] = tours;

  return (
    <Section surface="canvas" waveInto="lagoon-mist">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            align="left"
            eyebrow={copy.home.featured.eyebrow}
            title={copy.home.featured.title}
            subtitle={copy.home.featured.subtitle}
            className="md:max-w-2xl"
          />
          <Button href="/tours" variant="secondary" icon="arrow-right" className="shrink-0">
            View all tours
          </Button>
        </div>

        {lead ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Reveal className="sm:col-span-2 lg:row-span-2">
              <TourCard product={lead} variant="feature" className="h-full" />
            </Reveal>
            {rest.map((tour, i) => (
              <Reveal key={tour.slug} delay={(i + 1) * 70}>
                <TourCard product={tour} className="h-full" />
              </Reveal>
            ))}
          </div>
        ) : null}

        <p className="text-sm text-muted">
          Prices shown are indicative starting prices while we finalize our published rates.
          Every trip is quoted individually —{" "}
          <a
            href="/contact"
            className="font-semibold text-ocean underline-offset-2 hover:underline"
          >
            request your personalized quote
          </a>
          .
        </p>
      </div>
    </Section>
  );
}
