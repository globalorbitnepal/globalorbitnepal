import type { ComponentType } from "react";

const IMG = "/brand/website-demos";

function OverlayNav({
  brand,
  links,
  cta,
}: {
  brand: string;
  links: string[];
  cta?: string;
}) {
  return (
    <header className="wd-land-nav">
      <strong>{brand}</strong>
      <nav>
        {links.map((link) => (
          <span key={link}>{link}</span>
        ))}
      </nav>
      {cta ? <em>{cta}</em> : <span className="wd-land-nav-spacer" />}
    </header>
  );
}

/** Lodge — cinematic travel hero + room filmstrip */
export function DemoSummitLodge() {
  return (
    <article className="wd-land wd-land--center">
      <img className="wd-land-bg" src={`${IMG}/lodge-hero.jpg`} alt="" />
      <OverlayNav brand="Summit Lodge" links={["Rooms", "Dining", "Stay"]} cta="Book" />
      <div className="wd-land-copy">
        <p>Nagarkot · Nepal</p>
        <h1>
          The stay
          <br />
          begins here
        </h1>
        <button type="button">View rooms</button>
      </div>
      <div className="wd-land-strip">
        <img src={`${IMG}/lodge-room-1.jpg`} alt="" />
        <img src={`${IMG}/lodge-room-2.jpg`} alt="" />
        <img src={`${IMG}/lodge-room-3.jpg`} alt="" />
      </div>
    </article>
  );
}

/** Trek — oversized type on mountain */
export function DemoTrailhead() {
  return (
    <article className="wd-land wd-land--left wd-land--mega">
      <img className="wd-land-bg" src={`${IMG}/trek-hero.jpg`} alt="" />
      <OverlayNav brand="Trailhead" links={["Trips", "Guides", "Gear"]} />
      <div className="wd-land-copy">
        <p>Everest region</p>
        <h1>
          Ride the
          <br />
          ridgeline.
        </h1>
        <button type="button">See departures</button>
      </div>
    </article>
  );
}

/** Dining — bold type left, photography right */
export function DemoEmberSlate() {
  return (
    <article className="wd-land wd-land--split">
      <OverlayNav brand="Ember & Slate" links={["Menu", "Wine", "Visit"]} cta="Reserve" />
      <div className="wd-land-split">
        <div className="wd-land-split-copy">
          <p>Tasting room · Kathmandu</p>
          <h1>
            Fire, plate
            <br />
            and quiet light
          </h1>
          <p className="wd-land-sub">Seven courses. Natural wines. Last seating 21:30.</p>
          <button type="button">Hold a table</button>
        </div>
        <img src={`${IMG}/dine-hero.jpg`} alt="" />
      </div>
    </article>
  );
}

/** Fashion — dark editorial with lookbook thumbs */
export function DemoNorwood() {
  return (
    <article className="wd-land wd-land--left">
      <img className="wd-land-bg" src={`${IMG}/fashion-hero.jpg`} alt="" />
      <OverlayNav brand="Norwood" links={["Lookbook", "Craft", "Stores"]} cta="Shop" />
      <div className="wd-land-copy">
        <p>Winter drop</p>
        <h1>
          Cut for
          <br />
          hill mornings
        </h1>
        <button type="button">Shop the drop</button>
      </div>
      <div className="wd-land-strip">
        <img src={`${IMG}/fashion-1.jpg`} alt="" />
        <img src={`${IMG}/fashion-2.jpg`} alt="" />
        <img src={`${IMG}/fashion-3.jpg`} alt="" />
      </div>
    </article>
  );
}

/** SaaS — product hero + live metrics panel */
export function DemoPulseMetrics() {
  return (
    <article className="wd-land wd-land--pulse">
      <OverlayNav brand="PulseMetrics" links={["Product", "Pricing", "Login"]} cta="Start" />
      <div className="wd-land-pulse">
        <div>
          <p>Operator console</p>
          <h1>
            Revenue,
            <br />
            in one view
          </h1>
          <p className="wd-land-sub">Pipeline, NRR, and expansion without the spreadsheet stack.</p>
          <button type="button">Open console</button>
        </div>
        <div className="wd-land-board">
          <header>
            <span>Overview</span>
            <strong>+18%</strong>
          </header>
          <div className="wd-land-board-nums">
            <div>
              <b>128</b>
              <i>Accounts</i>
            </div>
            <div>
              <b>$2.4M</b>
              <i>Pipeline</i>
            </div>
            <div>
              <b>312</b>
              <i>Seats</i>
            </div>
          </div>
          <div className="wd-land-bars">
            <i style={{ height: "46%" }} />
            <i style={{ height: "62%" }} />
            <i style={{ height: "38%" }} />
            <i style={{ height: "84%" }} />
            <i style={{ height: "57%" }} />
            <i style={{ height: "71%" }} />
            <i style={{ height: "49%" }} />
            <i style={{ height: "90%" }} />
          </div>
        </div>
      </div>
    </article>
  );
}

/** Spa — serif headline on photography */
export function DemoHavenSpa() {
  return (
    <article className="wd-land wd-land--serif">
      <img className="wd-land-bg" src={`${IMG}/spa-hero.jpg`} alt="" />
      <OverlayNav brand="Haven" links={["Rituals", "Stay", "Gifts"]} cta="Book" />
      <div className="wd-land-copy">
        <p>Thamel wellness</p>
        <h1>
          Homes
          <br />
          that hold light
        </h1>
        <button type="button">Browse rituals</button>
      </div>
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
