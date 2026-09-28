"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { HeroConfig } from "@/lib/hero-config";

type Props = {
  config: HeroConfig;
};

export function OrbitStudioHero({ config }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const stage = stageRef.current;
        const media = mediaRef.current;
        if (!stage || !media) return;
        const rect = stage.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, -rect.top / Math.max(rect.height * 0.85, 1)));
        media.style.transform = `translate3d(${progress * 4}%, ${progress * 2}%, 0) scale(${1 + progress * 0.22})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const videoSrc = config.videoSrc || "/brand/hero-product.mp4";

  return (
    <section
      ref={stageRef}
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#07070c] text-white"
      aria-labelledby="home-hero-heading"
    >
      <div
        ref={mediaRef}
        className="pointer-events-none absolute inset-0 z-0 origin-[82%_48%] will-change-transform"
        aria-hidden="true"
      >
        <video
          className="h-full w-full object-cover object-[62%_center] sm:object-[68%_center] lg:object-[74%_center]"
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          controls={false}
        >
          <source src={videoSrc} type={videoSrc.endsWith(".webm") ? "video/webm" : "video/mp4"} />
        </video>
      </div>

      <div className="orbit-studio-hero-veil pointer-events-none absolute inset-0 z-[1]" />

      <div className="relative z-[2] mx-auto flex min-h-[100svh] w-full max-w-[1600px] items-center justify-center px-5 pb-16 pt-[7.5rem] sm:px-6 sm:pt-[8.5rem] lg:pt-[8.75rem]">
        <div className="w-full max-w-[min(40rem,92vw)] text-center lg:max-w-[40rem] lg:text-left">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-3 py-1 text-[11px] font-medium text-white/85 backdrop-blur-md">
            {config.eyebrow}
          </p>
          <h1
            id="home-hero-heading"
            className="mt-6 font-[family-name:var(--font-jakarta)] text-[clamp(2.35rem,1.2rem+4.2vw,4.75rem)] font-semibold leading-[1.05] tracking-[-0.05em]"
          >
            {config.headline}
            {config.headlineSecond ? <span className="block">{config.headlineSecond}</span> : null}
          </h1>
          <p className="mt-5 max-w-[32rem] text-[clamp(0.95rem,0.84rem+0.35vw,1.125rem)] leading-[1.7] text-white/68">
            {config.lede}
          </p>
          <div className="mt-8">
            <Link
              href={config.primaryHref}
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#1a1a22] px-8 text-[14px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] ring-1 ring-white/10 hover:bg-[#22222c]"
            >
              {config.primaryLabel}
            </Link>
          </div>
          <p className="mt-10 text-[12px] font-medium text-white/45">List your app on</p>
          <ul className="mt-3 flex flex-wrap items-center gap-7 text-[13px] font-medium text-white/80">
            <li className="inline-flex items-center gap-2">
              <span aria-hidden="true">▶</span> Play store
            </li>
            <li className="inline-flex items-center gap-2">
              <span aria-hidden="true">
                <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor">
                  <path d="M11.2 8.4c0-1.9 1.6-2.8 1.6-2.9-0.9-1.3-2.3-1.5-2.8-1.5-1.2-0.1-2.3.7-2.9.7-0.6 0-1.6-.7-2.6-.7-1.3 0-2.6.8-3.3 2-1.4 2.4-0.4 6 1 8 0.7 1 1.5 2 2.6 2 1 0 1.4-.7 2.7-.7s1.6.7 2.7.7c1.1 0 1.8-1 2.5-1.9 0.8-1.1 1.1-2.2 1.1-2.2s-2.2-.9-2.2-3.5zM9.3 2.9c.6-.7 1-1.7.9-2.7-0.9.1-1.9.6-2.5 1.3-0.6.6-1.1 1.6-1 2.6 1 .1 1.9-.5 2.6-1.2z" />
                </svg>
              </span>
              App store
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
