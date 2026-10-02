"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import type { ProjectShowcase } from "@/lib/projects-config";
import { bindOrbitScroll, isOrbitTouch } from "@/lib/orbit/scroll-performance";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function easeOut(t: number) {
  return 1 - (1 - t) ** 3;
}

function easeIn(t: number) {
  return t ** 3;
}

type ZoomHeader = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  lede: string;
};

type Props = {
  showcases: ProjectShowcase[];
  header: ZoomHeader;
};

export function ProjectsZoomShowcase({ showcases, header }: Props) {
  const trackRef = useRef<HTMLElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const metaRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shotRefs = useRef<(HTMLImageElement | null)[]>([]);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const frameRef = useRef(0);
  const count = showcases.length;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const apply = () => {
      const track = trackRef.current;
      if (!track) return;
      const touch = isOrbitTouch();

      const travel = Math.max(track.offsetHeight - window.innerHeight, 1);
      const raw = clamp(-track.getBoundingClientRect().top / travel, 0, 1);
      const global = raw * count;

      showcases.forEach((_, index) => {
        const slide = slideRefs.current[index];
        const meta = metaRefs.current[index];
        const shot = shotRefs.current[index];
        const dot = dotRefs.current[index];
        const t = global - index;

        if (reduce) {
          const active = index === 0;
          if (slide) {
            slide.style.opacity = active ? "1" : "0";
            slide.style.transform = "translate3d(0, 0, 0) rotateX(0deg) scale3d(1, 1, 1)";
            slide.style.zIndex = active ? "3" : "1";
          }
          if (meta) meta.style.opacity = active ? "1" : "0";
          if (shot) shot.style.transform = "scale(1)";
          if (dot) dot.classList.toggle("is-active", active);
          return;
        }

        let opacity = 0;
        let scale = 0.62;
        let rotX = 26;
        let tz = -480;
        let zIndex = 1;
        let shotScale = 1.08;

        if (t < -0.2) {
          opacity = 0;
          scale = 0.58;
          rotX = 28;
          tz = -520;
          shotScale = 1.12;
        } else if (t < 0.34) {
          const p = easeOut((t + 0.2) / 0.54);
          opacity = p;
          scale = 0.58 + p * 0.42;
          rotX = 28 * (1 - p);
          tz = -520 + p * 520;
          zIndex = 2 + index;
          shotScale = 1.14 - p * 0.1;
        } else if (t < 0.66) {
          opacity = 1;
          scale = 1;
          rotX = 0;
          tz = 0;
          zIndex = 10 + index;
          shotScale = 1.04;
        } else if (t < 1.2) {
          const p = easeIn((t - 0.66) / 0.54);
          opacity = 1 - p * 0.92;
          scale = 1 + p * 0.28;
          rotX = -20 * p;
          tz = -360 * p;
          zIndex = 8 - index;
          shotScale = 1.04 + p * 0.14;
        } else {
          opacity = 0;
          scale = 1.26;
          rotX = -20;
          tz = -360;
          shotScale = 1.18;
        }

        if (slide) {
          const ty =
            t > 0.66
              ? easeIn(clamp((t - 0.66) / 0.54, 0, 1)) * (touch ? -14 : -28)
              : t < 0.34
                ? (1 - easeOut((t + 0.2) / 0.54)) * (touch ? 18 : 36)
                : 0;
          const rx = touch ? 0 : rotX;
          const z = touch ? 0 : tz;
          slide.style.opacity = String(opacity);
          slide.style.transform = `translate3d(0, ${ty}px, ${z}px) rotateX(${rx}deg) scale3d(${scale}, ${scale}, 1)`;
          slide.style.zIndex = String(zIndex);
          slide.style.pointerEvents = opacity > 0.35 ? "auto" : "none";
        }

        if (shot) {
          shot.style.transform = `scale(${shotScale})`;
        }

        if (meta) {
          let metaIn = 0;
          if (t >= 0.28 && t <= 0.72) metaIn = 1;
          else if (t < 0.28) metaIn = easeOut(clamp((t + 0.05) / 0.33, 0, 1));
          else metaIn = 1 - easeIn(clamp((t - 0.72) / 0.35, 0, 1));
          meta.style.opacity = String(clamp(metaIn, 0, 1));
          meta.style.transform = `translate3d(0, ${(1 - clamp(metaIn, 0, 1)) * 20}px, 0)`;
        }

        if (dot) {
          dot.classList.toggle("is-active", t >= 0.25 && t <= 0.75);
        }
      });
    };

    return bindOrbitScroll(trackRef.current, apply, frameRef);
  }, [count, showcases]);

  return (
    <section
      ref={trackRef}
      className="orbit-projects-zoom-track orbit-made-track"
      aria-labelledby="projects-zoom-heading"
      style={{ "--made-slides": count } as CSSProperties}
    >
      <div className="orbit-made-pin">
        <header className="orbit-made-head">
          <p className="orbit-work-badge mx-auto">
            <span className="orbit-work-badge-num">{String(count).padStart(2, "0")}</span>
            {header.eyebrow}
          </p>
          <h2 id="projects-zoom-heading" className="orbit-made-title">
            {header.title} <span>{header.titleAccent}</span>
          </h2>
          <p className="orbit-projects-zoom-lede mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed text-white/55 sm:text-base">
            {header.lede}
          </p>
        </header>

        <div className="orbit-made-stage orbit-projects-stage">
          {showcases.map((item, index) => (
            <div
              key={item.slug}
              ref={(node) => {
                slideRefs.current[index] = node;
              }}
              className="orbit-made-slide orbit-projects-slide"
            >
              <div className="orbit-made-frame orbit-projects-frame">
                <div className="orbit-projects-chrome" aria-hidden="true">
                  <span className="orbit-projects-chrome-dots">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="orbit-projects-chrome-url">{item.chromeUrl}</span>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={(node) => {
                    shotRefs.current[index] = node;
                  }}
                  src={item.imageSrc}
                  alt={`${item.title} — website preview`}
                  className="orbit-made-shot orbit-projects-shot"
                  loading={index < 2 ? "eager" : "lazy"}
                />
              </div>
              <div
                ref={(node) => {
                  metaRefs.current[index] = node;
                }}
                className="orbit-made-meta orbit-projects-meta"
              >
                <p className="orbit-made-sector">{item.category}</p>
                <p className="orbit-made-name">{item.title}</p>
                <p className="orbit-projects-sub">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="orbit-made-foot">
          <div className="orbit-made-dots" aria-hidden="true">
            {showcases.map((item, index) => (
              <span
                key={item.slug}
                ref={(node) => {
                  dotRefs.current[index] = node;
                }}
                className="orbit-made-dot"
              />
            ))}
          </div>
          <p className="orbit-projects-scroll-hint text-xs uppercase tracking-[0.22em] text-white/35">
            Scroll to zoom · {count} launches
          </p>
        </div>
      </div>
    </section>
  );
}
