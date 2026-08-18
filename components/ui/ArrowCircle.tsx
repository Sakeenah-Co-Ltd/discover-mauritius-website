import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import type { IconName } from "@/lib/types";

/**
 * The circular companion to a pill CTA (template1's "Explore more ↗" pair):
 * a round icon link that sits next to a Button and repeats its destination.
 * Decorative twin, so it is `aria-hidden` + `tabIndex={-1}` by default — the
 * pill next to it is the accessible control. Pass `label` to make it a real,
 * standalone control instead.
 */
export function ArrowCircle({
  href,
  icon = "arrow-up-right",
  variant = "light",
  size = "md",
  label,
  className,
}: {
  href: string;
  icon?: IconName;
  variant?: "light" | "dark" | "onDark";
  size?: "sm" | "md" | "lg";
  /** Accessible name — makes the circle a standalone control. */
  label?: string;
  className?: string;
}) {
  const dims = size === "sm" ? "h-9 w-9" : size === "lg" ? "h-14 w-14" : "h-12 w-12";
  const iconSize = size === "sm" ? 16 : size === "lg" ? 22 : 18;
  const look =
    variant === "dark"
      ? "bg-ink text-white hover:bg-ocean"
      : variant === "onDark"
        ? "border border-white/60 text-white hover:bg-white hover:text-ink"
        : "border border-hairline bg-white text-ink shadow-card hover:border-ocean hover:text-ocean";
  return (
    <Link
      href={href}
      aria-hidden={label ? undefined : true}
      tabIndex={label ? undefined : -1}
      aria-label={label}
      className={cn(
        "group/circle inline-flex shrink-0 items-center justify-center rounded-full transition-all duration-200 ease-out",
        "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.96] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ocean",
        dims,
        look,
        className,
      )}
    >
      <Icon
        name={icon}
        size={iconSize}
        className="transition-transform duration-200 ease-out group-hover/circle:translate-x-0.5 group-hover/circle:-translate-y-0.5"
      />
    </Link>
  );
}
