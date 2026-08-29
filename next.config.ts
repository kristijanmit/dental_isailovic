import type { NextConfig } from "next";

// Static export for Cloudflare Pages staging — not prod.
// CF_PAGES is set automatically by Cloudflare during its builds.
// Local dev/build are unaffected either way.
const isCloudflarePages = process.env.CF_PAGES === "1";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    // next/image optimization needs a server; Cloudflare Pages is static-only.
    ...(isCloudflarePages ? { unoptimized: true } : {}),
  },
  ...(isCloudflarePages ? { output: "export" } : {}),
};

export default nextConfig;
