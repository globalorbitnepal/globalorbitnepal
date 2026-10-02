export type CustomAppsStat = {
  value: string;
  label: string;
};

export type CustomAppsCard = {
  title: string;
  body: string;
};

export type CustomAppsStep = {
  title: string;
  body: string;
};

export type CustomAppsConfig = {
  heroEyebrow: string;
  heroTitleBefore: string;
  heroTitleAccent: string;
  heroTitleAfter: string;
  heroLede: string;
  stats: CustomAppsStat[];
  overviewEyebrow: string;
  overviewTitle: string;
  overviewParagraphs: string[];
  capabilitiesEyebrow: string;
  capabilitiesTitle: string;
  capabilitiesTitleAccent: string;
  capabilitiesLede: string;
  capabilities: CustomAppsCard[];
  platformsEyebrow: string;
  platformsTitle: string;
  platforms: CustomAppsCard[];
  useCasesEyebrow: string;
  useCasesTitle: string;
  useCases: CustomAppsCard[];
  processEyebrow: string;
  processTitle: string;
  processLede: string;
  processSteps: CustomAppsStep[];
  stackEyebrow: string;
  stackTitle: string;
  stackItems: CustomAppsCard[];
  deliverablesEyebrow: string;
  deliverablesTitle: string;
  deliverablesBullets: string[];
  assuranceTitle: string;
  assuranceBullets: string[];
  ctaTitle: string;
  ctaLede: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
};

export const DEFAULT_CUSTOM_APPS: CustomAppsConfig = {
  heroEyebrow: "Orbit Software · Custom Apps",
  heroTitleBefore: "Web & mobile apps",
  heroTitleAccent: "built for operators",
  heroTitleAfter: "not demo-day slides",
  heroLede:
    "Booking portals, staff dashboards, customer apps, and field tools — engineered on Next.js and Node.js with the same premium bar as our homepage. One studio in Nepal, India, and the USA; deployments in 25+ countries.",
  stats: [
    { value: "120+", label: "Custom apps shipped" },
    { value: "15+", label: "Industries served" },
    { value: "99.9%", label: "Uptime targets on launch" },
    { value: "4–16 wk", label: "Typical MVP to production" },
  ],
  overviewEyebrow: "Why custom",
  overviewTitle: "When off-the-shelf software fights your floor",
  overviewParagraphs: [
    "Hotels, treks, factories, and SaaS founders need software that matches how teams already work — not the other way around. We design operator-first flows, then harden them for SEO, analytics, roles, and handover your staff can run.",
    "Every build includes documented APIs, staging environments, and a named project lead. You get web-first delivery with mobile-ready UI — PWA, responsive, or native wrappers when the roadmap calls for it.",
  ],
  capabilitiesEyebrow: "What we build",
  capabilitiesTitle: "Product surfaces",
  capabilitiesTitleAccent: "that scale",
  capabilitiesLede: "From customer-facing booking to back-office control — one codebase, one design language, one support line.",
  capabilities: [
    {
      title: "Customer portals",
      body: "Self-service booking, invoices, loyalty, and support — with auth, notifications, and payment hooks.",
    },
    {
      title: "Staff & admin apps",
      body: "Role-based dashboards for front desk, warehouse, finance, and leadership with audit trails.",
    },
    {
      title: "Field & operator tools",
      body: "Offline-tolerant workflows for guides, drivers, technicians, and sales teams on any device.",
    },
    {
      title: "Partner & B2B hubs",
      body: "Agent logins, commission rules, inventory sync, and reporting your partners actually use.",
    },
    {
      title: "Integrations layer",
      body: "Payment gateways, channel managers, SMS, WhatsApp, ERP, and legacy systems via stable APIs.",
    },
    {
      title: "Launch & aftercare",
      body: "Monitoring, error tracking, runbooks, and iteration sprints — not a silent handoff.",
    },
  ],
  platformsEyebrow: "Platforms",
  platformsTitle: "Web first. Mobile ready.",
  platforms: [
    {
      title: "Progressive web apps",
      body: "Installable, fast, and SEO-friendly — ideal for bookings and portals in Nepal and global markets.",
    },
    {
      title: "Responsive admin",
      body: "Dense data tables, filters, and approvals tuned for desktop and tablet operations teams.",
    },
    {
      title: "API-first backend",
      body: "Node.js services with clear contracts so mobile or third-party clients can ship later without rework.",
    },
  ],
  useCasesEyebrow: "Where it lands",
  useCasesTitle: "Categories we ship every quarter",
  useCases: [
    {
      title: "Hospitality & travel",
      body: "OTA search, hotel ops, guide assignment, and guest messaging tied to your brand site.",
    },
    {
      title: "Retail & ecommerce",
      body: "Catalog, cart, fulfillment, and vendor portals with GST-ready billing where required.",
    },
    {
      title: "Health & wellness",
      body: "Appointment flows, therapist schedules, packages, and HIPAA-aware patterns when needed.",
    },
    {
      title: "SaaS & platforms",
      body: "Multi-tenant apps, usage meters, billing, and admin consoles for your own product line.",
    },
  ],
  processEyebrow: "How we deliver",
  processTitle: "From discovery to production",
  processLede: "Fixed milestones finance can hold — with demos you can click, not decks you cannot.",
  processSteps: [
    {
      title: "Discovery & scope",
      body: "Workshops, user flows, written scope, and timeline with clear in/out of MVP.",
    },
    {
      title: "Design system",
      body: "Premium UI aligned to your brand and our homepage gold/dark language where it fits.",
    },
    {
      title: "Build & integrate",
      body: "Next.js frontends, Node APIs, tests, staging, and integration with payments and ERP.",
    },
    {
      title: "Launch & operate",
      body: "SEO pass, monitoring, training, and support sprints after go-live.",
    },
  ],
  stackEyebrow: "Engineering",
  stackTitle: "Stack on every engagement",
  stackItems: [
    { title: "Next.js", body: "App Router, SSR, edge-ready marketing and app shells." },
    { title: "Node.js", body: "REST and webhooks, Orbit-style CMS patterns, secure auth." },
    { title: "Data & auth", body: "PostgreSQL, Prisma, roles, sessions, and audit logs." },
    { title: "Quality", body: "TypeScript, CI, Core Web Vitals, and structured SEO." },
  ],
  deliverablesEyebrow: "Deliverables",
  deliverablesTitle: "What you receive at handover",
  deliverablesBullets: [
    "Production deployment with environment documentation",
    "Admin and operator training sessions recorded for your team",
    "API documentation and integration runbooks",
    "Analytics, error monitoring, and backup checklist",
    "30-day hypercare window with named engineering contact",
    "Roadmap for phase two features with estimate ranges",
  ],
  assuranceTitle: "Enterprise expectations",
  assuranceBullets: [
    "NDA and data handling aligned to your jurisdiction",
    "Weekly written status — no surprise invoices",
    "Code ownership transferred to your org or repo",
    "Same studio that ships Global Orbit’s own Orbit control plane",
  ],
  ctaTitle: "Planning a custom app?",
  ctaLede: "Share your users, integrations, and go-live date. We will reply with a milestone plan and ballpark investment.",
  ctaPrimaryLabel: "Book free consultation",
  ctaPrimaryHref: "/contact",
  ctaSecondaryLabel: "View all Orbit software",
  ctaSecondaryHref: "/orbit-software",
};

function parseString(raw: unknown, fallback: string) {
  return typeof raw === "string" && raw.trim() ? raw : fallback;
}

function parseStringArray(raw: unknown, fallback: string[]) {
  if (!Array.isArray(raw)) return fallback;
  const items = raw.map((item) => (typeof item === "string" ? item.trim() : "")).filter(Boolean);
  return items.length ? items : fallback;
}

function parseStats(raw: unknown, fallback: CustomAppsStat[]): CustomAppsStat[] {
  if (!Array.isArray(raw)) return fallback;
  return fallback.map((fb, index) => {
    const item = raw[index];
    const data = item && typeof item === "object" ? (item as Record<string, unknown>) : {};
    return {
      value: parseString(data.value, fb.value),
      label: parseString(data.label, fb.label),
    };
  });
}

function parseCards(raw: unknown, fallback: CustomAppsCard[]): CustomAppsCard[] {
  if (!Array.isArray(raw)) return fallback;
  return fallback.map((fb, index) => {
    const item = raw[index];
    const data = item && typeof item === "object" ? (item as Record<string, unknown>) : {};
    return {
      title: parseString(data.title, fb.title),
      body: parseString(data.body, fb.body),
    };
  });
}

function parseSteps(raw: unknown, fallback: CustomAppsStep[]): CustomAppsStep[] {
  if (!Array.isArray(raw)) return fallback;
  return fallback.map((fb, index) => {
    const item = raw[index];
    const data = item && typeof item === "object" ? (item as Record<string, unknown>) : {};
    return {
      title: parseString(data.title, fb.title),
      body: parseString(data.body, fb.body),
    };
  });
}

export function parseCustomAppsConfig(raw: unknown): CustomAppsConfig {
  const data = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const str = (key: keyof CustomAppsConfig, fallback: string) => parseString(data[key], fallback);
  return {
    heroEyebrow: str("heroEyebrow", DEFAULT_CUSTOM_APPS.heroEyebrow),
    heroTitleBefore: str("heroTitleBefore", DEFAULT_CUSTOM_APPS.heroTitleBefore),
    heroTitleAccent: str("heroTitleAccent", DEFAULT_CUSTOM_APPS.heroTitleAccent),
    heroTitleAfter: str("heroTitleAfter", DEFAULT_CUSTOM_APPS.heroTitleAfter),
    heroLede: str("heroLede", DEFAULT_CUSTOM_APPS.heroLede),
    stats: parseStats(data.stats, DEFAULT_CUSTOM_APPS.stats),
    overviewEyebrow: str("overviewEyebrow", DEFAULT_CUSTOM_APPS.overviewEyebrow),
    overviewTitle: str("overviewTitle", DEFAULT_CUSTOM_APPS.overviewTitle),
    overviewParagraphs: parseStringArray(data.overviewParagraphs, [...DEFAULT_CUSTOM_APPS.overviewParagraphs]),
    capabilitiesEyebrow: str("capabilitiesEyebrow", DEFAULT_CUSTOM_APPS.capabilitiesEyebrow),
    capabilitiesTitle: str("capabilitiesTitle", DEFAULT_CUSTOM_APPS.capabilitiesTitle),
    capabilitiesTitleAccent: str("capabilitiesTitleAccent", DEFAULT_CUSTOM_APPS.capabilitiesTitleAccent),
    capabilitiesLede: str("capabilitiesLede", DEFAULT_CUSTOM_APPS.capabilitiesLede),
    capabilities: parseCards(data.capabilities, DEFAULT_CUSTOM_APPS.capabilities),
    platformsEyebrow: str("platformsEyebrow", DEFAULT_CUSTOM_APPS.platformsEyebrow),
    platformsTitle: str("platformsTitle", DEFAULT_CUSTOM_APPS.platformsTitle),
    platforms: parseCards(data.platforms, DEFAULT_CUSTOM_APPS.platforms),
    useCasesEyebrow: str("useCasesEyebrow", DEFAULT_CUSTOM_APPS.useCasesEyebrow),
    useCasesTitle: str("useCasesTitle", DEFAULT_CUSTOM_APPS.useCasesTitle),
    useCases: parseCards(data.useCases, DEFAULT_CUSTOM_APPS.useCases),
    processEyebrow: str("processEyebrow", DEFAULT_CUSTOM_APPS.processEyebrow),
    processTitle: str("processTitle", DEFAULT_CUSTOM_APPS.processTitle),
    processLede: str("processLede", DEFAULT_CUSTOM_APPS.processLede),
    processSteps: parseSteps(data.processSteps, DEFAULT_CUSTOM_APPS.processSteps),
    stackEyebrow: str("stackEyebrow", DEFAULT_CUSTOM_APPS.stackEyebrow),
    stackTitle: str("stackTitle", DEFAULT_CUSTOM_APPS.stackTitle),
    stackItems: parseCards(data.stackItems, DEFAULT_CUSTOM_APPS.stackItems),
    deliverablesEyebrow: str("deliverablesEyebrow", DEFAULT_CUSTOM_APPS.deliverablesEyebrow),
    deliverablesTitle: str("deliverablesTitle", DEFAULT_CUSTOM_APPS.deliverablesTitle),
    deliverablesBullets: parseStringArray(data.deliverablesBullets, [...DEFAULT_CUSTOM_APPS.deliverablesBullets]),
    assuranceTitle: str("assuranceTitle", DEFAULT_CUSTOM_APPS.assuranceTitle),
    assuranceBullets: parseStringArray(data.assuranceBullets, [...DEFAULT_CUSTOM_APPS.assuranceBullets]),
    ctaTitle: str("ctaTitle", DEFAULT_CUSTOM_APPS.ctaTitle),
    ctaLede: str("ctaLede", DEFAULT_CUSTOM_APPS.ctaLede),
    ctaPrimaryLabel: str("ctaPrimaryLabel", DEFAULT_CUSTOM_APPS.ctaPrimaryLabel),
    ctaPrimaryHref: str("ctaPrimaryHref", DEFAULT_CUSTOM_APPS.ctaPrimaryHref),
    ctaSecondaryLabel: str("ctaSecondaryLabel", DEFAULT_CUSTOM_APPS.ctaSecondaryLabel),
    ctaSecondaryHref: str("ctaSecondaryHref", DEFAULT_CUSTOM_APPS.ctaSecondaryHref),
  };
}
