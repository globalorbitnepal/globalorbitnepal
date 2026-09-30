import type { CSSProperties, ReactNode } from "react";

type PreviewProps = {
  slug: string;
  title: string;
  accent: string;
  previewSrc?: string;
};

const NAV: Record<string, string[]> = {
  "billing-software": ["Dashboard", "Invoices", "Payments", "Customers", "Reports", "Settings"],
  "hotel-management-system": ["Dashboard", "Rooms", "Guests", "Housekeeping", "Reports", "Settings"],
  "ota-management-system": ["Dashboard", "Channels", "Rates", "Calendar", "Customers", "Settings"],
  "warehouse-management": ["Dashboard", "Stock In", "Stock Out", "Transfers", "Purchase", "Reports"],
  "manufacturing-erp": ["Production", "Work Orders", "BOM", "Inventory", "Quality", "Settings"],
  "restaurant-pos": ["Orders", "Kitchen", "Tables", "Customers", "Reports", "Settings"],
  "crm-software": ["Leads", "Deals", "Contacts", "Activities", "Reports", "Settings"],
  "saas-business-suite": ["Home", "Billing", "CRM", "POS", "Analytics", "Settings"],
  "custom-apps": ["App", "Web", "API", "Push", "QA", "Settings"],
  "saas-management-system": ["Dashboard", "Tenants", "Users", "Plans", "Payments", "Analytics"],
};

const ACTION: Record<string, string> = {
  "billing-software": "+ New Invoice",
  "hotel-management-system": "+ New Booking",
  "ota-management-system": "+ Sync",
  "warehouse-management": "+ New Item",
  "manufacturing-erp": "+ New WO",
  "restaurant-pos": "+ New Menu Item",
  "crm-software": "+ New Lead",
  "saas-business-suite": "+ New Org",
  "custom-apps": "+ New App",
  "saas-management-system": "+ New Tenant",
};

function Frame({
  title,
  accent,
  action,
  nav,
  active,
  children,
}: {
  title: string;
  accent: string;
  action: string;
  nav: string[];
  active?: string;
  children: ReactNode;
}) {
  const current = active ?? nav[0];
  return (
    <div className="orbit-sw" style={{ "--sw-accent": accent } as CSSProperties} aria-hidden="true">
      <header className="orbit-sw-top">
        <div className="orbit-sw-brand">
          <span className="orbit-sw-mark" />
          <strong>{title}</strong>
        </div>
        <div className="orbit-sw-actions">
          <span className="orbit-sw-avs">
            <i>A</i>
            <i>R</i>
          </span>
          <span className="orbit-sw-cta">{action}</span>
        </div>
      </header>
      <div className="orbit-sw-shell">
        <aside className="orbit-sw-nav">
          {nav.map((item) => (
            <span key={item} data-on={item === current ? "1" : undefined}>
              <i />
              {item}
            </span>
          ))}
        </aside>
        <div className="orbit-sw-body">{children}</div>
      </div>
    </div>
  );
}

function Stats({
  items,
}: {
  items: { label: string; value: string; hint?: string; tone?: string }[];
}) {
  return (
    <div className="orbit-sw-stats">
      {items.map((item) => (
        <div key={item.label} data-tone={item.tone ?? "blue"}>
          <em>{item.label}</em>
          <b>{item.value}</b>
          {item.hint ? <small>{item.hint}</small> : null}
        </div>
      ))}
    </div>
  );
}

function BillingUi() {
  return (
    <>
      <Stats
        items={[
          { label: "Total Invoices", value: "1,248", tone: "blue" },
          { label: "Paid", value: "986", tone: "green" },
          { label: "Pending", value: "182", tone: "amber" },
          { label: "Overdue", value: "80", tone: "red" },
        ]}
      />
      <div className="orbit-sw-panel">
        <div className="orbit-sw-panel-h">
          <b>Recent Invoices</b>
          <em>View all</em>
        </div>
        <table className="orbit-sw-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["INV-0481", "ABC Pvt Ltd", "$1,200", "Paid"],
              ["INV-0482", "Everest Treks", "$650", "Pending"],
              ["INV-0483", "Hotel Thamel", "$2,400", "Paid"],
              ["INV-0484", "Global Traders", "$890", "Overdue"],
              ["INV-0485", "Mountain Gear", "$430", "Paid"],
            ].map((row) => (
              <tr key={row[0]}>
                <td>{row[0]}</td>
                <td>{row[1]}</td>
                <td>{row[2]}</td>
                <td data-st={row[3]}>{row[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function HotelUi() {
  const rooms = [
    ["204", "92%", "Occupied", "blue"],
    ["118", "45%", "Cleaning", "amber"],
    ["311", "100%", "Occupied", "green"],
    ["402", "0%", "Available", "mint"],
    ["221", "78%", "Occupied", "blue"],
    ["109", "0%", "Available", "mint"],
  ];
  return (
    <>
      <Stats
        items={[
          { label: "Total Rooms", value: "48", tone: "blue" },
          { label: "Occupied", value: "36", tone: "green" },
          { label: "Available", value: "12", tone: "mint" },
          { label: "Revenue", value: "$4,820", tone: "amber" },
        ]}
      />
      <div className="orbit-sw-panel">
        <div className="orbit-sw-panel-h">
          <b>Room Status</b>
          <em>All floors</em>
        </div>
        <div className="orbit-sw-rooms">
          {rooms.map(([no, pct, st, tone]) => (
            <div key={no} data-tone={tone}>
              <span>{no}</span>
              <b>{pct}</b>
              <em>{st}</em>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function OtaUi() {
  return (
    <>
      <Stats
        items={[
          { label: "Today Bookings", value: "128", hint: "+12%", tone: "blue" },
          { label: "Revenue", value: "$12,450", hint: "+24%", tone: "green" },
          { label: "Channels", value: "6", tone: "violet" },
          { label: "Conversion", value: "4.2%", tone: "amber" },
        ]}
      />
      <div className="orbit-sw-panel">
        <div className="orbit-sw-panel-h">
          <b>Channel Performance</b>
          <em>Last 30 days</em>
        </div>
        <ul className="orbit-sw-channels">
          {[
            ["BC", "Booking.com", "48 bookings", "28%"],
            ["AG", "Agoda", "36 bookings", "22%"],
            ["EX", "Expedia", "24 bookings", "19%"],
            ["AY", "MakeMyTrip", "18 bookings", "12%"],
            ["DT", "Direct", "12 bookings", "9%"],
          ].map(([code, name, n, pct]) => (
            <li key={code}>
              <b>{code}</b>
              <span>
                {name}
                <small>{n}</small>
              </span>
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
      <Stats
        items={[
          { label: "Total Items", value: "1,248", tone: "green" },
          { label: "In Stock", value: "986", tone: "blue" },
          { label: "Low Stock", value: "42", tone: "amber" },
          { label: "Out of Stock", value: "18", tone: "red" },
        ]}
      />
      <div className="orbit-sw-panel">
        <div className="orbit-sw-panel-h">
          <b>Stock by SKU</b>
          <em>Live</em>
        </div>
        <table className="orbit-sw-table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["PRD-001", "Trekking Backpack", "120", "In Stock"],
              ["PRD-002", "Winter Jacket", "8", "Low Stock"],
              ["PRD-003", "Hiking Boots", "0", "Out of Stock"],
              ["PRD-004", "Sleeping Bag", "45", "In Stock"],
              ["PRD-005", "Trekking Pole", "16", "Low Stock"],
            ].map((row) => (
              <tr key={row[0]}>
                <td>{row[0]}</td>
                <td>{row[1]}</td>
                <td>{row[2]}</td>
                <td data-st={row[3]}>{row[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function ErpUi() {
  return (
    <>
      <Stats
        items={[
          { label: "Production", value: "82%", tone: "violet" },
          { label: "Efficiency", value: "96%", tone: "green" },
          { label: "Orders", value: "24", tone: "blue" },
          { label: "Defects", value: "3", tone: "red" },
        ]}
      />
      <div className="orbit-sw-panel">
        <div className="orbit-sw-panel-h">
          <b>Production Orders</b>
          <em>Line 2</em>
        </div>
        <table className="orbit-sw-table">
          <thead>
            <tr>
              <th>WO</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["MO-001", "Steel Frame", "240", "Completed"],
              ["MO-002", "Weld Kit", "180", "In Production"],
              ["MO-003", "Backpack", "300", "In Production"],
              ["MO-004", "Jacket", "90", "Planned"],
              ["MO-005", "Gloves", "400", "Quality Check"],
            ].map((row) => (
              <tr key={row[0]}>
                <td>{row[0]}</td>
                <td>{row[1]}</td>
                <td>{row[2]}</td>
                <td data-st={row[3]}>{row[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function PosUi() {
  const menu = [
    ["Pizza", "$12.00", "/brand/soft-pos/pos-pizza.jpg"],
    ["Burger", "$8.50", "/brand/soft-pos/pos-burger.jpg"],
    ["Coffee", "$3.00", "/brand/soft-pos/pos-coffee.jpg"],
    ["Pasta", "$11.00", "/brand/soft-pos/pos-pasta.jpg"],
    ["Salad", "$7.00", "/brand/soft-pos/pos-salad.jpg"],
    ["Sandwich", "$6.50", "/brand/soft-pos/pos-sandwich.jpg"],
  ];
  return (
    <div className="orbit-sw-pos">
      <div className="orbit-sw-pos-main">
        <div className="orbit-sw-pos-bar">
          <b>Table 4</b>
          <em>Dine In</em>
        </div>
        <div className="orbit-sw-menu">
          {menu.map(([name, price, src]) => (
            <div key={name}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" />
              <span>{name}</span>
              <em>{price}</em>
            </div>
          ))}
        </div>
      </div>
      <div className="orbit-sw-ticket">
        <b>Order Summary</b>
        <ul>
          {[
            ["2 × Coffee", "$6.00"],
            ["1 × Pizza", "$12.00"],
            ["1 × Burger", "$8.50"],
          ].map(([line, amt]) => (
            <li key={line}>
              <span>{line}</span>
              <em>{amt}</em>
            </li>
          ))}
        </ul>
        <div className="orbit-sw-total">
          <span>Total</span>
          <strong>$31.25</strong>
        </div>
        <span className="orbit-sw-place">Place Order</span>
      </div>
    </div>
  );
}

function CrmUi() {
  return (
    <>
      <Stats
        items={[
          { label: "Leads", value: "1,420", tone: "blue" },
          { label: "Deals", value: "620", tone: "violet" },
          { label: "Win Rate", value: "42%", tone: "green" },
          { label: "Pipeline", value: "$8,600", tone: "amber" },
        ]}
      />
      <div className="orbit-sw-crm">
        {(
          [
            ["Contacted", [["John Smith", "$4,200"], ["Priya Sharma", "$2,100"]]],
            ["Qualified", [["Maya Johnson", "$3,800"], ["Ramesh KC", "$1,450"]]],
            ["Proposal", [["ABC Pvt Ltd", "$12,400"], ["Everest Treks", "$2,900"]]],
          ] as [string, [string, string][]][]
        ).map(([stage, cards]) => (
          <div key={stage}>
            <em>{stage}</em>
            {cards.map(([name, val]) => (
              <div key={name} className="orbit-sw-deal">
                <b>{name}</b>
                <span>{val}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

function SuiteUi() {
  return (
    <>
      <Stats
        items={[
          { label: "Billing", value: "128 inv", tone: "blue" },
          { label: "CRM", value: "36 deals", tone: "violet" },
          { label: "POS", value: "4 stores", tone: "amber" },
          { label: "MRR", value: "$48k", tone: "green" },
        ]}
      />
      <div className="orbit-sw-suite">
        {[
          ["Billing", "78%"],
          ["CRM", "54%"],
          ["POS", "62%"],
          ["Analytics", "81%"],
        ].map(([mod, bar]) => (
          <div key={mod}>
            <b>{mod}</b>
            <i className="orbit-sw-bar">
              <i style={{ width: bar }} />
            </i>
          </div>
        ))}
      </div>
    </>
  );
}

function CustomAppsUi() {
  return (
    <>
      <Stats
        items={[
          { label: "Guest App", value: "Live", tone: "green" },
          { label: "Owner Portal", value: "Live", tone: "blue" },
          { label: "API Calls", value: "48k", tone: "violet" },
          { label: "Uptime", value: "99.9%", tone: "mint" },
        ]}
      />
      <div className="orbit-sw-custom">
        <div>
          <b>Guest app</b>
          <em>Book · Check-in · Chat</em>
          <span>Stay #4412 · Room 204</span>
        </div>
        <div>
          <b>Owner portal</b>
          <em>Reports · Staff · Settings</em>
          <div className="orbit-sw-bars">
            {[72, 54, 88, 41, 63, 91, 77].map((h, i) => (
              <i key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function SaasAdminUi() {
  return (
    <>
      <Stats
        items={[
          { label: "Tenants", value: "2,860", tone: "violet" },
          { label: "Active", value: "2,140", tone: "green" },
          { label: "MRR", value: "$12,450", tone: "blue" },
          { label: "Churn", value: "1.8%", tone: "red" },
        ]}
      />
      <div className="orbit-sw-saas">
        <div className="orbit-sw-chart">
          <div className="orbit-sw-panel-h">
            <b>Revenue Growth</b>
            <em>Last 6 months</em>
          </div>
          <div className="orbit-sw-bars">
            {[38, 48, 44, 62, 71, 86].map((h, i) => (
              <i key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="orbit-sw-axis">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>
        <ul className="orbit-sw-modules">
          {[
            ["Website Builder", "82%"],
            ["Billing System", "74%"],
            ["Hotel Management", "61%"],
          ].map(([name, use]) => (
            <li key={name}>
              <span>{name}</span>
              <i className="orbit-sw-bar">
                <i style={{ width: use }} />
              </i>
            </li>
          ))}
        </ul>
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
      return <BillingUi />;
  }
}

export function SoftwareProductUi({ slug, title, accent }: PreviewProps) {
  return (
    <Frame
      title={title}
      accent={accent}
      action={ACTION[slug] ?? "+ New"}
      nav={NAV[slug] ?? ["Dashboard", "Reports", "Settings"]}
      active={NAV[slug]?.[0]}
    >
      <PreviewBody slug={slug} />
    </Frame>
  );
}
