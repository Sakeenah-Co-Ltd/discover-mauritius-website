/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Real client/stock photography plugs in here later (Pending #3).
    // Placeholders are rendered as branded gradient blocks via <SmartImage> until then.
    formats: ["image/avif", "image/webp"],
    // Every `quality` used by <Image> must be listed, or the optimizer answers 400
    // ('"q" parameter (quality) of N is not allowed'). Local `next start` is lenient;
    // the OpenNext/Cloudflare image handler is not — the live hero photo 400'd for
    // two weeks because of this (found 2026-08-18). Keep this list in sync.
    qualities: [75, 88],
    remotePatterns: [],
  },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
