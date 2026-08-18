import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ArrowCircle } from "@/components/ui/ArrowCircle";
import { TrustStrip } from "@/components/ui/TrustStrip";
import { HeroPlanner } from "@/components/home/HeroPlanner";
import { getTours, getByType } from "@/lib/products";
import { copy } from "@/content/copy";

/**
 * Home hero — light, airy "floating card" composition (NOTES.md, 2026-08-18):
 * a rounded, inset panel on the white canvas with a soft lagoon-mist gradient;
 * headline + supporting copy + CTA pair on the left; the photograph fills the
 * right half on large screens and dissolves into the gradient (on small
 * screens it becomes an inset panel under the copy); the trip planner overlaps
 * the card's bottom edge and leads into the featured tours.
 *
 * Motion: the photograph settles (Ken Burns), headline lines rise out of their
 * masks, then copy → CTAs → planner fade up in sequence. Reduced-motion users
 * see everything immediately (globals.css).
 */
export function Hero() {
  const { hero } = copy.home;
  const tourOptions = getTours().map((t) => ({ label: t.title, value: t.slug }));
  const packageOptions = getByType("package").map((p) => ({ label: p.title, value: p.slug }));

  return (
    <section className="relative bg-white">
      {/* ---- Floating hero card ---- */}
      <div className="px-2 pt-2 sm:px-3 sm:pt-3 md:px-5 md:pt-4">
        <div className="hero-card relative isolate overflow-hidden rounded-[28px] md:rounded-[36px]">
          {/* Copy column */}
          <div className="container-page pt-28 md:pt-32 lg:pb-52 lg:pt-40">
            <div className="relative z-10 lg:max-w-[52%]">
              <span className="hero-fade eyebrow" style={{ animationDelay: "350ms" }}>
                <span
                  aria-hidden
                  className="h-px w-6 rounded-full"
                  style={{ backgroundImage: "var(--gradient-lagoon-line)" }}
                />
                {hero.eyebrow}
              </span>

              <h1 className="mt-5 text-[2.6rem] font-medium leading-[1.04] text-ink sm:text-[3.4rem] md:text-6xl md:leading-[1.02] lg:text-[3.5rem] xl:text-[3.9rem]">
                <span className="hero-line">
                  <span className="hero-line-inner" style={{ animationDelay: "550ms" }}>
                    {hero.title}
                  </span>
                </span>
                <span className="hero-line">
                  <span
                    className="hero-line-inner font-display italic text-ocean"
                    style={{ animationDelay: "700ms" }}
                  >
                    {hero.titleAccent}
                  </span>
                </span>
              </h1>

              <p
                className="hero-fade mt-6 max-w-[34rem] text-[1.05rem] leading-relaxed text-muted md:text-lg"
                style={{ animationDelay: "950ms" }}
              >
                {hero.subtitle}
              </p>

              <div
                className="hero-fade mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
                style={{ animationDelay: "1100ms" }}
              >
                <span className="inline-flex items-center gap-2">
                  <Button href="/tours" size="lg">
                    {copy.ctas.exploreTours}
                  </Button>
                  <ArrowCircle href="/tours" size="lg" />
                </span>
                <Button href="/contact" variant="ghost" size="lg" icon="arrow-right">
                  {copy.ctas.planHoliday}
                </Button>
              </div>
            </div>
          </div>

          {/* Photograph — inset panel under the copy on small screens; on large
              screens the wrapper dissolves (lg:contents) and the photo pins to
              the card's right half, masked into the gradient. */}
          <div className="container-page pb-28 lg:contents">
            <div
              className="hero-fade relative mt-10 aspect-[16/10] overflow-hidden rounded-[22px] shadow-float sm:aspect-[2/1] lg:hero-photo-mask lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:aspect-auto lg:w-[52%] lg:rounded-none lg:shadow-none"
              style={{ animationDelay: "150ms" }}
            >
              <div className="hero-kenburns absolute inset-0">
                <Image
                  src="/images/le-morne-photo.jpg"
                  alt="Le Morne Brabant rising over a turquoise lagoon, white-sand beach and palm forest in south-west Mauritius"
                  fill
                  priority
                  quality={88}
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover object-[55%_35%] lg:object-[62%_30%]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Trip planner: overlaps the card's bottom edge ---- */}
      <div className="container-page relative z-10 -mt-20 lg:-mt-32">
        <HeroPlanner tourOptions={tourOptions} packageOptions={packageOptions} />
      </div>

      {/* ---- Trust furniture, quiet ---- */}
      <div className="container-page pt-7 md:pt-9">
        <TrustStrip variant="bar" />
      </div>
    </section>
  );
}
