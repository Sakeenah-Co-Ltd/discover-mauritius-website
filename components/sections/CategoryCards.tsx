import Link from "next/link";
import { services } from "@/content/services";
import { Icon } from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Category quick-nav directly below the hero: one compact card per booking
 * category (tours, transfers, packages, ticketing, hotels), sourced from
 * content/services.ts so new categories appear automatically. Gets visitors
 * to the right funnel in one tap without competing with the featured grid
 * below it.
 */
export function CategoryCards() {
  return (
    <section className="bg-white">
      <nav aria-label="Booking categories" className="container-page pb-2 pt-10 md:pt-14">
        <Reveal className="flex flex-col gap-5">
          <Eyebrow>Start planning</Eyebrow>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-5">
            {services.map((s, i) => (
              <li
                key={s.slug}
                className={i === services.length - 1 ? "col-span-2 sm:col-span-1" : undefined}
              >
                <Link
                  href={s.href}
                  className="group flex h-full flex-col gap-3 rounded-card border border-hairline bg-white p-4 shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:border-ocean/30 hover:shadow-card-hover active:translate-y-0 active:scale-[0.99] md:p-5"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lagoon-mist text-ocean transition-colors duration-200 group-hover:bg-ocean group-hover:text-white">
                    <Icon name={s.icon} size={20} />
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="flex items-center gap-1.5 font-semibold leading-snug text-ink">
                      {s.name}
                      <Icon
                        name="arrow-right"
                        size={15}
                        className="shrink-0 -translate-x-1 text-ocean opacity-0 transition-all duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100"
                      />
                    </span>
                    <span className="hidden text-sm leading-snug text-muted sm:block">
                      {s.hook}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </nav>
    </section>
  );
}
