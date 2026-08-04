import { cn } from "@/lib/utils";
import type { Surface } from "@/lib/types";

/**
 * "The Lagoon Line" signature — a calm reef-wave transition between colour bands
 * (NOTES.md §4). Low amplitude on purpose: a reef break, never a cliché scallop.
 * `fill` is the colour of the section the wave flows INTO.
 */

export const SURFACE_COLOR: Record<Surface, string> = {
  canvas: "#ffffff",
  "lagoon-mist": "var(--color-lagoon-mist)",
  "sand-mist": "var(--color-sand-mist)",
  ocean: "var(--color-ocean)",
  ink: "var(--color-ink)",
};

export interface ReefWaveProps {
  fill?: Surface | string;
  flip?: boolean;
  className?: string;
}

export function ReefWave({ fill = "canvas", flip = false, className }: ReefWaveProps) {
  const color = (SURFACE_COLOR as Record<string, string>)[fill] ?? fill;
  return (
    <div aria-hidden="true" className={cn("pointer-events-none relative -mb-px w-full leading-[0]", className)}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className={cn("block h-[38px] w-full md:h-[64px]", flip && "-scale-x-100")}
      >
        <path
          d="M0,64 C240,12 480,12 720,52 C960,92 1200,92 1440,40 L1440,120 L0,120 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
