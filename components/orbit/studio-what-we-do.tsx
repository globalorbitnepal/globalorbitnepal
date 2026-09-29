"use client";

import { useEffect, useRef } from "react";
import { workTileBySlot, type WorkConfig, type WorkTile } from "@/lib/work-config";

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

function PhoneScreen({ tile }: { tile: WorkTile }) {
  const src = tile.imageSrc || "/brand/places/himalaya.jpg";
  return (
    <article className="orbit-work-block is-fill">
      <PhoneBar time={tile.phoneTime || "09:41"} />
      <div
        className="orbit-work-screen is-phone-hero"
        style={{ backgroundImage: `url(${src})` }}
      >
        <div className="orbit-work-caption">
          <p>{tile.title}</p>
          <span>{tile.subtitle}</span>
        </div>
      </div>
    </article>
  );
}

function PhoneApp({ tile }: { tile: WorkTile }) {
  const lines = tile.appLines || [];
  return (
    <article className="orbit-work-block is-fill">
      <PhoneBar time={tile.phoneTime || "12:00"} />
      <div className={`orbit-work-app${tile.appVariant === "violet" ? " is-violet" : ""}`}>
        <p className="orbit-work-app-kicker">{tile.appKicker}</p>
        <p className="orbit-work-app-total">{tile.appTotal}</p>
        <ul>
          {lines.map((line) => (
            <li key={`${line.left}-${line.right}`}>
              <span>{line.left}</span>
              <b>{line.right}</b>
            </li>
          ))}
        </ul>
        <div className="orbit-work-app-cta">{tile.appCta}</div>
      </div>
    </article>
  );
}

function BrowserScreen({
  tile,
  height,
  low,
}: {
  tile: WorkTile;
  height: string;
  low?: boolean;
}) {
  const src = tile.imageSrc || "/brand/places/pagoda.jpg";
  return (
    <article className="orbit-work-block" style={{ height }}>
      <Chrome title={tile.chromeTitle || "website.com"} />
      <div
        className={`orbit-work-screen${low ? " is-low" : ""}`}
        style={{ backgroundImage: `url(${src})` }}
      >
        {tile.nav ? <div className="orbit-work-nav">{tile.nav}</div> : null}
        <div className="orbit-work-caption">
          <p>{tile.title}</p>
          <span>{tile.subtitle}</span>
        </div>
      </div>
    </article>
  );
}

function DashboardTile({ tile, height }: { tile: WorkTile; height: string }) {
  const stats = tile.dashStats || [];
  const barHeights = ["42%", "68%", "54%", "86%", "61%", "74%"];
  return (
    <article className="orbit-work-block" style={{ height }}>
      <Chrome title={tile.chromeTitle || "dashboard.app"} />
      <div className="orbit-work-dash">
        <div className="orbit-work-dash-row">
          {stats.map((stat) => (
            <div key={stat.label}>
              <small>{stat.label}</small>
              <strong>{stat.value}</strong>
            </div>
          ))}
        </div>
        <div className="orbit-work-bars" aria-hidden="true">
          {barHeights.map((h) => (
            <span key={h} style={{ height: h }} />
          ))}
        </div>
      </div>
    </article>
  );
}

function SeoTile({ tile, height }: { tile: WorkTile; height: string }) {
  return (
    <article className="orbit-work-block" style={{ height }}>
      <Chrome title={tile.chromeTitle || "seo.example.com"} />
      <div className="orbit-work-seo">
        <p>{tile.seoLabel}</p>
        <div className="orbit-work-seo-rank">
          <b>{tile.seoRank}</b>
          <span>{tile.seoKeyword}</span>
        </div>
        <div className="orbit-work-seo-line" aria-hidden="true" />
      </div>
    </article>
  );
}

export function OrbitStudioWhatWeDo({ config }: { config: WorkConfig }) {
  const trackRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const madeRef = useRef<HTMLParagraphElement>(null);
  const frameRef = useRef(0);

  const t = (slot: Parameters<typeof workTileBySlot>[1]) => workTileBySlot(config, slot);

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
            <span className="orbit-work-badge-num">{config.badgeNum}</span>
            {config.badgeLabel}
          </p>
          <h2 id="what-we-do-heading" className="orbit-work-headline">
            {config.headline}
          </h2>
        </div>

        <div className="orbit-work-grid-main">
          <div ref={gridRef} className="orbit-work-grid">
            <div className="orbit-work-col is-phone">
              <PhoneScreen tile={t("col1-top")} />
              <PhoneApp tile={t("col1-bottom")} />
            </div>

            <div className="orbit-work-col is-wide">
              <BrowserScreen tile={t("col2-top")} height="38%" />
              <DashboardTile tile={t("col2-mid")} height="32%" />
              <BrowserScreen tile={t("col2-bottom")} height="24%" low />
            </div>

            <div className="orbit-work-col is-wide">
              <BrowserScreen tile={t("col3-top")} height="58%" />
              <SeoTile tile={t("col3-bottom")} height="36%" />
            </div>

            <div className="orbit-work-col is-phone">
              <PhoneScreen tile={t("col4-top")} />
              <PhoneApp tile={t("col4-bottom")} />
            </div>
          </div>
        </div>

        <p ref={madeRef} className="orbit-work-made">
          {config.madeLabel}
        </p>
      </div>
    </section>
  );
}
