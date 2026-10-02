import type { ComponentType } from "react";

export function DemoSummitLodge() {
  return (
    <div className="wd-t wd-t--lodge">
      <header className="wd-t-nav">
        <span className="wd-t-logo">Summit Lodge</span>
        <nav className="wd-t-links">
          <span>Rooms</span>
          <span>Experiences</span>
          <span>Gallery</span>
          <span className="wd-t-cta-sm">Book stay</span>
        </nav>
      </header>
      <div className="wd-t-hero wd-t-hero--lodge">
        <div className="wd-t-hero-copy">
          <p className="wd-t-kicker">Nagarkot · 2,195 m</p>
          <h1>Quiet mornings above the cloud line</h1>
          <p>Twelve rooms. Forest trails. Fireside dinners with local produce.</p>
          <div className="wd-t-bar">
            <span>Check in</span>
            <span>Check out</span>
            <span>Guests</span>
            <button type="button">See availability</button>
          </div>
        </div>
        <div className="wd-t-hero-visual wd-t-mountain" aria-hidden="true" />
      </div>
      <div className="wd-t-row">
        {["Deluxe forest", "Panorama suite", "Family cottage"].map((room) => (
          <article key={room} className="wd-t-card wd-t-card--lodge">
            <div className="wd-t-thumb wd-t-thumb--green" />
            <h3>{room}</h3>
            <p>From NPR 12,500 / night</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export function DemoTrailhead() {
  return (
    <div className="wd-t wd-t--trail">
      <header className="wd-t-nav wd-t-nav--dark">
        <span className="wd-t-logo wd-t-logo--orange">Trailhead</span>
        <nav className="wd-t-links">
          <span>Expeditions</span>
          <span>Guides</span>
          <span>Safety</span>
        </nav>
      </header>
      <section className="wd-t-hero wd-t-hero--trail">
        <p className="wd-t-kicker wd-t-kicker--orange">Spring 2026 departures</p>
        <h1>Everest Base Camp · 14 days</h1>
        <div className="wd-t-chips">
          <span>Moderate</span>
          <span>Max 5,364 m</span>
          <span>Small groups</span>
        </div>
        <button type="button" className="wd-t-cta-orange">
          Request itinerary PDF
        </button>
      </section>
      <div className="wd-t-timeline">
        {["Lukla acclimatize", "Namche rest day", "Base camp sunrise"].map((day, i) => (
          <div key={day} className="wd-t-timeline-item">
            <span className="wd-t-day">Day {i + 3}</span>
            <p>{day}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DemoEmberSlate() {
  return (
    <div className="wd-t wd-t--ember">
      <header className="wd-t-nav wd-t-nav--ember">
        <span className="wd-t-logo wd-t-logo--copper">Ember &amp; Slate</span>
        <span className="wd-t-res">Reserve a table</span>
      </header>
      <section className="wd-t-hero wd-t-hero--ember">
        <h1>Tasting menu · seven courses</h1>
        <p>Wood-fired vegetables, aged duck, stone-fruit sorbet — paired with natural wines.</p>
      </section>
      <div className="wd-t-menu-grid">
        {[
          { course: "01", name: "Charred leek, miso butter" },
          { course: "04", name: "Line-caught trout, fennel" },
          { course: "07", name: "Dark chocolate, smoked salt" },
        ].map((item) => (
          <article key={item.course} className="wd-t-menu-item">
            <span>{item.course}</span>
            <p>{item.name}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export function DemoNorwood() {
  return (
    <div className="wd-t wd-t--norwood">
      <header className="wd-t-nav wd-t-nav--light">
        <span className="wd-t-logo wd-t-logo--dark">Norwood Atelier</span>
        <nav className="wd-t-links wd-t-links--dark">
          <span>New in</span>
          <span>Lookbook</span>
          <span>Cart (2)</span>
        </nav>
      </header>
      <section className="wd-t-hero wd-t-hero--norwood">
        <h1>Winter layer collection</h1>
        <p>Merino knits and structured coats — cut for Kathmandu commutes and hill weekends.</p>
      </section>
      <div className="wd-t-product-grid">
        {["Alpine coat", "Ridge scarf", "Summit boot"].map((name, i) => (
          <article key={name} className="wd-t-product">
            <div className={`wd-t-product-img wd-t-product-img--${i}`} />
            <h3>{name}</h3>
            <p>NPR {(8900 + i * 2400).toLocaleString()}</p>
            <button type="button">Add</button>
          </article>
        ))}
      </div>
    </div>
  );
}

export function DemoPulseMetrics() {
  return (
    <div className="wd-t wd-t--pulse">
      <header className="wd-t-nav wd-t-nav--pulse">
        <span className="wd-t-logo">PulseMetrics</span>
        <nav className="wd-t-links">
          <span>Product</span>
          <span>Pricing</span>
          <span>Sign in</span>
          <span className="wd-t-cta-sm wd-t-cta-sm--purple">Start trial</span>
        </nav>
      </header>
      <section className="wd-t-hero wd-t-hero--pulse">
        <h1>Revenue analytics without the spreadsheet chaos</h1>
        <p>Connect Stripe, HubSpot, and your data warehouse in one dashboard.</p>
        <div className="wd-t-dash" aria-hidden="true">
          <div className="wd-t-dash-bar" style={{ height: "45%" }} />
          <div className="wd-t-dash-bar" style={{ height: "72%" }} />
          <div className="wd-t-dash-bar" style={{ height: "58%" }} />
          <div className="wd-t-dash-bar" style={{ height: "88%" }} />
        </div>
      </section>
    </div>
  );
}

export function DemoHavenSpa() {
  return (
    <div className="wd-t wd-t--haven">
      <header className="wd-t-nav wd-t-nav--haven">
        <span className="wd-t-logo wd-t-logo--sage">Haven Spa</span>
        <span className="wd-t-res wd-t-res--sage">Book treatment</span>
      </header>
      <section className="wd-t-hero wd-t-hero--haven">
        <h1>Restore · 90 minutes</h1>
        <p>Hot stone, Himalayan salt scrub, and herbal steam — therapist matched to your pressure preference.</p>
      </section>
      <div className="wd-t-spa-list">
        {[
          { name: "Deep tissue", time: "60 min", price: "NPR 4,200" },
          { name: "Couples ritual", time: "120 min", price: "NPR 9,800" },
          { name: "Ayurvedic abhyanga", time: "75 min", price: "NPR 5,100" },
        ].map((t) => (
          <article key={t.name} className="wd-t-spa-item">
            <div>
              <h3>{t.name}</h3>
              <p>{t.time}</p>
            </div>
            <span>{t.price}</span>
          </article>
        ))}
      </div>
    </div>
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
