"use client";

import Image from "next/image";
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
        const progress = Math.min(1, Math.max(0, -rect.top / Math.max(rect.height * 0.7, 1)));
        media.style.transform = `scale(${1 + progress * 0.12})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const ships = config.shipsOn.split(/[·|,]/).map((item) => item.trim()).filter(Boolean);
  const videoOn = config.useVideo && Boolean(config.videoSrc);

  return (
    <section
      ref={stageRef}
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#07070b] text-white"
      aria-labelledby="home-hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_80%_40%,rgba(80,90,140,0.18),transparent_55%)]" />

      <div className="relative mx-auto grid min-h-[100svh] w-full max-w-[1440px] items-center gap-8 px-5 pb-12 pt-[6.75rem] sm:px-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-6 lg:px-10 lg:pt-[7rem] xl:px-12">
        <div className="relative z-[2] max-w-[38rem]">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.07] px-3 py-1 text-[11px] font-semibold text-white/85 backdrop-blur-xl">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f0c43a]" />
            {config.eyebrow}
          </p>
          <h1
            id="home-hero-heading"
            className="mt-6 font-[family-name:var(--font-jakarta)] text-[clamp(2.1rem,1.4rem+3.6vw,4.5rem)] font-semibold leading-[1.06] tracking-[-0.048em]"
          >
            {config.headline}
            {config.headlineSecond ? <span className="mt-1 block">{config.headlineSecond}</span> : null}
          </h1>
          <p className="mt-5 max-w-[34rem] text-[clamp(0.95rem,0.85rem+0.4vw,1.05rem)] leading-[1.75] text-white/70">
            {config.lede}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={config.primaryHref}
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-[14px] font-semibold text-[#111] hover:bg-white/92"
            >
              {config.primaryLabel}
            </Link>
            <Link
              href={config.secondaryHref}
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/16 bg-white/[0.06] px-7 text-[14px] font-semibold text-white backdrop-blur-xl hover:bg-white/10"
            >
              {config.secondaryLabel}
            </Link>
          </div>
          {ships.length ? (
            <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-medium text-white/60">
              {ships.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="relative h-[min(52vw,420px)] w-full min-h-[240px] lg:h-[min(78svh,760px)] lg:min-h-[420px]">
          <div ref={mediaRef} className="absolute inset-0 origin-center will-change-transform">
            {videoOn ? (
              <video
                className="h-full w-full object-contain object-center lg:object-right"
                autoPlay
                muted
                loop
                playsInline
                disablePictureInPicture
                controls={false}
                poster={config.imageSrc}
                aria-hidden="true"
              >
                <source src={config.videoSrc} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={config.imageSrc}
                alt=""
                fill
                priority
                unoptimized
                sizes="(max-width: 1023px) 100vw, 54vw"
                className="object-contain object-center drop-shadow-[0_30px_80px_rgba(0,0,0,0.45)] lg:object-right"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
