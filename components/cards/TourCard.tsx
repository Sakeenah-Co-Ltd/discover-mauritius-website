import Link from "next/link";
import type { Product } from "@/lib/types";
import { SmartImage } from "@/components/ui/SmartImage";
import { Icon } from "@/components/ui/Icon";
import { formatFromPrice } from "@/lib/products";
import { cn } from "@/lib/utils";

/**
 * Reusable tour card (brief §6): photo · title · duration badge · "From €XX" ·
 * one-line hook · Request Quote. Subtle hover lift + slow image zoom.
 * `variant="feature"` is the editorial cover-story treatment used for the
 * lead card in asymmetric grids: taller image, display-scale title.
 * Two distinct links (title→detail, CTA→quote) — no nested/stretched-link a11y traps.
 */
export function TourCard({
  product,
  className,
  variant = "default",
}: {
  product: Product;
  className?: string;
  variant?: "default" | "feature";
}) {
  const detailHref = `/tours/${product.slug}`;
  const quoteHref = `/contact?service=${product.productType}&item=${product.slug}`;
  const feature = variant === "feature";

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-card border border-hairline bg-white",
        "shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-card-hover",
        className,
      )}
    >
      <Link
        href={detailHref}
        className={cn("relative block overflow-hidden", feature && "lg:flex-1")}
        tabIndex={-1}
        aria-hidden="true"
      >
        <div
          className={cn(
            "relative overflow-hidden",
            feature ? "aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[22rem]" : "aspect-[4/3]",
          )}
        >
          <SmartImage
            slot={product.hero}
            cover
            rounded={false}
            className="transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.045]"
            sizes={
              feature
                ? "(max-width: 1024px) 100vw, 66vw"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            }
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
        </div>
        {/* duration badge */}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-ink shadow-card backdrop-blur">
          <Icon name="clock" size={13} className="text-ocean" />
          {product.duration.split(" · ")[0]}
        </span>
        {/* region chip */}
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-ink/55 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          <Icon name="map-pin" size={12} />
          {product.region}
        </span>
      </Link>

      <div className={cn("flex flex-1 flex-col gap-3 p-5", feature && "md:p-7")}>
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-lagoon-deep">
            {product.groupType}
          </span>
          <span
            className={cn("font-display font-medium text-ocean", feature ? "text-xl" : "text-lg")}
            title={product.priceNote}
          >
            {formatFromPrice(product)}
          </span>
        </div>

        <h3 className={cn("leading-snug", feature ? "text-2xl md:text-[1.75rem]" : "text-xl")}>
          <Link href={detailHref} className="transition-colors hover:text-ocean">
            {product.title}
          </Link>
        </h3>

        <p
          className={cn(
            "leading-relaxed text-muted",
            feature ? "text-[0.95rem] md:text-base" : "text-sm",
          )}
        >
          {product.hook}
        </p>

        {feature ? (
          <ul className="mt-1 hidden flex-wrap gap-2 md:flex">
            {product.highlights.slice(0, 3).map((h) => (
              <li
                key={h}
                className="rounded-full bg-lagoon-mist px-3 py-1 text-xs font-medium text-ocean"
              >
                {h}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto flex items-center gap-3 pt-3">
          <Link
            href={quoteHref}
            className="inline-flex items-center gap-1.5 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:brightness-[1.04] active:translate-y-0 active:scale-[0.98] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold-ink"
          >
            Request Quote
          </Link>
          <Link
            href={detailHref}
            className="group/detail inline-flex items-center gap-1 text-sm font-semibold text-ocean transition-colors hover:text-ocean-deep"
          >
            Details
            <Icon
              name="arrow-right"
              size={15}
              className="transition-transform duration-200 ease-out group-hover/detail:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
