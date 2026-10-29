import {
  ORBIT_LANDINGS,
  ORBIT_PACKAGES,
  ORBIT_SERVICE_PAGES,
  ORBIT_SOFTWARE,
  type OrbitCard,
} from "@/lib/orbit/catalog";
import { SERVICE_CATALOG } from "@/lib/content/services";
import { keywordsCsv, keywordsString, NEPAL_AGENCY_KEYWORDS } from "@/lib/seo-keywords";

export type PageSeoDefaults = {
  title: string;
  description: string;
  keywords: string[];
  focusKeyword: string;
};

function trimDesc(text: string, max = 158): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trim()}…`;
}

function cardSeo(card: OrbitCard, focus: string, extraKw: string[] = [], titleOverride?: string): PageSeoDefaults {
  const title = titleOverride ?? `${card.title} | Global Orbit Nepal`;
  const description = trimDesc(
    `${card.summary} Nepal-based studio: websites, SEO, apps, ERP, and digital marketing with measurable delivery.`,
  );
  return {
    title,
    description,
    keywords: keywordsCsv([focus, ...extraKw]),
    focusKeyword: focus,
  };
}

const STATIC: Record<string, PageSeoDefaults> = {
  "/": {
    title: "Global Orbit | Web Development & Software Company in Nepal",
    description: trimDesc(
      "Global Orbit helps businesses in Nepal with website development, custom software, mobile apps, SEO and digital marketing. Contact our Kathmandu team for a consultation.",
    ),
    keywords: keywordsCsv(),
    focusKeyword: "web development company nepal",
  },
  "/about": {
    title: "About Global Orbit · Web & Software Studio Nepal",
    description: trimDesc(
      "Enterprise websites, custom apps, ERP, and SEO from Kathmandu with teams in Nepal, India, and the United States — one accountable studio.",
    ),
    keywords: keywordsCsv(["about Global Orbit", "software company nepal"]),
    focusKeyword: "web development company nepal",
  },
  "/contact": {
    title: "Contact · Free Website & SEO Consultation Nepal",
    description: trimDesc(
      "Free consultation for website development, SEO, social media ads, and web apps. Kathmandu sales office — WhatsApp, phone, and email.",
    ),
    keywords: keywordsCsv(["contact web developer nepal", "free website consultation kathmandu"]),
    focusKeyword: "website consultation nepal",
  },
  "/projects": {
    title: "Portfolio · Websites & Apps Built in Nepal",
    description: trimDesc(
      "Selected websites, ecommerce, hotel, trek, SaaS, and ERP projects shipped by Global Orbit Nepal — performance, SEO, and polish.",
    ),
    keywords: keywordsCsv(["web design portfolio nepal", "website examples kathmandu"]),
    focusKeyword: "website portfolio nepal",
  },
  "/services": {
    title: "Digital Solutions Nepal · Web, SEO, Ads & Automation",
    description: trimDesc(
      "Website development, ecommerce, SEO, Google ranking, digital marketing, social ads, and AI automation — one Nepal studio.",
    ),
    keywords: keywordsCsv(["digital solutions nepal", "it services kathmandu"]),
    focusKeyword: "digital marketing nepal",
  },
  "/orbit-software/web-apps": {
    title: "Web Apps Nepal · Next.js, PWA & Cloud Dashboards",
    description: trimDesc(
      "Custom web applications, PWAs, and operator dashboards from Kathmandu — Next.js, secure APIs, and SEO-ready delivery for Nepal, India, and the US.",
    ),
    keywords: keywordsCsv(["web app development nepal", "PWA nepal", "next.js agency kathmandu"]),
    focusKeyword: "web app development nepal",
  },
  "/orbit-software/android-apps": {
    title: "Android App Development Nepal · Kotlin & Play Store",
    description: trimDesc(
      "Native Android apps for Nepali businesses — Kotlin, Play Store launch, billing, and aftercare from Global Orbit Kathmandu.",
    ),
    keywords: keywordsCsv(["android app development nepal", "kotlin app kathmandu", "play store nepal"]),
    focusKeyword: "android app development nepal",
  },
  "/orbit-software/ios-apps": {
    title: "iOS App Development Nepal · SwiftUI & App Store",
    description: trimDesc(
      "iPhone and iPad apps with SwiftUI, TestFlight, and App Store launch — designed and engineered in Kathmandu for Nepal, India, and US clients.",
    ),
    keywords: keywordsCsv(["ios app development nepal", "swiftui kathmandu", "app store nepal"]),
    focusKeyword: "ios app development nepal",
  },
  "/orbit-software": {
    title: "ERP & Business Software Nepal · Billing, Hotel, POS, CRM",
    description: trimDesc(
      "Billing, hotel PMS, warehouse, restaurant POS, CRM, and SaaS suites built and supported from Nepal for operators who need reliability.",
    ),
    keywords: keywordsCsv(["erp nepal", "billing software nepal", "hotel software nepal"]),
    focusKeyword: "erp software nepal",
  },
  "/packages": {
    title: "Website & SEO Packages Nepal · Transparent Pricing",
    description: trimDesc(
      "Starter to enterprise website packages and SEO retainers in NPR — clear scope, mobile-first builds, and search foundations.",
    ),
    keywords: keywordsCsv(["website package price nepal", "seo package nepal"]),
    focusKeyword: "website package nepal",
  },
  "/blogs": {
    title: "Blog · SEO, Web Development & Digital Marketing Nepal",
    description: trimDesc(
      "Guides on websites, SEO, ads, and software from Global Orbit — practical notes for Nepali businesses growing online.",
    ),
    keywords: keywordsCsv(["seo blog nepal", "web development tips nepal"]),
    focusKeyword: "seo tips nepal",
  },
  "/careers": {
    title: "Careers · Web, SEO & Software Jobs Kathmandu",
    description: trimDesc(
      "Join Global Orbit Nepal — developers, designers, and SEO specialists building world-class websites and software.",
    ),
    keywords: keywordsCsv(["web developer jobs nepal", "seo jobs kathmandu"]),
    focusKeyword: "web developer jobs nepal",
  },
  "/studio": {
    title: "Design Studio Nepal · Premium Websites & Brand UI",
    description: trimDesc(
      "Ultra HD website design, motion, and brand systems from Kathmandu — built for conversion and search visibility.",
    ),
    keywords: keywordsCsv(["website design studio nepal", "ui ux nepal"]),
    focusKeyword: "website design nepal",
  },
  "/inside-orbit": {
    title: "Inside Orbit · How We Ship Websites & Software",
    description: trimDesc(
      "Process, tools, and standards behind Global Orbit deliveries — from discovery to SEO launch and aftercare.",
    ),
    keywords: keywordsCsv(["software development process nepal"]),
    focusKeyword: "web development nepal",
  },
  "/demo": {
    title: "Software Demo · ERP, Hotel, POS & SaaS",
    description: trimDesc(
      "Book a live demo of billing, hotel, POS, CRM, or SaaS products from Global Orbit Nepal.",
    ),
    keywords: keywordsCsv(["erp demo nepal"]),
    focusKeyword: "software demo nepal",
  },
  "/privacy-policy": {
    title: "Privacy Policy · Global Orbit Nepal",
    description: "How Global Orbit Pvt Ltd handles data for website, app, and marketing clients.",
    keywords: keywordsCsv(["privacy policy nepal"]),
    focusKeyword: "privacy policy",
  },
  "/terms-and-conditions": {
    title: "Terms & Conditions · Global Orbit Nepal",
    description: "Terms for website development, software, SEO, and digital marketing services.",
    keywords: keywordsCsv(["terms of service nepal"]),
    focusKeyword: "terms and conditions",
  },
};

const SERVICE_FOCUS: Record<string, string> = {
  "website-development-nepal": "website development nepal",
  "seo-optimization-nepal": "seo services nepal",
  "ecommerce-development-nepal": "ecommerce website nepal",
  "google-ranking-services-nepal": "google ranking nepal",
  "erp-crm-software-nepal": "crm software nepal",
  "digital-marketing-nepal": "digital marketing nepal",
  "ai-automation": "ai automation nepal",
};

const LANDING_FOCUS: Record<string, string> = {
  "website-development-nepal": "website development nepal",
  "custom-software-development-nepal": "custom software development nepal",
  "web-development-nepal": "web development nepal",
  "erp-software-nepal": "erp software nepal",
  "seo-services-nepal": "seo services nepal",
  "local-seo-nepal": "local seo nepal",
  "hotel-website-development-nepal": "hotel website nepal",
  "trekking-website-development-nepal": "trekking website nepal",
  "travel-website-development-nepal": "travel website nepal",
  "restaurant-website-development-nepal": "restaurant website nepal",
  "resort-website-development-nepal": "resort website nepal",
  "spa-website-development-nepal": "spa website nepal",
  "ecommerce-website-development-nepal": "ecommerce development nepal",
  "booking-website-development-nepal": "booking website nepal",
};

function buildDynamicMap(): Record<string, PageSeoDefaults> {
  const map: Record<string, PageSeoDefaults> = { ...STATIC };

  for (const item of ORBIT_SERVICE_PAGES) {
    const focus = SERVICE_FOCUS[item.slug] ?? `${item.slug.replace(/-/g, " ")} nepal`;
    // Service funnel pages: commercial “company / services” framing
    map[item.href] = cardSeo(item, focus, [], `${item.title} Services | Kathmandu · Global Orbit`);
  }

  for (const item of ORBIT_LANDINGS) {
    const focus = LANDING_FOCUS[item.slug] ?? `${item.slug.replace(/-/g, " ")}`;
    // Industry / long-tail landings: distinct from /service/* to avoid title cannibalization
    map[item.href] = cardSeo(item, focus, [], `${item.title} | Nepal Guide · Global Orbit`);
  }

  for (const item of ORBIT_PACKAGES) {
    map[item.href] = cardSeo(item, `${item.slug.replace(/-/g, " ")} nepal`, ["website price nepal"]);
  }

  const softwareSeen = new Set<string>();
  for (const item of ORBIT_SOFTWARE) {
    if (softwareSeen.has(item.href)) continue;
    softwareSeen.add(item.href);
    map[item.href] = cardSeo(item, `${item.title.toLowerCase()} nepal`);
  }

  for (const svc of SERVICE_CATALOG) {
    const path = `/services/${svc.slug}`;
    map[path] = {
      title: `${svc.seoTitle} · Global Orbit`,
      description: trimDesc(svc.seoDescription),
      keywords: keywordsCsv([svc.slug.replace(/-/g, " "), ...NEPAL_AGENCY_KEYWORDS.slice(0, 8)]),
      focusKeyword: svc.slug.replace(/-/g, " "),
    };
  }

  return map;
}

const SEO_BY_PATH = buildDynamicMap();

export function getPageSeoDefaults(pathname: string): PageSeoDefaults | undefined {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return SEO_BY_PATH[path];
}

export function listSeoDefaultPaths(): string[] {
  return Object.keys(SEO_BY_PATH).sort();
}

/** Legacy homepage titles that must not win over current Nepal SEO defaults. */
const STALE_TITLES = new Set([
  "Web Developer Nepal · Website, SEO, Apps & Digital Marketing",
  "Web Developer Nepal · Website, SEO, Apps & Digital Marketing | Global Orbit",
]);

export function mergeSeoFallback(
  pathname: string,
  fallback: { title: string; description: string; keywords?: string[] },
): { title: string; description: string; keywords?: string[]; focusKeyword?: string } {
  const defaults = getPageSeoDefaults(pathname);
  if (!defaults) return fallback;
  const fallbackTitle = fallback.title?.trim() || "";
  const useDefaultsTitle = !fallbackTitle || STALE_TITLES.has(fallbackTitle);
  return {
    title: useDefaultsTitle ? defaults.title : fallbackTitle,
    description: fallback.description?.trim() ? fallback.description : defaults.description,
    keywords: fallback.keywords?.length ? fallback.keywords : defaults.keywords,
    focusKeyword: defaults.focusKeyword,
  };
}

export { keywordsString };
