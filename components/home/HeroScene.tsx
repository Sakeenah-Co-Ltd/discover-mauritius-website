"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The aircraft layer of the Le Morne hero.
 *
 * le-morne-photo.jpg is square and rendered with `object-fit: cover`, so at
 * any viewport exactly one axis crops. This component reproduces that cover
 * math in JS (side = max(w, h), offset from the --hero-x/--hero-y crop vars)
 * and lays a square coordinate stage over the photo, scaled so the flight
 * path in globals.css (written in 512-image pixels) flies the same believable
 * route through the photograph on every screen.
 *
 * Occlusion behind Le Morne comes from `.hero-sky-clip` on the stage — a
 * polygon of the photo's sky region traced from the ridge pixel data. When
 * the path crosses the mountain's silhouette the plane is clipped away, so it
 * genuinely disappears behind the ridge at any resolution, with no matte
 * asset.
 *
 * Pure enhancement: no JS, no motion-path support, or reduced motion → no
 * plane, and the hero is complete without it.
 */

const IMG = 512; // coordinate space of the flight path (original photo pixels)

interface Geometry {
  side: number;
  left: number;
  top: number;
}

export function HeroScene() {
  const ref = useRef<HTMLDivElement>(null);
  const [geom, setGeom] = useState<Geometry | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const frame = el.closest<HTMLElement>(".hero-frame");
    if (!frame) return;

    const update = () => {
      // offsetWidth/Height ignore the Ken Burns transform on the wrapper.
      const w = frame.offsetWidth;
      const h = frame.offsetHeight;
      if (!w || !h) return;
      const cs = getComputedStyle(frame);
      const px = parseFloat(cs.getPropertyValue("--hero-x")) || 0.5;
      const py = parseFloat(cs.getPropertyValue("--hero-y")) || 0.5;
      const side = Math.max(w, h);
      setGeom({ side, left: (w - side) * px, top: (h - side) * py });
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(frame);
    return () => ro.disconnect();
  }, []);

  // The wrapper must render unconditionally: the measuring effect needs the
  // ref'd element on first mount to find .hero-frame and observe it.
  return (
    <div
      ref={ref}
      aria-hidden
      className="hero-plane-layer absolute"
      style={
        geom
          ? { left: geom.left, top: geom.top, width: geom.side, height: geom.side }
          : { visibility: "hidden" }
      }
    >
      {geom ? (
        // 512-space coordinate stage, clipped to the photograph's sky.
        <div
          className="hero-sky-clip"
          style={{
            width: IMG,
            height: IMG,
            transform: `scale(${geom.side / IMG})`,
            transformOrigin: "0 0",
          }}
        >
          <div className="hero-plane-path">
            <Aircraft />
          </div>
        </div>
      ) : null}
    </div>
  );
}

/**
 * Minimal airliner silhouette, drawn pointing along +x (the path direction).
 * Sized in image pixels: ~30px ≈ a light aircraft at mid distance over the
 * lagoon. A faint tapered contrail trails behind; the whole group inherits the
 * path's tangent rotation, so the nose pitches gently down on approach.
 */
function Aircraft() {
  return (
    <div className="relative" style={{ width: 30, height: 11 }}>
      {/* contrail */}
      <div
        className="absolute top-1/2 h-px"
        style={{
          right: "100%",
          width: 74,
          marginRight: 2,
          transform: "translateY(-50%)",
          background:
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.42) 100%)",
          filter: "blur(0.6px)",
        }}
      />
      <svg
        viewBox="0 0 64 24"
        width={30}
        height={11.25}
        style={{
          display: "block",
          opacity: 0.94,
          filter: "drop-shadow(0 1px 1px rgba(14,42,56,0.4))",
        }}
      >
        {/* far wing (above the fuselage, slightly hazed) */}
        <path
          d="M31 10.6 L24.2 4.6 C23.6 4.05 24.3 3.3 25.1 3.7 L37.5 9.4 Z"
          fill="rgba(255,255,255,0.72)"
        />
        {/* tail fin */}
        <path
          d="M7.5 12.2 L2.6 4.4 C2.15 3.7 2.9 3.05 3.7 3.5 L13.8 10.2 Z"
          fill="#ffffff"
        />
        {/* fuselage — pointed nose to the right */}
        <path
          d="M5 13.1 C11 10.9 20 10 31 10.2 L52.5 10.9 C58.5 11.2 61.5 11.9 62.6 12.7 C61.6 13.7 57.5 14.5 51.5 14.7 L14.5 15.2 C9 15.2 6 14.4 5 13.1 Z"
          fill="#ffffff"
        />
        {/* near wing (swept toward the viewer) */}
        <path
          d="M27.5 12.8 L19.4 20.6 C18.6 21.4 19.4 22.2 20.4 21.8 L35.8 15.4 Z"
          fill="#ffffff"
        />
        {/* engine under the near wing root */}
        <ellipse cx="33.5" cy="15.4" rx="3.1" ry="1.5" fill="rgba(236,242,247,0.95)" />
      </svg>
    </div>
  );
}
