"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import type { SoftwareConfig } from "@/lib/software-config";
import { DEFAULT_SOFTWARE } from "@/lib/software-config";

function SoftIcon({ index, color }: { index: number; color: string }) {
  const props = {
    className: "h-[18px] w-[18px]",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  const icons = [
    <svg key="i0" {...props}><path d="M7 3.5h7l3 3V20a1.5 1.5 0 0 1-1.5 1.5h-8.5A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5z" /><path d="M14 3.5V7h3.5M8 12h8M8 15.5h6" /></svg>,
    <svg key="i1" {...props}><path d="M3.5 18.5V10.5l8.5-4 8.5 4v8" /><path d="M7 18.5V12h10v6.5M3.5 18.5h17" /></svg>,
    <svg key="i2" {...props}><path d="M3.5 16.5c4-1 7-5.5 8.5-10.5 1.5 5 4.5 9.5 8.5 10.5" /><path d="M12 6v12.5" /></svg>,
    <svg key="i3" {...props}><path d="M4 19.5V8.5h5V19.5M9 19.5V5.5h5.5V19.5M14.5 19.5V10h5.5v9.5" /></svg>,
    <svg key="i4" {...props}><circle cx="12" cy="12" r="3" /><path d="M12 3.5v2.5M12 18v2.5M3.5 12h2.5M18 12h2.5M6.2 6.2l1.8 1.8M16 16l1.8 1.8M17.8 6.2 16 8M8 16l-1.8 1.8" /></svg>,
    <svg key="i5" {...props}><rect x="4" y="5" width="16" height="12" rx="1.5" /><path d="M8 20h8M12 17v3" /></svg>,
    <svg key="i6" {...props}><circle cx="9" cy="8" r="2.5" /><circle cx="16" cy="9" r="2" /><path d="M3.8 18a5.2 5.2 0 0 1 10.4 0M14.2 15.8a4.2 4.2 0 0 1 6 2.2" /></svg>,
    <svg key="i7" {...props}><path d="M4 19V11M9 19V6M14 19v-6M19 19V9" /></svg>,
    <svg key="i8" {...props}><rect x="8" y="3.5" width="8" height="17" rx="2" /><path d="M11 18.5h2" /></svg>,
    <svg key="i9" {...props}><rect x="4" y="5" width="16" height="14" rx="2" /><path d="M8 9h8M8 12.5h5" /></svg>,
  ];

  return icons[index] ?? icons[0];
}

export function OrbitSoftwareSection({ config }: { config: SoftwareConfig }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc = config.videoSrc || DEFAULT_SOFTWARE.videoSrc;

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
  }, [videoSrc]);

  return (
    <section className="orbit-soft-stage relative isolate overflow-hidden text-white" aria-labelledby="software-heading">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <video
          ref={videoRef}
          className="h-full w-full object-cover object-[center_30%] opacity-45"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={videoSrc} type={videoSrc.endsWith(".webm") ? "video/webm" : "video/mp4"} />
        </video>
        <div className="orbit-soft-veil absolute inset-0" />
      </div>

      <div className="relative z-[1] mx-auto w-full max-w-[1680px] px-[clamp(1.25rem,3.6vw,3.4rem)] py-[clamp(3.75rem,8vh,6rem)]">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="orbit-work-badge mx-auto">
            <span className="orbit-work-badge-num">4</span>
            {config.kicker}
          </p>
          <h2 id="software-heading" className="orbit-soft-headline">
            {config.headline} <span>{config.headlineAccent}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-8 text-white/62">{config.lede}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 min-[520px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 xl:gap-5">
          {config.products.map((item, index) => {
            const num = String(index + 1).padStart(2, "0");
            return (
              <Link
                key={item.slug}
                href={item.href}
                className="orbit-soft-card group relative flex min-h-[250px] flex-col overflow-hidden rounded-[22px] p-4 sm:min-h-[270px] sm:p-5"
                style={{ "--soft-accent": item.accent } as CSSProperties}
              >
                <div className="flex items-start gap-3">
                  <span
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px]"
                    style={{
                      background: `linear-gradient(145deg, ${item.accent}33, rgba(255,255,255,0.05))`,
                      boxShadow: `0 0 0 1px ${item.accent}66, 0 8px 18px ${item.accent}40`,
                    }}
                  >
                    <SoftIcon index={index} color={item.accent} />
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-[11px] font-bold tracking-[0.14em]" style={{ color: item.accent }}>
                      {num}
                    </p>
                    <h3 className="mt-0.5 text-[14px] font-semibold leading-snug text-white sm:text-[15px]">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <p className="mt-3 line-clamp-3 text-[12px] leading-5 text-white/65 sm:text-[13px] sm:leading-[1.55]">
                  {item.summary}
                </p>
                <div className="relative mt-auto flex min-h-[108px] items-end justify-between gap-2 pt-4">
                  <span className="relative z-[1] inline-flex items-center gap-2 text-[12px] font-semibold text-white/92">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-[11px] text-[#0b0b10] shadow-[0_8px_18px_rgba(255,255,255,0.18)] transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                    Learn more
                  </span>
                  {item.previewSrc ? (
                    <div className="pointer-events-none absolute -bottom-1 -right-2 h-[108px] w-[108px] sm:-right-1 sm:h-[116px] sm:w-[116px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.previewSrc}
                        alt=""
                        className="h-full w-full object-contain object-bottom drop-shadow-[0_12px_24px_rgba(0,0,0,0.55)] transition-transform duration-300 group-hover:-translate-y-1"
                      />
                    </div>
                  ) : null}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/55">{config.footerKicker}</p>
          <p className="font-[family-name:var(--font-jakarta)] text-[clamp(1.35rem,3vw,2.1rem)] font-semibold leading-[1.15] text-white sm:text-right">
            {config.footerTitle}
          </p>
        </div>
      </div>
    </section>
  );
}
