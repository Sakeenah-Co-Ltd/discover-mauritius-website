import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ToursExplorer } from "@/components/tours/ToursExplorer";
import { QuoteCta } from "@/components/sections/QuoteCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { getTours, getTourTags, getTourRegions } from "@/lib/products";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/content/site";
import type { ImageSlot } from "@/lib/types";

export const metadata: Metadata = {
  title: "Tours & Experiences in Mauritius",
  description:
    "Private and small-group tours across Mauritius — the coloured earths of the south, the vibrant north, lagoon catamaran days, culture, nature and more. Fully customizable, guided by locals.",
  alternates: { canonical: "/tours" },
};

const heroImage: ImageSlot = {
  id: "tours-hero",
  alt: "Le Morne Brabant above the turquoise lagoon and palm-lined beach of south-west Mauritius",
  tone: "lagoon",
  orientation: "wide",
  src: "/images/le-morne-photo.jpg",
  position: "50% 16%", // wide letterbox crop: keep the summit in frame
};

export default function ToursPage() {
  const tours = getTours();

  return (
    <>
      <PageHeader
        eyebrow="Tours & Experiences"
        title="Discover Mauritius, your way"
        subtitle="Handpicked private and small-group experiences across the island — every one guided by locals and fully customizable to your interests, pace and budget."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tours & Experiences" }]}
        image={heroImage}
      />

      <Section surface="canvas">
        <ToursExplorer tours={tours} regions={getTourRegions()} tags={getTourTags()} />
        <p className="mt-8 text-sm text-muted">
          Starting prices are indicative while we finalize published rates — every trip is quoted
          individually. Don&apos;t see exactly what you want?{" "}
          <a href="/contact" className="font-semibold text-ocean hover:underline">
            Tell us your ideal day
          </a>{" "}
          and we&apos;ll design it.
        </p>
      </Section>

      <QuoteCta
        eyebrow="Custom tours"
        title="Prefer something tailor-made?"
        subtitle="Tell us what you'd love to see and we'll build a private itinerary around you — then send a clear, no-obligation quote."
      />

      <JsonLd
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Tours & Experiences", href: "/tours" },
        ])}
      />
    </>
  );
}
