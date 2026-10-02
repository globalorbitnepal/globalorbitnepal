import type { ComponentType, ReactNode } from "react";

type ShellProps = {
  theme: string;
  brand: string;
  bg: string;
  navLeft?: ReactNode;
  navRight?: ReactNode;
  children: ReactNode;
  overlay?: "dark" | "darker" | "warm" | "light";
};

function DemoShell({ theme, brand, bg, navLeft, navRight, children, overlay = "dark" }: ShellProps) {
  return (
    <div className={`wd-prem wd-prem--${theme}`}>
      <div className={`wd-prem-bg ${bg}`} aria-hidden="true" />
      <div className={`wd-prem-overlay wd-prem-overlay--${overlay}`} aria-hidden="true" />
      <header className="wd-prem-nav">
        <span className="wd-prem-brand">{brand}</span>
        <div className="wd-prem-nav-links">{navLeft}</div>
        <div className="wd-prem-nav-actions">{navRight}</div>
      </header>
      <div className="wd-prem-stage">{children}</div>
    </div>
  );
}

function Pill({ children, variant = "light" }: { children: ReactNode; variant?: "light" | "dark" | "ghost" }) {
  return <span className={`wd-prem-pill wd-prem-pill--${variant}`}>{children}</span>;
}

/** Hospitality — Northline-style journey hero */
export function DemoSummitLodge() {
  return (
    <DemoShell
      theme="northline"
      brand="Summit Lodge"
      bg="wd-prem-bg--alps-sunset"
      navLeft={
        <>
          <span>Rooms</span>
          <span>Experiences</span>
        </>
      }
      navRight={<Pill>Book stay</Pill>}
      overlay="warm"
    >
      <div className="wd-prem-hero wd-prem-hero--center">
        <p className="wd-prem-eyebrow">Nagarkot · Nepal</p>
        <h1 className="wd-prem-h1 wd-prem-h1--split">
          <span>Journey starts</span>
          <span className="wd-prem-h1-accent">here</span>
        </h1>
        <p className="wd-prem-sub">Twelve rooms above the cloud line — forest trails and fireside tables.</p>
        <div className="wd-prem-actions">
          <Pill>See availability</Pill>
          <Pill variant="ghost">View gallery</Pill>
        </div>
      </div>
      <div className="wd-prem-float-row" aria-hidden="true">
        <div className="wd-prem-float-card">
          <div className="wd-prem-float-img wd-prem-float-img--forest" />
          <p>Panorama suite</p>
        </div>
        <div className="wd-prem-float-card">
          <div className="wd-prem-float-img wd-prem-float-img--fire" />
          <p>Chef&apos;s table</p>
        </div>
      </div>
    </DemoShell>
  );
}

/** Trek — Wildline-style oversized type */
export function DemoTrailhead() {
  return (
    <DemoShell
      theme="wildline"
      brand="Trailhead"
      bg="wd-prem-bg--ridge"
      navLeft={
        <>
          <span>Trips</span>
          <span>Guides</span>
        </>
      }
      navRight={<Pill variant="ghost">Enquire</Pill>}
      overlay="darker"
    >
      <div className="wd-prem-hero wd-prem-hero--bottom">
        <p className="wd-prem-eyebrow wd-prem-eyebrow--lime">Everest region · 14 days</p>
        <h1 className="wd-prem-h1 wd-prem-h1--mega">
          Book
          <br />
          adventure<span className="wd-prem-dot">.</span>
        </h1>
        <p className="wd-prem-sub wd-prem-sub--narrow">Small groups. Certified guides. Ethical pacing at altitude.</p>
        <Pill>Download itinerary</Pill>
      </div>
    </DemoShell>
  );
}

/** Dining — Forma-style dark interior */
export function DemoEmberSlate() {
  return (
    <DemoShell
      theme="forma"
      brand="Ember & Slate"
      bg="wd-prem-bg--interior"
      navLeft={
        <>
          <span>Menu</span>
          <span>Wine</span>
          <span>Private</span>
        </>
      }
      navRight={<Pill variant="ghost">Reserve</Pill>}
      overlay="dark"
    >
      <div className="wd-prem-hero wd-prem-hero--left">
        <p className="wd-prem-eyebrow">Kathmandu · Tasting room</p>
        <h1 className="wd-prem-h1 wd-prem-h1--stack">
          <span>Seven courses.</span>
          <span>One slow evening.</span>
        </h1>
        <p className="wd-prem-sub">Wood-fired produce, natural pairings, reservations through midnight.</p>
        <Pill>Hold a table</Pill>
      </div>
    </DemoShell>
  );
}

/** Retail — editorial light hero */
export function DemoNorwood() {
  return (
    <DemoShell
      theme="atelier"
      brand="Norwood"
      bg="wd-prem-bg--studio-light"
      navLeft={
        <>
          <span>Lookbook</span>
          <span>Craft</span>
        </>
      }
      navRight={
        <>
          <span className="wd-prem-link">Cart</span>
          <Pill variant="dark">Shop drop</Pill>
        </>
      }
      overlay="light"
    >
      <div className="wd-prem-hero wd-prem-hero--split-light">
        <div>
          <p className="wd-prem-eyebrow wd-prem-eyebrow--dark">Winter 2026</p>
          <h1 className="wd-prem-h1 wd-prem-h1--dark">Layers built for hill mornings.</h1>
          <p className="wd-prem-sub wd-prem-sub--dark">Merino, structure, and export-ready sizing charts.</p>
          <Pill variant="dark">Explore collection</Pill>
        </div>
        <div className="wd-prem-product-stack" aria-hidden="true">
          <div className="wd-prem-product-tile wd-prem-product-tile--a" />
          <div className="wd-prem-product-tile wd-prem-product-tile--b" />
        </div>
      </div>
    </DemoShell>
  );
}

/** SaaS — Pulse split with dashboard */
export function DemoPulseMetrics() {
  return (
    <DemoShell
      theme="pulse"
      brand="PulseMetrics"
      bg="wd-prem-bg--mesh"
      navLeft={
        <>
          <span>Product</span>
          <span>Pricing</span>
        </>
      }
      navRight={
        <>
          <span className="wd-prem-link">Sign in</span>
          <Pill>Start trial</Pill>
        </>
      }
      overlay="dark"
    >
      <div className="wd-prem-hero wd-prem-hero--saas">
        <div className="wd-prem-saas-copy">
          <span className="wd-prem-badge">AI revenue cockpit</span>
          <h1 className="wd-prem-h1 wd-prem-h1--saas">
            Build relationships and drive revenue through data.
          </h1>
          <p className="wd-prem-sub">Pipeline, churn, and expansion — one dark dashboard your team actually opens.</p>
          <div className="wd-prem-actions">
            <Pill>Open console</Pill>
            <Pill variant="ghost">Book demo</Pill>
          </div>
        </div>
        <div className="wd-prem-dashboard" aria-hidden="true">
          <div className="wd-prem-dash-head">
            <span>Relationships</span>
            <span className="wd-prem-dash-up">+18%</span>
          </div>
          <div className="wd-prem-dash-chart">
            <div style={{ height: "38%" }} />
            <div style={{ height: "62%" }} />
            <div style={{ height: "48%" }} />
            <div style={{ height: "78%" }} />
            <div style={{ height: "55%" }} />
          </div>
          <div className="wd-prem-dash-row">
            <span>MRR</span>
            <strong>$284k</strong>
          </div>
        </div>
      </div>
    </DemoShell>
  );
}

/** Property / wellness — Haven skyline hero */
export function DemoHavenSpa() {
  return (
    <DemoShell
      theme="haven"
      brand="Haven Spa"
      bg="wd-prem-bg--city-night"
      navLeft={
        <>
          <span>Treatments</span>
          <span>Gift cards</span>
        </>
      }
      navRight={<Pill>Book now</Pill>}
      overlay="darker"
    >
      <div className="wd-prem-hero wd-prem-hero--center">
        <p className="wd-prem-eyebrow">Thamel · Wellness</p>
        <h1 className="wd-prem-h1 wd-prem-h1--serif">Spaces that hold calm.</h1>
        <p className="wd-prem-sub">Hot stone, herbal steam, and therapists matched to your rhythm.</p>
        <Pill>View treatments</Pill>
      </div>
      <div className="wd-prem-inset-grid" aria-hidden="true">
        <div className="wd-prem-inset wd-prem-inset--spa" />
        <div className="wd-prem-inset wd-prem-inset--steam" />
      </div>
    </DemoShell>
  );
}

export const DEMO_COMPONENTS: Record<string, ComponentType> = {
  "summit-lodge": DemoSummitLodge,
  trailhead: DemoTrailhead,
  "ember-slate": DemoEmberSlate,
  norwood: DemoNorwood,
  "pulse-metrics": DemoPulseMetrics,
  "haven-spa": DemoHavenSpa,
};
