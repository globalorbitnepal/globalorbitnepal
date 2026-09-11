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
          src="/brand/hero-office.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_45%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#000_0%,rgba(0,0,0,0.82)_28%,rgba(0,0,0,0.35)_52%,rgba(0,0,0,0.12)_100%)]" />
      </div>
      <div className="relative mx-auto flex min-h-[560px] max-w-[1360px] flex-col justify-between px-5 pb-8 pt-16 sm:min-h-[600px] sm:px-8 sm:pb-10 sm:pt-[72px] lg:min-h-[640px]">
        <div className="max-w-[560px]">
          <p className="text-[12px] font-semibold uppercase tracking-[0.36em] text-[#d4a017]">
            Your technology partner
          </p>
          <h1
            id="home-hero-heading"
            className="mt-5 font-sans text-[42px] font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-[56px] lg:text-[62px]"
          >
            Digital Solutions
            <br />
            for a <span className="text-[#d4a017]">Bigger Tomorrow</span>
          </h1>
          <p className="mt-6 max-w-[470px] text-[15px] leading-7 text-white/80">
            {HOME_POSITIONING.lede}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={HOME_POSITIONING.primaryCta.href}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#d4a017] px-7 text-[14px] font-semibold text-[#1a1408]"
            >
              Start Your Project
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href={HOME_POSITIONING.secondaryCta.href}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/35 bg-black/20 px-7 text-[14px] font-medium text-white"
            >
              <span
                aria-hidden="true"
                className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/70 text-[9px]"
              >
                ▶
              </span>
              View Our Work
            </Link>
          </div>
        </div>
        <ul className="grid max-w-[760px] grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4">
          {HOME_HERO_FEATURES.map((item) => {
            const Icon = HERO_FEATURE_ICONS[item.key];
            return (
              <li key={item.key} className="flex items-center gap-3">
                <span className="text-[#d4a017]">
                  <Icon className="h-7 w-7" />
                </span>
                <span className="text-[13px] font-medium leading-[1.15] text-white">
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
