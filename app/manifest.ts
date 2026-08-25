import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Tours, Transfers & Holiday Packages`,
    short_name: site.name,
    description: site.oneLiner,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#006994",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
