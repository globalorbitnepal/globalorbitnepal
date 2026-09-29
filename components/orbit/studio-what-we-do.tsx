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
      <span>5G</span>
    </div>
  );
}

function WebsiteTile({
  tile,
  height,
  fill,
  phone,
}: {
  tile: WorkTile;
  height?: string;
  fill?: boolean;
  phone?: boolean;
}) {
  const src = tile.imageSrc || "/brand/work/summit-seek.jpg";
  return (
    <article
      className={`orbit-work-block${fill ? " is-fill" : ""}`}
      style={height ? { height } : undefined}
    >
      {phone ? <PhoneBar time={tile.phoneTime || "09:41"} /> : <Chrome title={tile.chromeTitle || tile.title || "website"} />}
      <div className="orbit-work-shot-wrap">
        <img className="orbit-work-shot" src={src} alt={tile.title || ""} />
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
      const maxScale = window.matchMedia("(max-width: 767px)").matches ? 1.18 : 1.26;
      const scale = reduce ? 1.02 : 1 + raw * (maxScale - 1);
      grid.style.transform = `scale(${scale})`;
      grid.style.setProperty("--orbit-work-overlay", String(reduce ? 0.04 : 0.16 * (1 - raw)));

      if (madeRef.current) {
        const show = reduce ? 1 : Math.min(1, Math.max(0, (raw - 0.64) / 0.24));
        madeRef.current.style.opacity = String(show);
        madeRef.current.style.transform = `translate3d(0, ${12 - show * 12}px, 0)`;
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
              <WebsiteTile tile={t("col1-top")} fill phone />
              <WebsiteTile tile={t("col1-bottom")} fill phone />
            </div>
            <div className="orbit-work-col is-wide">
              <WebsiteTile tile={t("col2-top")} height="38%" />
              <WebsiteTile tile={t("col2-mid")} height="32%" />
              <WebsiteTile tile={t("col2-bottom")} height="26%" />
            </div>
            <div className="orbit-work-col is-wide">
              <WebsiteTile tile={t("col3-top")} height="58%" />
              <WebsiteTile tile={t("col3-bottom")} height="38%" />
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
