import type { ComponentType } from "react";

const IMG = "/brand/website-demos";

function Nav({
  brand,
  links,
  cta,
  dark,
}: {
  brand: string;
  links: string[];
  cta: string;
  dark?: boolean;
}) {
  return (
    <header className={`wd-nav ${dark ? "is-dark" : ""}`}>
      <strong>{brand}</strong>
      <nav>
        {links.map((link) => (
          <span key={link}>{link}</span>
        ))}
      </nav>
      <em>{cta}</em>
    </header>
  );
}

export function DemoSummitLodge() {
  return (
    <article className="wd-real wd-real--lodge">
      <Nav brand="Summit Lodge" links={["Rooms", "Dining", "Experiences"]} cta="Book stay" />
      <section className="wd-real-hero">
        <img src={`${IMG}/lodge-hero.jpg`} alt="" />
        <div className="wd-real-hero-copy">
          <p>Nagarkot · Nepal</p>
          <h1>
            Quiet rooms
            <br />
            above the clouds
          </h1>
          <span>See availability</span>
        </div>
      </section>
      <section className="wd-real-grid">
        {[
          [`${IMG}/lodge-room-1.jpg`, "Forest deluxe", "NPR 12,500"],
          [`${IMG}/lodge-room-2.jpg`, "Panorama suite", "NPR 18,900"],
          [`${IMG}/lodge-room-3.jpg`, "Hill cottage", "NPR 15,200"],
        ].map(([src, name, price]) => (
          <figure key={name}>
            <img src={src} alt="" />
            <figcaption>
              <b>{name}</b>
              <i>{price}</i>
            </figcaption>
          </figure>
        ))}
      </section>
    </article>
  );
}

export function DemoTrailhead() {
  return (
    <article className="wd-real wd-real--trail">
      <Nav brand="Trailhead" links={["Trips", "Guides", "Safety"]} cta="Enquire" />
      <section className="wd-real-hero">
        <img src={`${IMG}/trek-hero.jpg`} alt="" />
        <div className="wd-real-hero-copy is-bottom">
          <p>Everest region · 14 days</p>
          <h1>
            Book
            <br />
            adventure.
          </h1>
          <span>Download itinerary</span>
        </div>
      </section>
      <section className="wd-real-strip">
        <img src={`${IMG}/trek-1.jpg`} alt="" />
        <div>
          <h2>Small groups. Certified guides.</h2>
          <p>Day 03 Lukla · Day 05 Namche · Day 11 Base camp sunrise.</p>
        </div>
      </section>
    </article>
  );
}

export function DemoEmberSlate() {
  return (
    <article className="wd-real wd-real--ember">
      <Nav brand="Ember & Slate" links={["Menu", "Wine", "Private"]} cta="Reserve" />
      <section className="wd-real-hero">
        <img src={`${IMG}/dine-hero.jpg`} alt="" />
        <div className="wd-real-hero-copy is-left">
          <p>Kathmandu tasting room</p>
          <h1>
            Seven courses.
            <br />
            One slow evening.
          </h1>
          <span>Hold a table</span>
        </div>
      </section>
      <section className="wd-real-menu">
        <img src={`${IMG}/dine-1.jpg`} alt="" />
        <ol>
          <li>
            <b>01</b> Charred leek, miso butter
          </li>
          <li>
            <b>04</b> Line-caught trout, fennel
          </li>
          <li>
            <b>07</b> Dark chocolate, smoked salt
          </li>
        </ol>
      </section>
    </article>
  );
}

export function DemoNorwood() {
  return (
    <article className="wd-real wd-real--norwood">
      <Nav brand="Norwood" links={["Lookbook", "Craft", "Stores"]} cta="Shop" dark />
      <section className="wd-real-split">
        <div>
          <p>Winter collection</p>
          <h1>Layers for hill mornings.</h1>
          <span>Explore drop</span>
        </div>
        <img src={`${IMG}/fashion-hero.jpg`} alt="" />
      </section>
      <section className="wd-real-grid is-light">
        {[
          [`${IMG}/fashion-1.jpg`, "Alpine coat", "NPR 18,900"],
          [`${IMG}/fashion-2.jpg`, "Ridge scarf", "NPR 4,200"],
          [`${IMG}/fashion-3.jpg`, "Summit boot", "NPR 12,400"],
        ].map(([src, name, price]) => (
          <figure key={name}>
            <img src={src} alt="" />
            <figcaption>
              <b>{name}</b>
              <i>{price}</i>
            </figcaption>
          </figure>
        ))}
      </section>
    </article>
  );
}

export function DemoPulseMetrics() {
  return (
    <article className="wd-real wd-real--pulse">
      <Nav brand="PulseMetrics" links={["Product", "Pricing", "Docs"]} cta="Start trial" />
      <section className="wd-real-saas">
        <div>
          <p>Revenue cockpit</p>
          <h1>See every rupee move.</h1>
          <p className="wd-real-lede">Pipeline, churn, and expansion in one console.</p>
          <span>Open console</span>
        </div>
        <img src={`${IMG}/saas-hero.jpg`} alt="" />
      </section>
      <section className="wd-real-kpis">
        <div>
          <b>$284k</b>
          <i>MRR</i>
        </div>
        <div>
          <b>118%</b>
          <i>NRR</i>
        </div>
        <div>
          <b>+18%</b>
          <i>Expansion</i>
        </div>
      </section>
    </article>
  );
}

export function DemoHavenSpa() {
  return (
    <article className="wd-real wd-real--haven">
      <Nav brand="Haven Spa" links={["Rituals", "Therapists", "Gifts"]} cta="Book now" />
      <section className="wd-real-hero">
        <img src={`${IMG}/spa-hero.jpg`} alt="" />
        <div className="wd-real-hero-copy">
          <p>Thamel · Wellness</p>
          <h1>Spaces that hold calm.</h1>
          <span>View treatments</span>
        </div>
      </section>
      <section className="wd-real-strip">
        <img src={`${IMG}/spa-1.jpg`} alt="" />
        <ul>
          <li>
            Deep tissue <em>60 min</em>
          </li>
          <li>
            Couples ritual <em>120 min</em>
          </li>
          <li>
            Abhyanga <em>75 min</em>
          </li>
        </ul>
      </section>
    </article>
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
