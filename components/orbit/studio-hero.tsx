"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { OrbitHeroTrustMarquee } from "@/components/orbit/hero-trust-marquee";
import type { HeroConfig } from "@/lib/hero-config";

type Props = {
  config: HeroConfig;
};

export function OrbitStudioHero({ config }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mediaReady, setMediaReady] = useState(false);

  const videoSrc = config.videoSrc || "/brand/hero-product.mp4";
  const showVideo = config.useVideo !== false;

  useEffect(() => {
    if (!showVideo) {
      setMediaReady(true);
      return;
    }
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "fetch";
    link.href = videoSrc;
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
    return () => {
      link.remove();
    };
  }, [showVideo, videoSrc]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    if (reduce || mobile) return;
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

  useEffect(() => {
    if (!showVideo) return;
    const video = videoRef.current;
    if (!video) return;

    video.loop = true;

    const markReady = () => setMediaReady(true);

    const play = () => {
      if (document.hidden) return;
      void video.play().catch(() => {});
    };

    const onEnded = () => {
      video.currentTime = 0;
      play();
    };

    video.addEventListener("ended", onEnded);
    video.addEventListener("loadeddata", markReady);
    video.addEventListener("canplay", markReady);
    video.addEventListener("loadeddata", play);
    document.addEventListener("visibilitychange", play);

    if (video.readyState >= 2) markReady();
    play();

    return () => {
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("loadeddata", markReady);
      video.removeEventListener("canplay", markReady);
      video.removeEventListener("loadeddata", play);
      document.removeEventListener("visibilitychange", play);
    };
  }, [showVideo, videoSrc]);

  return (
    <section
      ref={stageRef}
      className="orbit-studio-hero relative z-[2] isolate overflow-hidden bg-[#07070c] text-white"
      aria-labelledby="home-hero-heading"
    >
      <div
        ref={mediaRef}
        className={`orbit-studio-hero-media pointer-events-none absolute inset-0 z-0 origin-[82%_48%] will-change-transform ${
          mediaReady ? "is-ready" : ""
        }`}
        aria-hidden="true"
      >
        {showVideo ? (
          <video
            ref={videoRef}
            className="orbit-studio-hero-video h-full w-full object-cover object-[62%_center] sm:object-[68%_center] lg:object-[74%_center]"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            controls={false}
          >
            <source src={videoSrc} type={videoSrc.endsWith(".webm") ? "video/webm" : "video/mp4"} />
          </video>
        ) : null}
      </div>

      <div className="orbit-studio-hero-veil pointer-events-none absolute inset-0 z-[1]" />

      <div className="orbit-studio-hero-shell relative z-[2] mx-auto flex w-full max-w-[1680px]">
        <div className="orbit-studio-hero-copy w-full max-w-[min(44rem,48vw)] text-left max-md:max-w-full">
          <p className="orbit-hero-eyebrow">
            <span className="orbit-hero-eyebrow-dot" aria-hidden="true" />
            {config.eyebrow}
          </p>
          <h1 id="home-hero-heading" className="orbit-hero-headline">
            <span className="block">{config.headline}</span>
            {config.headlineSecond ? (
              <span className="orbit-hero-headline-accent block">{config.headlineSecond}</span>
            ) : null}
          </h1>
          <p className="orbit-hero-lede">{config.lede}</p>
          <div className="orbit-hero-cta">
            <Link href={config.primaryHref} className="orbit-hero-cta-btn">
              {config.primaryLabel}
            </Link>
          </div>
        </div>
      </div>

      <div className="orbit-hero-trust-bleed z-[3] w-full">
        <OrbitHeroTrustMarquee logos={config.trustLogos} label={config.trustMarqueeLabel} />
      </div>
    </section>
  );
}
