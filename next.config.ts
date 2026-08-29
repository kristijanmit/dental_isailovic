import type { NextConfig } from "next";

// Static export for free staging hosts (GitHub Pages / Cloudflare Pages) — not prod.
// GITHUB_PAGES is set by the GH Actions workflow; CF_PAGES is set automatically
// by Cloudflare during its builds. Local dev/build are unaffected either way.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const isCloudflarePages = process.env.CF_PAGES === "1";
const isStaticExport = isGithubPages || isCloudflarePages;
const repoName = "dental_isailovic";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    // next/image optimization needs a server; both hosts are static-only.
    ...(isStaticExport ? { unoptimized: true } : {}),
  },
  ...(isStaticExport ? { output: "export" } : {}),
  // Only GitHub Pages serves from a repo subpath; Cloudflare Pages serves from root.
  ...(isGithubPages
    ? { basePath: `/${repoName}`, assetPrefix: `/${repoName}/` }
    : {}),
};

export default nextConfig;
