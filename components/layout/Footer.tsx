import Link from "next/link";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { copy } from "@/content/copy";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { TrustStrip } from "@/components/ui/TrustStrip";
import { whatsappLink } from "@/lib/utils";

const exploreLinks = [
  { label: "Tours & Experiences", href: "/tours" },
  { label: "Holiday Packages", href: "/packages" },
  { label: "About Us", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Request a Quote", href: "/contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white/80">
      <div className="container-page py-14 md:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand + blurb + socials */}
          <div className="md:col-span-5">
            <Logo onDark />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">{copy.footer.blurb}</p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              >
                <Icon name="whatsapp" size={20} />
              </a>
              <a
                href={site.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Facebook — ${site.facebookLabel}`}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              >
                <Icon name="facebook" size={18} />
              </a>
              <a
                href={`mailto:${site.email}`}
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              >
                <Icon name="mail" size={18} />
              </a>
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Explore" className="md:col-span-3">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-white">{copy.footer.columns.explore}</h2>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              {exploreLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/70 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Services" className="md:col-span-2">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-white">{copy.footer.columns.services}</h2>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={s.href} className="text-white/70 transition-colors hover:text-white">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="md:col-span-2">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-white">Contact</h2>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              <li>
                <a href={`tel:${site.phoneHref}`} className="flex items-center gap-2 text-white/70 transition-colors hover:text-white">
                  <Icon name="phone" size={15} /> {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phoneAltHref}`} className="flex items-center gap-2 text-white/70 transition-colors hover:text-white">
                  <Icon name="phone" size={15} /> {site.phoneAltDisplay}
                </a>
              </li>
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/70 transition-colors hover:text-white">
                  <Icon name="whatsapp" size={15} /> WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-2 break-all text-white/70 transition-colors hover:text-white">
                  <Icon name="mail" size={15} /> {site.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-white/70">
                <Icon name="map-pin" size={15} /> Mauritius
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <TrustStrip onDark className="justify-start" />
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved. {copy.footer.legalNote}
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="transition-colors hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="transition-colors hover:text-white">Terms &amp; Booking Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
