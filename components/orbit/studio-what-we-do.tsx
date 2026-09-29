"use client";

import { useEffect, useRef } from "react";

function Chrome({ title }: { title: string }) {
  return (
    <div className="orbit-work-chrome">
      <span className="orbit-work-dot" />
      <span className="orbit-work-dot is-amber" />
      <span className="orbit-work-dot is-green" />
      <p>{title}</p>
    </div>
  );
}

function PhoneBar({ time }: { time: string }) {
  return (
    <div className="orbit-work-phonebar">
      <span>{time}</span>
      <span className="orbit-work-phonebar-notch" />
      <span>5G · 89%</span>
    </div>
  );
}

export function OrbitStudioWhatWeDo() {
  const trackRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const madeRef = useRef<HTMLParagraphElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const apply = () => {
      const track = trackRef.current;
      const grid = gridRef.current;
      if (!track || !grid) return;
      const rect = track.getBoundingClientRect();
      const travel = Math.max(track.offsetHeight - window.innerHeight, 1);
      const raw = Math.min(1, Math.max(0, -rect.top / travel));
      const maxScale = window.matchMedia("(max-width: 767px)").matches ? 1.72 : 2.18;
      const scale = reduce ? 1.08 : 1 + raw * (maxScale - 1);
      grid.style.transform = `scale(${scale})`;
      grid.style.setProperty("--orbit-work-overlay", String(reduce ? 0.12 : 0.42 * (1 - raw)));

      if (madeRef.current) {
        const show = reduce ? 1 : Math.min(1, Math.max(0, (raw - 0.58) / 0.28));
        madeRef.current.style.opacity = String(show);
        madeRef.current.style.transform = `translate3d(0, ${18 - show * 18}px, 0)`;
      }
    };

    const onScroll = () => {
      if (frameRef.current) return;
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = 0;
        apply();
      });
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <section ref={trackRef} className="orbit-work-track" aria-labelledby="what-we-do-heading">
      <div className="orbit-work-pin">
        <div className="orbit-work-head">
          <p className="orbit-work-badge">
            <span className="orbit-work-badge-num">3</span>
            What we do
          </p>
          <h2 id="what-we-do-heading" className="orbit-work-headline">
            Helped businesses transform ideas into intuitive designs.
          </h2>
        </div>

        <div className="orbit-work-grid-main">
          <div ref={gridRef} className="orbit-work-grid">
            <div className="orbit-work-col is-phone">
              <article className="orbit-work-block is-fill">
                <PhoneBar time="09:41" />
                <div className="orbit-work-screen is-phone-hero" style={{ backgroundImage: "url(/brand/places/himalaya.jpg)" }}>
                  <div className="orbit-work-caption">
                    <p>Himalaya Grand</p>
                    <span>Book suite · NPR 18,500</span>
                  </div>
                </div>
              </article>
              <article className="orbit-work-block is-fill">
                <PhoneBar time="12:08" />
                <div className="orbit-work-app">
                  <p className="orbit-work-app-kicker">TableLine POS</p>
                  <p className="orbit-work-app-total">NPR 4,280</p>
                  <ul>
                    <li><span>Thakali set × 2</span><b>1,800</b></li>
                    <li><span>Momo platter</span><b>650</b></li>
                    <li><span>Service</span><b>180</b></li>
                  </ul>
                  <div className="orbit-work-app-cta">Close bill</div>
                </div>
              </article>
            </div>

            <div className="orbit-work-col is-wide">
              <article className="orbit-work-block" style={{ height: "38%" }}>
                <Chrome title="lakeside-stay.com" />
                <div className="orbit-work-screen" style={{ backgroundImage: "url(/brand/places/pagoda.jpg)" }}>
                  <div className="orbit-work-nav">Stay · Rooms · Book</div>
                  <div className="orbit-work-caption">
                    <p>Lakeside Stay Pokhara</p>
                    <span>Direct booking · lakeside view</span>
                  </div>
                </div>
              </article>
              <article className="orbit-work-block" style={{ height: "32%" }}>
                <Chrome title="orbit-billing.app" />
                <div className="orbit-work-dash">
                  <div className="orbit-work-dash-row">
                    <div>
                      <small>Invoices</small>
                      <strong>128</strong>
                    </div>
                    <div>
                      <small>Collected</small>
                      <strong>NPR 9.4L</strong>
                    </div>
                    <div>
                      <small>GST</small>
                      <strong>On time</strong>
                    </div>
                  </div>
                  <div className="orbit-work-bars" aria-hidden="true">
                    <span style={{ height: "42%" }} />
                    <span style={{ height: "68%" }} />
                    <span style={{ height: "54%" }} />
                    <span style={{ height: "86%" }} />
                    <span style={{ height: "61%" }} />
                    <span style={{ height: "74%" }} />
                  </div>
                </div>
              </article>
              <article className="orbit-work-block" style={{ height: "24%" }}>
                <Chrome title="annapurna-trails.com" />
                <div className="orbit-work-screen is-low" style={{ backgroundImage: "url(/brand/places/city.jpg)" }}>
                  <div className="orbit-work-caption">
                    <p>Annapurna Trails</p>
                    <span>Seasonal itineraries · 4× sessions</span>
                  </div>
                </div>
              </article>
            </div>

            <div className="orbit-work-col is-wide">
              <article className="orbit-work-block" style={{ height: "58%" }}>
                <Chrome title="citycare.hospital" />
                <div className="orbit-work-screen" style={{ backgroundImage: "url(/brand/offices/nepal.jpg)" }}>
                  <div className="orbit-work-nav">Doctors · Appointments · Labs</div>
                  <div className="orbit-work-caption">
                    <p>City Care Hospital</p>
                    <span>Schedules routed to the desk</span>
                  </div>
                </div>
              </article>
              <article className="orbit-work-block" style={{ height: "36%" }}>
                <Chrome title="seo.globalorbitnepal.com" />
                <div className="orbit-work-seo">
                  <p>Organic visibility</p>
                  <div className="orbit-work-seo-rank">
                    <b>#1</b>
                    <span>hotel pokhara booking</span>
                  </div>
                  <div className="orbit-work-seo-line" aria-hidden="true" />
                </div>
              </article>
            </div>

            <div className="orbit-work-col is-phone">
              <article className="orbit-work-block is-fill">
                <PhoneBar time="18:22" />
                <div className="orbit-work-screen is-phone-hero" style={{ backgroundImage: "url(/brand/studio-service-apps.jpg)" }}>
                  <div className="orbit-work-caption">
                    <p>Partner portal</p>
                    <span>Dealer login · live orders</span>
                  </div>
                </div>
              </article>
              <article className="orbit-work-block is-fill">
                <PhoneBar time="07:55" />
                <div className="orbit-work-app is-violet">
                  <p className="orbit-work-app-kicker">Wellness Spa</p>
                  <p className="orbit-work-app-total">Today · 14</p>
                  <ul>
                    <li><span>Hot stone 10:00</span><b>Booked</b></li>
                    <li><span>Ayurveda 13:30</span><b>Booked</b></li>
                    <li><span>Steam 16:00</span><b>Open</b></li>
                  </ul>
                  <div className="orbit-work-app-cta">New booking</div>
                </div>
              </article>
            </div>
          </div>
        </div>

        <p ref={madeRef} className="orbit-work-made">
          Made at Global Orbit
        </p>
      </div>
    </section>
  );
}
