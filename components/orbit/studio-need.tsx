"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { OrbitCodeBackdrop } from "@/components/orbit/code-backdrop";
import { bindOrbitAutoplay, bindOrbitScroll } from "@/lib/orbit/scroll-performance";
import type { NeedConfig } from "@/lib/need-config";
import { DEFAULT_NEED } from "@/lib/need-config";

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function OrbitStudioNeed({ config }: { config: NeedConfig }) {
  const trackRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const videoBoxRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef(0);
  const [statIndex, setStatIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);

  const go = useCallback((delta: number) => {
    setStatIndex((current) => (current + delta + config.stats.length) % config.stats.length);
    setSlideIndex((current) => (current + delta + config.slides.length) % config.slides.length);
  }, [config.stats.length, config.slides.length]);

  const videoSrc = config.videoSrc || DEFAULT_NEED.videoSrc;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.loop = true;
    const play = () => {
      if (document.hidden) return;
      void video.play().catch(() => {});
    };
    video.addEventListener("loadeddata", play);
    document.addEventListener("visibilitychange", play);
    const stopAutoplay = bindOrbitAutoplay(video);
    play();
    return () => {
      video.removeEventListener("loadeddata", play);
      document.removeEventListener("visibilitychange", play);
      stopAutoplay();
    };
  }, [videoSrc]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const apply = () => {
      const track = trackRef.current;
      const pin = pinRef.current;
      const slot = slotRef.current;
      const box = videoBoxRef.current;
      const copy = copyRef.current;
      if (!track || !pin || !slot || !box) return;

      const pinRect = pin.getBoundingClientRect();
      const slotRect = slot.getBoundingClientRect();
      const startW = Math.max(slotRect.width, 48);
      const startH = Math.max(slotRect.height, 32);
      const startX = slotRect.left - pinRect.left;
      const startY = slotRect.top - pinRect.top;
      const endW = pinRect.width * 0.93;
      const endH = pinRect.height * 0.86;
      const endX = pinRect.width * 0.035;
      const endY = pinRect.height * 0.05;
      const startR = startH / 2;
      const endR = Math.min(pinRect.width, pinRect.height) * 0.045;

      box.style.width = `${startW}px`;
      box.style.height = `${startH}px`;
      box.style.left = "0px";
      box.style.top = "0px";
      box.style.transformOrigin = "top left";

      if (reduce) {
        const sx = endW / startW;
        const sy = endH / startH;
        box.style.transform = `translate3d(${endX}px, ${endY}px, 0) scale(${sx}, ${sy})`;
        box.style.borderRadius = `${endR / ((sx + sy) / 2)}px`;
        if (copy) copy.style.opacity = "1";
        box.classList.add("is-ready");
        return;
      }

      const trackRect = track.getBoundingClientRect();
      const travel = Math.max(trackRect.height - pinRect.height, 1);
      const raw = clamp(-trackRect.top / travel);
      const zoomProgress = clamp(raw / 0.68);
      const eased = 1 - (1 - zoomProgress) ** 1.45;
      const w = lerp(startW, endW, eased);
      const h = lerp(startH, endH, eased);
      const x = lerp(startX, endX, eased);
      const y = lerp(startY, endY, eased);
      const r = lerp(startR, endR, eased);
      const sx = w / startW;
      const sy = h / startH;
      box.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${sx}, ${sy})`;
      box.style.borderRadius = `${r / Math.max((sx + sy) / 2, 0.01)}px`;

      if (copy) {
        const fade = clamp((raw - 0.06) / 0.32);
        copy.style.opacity = String(1 - fade);
        copy.style.pointerEvents = fade > 0.55 ? "none" : "auto";
      }
      box.classList.add("is-ready");
    };

    return bindOrbitScroll(trackRef.current, apply, frameRef);
  }, []);

  const stat = config.stats[statIndex] ?? config.stats[0];
  const slide = config.slides[slideIndex] ?? config.slides[0];

  return (
    <section
      ref={trackRef}
      className="orbit-need-track relative z-[1] bg-[#050508] text-white"
      aria-labelledby="need-heading"
    >
      <div ref={pinRef} className="orbit-need-pin sticky top-0 isolate overflow-hidden">
        <OrbitCodeBackdrop />
        <div ref={copyRef} className="orbit-need-copy relative z-[2] mx-auto flex h-full w-full max-w-[1680px] items-start">
          <div className="orbit-need-grid w-full">
            <div className="orbit-need-left">
              <h2 id="need-heading" className="orbit-need-kicker">
                {config.kicker}
              </h2>
              <p className="orbit-need-stat" aria-live="polite">
                {stat.value}
              </p>
              <p className="orbit-need-caption">{stat.caption}</p>
              <div className="orbit-need-arrows">
                <button type="button" className="orbit-need-arrow" aria-label="Previous statistic" onClick={() => go(-1)}>
                  ‹
                </button>
                <button type="button" className="orbit-need-arrow is-next" aria-label="Next statistic" onClick={() => go(1)}>
                  ›
                </button>
              </div>
            </div>

            <div className="orbit-need-right">
              <p className="orbit-need-badge">
                <span className="orbit-need-badge-num">{slide.index}</span>
                {slide.tag}
              </p>
              <p className="orbit-need-headline">
                {slide.title} <span className="orbit-need-headline-accent">{slide.accent}</span>
              </p>
              <div className="orbit-need-cta">
                <div ref={slotRef} className="orbit-need-slot" aria-hidden="true" />
                <Link href={slide.href} className="orbit-need-know">
                  {config.knowMoreLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div ref={videoBoxRef} className="orbit-need-video">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            controls={false}
            aria-label="Product reel"
          >
            <source src={videoSrc} type={videoSrc.endsWith(".webm") ? "video/webm" : "video/mp4"} />
          </video>
        </div>
      </div>
    </section>
  );
}
