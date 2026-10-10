"use client";

import { useEffect, useRef } from "react";
import { bindOrbitAutoplay } from "@/lib/orbit/scroll-performance";
import type { HeroConfig } from "@/lib/hero-config";

type Props = {
  config: HeroConfig;
};

/** Client-only hero background video; copy and H1 are server-rendered in `studio-hero-copy.tsx`. */
export function OrbitStudioHeroVideo({ config }: Props) {
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

  if (!showVideo) return null;

  return (
    <div className="orbit-studio-hero-media" aria-hidden="true">
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
    </div>
  );
}
