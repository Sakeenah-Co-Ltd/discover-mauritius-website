"use client";

import { useMemo, useState } from "react";
import { TourCard } from "@/components/cards/TourCard";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ease-out active:scale-95 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ocean",
        active
          ? "border-ocean bg-ocean text-white shadow-card"
          : "border-hairline bg-white text-ink hover:border-ocean/40 hover:bg-lagoon-mist",
      )}
    >
      {children}
    </button>
  );
}

export function ToursExplorer({
  tours,
  regions,
  tags,
}: {
  tours: Product[];
  regions: string[];
  tags: string[];
}) {
  const [region, setRegion] = useState<string | null>(null);
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const toggleTag = (t: string) =>
    setActiveTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const filtered = useMemo(
    () =>
      tours.filter((t) => {
        const regionOk = !region || t.region === region;
        const tagOk = activeTags.length === 0 || activeTags.some((tag) => t.tags.includes(tag));
        return regionOk && tagOk;
      }),
    [tours, region, activeTags],
  );

  const hasFilters = region !== null || activeTags.length > 0;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-5 rounded-card border border-hairline bg-white p-5 shadow-card">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-lagoon-deep">Region</span>
          <div className="flex flex-wrap gap-2">
            <Chip active={region === null} onClick={() => setRegion(null)}>
              All of Mauritius
            </Chip>
            {regions.map((r) => (
              <Chip key={r} active={region === r} onClick={() => setRegion(region === r ? null : r)}>
                {r}
              </Chip>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-lagoon-deep">Interests</span>
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <Chip key={t} active={activeTags.includes(t)} onClick={() => toggleTag(t)}>
                {t}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-muted" aria-live="polite">
          Showing <span className="font-semibold text-ink">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "experience" : "experiences"}
        </p>
        {hasFilters ? (
          <button
            type="button"
            onClick={() => {
              setRegion(null);
              setActiveTags([]);
            }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ocean hover:text-ocean-deep"
          >
            <Icon name="x" size={15} /> Clear filters
          </button>
        ) : null}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <TourCard key={t.slug} product={t} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-card border border-dashed border-hairline bg-white py-16 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-lagoon-mist text-ocean">
            <Icon name="compass" size={24} />
          </span>
          <p className="max-w-sm text-muted">
            No experiences match those filters yet — but we build custom tours all the time.
          </p>
          <a href="/contact" className="font-semibold text-ocean hover:underline">
            Ask for a custom tour →
          </a>
        </div>
      )}
    </div>
  );
}
