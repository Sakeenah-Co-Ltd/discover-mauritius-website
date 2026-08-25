import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { SmartImage } from "@/components/ui/SmartImage";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { BookingCard } from "@/components/tours/BookingCard";
import { Reveal } from "@/components/ui/Reveal";
import { StickyMobileCta } from "@/components/tours/StickyMobileCta";
import { RelatedTours } from "@/components/tours/RelatedTours";
import { QuoteCta } from "@/components/sections/QuoteCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { products } from "@/content/tours";
import { getProduct, formatFromPrice } from "@/lib/products";
import { tourSchema, breadcrumbSchema } from "@/lib/schema";
import { whatsappLink } from "@/lib/utils";
import { copy } from "@/content/copy";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.title,
    description: product.hook + " " + product.summary.slice(0, 130),
    alternates: { canonical: `/tours/${product.slug}` },
    openGraph: {
      title: `${product.title} · Discover Mauritius`,
      description: product.hook,
      type: "article",
    },
  };
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const waMessage = `Hello! I'd like a quote for the "${product.title}" in Mauritius.`;

  return (
    <>
      <PageHeader
        image={product.hero}
        eyebrow={`${product.region} · ${product.groupType}`}
        title={product.title}
        subtitle={product.hook}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tours", href: "/tours" },
          { label: product.title },
        ]}
        meta={
          <ul className="flex flex-wrap gap-2">
            {[
              { icon: "clock" as const, text: product.duration },
              { icon: "users" as const, text: product.groupType },
              { icon: "sparkles" as const, text: formatFromPrice(product) },
            ].map((m) => (
              <li
                key={m.text}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium text-white ring-1 ring-white/20"
              >
                <Icon name={m.icon} size={15} className="text-lagoon" />
                {m.text}
              </li>
            ))}
          </ul>
        }
        actions={
          <>
            <Button href={`/contact?service=${product.productType}&item=${product.slug}`} size="lg" icon="arrow-right">
              {copy.ctas.requestQuote}
            </Button>
            <Button href={whatsappLink(waMessage)} variant="whatsapp" size="lg" icon="whatsapp" iconPosition="left" target="_blank">
              {copy.ctas.whatsapp}
            </Button>
          </>
        }
      />

      <Section surface="canvas">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-14">
          {/* Main */}
          <div className="flex flex-col gap-12">
            {product.draft ? (
              <p className="flex items-start gap-2 rounded-xl border border-gold/40 bg-sand-mist px-4 py-3 text-sm text-gold-ink">
                <Icon name="sparkles" size={16} className="mt-0.5 shrink-0" />
                <span>Sample itinerary shown for illustration. Exact stops, timings and pricing are confirmed with you when you request a quote.</span>
              </p>
            ) : null}

            <p className="text-lg leading-relaxed text-ink">{product.summary}</p>

            {/* Gallery */}
            <div>
              <h2 className="mb-4 text-2xl">Gallery</h2>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {product.gallery.map((g, i) => (
                  <Reveal key={g.id} delay={i * 80}>
                    <SmartImage slot={g} hint aspect="4 / 3" sizes="(max-width: 768px) 50vw, 30vw" />
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div>
              <h2 className="mb-4 text-2xl">Highlights</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {product.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 rounded-xl border border-hairline bg-white p-4">
                    <Icon name="check" size={18} className="mt-0.5 shrink-0 text-lagoon-deep" />
                    <span className="text-ink">{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Itinerary */}
            <div>
              <h2 className="mb-6 text-2xl">Itinerary outline</h2>
              <ol className="relative flex flex-col gap-6 border-l-2 border-hairline pl-8">
                {product.itinerary.map((stop, i) => (
                  <li key={i} className="relative">
                    <span className="absolute -left-[41px] flex h-6 w-6 items-center justify-center rounded-full bg-ocean text-xs font-bold text-white ring-4 ring-white">
                      {i + 1}
                    </span>
                    <h3 className="text-lg font-semibold text-ink">{stop.title}</h3>
                    <p className="mt-1 leading-relaxed text-muted">{stop.description}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Included / Excluded */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-card border border-hairline bg-white p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-ink">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lagoon-mist text-lagoon-deep">
                    <Icon name="check" size={16} />
                  </span>
                  What&apos;s included
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {product.included.map((x) => (
                    <li key={x} className="flex items-start gap-2.5 text-ink">
                      <Icon name="check" size={17} className="mt-0.5 shrink-0 text-lagoon-deep" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-card border border-hairline bg-white p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-ink">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-hairline/60 text-muted">
                    <Icon name="x" size={16} />
                  </span>
                  Not included
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {product.excluded.map((x) => (
                    <li key={x} className="flex items-start gap-2.5 text-muted">
                      <Icon name="x" size={17} className="mt-0.5 shrink-0 opacity-70" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Good to know — only where the operator supplied notes */}
            {product.accessibility?.length ? (
              <div className="rounded-card border border-hairline bg-white p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-ink">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sand-mist text-gold-ink">
                    <Icon name="sparkles" size={16} />
                  </span>
                  Good to know
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {product.accessibility.map((x) => (
                    <li key={x} className="rounded-full border border-hairline px-3 py-1 text-sm text-muted">
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* Map */}
            <div>
              <h2 className="mb-4 text-2xl">Where you&apos;ll go</h2>
              <MapEmbed query={product.mapArea.query} label={product.mapArea.label} />
            </div>
          </div>

          {/* Aside — sticky booking card */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <BookingCard product={product} />
            </div>
          </aside>
        </div>
      </Section>

      <RelatedTours slug={product.slug} waveInto="ink" />
      <QuoteCta />
      <StickyMobileCta product={product} />

      <JsonLd
        data={[
          tourSchema(product),
          breadcrumbSchema([
            { label: "Home", href: "/" },
            { label: "Tours", href: "/tours" },
            { label: product.title, href: `/tours/${product.slug}` },
          ]),
        ]}
      />
    </>
  );
}
