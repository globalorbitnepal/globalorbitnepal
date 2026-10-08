import type { CSSProperties, ReactNode } from "react";
import type { ErpSuite } from "@/lib/orbit-software-page";

function Shell({ accent, title, nav, children }: { accent: string; title: string; nav: string[]; children: ReactNode }) {
  return (
    <div className="erp-console" style={{ "--erp-accent": accent } as CSSProperties}>
      <div className="erp-console-top">
        <span className="erp-console-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="erp-console-title">{title}</span>
      </div>
      <div className="erp-console-body">
        <aside>
          {nav.map((item, i) => (
            <span key={item} className={i === 0 ? "is-on" : undefined}>
              {item}
            </span>
          ))}
        </aside>
        <div className="erp-console-main">{children}</div>
      </div>
    </div>
  );
}

export function ErpConsole({ suite }: { suite: ErpSuite }) {
  switch (suite.ui) {
    case "billing":
      return (
        <Shell accent={suite.accent} title="Orbit Billing" nav={["Invoices", "Customers", "GST", "Settings"]}>
          <div className="erp-kpis">
            <b>NPR 8.4L</b>
            <b>42 open</b>
            <b>GST 13%</b>
          </div>
          <div className="erp-rows">
            <span>INV-2041 · Paid</span>
            <span>INV-2040 · Due</span>
            <span>INV-2038 · Overdue</span>
          </div>
        </Shell>
      );
    case "hotel":
      return (
        <Shell accent={suite.accent} title="Orbit PMS" nav={["Rooms", "Folio", "HK", "Night"]}>
          <div className="erp-cal">
            {["101", "102", "201", "202", "301", "302"].map((room, i) => (
              <i key={room} className={i % 3 === 0 ? "is-busy" : i % 2 === 0 ? "is-hold" : undefined}>
                {room}
              </i>
            ))}
          </div>
        </Shell>
      );
    case "ota":
      return (
        <Shell accent={suite.accent} title="Orbit Channels" nav={["Map", "Rates", "Inbox"]}>
          <div className="erp-rows">
            <span>Booking.com · synced 2m</span>
            <span>Agoda · synced 2m</span>
            <span>Expedia · hold 1 res</span>
          </div>
        </Shell>
      );
    case "warehouse":
      return (
        <Shell accent={suite.accent} title="Orbit WMS" nav={["Bins", "Pick", "Vendors"]}>
          <div className="erp-kpis">
            <b>1,240 SKU</b>
            <b>3 sites</b>
            <b>12 alerts</b>
          </div>
          <div className="erp-bars">
            <i style={{ width: "72%" }} />
            <i style={{ width: "48%" }} />
            <i style={{ width: "91%" }} />
          </div>
        </Shell>
      );
    case "factory":
      return (
        <Shell accent={suite.accent} title="Orbit MES" nav={["WO", "BOM", "QC"]}>
          <div className="erp-rows">
            <span>WO-88 · Cutting</span>
            <span>WO-89 · QC hold</span>
            <span>WO-90 · Packed</span>
          </div>
        </Shell>
      );
    case "pos":
      return (
        <Shell accent={suite.accent} title="Orbit POS" nav={["Floor", "KDS", "Close"]}>
          <div className="erp-cal erp-cal--pos">
            {["T1", "T2", "T3", "T4", "T5", "T6"].map((t, i) => (
              <i key={t} className={i < 3 ? "is-busy" : undefined}>
                {t}
              </i>
            ))}
          </div>
        </Shell>
      );
    case "crm":
      return (
        <Shell accent={suite.accent} title="Orbit CRM" nav={["Leads", "Deals", "Tasks"]}>
          <div className="erp-pipe">
            <span>New 18</span>
            <span>Talk 9</span>
            <span>Won 4</span>
          </div>
        </Shell>
      );
    case "saas":
      return (
        <Shell accent={suite.accent} title="Orbit Suite" nav={["Home", "Bill", "CRM"]}>
          <div className="erp-kpis">
            <b>$284k</b>
            <b>118% NRR</b>
            <b>312 seats</b>
          </div>
        </Shell>
      );
    case "web":
      return (
        <Shell accent={suite.accent} title="Portal" nav={["Home", "Book", "Pay"]}>
          <div className="erp-browser-mini">
            <b>app.yourbrand.com</b>
            <p>Logged-in dashboard · SSR shell</p>
          </div>
        </Shell>
      );
    case "android":
      return (
        <div className="erp-phone" style={{ "--erp-accent": suite.accent } as CSSProperties}>
          <span className="erp-phone-punch" />
          <p>Play · Field queue</p>
          <div className="erp-bars">
            <i style={{ width: "80%" }} />
            <i style={{ width: "55%" }} />
          </div>
        </div>
      );
    case "ios":
      return (
        <div className="erp-phone is-ios" style={{ "--erp-accent": suite.accent } as CSSProperties}>
          <span className="erp-phone-island" />
          <p>TestFlight · 1.4</p>
          <div className="erp-bars">
            <i style={{ width: "64%" }} />
            <i style={{ width: "88%" }} />
          </div>
        </div>
      );
    default:
      return (
        <Shell accent={suite.accent} title="Orbit Tenants" nav={["Orgs", "Plans", "Audit"]}>
          <div className="erp-rows">
            <span>acme · Growth</span>
            <span>northline · Launch</span>
            <span>haven · Enterprise</span>
          </div>
        </Shell>
      );
  }
}
