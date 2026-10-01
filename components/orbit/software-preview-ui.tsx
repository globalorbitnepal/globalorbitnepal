import type { CSSProperties, ReactNode, SVGProps } from "react";

type PreviewProps = {
  slug: string;
  title: string;
  accent: string;
  previewSrc?: string;
};

const TAGLINE: Record<string, string> = {
  "billing-software": "Smart invoicing for modern businesses",
  "hotel-management-system": "Complete solution for hotels & resorts",
  "ota-management-system": "Manage all your channels in one place",
  "warehouse-management": "Track inventory with real-time updates",
  "restaurant-pos": "Modern POS for restaurants & cafes",
  "crm-software": "Manage leads, customers and sales",
};

const NAV: Record<string, string[]> = {
  "billing-software": ["Dashboard", "Invoices", "Customers", "Products", "Reports", "Settings"],
  "hotel-management-system": ["Dashboard", "Bookings", "Rooms", "Guests", "Housekeeping", "Reports", "Settings"],
  "ota-management-system": ["Dashboard", "Channels", "Bookings", "Calendar", "Analytics", "Settings"],
  "warehouse-management": ["Dashboard", "Inventory", "Products", "Stock In/Out", "Suppliers", "Reports", "Settings"],
  "restaurant-pos": ["Dashboard", "Orders", "Menu", "Tables", "Customers", "Settings"],
  "crm-software": ["Dashboard", "Leads", "Customers", "Deals", "Tasks", "Analytics", "Settings"],
};

function IconGlyph({ slug, ...props }: { slug: string } & SVGProps<SVGSVGElement>) {
  const common = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, ...props };
  switch (slug) {
    case "billing-software":
      return (
        <svg {...common}>
          <path d="M7 4h10v16H7z" />
          <path d="M9 8h6M9 12h6M9 16h4" />
        </svg>
      );
    case "hotel-management-system":
      return (
        <svg {...common}>
          <path d="M4 10h16v10H4z" />
          <path d="M8 10V6h8v4M8 14h2M14 14h2" />
        </svg>
      );
    case "ota-management-system":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M2 12h20M12 4a14 14 0 0 1 0 16M12 4a14 14 0 0 0 0 16" />
        </svg>
      );
    case "warehouse-management":
      return (
        <svg {...common}>
          <path d="M3 9l9-5 9 5v11H3z" />
          <path d="M9 20V12h6v8" />
        </svg>
      );
    case "restaurant-pos":
      return (
        <svg {...common}>
          <path d="M4 4h16v6H4zM6 10v10M12 10v10M18 10v10" />
        </svg>
      );
    case "crm-software":
      return (
        <svg {...common}>
          <path d="M16 11a4 4 0 1 0-8 0" />
          <path d="M4 20a8 8 0 0 1 16 0" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="3" />
        </svg>
      );
  }
}

function CardShell({
  slug,
  title,
  tagline,
  accent,
  nav,
  children,
}: {
  slug: string;
  title: string;
  tagline: string;
  accent: string;
  nav: string[];
  children: ReactNode;
}) {
  return (
    <div className="orbit-ref-sw" style={{ "--sw-accent": accent } as CSSProperties} aria-hidden="true">
      <div className="orbit-ref-sw-head">
        <div className="orbit-ref-sw-brand">
          <span className="orbit-ref-sw-icon">
            <IconGlyph slug={slug} />
          </span>
          <div>
            <strong>{title}</strong>
            <p>{tagline}</p>
          </div>
        </div>
        <span className="orbit-ref-sw-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M17 7H9M17 7v8" />
          </svg>
        </span>
      </div>
      <div className="orbit-ref-sw-layout">
        <aside className="orbit-ref-sw-nav">
          {nav.map((item, index) => (
            <span key={item} data-on={index === 0 ? "1" : undefined}>
              <i />
              {item}
            </span>
          ))}
        </aside>
        <div className="orbit-ref-sw-body">{children}</div>
      </div>
    </div>
  );
}

function StatPair({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="orbit-ref-stats">
      {items.map((item) => (
        <div key={item.label}>
          <em>{item.label}</em>
          <b>{item.value}</b>
        </div>
      ))}
    </div>
  );
}

function BillingUi({ slug }: { slug: string }) {
  return (
    <>
      <StatPair
        items={[
          { label: "Total Invoices", value: "1,248" },
          { label: "Total Revenue", value: "$24,680" },
        ]}
      />
      <div className="orbit-ref-panel">
        <div className="orbit-ref-panel-h">
          <b>Revenue Overview</b>
        </div>
        <svg className="orbit-ref-linechart" viewBox="0 0 320 88" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`ref-bill-fill-${slug}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(99,102,241,0.5)" />
              <stop offset="100%" stopColor="rgba(99,102,241,0)" />
            </linearGradient>
          </defs>
          <path
            className="orbit-ref-chart-fill"
            d="M0 62 C40 58, 55 48, 80 52 S120 28, 160 34 S220 18, 260 22 S300 8, 320 12 L320 88 L0 88 Z"
            fill={`url(#ref-bill-fill-${slug})`}
          />
          <path
            className="orbit-ref-chart-line"
            d="M0 62 C40 58, 55 48, 80 52 S120 28, 160 34 S220 18, 260 22 S300 8, 320 12"
            fill="none"
            stroke="#818cf8"
            strokeWidth="2.5"
          />
        </svg>
        <div className="orbit-ref-axis">
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </div>
    </>
  );
}

function HotelUi() {
  return (
    <>
      <StatPair
        items={[
          { label: "Total Bookings", value: "128" },
          { label: "Occupancy Rate", value: "86%" },
        ]}
      />
      <div className="orbit-ref-panel orbit-ref-donut-wrap">
        <div className="orbit-ref-panel-h">
          <b>Room Occupancy</b>
        </div>
        <div className="orbit-ref-donut">
          <div className="orbit-ref-donut-ring orbit-ref-animate-ring" style={{ "--pct": "86" } as CSSProperties}>
            <span>86%</span>
          </div>
          <ul>
            <li>
              <i data-tone="blue" /> Occupied <em>86%</em>
            </li>
            <li>
              <i data-tone="mint" /> Available <em>10%</em>
            </li>
            <li>
              <i data-tone="amber" /> Maintenance <em>4%</em>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

function OtaUi() {
  const rows = [
    ["Booking.com", "42%"],
    ["Agoda", "26%"],
    ["Expedia", "18%"],
    ["Airbnb", "14%"],
  ];
  return (
    <>
      <StatPair
        items={[
          { label: "Total Bookings", value: "420" },
          { label: "Total Revenue", value: "$12,450" },
        ]}
      />
      <div className="orbit-ref-panel">
        <div className="orbit-ref-panel-h">
          <b>Channel Performance</b>
        </div>
        <ul className="orbit-ref-bars-h">
          {rows.map(([name, pct]) => (
            <li key={name} style={{ "--w": pct } as CSSProperties}>
              <span>{name}</span>
              <i>
                <b />
              </i>
              <em>{pct}</em>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function WarehouseUi() {
  return (
    <>
      <StatPair
        items={[
          { label: "Total Products", value: "1,248" },
          { label: "Low Stock", value: "42" },
        ]}
      />
      <div className="orbit-ref-panel">
        <div className="orbit-ref-panel-h">
          <b>Stock Overview</b>
        </div>
        <div className="orbit-ref-bars-v">
          {[
            ["In Stock", "72%", "green"],
            ["Low Stock", "18%", "amber"],
            ["Out of Stock", "10%", "red"],
          ].map(([label, h, tone]) => (
            <div key={label} data-tone={tone}>
              <i className="orbit-ref-bar-grow" style={{ height: h } as CSSProperties} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function PosUi() {
  const items = [
    ["Pizza", "48 orders", "/brand/soft-pos/pos-pizza.jpg"],
    ["Burger", "36 orders", "/brand/soft-pos/pos-burger.jpg"],
    ["Pasta", "28 orders", "/brand/soft-pos/pos-pasta.jpg"],
    ["Salad", "22 orders", "/brand/soft-pos/pos-salad.jpg"],
  ];
  return (
    <>
      <StatPair
        items={[
          { label: "Today's Orders", value: "186" },
          { label: "Total Sales", value: "$2,850" },
        ]}
      />
      <div className="orbit-ref-panel">
        <div className="orbit-ref-panel-h">
          <b>Popular Items</b>
        </div>
        <div className="orbit-ref-popular">
          {items.map(([name, orders, src]) => (
            <div key={name}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" />
              <span>{name}</span>
              <em>{orders}</em>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function CrmUi() {
  const stages = [
    ["New Lead", "320", "62%"],
    ["Contacted", "280", "54%"],
    ["Proposal", "540", "88%"],
    ["Closed", "280", "48%"],
  ];
  return (
    <>
      <StatPair
        items={[
          { label: "Total Leads", value: "1,420" },
          { label: "Closed Deals", value: "620" },
        ]}
      />
      <div className="orbit-ref-panel">
        <div className="orbit-ref-panel-h">
          <b>Sales Pipeline</b>
        </div>
        <div className="orbit-ref-pipeline">
          {stages.map(([label, val, pct]) => (
            <div key={label}>
              <i className="orbit-ref-bar-grow" style={{ height: pct } as CSSProperties} />
              <b>{val}</b>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function PreviewBody({ slug }: { slug: string }) {
  switch (slug) {
    case "billing-software":
      return <BillingUi slug={slug} />;
    case "hotel-management-system":
      return <HotelUi />;
    case "ota-management-system":
      return <OtaUi />;
    case "warehouse-management":
      return <WarehouseUi />;
    case "restaurant-pos":
      return <PosUi />;
    case "crm-software":
      return <CrmUi />;
    default:
      return <BillingUi slug={slug} />;
  }
}

export function SoftwareProductUi({ slug, title, accent }: PreviewProps) {
  return (
    <CardShell
      slug={slug}
      title={title}
      tagline={TAGLINE[slug] ?? ""}
      accent={accent}
      nav={NAV[slug] ?? ["Dashboard", "Reports", "Settings"]}
    >
      <PreviewBody slug={slug} />
    </CardShell>
  );
}
