import type { SoftwareProductSlug } from "@/lib/software-product-slugs";

export type SoftwareFaqItem = { q: string; a: string };

export type SoftwareFeature = { title: string; body: string };

export type SoftwareStep = { title: string; body: string };

export type SoftwareProseSection = { heading: string; paragraphs: string[] };

export type SoftwareProductSeo = {
  title: string;
  description: string;
  keywords: string[];
};

export type SoftwareProductContent = {
  slug: SoftwareProductSlug;
  seo: SoftwareProductSeo;
  eyebrow: string;
  h1: string;
  titleAccent?: string;
  intro: string;
  accent: string;
  applicationCategory: string;
  heroStats: { value: string; label: string }[];
  trust: SoftwareProseSection;
  overview: SoftwareProseSection;
  problems: { title: string; items: SoftwareFeature[] };
  coreFeatures: { title: string; items: SoftwareFeature[] };
  advancedFeatures: { title: string; items: SoftwareFeature[] };
  workflow: { title: string; steps: SoftwareStep[] };
  workflowExamples: { title: string; items: SoftwareFeature[] };
  benefitsByRole: { title: string; items: SoftwareFeature[] };
  useCases: { title: string; items: SoftwareFeature[] };
  integrations: SoftwareProseSection;
  security: SoftwareProseSection;
  implementation: SoftwareProseSection;
  analytics: SoftwareProseSection;
  whyOrbit: SoftwareProseSection;
  relatedSlugs: SoftwareProductSlug[];
  faq: SoftwareFaqItem[];
  cta: { title: string; lede: string };
  longForm: SoftwareProseSection[];
};
