"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { bindOrbitAutoplay } from "@/lib/orbit/scroll-performance";
import type { HeroConfig } from "@/lib/hero-config";

const HERO_FEATURES = [
  {
    title: "Web Development",
    hint: "Business Websites & Web Apps",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="M3 9h18" fill="none" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    ),
  },
  {
    title: "Custom Software",
    hint: "Tailored Solutions",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 8 4 12l4 4M16 8l4 4-4 4M13 6l-2 12" fill="none" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    ),
  },
  {
    title: "SaaS Development",
    hint: "Scalable Platforms",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M7 16a4.5 4.5 0 1 1 1.2-8.8A6 6 0 0 1 20 11.5 3.5 3.5 0 0 1 18 18H7Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
        />
      </svg>
    ),
  },
  {
    title: "SEO & Digital Marketing",
    hint: "More Visibility, More Growth",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 17V9M10 17V6M15 17v-7M20 17V4" fill="none" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    ),
  },
] as const;

type Props = {
  config: HeroConfig;
};

export function OrbitStudioHero({ config }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc = config.videoSrc || "/brand/hero-product.mp4";
  const showVideo = config.useVideo !== false;

  useEffect(() => {
    if (!showVideo) return;
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
    video.addEventListener("canplay", play);
    document.addEventListener("visibilitychange", play);
    const stopAutoplay = bindOrbitAutoplay(video);
    play();
    return () => {
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("canplay", play);
      document.removeEventListener("visibilitychange", play);
      stopAutoplay();
    };
  }, [showVideo, videoSrc]);

  return (
    <section className="orbit-studio-hero" aria-labelledby="home-hero-heading">
      <div className="orbit-studio-hero-media" aria-hidden="true">
        {showVideo ? (
          <video
            ref={videoRef}
            className="orbit-studio-hero-video"
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
      <div className="orbit-studio-hero-veil" aria-hidden="true" />

      <div className="orbit-studio-hero-shell">
        <div className="orbit-studio-hero-copy">
          <p className="orbit-hero-eyebrow">
            <span className="orbit-hero-eyebrow-line" aria-hidden="true" />
            {config.eyebrow}
          </p>
          <h1 id="home-hero-heading" className="orbit-hero-headline">
            <span className="block">{config.headline}</span>
            {config.headlineSecond ? <span className="orbit-hero-headline-accent">{config.headlineSecond}</span> : null}
          </h1>
          <p className="orbit-hero-lede">{config.lede}</p>
          <div className="orbit-hero-cta">
            <Link href={config.primaryHref} className="orbit-hero-cta-btn">
              {config.primaryLabel}
            </Link>
            <Link href={config.secondaryHref} className="orbit-hero-cta-ghost">
              <span className="orbit-hero-play" aria-hidden="true">
                ▶
              </span>
              {config.secondaryLabel}
            </Link>
          </div>
          <a href="#need-heading" className="orbit-hero-scroll">
            <span className="orbit-hero-scroll-mouse" aria-hidden="true" />
            Scroll Down
          </a>
        </div>

        <ul className="orbit-hero-features">
          {HERO_FEATURES.map((item) => (
            <li key={item.title}>
              <span className="orbit-hero-feature-icon">{item.icon}</span>
              <span>
                <strong>{item.title}</strong>
                <small>{item.hint}</small>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
