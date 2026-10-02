"use client";

import { useEffect, useRef } from "react";

function videoMime(src: string) {
  if (src.endsWith(".webm")) return "video/webm";
  return "video/mp4";
}

export function CustomAppsHeroVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.loop = true;
    const play = () => {
      if (!document.hidden) void video.play().catch(() => {});
    };
    video.addEventListener("loadeddata", play);
    document.addEventListener("visibilitychange", play);
    play();
    return () => {
      video.removeEventListener("loadeddata", play);
      document.removeEventListener("visibilitychange", play);
    };
  }, [src]);

  return (
    <div className="orbit-custom-apps-hero-video" aria-hidden="true">
      <div className="orbit-custom-apps-hero-video-glow" />
      <div className="orbit-custom-apps-hero-device">
        <video
          ref={ref}
          className="orbit-custom-apps-hero-video-el"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
        >
          <source src={src} type={videoMime(src)} />
        </video>
      </div>
    </div>
  );
}
