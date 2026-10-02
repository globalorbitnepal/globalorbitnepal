import type { ComponentType, ReactNode } from "react";

function Pill({ children, variant = "light" }: { children: ReactNode; variant?: "light" | "dark" | "ghost" | "gold" | "lime" | "copper" }) {
  return <span className={`wd-site-pill wd-site-pill--${variant}`}>{children}</span>;
}

function Nav({
  brand,
  links,
  cta,
  tone = "light",
}: {
  brand: string;
  links: string[];
  cta: string;
  tone?: "light" | "dark";
}) {
  return (
    <header className={`wd-site-nav wd-site-nav--${tone}`}>
      <span className="wd-site-logo">{brand}</span>
      <nav className="wd-site-links">
        {links.map((link) => (
          <span key={link}>{link}</span>
        ))}
      </nav>
      <Pill variant={tone === "dark" ? "dark" : "light"}>{cta}</Pill>
    </header>
  );
}

/** Lodge — warm photography, booking bar, room cards */
export function DemoSummitLodge() {
  return (
    <div className="wd-site wd-site--lodge">
      <Nav brand="Summit Lodge" links={["Rooms", "Dining", "Stay"]} cta="Book stay" />
      <section className="wd-site-hero wd-scene--lodge-dusk">
        <p className="wd-site-kicker">Nagarkot · 2,195 m</p>
        <h1>
          Journey starts
          <em> here</em>
        </h1>
        <p className="wd-site-lede">Twelve rooms above the cloud line. Forest trails. Fireside dinners.</p>
        <div className="wd-site-bookbar">
          <span>12 Oct</span>
          <span>15 Oct</span>
          <span>2 guests</span>
          <Pill>See rooms</Pill>
        </div>
      </section>
      <section className="wd-site-band">
        <h2>Suites with a horizon</h2>
        <div className="wd-site-cards">
          {[
            { name: "Forest deluxe", price: "NPR 12,500", scene: "wd-scene--forest" },
            { name: "Panorama suite", price: "NPR 18,900", scene: "wd-scene--ridge" },
            { name: "Cottage", price: "NPR 15,200", scene: "wd-scene--fire" },
          ].map((room) => (
            <article key={room.name} className="wd-site-card">
              <div className={`wd-site-thumb ${room.scene}`} />
              <h3>{room.name}</h3>
              <p>From {room.price}</p>
            </article>
          ))}
        </div>
      </section>
      <footer className="wd-site-foot">Check-in from 2pm · Airport transfer on request</footer>
    </div>
  );
}

/** Trek operator — oversized type, itinerary, guides */
export function DemoTrailhead() {
  return (
    <div className="wd-site wd-site--trail">
      <Nav brand="Trailhead" links={["Trips", "Guides", "Safety"]} cta="Enquire" />
      <section className="wd-site-hero wd-scene--everest">
        <p className="wd-site-kicker wd-site-kicker--lime">Everest region · 14 days</p>
        <h1 className="wd-site-mega">
          Book
          <br />
          adventure<span>.</span>
        </h1>
        <p className="wd-site-lede">Small groups. Certified guides. Ethical pacing at altitude.</p>
        <Pill variant="lime">Download itinerary</Pill>
      </section>
      <section className="wd-site-band wd-site-band--dark">
        <h2>Days on the trail</h2>
        <ol className="wd-site-days">
          <li>
            <strong>03</strong> Lukla · first tea house
          </li>
          <li>
            <strong>05</strong> Namche rest &amp; views
          </li>
          <li>
            <strong>11</strong> Base camp sunrise
          </li>
        </ol>
      </section>
      <footer className="wd-site-foot wd-site-foot--dark">Licensed operator · Porter welfare policy</footer>
    </div>
  );
}

/** Fine dining — serif, tasting menu, reservation */
export function DemoEmberSlate() {
  return (
    <div className="wd-site wd-site--ember">
      <Nav brand="Ember & Slate" links={["Menu", "Wine", "Private"]} cta="Reserve" />
      <section className="wd-site-hero wd-scene--dining">
        <p className="wd-site-kicker wd-site-kicker--copper">Kathmandu tasting room</p>
        <h1 className="wd-site-serif">
          Seven courses.
          <br />
          One slow evening.
        </h1>
        <p className="wd-site-lede">Wood-fired produce, natural wines, reservations through midnight.</p>
        <Pill variant="copper">Hold a table</Pill>
      </section>
      <section className="wd-site-band wd-site-band--ember">
        <h2>Tonight&apos;s tasting</h2>
        <div className="wd-site-menu">
          <p>
            <span>01</span> Charred leek, miso butter
          </p>
          <p>
            <span>04</span> Line-caught trout, fennel
          </p>
          <p>
            <span>07</span> Dark chocolate, smoked salt
          </p>
        </div>
      </section>
      <footer className="wd-site-foot wd-site-foot--ember">Thu–Sun · Last seating 21:30</footer>
    </div>
  );
}

/** Fashion retail — light editorial lookbook */
export function DemoNorwood() {
  return (
    <div className="wd-site wd-site--norwood">
      <Nav brand="Norwood" links={["Lookbook", "Craft", "Stores"]} cta="Shop drop" tone="dark" />
      <section className="wd-site-hero wd-site-hero--split">
        <div>
          <p className="wd-site-kicker wd-site-kicker--ink">Winter 2026</p>
          <h1 className="wd-site-ink">Layers built for hill mornings.</h1>
          <p className="wd-site-lede wd-site-lede--ink">Merino knits, structured coats, export-ready sizing.</p>
          <Pill variant="dark">Explore collection</Pill>
        </div>
        <div className="wd-site-look">
          <div className="wd-scene--wool" />
          <div className="wd-scene--rose" />
        </div>
      </section>
      <section className="wd-site-band">
        <h2 className="wd-site-ink">New in</h2>
        <div className="wd-site-cards wd-site-cards--3">
          {["Alpine coat", "Ridge scarf", "Summit boot"].map((name, i) => (
            <article key={name} className="wd-site-card wd-site-card--light">
              <div className={`wd-site-thumb ${["wd-scene--wool", "wd-scene--rose", "wd-scene--char"][i]}`} />
              <h3>{name}</h3>
              <p>NPR {(8900 + i * 2400).toLocaleString()}</p>
            </article>
          ))}
        </div>
      </section>
      <footer className="wd-site-foot wd-site-foot--ink">Free pickup in Thamel · Worldwide shipping</footer>
    </div>
  );
}

/** SaaS analytics — dashboard + pricing */
export function DemoPulseMetrics() {
  return (
    <div className="wd-site wd-site--pulse">
      <Nav brand="PulseMetrics" links={["Product", "Pricing", "Docs"]} cta="Start trial" />
      <section className="wd-site-hero wd-site-hero--saas">
        <div>
          <span className="wd-site-chip">AI revenue cockpit</span>
          <h1>Build relationships and drive revenue.</h1>
          <p className="wd-site-lede">Pipeline, churn, and expansion — one console your team actually opens.</p>
          <div className="wd-site-pills">
            <Pill>Open console</Pill>
            <Pill variant="ghost">Book demo</Pill>
          </div>
        </div>
        <div className="wd-dash">
          <div className="wd-dash-top">
            <span>Relationships</span>
            <em>+18%</em>
          </div>
          <div className="wd-dash-bars">
            <i style={{ height: "42%" }} />
            <i style={{ height: "68%" }} />
            <i style={{ height: "51%" }} />
            <i style={{ height: "86%" }} />
            <i style={{ height: "60%" }} />
            <i style={{ height: "74%" }} />
          </div>
          <div className="wd-dash-kpis">
            <span>
              MRR <b>$284k</b>
            </span>
            <span>
              NRR <b>118%</b>
            </span>
          </div>
        </div>
      </section>
      <section className="wd-site-band wd-site-band--pulse">
        <h2>Plans that scale with ARR</h2>
        <div className="wd-site-plans">
          <article>
            <h3>Launch</h3>
            <p>$49 / seat</p>
          </article>
          <article className="is-hot">
            <h3>Growth</h3>
            <p>$129 / seat</p>
          </article>
          <article>
            <h3>Enterprise</h3>
            <p>Custom</p>
          </article>
        </div>
      </section>
      <footer className="wd-site-foot wd-site-foot--dark">SOC 2 in progress · 14-day trial</footer>
    </div>
  );
}

/** Spa / property calm — treatments */
export function DemoHavenSpa() {
  return (
    <div className="wd-site wd-site--haven">
      <Nav brand="Haven Spa" links={["Rituals", "Therapists", "Gifts"]} cta="Book now" />
      <section className="wd-site-hero wd-scene--city-dusk">
        <p className="wd-site-kicker">Thamel · Wellness</p>
        <h1 className="wd-site-serif">Spaces that hold calm.</h1>
        <p className="wd-site-lede">Hot stone, herbal steam, therapists matched to your rhythm.</p>
        <Pill>View treatments</Pill>
      </section>
      <section className="wd-site-band wd-site-band--haven">
        <h2>Rituals</h2>
        <ul className="wd-site-rituals">
          <li>
            <span>Deep tissue</span>
            <em>60 min · NPR 4,200</em>
          </li>
          <li>
            <span>Couples ritual</span>
            <em>120 min · NPR 9,800</em>
          </li>
          <li>
            <span>Abhyanga</span>
            <em>75 min · NPR 5,100</em>
          </li>
        </ul>
      </section>
      <footer className="wd-site-foot">Open daily 10:00–21:00 · Gift vouchers</footer>
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
