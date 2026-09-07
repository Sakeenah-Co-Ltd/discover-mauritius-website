/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Real client/stock photography plugs in here later (Pending #3).
    // Placeholders are rendered as branded gradient blocks via <SmartImage> until then.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  // Both custom domains hit the Worker, so the apex is made canonical here rather
  // than in a dashboard rule — keeps the redirect in version control.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.discover-mauritius.com" }],
        destination: "https://discover-mauritius.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
