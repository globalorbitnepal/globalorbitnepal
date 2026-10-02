"use client";

import { useEffect, useRef } from "react";
import type { PlatformPageSlug } from "@/lib/platform-page-slugs";

function videoMime(src: string) {
  if (src.endsWith(".webm")) return "video/webm";
  return "video/mp4";
}

export function CustomAppsHeroVideo({ src, platform }: { src: string; platform: PlatformPageSlug }) {
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

  if (platform === "web-apps") {
    return (
      <div className="orbit-custom-apps-hero-video orbit-platform-hero is-web" aria-hidden="true">
        <div className="orbit-custom-apps-hero-video-glow" />
        <div className="orbit-platform-browser">
          <div className="orbit-platform-browser-chrome">
            <span className="orbit-projects-chrome-dots">
              <i />
              <i />
              <i />
            </span>
            <span className="orbit-platform-browser-url">app.yourbrand.com</span>
          </div>
          <video
            ref={ref}
            className="orbit-platform-browser-video"
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

  return (
    <div
      className={`orbit-custom-apps-hero-video orbit-platform-hero ${platform === "android-apps" ? "is-android" : "is-ios"}`}
      aria-hidden="true"
    >
      <div className="orbit-custom-apps-hero-video-glow" />
      <div className={`orbit-custom-apps-hero-device ${platform === "ios-apps" ? "is-ios-device" : "is-android-device"}`}>
        {platform === "ios-apps" ? <span className="orbit-platform-dynamic-island" aria-hidden="true" /> : null}
        {platform === "android-apps" ? (
          <span className="orbit-platform-android-punch" aria-hidden="true" />
        ) : null}
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
