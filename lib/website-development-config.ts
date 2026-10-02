export type WebsiteDevStat = { value: string; label: string };

export type WebsiteDevDemo = {
  id: string;
  brand: string;
  tagline: string;
  story: string;
  bullets: string[];
  stack: string[];
};

export const WEBSITE_DEV_HERO = {
  eyebrow: "Global Orbit · Website Development Nepal",
  titleBefore: "Original websites",
  titleAccent: "designed from scratch",
  titleAfter: "for operators who need Page 1 and polish",
  lede:
    "We ship bespoke frontends in Kathmandu — not recycled agency templates and not a clone of our own marketing site. Every layout below is a fictional brand we art-directed to show how different industries feel when the UX, motion, and SEO structure are done properly.",
};

export const WEBSITE_DEV_STATS: WebsiteDevStat[] = [
  { value: "380+", label: "Sites launched" },
  { value: "98", label: "Lighthouse SEO avg." },
  { value: "25+", label: "Countries served" },
  { value: "6–10 wk", label: "Typical build window" },
];

export const WEBSITE_DEV_DEMOS: WebsiteDevDemo[] = [
  {
    id: "summit-lodge",
    brand: "Summit Lodge",
    tagline: "Hospitality with calm booking paths",
    story:
      "Earth-tone palette, serif headlines, and a sticky availability strip — built for lodges that sell rooms on trust, not flash sales.",
    bullets: ["Room grid with seasonal rates", "Gallery-led hero without stock clutter", "Schema for LocalBusiness + Hotel"],
    stack: ["Next.js", "Booking API", "Structured data"],
  },
  {
    id: "trailhead",
    brand: "Trailhead Expeditions",
    tagline: "Adventure brand with expedition depth",
    story:
      "High-contrast typography and itinerary modules for trek operators who need long-form trip pages that still scan on mobile.",
    bullets: ["Difficulty + elevation chips", "Guide roster and safety block", "Enquiry funnel with trek SKU"],
    stack: ["App Router", "MDX itineraries", "Edge images"],
  },
  {
    id: "ember-slate",
    brand: "Ember & Slate",
    tagline: "Fine dining with reservation focus",
    story:
      "Dark copper accents, tasting-menu rhythm, and OpenTable-style CTAs — a restaurant site that feels like the dining room, not a PDF menu.",
    bullets: ["Chef story + wine pairings", "Hours & location strip", "Event private dining module"],
    stack: ["Motion-safe CSS", "Reservations", "Local SEO"],
  },
  {
    id: "norwood",
    brand: "Norwood Atelier",
    tagline: "Retail editorial with product grid",
    story:
      "Whitespace-forward ecommerce storytelling — lookbook rows, size guides, and cart UX tuned for fashion labels in Nepal and export markets.",
    bullets: ["Collection landing pages", "Quick-add product cards", "GST-ready checkout hooks"],
    stack: ["Headless cart", "Stripe / eSewa", "PWA shell"],
  },
  {
    id: "pulse-metrics",
    brand: "PulseMetrics",
    tagline: "SaaS landing with product depth",
    story:
      "Gradient mesh hero, pricing tiers, and an embedded dashboard preview — the pattern we use for B2B startups pitching investors and trials.",
    bullets: ["Feature comparison table", "SOC2-ready trust row", "Signup + demo request split"],
    stack: ["TypeScript", "Auth", "Analytics"],
  },
  {
    id: "haven-spa",
    brand: "Haven Spa",
    tagline: "Wellness with treatment clarity",
    story:
      "Soft sage palette, treatment cards with duration and therapist tags, and gentle motion — spa sites that convert enquiries without aggressive pop-ups.",
    bullets: ["Service menu with pricing bands", "Gift voucher CTA", "Google Business sync copy"],
    stack: ["Calm motion", "Forms", "Reviews widget"],
  },
];

export const WEBSITE_DEV_PROCESS = {
  eyebrow: "Delivery",
  title: "How a Global Orbit website engagement runs",
  lede: "Fixed milestones, written scope, and staging you can share with finance before we touch production DNS.",
  steps: [
    {
      title: "Brand & sitemap workshop",
      body: "We map pages, conversion goals, and Nepal/international SEO targets before design pixels.",
    },
    {
      title: "Art direction & prototypes",
      body: "Figma or in-code prototypes — unique to your brand, never our homepage layout duplicated.",
    },
    {
      title: "Build, content, integrations",
      body: "Next.js or WordPress as scoped, forms, payments, booking, and Orbit CMS when you need edits.",
    },
    {
      title: "Launch & measurement",
      body: "Core Web Vitals pass, Search Console, analytics, and a 30-day hypercare window.",
    },
  ],
};

export const WEBSITE_DEV_SEO = {
  eyebrow: "Search-ready",
  title: "SEO and performance are structural, not an add-on",
  paragraphs: [
    "Website development in Nepal often stops at a pretty homepage. We bake in canonical URLs, metadata, Open Graph, JSON-LD, XML sitemaps, and internal linking patterns that match how Google crawls hospitality, travel, retail, and SaaS sites.",
    "Core Web Vitals budgets are agreed in scope — LCP, INP, and CLS tracked on staging before go-live. Multilingual hreflang and Nepal + global keyword clusters are documented for your content team.",
  ],
  bullets: [
    "Technical SEO audit checklist on handover",
    "Schema for Organization, Service, FAQ, and vertical types",
    "Image pipelines with modern formats and lazy loading",
    "Blog and landing page templates for long-tail Nepal queries",
  ],
};

export const WEBSITE_DEV_FAQ = [
  {
    q: "Do you copy the Global Orbit homepage for client sites?",
    a: "No. Our marketing site uses Orbit design language internally; client sites get original art direction, type, and section flow matched to their brand.",
  },
  {
    q: "Which stack do you use for website development in Nepal?",
    a: "Most production sites ship on Next.js and Node.js; WordPress and WooCommerce when the client team prefers classic CMS workflows.",
  },
  {
    q: "Can you redesign an existing domain without losing rankings?",
    a: "Yes — we plan 301 maps, retain high-value URLs, and stage migrations with Search Console monitoring.",
  },
  {
    q: "Do you provide demo designs before signing?",
    a: "The layouts on this page are fictional showcases of our craft; your project receives custom mocks after discovery.",
  },
];

export const WEBSITE_DEV_CTA = {
  title: "Ready for a website that is yours alone?",
  lede: "Tell us your industry, timeline, and must-have integrations. We will reply with a milestone plan and investment range.",
  primaryLabel: "Book free consultation",
  primaryHref: "/contact",
  secondaryLabel: "View our work",
  secondaryHref: "/projects",
};
