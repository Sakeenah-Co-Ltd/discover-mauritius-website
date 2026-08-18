"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav, isNavGroup, allNavLinks, site } from "@/content/site";
import { services } from "@/content/services";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { copy } from "@/content/copy";
import { whatsappLink, cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const servicesRef = useRef<HTMLLIElement>(null);

  // Close menus on route change.
  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Home: stay transparent over the light hero card until it is mostly
  // scrolled past. Everywhere else: subtle elevation almost immediately.
  const isHome = pathname === "/";
  useEffect(() => {
    const threshold = () => (isHome ? window.innerHeight * 0.45 : 8);
    const onScroll = () => setScrolled(window.scrollY > threshold());
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Escape + outside click.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  // Over the home hero card the bar is transparent (ink text — the hero is
  // light); it becomes the white bar once scrolled (or when the menu opens).
  const overlay = isHome && !scrolled && !mobileOpen;

  return (
    <header className={cn("z-50", isHome ? "fixed inset-x-0 top-0" : "sticky top-0")}>
      {/* Lagoon-line brand ribbon */}
      <div className="h-1 w-full" style={{ backgroundImage: "var(--gradient-lagoon-line)" }} aria-hidden />

      <div
        className={cn(
          "border-b transition-[background-color,border-color,box-shadow] duration-300",
          overlay
            ? "border-transparent bg-transparent"
            : scrolled
              ? "border-hairline bg-white/90 backdrop-blur-md shadow-card"
              : "border-transparent bg-white",
        )}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4 md:h-[72px]">
          <Logo />

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) =>
                isNavGroup(item) ? (
                  <li key={item.label} ref={servicesRef} className="relative">
                    <button
                      type="button"
                      className={cn(
                        "flex items-center gap-1 rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors",
                        overlay ? "hover:bg-white/60" : "hover:bg-lagoon-mist",
                        item.children.some((c) => isActive(c.href)) && "text-ocean",
                      )}
                      aria-expanded={servicesOpen}
                      aria-haspopup="true"
                      onClick={() => setServicesOpen((v) => !v)}
                    >
                      {item.label}
                      <Icon
                        name="chevron-down"
                        size={16}
                        className={cn("transition-transform", servicesOpen && "rotate-180")}
                      />
                    </button>
                    {servicesOpen ? (
                      <div className="absolute left-0 top-full mt-2 w-80 overflow-hidden rounded-card border border-hairline bg-white p-2 shadow-card-hover">
                        {services.map((s) => (
                          <Link
                            key={s.slug}
                            href={s.href}
                            className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-lagoon-mist"
                          >
                            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-lagoon-mist text-ocean">
                              <Icon name={s.icon} size={18} />
                            </span>
                            <span className="flex flex-col">
                              <span className="font-semibold text-ink">{s.name}</span>
                              <span className="text-sm text-muted">{s.hook}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "relative rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors",
                        overlay ? "hover:bg-white/60" : "hover:bg-lagoon-mist",
                        isActive(item.href) && "text-ocean",
                      )}
                      aria-current={isActive(item.href) ? "page" : undefined}
                    >
                      {item.label}
                      {isActive(item.href) ? (
                        <span
                          aria-hidden
                          className="absolute inset-x-4 bottom-0.5 h-0.5 rounded-full"
                          style={{ backgroundImage: "var(--gradient-lagoon-line)" }}
                        />
                      ) : null}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {/* Wrapper controls visibility — the Button's own `inline-flex`
                display class would otherwise override `hidden` at any width. */}
            <span className="hidden sm:block">
              <Button href="/contact" size="sm">
                {copy.ctas.planHoliday}
              </Button>
            </span>

            {/* Mobile toggle */}
            <button
              type="button"
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors lg:hidden",
                overlay ? "hover:bg-white/60" : "hover:bg-lagoon-mist",
              )}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <Icon name={mobileOpen ? "close" : "menu"} size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen ? (
        <div className="fixed inset-0 top-[68px] z-40 overflow-y-auto bg-white lg:hidden">
          <nav aria-label="Mobile" className="container-page flex flex-col gap-1 py-6">
            {allNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center justify-between rounded-xl px-4 py-3 text-lg font-medium transition-colors hover:bg-lagoon-mist",
                  isActive(link.href) && "bg-lagoon-mist text-ocean",
                )}
              >
                {link.label}
                <Icon name="arrow-right" size={18} className="text-muted" />
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-3">
              <Button href="/contact" size="lg" className="w-full">
                {copy.ctas.planHoliday}
              </Button>
              <Button href={whatsappLink()} variant="whatsapp" size="lg" icon="whatsapp" iconPosition="left" className="w-full" target="_blank">
                {copy.ctas.whatsapp}
              </Button>
              <a href={`tel:${site.phoneHref}`} className="flex items-center justify-center gap-2 py-2 text-muted">
                <Icon name="phone" size={16} /> {site.phoneDisplay}
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
