"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatFromPrice } from "@/lib/products";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

/**
 * Sticky mobile CTA bar on tour pages (brief §11). Slides up once the reader
 * is into the content (not over the page header), so the price + quote action
 * is always at hand exactly when it becomes relevant.
 * Leaves room at right for the WhatsApp float.
 */
export function StickyMobileCta({ product }: { product: Product }) {
  const quoteHref = `/contact?service=${product.productType}&item=${product.slug}`;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-hairline bg-white/95 backdrop-blur-md transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] lg:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3 pr-20">
        <div className="leading-tight">
          <p className="font-display text-lg font-semibold text-ocean">{formatFromPrice(product)}</p>
          <p className="text-xs text-muted">{product.duration.split(" · ")[0]}</p>
        </div>
        <Link
          href={quoteHref}
          className="inline-flex items-center gap-1.5 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-ink shadow-card transition-transform active:scale-[0.98] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold-ink"
        >
          Request Quote
          <Icon name="arrow-right" size={16} />
        </Link>
      </div>
    </div>
  );
}
