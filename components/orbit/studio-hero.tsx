"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { OrbitHeroTechMarquee } from "@/components/orbit/hero-tech-marquee";
import { bindOrbitAutoplay } from "@/lib/orbit/scroll-performance";
import type { HeroConfig } from "@/lib/hero-config";

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
    <section className="orbit-studio-hero relative z-[2] isolate overflow-hidden text-white" aria-labelledby="home-hero-heading">
      <div className="orbit-studio-hero-media pointer-events-none absolute inset-0 z-0" aria-hidden="true">
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
          <OrbitHeroTechMarquee />
        </div>
      </div>
    </section>
  );
}
