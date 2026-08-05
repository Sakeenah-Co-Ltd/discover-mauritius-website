import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/lib/types";

type Variant = "primary" | "secondary" | "ghost" | "onDark" | "whatsapp";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight " +
  "transition-all duration-200 ease-out focus-visible:outline-3 focus-visible:outline-offset-2 " +
  "disabled:opacity-60 disabled:pointer-events-none select-none whitespace-nowrap " +
  "active:scale-[0.98]";

const variants: Record<Variant, string> = {
  // Single action accent — gold fill behind ink text (AA-safe; the one CTA colour).
  primary:
    "bg-gold text-ink shadow-card hover:shadow-card-hover hover:-translate-y-0.5 " +
    "hover:brightness-[1.04] focus-visible:outline-gold-ink active:translate-y-0",
  // Secondary — ocean outline that fills on hover.
  secondary:
    "border border-ocean text-ocean bg-transparent hover:bg-ocean hover:text-white " +
    "focus-visible:outline-ocean",
  // Tertiary — quiet ghost on light surfaces.
  ghost:
    "text-ink bg-transparent hover:bg-lagoon-mist focus-visible:outline-ocean",
  // For use on dark ocean/ink bands — white outline that fills.
  onDark:
    "border border-white/70 text-white bg-transparent hover:bg-white hover:text-ink " +
    "focus-visible:outline-white",
  // WhatsApp utility (its brand green is an intentional, recognizable exception).
  whatsapp:
    "bg-[#25D366] text-[#062e16] hover:brightness-[1.05] hover:-translate-y-0.5 " +
    "shadow-card focus-visible:outline-[#25D366]",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-[0.95rem] px-6 py-3",
  lg: "text-base px-8 py-4",
};

export interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconPosition?: "left" | "right";
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  "aria-label"?: string;
  target?: string;
  rel?: string;
}

function isExternal(href: string): boolean {
  return /^(https?:|mailto:|tel:|wa\.me|#)/.test(href) || href.startsWith("https://wa.me");
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  className,
  type = "button",
  onClick,
  disabled,
  target,
  rel,
  ...aria
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const iconSize = size === "sm" ? 16 : 18;
  const content = (
    <>
      {icon && iconPosition === "left" ? <Icon name={icon} size={iconSize} /> : null}
      <span>{children}</span>
      {icon && iconPosition === "right" ? <Icon name={icon} size={iconSize} /> : null}
    </>
  );

  if (href) {
    if (isExternal(href)) {
      return (
        <a
          href={href}
          className={classes}
          target={target}
          rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
          {...aria}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...aria}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} {...aria}>
      {content}
    </button>
  );
}
