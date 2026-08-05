import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";

/** Wordmark placeholder (Pending #12) — a compass mark + brand name in Fraunces. */
export function Logo({ onDark = false, className }: { onDark?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label={`${site.name} — home`}
    >
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white shadow-card transition-transform group-hover:rotate-[8deg]"
        style={{ backgroundImage: "var(--gradient-lagoon-line)" }}
        aria-hidden
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="m15.5 8.5-2 5.5-5 2 2-5.5z" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn("whitespace-nowrap font-display text-lg font-semibold tracking-tight", onDark ? "text-white" : "text-ink")}>
          Discover Mauritius
        </span>
        <span className={cn("mt-1 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.18em]", onDark ? "text-white/60" : "text-muted")}>
          by N.K. Taher Co Ltd
        </span>
      </span>
    </Link>
  );
}
