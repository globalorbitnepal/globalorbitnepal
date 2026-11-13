import type { ReactNode } from "react";

export type HeroFeatureItem = {
  title: string;
  hint: string;
  icon: ReactNode;
};

export const HERO_FEATURE_ITEMS: HeroFeatureItem[] = [
  {
    title: "Web Development",
    hint: "Business Websites & Web Apps",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="M3 9h18" fill="none" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    ),
  },
  {
    title: "Custom Software",
    hint: "Tailored Solutions",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 8 4 12l4 4M16 8l4 4-4 4M13 6l-2 12" fill="none" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    ),
  },
  {
    title: "SaaS Development",
    hint: "Scalable Platforms",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.5" y="4.5" width="17" height="15" rx="2.4" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="M3.5 9.2h17" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="7" cy="6.85" r="0.7" fill="currentColor" />
        <circle cx="9.4" cy="6.85" r="0.7" fill="currentColor" />
        <rect x="7" y="12" width="5.2" height="4.2" rx="0.8" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <rect x="13.4" y="12" width="4.4" height="4.2" rx="0.8" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "SEO & Digital Marketing",
    hint: "More Visibility, More Growth",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 17V9M10 17V6M15 17v-7M20 17V4" fill="none" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    ),
  },
];
