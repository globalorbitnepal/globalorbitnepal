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
  return (
    <h2 id={id} className="orbit-work-headline" aria-label={text}>
      {text.split("").map((char, index) => (
        <span key={`${char}-${index}`} className="orbit-work-head-char" aria-hidden={char === " " ? undefined : true}>
          {char === " " ? "\u00a0" : char}
        </span>
      ))}
    </h2>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/** Metaminds work_grid-wrap: hold 1.6 until ~30% scroll, then linear to 1.0 */
function metamindsWorkScale(raw: number, touch: boolean) {
  const holdEnd = touch ? 0.22 : 0.3;
  const start = touch ? 1.45 : 1.6;
  const end = 1;
  if (raw <= holdEnd) return start;
  const t = clamp((raw - holdEnd) / (1 - holdEnd), 0, 1);
  return start - (start - end) * t;
}

export function OrbitStudioWhatWeDo({ config }: { config: WorkConfig }) {
  const trackRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const track = trackRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!track) return;

    const apply = () => {
      const grid = gridRef.current;
      if (!grid) return;

      const rect = track.getBoundingClientRect();
      const travel = Math.max(track.offsetHeight - window.innerHeight, 1);
      const raw = clamp(-rect.top / travel, 0, 1);
      const touch = isOrbitTouch();

      track.classList.toggle("is-work-scrolling", raw > 0.02 && raw < 0.98);

      if (reduce) {
        grid.style.transform = "translate3d(0, 0, 0) scale3d(1, 1, 1)";
      } else {
        const scale = metamindsWorkScale(raw, touch);
        grid.style.transform = `translate3d(0, 0, 0) scale3d(${scale.toFixed(5)}, ${scale.toFixed(5)}, 1)`;
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
          <SpacedHeadline id="what-we-do-heading" text={config.headline} />
        </div>

        <div className="orbit-work-grid-main">
          <div ref={gridRef} className="orbit-work-grid-wrap">
            <div className="orbit-work-bento">
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
