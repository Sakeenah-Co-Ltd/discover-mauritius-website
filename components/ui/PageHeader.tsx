import type { ReactNode } from "react";
import { SmartImage } from "@/components/ui/SmartImage";
import { ReefWave } from "@/components/ui/ReefWave";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import type { ImageSlot, Surface } from "@/lib/types";

/** Consistent interior-page hero band. Reused across tours, services, about, etc. */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
  image,
  actions,
  meta,
  waveInto = "canvas" as Surface,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumbs?: Crumb[];
  image?: ImageSlot;
  actions?: ReactNode;
  meta?: ReactNode;
  waveInto?: Surface | null;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      {image ? (
        <>
          <SmartImage slot={image} cover priority sizes="100vw" />
          {image.src ? (
            // Real photography: keep it visible — darken only where text sits.
            <>
              <div
                className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/45 to-ink/15"
                aria-hidden
              />
              <div
                className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/60 to-transparent"
                aria-hidden
              />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-ink/85 via-ink/60 to-ocean/40" aria-hidden />
          )}
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-ocean via-ocean to-ocean-deep" aria-hidden />
      )}

      <div className="container-page relative py-14 md:py-20">
        {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
        <div className="mt-6 max-w-3xl">
          {eyebrow ? (
            <span className="eyebrow text-lagoon">
              <span aria-hidden className="h-px w-6 rounded-full bg-lagoon" />
              {eyebrow}
            </span>
          ) : null}
          <h1 className="mt-4 text-4xl font-medium text-white sm:text-5xl md:text-[3.25rem] md:leading-[1.05]">
            {title}
          </h1>
          {subtitle ? <p className="mt-5 text-lg leading-relaxed text-white/85">{subtitle}</p> : null}
          {meta ? <div className="mt-6">{meta}</div> : null}
          {actions ? <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">{actions}</div> : null}
        </div>
      </div>

      {waveInto ? <ReefWave fill={waveInto} /> : null}
    </section>
  );
}
