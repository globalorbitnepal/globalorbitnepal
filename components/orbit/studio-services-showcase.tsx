"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const SERVICES = [
  {
    title: "Website Development",
    body: "Fast, SEO-ready marketing sites and platforms that drive engagement and business growth.",
    href: "/service/website-development-nepal",
    tone: "blue",
  },
  {
    title: "UI/UX Design",
    body: "Crafting pixel-perfect interfaces and intuitive user journeys, backed by research, systems and testing.",
    href: "/services",
    tone: "violet",
  },
  {
    title: "Webflow Development",
    body: "Pixel-perfect, no-code powered sites built for speed and easy content control.",
    href: "/services",
    tone: "pink",
  },
  {
    title: "Next.js Development",
    body: "Engineering fast, SEO-friendly web apps and platforms on the Next.js framework.",
    href: "/services",
    tone: "sky",
  },
  {
    title: "Laravel Backend",
    body: "Secure APIs, admin panels, and ERP modules on Laravel — built to scale with your operations.",
    href: "/orbit-software",
    tone: "red",
  },
  {
    title: "Node.js Backend",
    body: "Realtime services, integrations, and microservices on Node for products that stay responsive.",
    href: "/orbit-software",
    tone: "green",
  },
  {
    title: "SEO & Local Ranking",
    body: "Technical, on-page, and local SEO so you rank on Google Maps and search — not skipped.",
    href: "/packages/seo-growth",
    tone: "gold",
  },
] as const;

export function OrbitStudioServicesShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
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
  }, []);

  return (
    <section className="orbit-services-showcase relative overflow-hidden bg-[#030308] text-white" aria-labelledby="services-showcase-heading">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(59,130,246,0.12),transparent_55%)]" aria-hidden="true" />

      <div className="relative z-[1] mx-auto w-full max-w-[1680px] px-[clamp(1.25rem,3.6vw,3.4rem)] py-[clamp(3.5rem,7vh,5.5rem)]">
        <div className="orbit-services-showcase-head grid gap-[clamp(1.5rem,3vw,2.75rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
          <div>
            <p className="orbit-services-badge">
              <span className="orbit-services-badge-num">2</span>
              Our Services
            </p>
            <h2 id="services-showcase-heading" className="orbit-services-headline">
              With an in-house team of designers, developers and animators, we build applications that{" "}
              <span className="text-[#818cf8]">STAND OUT</span> from the crowd!
            </h2>
          </div>

          <div className="orbit-services-video-wrap" aria-hidden="true">
            <div className="orbit-services-video-glow" />
            <video
              ref={videoRef}
              className="orbit-services-video"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              disablePictureInPicture
            >
              <source src="/brand/need-phone-reel.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="orbit-services-grid mt-[clamp(2rem,4vh,3rem)]">
          {SERVICES.map((item) => (
            <Link key={item.title} href={item.href} className={`orbit-services-card orbit-services-card-${item.tone}`}>
              <h3 className="orbit-services-card-title">{item.title}</h3>
              <p className="orbit-services-card-body">{item.body}</p>
              <span className="orbit-services-card-link">Explore →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
