"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { services } from "@/content/services";
import { copy } from "@/content/copy";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import type { IconName, QuoteServiceKey } from "@/lib/types";

/**
 * Hero trip planner — the tabbed "search" panel that overlaps the bottom of the
 * home hero (template1 direction), adapted to a quote-first business:
 *
 *  - Tabs = the five services (content/services.ts), so the panel and the nav
 *    always agree on what we sell.
 *  - It is a plain GET form posting to /contact — the same params the quote
 *    form already accepts (`service`, `item`) plus dates/travellers, which the
 *    form now pre-fills. No new backend, works without JavaScript for the
 *    default tab, and JS only adds tab switching + a nicer travellers control.
 *  - One accent: the gold submit. Everything else is white/hairline/mist.
 */

export interface PlannerOption {
  label: string;
  value: string;
}

export interface HeroPlannerProps {
  /** Day tours (title → slug) for the Tours tab. */
  tourOptions: PlannerOption[];
  /** Holiday packages (title → slug) for the Packages tab. */
  packageOptions: PlannerOption[];
  className?: string;
}

const TRANSFER_OPTIONS: PlannerOption[] = [
  { label: "Airport → Hotel", value: "airport-to-hotel" },
  { label: "Hotel → Airport", value: "hotel-to-airport" },
  { label: "Round trip (both ways)", value: "round-trip-transfer" },
];

const COAST_OPTIONS: PlannerOption[] = [
  { label: "North coast", value: "north-coast" },
  { label: "West coast", value: "west-coast" },
  { label: "East coast", value: "east-coast" },
  { label: "South coast", value: "south-coast" },
];

const ADULTS = [1, 2, 3, 4, 5, 6, 7, 8];
const CHILDREN = [0, 1, 2, 3, 4, 5, 6];

const tabs = [...services].sort((a, b) => a.priority - b.priority);

const PRIMARY_ICON: Record<QuoteServiceKey, IconName> = {
  tour: "route",
  transfer: "car",
  package: "calendar",
  flights: "plane",
  hotel: "hotel",
};

export function HeroPlanner({ tourOptions, packageOptions, className }: HeroPlannerProps) {
  const [active, setActive] = useState<QuoteServiceKey>(tabs[0].quoteKey);
  const [flexible, setFlexible] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();
  const t = copy.home.planner;

  const primary = t.primary[active];
  const primaryOptions: PlannerOption[] | null =
    active === "tour"
      ? tourOptions
      : active === "package"
        ? packageOptions
        : active === "transfer"
          ? TRANSFER_OPTIONS
          : active === "hotel"
            ? COAST_OPTIONS
            : null; // flights: free text

  function onTabKey(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const last = tabs.length - 1;
    let next = index;
    if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else if (e.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else next = index === 0 ? last : index - 1;
    setActive(tabs[next].quoteKey);
    tabRefs.current[next]?.focus();
  }

  const panelId = `${uid}-panel`;

  return (
    <div className={cn("hero-fade", className)} style={{ animationDelay: "1250ms" }}>
      {/* Tabs — attached to the top-left of the panel, like the reference. */}
      <div
        role="tablist"
        aria-label={t.ariaLabel}
        className="no-scrollbar -mb-px flex items-end gap-1 overflow-x-auto px-3 md:px-5"
      >
        {tabs.map((s, i) => {
          const selected = s.quoteKey === active;
          return (
            <button
              key={s.slug}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${uid}-tab-${s.quoteKey}`}
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(s.quoteKey)}
              onKeyDown={(e) => onTabKey(e, i)}
              className={cn(
                "relative inline-flex shrink-0 items-center gap-2 rounded-t-2xl border border-b-0 px-4 py-3 text-sm font-semibold transition-colors duration-200",
                selected
                  ? "z-10 border-hairline bg-white text-ink"
                  : "border-transparent bg-white/70 text-muted backdrop-blur-sm hover:bg-white/90 hover:text-ink",
              )}
            >
              <Icon name={s.icon} size={16} className={selected ? "text-ocean" : "text-muted"} />
              {s.shortName}
              {selected ? (
                <span
                  aria-hidden
                  className="absolute inset-x-4 top-0 h-0.5 rounded-b-full"
                  style={{ backgroundImage: "var(--gradient-lagoon-line)" }}
                />
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Panel — a plain GET form; /contact pre-fills the quote form from it. */}
      <form
        id={panelId}
        role="tabpanel"
        aria-labelledby={`${uid}-tab-${active}`}
        action="/contact"
        method="get"
        className="relative rounded-[24px] rounded-tl-none border border-hairline bg-white p-4 shadow-float md:p-5"
      >
        <input type="hidden" name="service" value={active} />

        {/* Options row (the reference's radio row) */}
        <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-2 px-1 text-sm">
          <label className="inline-flex cursor-pointer items-center gap-2 font-medium text-ink">
            <input
              type="checkbox"
              name="flexible"
              value="1"
              checked={flexible}
              onChange={(e) => setFlexible(e.target.checked)}
              className="h-4 w-4 rounded border-hairline accent-ocean"
            />
            {t.flexible}
          </label>
          <span className="hidden items-center gap-1.5 text-muted sm:inline-flex">
            <Icon name="check" size={14} className="text-lagoon-deep" />
            {t.hint}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr_1.4fr_auto]">
          {/* Primary field — differs per tab */}
          <Field icon={PRIMARY_ICON[active]} label={primary.label} htmlFor={`${uid}-item`}>
            {primaryOptions ? (
              <SelectShell>
                <select key={active} id={`${uid}-item`} name="item" defaultValue="" className={controlCls}>
                  <option value="">{primary.any}</option>
                  {primaryOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </SelectShell>
            ) : (
              <input
                key={active}
                id={`${uid}-item`}
                name="item"
                type="text"
                placeholder={primary.any}
                autoComplete="off"
                className={cn(controlCls, "placeholder:font-medium placeholder:text-muted/70")}
              />
            )}
          </Field>

          {/* Dates */}
          <Field icon="calendar" label={t.arrival} htmlFor={`${uid}-arrival`} muted={flexible}>
            <input
              id={`${uid}-arrival`}
              name="arrival"
              type="date"
              disabled={flexible}
              className={controlCls}
              aria-describedby={flexible ? `${uid}-flex-note` : undefined}
            />
          </Field>
          <Field icon="calendar" label={t.departure} htmlFor={`${uid}-departure`} muted={flexible}>
            <input
              id={`${uid}-departure`}
              name="departure"
              type="date"
              disabled={flexible}
              className={controlCls}
            />
          </Field>

          {/* Travellers */}
          <Field icon="users" label={t.travellers} htmlFor={`${uid}-adults`}>
            <div className="flex items-center gap-2">
              <SelectShell className="min-w-0 flex-1">
                <select
                  id={`${uid}-adults`}
                  name="adults"
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  aria-label={t.adults}
                  className={controlCls}
                >
                  {ADULTS.map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "adult" : "adults"}
                    </option>
                  ))}
                </select>
              </SelectShell>
              <SelectShell className="min-w-0 flex-1">
                <select
                  name="children"
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                  aria-label={t.children}
                  className={controlCls}
                >
                  {CHILDREN.map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "child" : "children"}
                    </option>
                  ))}
                </select>
              </SelectShell>
            </div>
          </Field>

          {/* Submit — the single gold accent in the panel */}
          <button
            type="submit"
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-full bg-gold font-semibold text-ink shadow-card",
              "transition-all duration-200 ease-out hover:-translate-y-0.5 hover:brightness-[1.04] hover:shadow-card-hover",
              "active:translate-y-0 active:scale-[0.98] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold-ink",
              "h-13 w-full sm:col-span-2 lg:col-span-1 lg:h-auto lg:w-16 lg:self-stretch lg:rounded-2xl",
            )}
          >
            <Icon name="search" size={20} />
            <span className="lg:sr-only">{t.submit}</span>
          </button>
        </div>
        {flexible ? (
          <span id={`${uid}-flex-note`} className="sr-only">
            Dates disabled because you marked them flexible.
          </span>
        ) : null}
      </form>
    </div>
  );
}

const controlCls =
  "w-full min-w-0 appearance-none bg-transparent text-[0.95rem] font-semibold text-ink outline-none disabled:text-muted/60 " +
  "[&::-webkit-calendar-picker-indicator]:opacity-60 [&::-webkit-calendar-picker-indicator]:cursor-pointer";

function Field({
  icon,
  label,
  htmlFor,
  muted,
  children,
}: {
  icon: IconName;
  label: string;
  htmlFor: string;
  muted?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 items-center gap-3 rounded-2xl border border-hairline bg-white px-3 py-2.5 transition-[border-color,box-shadow,opacity] duration-200",
        "focus-within:border-ocean focus-within:shadow-[0_0_0_3px_rgba(0,105,148,0.14)]",
        muted && "opacity-60",
      )}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lagoon-mist text-ocean">
        <Icon name={icon} size={18} />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <label htmlFor={htmlFor} className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
          {label}
        </label>
        {children}
      </div>
    </div>
  );
}

/** Wraps a native <select> with our own chevron so it matches the text inputs. */
function SelectShell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("relative block [&>select]:pr-5", className)}>
      {children}
      <Icon
        name="chevron-down"
        size={14}
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-muted"
      />
    </span>
  );
}
