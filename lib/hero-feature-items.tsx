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
        <path
          d="M7 16a4.5 4.5 0 1 1 1.2-8.8A6 6 0 0 1 20 11.5 3.5 3.5 0 0 1 18 18H7Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
        />
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
