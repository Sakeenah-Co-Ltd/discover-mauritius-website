import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";

/**
 * Brand lockup: the N.K. Taher Group mark beside the site wordmark.
 *
 * The mark is keyed from the client's supplied JPG (Requirements §2.1); the dark
 * green reads poorly on `bg-ink`, so dark surfaces get the reversed variant. A
 * vector original is still wanted — see NEXT_SESSION_REQUIREMENTS.md.
 */
export function Logo({ onDark = false, className }: { onDark?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-3", className)}
      aria-label={`${site.name} — home`}
    >
      <Image
        src={onDark ? "/images/brand/nk-taher-mark-white.png" : "/images/brand/nk-taher-mark.png"}
        alt=""
        width={410}
        height={550}
        priority
        className="h-10 w-auto shrink-0 transition-transform group-hover:-translate-y-0.5 md:h-11"
      />
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
