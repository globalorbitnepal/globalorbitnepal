"use client";

import { useEffect } from "react";

function setAppViewportUnit() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--app-vh", `${vh}px`);
}

export function MobileAppExperience() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("orbit-app-mode");
    const touch =
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(max-width: 767px)").matches;

    if (touch) {
      root.classList.add("orbit-touch", "orbit-mobile-lite");
    }

    setAppViewportUnit();
    window.addEventListener("resize", setAppViewportUnit, { passive: true });
    window.addEventListener("orientationchange", setAppViewportUnit, { passive: true });

    const videos = Array.from(document.querySelectorAll("video"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const visibilityObserver =
      videos.length > 0
        ? new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                const video = entry.target as HTMLVideoElement;
                if (entry.isIntersecting && entry.intersectionRatio > 0.12) {
                  if (!document.hidden) void video.play().catch(() => {});
                } else {
                  video.pause();
                }
              }
            },
            { threshold: [0, 0.12, 0.35] },
          )
        : null;

    for (const video of videos) {
      video.playsInline = true;
      video.muted = true;
      visibilityObserver?.observe(video);
    }

    const onVisibility = () => {
      if (document.hidden) {
        for (const video of videos) video.pause();
        return;
      }
      for (const video of videos) {
        const rect = video.getBoundingClientRect();
        const visible = rect.bottom > 0 && rect.top < window.innerHeight;
        if (visible) void video.play().catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", onVisibility);

    if (!reduce && touch) {
      root.style.setProperty("scroll-behavior", "auto");
    }

    return () => {
      window.removeEventListener("resize", setAppViewportUnit);
      window.removeEventListener("orientationchange", setAppViewportUnit);
      document.removeEventListener("visibilitychange", onVisibility);
      visibilityObserver?.disconnect();
      root.classList.remove("orbit-touch", "orbit-mobile-lite");
    };
  }, []);

  return null;
}
