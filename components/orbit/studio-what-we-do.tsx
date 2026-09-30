"use client";

import { useEffect, useRef } from "react";
import { bindOrbitScroll, isOrbitTouch } from "@/lib/orbit/scroll-performance";
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
  priority,
}: {
  tile: WorkTile;
  height?: string;
  fill?: boolean;
  phone?: boolean;
  priority?: boolean;
}) {
  const src = tile.imageSrc || "/brand/work/summit-seek.jpg";
  return (
    <article
      className={`orbit-work-block${fill ? " is-fill" : ""}`}
      style={height ? { height } : undefined}
    >
      {phone ? <PhoneBar time={tile.phoneTime || "09:41"} /> : <Chrome title={tile.chromeTitle || tile.title || "website"} />}
      <div className="orbit-work-shot-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="orbit-work-shot"
          src={src}
          alt={tile.title || ""}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
        />
      </div>
    </article>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/** Metaminds-style smooth ease (no harsh cubic snap). */
function smoothStep(t: number) {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
}

export function OrbitStudioWhatWeDo({ config }: { config: WorkConfig }) {
  const trackRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const madeRef = useRef<HTMLParagraphElement>(null);
  const frameRef = useRef(0);
  const t = (slot: Parameters<typeof workTileBySlot>[1]) => workTileBySlot(config, slot);

  useEffect(() => {
    const track = trackRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!track) return;

    const enterEnd = 0.42;
    const holdEnd = 0.68;
    const exitEnd = 0.94;

    const apply = () => {
      const grid = gridRef.current;
      if (!grid) return;

      const rect = track.getBoundingClientRect();
      const travel = Math.max(track.offsetHeight - window.innerHeight, 1);
      const raw = clamp(-rect.top / travel, 0, 1);
      const touch = isOrbitTouch();
      const maxScale = touch ? 1.02 : 1.08;

      track.classList.toggle("is-work-scrolling", raw > 0.02 && raw < 0.98);

      if (reduce) {
        grid.style.transform = "translate3d(0, 0, 0) scale(1)";
        grid.style.opacity = "1";
        grid.style.setProperty("--orbit-work-overlay", "0.04");
      } else {
        let scale = 1;
        let ty = 0;
        let opacity = 1;
        let overlay = 0.12;

        if (raw < enterEnd) {
          const p = smoothStep(raw / enterEnd);
          scale = 0.62 + p * (maxScale - 0.62);
          ty = (1 - p) * (touch ? 28 : 48);
          opacity = 0.5 + p * 0.5;
          overlay = 0.26 * (1 - p);
        } else if (raw < holdEnd) {
          const p = smoothStep((raw - enterEnd) / (holdEnd - enterEnd));
          scale = maxScale * (0.985 + p * 0.015);
          ty = 0;
          opacity = 1;
          overlay = 0.05;
        } else {
          const p = smoothStep(clamp((raw - holdEnd) / (exitEnd - holdEnd), 0, 1));
          scale = maxScale * (1 - p * 0.14);
          ty = -p * (touch ? 16 : 32);
          opacity = 1 - p * 0.35;
          overlay = 0.05 + p * 0.18;
        }

        grid.style.transform = `translate3d(0, ${ty.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
        grid.style.opacity = opacity.toFixed(3);
        grid.style.setProperty("--orbit-work-overlay", overlay.toFixed(3));
      }

      if (madeRef.current) {
        const show =
          reduce
            ? 1
            : clamp((raw - 0.5) / 0.22, 0, 1) *
              (raw > holdEnd ? 1 - smoothStep(clamp((raw - holdEnd) / (exitEnd - holdEnd), 0, 1)) : 1);
        madeRef.current.style.opacity = String(show);
        madeRef.current.style.transform = `translate3d(0, ${(12 - show * 12).toFixed(1)}px, 0)`;
      }
    };

    return bindOrbitScroll(track, apply, frameRef);
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
              <WebsiteTile tile={t("col1-top")} fill phone priority />
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
