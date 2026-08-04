import Image from "next/image";
import type { ImageSlot, GradientTone, Orientation } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

/**
 * Photography-led placeholder strategy (brief §9, Pending #3).
 * - No client photos yet → render a branded, on-brand gradient block sized correctly,
 *   with the intended subject as an accessible label (and an optional visible hint
 *   for client review). Every slot is catalogued in IMAGE-SHOTLIST.md.
 * - When a real asset path is set on the slot (`src`), this swaps to next/image
 *   automatically — no component changes needed.
 */

const TONES: Record<GradientTone, string> = {
  ocean: "linear-gradient(135deg, #08394b 0%, #006994 52%, #00bfa6 100%)",
  lagoon: "linear-gradient(135deg, #006994 0%, #00bfa6 60%, #bdeee5 100%)",
  sunset: "linear-gradient(135deg, #05506e 0%, #00a68f 42%, #e7b53c 100%)",
  forest: "linear-gradient(135deg, #063d3a 0%, #0b6b5e 55%, #4bb08a 100%)",
  sand: "linear-gradient(135deg, #d7b160 0%, #f1e4c0 58%, #eaf6f6 100%)",
  reef: "linear-gradient(135deg, #006994 0%, #00bfa6 50%, #d4a72c 100%)",
};

const ASPECT: Record<Orientation, string> = {
  landscape: "4 / 3",
  portrait: "3 / 4",
  square: "1 / 1",
  wide: "16 / 9",
};

export interface SmartImageProps {
  slot: ImageSlot;
  className?: string;
  /** Absolutely fill a sized parent (for hero backgrounds). */
  cover?: boolean;
  /** Darken with a bottom-up ink gradient for overlaid text. */
  overlay?: boolean;
  /** Show a subtle "intended subject" hint for client review. */
  hint?: boolean;
  rounded?: boolean;
  priority?: boolean;
  sizes?: string;
  aspect?: string;
}

function Placeholder({ tone, hint, label }: { tone: GradientTone; hint?: boolean; label: string }) {
  return (
    <div className="absolute inset-0" style={{ backgroundImage: TONES[tone] }}>
      {/* soft top-left light for depth */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(120% 90% at 25% 15%, rgba(255,255,255,0.35), rgba(255,255,255,0) 55%)",
        }}
      />
      {/* faint reef-wave texture (the signature motif, whispered) */}
      <svg
        className="absolute inset-x-0 bottom-0 h-1/3 w-full opacity-20"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 120 C 200 60 300 180 500 120 S 900 60 1200 120 V200 H0 Z"
          fill="rgba(255,255,255,0.5)"
        />
      </svg>
      {hint ? (
        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 rounded-full bg-ink/45 px-3 py-1.5 text-xs text-white/95 backdrop-blur-sm">
          <Icon name="compass" size={14} className="shrink-0 opacity-90" />
          <span className="truncate">Photo: {label}</span>
        </div>
      ) : null}
    </div>
  );
}

export function SmartImage({
  slot,
  className,
  cover = false,
  overlay = false,
  hint = false,
  rounded = true,
  priority = false,
  sizes = "100vw",
  aspect,
}: SmartImageProps) {
  const tone = slot.tone ?? "ocean";
  const ratio = aspect ?? ASPECT[slot.orientation ?? "landscape"];
  const hasImage = Boolean(slot.src);

  return (
    <div
      className={cn(
        "overflow-hidden bg-ink/5",
        // `relative` and `absolute` must never coexist here: both would be
        // emitted and stylesheet order (not class order) decides the winner,
        // which collapsed every cover-mode image to zero height.
        cover ? "absolute inset-0" : cn("relative", rounded && "rounded-media"),
        className,
      )}
      style={cover ? undefined : { aspectRatio: ratio }}
      role={hasImage ? undefined : "img"}
      aria-label={hasImage ? undefined : slot.alt}
    >
      {hasImage ? (
        <Image
          src={slot.src as string}
          alt={slot.alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
          style={slot.position ? { objectPosition: slot.position } : undefined}
        />
      ) : (
        <Placeholder tone={tone} hint={hint} label={slot.alt} />
      )}
      {overlay ? (
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/15 to-transparent" />
      ) : null}
    </div>
  );
}
