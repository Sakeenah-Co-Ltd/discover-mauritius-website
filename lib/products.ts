import { products } from "@/content/tours";
import type { Product, ProductType } from "@/lib/types";

export function getAllProducts(): Product[] {
  return products;
}

export function getByType(type: ProductType): Product[] {
  return products.filter((p) => p.productType === type);
}

/** Day tours only — what /tours lists. */
export function getTours(): Product[] {
  return products.filter((p) => p.productType === "tour");
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Featured items for the Home grid (brief: 4–6 cards). */
export function getFeatured(limit = 6): Product[] {
  const featured = products.filter((p) => p.featured);
  const pool = featured.length ? featured : getTours();
  return pool.slice(0, limit);
}

/** Related tours for a detail page: same region first, then fill from other tours. */
export function getRelated(slug: string, limit = 3): Product[] {
  const current = getProduct(slug);
  if (!current) return getTours().slice(0, limit);
  const tours = getTours().filter((p) => p.slug !== slug);
  const sameRegion = tours.filter((p) => p.region === current.region);
  const others = tours.filter((p) => p.region !== current.region);
  return [...sameRegion, ...others].slice(0, limit);
}

/** Distinct tags across day tours, for the /tours filter UI. */
export function getTourTags(): string[] {
  const set = new Set<string>();
  for (const t of getTours()) t.tags.forEach((tag) => set.add(tag));
  return Array.from(set).sort();
}

/** Distinct regions across day tours, for the /tours filter UI. */
export function getTourRegions(): string[] {
  const set = new Set<string>();
  for (const t of getTours()) set.add(t.region);
  return Array.from(set).sort();
}

const CURRENCY_SYMBOLS: Record<string, string> = { EUR: "€", USD: "$", MUR: "₨" };

export function formatMoney(amount: number, currency: string): string {
  return `${CURRENCY_SYMBOLS[currency] ?? ""}${amount}`;
}

export function formatFromPrice(product: Pick<Product, "fromPrice" | "currency">): string {
  return `From ${formatMoney(product.fromPrice, product.currency)}`;
}
