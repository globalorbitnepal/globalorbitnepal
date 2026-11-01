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
      <source src="/brand/hero-developer.mp4" type="video/mp4" />
      <source src="/brand/hero-product.mp4" type="video/mp4" />
    </video>
  );
}
