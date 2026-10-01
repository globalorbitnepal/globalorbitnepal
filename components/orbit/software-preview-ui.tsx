import type { CSSProperties, ReactNode } from "react";

type PreviewProps = {
  slug: string;
  title: string;
  summary: string;
  accent: string;
  previewSrc?: string;
};

const NAV: Record<string, string[]> = {
  "billing-software": ["Dashboard", "Invoices", "Customers", "Products", "Reports", "Settings"],
  "hotel-management-system": ["Dashboard", "Rooms", "Bookings", "Guests", "Reports", "Settings"],
  "ota-management-system": ["Dashboard", "Channels", "Bookings", "Rates", "Properties", "Settings"],
  "warehouse-management": ["Dashboard", "Products", "Stock In", "Stock Out", "Reports", "Settings"],
  "restaurant-pos": ["Dashboard", "Orders", "Menu", "Tables", "Reports", "Settings"],
  "crm-software": ["Dashboard", "Leads", "Deals", "Contacts", "Pipeline", "Settings"],
};

function CardShell({
  title,
  summary,
  accent,
  nav,
  children,
}: {
  title: string;
  summary: string;
  accent: string;
  nav: string[];
  children: ReactNode;
}) {
  return (
    <div className="orbit-ref-sw" style={{ "--sw-accent": accent } as CSSProperties} aria-hidden="true">
      <div className="orbit-ref-sw-head">
        <div className="orbit-ref-sw-brand">
          <span className="orbit-ref-sw-icon" />
          <div>
            <strong>{title}</strong>
            <p>{summary}</p>
          </div>
        </div>
        <span className="orbit-ref-sw-arrow" aria-hidden="true">
          ↗
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

function BillingUi() {
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
            <linearGradient id="ref-bill-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(99,102,241,0.45)" />
              <stop offset="100%" stopColor="rgba(99,102,241,0)" />
            </linearGradient>
          </defs>
          <path
            d="M0 62 C40 58, 55 48, 80 52 S120 28, 160 34 S220 18, 260 22 S300 8, 320 12 L320 88 L0 88 Z"
            fill="url(#ref-bill-fill)"
          />
          <path
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
          <div className="orbit-ref-donut-ring" style={{ "--pct": "86" } as CSSProperties}>
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
            <li key={name}>
              <span>{name}</span>
              <i style={{ "--w": pct } as CSSProperties}>
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
              <i style={{ height: h } as CSSProperties} />
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
    ["New Lead", "320", "25%"],
    ["Contacted", "280", "22%"],
    ["Proposal", "540", "38%"],
    ["Closed", "280", "15%"],
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
              <i style={{ height: pct } as CSSProperties} />
              <b>{val}</b>
              <span>{label}</span>
              <em>{pct}</em>
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
      return <BillingUi />;
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
      return <BillingUi />;
  }
}

export function SoftwareProductUi({ slug, title, summary, accent }: PreviewProps) {
  return (
    <CardShell
      title={title}
      summary={summary}
      accent={accent}
      nav={NAV[slug] ?? ["Dashboard", "Reports", "Settings"]}
    >
      <PreviewBody slug={slug} />
    </CardShell>
  );
}
