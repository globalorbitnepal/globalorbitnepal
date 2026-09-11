import Image from "next/image";
import Link from "next/link";
import {
  HERO_FEATURE_ICONS,
  IconChart,
  IconGlobe,
  IconIdea,
  IconPeople,
  IconShield,
} from "@/components/home/hero-icons";
import { TECH_MARKS } from "@/components/home/tech-marks";
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
  { className: "left-[10%] top-[10%]" },
  { className: "right-[8%] top-[14%]" },
  { className: "left-[4%] top-[46%]" },
  { className: "right-[4%] top-[50%]" },
] as const;

const STAT_ICONS = [IconPeople, IconChart, IconGlobe, IconShield];
const PLACES = [
  { src: "/brand/places/himalaya.jpg", alt: "Himalaya" },
  { src: "/brand/places/pagoda.jpg", alt: "Kathmandu" },
  { src: "/brand/places/city.jpg", alt: "Global city" },
] as const;
const WALL_LINES = ["Websites", "Apps", "ERP Systems", "SEO", "Business Email", "Audit", "Support"];

export function HomeHero() {
  return (
    <section
      className="relative isolate flex min-h-[calc(100svh-84px)] flex-col overflow-hidden bg-[#f7f2e8] text-[#171c24]"
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
          className="object-cover object-[70%_42%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(252,248,241,0.9)_0%,rgba(252,248,241,0.72)_24%,rgba(252,248,241,0.2)_44%,transparent_64%)]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#f7f2e8]/90 to-transparent" />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1440px] flex-1 grid-cols-1 items-center gap-6 px-5 pt-6 sm:px-8 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.42em] text-[#c4a04a]">
            {HOME_POSITIONING.eyebrow}
          </p>
          <h1
            id="home-hero-heading"
            className="mt-3 font-[family-name:var(--font-display)] text-[40px] font-semibold leading-[1.02] tracking-[-0.04em] text-[#171c24] sm:text-[56px] xl:text-[66px]"
          >
            {HOME_POSITIONING.headlineLead}
            <span className="mt-1 block font-semibold">
              <span className="text-[#c4a04a]">{HOME_POSITIONING.headlineGold}</span>{" "}
              {HOME_POSITIONING.headlineRest}
            </span>
          </h1>
          <p className="mt-4 max-w-[540px] text-[15px] leading-7 text-[#4e564f]">
            {HOME_POSITIONING.lede}
          </p>

          <ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
            {HOME_HERO_FEATURES.map((item) => {
              const Icon = HERO_FEATURE_ICONS[item.key];
              return (
                <li key={item.key} className="glass-panel flex items-center gap-2 rounded-2xl px-2.5 py-2.5">
                  <span className="text-[#c4a04a]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-[11px] font-semibold leading-[1.15] text-[#1c242c]">
                    {item.title}
                    <br />
                    {item.line}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-5" id="technologies">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#6b6458]">
              Technologies we work with
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              {HOME_TECHNOLOGIES.map((name) => {
                const Mark = TECH_MARKS[name];
                return (
                  <span key={name} className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#1c242c]">
                    {Mark ? <Mark /> : null}
                    {name}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={HOME_POSITIONING.primaryCta.href}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#e1b325] px-7 text-[14px] font-semibold text-[#1a1408] shadow-[0_10px_24px_rgba(180,140,20,0.22)]"
            >
              {HOME_POSITIONING.primaryCta.label}
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href={HOME_POSITIONING.secondaryCta.href}
              className="glass-panel inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-[14px] font-semibold text-[#1c242c]"
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
          <p className="mt-4 font-[family-name:var(--font-display)] text-[24px] italic leading-none text-[#171c24]">
            {HOME_POSITIONING.script}
          </p>
        </div>

        <div className="relative hidden min-h-[460px] lg:col-span-6 lg:block" id="work">
          {HOME_ORBIT_CARDS.map((card, index) => {
            const Icon = ORBIT_ICONS[card.icon];
            return (
              <div
                key={card.title}
                className={`glass-panel absolute z-10 max-w-[150px] rounded-2xl px-3 py-2.5 text-[12px] font-semibold text-[#1c242c] ${ORBIT_PLACES[index].className}`}
              >
                <span className="mb-1 inline-flex text-[#c4a04a]">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="block leading-snug">{card.title}</span>
              </div>
            );
          })}
          <p className="absolute bottom-16 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/70 bg-white/55 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5c564c] backdrop-blur-xl">
            Ideas · Technology · Growth
          </p>
          <ul className="absolute right-0 top-8 hidden space-y-1 text-right text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80 xl:block">
            {WALL_LINES.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-6 pt-2 sm:px-8 lg:px-10">
        <div className="glass-panel flex flex-col gap-5 rounded-[28px] px-5 py-4 sm:px-7 lg:flex-row lg:items-center">
          <ul className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-4">
            {HOME_TRUST_STATS.map((item, index) => {
              const Icon = STAT_ICONS[index];
              return (
                <li key={item.label} className="flex items-center gap-3 text-[#1c242c]">
                  <span className="text-[#c4a04a]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span>
                    <span className="block font-[family-name:var(--font-display)] text-[26px] font-semibold leading-none">
                      {item.value}
                    </span>
                    <span className="mt-1 block text-[11px] font-medium text-[#5c564c]">{item.label}</span>
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {PLACES.map((place) => (
                <Image
                  key={place.src}
                  src={place.src}
                  alt={place.alt}
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            <p className="text-right text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6b6458]">
              From Nepal
              <span className="mt-1 block tracking-[0.14em] text-[#1c242c]">To the world</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
