"use client";

import { useEffect, useMemo, useRef } from "react";
import { bindOrbitScroll, isOrbitTouch } from "@/lib/orbit/scroll-performance";
import { workTileBySlot, type WorkConfig, type WorkTile } from "@/lib/work-config";

const TILE_COUNT = 9;

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
  layout,
  priority,
}: {
  tile: WorkTile;
  layout: "phone" | "web-40" | "web-30" | "web-59";
  priority?: boolean;
}) {
  const src = tile.imageSrc || "/brand/work/summit-seek.jpg";
  const phone = layout === "phone";
  return (
    <article className={`orbit-work-block is-${layout}`}>
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

function SpacedHeadline({ id, text }: { id: string; text: string }) {
  const chars = [...text];
  return (
    <h2 id={id} className="orbit-work-headline" aria-label={text}>
      {chars.map((char, index) => (
        <span key={`${index}-${char}`} className="orbit-work-head-char">
          {char === " " ? "\u00a0" : char}
          {index < chars.length - 1 ? " " : null}
        </span>
      ))}
    </h2>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function smoothStep(t: number) {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
}

/** Whole bento: hold at 1.6, then ease to 1.0 (Metaminds work_grid-wrap). */
function gridScale(raw: number, touch: boolean) {
  const holdEnd = touch ? 0.24 : 0.3;
  const start = touch ? 1.48 : 1.6;
  if (raw <= holdEnd) return start;
  const t = (raw - holdEnd) / (1 - holdEnd);
  return start - (start - 1) * t;
}

/** Per-tile reveal window — staggered so tiles pop in one-by-one while scrolling. */
function tileReveal(raw: number, index: number, touch: boolean) {
  const step = touch ? 0.048 : 0.052;
  const duration = touch ? 0.11 : 0.13;
  const start = 0.03 + index * step;
  const t = smoothStep(clamp((raw - start) / duration, 0, 1));
  const scale = 0.42 + t * 0.58;
  const opacity = t;
  const y = (1 - t) * (touch ? 14 : 22);
  const imgScale = 1.32 - t * 0.32;
  return { scale, opacity, y, imgScale, active: t > 0 && t < 1 };
}

export function OrbitStudioWhatWeDo({ config }: { config: WorkConfig }) {
  const trackRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const t = (slot: Parameters<typeof workTileBySlot>[1]) => workTileBySlot(config, slot);

  const phoneRightTop: WorkTile = {
    ...t("col3-top"),
    slot: "col4-top",
    phoneTime: "11:08",
    type: "phone-screen",
  };
  const phoneRightBottom: WorkTile = {
    ...t("col3-bottom"),
    slot: "col4-bottom",
    phoneTime: "16:44",
    type: "phone-screen",
  };

  const preloadUrls = useMemo(() => {
    const slots = [
      t("col1-top"),
      t("col2-top"),
      t("col3-top"),
      phoneRightTop,
      t("col1-bottom"),
      t("col2-mid"),
      t("col3-bottom"),
      phoneRightBottom,
      t("col2-bottom"),
    ] as WorkTile[];
    return [...new Set(slots.map((tile) => tile.imageSrc || "/brand/work/summit-seek.jpg"))];
  }, [config]);

  useEffect(() => {
    preloadUrls.forEach((src) => {
      const img = new Image();
      img.decoding = "async";
      img.src = src;
    });
  }, [preloadUrls]);

  useEffect(() => {
    const track = trackRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!track) return;

    const apply = () => {
      const grid = gridRef.current;
      const bento = bentoRef.current;
      if (!grid || !bento) return;

      const rect = track.getBoundingClientRect();
      const travel = Math.max(track.offsetHeight - window.innerHeight, 1);
      const raw = clamp(-rect.top / travel, 0, 1);
      const touch = isOrbitTouch();

      track.classList.toggle("is-work-scrolling", raw > 0.02 && raw < 0.98);

      const blocks = bento.querySelectorAll<HTMLElement>(".orbit-work-block");
      const shots = bento.querySelectorAll<HTMLElement>(".orbit-work-shot");

      if (reduce) {
        grid.style.transform = "translate3d(0, 0, 0) scale3d(1, 1, 1)";
        blocks.forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "translate3d(0, 0, 0) scale(1)";
        });
        shots.forEach((el) => {
          el.style.transform = "scale(1)";
        });
        return;
      }

      const gScale = gridScale(raw, touch);
      grid.style.transform = `translate3d(0, 0, 0) scale3d(${gScale.toFixed(5)}, ${gScale.toFixed(5)}, 1)`;

      blocks.forEach((el, index) => {
        if (index >= TILE_COUNT) return;
        const { scale, opacity, y, imgScale, active } = tileReveal(raw, index, touch);
        el.style.opacity = opacity.toFixed(3);
        el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
        el.classList.toggle("is-tile-animating", active);
        const shot = shots[index];
        if (shot) shot.style.transform = `scale(${imgScale.toFixed(4)})`;
      });
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
          <SpacedHeadline id="what-we-do-heading" text={config.headline} />
        </div>

        <div className="orbit-work-grid-main">
          <div ref={gridRef} className="orbit-work-grid-wrap">
            <div ref={bentoRef} className="orbit-work-bento">
              <WebsiteTile tile={t("col1-top")} layout="phone" priority />
              <WebsiteTile tile={t("col2-top")} layout="web-40" />
              <WebsiteTile tile={t("col3-top")} layout="web-59" />
              <WebsiteTile tile={phoneRightTop} layout="phone" />
              <WebsiteTile tile={t("col1-bottom")} layout="phone" />
              <WebsiteTile tile={t("col2-mid")} layout="web-40" />
              <WebsiteTile tile={t("col3-bottom")} layout="web-40" />
              <WebsiteTile tile={phoneRightBottom} layout="phone" />
              <WebsiteTile tile={t("col2-bottom")} layout="web-30" />
            </div>
          </div>
        </div>

        <p className="orbit-work-made">{config.madeLabel}</p>
      </div>
    </section>
  );
}
