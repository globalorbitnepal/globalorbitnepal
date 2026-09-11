import Image from "next/image";
import Link from "next/link";
import { HERO_FEATURE_ICONS } from "@/components/home/hero-icons";
import { Container } from "@/components/ui/container";
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
          className="object-cover object-[62%_42%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.72)_32%,rgba(0,0,0,0.28)_58%,rgba(0,0,0,0.08)_100%)]" />
      </div>
      <Container className="relative flex min-h-[420px] flex-col justify-between gap-10 py-10 sm:min-h-[480px] sm:py-12 lg:min-h-[520px] lg:py-14">
        <div className="max-w-[540px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#d4a017] sm:text-xs">
            Your technology partner
          </p>
          <h1
            id="home-hero-heading"
            className="mt-4 font-sans text-[2.45rem] font-semibold leading-[1.06] tracking-[-0.035em] text-white sm:text-[3.25rem] lg:text-[3.55rem]"
          >
            Digital Solutions
            <br />
            for a <span className="text-[#d4a017]">Bigger Tomorrow</span>
          </h1>
          <p className="mt-5 max-w-[460px] text-[13.5px] leading-6 text-white/82 sm:text-[15px] sm:leading-7">
            {HOME_POSITIONING.lede}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={HOME_POSITIONING.primaryCta.href}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#d4a017] px-6 text-[13px] font-semibold text-[#1a1408]"
            >
              Start Your Project
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href={HOME_POSITIONING.secondaryCta.href}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/30 bg-black/25 px-6 text-[13px] font-medium text-white"
            >
              <span
                aria-hidden="true"
                className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-full border border-white/60 text-[8px]"
              >
                ▶
              </span>
              View Our Work
            </Link>
          </div>
        </div>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
          {HOME_HERO_FEATURES.map((item) => {
            const Icon = HERO_FEATURE_ICONS[item.key];
            return (
              <li key={item.key} className="flex items-center gap-3">
                <span className="text-[#d4a017]">
                  <Icon className="h-[22px] w-[22px]" />
                </span>
                <span className="text-[12px] font-medium leading-[1.2] text-white">
                  {item.title}
                  <br />
                  {item.line}
                </span>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
