"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { NEED_SLIDES, NEED_STATS, NEED_VIDEO_SRC } from "@/lib/need-section";

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function OrbitStudioNeed() {
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
    setStatIndex((current) => (current + delta + NEED_STATS.length) % NEED_STATS.length);
    setSlideIndex((current) => (current + delta + NEED_SLIDES.length) % NEED_SLIDES.length);
  }, []);

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
    play();
    return () => {
      video.removeEventListener("loadeddata", play);
      document.removeEventListener("visibilitychange", play);
    };
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const apply = () => {
      const track = trackRef.current;
      const pin = pinRef.current;
      const slot = slotRef.current;
      const box = videoBoxRef.current;
      const copy = copyRef.current;
      if (!track || !pin || !slot || !box) return;

      if (reduce) {
        box.style.left = "4%";
        box.style.top = "8%";
        box.style.width = "92%";
        box.style.height = "82%";
        box.style.borderRadius = "2.4rem";
        if (copy) copy.style.opacity = "1";
        box.classList.add("is-ready");
        return;
      }

      const trackRect = track.getBoundingClientRect();
      const pinRect = pin.getBoundingClientRect();
      const slotRect = slot.getBoundingClientRect();
      const travel = Math.max(trackRect.height - pinRect.height, 1);
      const raw = clamp(-trackRect.top / travel);
      const eased = 1 - (1 - raw) ** 1.55;

      const start = {
        left: slotRect.left - pinRect.left,
        top: slotRect.top - pinRect.top,
        width: slotRect.width,
        height: slotRect.height,
        radius: slotRect.height / 2,
      };
      const end = {
        left: pinRect.width * 0.035,
        top: pinRect.height * 0.07,
        width: pinRect.width * 0.93,
        height: pinRect.height * 0.84,
        radius: Math.min(pinRect.width, pinRect.height) * 0.045,
      };

      box.style.left = `${lerp(start.left, end.left, eased)}px`;
      box.style.top = `${lerp(start.top, end.top, eased)}px`;
      box.style.width = `${lerp(start.width, end.width, eased)}px`;
      box.style.height = `${lerp(start.height, end.height, eased)}px`;
      box.style.borderRadius = `${lerp(start.radius, end.radius, eased)}px`;

      if (copy) {
        const fade = clamp((raw - 0.06) / 0.32);
        copy.style.opacity = String(1 - fade);
        copy.style.pointerEvents = fade > 0.55 ? "none" : "auto";
      }
      box.classList.add("is-ready");
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

  const stat = NEED_STATS[statIndex];
  const slide = NEED_SLIDES[slideIndex];

  return (
    <section
      ref={trackRef}
      className="orbit-need-track relative bg-[#050508] text-white"
      aria-labelledby="need-heading"
    >
      <div ref={pinRef} className="orbit-need-pin sticky top-0 isolate overflow-hidden">
        <div ref={copyRef} className="orbit-need-copy relative z-[2] mx-auto flex h-full w-full max-w-[1280px] items-center">
          <div className="orbit-need-grid w-full">
            <div className="orbit-need-left">
              <h2 id="need-heading" className="orbit-need-kicker">
                Why you need us!
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
                  Know More
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
            <source src={NEED_VIDEO_SRC} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
