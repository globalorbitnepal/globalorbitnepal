"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function OrbitHomeHeroMedia() {
  const [videoReady, setVideoReady] = useState(false);
  const [motionOk, setMotionOk] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setMotionOk(!mq.matches);
    const onChange = () => setMotionOk(!mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="orbit-hero-uhd-still absolute inset-[-2%] h-[104%] w-[104%]">
        <Image
          src="/brand/hero-uhd.jpg"
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-[58%_40%] contrast-[1.08] saturate-[1.14] brightness-[1.02] sm:object-[62%_38%] lg:object-[68%_32%]"
        />
      </div>

      {motionOk ? (
        <video
          className={`orbit-hero-uhd-video absolute inset-0 h-full w-full scale-[1.03] object-cover object-center transition-opacity duration-[2000ms] ease-out ${
            videoReady ? "opacity-[0.92]" : "opacity-0"
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/brand/hero-uhd.jpg"
          onCanPlay={() => setVideoReady(true)}
        >
          <source src="/brand/hero-developer.mp4" type="video/mp4" />
        </video>
      ) : null}

      <div className="absolute inset-0 hidden lg:block">
        <Image
          src="/brand/hero-globe.jpg"
          alt=""
          fill
          unoptimized
          sizes="55vw"
          className="object-cover object-[78%_18%] opacity-[0.94] contrast-[1.04] saturate-[1.08] [mask-image:linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.15)_32%,black_52%,black_100%)] xl:object-[72%_20%]"
        />
      </div>
    </div>
  );
}
