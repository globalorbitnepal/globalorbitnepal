"use client";

import Image from "next/image";
import { useState, useSyncExternalStore } from "react";

const HERO_4K = "/brand/hero-scene-uhd-4k.jpg";
const HERO_2K = "/brand/hero-scene-uhd-2k.jpg";
const HERO_HD = "/brand/hero-scene-uhd.jpg";
const HERO_FALLBACK = "/brand/hero-globe.jpg";

function subscribeMediaQuery(query: string, onChange: () => void) {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function subscribeResize(onChange: () => void) {
  window.addEventListener("resize", onChange, { passive: true });
  return () => window.removeEventListener("resize", onChange);
}

function pickUhdSrc() {
  const w = window.innerWidth;
  if (w >= 1536) return HERO_4K;
  if (w >= 960) return HERO_2K;
  return HERO_HD;
}

/**
 * Ultra HD hero environment (responsive 1x/2x/4K plates + CSS atmosphere).
 */
export function OrbitHomeHeroScene() {
  const reducedMotion = useSyncExternalStore(
    (cb) => subscribeMediaQuery("(prefers-reduced-motion: reduce)", cb),
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
  const uhdSrc = useSyncExternalStore(subscribeResize, pickUhdSrc, () => HERO_HD);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const motionOk = !reducedMotion;
  const displaySrc = imgSrc ?? uhdSrc;

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#020610]" aria-hidden="true">
      <div className="orbit-hero-stars absolute inset-0 opacity-75" />

      <div
        className={`orbit-hero-uhd-plate absolute inset-[-1.25%] h-[102.5%] w-[102.5%] ${
          motionOk ? "orbit-hero-uhd-drift" : ""
        }`}
      >
        <Image
          src={displaySrc}
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className="orbit-hero-sharp object-cover object-[48%_38%] contrast-[1.06] saturate-[1.1] brightness-[1.02] sm:object-[50%_40%] lg:object-[48%_38%]"
          onError={() => setImgSrc(HERO_FALLBACK)}
        />
      </div>

      <div className="orbit-hero-sunrise pointer-events-none absolute inset-0 opacity-[0.88]" />
      <div className="orbit-hero-horizon pointer-events-none absolute inset-0" />
      <div className="orbit-hero-sharpness pointer-events-none absolute inset-0" />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#020610]/88 via-[#020610]/20 to-transparent lg:h-48" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%] bg-gradient-to-t from-[#020610] via-[#020610]/40 to-transparent" />
    </div>
  );
}
