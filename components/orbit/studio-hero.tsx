"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { OrbitFlag } from "@/components/orbit/flags";
import { OrbitHeroTrustMarquee } from "@/components/orbit/hero-trust-marquee";
import type { HeroConfig } from "@/lib/hero-config";

type Props = {
  config: HeroConfig;
};

export function OrbitStudioHero({ config }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.loop = true;

    const play = () => {
      if (document.hidden) return;
      void video.play().catch(() => {});
    };

    const onEnded = () => {
      video.currentTime = 0;
      play();
    };

    video.addEventListener("ended", onEnded);
    video.addEventListener("loadeddata", play);
    document.addEventListener("visibilitychange", play);

    play();

    return () => {
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("loadeddata", play);
      document.removeEventListener("visibilitychange", play);
    };
  }, [videoSrc]);

  return (
    <section
      ref={stageRef}
      className="relative isolate min-h-[100svh] min-h-[100dvh] overflow-x-clip bg-[#07070c] text-white"
      aria-labelledby="home-hero-heading"
    >
      <div
        ref={mediaRef}
        className="pointer-events-none absolute inset-0 z-0 origin-[82%_48%] will-change-transform"
        aria-hidden="true"
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover object-[62%_center] sm:object-[68%_center] lg:object-[74%_center]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={config.imageSrc}
          disablePictureInPicture
          controls={false}
        >
          <source src={videoSrc} type={videoSrc.endsWith(".webm") ? "video/webm" : "video/mp4"} />
        </video>
      </div>

      <div className="orbit-studio-hero-veil pointer-events-none absolute inset-0 z-[1]" />

      <div className="orbit-studio-hero-shell relative z-[2] mx-auto flex min-h-[100svh] min-h-[100dvh] w-full max-w-[1600px] flex-col px-5 pb-6 pt-[7.25rem] sm:px-6 sm:pb-6 sm:pt-[7.75rem] md:px-8 lg:px-10 lg:pb-8 lg:pt-[8.25rem]">
        <div className="orbit-studio-hero-copy w-full max-w-[40rem] shrink-0 text-left">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-3 py-1 text-[11px] font-medium text-white/85 backdrop-blur-md">
            {config.eyebrow}
          </p>
          <h1
            id="home-hero-heading"
            className="orbit-hero-headline mt-5 font-[family-name:var(--font-jakarta)] text-[clamp(2rem,1.1rem+3.8vw,4.75rem)] font-semibold leading-[1.05] tracking-[-0.05em] sm:mt-6"
          >
            {config.headline}
            {config.headlineSecond ? <span className="block">{config.headlineSecond}</span> : null}
          </h1>
          <p className="orbit-hero-lede mt-4 max-w-[32rem] text-[clamp(0.92rem,0.84rem+0.32vw,1.125rem)] leading-[1.65] text-white/68 sm:mt-5 sm:leading-[1.7]">
            {config.lede}
          </p>
          <div className="orbit-hero-cta mt-6 sm:mt-8">
            <Link
              href={config.primaryHref}
              className="inline-flex h-11 items-center justify-center rounded-full bg-[#1a1a22] px-7 text-[14px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] ring-1 ring-white/10 hover:bg-[#22222c] sm:h-12 sm:px-8"
            >
              {config.primaryLabel}
            </Link>
          </div>
        </div>

        <div className="orbit-studio-hero-foot w-full max-w-[min(100%,42rem)] shrink-0 lg:max-w-[40rem]">
          <p className="orbit-hero-tagline max-w-[32rem] text-[12px] leading-[1.6] text-white/55 sm:text-[13px] sm:leading-[1.65]">
            {config.globalTagline}
          </p>
          <ul className="mt-3 flex flex-wrap items-end gap-x-6 gap-y-3 sm:mt-4 sm:gap-x-9 sm:gap-y-4">
            {config.studios.map((studio) => (
              <li key={studio.code} className="flex items-center gap-2.5 sm:gap-3">
                <OrbitFlag code={studio.code} name={studio.label} hd variant="hero" />
                <span className="flex flex-col pb-0.5">
                  <span className="text-[13px] font-semibold leading-tight text-white/90 sm:text-[14px]">{studio.label}</span>
                  <span className="text-[10px] text-white/42 sm:text-[11px]">{studio.city}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 sm:mt-5">
            <OrbitHeroTrustMarquee logos={config.trustLogos} label={config.trustMarqueeLabel} />
          </div>
        </div>
      </div>
    </section>
  );
}
