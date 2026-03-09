import type { Metadata } from "next";
import type { SiteData } from "@/lib/siteData";

export function buildMetadata(data: SiteData): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const metadataBase = baseUrl ? new URL(baseUrl) : undefined;

  return {
    title: {
      default: data.seo.title,
      template: data.seo.titleTemplate
    },
    description: data.seo.description,
    metadataBase,
    alternates: baseUrl
      ? {
          canonical: "/"
        }
      : undefined,
    openGraph: {
      type: "website",
      title: data.seo.title,
      description: data.seo.description,
      url: baseUrl,
      siteName: data.clinic.clinicName,
      images: [
        {
          url: data.seo.ogImage,
          alt: data.clinic.clinicName
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: data.seo.title,
      description: data.seo.description,
      images: [data.seo.ogImage]
    }
  };
}

export function buildLocalBusinessJsonLd(data: SiteData) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const sameAs = [data.clinic.socials.instagram, data.clinic.socials.facebook].filter(
    Boolean
  );

  return {
    "@context": "https://schema.org",
    "@type": ["Dentist", "LocalBusiness"],
    name: data.clinic.clinicName,
    address: {
      "@type": "PostalAddress",
      streetAddress: data.clinic.address
    },
    telephone: data.clinic.phoneRaw,
    openingHours: data.clinic.openingHours,
    url: baseUrl,
    sameAs: sameAs.length ? sameAs : undefined
  };
}
