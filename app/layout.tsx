import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { site } from "@/content/site";
import { allowIndexing } from "@/lib/seo-flags";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Discover Mauritius — Tours, Airport Transfers & Holiday Packages",
    template: "%s · Discover Mauritius",
  },
  description: site.oneLiner,
  applicationName: site.name,
  keywords: [
    "tours in Mauritius",
    "Mauritius holiday packages",
    "airport transfer Mauritius",
    "private tours Mauritius",
    "IATA travel agency Mauritius",
    "things to do in Mauritius",
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: site.url,
    siteName: site.name,
    title: "Discover Mauritius — Tours, Transfers & Holiday Packages",
    description: site.oneLiner,
  },
  twitter: {
    card: "summary_large_image",
    title: "Discover Mauritius — Tours, Transfers & Holiday Packages",
    description: site.oneLiner,
  },
  // robots.txt alone only stops crawling; a linked URL can still be indexed
  // without content. The meta tag is what actually keeps a pre-launch build out.
  robots: allowIndexing
    ? {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large" },
      }
    : { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export const viewport: Viewport = {
  themeColor: "#006994",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-screen antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
