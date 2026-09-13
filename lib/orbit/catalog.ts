export type OrbitCard = {
  slug: string;
  title: string;
  summary: string;
  href: string;
};

export const ORBIT_SOFTWARE: OrbitCard[] = [
  {
    slug: "billing-software",
    title: "Billing Software",
    summary: "Automate invoicing, track payments, and manage taxes with GST-compliant billing.",
    href: "/orbit-software/billing-software",
  },
  {
    slug: "hotel-management-system",
    title: "Hotel Management System",
    summary: "Full hotel operations — reservations, check-in/out, housekeeping, and channel manager.",
    href: "/orbit-software/hotel-management-system",
  },
  {
    slug: "ota-management-system",
    title: "OTA Management System",
    summary: "Connect to Booking.com, Agoda, Expedia. Sync rates, inventory, and reservations in real time.",
    href: "/orbit-software/ota-management-system",
  },
  {
    slug: "warehouse-management",
    title: "Warehouse Management",
    summary: "Track inventory across locations, optimize picking, and manage stock levels in real time.",
    href: "/orbit-software/warehouse-management",
  },
  {
    slug: "manufacturing-erp",
    title: "Manufacturing ERP",
    summary: "Plan production, manage BOM, track work orders, and control quality end-to-end.",
    href: "/orbit-software/manufacturing-erp",
  },
  {
    slug: "restaurant-pos",
    title: "Restaurant POS",
    summary: "Fast table-side ordering, kitchen display, split bills, and real-time sales reports.",
    href: "/orbit-software/restaurant-pos",
  },
  {
    slug: "crm-software",
    title: "CRM Software",
    summary: "Track leads, automate follow-ups, manage pipelines, and close more deals faster.",
    href: "/orbit-software/crm-software",
  },
  {
    slug: "saas-business-suite",
    title: "SaaS Business Suite",
    summary: "All-in-one platform — billing, CRM, analytics, and automation in a single dashboard.",
    href: "/orbit-software/saas-business-suite",
  },
  {
    slug: "custom-apps",
    title: "Custom Web & Mobile Apps",
    summary: "Operator apps for bookings, field teams, and customer portals — web first, mobile ready.",
    href: "/orbit-software/custom-apps",
  },
  {
    slug: "saas-management-system",
    title: "SaaS Management System",
    summary: "Backend for your own SaaS: tenants, billing, roles, usage meters, and admin consoles.",
    href: "/orbit-software/saas-management-system",
  },
];

export const ORBIT_SOLUTIONS: OrbitCard[] = [
  {
    slug: "website-development-nepal",
    title: "Web Development",
    summary: "High-performance, SEO-optimized websites built with React, Next.js, Laravel & WordPress.",
    href: "/service/website-development-nepal",
  },
  {
    slug: "ecommerce-development-nepal",
    title: "Ecommerce Development",
    summary: "Shopify, WooCommerce & custom stores designed to maximize revenue and conversions.",
    href: "/service/ecommerce-development-nepal",
  },
  {
    slug: "wordpress-development",
    title: "WordPress Development",
    summary: "Custom themes, plugins, and fully managed WordPress solutions built for performance.",
    href: "/service/website-development-nepal",
  },
  {
    slug: "seo-optimization-nepal",
    title: "SEO Optimization",
    summary: "Full-stack SEO — technical audits, keyword strategy, and on-page optimization for Page 1.",
    href: "/service/seo-optimization-nepal",
  },
  {
    slug: "technical-seo",
    title: "Technical SEO",
    summary: "Core Web Vitals, schema markup, site architecture, crawl optimization and indexing.",
    href: "/service/seo-optimization-nepal",
  },
  {
    slug: "local-seo-nepal",
    title: "Local SEO",
    summary: "Dominate local search with Google My Business, citations, and map pack rankings.",
    href: "/local-seo-nepal",
  },
  {
    slug: "google-ranking-services-nepal",
    title: "Google Ads",
    summary: "High-ROI PPC campaigns with precision targeting, A/B testing, and conversion tracking.",
    href: "/service/google-ranking-services-nepal",
  },
  {
    slug: "digital-marketing-nepal",
    title: "Social Media Marketing",
    summary: "Strategy, content creation, and paid ads across Facebook, Instagram, LinkedIn & TikTok.",
    href: "/service/digital-marketing-nepal",
  },
  {
    slug: "ai-automation",
    title: "AI Automation",
    summary: "Chatbots, workflow automation, AI content generation, and intelligent business systems.",
    href: "/service/digital-marketing-nepal",
  },
  {
    slug: "ui-ux",
    title: "UI/UX Design",
    summary: "Premium Figma designs, brand identities, and digital experiences that convert visitors.",
    href: "/studio",
  },
  {
    slug: "speed",
    title: "Speed Optimization",
    summary: "Sub-1s load times, 95+ PageSpeed scores, and Core Web Vitals fixes for better rankings.",
    href: "/service/seo-optimization-nepal",
  },
  {
    slug: "cro",
    title: "Conversion Optimization",
    summary: "CRO audits, heatmaps, landing page A/B testing that directly boost your revenue.",
    href: "/service/digital-marketing-nepal",
  },
];

export const ORBIT_SERVICE_PAGES: OrbitCard[] = [
  {
    slug: "website-development-nepal",
    title: "Website Development Nepal",
    summary: "Professional website development services in Nepal by Global Orbit.",
    href: "/service/website-development-nepal",
  },
  {
    slug: "seo-optimization-nepal",
    title: "SEO Optimization Nepal",
    summary: "Expert SEO optimization services in Nepal for Google Page 1 rankings.",
    href: "/service/seo-optimization-nepal",
  },
  {
    slug: "ecommerce-development-nepal",
    title: "Ecommerce Development Nepal",
    summary: "Custom ecommerce website development in Nepal.",
    href: "/service/ecommerce-development-nepal",
  },
  {
    slug: "google-ranking-services-nepal",
    title: "Google Ranking Services Nepal",
    summary: "Google ranking services to get your business on Page 1 in Nepal.",
    href: "/service/google-ranking-services-nepal",
  },
  {
    slug: "erp-crm-software-nepal",
    title: "ERP & CRM Software Nepal",
    summary: "Custom ERP and CRM software development in Nepal.",
    href: "/service/erp-crm-software-nepal",
  },
  {
    slug: "digital-marketing-nepal",
    title: "Digital Marketing Nepal",
    summary: "Complete digital marketing services in Nepal including SEO, Google Ads, and social media.",
    href: "/service/digital-marketing-nepal",
  },
];

export const ORBIT_PACKAGES: (OrbitCard & { price: string; items: string[] })[] = [
  {
    slug: "starter-website",
    title: "Starter Website",
    summary: "Landing page for new brands that need to be live quickly.",
    href: "/packages/starter-website",
    price: "From NPR 15,000",
    items: ["Up to 5 pages", "Mobile responsive", "Basic SEO setup", "Contact form"],
  },
  {
    slug: "professional-website",
    title: "Professional Website",
    summary: "Business site with service pages, blog, and conversion paths.",
    href: "/packages/professional-website",
    price: "From NPR 25,000",
    items: ["Up to 12 pages", "On-page SEO", "CMS training", "Analytics"],
  },
  {
    slug: "business-website",
    title: "Business Website",
    summary: "Multi-section marketing site with lead capture and integrations.",
    href: "/packages/business-website",
    price: "From NPR 45,000",
    items: ["Custom design", "Blog + resources", "CRM connect", "Speed pass"],
  },
  {
    slug: "enterprise-website",
    title: "Enterprise Website",
    summary: "Complex information architecture, multilingual, and operations.",
    href: "/packages/enterprise-website",
    price: "Custom quote",
    items: ["Custom app features", "Roles & workflows", "SLA support", "SEO programme"],
  },
  {
    slug: "seo-starter",
    title: "SEO Starter",
    summary: "Technical baseline and keyword map for a new domain.",
    href: "/packages/seo-starter",
    price: "Monthly retainer",
    items: ["Audit", "Metadata", "GSC setup", "Monthly report"],
  },
  {
    slug: "seo-growth",
    title: "SEO Growth",
    summary: "Content + technical work aimed at first-page movement.",
    href: "/packages/seo-growth",
    price: "Monthly retainer",
    items: ["Content calendar", "On-page", "Local citations", "Rank tracking"],
  },
  {
    slug: "seo-pro",
    title: "SEO Pro",
    summary: "Aggressive growth for competitive Nepali and regional terms.",
    href: "/packages/seo-pro",
    price: "Monthly retainer",
    items: ["Cluster content", "Digital PR", "CRO tests", "Weekly stand-up"],
  },
  {
    slug: "seo-enterprise",
    title: "SEO Enterprise",
    summary: "Multi-site, multi-market search operations.",
    href: "/packages/seo-enterprise",
    price: "Custom quote",
    items: ["Dedicated strategist", "International SEO", "Dashboards", "SLA"],
  },
];

export const ORBIT_COUNTRIES = [
  { name: "Nepal", code: "np" },
  { name: "India", code: "in" },
  { name: "United States", code: "us" },
  { name: "United Kingdom", code: "gb" },
  { name: "Australia", code: "au" },
  { name: "UAE", code: "ae" },
  { name: "Qatar", code: "qa" },
  { name: "Saudi Arabia", code: "sa" },
  { name: "Japan", code: "jp" },
  { name: "Germany", code: "de" },
  { name: "Canada", code: "ca" },
  { name: "Singapore", code: "sg" },
  { name: "Malaysia", code: "my" },
  { name: "Thailand", code: "th" },
  { name: "South Korea", code: "kr" },
  { name: "France", code: "fr" },
  { name: "Netherlands", code: "nl" },
  { name: "Italy", code: "it" },
  { name: "New Zealand", code: "nz" },
  { name: "Bangladesh", code: "bd" },
  { name: "Sri Lanka", code: "lk" },
  { name: "China", code: "cn" },
  { name: "Switzerland", code: "ch" },
  { name: "South Africa", code: "za" },
  { name: "Hong Kong", code: "hk" },
] as const;

export const ORBIT_PROJECTS = [
  { title: "Himalaya Grand Hotel", sector: "Hotel website", result: "Direct bookings live · Google Page 1 for brand terms", country: "np" },
  { title: "Lakeside Stay Pokhara", sector: "Hotel website", result: "Channel-ready rates · enquiry form to WhatsApp", country: "np" },
  { title: "Annapurna Trails Co.", sector: "Trekking website", result: "Seasonal itineraries · 4× organic sessions", country: "np" },
  { title: "Everest Region Lodges", sector: "Lodge website", result: "Fast on mountain data · group enquiry inbox", country: "np" },
  { title: "Kathmandu Kitchen Group", sector: "Restaurant website", result: "Menus + map pack · table wait down in 30 days", country: "np" },
  { title: "Thamel Cafe Circuit", sector: "Restaurant website", result: "Multi-location pages · local SEO citations", country: "np" },
  { title: "Wellness Spa Retreat", sector: "Spa website", result: "Treatment list · appointment funnel", country: "np" },
  { title: "Chitwan River Resort", sector: "Resort website", result: "Gallery + seasons · booking CTA conversion +62%", country: "np" },
  { title: "Himalayan Threads", sector: "Ecommerce", result: "WooCommerce store · checkout in NPR + USD", country: "np" },
  { title: "Daily Mart Online", sector: "Ecommerce", result: "Inventory sync · abandoned-cart recovery", country: "np" },
  { title: "Valley International School", sector: "Education website", result: "Admissions forms · parent portal handoff", country: "np" },
  { title: "City Care Hospital", sector: "Healthcare website", result: "Doctor schedules · appointment routing", country: "np" },
  { title: "Biratnagar Plant ERP", sector: "ERP system", result: "BOM + work orders in one dashboard", country: "np" },
  { title: "Central Warehouse WMS", sector: "Warehouse software", result: "Multi-location stock · pick paths", country: "np" },
  { title: "TableLine POS", sector: "Restaurant POS", result: "KDS + split bills · same-day sales reports", country: "np" },
  { title: "Orbit Billing Cloud", sector: "Billing SaaS", result: "GST invoices · tenant billing for 40+ shops", country: "np" },
  { title: "Gulf Trek Desk", sector: "Travel website", result: "Arabic + English packages · agent login", country: "ae" },
  { title: "Doha Stay Desk", sector: "Hotel website", result: "OTA sync + direct book · occupancy reporting", country: "qa" },
  { title: "Sydney Nepal Tours", sector: "Travel website", result: "AU payments · seasonal campaign landing", country: "au" },
  { title: "London Heritage Stays", sector: "Hotel website", result: "Core Web Vitals 95+ · UK search visibility", country: "gb" },
  { title: "Tokyo Incoming Desk", sector: "Travel website", result: "JP/EN itineraries · form to CRM", country: "jp" },
  { title: "Berlin Trade House", sector: "B2B website", result: "Catalog + RFQ workflow · DE/EN", country: "de" },
  { title: "Toronto Learning Hub", sector: "Education website", result: "Course pages · Stripe checkout", country: "ca" },
  { title: "Singapore SaaS Console", sector: "SaaS backend", result: "Tenant admin, roles, usage meters", country: "sg" },
  { title: "USA Partner Portal", sector: "Custom app", result: "Dealer logins · order status API", country: "us" },
] as const;

export const ORBIT_WHY = [
  { title: "Ultra Fast Websites", body: "Sub-second loading times with optimized code and CDN delivery." },
  { title: "SEO Optimized Structure", body: "Every website built with SEO-first architecture for maximum visibility." },
  { title: "Mobile Responsive Design", body: "Perfect experience on every device, from mobile to 4K displays." },
  { title: "Google Ranking Focused", body: "Data-driven strategies that consistently achieve first-page rankings." },
  { title: "Secure Development", body: "Enterprise-grade security protocols protecting your business and users." },
  { title: "Business Growth Strategy", body: "Not just websites — we build complete digital growth systems." },
];

export const ORBIT_AUTOMATION = [
  {
    title: "AI Chatbots",
    body: "24/7 customer support chatbots that qualify leads, answer FAQs, and book appointments automatically.",
  },
  {
    title: "Workflow Automation",
    body: "Eliminate repetitive tasks with n8n, Zapier & Make integrations connecting all your business tools.",
  },
  {
    title: "AI Content Engine",
    body: "Automated SEO content generation, social media posts, and email sequences powered by GPT-4.",
  },
  {
    title: "Analytics & Reporting",
    body: "Automated weekly SEO and performance reports delivered straight to your inbox every Monday.",
  },
  {
    title: "Email Automation",
    body: "Smart lead nurturing sequences, follow-ups, and abandoned cart recovery that run on autopilot.",
  },
  {
    title: "CRM Integration",
    body: "Seamlessly connect HubSpot, Salesforce, or custom CRMs to automate your entire sales pipeline.",
  },
];

export const ORBIT_INDUSTRIES = [
  "Hotels",
  "Trekking",
  "Restaurants",
  "Resorts",
  "Spa",
  "Ecommerce",
  "Education",
  "Healthcare",
  "Manufacturing",
  "Logistics",
  "Real estate",
  "NGOs",
];

export const ORBIT_TOOLS = {
  Frontend: ["Next.js", "React", "WordPress"],
  Backend: ["Laravel", "Node.js", "PostgreSQL"],
  Ecommerce: ["Shopify", "WooCommerce"],
  Marketing: ["GA4", "Search Console", "Meta Ads"],
};

export const ORBIT_PROCESS = [
  { title: "Discussion", body: "We understand your goals, audience, and requirements." },
  { title: "Planning", body: "Strategic roadmap, sitemap, and project timeline." },
  { title: "UI/UX Design", body: "Premium mockups and interactive prototypes." },
  { title: "Development", body: "Clean, fast, scalable code built for performance." },
  { title: "SEO Optimization", body: "Full technical SEO before launch for maximum visibility." },
  { title: "Launch & Support", body: "Smooth go-live with ongoing maintenance and growth." },
];

export const ORBIT_FAQS = [
  {
    q: "How much does a website cost at Global Orbit?",
    a: "Our websites start from NPR 15,000 for basic landing pages. Business websites range from NPR 25,000–80,000, and custom ecommerce or ERP solutions can range from NPR 1,00,000+. We provide detailed quotes after a short brief.",
  },
  {
    q: "How long does it take to rank on Google Page 1?",
    a: "Competitive terms in Nepal typically take 3–6 months of technical work, content, and links. We do not sell guaranteed positions. We report movement against a written baseline.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. We serve businesses across 15+ countries from Kathmandu, with overlap hours for Asia, the Gulf, and Europe.",
  },
  {
    q: "What technologies do you use for web development?",
    a: "React, Next.js, Laravel, WordPress, Node.js, MySQL, and PostgreSQL — chosen for the job, not a trend.",
  },
  {
    q: "Do you offer website maintenance after launch?",
    a: "Yes. Updates, backups, security, and small content changes sit in monthly care plans.",
  },
  {
    q: "Can you improve my existing website's SEO?",
    a: "Yes. We audit Core Web Vitals, indexation, metadata, and content, then ship a sequenced plan.",
  },
  {
    q: "Do you provide free consultations?",
    a: "Yes. A free consultation with no commitment — tell us what you run and when you need to be live.",
  },
  {
    q: "What makes Global Orbit different from other agencies?",
    a: "Engineering, SEO, and aftercare sit in one company. We do not outsource the thinking or disappear after launch week.",
  },
];

export const ORBIT_TESTIMONIALS = [
  {
    quote:
      "Global Orbit built our hotel website and within 3 months we were ranking on page 1 of Google. Bookings increased by 150%. Incredible team!",
    name: "Hotel operator",
    place: "Pokhara",
  },
  {
    quote: "The trekking site finally loads on mountain data and enquiry forms reach us the same day.",
    name: "Expedition lead",
    place: "Kathmandu",
  },
  {
    quote: "ERP went live without stopping the shop floor. Training was in Nepali and English.",
    name: "Plant manager",
    place: "Biratnagar",
  },
  {
    quote: "SEO reporting is honest. We see keywords, not vanity screenshots.",
    name: "Retail founder",
    place: "Lalitpur",
  },
  {
    quote: "Restaurant POS and website talk to each other. Table wait dropped in the first month.",
    name: "F&B owner",
    place: "Thamel",
  },
];

export const ORBIT_BLOGS = [
  {
    slug: "rank-nepali-businesses-page-1-google",
    title: "Rank Nepali Businesses on Page 1 of Google",
    summary: "SEO strategies for Nepali businesses to rank on Google Page 1.",
  },
  {
    slug: "core-web-vitals-2026-cheat-sheet",
    title: "Core Web Vitals 2026 Cheat Sheet",
    summary: "Complete guide to Core Web Vitals metrics for 2026.",
  },
  {
    slug: "right-tech-stack-nepali-startup-2026",
    title: "Right Tech Stack for Nepali Startups 2026",
    summary: "Choosing the right technology stack for Nepali startups in 2026.",
  },
];

export const ORBIT_CAREERS = [
  {
    slug: "senior-full-stack-developer",
    title: "Senior Full-Stack Developer",
    summary: "Next.js, Laravel, and production ownership from Kathmandu.",
  },
  {
    slug: "ui-ux-designer",
    title: "UI/UX Designer",
    summary: "Figma systems for hotel, trek, and SaaS products.",
  },
  {
    slug: "seo-specialist",
    title: "SEO Specialist",
    summary: "Technical SEO and content clusters for Nepal and export markets.",
  },
];

export const ORBIT_LANDINGS: OrbitCard[] = [
  {
    slug: "website-development-nepal",
    title: "Website Development Nepal",
    summary: "Business websites designed to rank and convert, built in Kathmandu.",
    href: "/website-development-nepal",
  },
  {
    slug: "custom-software-development-nepal",
    title: "Custom Software Development Nepal",
    summary: "Bespoke software, ERP, and internal tools for Nepali operators.",
    href: "/custom-software-development-nepal",
  },
  {
    slug: "web-development-nepal",
    title: "Web Development Nepal",
    summary: "React, Next.js, Laravel and WordPress delivery from Global Orbit.",
    href: "/web-development-nepal",
  },
  {
    slug: "erp-software-nepal",
    title: "ERP Software Nepal",
    summary: "ERP systems for manufacturing, hotels, warehouses, and retail.",
    href: "/erp-software-nepal",
  },
  {
    slug: "seo-services-nepal",
    title: "SEO Services Nepal",
    summary: "Technical and content SEO for Google visibility in Nepal.",
    href: "/seo-services-nepal",
  },
  {
    slug: "local-seo-nepal",
    title: "Local SEO Nepal",
    summary: "Maps, citations, and local pack rankings for Kathmandu businesses.",
    href: "/local-seo-nepal",
  },
  {
    slug: "hotel-website-development-nepal",
    title: "Hotel Website Development Nepal",
    summary: "Hotel websites with booking paths and channel-ready structure.",
    href: "/hotel-website-development-nepal",
  },
  {
    slug: "trekking-website-development-nepal",
    title: "Trekking Website Development Nepal",
    summary: "Trek operator sites built for enquiry, itineraries, and search.",
    href: "/trekking-website-development-nepal",
  },
  {
    slug: "travel-website-development-nepal",
    title: "Travel Website Development Nepal",
    summary: "Travel brand websites for packages, seasons, and agents.",
    href: "/travel-website-development-nepal",
  },
  {
    slug: "restaurant-website-development-nepal",
    title: "Restaurant Website Development Nepal",
    summary: "Menus, reservations, and local SEO for restaurants.",
    href: "/restaurant-website-development-nepal",
  },
  {
    slug: "resort-website-development-nepal",
    title: "Resort Website Development Nepal",
    summary: "Resort sites with galleries, seasons, and booking CTAs.",
    href: "/resort-website-development-nepal",
  },
  {
    slug: "spa-website-development-nepal",
    title: "Spa Website Development Nepal",
    summary: "Spa and wellness sites with treatment lists and enquiries.",
    href: "/spa-website-development-nepal",
  },
  {
    slug: "ecommerce-website-development-nepal",
    title: "Ecommerce Website Development Nepal",
    summary: "Shopify, WooCommerce, and custom stores for Nepali brands.",
    href: "/ecommerce-website-development-nepal",
  },
  {
    slug: "booking-website-development-nepal",
    title: "Booking Website Development Nepal",
    summary: "Booking-led websites for hotels, tours, and appointments.",
    href: "/booking-website-development-nepal",
  },
];

export function findBySlug<T extends { slug: string }>(items: T[], slug: string) {
  return items.find((item) => item.slug === slug);
}
