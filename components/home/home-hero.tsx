import Link from "next/link";
import { HeroDeveloperVideo } from "@/components/home/hero-developer-video";
import { HERO_FEATURE_ICONS } from "@/components/home/hero-icons";
import { TechMarquee } from "@/components/home/tech-marquee";
import { HOME_HERO_FEATURES, HOME_POSITIONING } from "@/lib/home-content";

export function HomeHero() {
  return (
    <section
      className="relative isolate overflow-hidden bg-[#f6f1e8] text-[#141c24]"
      aria-labelledby="home-hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_500px_at_80%_20%,rgba(255,255,255,0.7),transparent_55%)]" />
      <div className="relative mx-auto grid max-w-[1600px] items-stretch gap-6 px-5 py-7 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:py-9 xl:gap-10">
        <div className="flex flex-col justify-between rounded-[28px] border border-white/70 bg-white/45 p-6 shadow-[0_20px_60px_rgba(50,40,20,0.08)] backdrop-blur-2xl sm:p-8 lg:col-span-5 lg:p-9">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.38em] text-[#b38616]">
              Your technology partner
            </p>
            <h1
              id="home-hero-heading"
              className="mt-4 font-[family-name:var(--font-display)] text-[36px] font-medium leading-[1.08] tracking-[-0.03em] text-[#141c24] sm:text-[48px] xl:text-[56px]"
            >
              Digital Solutions
              <span className="mt-1 block">
                for a <span className="text-[#b38616]">Bigger Tomorrow</span>
              </span>
            </h1>
            <p className="mt-5 max-w-none text-[15px] leading-7 text-[#4b534c]">
              {HOME_POSITIONING.lede}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={HOME_POSITIONING.primaryCta.href}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#d4a017] px-7 text-[14px] font-semibold text-[#1a1408] shadow-[0_10px_24px_rgba(180,140,20,0.22)]"
              >
                Start Your Project
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href={HOME_POSITIONING.secondaryCta.href}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#d7ccb8] bg-white/50 px-7 text-[14px] font-semibold text-[#1c242c] backdrop-blur-md"
              >
                <span
                  aria-hidden="true"
                  className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#1c242c]/40 text-[8px] leading-none"
                >
                  ▶
                </span>
                View Our Work
              </Link>
            </div>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-5 sm:grid-cols-2 xl:grid-cols-4">
            {HOME_HERO_FEATURES.map((item) => {
              const Icon = HERO_FEATURE_ICONS[item.key];
              return (
                <li key={item.key} className="flex items-center gap-2.5">
                  <span className="text-[#b38616]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="text-[12px] font-semibold leading-[1.2] text-[#1c242c]">
                    {item.title}
                    <br />
                    {item.line}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="relative min-h-[320px] overflow-hidden rounded-[28px] border border-white/70 shadow-[0_24px_70px_rgba(40,30,16,0.16)] lg:col-span-7 lg:min-h-[560px] xl:min-h-[620px]">
          <HeroDeveloperVideo />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#f6f1e8]/25 via-transparent to-black/20" />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/40" />
        </div>
      </div>
      <TechMarquee />
    </section>
  );
}
