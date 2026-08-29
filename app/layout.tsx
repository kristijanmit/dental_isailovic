import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { siteData } from "@/lib/siteData";
import { buildLocalBusinessJsonLd, buildMetadata } from "@/lib/seo";
import { LanguageProvider } from "@/contexts/LanguageContext";

export const metadata: Metadata = buildMetadata(siteData);

// Site has no dark theme yet — tell mobile browsers not to auto-invert
// colors (Android/Chrome "force dark"), which was wrecking hero/overlay
// and the booking mock's contrast under a dark system theme.
export const viewport: Viewport = {
  colorScheme: "light"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  const jsonLd = buildLocalBusinessJsonLd(siteData);

  return (
    <html lang="sr" suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
