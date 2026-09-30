import type { CSSProperties, ReactNode } from "react";

type PreviewProps = {
  slug: string;
  title: string;
  accent: string;
  previewSrc?: string;
};

function Frame({ title, accent, children }: { title: string; accent: string; children: ReactNode }) {
  const host = title.toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 18);
  return (
    <div className="orbit-sw" style={{ "--sw-accent": accent } as CSSProperties} aria-hidden="true">
      <div className="orbit-sw-chrome">
        <span className="orbit-sw-dots">
          <i />
          <i />
          <i />
        </span>
        <p className="orbit-sw-title">{title}</p>
        <span className="orbit-sw-host">{host}.orbit</span>
      </div>
      <div className="orbit-sw-viewport">{children}</div>
      <div className="orbit-sw-foot">
        <strong>{title}</strong>
      </div>
    </div>
  );
}

function BillingUi() {
  return (
    <div className="orbit-sw-billing">
      <header>
        <span>Invoice #INV-2048</span>
        <b>GST · 13%</b>
      </header>
      <div className="orbit-sw-billing-meta">
        <div>
          <em>Bill to</em>
          <strong>Marlo Hotels Pvt Ltd</strong>
        </div>
        <div>
          <em>Due</em>
          <strong>₹ 84,200</strong>
        </div>
      </div>
      <table>
        <tbody>
          <tr>
            <td>PMS subscription · Apr</td>
            <td>₹ 42,000</td>
          </tr>
          <tr>
            <td>OTA sync module</td>
            <td>₹ 18,500</td>
          </tr>
          <tr>
            <td>Support retainer</td>
            <td>₹ 23,700</td>
          </tr>
        </tbody>
      </table>
      <footer>
        <span>IRN verified</span>
        <button type="button">Send & collect</button>
      </footer>
    </div>
  );
}

function HotelUi() {
  return (
    <div className="orbit-sw-hotel">
      <div className="orbit-sw-hotel-stats">
        <div>
          <em>Occupancy</em>
          <strong>86%</strong>
        </div>
        <div>
          <em>Arrivals</em>
          <strong>14</strong>
        </div>
        <div>
          <em>HK pending</em>
          <strong>6</strong>
        </div>
      </div>
      <div className="orbit-sw-hotel-grid">
        {[
          ["204", "In", "Deluxe"],
          ["311", "In", "Suite"],
          ["118", "Clean", "Twin"],
          ["402", "Out", "Family"],
          ["205", "Dirty", "King"],
          ["109", "In", "Std"],
        ].map(([room, st, type]) => (
          <div key={room} data-st={st}>
            <b>{room}</b>
            <span>{type}</span>
            <em>{st}</em>
          </div>
        ))}
      </div>
    </div>
  );
}

function OtaUi() {
  return (
    <div className="orbit-sw-ota">
      <div className="orbit-sw-ota-channels">
        {["Booking.com", "Agoda", "Expedia"].map((ch) => (
          <div key={ch} className="is-live">
            <b>{ch.slice(0, 2)}</b>
            <span>{ch}</span>
            <em>Live</em>
          </div>
        ))}
      </div>
      <div className="orbit-sw-ota-rates">
        {[
          ["Deluxe King", "₹ 12,400", "4"],
          ["Lake Suite", "₹ 21,900", "1"],
          ["Twin", "₹ 8,200", "7"],
        ].map(([name, rate, left]) => (
          <div key={name}>
            <strong>{name}</strong>
            <span>{rate}</span>
            <em>{left} rooms</em>
          </div>
        ))}
      </div>
    </div>
  );
}

function WarehouseUi() {
  return (
    <div className="orbit-sw-wms">
      <header>Pick wave #PW-441 · 64 lines</header>
      <ul>
        <li>
          <b>A12</b>
          <span>Linen set · ×12</span>
          <em>Picked</em>
        </li>
        <li>
          <b>C03</b>
          <span>Soap kit · ×40</span>
          <em>Pick</em>
        </li>
        <li>
          <b>D19</b>
          <span>Mug navy · ×86</span>
          <em>Queue</em>
        </li>
      </ul>
      <div className="orbit-sw-wms-map">
        <i>A</i>
        <i>B</i>
        <i>C</i>
        <i>D</i>
      </div>
    </div>
  );
}

function ErpUi() {
  return (
    <div className="orbit-sw-erp">
      <div className="orbit-sw-erp-bom">
        <em>BOM · Frame weld</em>
        <strong>WO-88 · Line 2</strong>
        <span>Qty 240 · QC pass 99%</span>
      </div>
      <div className="orbit-sw-erp-steps">
        {[
          ["Cut", "Done"],
          ["Weld", "Run"],
          ["Paint", "QC"],
          ["Pack", "Wait"],
        ].map(([step, st]) => (
          <div key={step} data-st={st}>
            {step}
            <em>{st}</em>
          </div>
        ))}
      </div>
    </div>
  );
}

function PosUi() {
  return (
    <div className="orbit-sw-pos">
      <div className="orbit-sw-pos-floor">
        {["T1", "T2", "T3", "T4", "T5", "T6"].map((t, i) => (
          <button key={t} type="button" data-open={i === 3 ? "1" : undefined}>
            {t}
          </button>
        ))}
      </div>
      <div className="orbit-sw-pos-ticket">
        <strong>Table 4 · 6 covers</strong>
        <p>Thali ×2 · Momo ×1 · Chiya ×3</p>
        <footer>₹ 4,820 · Fire kitchen</footer>
      </div>
    </div>
  );
}

function CrmUi() {
  return (
    <div className="orbit-sw-crm">
      {[
        ["Lead", "Peak Lodge", "Website"],
        ["Qualified", "Kalon Spa", "SEO"],
        ["Proposal", "Marlo", "PMS"],
        ["Won", "Haven", "App"],
      ].map(([stage, name, tag]) => (
        <div key={name} className="orbit-sw-crm-col">
          <em>{stage}</em>
          <strong>{name}</strong>
          <span>{tag}</span>
        </div>
      ))}
    </div>
  );
}

function SuiteUi() {
  return (
    <div className="orbit-sw-suite">
      {[
        ["Billing", "128 inv", "Live"],
        ["CRM", "36 deals", "Live"],
        ["POS", "4 stores", "Live"],
        ["Analytics", "MRR $48k", "Live"],
      ].map(([mod, stat, st]) => (
        <div key={mod}>
          <b>{mod}</b>
          <span>{stat}</span>
          <em>{st}</em>
        </div>
      ))}
    </div>
  );
}

function CustomAppsUi() {
  return (
    <div className="orbit-sw-custom">
      <div className="orbit-sw-custom-phone">
        <header>Guest app</header>
        <p>Book · Check-in · Chat</p>
        <button type="button">Open stay</button>
      </div>
      <div className="orbit-sw-custom-web">
        <header>Owner portal</header>
        <p>Reports · Staff · Settings</p>
        <div className="orbit-sw-custom-chart" />
      </div>
    </div>
  );
}

function SaasAdminUi() {
  return (
    <div className="orbit-sw-saas">
      <header>Tenants · 64 orgs</header>
      <ul>
        <li>
          <b>marlo</b>
          <span>Pro · 48 seats</span>
          <div className="orbit-sw-meter" style={{ width: "78%" }} />
        </li>
        <li>
          <b>kalon</b>
          <span>Starter · 6 seats</span>
          <div className="orbit-sw-meter" style={{ width: "42%" }} />
        </li>
        <li>
          <b>haven</b>
          <span>Trial · 22 seats</span>
          <div className="orbit-sw-meter" style={{ width: "61%" }} />
        </li>
      </ul>
    </div>
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

export function SoftwareProductUi({ slug, title, accent, previewSrc }: PreviewProps) {
  return (
    <Frame title={title} accent={accent}>
      <PreviewBody slug={slug} previewSrc={previewSrc} />
    </Frame>
  );
}
