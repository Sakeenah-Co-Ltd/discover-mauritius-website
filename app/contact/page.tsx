import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { Icon } from "@/components/ui/Icon";
import { QuoteForm } from "@/components/contact/QuoteForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/content/site";
import { copy } from "@/content/copy";
import { whatsappLink } from "@/lib/utils";
import type { IconName } from "@/lib/types";

export const metadata: Metadata = {
  title: "Request a Quote & Contact",
  description:
    "Tell us your travel dates, party size and interests and our licensed, IATA-accredited team will send a personalized Mauritius travel plan and quote — usually within 24 hours. No payment needed to enquire.",
  alternates: { canonical: "/contact" },
};

const methods: { icon: IconName; label: string; value: string; href: string; external?: boolean }[] = [
  { icon: "whatsapp", label: "WhatsApp (preferred)", value: site.phoneDisplay, href: whatsappLink(), external: true },
  { icon: "phone", label: "Call us", value: site.phoneDisplay, href: `tel:${site.phoneHref}` },
  { icon: "phone", label: "Alternative line", value: site.phoneAltDisplay, href: `tel:${site.phoneAltHref}` },
  { icon: "mail", label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: "facebook", label: "Facebook", value: site.facebookLabel, href: site.facebookUrl, external: true },
];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{
    service?: string;
    item?: string;
    arrival?: string;
    departure?: string;
    flexible?: string;
    adults?: string;
    children?: string;
  }>;
}) {
  const sp = await searchParams;

  return (
    <>
      <PageHeader
        eyebrow="Request a quote"
        title={copy.quote.title}
        subtitle={copy.quote.subtitle}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Request a Quote" }]}
      />

      <Section surface="canvas">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-14">
          {/* Form (primary) */}
          <div>
            <QuoteForm
              initialService={sp.service ?? ""}
              initialItem={sp.item ?? ""}
              initialArrival={sp.arrival}
              initialDeparture={sp.departure}
              initialFlexible={sp.flexible}
              initialAdults={sp.adults}
              initialChildren={sp.children}
            />
          </div>

          {/* Contact details */}
          <aside className="flex flex-col gap-6">
            <div className="rounded-card border border-hairline bg-white p-6 shadow-card">
              <h2 className="text-xl">Talk to us directly</h2>
              <p className="mt-1 text-sm text-muted">{copy.trust.responseTime}</p>
              <ul className="mt-5 flex flex-col gap-2">
                {methods.map((m) => (
                  <li key={m.label}>
                    <a
                      href={m.href}
                      target={m.external ? "_blank" : undefined}
                      rel={m.external ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-lagoon-mist"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-lagoon-mist text-ocean">
                        <Icon name={m.icon} size={20} />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-xs font-semibold uppercase tracking-wide text-muted">{m.label}</span>
                        <span className="font-medium text-ink">{m.value}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-center gap-2 rounded-xl bg-lagoon-mist px-4 py-3 text-sm text-ocean">
                <Icon name="shield" size={16} /> {copy.trust.noPayment}
              </div>
            </div>

            <div>
              <h2 className="mb-3 text-lg">Based in Mauritius</h2>
              <MapEmbed query="Mauritius" label="We operate island-wide across Mauritius" />
            </div>
          </aside>
        </div>
      </Section>

      <JsonLd
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Request a Quote", href: "/contact" },
        ])}
      />
    </>
  );
}
