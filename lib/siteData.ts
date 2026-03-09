export type ClinicInfo = {
  clinicName: string;
  phoneRaw: string;
  phoneDisplay: string;
  address: string;
  email?: string;
  openingHours: string[];
  whatsappNumber: string;
  googleMapsUrl: string;
  socials: {
    instagram?: string;
    facebook?: string;
  };
};

export type ServiceItem = {
  id: string;
  title: string;
  short: string;
  long: string;
  image?: { src: string; alt: string };
};

export type ReviewItem = {
  name: string;
  rating: number;
  text: string;
};

export type GalleryItem = {
  src: string;
  alt: string;
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  specialties: string[];
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export type SiteData = {
  common: {
    openMenuLabel: string;
    closeMenuLabel: string;
    previousReviewLabel: string;
    nextReviewLabel: string;
    reviewPaginationLabel: string;
    previousImageLabel: string;
    nextImageLabel: string;
    closeLightboxLabel: string;
    openGalleryImageLabelPrefix: string;
    whatsappLabel: string;
    selectServicePlaceholder: string;
    starsOutOfFiveSuffix: string;
  };
  clinic: ClinicInfo;
  seo: {
    title: string;
    titleTemplate: string;
    description: string;
    ogImage: string;
  };
  nav: NavItem[];
  topBarCtaLabel: string;
  hero: {
    headline: string;
    subheadline: string;
    supportingText: string;
    requestCtaLabel: string;
    callCtaLabel: string;
    ctaReassurance: string;
    trustBadges: string[];
    image: {
      src: string;
      alt: string;
    };
  };
  highlights: {
    title: string;
    items: Array<{
      title: string;
      description: string;
      icon: "shield" | "clock" | "sparkles" | "heart";
    }>;
  };
  servicesSection: {
    title: string;
    subtitle: string;
    learnMoreLabel: string;
    showLessLabel: string;
  };
  services: ServiceItem[];
  whyChooseUs: {
    title: string;
    subtitle: string;
    bullets: string[];
    stats: Array<{ label: string; value: string }>;
  };
  reviewsSection: {
    title: string;
    subtitle: string;
  };
  reviews: ReviewItem[];
  gallerySection: {
    title: string;
    subtitle: string;
  };
  gallery: GalleryItem[];
  teamSection: {
    title: string;
    subtitle: string;
  };
  team: TeamMember[];
  processSection: {
    title: string;
    subtitle: string;
  };
  process: ProcessStep[];
  contactSection: {
    title: string;
    subtitle: string;
    privacyNote: string;
    submitLabel: string;
    successTitle: string;
    successDescription: string;
    copyButtonLabel: string;
    copiedButtonLabel: string;
    emailButtonLabel: string;
    resetButtonLabel: string;
    quickActionsTitle: string;
    form: {
      fullNameLabel: string;
      phoneLabel: string;
      emailLabel: string;
      serviceInterestLabel: string;
      messageLabel: string;
      consentLabel: string;
    };
  };
  mapSection: {
    title: string;
    subtitle: string;
    embedTitle: string;
  };
  footer: {
    aboutTitle: string;
    aboutText: string;
    quickLinksTitle: string;
    legalTitle: string;
    legalLinks: Array<{ label: string; href: string }>;
    copyright: string;
  };
};

import { getSiteData } from "./translations";

/** Default Serbian site data. Use getSiteData(locale) for i18n. */
export const siteData: SiteData = getSiteData("sr");
