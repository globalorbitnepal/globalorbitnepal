"use client";

import { useEffect, useMemo, useRef } from "react";
import { bindOrbitScroll, isOrbitTouch } from "@/lib/orbit/scroll-performance";
import {
  WORK_BENTO_ORDER,
  workTileBySlot,
  type WorkConfig,
  type WorkTile,
  type WorkTileSlot,
} from "@/lib/work-config";

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

function MetamindsHeadline({ id, text }: { id: string; text: string }) {
  const words = text.trim().split(/\s+/);
  return (
    <h2 id={id} className="orbit-work-headline" aria-label={text}>
      {words.map((word, wi) => (
        <span key={`${wi}-${word}`} className="orbit-work-head-word">
          {[...word].map((char, ci) => (
            <span key={ci} className="orbit-work-head-char">
              {char}
            </span>
          ))}
          {wi < words.length - 1 ? " " : null}
        </span>
      ))}
    </h2>
  );
}

function WorkBlock({ tile, priority }: { tile: WorkTile; priority?: boolean }) {
  const phone = tile.type === "phone-screen" || tile.type === "phone-app";
  const src = tile.imageSrc || "/brand/work/summit-seek.jpg";
  return (
    <article className={`orbit-work-block${phone ? " is-phone" : " is-desktop"}`}>
      {phone ? (
        <>
          <PhoneBar time={tile.phoneTime || "09:41"} />
          <div className="orbit-work-shot-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="orbit-work-shot" src={src} alt={tile.title || ""} loading={priority ? "eager" : "lazy"} decoding="async" draggable={false} />
          </div>
        </>
      ) : (
        <>
          <Chrome title={tile.chromeTitle || tile.title || "website"} />
          <div className="orbit-work-shot-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="orbit-work-shot" src={src} alt={tile.title || ""} loading={priority ? "eager" : "lazy"} decoding="async" draggable={false} />
          </div>
        </>
      )}
    </article>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function smoothStep(t: number) {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
}

function mosaicScale(raw: number, touch: boolean) {
  const holdEnd = touch ? 0.24 : 0.3;
  const start = touch ? 1.48 : 1.6;
  if (raw <= holdEnd) return start;
  const t = (raw - holdEnd) / (1 - holdEnd);
  return start - (start - 1) * t;
}

function madeLabelProgress(raw: number) {
  if (raw < 0.42) return 0;
  if (raw < 0.58) return smoothStep((raw - 0.42) / 0.16);
  if (raw < 0.9) return 1;
  return 1 - smoothStep((raw - 0.9) / 0.1);
}

export function OrbitStudioWhatWeDo({ config }: { config: WorkConfig }) {
  const trackRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const madeRef = useRef<HTMLParagraphElement>(null);
  const frameRef = useRef(0);

  const tiles = useMemo(
    () =>
      WORK_BENTO_ORDER.map((slot) => workTileBySlot(config, slot as WorkTileSlot)),
    [config],
  );

  useEffect(() => {
    const urls = [...new Set(tiles.map((t) => t.imageSrc || "/brand/work/summit-seek.jpg"))];
    urls.forEach((src) => {
      const img = new Image();
      img.decoding = "async";
      img.src = src;
    });
  }, [tiles]);

  useEffect(() => {
    const track = trackRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!track) return;

    const apply = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;

      const travel = Math.max(track.offsetHeight - window.innerHeight, 1);
      const raw = clamp(-track.getBoundingClientRect().top / travel, 0, 1);
      const touch = isOrbitTouch();

      track.classList.toggle("is-work-scrolling", raw > 0.02 && raw < 0.98);

      if (reduce) {
        wrap.style.transform = "translate3d(0, 0, 0) scale3d(1, 1, 1)";
        if (madeRef.current) madeRef.current.style.opacity = "1";
        return;
      }

      const scale = mosaicScale(raw, touch);
      wrap.style.transform = `translate3d(0, 0, 0) scale3d(${scale.toFixed(5)}, ${scale.toFixed(5)}, 1)`;

      if (madeRef.current) {
        const m = madeLabelProgress(raw);
        madeRef.current.style.opacity = m.toFixed(3);
        madeRef.current.style.transform = `translate3d(-50%, calc(-50% + ${((1 - m) * 12).toFixed(1)}px), 0)`;
      }
    };

    return bindOrbitScroll(track, apply, frameRef);
  }, []);

  return (
    <section ref={trackRef} className="orbit-work-track" aria-labelledby="what-we-do-heading">
      <div className="orbit-work-pin">
        <header className="orbit-work-head">
          <p className="orbit-work-badge">
            <span className="orbit-work-badge-num">{config.badgeNum}</span>
            {config.badgeLabel}
          </p>
          <MetamindsHeadline id="what-we-do-heading" text={config.headline} />
        </header>

        <div className="orbit-work-mosaic-main">
          <div ref={wrapRef} className="orbit-work-mosaic-wrap">
            <div className="orbit-work-mosaic">
              {tiles.map((tile, index) => (
                <WorkBlock key={tile.slot} tile={tile} priority={index < 3} />
              ))}
            </div>
            <p ref={madeRef} className="orbit-work-made">
              {config.madeLabel}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
