import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { allowIndexing } from "@/lib/seo-flags";

export default function robots(): MetadataRoute.Robots {
  if (!allowIndexing) {
    // Pre-launch: keep the whole site out of search results. See lib/seo-flags.ts.
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
