/** Unique landing pages for high-intent Nepal searches. Not doorway clones. */

export type KeywordSection = {
  heading: string;
  paragraphs: string[];
  points?: string[];
};

export type NepalKeywordPage = {
  slug: string;
  href: string;
  title: string;
  description: string;
  h1: string;
  lede: string;
  focus: string;
  sections: KeywordSection[];
  faq: { q: string; a: string }[];
  related: { label: string; href: string }[];
};

const STUDIO = "Global Orbit Pvt Ltd, Kathmandu";

export const NEPAL_KEYWORD_PAGES: NepalKeywordPage[] = [
  {
    slug: "website-developer-nepal",
    href: "/website-developer-nepal",
    title: "Website Developer in Nepal | Global Orbit",
    description:
      "Hire a website developer in Nepal for custom business sites, WordPress, Next.js, and ecommerce. Global Orbit in Kathmandu writes the scope, builds the site, and ships technical SEO.",
    h1: "Website developer in Nepal",
    lede: `${STUDIO} designs and builds websites for Nepali businesses that need more than a template: clear pages, fast mobile load, and a path to enquiry.`,
    focus: "website developer in nepal",
    sections: [
      {
        heading: "What you actually hire",
        paragraphs: [
          "A website developer in Nepal is not a logo freelancer who disappears after the homepage. You need someone who maps the pages, writes a scope, builds on a stack you can keep, and leaves the site editable.",
          "Global Orbit is a studio, not a single contractor. Design, engineering, and technical SEO sit in one team in Kathmandu, with delivery for clients in Nepal, India, and the United States.",
        ],
        points: [
          "Written scope and timeline before design",
          "Next.js, WordPress, or Laravel — chosen for the job",
          "Staging URL you can review",
          "Source code and assets handed over",
        ],
      },
      {
        heading: "Sites we build",
        paragraphs: [
          "Business and corporate sites, hotel and trek operators, restaurants, clinics, schools, and stores. If the product needs logins or a dashboard, that is scoped as a web app, not hidden inside a brochure quote.",
        ],
      },
      {
        heading: "How to choose a developer in Nepal",
        paragraphs: [
          "Ask who owns the code, whether old URLs will 301, and whether metadata and the sitemap are included. A cheap theme with no redirects is more expensive after you lose the pages Google already knew.",
        ],
      },
    ],
    faq: [
      {
        q: "How much does a website developer in Nepal charge?",
        a: "Landing pages start from NPR 15,000. Business sites are usually NPR 25,000–80,000. Ecommerce and booking systems start from NPR 1,00,000 after a written scope.",
      },
      {
        q: "Do you work outside Kathmandu?",
        a: "Yes. Discovery and approvals run on calls and WhatsApp. The studio is in Kathmandu; clients are across Nepal.",
      },
    ],
    related: [
      { label: "Web designer in Nepal", href: "/web-designer-nepal" },
      { label: "Website development", href: "/service/website-development-nepal" },
      { label: "Packages", href: "/packages" },
    ],
  },
  {
    slug: "web-designer-nepal",
    href: "/web-designer-nepal",
    title: "Web Designer in Nepal | Global Orbit Kathmandu",
    description:
      "Web designer in Nepal for brand UI, mobile layouts, and conversion-focused pages. Global Orbit designs in Figma and hands the same files to the engineers who ship the site.",
    h1: "Web designer in Nepal",
    lede: "Design that is built to be shipped — not a mock-up that another vendor has to reinterpret.",
    focus: "web designer in nepal",
    sections: [
      {
        heading: "Design and build in one studio",
        paragraphs: [
          "A web designer in Nepal who only delivers a Figma file leaves you to find a developer. We design at real phone and desktop breakpoints, then the same team implements the layout, type, and motion.",
          "You review every template before production code. That keeps the site you approved and the site that launches as the same product.",
        ],
      },
      {
        heading: "What the design includes",
        paragraphs: [
          "Homepage, service pages, contact, and the states people forget: empty forms, mobile menus, and long service copy. Brand colour and type are documented so later pages stay consistent.",
        ],
        points: ["Mobile-first layouts", "Service page templates", "Form and CTA states", "Handoff your team can edit"],
      },
    ],
    faq: [
      {
        q: "Can I hire design only?",
        a: "Yes. Design-only engagements end with a Figma library and specs. Most clients continue into build so the design is not rebuilt by a second team.",
      },
      {
        q: "Do you design in Nepali and English?",
        a: "Yes, when the audience needs both. Language is scoped per template so navigation and metadata stay correct.",
      },
    ],
    related: [
      { label: "Website developer", href: "/website-developer-nepal" },
      { label: "Design studio", href: "/studio" },
      { label: "Kathmandu web design company", href: "/web-design-company-kathmandu" },
    ],
  },
  {
    slug: "web-design-company-kathmandu",
    href: "/web-design-company-kathmandu",
    title: "Web Design Company in Kathmandu | Global Orbit",
    description:
      "Web design company in Kathmandu for hotels, clinics, schools, and exporters. Global Orbit plans the sitemap, designs the UI, and launches with technical SEO included.",
    h1: "Web design company in Kathmandu",
    lede: "A Kathmandu studio for businesses that need a site their customers can find and their staff can update.",
    focus: "web design company kathmandu",
    sections: [
      {
        heading: "Local, without looking local-only",
        paragraphs: [
          "Kathmandu buyers search in English and Nepali, often on a mid-range Android phone. We design for that connection first, then for the desktop review your board will do.",
          "Location copy is written where it helps — contact, service area, and Google Business Profile alignment — not stuffed into every heading.",
        ],
      },
      {
        heading: "Who we design for in the valley",
        paragraphs: [
          "Hotels in Thamel, clinics in Lazimpat, schools, exporters, and professional firms that are tired of a theme shared with their competitor. Each gets its own page structure.",
        ],
      },
    ],
    faq: [
      {
        q: "Where is the studio?",
        a: "Kathmandu, Nepal, with teams that also support clients in India and the United States. Meetings are scheduled; you do not need to sit in an office for the build.",
      },
      {
        q: "How fast can a Kathmandu business site go live?",
        a: "A focused business site is typically two to four weeks after content is approved.",
      },
    ],
    related: [
      { label: "Web designer", href: "/web-designer-nepal" },
      { label: "Local SEO", href: "/local-seo-nepal" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    slug: "wordpress-developer-nepal",
    href: "/wordpress-developer-nepal",
    title: "WordPress Developer in Nepal | Global Orbit",
    description:
      "WordPress developer in Nepal for fast, editable business sites. Global Orbit builds disciplined themes, trims plugin sprawl, and ships caching, security, and SEO with the site.",
    h1: "WordPress developer in Nepal",
    lede: "WordPress when your team will edit the site every week — built so it stays fast and does not depend on twenty plugins.",
    focus: "wordpress developer nepal",
    sections: [
      {
        heading: "When WordPress is the right stack",
        paragraphs: [
          "Choose WordPress for brochure sites, blogs, and catalogues that marketing updates often. Choose Next.js when search and app-like pages share one product. We say which one in the scope, not after you have paid.",
        ],
      },
      {
        heading: "How we keep WordPress maintainable",
        paragraphs: [
          "A small plugin set, a theme you can update, image compression, and a caching layer. Security updates are part of care plans, not a surprise invoice after a hack.",
        ],
        points: ["Editor training", "Staging before updates", "Redirects on redesign", "SEO fields on every template"],
      },
    ],
    faq: [
      {
        q: "Will I be locked into your theme?",
        a: "No. You receive the theme, content, and admin access. The site is yours.",
      },
      {
        q: "Can you rescue a slow WordPress site?",
        a: "Yes. We audit plugins, images, and hosting, then fix what is actually slow instead of rebuilding on principle.",
      },
    ],
    related: [
      { label: "Website development", href: "/service/website-development-nepal" },
      { label: "React developer", href: "/react-developer-nepal" },
    ],
  },
  {
    slug: "react-developer-nepal",
    href: "/react-developer-nepal",
    title: "React & Next.js Developer in Nepal | Global Orbit",
    description:
      "React and Next.js developer in Nepal for SEO-critical sites and web apps. Global Orbit ships server-rendered pages, fast navigation, and TypeScript code you can keep.",
    h1: "React and Next.js developer in Nepal",
    lede: "Server-rendered React for businesses that need Google to read the page and customers to feel a fast app.",
    focus: "react developer nepal",
    sections: [
      {
        heading: "Why Next.js for Nepal marketing sites",
        paragraphs: [
          "Client-only React ships an empty shell. Google and slow phones both suffer. Next.js renders HTML on the server, so titles, copy, and links exist before JavaScript runs.",
          "We use it for marketing pages and for portals that share the same design system.",
        ],
      },
      {
        heading: "What a React engagement includes",
        paragraphs: [
          "TypeScript, a component library, image optimization, and a staging deploy. You are not handed a zip of untyped components.",
        ],
      },
    ],
    faq: [
      {
        q: "Is React too heavy for a small business site?",
        a: "A small content site is often better on WordPress. We recommend React when you need custom UI, an app, or tight control of SEO templates.",
      },
    ],
    related: [
      { label: "Web apps", href: "/orbit-software/web-apps" },
      { label: "WordPress developer", href: "/wordpress-developer-nepal" },
    ],
  },
  {
    slug: "ecommerce-developer-nepal",
    href: "/ecommerce-developer-nepal",
    title: "Ecommerce Developer in Nepal | Global Orbit",
    description:
      "Ecommerce developer in Nepal for WooCommerce, Shopify, and custom stores. Global Orbit builds catalogues, checkout, and product pages that stay fast on mobile data.",
    h1: "Ecommerce developer in Nepal",
    lede: "Stores for Nepali brands that sell on the site, not only on Instagram DMs.",
    focus: "ecommerce developer nepal",
    sections: [
      {
        heading: "Platform, chosen after the catalogue",
        paragraphs: [
          "WooCommerce fits teams already on WordPress. Shopify fits brands that want hosted checkout. A custom store fits unusual pricing, B2B accounts, or a warehouse you already run. We pick after seeing the products and the payment flow.",
        ],
      },
      {
        heading: "What makes a Nepali store convert",
        paragraphs: [
          "Clear delivery areas, NPR pricing, mobile product pages, and a checkout that does not ask for twelve fields. Product copy is structured so search can understand the item, not only the homepage.",
        ],
      },
    ],
    faq: [
      {
        q: "Do you connect eSewa, Khalti, or cards?",
        a: "Payment gateways are scoped per store and per what the provider allows. We do not promise a gateway we have not confirmed for your business type.",
      },
    ],
    related: [
      { label: "Ecommerce service", href: "/service/ecommerce-development-nepal" },
      { label: "Website developer", href: "/website-developer-nepal" },
    ],
  },
  {
    slug: "seo-expert-nepal",
    href: "/seo-expert-nepal",
    title: "SEO Expert in Nepal | Global Orbit",
    description:
      "SEO expert in Nepal for technical fixes, local search, and service pages that can rank. Global Orbit audits crawl, speed, and content before selling a monthly retainer.",
    h1: "SEO expert in Nepal",
    lede: "Search work that starts with what Google can already crawl — not a report full of keywords you will never publish.",
    focus: "seo expert nepal",
    sections: [
      {
        heading: "Technical first, content second",
        paragraphs: [
          "If robots.txt blocks real pages, or the site is a JavaScript shell, new blog posts will not rank. We fix crawl, canonicals, speed, and indexation, then plan the pages that match how Nepali customers search.",
        ],
        points: ["Search Console review", "Index and canonical fixes", "Local profile alignment", "Service pages with real answers"],
      },
      {
        heading: "What we will not promise",
        paragraphs: [
          "Nobody can honestly guarantee position one on a competitive term in a week. We show the queries you already appear for, the pages blocking you, and a timeline measured in weeks, not days.",
        ],
      },
    ],
    faq: [
      {
        q: "How long before rankings move?",
        a: "Technical fixes can be recrawled in days. Competitive Nepal terms usually move over 6–12 weeks if the pages and links support them.",
      },
    ],
    related: [
      { label: "SEO services", href: "/seo-services-nepal" },
      { label: "Local SEO", href: "/local-seo-nepal" },
      { label: "Google ranking", href: "/service/google-ranking-services-nepal" },
    ],
  },
  {
    slug: "mobile-app-developer-nepal",
    href: "/mobile-app-developer-nepal",
    title: "Mobile App Developer in Nepal | Global Orbit",
    description:
      "Mobile app developer in Nepal for Android, iOS, and web apps. Global Orbit ships Kotlin, SwiftUI, and Next.js products with a shared backend and a written scope.",
    h1: "Mobile app developer in Nepal",
    lede: "Android, iOS, and web apps for operators who need the product in stores, not a slide deck.",
    focus: "mobile app developer nepal",
    sections: [
      {
        heading: "Native when the phone is the product",
        paragraphs: [
          "Play Store and App Store apps use Kotlin and SwiftUI. If the same job is a portal staff open in a browser, a web app is faster and cheaper. We say which before the estimate.",
        ],
      },
      {
        heading: "Delivery",
        paragraphs: [
          "TestFlight or internal Android builds, then store listing support. Backends cover accounts, roles, and the data the app actually needs.",
        ],
      },
    ],
    faq: [
      {
        q: "Can one team do the website and the app?",
        a: "Yes. Marketing site and app share a design system and, where it helps, the same API.",
      },
    ],
    related: [
      { label: "Android apps", href: "/orbit-software/android-apps" },
      { label: "iOS apps", href: "/orbit-software/ios-apps" },
      { label: "Web apps", href: "/orbit-software/web-apps" },
    ],
  },
  {
    slug: "ui-ux-designer-nepal",
    href: "/ui-ux-designer-nepal",
    title: "UI UX Designer in Nepal | Global Orbit",
    description:
      "UI UX designer in Nepal for product flows, design systems, and websites. Global Orbit prototypes in Figma and ships the same interface in production.",
    h1: "UI UX designer in Nepal",
    lede: "Flows for hotels, trek booking, ecommerce, and dashboards — then the interface your engineers can build.",
    focus: "ui ux designer nepal",
    sections: [
      {
        heading: "UX before decoration",
        paragraphs: [
          "We map the task first: book a room, send an enquiry, place an order, or close a bill. Visual design follows that path so the page is obvious on a phone.",
        ],
      },
      {
        heading: "Design systems, not one-off screens",
        paragraphs: [
          "Buttons, forms, and type are tokens. New pages stay on brand without redrawing the product.",
        ],
      },
    ],
    faq: [
      {
        q: "Do you user-test?",
        a: "On larger products we test the main task with real staff or customers. A five-page site is reviewed with you against the enquiry path, not a lab study.",
      },
    ],
    related: [
      { label: "Web designer", href: "/web-designer-nepal" },
      { label: "Studio", href: "/studio" },
    ],
  },
];

export function findNepalKeywordPage(slug: string): NepalKeywordPage | undefined {
  return NEPAL_KEYWORD_PAGES.find((page) => page.slug === slug);
}
