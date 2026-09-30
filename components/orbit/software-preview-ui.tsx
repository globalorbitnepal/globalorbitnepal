import type { CSSProperties, ReactNode } from "react";

type PreviewProps = {
  slug: string;
  title: string;
  accent: string;
  previewSrc?: string;
};

function Frame({
  title,
  accent,
  module,
  children,
}: {
  title: string;
  accent: string;
  module: string;
  children: ReactNode;
}) {
  return (
    <div className="orbit-sw" style={{ "--sw-accent": accent } as CSSProperties} aria-hidden="true">
      <div className="orbit-sw-chrome">
        <span className="orbit-sw-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="orbit-sw-live">Live</span>
      </div>
      <div className="orbit-sw-name">
        <strong>{title}</strong>
        <em>{module}</em>
      </div>
      <div className="orbit-sw-viewport">{children}</div>
    </div>
  );
}

function Shell({ nav, children }: { nav: string[]; children: ReactNode }) {
  return (
    <div className="orbit-sw-shell">
      <aside className="orbit-sw-nav">
        {nav.map((item, index) => (
          <span key={item} data-on={index === 0 ? "1" : undefined} title={item}>
            {item.slice(0, 2)}
          </span>
        ))}
      </aside>
      <div className="orbit-sw-body">{children}</div>
    </div>
  );
}

function Kpis({ items }: { items: [string, string][] }) {
  return (
    <div className="orbit-sw-kpis">
      {items.map(([label, value]) => (
        <div key={label}>
          <em>{label}</em>
          <b>{value}</b>
        </div>
      ))}
    </div>
  );
}

function BillingUi() {
  return (
    <Shell nav={["Invoices", "Clients", "GST", "Payouts", "Reports"]}>
      <Kpis items={[
        ["Today", "12 inv"],
        ["Overdue", "₹ 1.2L"],
        ["Collected", "₹ 8.4L"],
      ]} />
      <div className="orbit-sw-table-wrap">
        <table className="orbit-sw-table">
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Client</th>
              <th>Due</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["INV-2048", "Marlo Hotels", "₹ 84,200", "Paid"],
              ["INV-2047", "Kalon Spa", "₹ 31,400", "Due"],
              ["INV-2046", "Haven Lodge", "₹ 56,900", "GST"],
              ["INV-2045", "Peak Trek", "₹ 18,750", "Draft"],
              ["INV-2044", "Nona Cafe", "₹ 9,820", "Paid"],
            ].map(([id, client, amt, st]) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{client}</td>
                <td>{amt}</td>
                <td data-st={st}>{st}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Shell>
  );
}

function HotelUi() {
  const rooms = [
    ["204", "In", "Deluxe"],
    ["311", "In", "Suite"],
    ["118", "HK", "Twin"],
    ["402", "Out", "Family"],
    ["205", "Dirt", "King"],
    ["109", "In", "Std"],
    ["221", "In", "Deluxe"],
    ["330", "HK", "Suite"],
    ["107", "Out", "Twin"],
    ["415", "In", "Family"],
    ["208", "Vac", "King"],
    ["112", "In", "Std"],
  ];
  return (
    <Shell nav={["Front", "Rooms", "HK", "F&B", "Night"]}>
      <Kpis items={[
        ["Occupancy", "86%"],
        ["Arrivals", "14"],
        ["HK", "6 pending"],
      ]} />
      <div className="orbit-sw-rooms">
        {rooms.map(([no, st, type]) => (
          <div key={no} data-st={st}>
            <b>{no}</b>
            <span>{type}</span>
            <em>{st}</em>
          </div>
        ))}
      </div>
    </Shell>
  );
}

function OtaUi() {
  return (
    <Shell nav={["Rates", "OTA", "Books", "Map", "Logs"]}>
      <div className="orbit-sw-channels">
        {[
          ["BC", "Booking.com", "Live", "42"],
          ["AG", "Agoda", "Live", "28"],
          ["EX", "Expedia", "Sync", "19"],
        ].map(([code, name, st, n]) => (
          <div key={code}>
            <b>{code}</b>
            <span>{name}</span>
            <em data-st={st}>{st}</em>
            <small>{n} res</small>
          </div>
        ))}
      </div>
      <div className="orbit-sw-table-wrap">
        <table className="orbit-sw-table">
          <thead>
            <tr>
              <th>Room</th>
              <th>Rate</th>
              <th>Avail</th>
              <th>Stop</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Deluxe King", "₹ 12,400", "4", "Off"],
              ["Lake Suite", "₹ 21,900", "1", "Off"],
              ["Twin Garden", "₹ 8,200", "7", "Off"],
              ["Family Quad", "₹ 16,500", "2", "On"],
            ].map(([name, rate, left, stop]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{rate}</td>
                <td>{left}</td>
                <td data-st={stop === "On" ? "Due" : "Paid"}>{stop}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Shell>
  );
}

function WarehouseUi() {
  return (
    <Shell nav={["Pick", "Put", "Stock", "Dock", "Cycle"]}>
      <Kpis items={[
        ["Wave", "PW-441"],
        ["Lines", "64"],
        ["Fill", "92%"],
      ]} />
      <div className="orbit-sw-split">
        <ul className="orbit-sw-list">
          {[
            ["A12", "Linen set", "×12", "Done"],
            ["C03", "Soap kit", "×40", "Pick"],
            ["D19", "Mug navy", "×86", "Queue"],
            ["B07", "Pillow", "×24", "Pick"],
            ["A04", "Towel XL", "×60", "Done"],
          ].map(([bin, sku, qty, st]) => (
            <li key={bin}>
              <b>{bin}</b>
              <span>
                {sku} {qty}
              </span>
              <em data-st={st}>{st}</em>
            </li>
          ))}
        </ul>
        <div className="orbit-sw-bins">
          {["A", "B", "C", "D", "E", "F", "G", "H"].map((zone, i) => (
            <i key={zone} data-hot={i % 3 === 0 ? "1" : undefined}>
              {zone}
            </i>
          ))}
        </div>
      </div>
    </Shell>
  );
}

function ErpUi() {
  return (
    <Shell nav={["WO", "BOM", "QC", "MRP", "Cost"]}>
      <div className="orbit-sw-wo">
        <em>Work order</em>
        <strong>WO-88 · Frame weld · Line 2</strong>
        <span>Qty 240 · Yield 99.2% · ETA 16:40</span>
      </div>
      <div className="orbit-sw-steps">
        {[
          ["Cut", "Done"],
          ["Weld", "Run"],
          ["Paint", "QC"],
          ["Pack", "Wait"],
        ].map(([step, st]) => (
          <div key={step} data-st={st}>
            <b>{step}</b>
            <em>{st}</em>
          </div>
        ))}
      </div>
      <div className="orbit-sw-table-wrap">
        <table className="orbit-sw-table">
          <thead>
            <tr>
              <th>Part</th>
              <th>BOM</th>
              <th>Stock</th>
              <th>Need</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["AX-12", "Tube 40mm", "1,240", "240"],
              ["WG-03", "Weld wire", "86kg", "18kg"],
              ["PN-9", "Primer", "42L", "12L"],
            ].map((row) => (
              <tr key={row[0]}>
                {row.map((cell) => (
                  <td key={cell}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Shell>
  );
}

function PosUi() {
  return (
    <Shell nav={["Floor", "KDS", "Menu", "Bill", "Shift"]}>
      <div className="orbit-sw-pos">
        <div className="orbit-sw-floor">
          {["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9"].map((table, i) => (
            <span key={table} data-open={i === 3 || i === 7 ? "1" : i === 1 ? "2" : undefined}>
              {table}
            </span>
          ))}
        </div>
        <div className="orbit-sw-ticket">
          <strong>Table 4 · 6 covers</strong>
          <ul>
            <li>
              <span>Thali set</span>
              <b>×2</b>
            </li>
            <li>
              <span>Momo platter</span>
              <b>×1</b>
            </li>
            <li>
              <span>Chiya</span>
              <b>×3</b>
            </li>
            <li>
              <span>Gulab jamun</span>
              <b>×2</b>
            </li>
          </ul>
          <footer>
            <span>Kitchen fired</span>
            <b>₹ 4,820</b>
          </footer>
        </div>
      </div>
    </Shell>
  );
}

function CrmUi() {
  const cols: [string, [string, string][]][] = [
    ["Lead", [["Peak Lodge", "Web"], ["Nona", "Ads"]]],
    ["Qualified", [["Kalon Spa", "SEO"], ["Trek Co", "Call"]]],
    ["Proposal", [["Marlo", "PMS"], ["Haven", "ERP"]]],
    ["Won", [["Orbit Inn", "App"], ["Bluefox", "POS"]]],
  ];
  return (
    <Shell nav={["Pipe", "Inbox", "Tasks", "Deals", "Team"]}>
      <div className="orbit-sw-crm">
        {cols.map(([stage, cards]) => (
          <div key={stage} className="orbit-sw-crm-col">
            <em>{stage}</em>
            {cards.map(([name, tag]) => (
              <div key={name} className="orbit-sw-deal">
                <b>{name}</b>
                <span>{tag}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Shell>
  );
}

function SuiteUi() {
  return (
    <Shell nav={["Home", "Bill", "CRM", "POS", "MRR"]}>
      <div className="orbit-sw-suite">
        {[
          ["Billing", "128 invoices", "₹ 8.4L", "78"],
          ["CRM", "36 open deals", "₹ 2.1Cr", "54"],
          ["POS", "4 live stores", "₹ 64k", "62"],
          ["Analytics", "MRR $48k", "NPS 72", "81"],
        ].map(([mod, stat, extra, bar]) => (
          <div key={mod}>
            <b>{mod}</b>
            <span>{stat}</span>
            <em>{extra}</em>
            <i className="orbit-sw-bar">
              <i style={{ width: `${bar}%` }} />
            </i>
          </div>
        ))}
      </div>
    </Shell>
  );
}

function CustomAppsUi() {
  return (
    <Shell nav={["App", "Web", "API", "Push", "QA"]}>
      <div className="orbit-sw-custom">
        <div className="orbit-sw-phone">
          <header>Guest app</header>
          <p>Stay #4412 · Room 204</p>
          <div className="orbit-sw-phone-actions">
            <span>Book</span>
            <span data-on="1">Check-in</span>
            <span>Chat</span>
          </div>
          <div className="orbit-sw-phone-card">
            <b>Tonight</b>
            <em>Spa 7:30 · Dinner 8:45</em>
          </div>
        </div>
        <div className="orbit-sw-web">
          <header>Owner portal</header>
          <Kpis items={[
            ["RevPAR", "₹ 8.2k"],
            ["Staff", "42 on"],
          ]} />
          <div className="orbit-sw-bars">
            {[72, 54, 88, 41, 63, 91, 77].map((h, i) => (
              <i key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}

function SaasAdminUi() {
  return (
    <Shell nav={["Orgs", "Plans", "Roles", "Usage", "Audit"]}>
      <Kpis items={[
        ["Tenants", "64"],
        ["Seats", "1,840"],
        ["Churn", "1.8%"],
      ]} />
      <ul className="orbit-sw-tenants">
        {[
          ["marlo", "Pro · 48 seats", "78%"],
          ["kalon", "Starter · 6 seats", "42%"],
          ["haven", "Growth · 22 seats", "61%"],
          ["peak", "Trial · 4 seats", "18%"],
        ].map(([org, plan, use]) => (
          <li key={org}>
            <div>
              <b>{org}</b>
              <span>{plan}</span>
            </div>
            <i className="orbit-sw-bar">
              <i style={{ width: use }} />
            </i>
          </li>
        ))}
      </ul>
    </Shell>
  );
}

function PreviewBody({ slug, previewSrc }: { slug: string; previewSrc?: string }) {
  switch (slug) {
    case "billing-software":
      return <BillingUi />;
    case "hotel-management-system":
      return <HotelUi />;
    case "ota-management-system":
      return <OtaUi />;
    case "warehouse-management":
      return <WarehouseUi />;
    case "manufacturing-erp":
      return <ErpUi />;
    case "restaurant-pos":
      return <PosUi />;
    case "crm-software":
      return <CrmUi />;
    case "saas-business-suite":
      return <SuiteUi />;
    case "custom-apps":
      return <CustomAppsUi />;
    case "saas-management-system":
      return <SaasAdminUi />;
    default:
      return previewSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="orbit-sw-fallback-img" src={previewSrc} alt="" />
      ) : (
        <BillingUi />
      );
  }
}

const MODULE: Record<string, string> = {
  "billing-software": "Invoices · GST · Collections",
  "hotel-management-system": "Front desk · Rooms · Housekeeping",
  "ota-management-system": "Channels · Rates · Inventory",
  "warehouse-management": "Picking · Bins · Stock",
  "manufacturing-erp": "Work orders · BOM · QC",
  "restaurant-pos": "Tables · KDS · Bills",
  "crm-software": "Pipeline · Leads · Deals",
  "saas-business-suite": "Billing · CRM · Analytics",
  "custom-apps": "Guest app · Owner portal",
  "saas-management-system": "Tenants · Plans · Usage",
};

export function SoftwareProductUi({ slug, title, accent, previewSrc }: PreviewProps) {
  return (
    <Frame title={title} accent={accent} module={MODULE[slug] ?? "Operations console"}>
      <PreviewBody slug={slug} previewSrc={previewSrc} />
    </Frame>
  );
}
