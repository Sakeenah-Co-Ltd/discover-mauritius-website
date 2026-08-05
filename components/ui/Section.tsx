import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Surface } from "@/lib/types";
import { ReefWave } from "@/components/ui/ReefWave";
import { Reveal } from "@/components/ui/Reveal";

const SURFACE: Record<Surface, string> = {
  canvas: "bg-white text-ink",
  "lagoon-mist": "bg-lagoon-mist text-ink",
  "sand-mist": "bg-sand-mist text-ink",
  ocean: "bg-ocean text-white",
  ink: "bg-ink text-white",
};

export interface SectionProps {
  children: ReactNode;
  surface?: Surface;
  id?: string;
  className?: string;
  containerClassName?: string;
  /** Skip the 1200px container (full-bleed content). */
  bleed?: boolean;
  spacing?: "sm" | "md" | "lg";
  /** Render a reef-wave at the bottom that flows into the next section's surface. */
  waveInto?: Surface;
}

const PAD_TOP = {
  sm: "pt-12 md:pt-16",
  md: "pt-16 md:pt-24",
  lg: "pt-20 md:pt-28",
};
const PAD_BOTTOM = {
  sm: "pb-12 md:pb-16",
  md: "pb-16 md:pb-24",
  lg: "pb-20 md:pb-28",
};

export function Section({
  children,
  surface = "canvas",
  id,
  className,
  containerClassName,
  bleed = false,
  spacing = "lg",
  waveInto,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(SURFACE[surface], PAD_TOP[spacing], !waveInto && PAD_BOTTOM[spacing], className)}
    >
      {bleed ? children : <div className={cn("container-page", containerClassName)}>{children}</div>}
      {waveInto ? <ReefWave fill={waveInto} className="mt-16 md:mt-24" /> : null}
    </section>
  );
}

export interface EyebrowProps {
  children: ReactNode;
  className?: string;
  /** On dark bands, tint for contrast. */
  onDark?: boolean;
}

export function Eyebrow({ children, className, onDark }: EyebrowProps) {
  return (
    <span className={cn("eyebrow", onDark && "text-lagoon", className)}>
      <span
        aria-hidden
        className="h-px w-6 rounded-full"
        style={{ backgroundImage: "var(--gradient-lagoon-line)" }}
      />
      {children}
    </span>
  );
}

export interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  onDark?: boolean;
  className?: string;
  titleClassName?: string;
  as?: "h1" | "h2";
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  onDark,
  className,
  titleClassName,
  as: TitleTag = "h2",
}: SectionHeaderProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center mx-auto max-w-2xl" : "items-start text-left max-w-3xl",
        className,
      )}
    >
      {eyebrow ? <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow> : null}
      <TitleTag
        className={cn(
          "text-3xl sm:text-4xl md:text-5xl",
          onDark ? "text-white" : "text-ink",
          titleClassName,
        )}
      >
        {title}
      </TitleTag>
      {subtitle ? (
        <p className={cn("text-lg leading-relaxed", onDark ? "text-white/80" : "text-muted")}>
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}
