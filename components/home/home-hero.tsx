import Image from "next/image";
import Link from "next/link";
import { HERO_FEATURE_ICONS } from "@/components/home/hero-icons";
import { HOME_HERO_FEATURES, HOME_POSITIONING } from "@/lib/home-content";

export function HomeHero() {
  return (
    <section
      className="relative isolate overflow-hidden bg-black text-white"
      aria-labelledby="home-hero-heading"
    >
      <div className="absolute inset-0">
        <Image
          src="/brand/hero-scene.jpg"
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="scale-105 object-cover object-[72%_28%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,#000_0%,#000_14%,rgba(0,0,0,0.82)_28%,rgba(0,0,0,0.42)_44%,rgba(0,0,0,0.12)_58%,transparent_72%)]" />
        <div className="absolute inset-y-0 left-0 w-[min(42%,520px)] bg-black/25 blur-2xl" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100svh-7.5rem)] max-w-[1360px] flex-col justify-between px-5 pb-10 pt-14 sm:px-8 lg:min-h-[calc(100svh-110px)] lg:pb-14 lg:pt-[4.5rem]">
        <div className="max-w-[620px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.42em] text-[#d4a017]">
            Your technology partner
          </p>
          <h1
            id="home-hero-heading"
            className="mt-5 font-[family-name:var(--font-display)] text-[42px] font-medium leading-[1.06] tracking-[-0.03em] text-white sm:text-[56px] lg:text-[64px]"
          >
            Digital Solutions
            <span className="mt-1 block text-[0.92em] sm:text-[1em]">
              for a <span className="text-[#d4a017]">Bigger Tomorrow</span>
            </span>
          </h1>
          <p className="mt-6 max-w-[480px] text-[15px] leading-7 text-white/78">
            {HOME_POSITIONING.lede}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={HOME_POSITIONING.primaryCta.href}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#d4a017] px-7 text-[14px] font-semibold text-[#1a1408] shadow-[0_10px_30px_rgba(212,160,23,0.28)]"
            >
              Start Your Project
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href={HOME_POSITIONING.secondaryCta.href}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/35 bg-black/25 px-7 text-[14px] font-medium text-white backdrop-blur-[2px]"
            >
              <span
                aria-hidden="true"
                className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/70 text-[8px] leading-none"
              >
                ▶
              </span>
              View Our Work
            </Link>
          </div>
        </div>

        <ul className="grid max-w-[820px] grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
          {HOME_HERO_FEATURES.map((item) => {
            const Icon = HERO_FEATURE_ICONS[item.key];
            return (
              <li key={item.key} className="flex items-center gap-3">
                <span className="text-[#d4a017]">
                  <Icon className="h-7 w-7" />
                </span>
                <span className="text-[13px] font-medium leading-[1.2] text-white">
                  {item.title}
                  <br />
                  {item.line}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
