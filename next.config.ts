import type { NextConfig } from "next";

// Static export for GitHub Pages (staging/testing only, not prod).
// GITHUB_PAGES is set by the deploy workflow so local dev/build are unaffected.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = "dental_isailovic";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    // next/image optimization needs a server; GitHub Pages is static-only.
    ...(isGithubPages ? { unoptimized: true } : {}),
  },
  ...(isGithubPages
    ? {
        output: "export",
        basePath: `/${repoName}`,
        assetPrefix: `/${repoName}/`,
      }
    : {}),
};

export default nextConfig;
