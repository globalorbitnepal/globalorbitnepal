import type { CSSProperties } from "react";

export type DemoSiteTheme = {
  id: string;
  host: string;
  brand: string;
  links: [string, string, string];
  kicker: string;
  title: string;
  cta: string;
  bg: string;
  ink: string;
  muted: string;
  accent: string;
  hero: string;
  panel: string;
};

export const DEMO_SITES: DemoSiteTheme[] = [
  { id: "site-01", host: "atelierbakery.com", brand: "Atelier", links: ["Menu", "Shop", "Visit"], kicker: "Bakery", title: "Morning pastry.", cta: "Order", bg: "#f7f1e8", ink: "#2a1c12", muted: "#8a7464", accent: "#c45c26", hero: "#ead9c4", panel: "#fff" },
  { id: "site-02", host: "forma.studio", brand: "Forma", links: ["Work", "Studio", "Index"], kicker: "Architecture", title: "Quiet rooms.", cta: "View", bg: "#111111", ink: "#f4f0ea", muted: "#9a9388", accent: "#c9a227", hero: "#1c1c1c", panel: "#1a1a1a" },
  { id: "site-03", host: "northline.travel", brand: "Northline", links: ["Trips", "Stay", "Guide"], kicker: "Travel", title: "Go farther.", cta: "Plan", bg: "#0c1a24", ink: "#eef6fb", muted: "#8aa4b5", accent: "#3aa0d8", hero: "#143044", panel: "#102433" },
  { id: "site-04", host: "lumen.law", brand: "Lumen", links: ["Practice", "Team", "Contact"], kicker: "Counsel", title: "Clear counsel.", cta: "Call", bg: "#0f1724", ink: "#f5f1e8", muted: "#9aa6b5", accent: "#d4b06a", hero: "#172033", panel: "#151d2c" },
  { id: "site-05", host: "peaklodge.com", brand: "Peak Lodge", links: ["Rooms", "Spa", "Dine"], kicker: "Resort", title: "Stay high.", cta: "Book", bg: "#14110f", ink: "#f6efe6", muted: "#b3a394", accent: "#e2c08a", hero: "#231c18", panel: "#1c1714" },
  { id: "site-06", host: "havenrealty.co", brand: "Haven", links: ["Buy", "Rent", "Sell"], kicker: "Realty", title: "Find home.", cta: "Search", bg: "#f4f1ec", ink: "#1b1a17", muted: "#7d776e", accent: "#2f5d50", hero: "#e6e0d6", panel: "#fff" },
  { id: "site-07", host: "orbitpulse.ai", brand: "Pulse", links: ["Product", "Pricing", "Docs"], kicker: "SaaS", title: "See revenue.", cta: "Start", bg: "#0b1020", ink: "#eef2ff", muted: "#8b93b3", accent: "#6366f1", hero: "#151b33", panel: "#12182c" },
  { id: "site-08", host: "wildline.co", brand: "Wildline", links: ["Rides", "Gear", "Club"], kicker: "Adventure", title: "Ride wild.", cta: "Join", bg: "#081412", ink: "#e8fff6", muted: "#7eaa9a", accent: "#34d399", hero: "#0e221c", panel: "#0c1c18" },
  { id: "site-09", host: "marlohotels.com", brand: "Marlo", links: ["Stay", "Dining", "Events"], kicker: "Hotel", title: "City quiet.", cta: "Reserve", bg: "#121214", ink: "#f3f1ec", muted: "#a09b94", accent: "#f0c43a", hero: "#1c1c20", panel: "#18181c" },
  { id: "site-10", host: "kalon.spa", brand: "Kalon", links: ["Rituals", "Book", "Gift"], kicker: "Spa", title: "Slow down.", cta: "Book", bg: "#f6ece8", ink: "#3b2a28", muted: "#a08884", accent: "#c47880", hero: "#ead8d4", panel: "#fff" },
  { id: "site-11", host: "nona.kitchen", brand: "Nona", links: ["Menu", "Table", "Chef"], kicker: "Dining", title: "Tonight.", cta: "Reserve", bg: "#1a120e", ink: "#f8efe4", muted: "#b8a090", accent: "#e07a3d", hero: "#2a1c16", panel: "#221812" },
  { id: "site-12", host: "threadand.co", brand: "Thread", links: ["New", "Women", "Men"], kicker: "Fashion", title: "New drop.", cta: "Shop", bg: "#f7f7f5", ink: "#111111", muted: "#76766f", accent: "#111111", hero: "#ecece8", panel: "#fff" },
  { id: "site-13", host: "volt.fit", brand: "Volt", links: ["Classes", "App", "Join"], kicker: "Fitness", title: "Train now.", cta: "Start", bg: "#0a0a0a", ink: "#f4f4f4", muted: "#8c8c8c", accent: "#c8ff3d", hero: "#141414", panel: "#111" },
  { id: "site-14", host: "kindwell.clinic", brand: "Kindwell", links: ["Care", "Doctors", "Visit"], kicker: "Clinic", title: "Feel well.", cta: "Book", bg: "#f3f8f7", ink: "#14323a", muted: "#6e8b90", accent: "#2a9d8f", hero: "#dceeea", panel: "#fff" },
  { id: "site-15", host: "ledgerly.io", brand: "Ledgerly", links: ["Platform", "Security", "Login"], kicker: "Fintech", title: "Cash, clear.", cta: "Open", bg: "#0b1220", ink: "#e8eefc", muted: "#8b97b3", accent: "#60a5fa", hero: "#121c30", panel: "#10182a" },
  { id: "site-16", host: "summitseek.com", brand: "Summit", links: ["Treks", "Dates", "Gear"], kicker: "Trekking", title: "Walk up.", cta: "Dates", bg: "#10140f", ink: "#eef6e8", muted: "#93a88a", accent: "#86c232", hero: "#1a2218", panel: "#161c14" },
];

export function DemoWebsite({ site }: { site: DemoSiteTheme }) {
  const style = {
    "--ds-bg": site.bg,
    "--ds-ink": site.ink,
    "--ds-muted": site.muted,
    "--ds-accent": site.accent,
    "--ds-hero": site.hero,
    "--ds-panel": site.panel,
  } as CSSProperties;

  return (
    <article className="orbit-ds" style={style} aria-hidden="true">
      <div className="orbit-ds-chrome">
        <span />
        <span />
        <span />
        <p>{site.host}</p>
      </div>
      <div className="orbit-ds-page">
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
        <div className="orbit-ds-grid">
          <i />
          <i />
          <i />
        </div>
      </div>
    </article>
  );
}

export const SOFTWARE_UIs = [
  { bars: [72, 54, 88], label: "Invoices" },
  { bars: [64, 80, 48], label: "Rooms" },
  { bars: [90, 40, 66], label: "Channels" },
  { bars: [50, 78, 62], label: "Stock" },
  { bars: [84, 58, 70], label: "Orders" },
  { bars: [46, 92, 60], label: "Tables" },
  { bars: [68, 44, 86], label: "Pipeline" },
  { bars: [76, 82, 55], label: "Revenue" },
  { bars: [58, 70, 90], label: "Apps" },
  { bars: [80, 52, 74], label: "Tenants" },
] as const;

export function SoftwareProductUi({
  title,
  accent,
  index,
}: {
  title: string;
  accent: string;
  index: number;
}) {
  const ui = SOFTWARE_UIs[index] ?? SOFTWARE_UIs[0];
  return (
    <div className="orbit-soft-ui" style={{ "--soft-accent": accent } as CSSProperties} aria-hidden="true">
      <div className="orbit-soft-ui-chrome">
        <span />
        <span />
        <span />
        <p>{title.toLowerCase().replace(/\s+/g, "")}.app</p>
      </div>
      <div className="orbit-soft-ui-body">
        <aside>
          <b />
          <i />
          <i />
          <i />
        </aside>
        <div className="orbit-soft-ui-main">
          <header>
            <strong>{ui.label}</strong>
            <em />
          </header>
          <div className="orbit-soft-ui-stats">
            {ui.bars.map((n) => (
              <span key={n}>
                <b style={{ height: `${n}%` }} />
              </span>
            ))}
          </div>
          <ul>
            <li />
            <li />
            <li />
          </ul>
        </div>
      </div>
    </div>
  );
}
