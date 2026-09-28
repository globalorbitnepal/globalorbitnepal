"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const HERO_4K = "/brand/hero-scene-uhd-4k.jpg";
const HERO_2K = "/brand/hero-scene-uhd-2k.jpg";
const HERO_HD = "/brand/hero-scene-uhd.jpg";
const HERO_FALLBACK = "/brand/hero-globe.jpg";

/**
 * Ultra HD hero environment (responsive 1x/2x/4K plates + CSS atmosphere).
 * All marketing copy stays in OrbitHomeHero as HTML.
 */
export function OrbitHomeHeroScene() {
  const [motionOk, setMotionOk] = useState(true);
  const [uhdSrc, setUhdSrc] = useState(HERO_HD);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setMotionOk(!mq.matches);
    const onChange = () => setMotionOk(!mq.matches);
    mq.addEventListener("change", onChange);

    const pick = () => {
      const w = window.innerWidth;
      if (w >= 1536) setUhdSrc(HERO_4K);
      else if (w >= 960) setUhdSrc(HERO_2K);
      else setUhdSrc(HERO_HD);
    };
    pick();
    window.addEventListener("resize", pick, { passive: true });

    return () => {
      mq.removeEventListener("change", onChange);
      window.removeEventListener("resize", pick);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#020610]" aria-hidden="true">
      <div className="orbit-hero-stars absolute inset-0 opacity-75" />

      <div
        className={`orbit-hero-uhd-plate absolute inset-[-1.25%] h-[102.5%] w-[102.5%] ${
          motionOk ? "orbit-hero-uhd-drift" : ""
        }`}
      >
        <Image
          src={uhdSrc}
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className="orbit-hero-sharp object-cover object-[48%_38%] contrast-[1.06] saturate-[1.1] brightness-[1.02] sm:object-[50%_40%] lg:object-[48%_38%]"
          onError={() => setUhdSrc(HERO_FALLBACK)}
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
