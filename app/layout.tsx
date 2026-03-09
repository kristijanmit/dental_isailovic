import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { siteData } from "@/lib/siteData";
import { buildLocalBusinessJsonLd, buildMetadata } from "@/lib/seo";
import { LanguageProvider } from "@/contexts/LanguageContext";

export const metadata: Metadata = buildMetadata(siteData);

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  const jsonLd = buildLocalBusinessJsonLd(siteData);

  return (
    <html lang="en" suppressHydrationWarning>
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
