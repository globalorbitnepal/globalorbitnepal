"use client";

export function HeroDeveloperVideo() {
  return (
    <video
      className="h-full w-full scale-105 object-cover"
      autoPlay
      muted
      loop
      playsInline
      poster="/brand/hero-scene.jpg"
      aria-hidden="true"
    >
      <source src="/brand/hero-developer.mp4" type="video/mp4" />
    </video>
  );
}
