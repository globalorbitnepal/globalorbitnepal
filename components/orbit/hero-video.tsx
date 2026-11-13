"use client";

export function OrbitHeroVideo() {
  return (
    <video
      className="absolute inset-0 h-full w-full scale-105 object-cover"
      autoPlay
      muted
      loop
      playsInline
      poster="/brand/hero-uhd.jpg"
      aria-hidden="true"
    >
      <source src="/stream/brand/hero-developer" type="video/mp4" />
      <source src="/stream/brand/hero-product" type="video/mp4" />
    </video>
  );
}
