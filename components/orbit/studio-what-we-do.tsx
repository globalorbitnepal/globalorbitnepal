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
    const enterEnd = 0.32;
    const holdEnd = 0.54;
    const exitEnd = 0.88;

    const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
    const easeOut = (t: number) => 1 - (1 - t) ** 3;
    const easeIn = (t: number) => t ** 3;

    const apply = () => {
      const track = trackRef.current;
      const grid = gridRef.current;
      if (!track || !grid) return;
      const rect = track.getBoundingClientRect();
      const travel = Math.max(track.offsetHeight - window.innerHeight, 1);
      const raw = clamp(-rect.top / travel, 0, 1);
      const maxScale = window.matchMedia("(max-width: 767px)").matches ? 1.16 : 1.24;

      if (reduce) {
        grid.style.transform = "translate3d(0, 0, 0) rotateX(0deg) scale3d(1.02, 1.02, 1)";
        grid.style.opacity = "1";
        grid.style.setProperty("--orbit-work-overlay", "0.04");
      } else {
        let scale = 1;
        let rotX = 0;
        let tz = 0;
        let opacity = 1;
        let overlay = 0.16;

        if (raw < enterEnd) {
          const t = easeOut(raw / enterEnd);
          scale = 0.56 + t * (maxScale - 0.56);
          rotX = 28 * (1 - t);
          tz = -340 * (1 - t);
          opacity = 0.45 + t * 0.55;
          overlay = 0.28 * (1 - t);
        } else if (raw < holdEnd) {
          const t = (raw - enterEnd) / (holdEnd - enterEnd);
          scale = maxScale * (0.98 + t * 0.02);
          rotX = 0;
          tz = 0;
          opacity = 1;
          overlay = 0.06;
        } else {
          const t = easeIn(clamp((raw - holdEnd) / (exitEnd - holdEnd), 0, 1));
          scale = maxScale * (1 - t * 0.4);
          rotX = -24 * t;
          tz = -300 * t;
          opacity = 1 - t * 0.5;
          overlay = 0.06 + t * 0.22;
        }

        const exitT = easeIn(clamp((raw - holdEnd) / (exitEnd - holdEnd), 0, 1));
        const ty =
          raw < enterEnd ? (1 - easeOut(raw / enterEnd)) * 32 : raw > holdEnd ? exitT * -36 : 0;

        grid.style.transform = `translate3d(0, ${ty}px, ${tz}px) rotateX(${rotX}deg) scale3d(${scale}, ${scale}, 1)`;
        grid.style.opacity = String(opacity);
        grid.style.setProperty("--orbit-work-overlay", String(overlay));
      }

      if (madeRef.current) {
        const show =
          reduce
            ? 1
            : clamp((raw - 0.48) / 0.2, 0, 1) *
              (raw > holdEnd ? 1 - easeIn(clamp((raw - holdEnd) / (exitEnd - holdEnd), 0, 1)) : 1);
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
