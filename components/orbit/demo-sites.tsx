import type { CSSProperties } from "react";

export type DemoSiteTheme = {
  id: string;
  host: string;
  brand: string;
  links: [string, string, string];
  kicker: string;
  title: string;
  cta: string;
  image: string;
  thumbs: [string, string, string];
  light?: boolean;
};

export const DEMO_SITES: DemoSiteTheme[] = [
  {
    id: "site-01",
    host: "atelierbakery.com",
    brand: "Atelier",
    links: ["Menu", "Shop", "Visit"],
    kicker: "Kathmandu bakery",
    title: "Sourdough, still warm.",
    cta: "Order today",
    image: "/brand/work/work-bakery.jpg",
    thumbs: ["/brand/work/work-bakery.jpg", "/brand/work/work-journey.jpg", "/brand/hero-bright-office.jpg"],
    light: true,
  },
  {
    id: "site-02",
    host: "forma.studio",
    brand: "Forma",
    links: ["Work", "Studio", "Index"],
    kicker: "Architecture",
    title: "Rooms with quiet light.",
    cta: "See projects",
    image: "/brand/work/work-architects.jpg",
    thumbs: ["/brand/work/work-architects.jpg", "/brand/offices/nepal.jpg", "/brand/hero-uhd-office.jpg"],
  },
  {
    id: "site-03",
    host: "northline.travel",
    brand: "Northline",
    links: ["Trips", "Stay", "Guide"],
    kicker: "Himalaya travel",
    title: "Start the journey here.",
    cta: "View trips",
    image: "/brand/work/work-journey.jpg",
    thumbs: ["/brand/places/himalaya.jpg", "/brand/work/summit-seek.jpg", "/brand/places/pagoda.jpg"],
  },
  {
    id: "site-04",
    host: "northstar.ai",
    brand: "Northstar",
    links: ["Practice", "Team", "Contact"],
    kicker: "Strategy",
    title: "Build the AI agenda.",
    cta: "Talk to us",
    image: "/brand/work/work-ai-agenda.jpg",
    thumbs: ["/brand/work/work-ai-saas.jpg", "/brand/hero-uhd-office.jpg", "/brand/offices/usa.jpg"],
  },
  {
    id: "site-05",
    host: "peaklodge.com",
    brand: "Peak Lodge",
    links: ["Rooms", "Spa", "Weddings"],
    kicker: "Mountain resort",
    title: "Lakeside, after dark.",
    cta: "Check dates",
    image: "/brand/work/work-resort.jpg",
    thumbs: ["/brand/work/work-resort.jpg", "/brand/places/himalaya.jpg", "/brand/portfolio/thamel-park-hotel.webp"],
  },
  {
    id: "site-06",
    host: "havenrealty.co",
    brand: "Haven",
    links: ["Buy", "Rent", "Sell"],
    kicker: "Interiors",
    title: "Homes that hold light.",
    cta: "Browse listings",
    image: "/brand/work/work-realty.jpg",
    thumbs: ["/brand/portfolio/first-choice-interior.webp", "/brand/work/work-realty.jpg", "/brand/hero-bright-office.jpg"],
    light: true,
  },
  {
    id: "site-07",
    host: "orbitpulse.ai",
    brand: "Pulse",
    links: ["Product", "Pricing", "Login"],
    kicker: "Revenue OS",
    title: "See every rupee move.",
    cta: "Open console",
    image: "/brand/work/work-ai-saas.jpg",
    thumbs: ["/brand/soft-previews/08.png", "/brand/work/work-ai-saas.jpg", "/brand/soft-previews/01.png"],
  },
  {
    id: "site-08",
    host: "wildline.co",
    brand: "Wildline",
    links: ["Rides", "Gear", "Club"],
    kicker: "Adventure",
    title: "Ride the river line.",
    cta: "Book a run",
    image: "/brand/work/work-adventure-mobile.jpg",
    thumbs: ["/brand/places/himalaya.jpg", "/brand/work/summit-seek.jpg", "/brand/work/work-adventure-mobile.jpg"],
  },
  {
    id: "site-09",
    host: "marlohotels.com",
    brand: "Marlo",
    links: ["Stay", "Dine", "Events"],
    kicker: "City hotel",
    title: "A quiet night in town.",
    cta: "Reserve",
    image: "/brand/work/marlo-hotels.jpg",
    thumbs: ["/brand/work/thamel-hotel.jpg", "/brand/portfolio/thamel-park-hotel.webp", "/brand/work/marlo-hotels.jpg"],
  },
  {
    id: "site-10",
    host: "kalon.spa",
    brand: "Kalon",
    links: ["Rituals", "Book", "Gift"],
    kicker: "Spa",
    title: "Slow the whole day down.",
    cta: "Book a ritual",
    image: "/brand/work/kaya-spa.jpg",
    thumbs: ["/brand/work/zen-spa.jpg", "/brand/work/thamel-spa.jpg", "/brand/work/kaya-spa.jpg"],
    light: true,
  },
  {
    id: "site-11",
    host: "nona.kitchen",
    brand: "Nona",
    links: ["Menu", "Table", "Chef"],
    kicker: "Restaurant",
    title: "Tonight’s table is set.",
    cta: "Reserve",
    image: "/brand/hero-bright-office.jpg",
    thumbs: ["/brand/work/work-bakery.jpg", "/brand/hero-uhd.jpg", "/brand/work/work-journey.jpg"],
  },
  {
    id: "site-12",
    host: "threadand.co",
    brand: "Thread",
    links: ["New", "Women", "Men"],
    kicker: "Studio shop",
    title: "The new drop is live.",
    cta: "Shop",
    image: "/brand/portfolio/first-choice-interior.webp",
    thumbs: ["/brand/studio-service-web.jpg", "/brand/work/work-realty.jpg", "/brand/hero-studio.png"],
    light: true,
  },
  {
    id: "site-13",
    host: "volt.fit",
    brand: "Volt",
    links: ["Classes", "App", "Join"],
    kicker: "Training",
    title: "Train before sunrise.",
    cta: "Join a class",
    image: "/brand/places/himalaya.jpg",
    thumbs: ["/brand/work/work-adventure-mobile.jpg", "/brand/places/city.jpg", "/brand/places/himalaya.jpg"],
  },
  {
    id: "site-14",
    host: "kindwell.clinic",
    brand: "Kindwell",
    links: ["Care", "Doctors", "Visit"],
    kicker: "Clinic",
    title: "Care that feels human.",
    cta: "Book visit",
    image: "/brand/work/zen-spa.jpg",
    thumbs: ["/brand/work/thamel-spa.jpg", "/brand/work/kaya-spa.jpg", "/brand/offices/india.jpg"],
    light: true,
  },
  {
    id: "site-15",
    host: "ledgerly.io",
    brand: "Ledgerly",
    links: ["Platform", "Security", "Login"],
    kicker: "Finance",
    title: "Cash, clear and live.",
    cta: "Open account",
    image: "/brand/offices/usa.jpg",
    thumbs: ["/brand/work/work-ai-saas.jpg", "/brand/soft-previews/01.png", "/brand/hero-uhd-office.jpg"],
  },
  {
    id: "site-16",
    host: "summitseek.com",
    brand: "Summit",
    links: ["Treks", "Dates", "Gear"],
    kicker: "Trekking",
    title: "Walk into the cloud line.",
    cta: "See dates",
    image: "/brand/work/summit-seek.jpg",
    thumbs: ["/brand/places/himalaya.jpg", "/brand/work/ambition-holidays.jpg", "/brand/places/pagoda.jpg"],
  },
];

export function DemoWebsite({ site }: { site: DemoSiteTheme }) {
  return (
    <article className={`orbit-ds${site.light ? " is-light" : ""}`} aria-hidden="true">
      <div className="orbit-ds-shot">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={site.image} alt="" />
        <div className="orbit-ds-veil" />
        <header className="orbit-ds-nav">
          <strong>{site.brand}</strong>
          <nav>
            {site.links.map((link) => (
              <span key={link}>{link}</span>
            ))}
          </nav>
        </header>
        <section className="orbit-ds-hero">
          <em>{site.kicker}</em>
          <h3>{site.title}</h3>
          <b>{site.cta}</b>
        </section>
      </div>
      <div className="orbit-ds-row">
        {site.thumbs.map((src) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={src} src={src} alt="" />
        ))}
      </div>
    </article>
  );
}

type SoftRow = { a: string; b: string; c: string; d: string };

const APPS: {
  product: string;
  nav: string[];
  kpis: [string, string][];
  rows: SoftRow[];
  kind: "table" | "rooms" | "pos" | "board";
}[] = [
  {
    product: "Orbit Billing",
    nav: ["Home", "Invoices", "GST"],
    kpis: [["Due", "₹ 4.2L"], ["Paid", "128"], ["Overdue", "7"]],
    rows: [
      { a: "INV-1042", b: "Marlo Hotels", c: "₹ 84,200", d: "Due" },
      { a: "INV-1041", b: "Kalon Spa", c: "₹ 21,400", d: "Paid" },
      { a: "INV-1040", b: "Nona Kitchen", c: "₹ 9,850", d: "Paid" },
      { a: "INV-1039", b: "Haven Realty", c: "₹ 1.2L", d: "Due" },
    ],
    kind: "table",
  },
  {
    product: "Orbit Hotel",
    nav: ["Front", "Rooms", "HK"],
    kpis: [["Occ.", "86%"], ["Arrivals", "14"], ["Out", "9"]],
    rows: [
      { a: "204", b: "Deluxe · King", c: "Sharma", d: "In" },
      { a: "311", b: "Suite · Lake", c: "Chen", d: "In" },
      { a: "118", b: "Twin", c: "—", d: "Clean" },
      { a: "402", b: "Family", c: "Thapa", d: "Out" },
    ],
    kind: "rooms",
  },
  {
    product: "Orbit OTA",
    nav: ["Rates", "iCal", "Inbox"],
    kpis: [["Booking.com", "On"], ["Agoda", "On"], ["Expedia", "Sync"]],
    rows: [
      { a: "Deluxe", b: "₹ 12,400", c: "4 left", d: "Live" },
      { a: "Suite", b: "₹ 21,900", c: "1 left", d: "Live" },
      { a: "Twin", b: "₹ 8,200", c: "7 left", d: "Live" },
      { a: "Dorm", b: "₹ 1,650", c: "12 left", d: "Hold" },
    ],
    kind: "table",
  },
  {
    product: "Orbit WMS",
    nav: ["Stock", "Pick", "Bins"],
    kpis: [["SKUs", "2,418"], ["Low", "23"], ["Pick", "64"]],
    rows: [
      { a: "SKU-441", b: "Linen set", c: "Bin A12", d: "12" },
      { a: "SKU-208", b: "Soap kit", c: "Bin C03", d: "4" },
      { a: "SKU-990", b: "Mug · navy", c: "Bin D19", d: "86" },
      { a: "SKU-017", b: "Key card", c: "Bin A01", d: "210" },
    ],
    kind: "table",
  },
  {
    product: "Orbit ERP",
    nav: ["WO", "BOM", "QC"],
    kpis: [["Open WO", "18"], ["Late", "2"], ["Pass", "99%"]],
    rows: [
      { a: "WO-88", b: "Frame weld", c: "Line 2", d: "Run" },
      { a: "WO-87", b: "Paint", c: "Line 1", d: "QC" },
      { a: "WO-86", b: "Pack", c: "Dock", d: "Done" },
      { a: "WO-85", b: "CNC plate", c: "Line 3", d: "Wait" },
    ],
    kind: "board",
  },
  {
    product: "Orbit POS",
    nav: ["Floor", "KDS", "Pay"],
    kpis: [["T4", "Open"], ["Covers", "6"], ["₹", "4,820"]],
    rows: [
      { a: "Thali", b: "2", c: "₹ 1,280", d: "Fire" },
      { a: "Momo", b: "1", c: "₹ 420", d: "Ready" },
      { a: "Chiya", b: "3", c: "₹ 240", d: "Served" },
      { a: "Gulab", b: "2", c: "₹ 360", d: "Hold" },
    ],
    kind: "pos",
  },
  {
    product: "Orbit CRM",
    nav: ["Leads", "Deals", "Tasks"],
    kpis: [["Open", "36"], ["Won", "8"], ["This wk", "₹ 9L"]],
    rows: [
      { a: "Peak Lodge", b: "Website", c: "Proposal", d: "Hot" },
      { a: "Kalon Spa", b: "SEO", c: "Discovery", d: "New" },
      { a: "Marlo", b: "PMS", c: "Negotiate", d: "Hot" },
      { a: "Haven", b: "App", c: "Won", d: "Closed" },
    ],
    kind: "table",
  },
  {
    product: "Orbit Suite",
    nav: ["Today", "Team", "Auto"],
    kpis: [["MRR", "$48k"], ["Churn", "1.2%"], ["NPS", "72"]],
    rows: [
      { a: "Billing", b: "Live", c: "128 inv", d: "OK" },
      { a: "CRM", b: "Live", c: "36 deals", d: "OK" },
      { a: "POS", b: "Live", c: "4 stores", d: "OK" },
      { a: "WMS", b: "Beta", c: "1 warehouse", d: "Watch" },
    ],
    kind: "table",
  },
  {
    product: "Orbit Apps",
    nav: ["Web", "iOS", "Staff"],
    kpis: [["Builds", "12"], ["Crash", "0.1%"], ["Users", "4.8k"]],
    rows: [
      { a: "Guest app", b: "iOS 3.2", c: "Live", d: "Store" },
      { a: "Housekeeping", b: "Android", c: "Live", d: "Staff" },
      { a: "Owner portal", b: "Web", c: "Live", d: "SSO" },
      { a: "Driver", b: "iOS 1.4", c: "Test", d: "QA" },
    ],
    kind: "table",
  },
  {
    product: "Orbit Admin",
    nav: ["Tenants", "Plans", "Logs"],
    kpis: [["Orgs", "64"], ["Seats", "1,102"], ["Usage", "82%"]],
    rows: [
      { a: "marlo", b: "Pro", c: "48 seats", d: "Active" },
      { a: "kalon", b: "Starter", c: "6 seats", d: "Active" },
      { a: "haven", b: "Pro", c: "22 seats", d: "Trial" },
      { a: "nona", b: "POS", c: "3 seats", d: "Active" },
    ],
    kind: "table",
  },
];

export function SoftwareProductUi({
  title,
  accent,
  index,
}: {
  title: string;
  accent: string;
  index: number;
}) {
  const app = APPS[index] ?? APPS[0];
  return (
    <div className={`orbit-app is-${app.kind}`} style={{ "--soft-accent": accent } as CSSProperties} aria-hidden="true">
      <header className="orbit-app-bar">
        <strong>{app.product}</strong>
        <span>{title}</span>
      </header>
      <div className="orbit-app-nav">
        {app.nav.map((item, i) => (
          <b key={item} className={i === 0 ? "is-on" : undefined}>
            {item}
          </b>
        ))}
      </div>
      <div className="orbit-app-kpis">
        {app.kpis.map(([label, value]) => (
          <div key={label}>
            <em>{label}</em>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
      {app.kind === "pos" ? (
        <div className="orbit-app-pos">
          {app.rows.map((row) => (
            <div key={row.a}>
              <b>{row.a}</b>
              <i>{row.c}</i>
              <em>{row.d}</em>
            </div>
          ))}
        </div>
      ) : app.kind === "rooms" ? (
        <div className="orbit-app-rooms">
          {app.rows.map((row) => (
            <div key={row.a} className={row.d === "In" ? "is-in" : undefined}>
              <b>{row.a}</b>
              <span>{row.b}</span>
              <em>{row.d}</em>
            </div>
          ))}
        </div>
      ) : app.kind === "board" ? (
        <div className="orbit-app-board">
          {app.rows.map((row) => (
            <div key={row.a}>
              <em>{row.d}</em>
              <b>{row.a}</b>
              <span>{row.b}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="orbit-app-table">
          {app.rows.map((row) => (
            <div key={row.a}>
              <b>{row.a}</b>
              <span>{row.b}</span>
              <i>{row.c}</i>
              <em>{row.d}</em>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
