import Image from "next/image";
import Link from "next/link";
import {
  HERO_FEATURE_ICONS,
  IconChart,
  IconGlobe,
  IconHeadset,
  IconIdea,
  IconPeople,
  IconShield,
} from "@/components/home/hero-icons";
import {
  HOME_HERO_FEATURES,
  HOME_ORBIT_CARDS,
  HOME_POSITIONING,
  HOME_TECHNOLOGIES,
  HOME_TRUST_STATS,
} from "@/lib/home-content";

const ORBIT_ICONS = {
  idea: IconIdea,
  globe: IconGlobe,
  people: IconPeople,
  chart: IconChart,
} as const;

const ORBIT_PLACES = [
  { className: "left-[8%] top-[12%]" },
  { className: "right-[6%] top-[16%]" },
  { className: "left-[2%] top-[48%]" },
  { className: "right-[2%] top-[52%]" },
] as const;

const STAT_ICONS = [IconPeople, IconChart, IconGlobe, IconShield];

export function HomeHero() {
  return (
    <section
      className="relative isolate min-h-[calc(100svh-82px)] overflow-hidden bg-[#f7f2e8] text-[#141c24]"
      aria-labelledby="home-hero-heading"
    >
      <div className="absolute inset-0">
        <Image
          src="/brand/hero-orbit-clean.jpg"
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[72%_46%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(252,248,241,0.92)_0%,rgba(252,248,241,0.78)_26%,rgba(252,248,241,0.28)_46%,rgba(252,248,241,0.04)_62%,transparent_78%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#f7f2e8] to-transparent" />
      </div>

      <div className="relative mx-auto grid min-h-[calc(100svh-82px)] max-w-[1440px] items-center gap-6 px-5 pb-8 pt-8 sm:px-8 lg:grid-cols-12 lg:px-10 lg:pt-6">
        <div className="lg:col-span-6 xl:col-span-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.42em] text-[#c4a04a]">
            {HOME_POSITIONING.eyebrow}
          </p>
          <h1
            id="home-hero-heading"
            className="mt-3 font-[family-name:var(--font-display)] text-[42px] font-medium leading-[1.02] tracking-[-0.035em] text-[#171c24] sm:text-[58px] xl:text-[68px]"
          >
            {HOME_POSITIONING.headlineLead}
            <span className="mt-1 block">
              <span className="text-[#c4a04a]">{HOME_POSITIONING.headlineGold}</span>{" "}
              {HOME_POSITIONING.headlineRest}
            </span>
          </h1>
          <p className="mt-5 max-w-[520px] text-[15px] leading-7 text-[#4e564f]">
            {HOME_POSITIONING.lede}
          </p>

          <ul className="mt-7 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {HOME_HERO_FEATURES.map((item) => {
              const Icon = HERO_FEATURE_ICONS[item.key];
              return (
                <li
                  key={item.key}
                  className="flex items-center gap-2.5 rounded-[18px] border border-white/80 bg-white/65 px-3 py-2.5 shadow-[0_8px_24px_rgba(40,30,16,0.06)] backdrop-blur-xl"
                >
                  <span className="text-[#c4a04a]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-[11px] font-semibold leading-[1.2] text-[#1c242c]">
                    {item.title}
                    <br />
                    {item.line}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-6" id="technologies">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#6b6458]">
              Technologies we work with
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {HOME_TECHNOLOGIES.map((name) => (
                <span
                  key={name}
                  className="inline-flex h-8 items-center rounded-full border border-white/80 bg-white/70 px-3 text-[12px] font-semibold text-[#1c242c] backdrop-blur-md"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={HOME_POSITIONING.primaryCta.href}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#e1b325] px-7 text-[14px] font-semibold text-[#1a1408] shadow-[0_10px_24px_rgba(180,140,20,0.22)]"
            >
              {HOME_POSITIONING.primaryCta.label}
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href={HOME_POSITIONING.secondaryCta.href}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#eadfcd] bg-white/70 px-7 text-[14px] font-semibold text-[#1c242c] backdrop-blur-md"
            >
              <span
                aria-hidden="true"
                className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#1c242c]/35 text-[8px] leading-none"
              >
                ▶
              </span>
              {HOME_POSITIONING.secondaryCta.label}
            </Link>
          </div>
          <p className="mt-5 font-[family-name:var(--font-display)] text-[26px] italic leading-none text-[#1c242c]">
            {HOME_POSITIONING.script}
          </p>
        </div>

        <div className="relative hidden min-h-[520px] lg:col-span-6 lg:block" id="work">
          {HOME_ORBIT_CARDS.map((card, index) => {
            const Icon = ORBIT_ICONS[card.icon];
            return (
              <div
                key={card.title}
                className={`absolute z-10 max-w-[148px] rounded-2xl border border-white/80 bg-white/75 px-3 py-2.5 text-[12px] font-semibold text-[#1c242c] shadow-[0_12px_30px_rgba(40,30,16,0.1)] backdrop-blur-xl ${ORBIT_PLACES[index].className}`}
              >
                <span className="mb-1 inline-flex text-[#c4a04a]">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="block leading-snug">{card.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 pb-8 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-5 rounded-[28px] border border-white/80 bg-white/72 px-5 py-4 shadow-[0_16px_40px_rgba(40,30,16,0.07)] backdrop-blur-2xl sm:px-7 lg:flex-row lg:items-center">
          <ul className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-4">
            {HOME_TRUST_STATS.map((item, index) => {
              const Icon = STAT_ICONS[index] || IconHeadset;
              return (
                <li key={item.label} className="flex items-center gap-3 text-[#1c242c]">
                  <span className="text-[#c4a04a]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span>
                    <span className="block font-[family-name:var(--font-display)] text-[26px] leading-none">
                      {item.value}
                    </span>
                    <span className="mt-1 block text-[11px] font-medium text-[#5c564c]">{item.label}</span>
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="shrink-0 text-right text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6b6458]">
            From Nepal
            <span className="mt-1 block tracking-[0.16em] text-[#1c242c]">To the world</span>
          </p>
        </div>
      </div>
    </section>
  );
}
