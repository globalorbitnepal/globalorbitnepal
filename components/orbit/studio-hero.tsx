"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { OrbitFlag } from "@/components/orbit/flags";
import { OrbitHeroTrustMarquee } from "@/components/orbit/hero-trust-marquee";
import type { HeroConfig } from "@/lib/hero-config";

const GLOBAL_STUDIOS = [
  { code: "np", label: "Nepal", city: "Kathmandu" },
  { code: "in", label: "India", city: "Delhi (NCR)" },
  { code: "us", label: "USA", city: "United States" },
] as const;

const GLOBAL_TAGLINE =
  "Work originates in Kathmandu, India, and the United States — not a single-city shop pretending to be global.";

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

      <div className="relative z-[2] mx-auto flex min-h-[100svh] w-full max-w-[1600px] flex-col justify-between px-5 pb-8 pt-[7.5rem] sm:px-6 sm:pt-[8.5rem] lg:px-10 lg:pb-10 lg:pt-[8.75rem]">
        <div className="flex flex-1 items-center">
          <div className="w-full max-w-[40rem] text-left">
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
          <p className="mt-10 max-w-[32rem] text-[13px] leading-[1.65] text-white/55">{GLOBAL_TAGLINE}</p>
          <ul className="mt-6 flex flex-wrap items-end gap-x-9 gap-y-4">
            {GLOBAL_STUDIOS.map((studio) => (
              <li key={studio.code} className="flex items-center gap-3">
                <OrbitFlag code={studio.code} name={studio.label} hd variant="hero" />
                <span className="flex flex-col pb-0.5">
                  <span className="text-[14px] font-semibold leading-tight text-white/90">{studio.label}</span>
                  <span className="text-[11px] text-white/42">{studio.city}</span>
                </span>
              </li>
            ))}
          </ul>
          </div>
        </div>
        <div className="mt-8 w-full max-w-[min(100%,42rem)] shrink-0 lg:mt-4">
          <OrbitHeroTrustMarquee logos={config.trustLogos} label={config.trustMarqueeLabel} />
        </div>
      </div>
    </section>
  );
}
