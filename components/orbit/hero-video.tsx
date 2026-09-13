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
      <source
        src="https://media.base44.com/videos/public/6a19cb9aaec767c0616892e9/4987c1f14_201735-916310640_medium.mp4"
        type="video/mp4"
      />
      <source src="/brand/hero-developer.mp4" type="video/mp4" />
    </video>
  );
}
