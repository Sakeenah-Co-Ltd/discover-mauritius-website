import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { TrustStrip } from "@/components/ui/TrustStrip";
import { HeroScene } from "@/components/home/HeroScene";
import { copy } from "@/content/copy";

/**
 * Cinematic opening built around le-morne-photo.jpg (see globals.css for the
 * composition notes). The sequence: photograph settles → eyebrow → headline
 * lines rise out of their masks → supporting copy and CTAs → the aircraft
 * crosses the open sky and disappears behind Le Morne. Text sits bottom-left
 * over the treeline/lagoon, so the sky — and the flight — stay unobstructed,
 * and Le Morne itself is never covered.
 */
export function Hero() {
  const { hero } = copy.home;
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink">
      {/* ---- Photograph + aircraft (share the Ken Burns settle) ---- */}
      <div className="hero-frame absolute inset-0">
        <div className="hero-kenburns absolute inset-0">
          <Image
            src="/images/le-morne-photo.jpg"
            alt="Le Morne Brabant rising over a turquoise lagoon, white-sand beach and palm forest in south-west Mauritius"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="hero-photo object-cover"
          />
          <HeroScene />
        </div>

        {/* Compositional scrims — kept light so the photograph stays the hero. */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-ink/50 to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-ink/80 via-ink/30 to-transparent"
        />
        <div
          aria-hidden
          className="hidden md:block absolute inset-y-0 left-0 w-[45%] bg-gradient-to-r from-ink/30 to-transparent"
        />
        <div aria-hidden className="hero-grain" />
      </div>

      {/* ---- Composition: text anchored bottom-left, sky left open ---- */}
      <div className="container-page relative mt-auto pb-20 pt-40 md:pb-24">
        <div className="max-w-[44rem]">
          <span
            className="hero-fade eyebrow text-lagoon"
            style={{ animationDelay: "400ms" }}
          >
            <span aria-hidden className="h-px w-6 rounded-full bg-lagoon" />
            {hero.eyebrow}
          </span>

          <h1 className="mt-5 font-medium text-white [text-shadow:0_1px_24px_rgba(14,42,56,0.35)] text-[2.6rem] leading-[1.04] sm:text-6xl md:text-[4.6rem] md:leading-[1.02] md:tracking-[-0.015em]">
            <span className="hero-line">
              <span className="hero-line-inner" style={{ animationDelay: "600ms" }}>
                {hero.title}
              </span>
            </span>
            <span className="hero-line">
              <span
                className="hero-line-inner font-display italic text-gold-soft"
                style={{ animationDelay: "760ms" }}
              >
                {hero.titleAccent}
              </span>
            </span>
          </h1>

          <p
            className="hero-fade mt-6 max-w-xl text-lg leading-relaxed text-white/90"
            style={{ animationDelay: "1000ms" }}
          >
            {hero.subtitle}
          </p>

          <div
            className="hero-fade mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "1200ms" }}
          >
            <Button href="/tours" size="lg" icon="arrow-right">
              {copy.ctas.exploreTours}
            </Button>
            <Button href="/contact" size="lg" variant="onDark">
              {copy.ctas.planHoliday}
            </Button>
          </div>

          <p
            className="hero-fade mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-white/80"
            style={{ animationDelay: "1400ms" }}
          >
            <Icon name="shield" size={15} className="text-lagoon" />
            Licensed Tour Operator
            <span aria-hidden className="text-white/35">·</span>
            IATA Accredited
            <span aria-hidden className="text-white/35">·</span>
            Since 2019
          </p>
        </div>
      </div>

      {/* Scroll cue — desktop only, appears after the text has landed. */}
      <div aria-hidden className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 md:block">
        <div
          className="hero-fade flex flex-col items-center gap-2"
          style={{ animationDelay: "2000ms" }}
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60">
            Scroll
          </span>
          <span className="h-10 w-px overflow-hidden bg-white/15">
            <span className="scroll-cue-line block h-full w-full bg-white/70" />
          </span>
        </div>
      </div>

      {/* Trust strip band under the hero */}
      <div className="relative border-t border-white/10 bg-white/95 backdrop-blur">
        <div className="container-page py-5">
          <TrustStrip variant="bar" />
        </div>
      </div>
    </section>
  );
}
