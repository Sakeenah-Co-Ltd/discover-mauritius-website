"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Quiet scroll reveal: fade + 18px rise, once, on entering the viewport.
 * Content is server-rendered visible; the hidden state is only applied to
 * elements still below the fold — so no-JS visitors, reduced-motion users and
 * above-the-fold content never wait for JavaScript.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  /** stagger offset in ms (keep ≤ ~350ms total across a group) */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already (nearly) on screen — reveal would just flicker.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.88) return;

    el.classList.add("reveal-hidden");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal-shown");
          el.classList.remove("reveal-hidden");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
