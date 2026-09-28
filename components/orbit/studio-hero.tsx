"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export function OrbitStudioHero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const stage = stageRef.current;
        const product = productRef.current;
        if (!stage || !product) return;
        const rect = stage.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, -rect.top / Math.max(rect.height * 0.55, 1)));
        const scale = 1 + progress * 0.28;
        const shift = progress * 6;
        product.style.transform = `translate3d(${shift}%, ${progress * 4}%, 0) scale(${scale})`;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={stageRef}
      className="orbit-studio-hero relative isolate min-h-[100svh] overflow-hidden bg-[#07070b] text-white"
      aria-labelledby="home-hero-heading"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-45"
        autoPlay
        muted
        loop
        playsInline
        poster="/brand/studio-hero-phones.jpg"
        aria-hidden="true"
      >
        <source src="/brand/hero-developer.mp4" type="video/mp4" />
      </video>
      <div className="orbit-studio-hero-veil pointer-events-none absolute inset-0" />

      <div
        ref={productRef}
        className="pointer-events-none absolute inset-y-0 right-[-8%] hidden w-[62%] origin-center md:block lg:w-[58%] xl:right-[-4%]"
        aria-hidden="true"
      >
        <Image
          src="/brand/studio-hero-phones.jpg"
          alt=""
          fill
          priority
          unoptimized
          sizes="60vw"
          className="object-contain object-right drop-shadow-[0_40px_80px_rgba(0,0,0,0.55)]"
        />
      </div>

      <div className="relative z-[1] mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col justify-center px-5 pb-16 pt-[6.5rem] sm:px-8 lg:px-12 lg:pt-[7.25rem]">
        <div className="max-w-[38rem]">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[11px] font-semibold tracking-[0.02em] text-white/85 backdrop-blur-xl">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f0c43a]" />
            Web developer · App developer · SEO
          </p>
          <h1
            id="home-hero-heading"
            className="mt-6 font-[family-name:var(--font-jakarta)] text-[clamp(2.35rem,6.4vw,4.65rem)] font-semibold leading-[1.05] tracking-[-0.045em]"
          >
            Precise approach
            <span className="block">to your product.</span>
          </h1>
          <p className="mt-5 max-w-[32rem] text-[15px] leading-7 text-white/72 sm:text-[16px] sm:leading-8">
            We take original ideas to high-quality websites, custom apps, ERP, and SEO programmes — built to
            convert, rank, and scale from Nepal to the world.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-[14px] font-semibold text-[#0b0b10] transition-transform hover:scale-[1.02]"
            >
              Start a project
            </Link>
            <Link
              href="/projects"
              className="orbit-studio-glass inline-flex h-12 items-center justify-center rounded-full px-7 text-[14px] font-semibold text-white"
            >
              Know more
            </Link>
          </div>
          <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
            Ship on
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-[13px] font-medium text-white/75">
            <li>Web</li>
            <li>Play Store</li>
            <li>App Store</li>
            <li>Google Search</li>
          </ul>
        </div>

        <div className="relative mt-10 h-[42vw] min-h-[220px] w-full max-w-lg md:hidden" aria-hidden="true">
          <Image
            src="/brand/studio-hero-phones.jpg"
            alt=""
            fill
            unoptimized
            sizes="90vw"
            className="object-contain object-right"
          />
        </div>
      </div>
    </section>
  );
}
