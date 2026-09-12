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

const FEATURED = HOME_HERO_FEATURES.filter((item) =>
  ["web", "erp", "seo"].includes(item.key),
);

const ORBIT_PLACES = [
  { className: "left-[6%] top-[14%]" },
  { className: "right-[4%] top-[18%]" },
  { className: "left-[2%] top-[58%]" },
  { className: "right-[2%] top-[62%]" },
] as const;

const STAT_ICONS = [IconPeople, IconChart, IconGlobe, IconShield];
const PLACES = [
  { src: "/brand/places/himalaya.jpg", alt: "Himalaya" },
  { src: "/brand/places/pagoda.jpg", alt: "Kathmandu" },
  { src: "/brand/places/city.jpg", alt: "Global city" },
] as const;

export function HomeHero() {
  return (
    <section
      className="relative isolate flex min-h-[calc(100svh-84px)] flex-col overflow-hidden bg-[#0d1116] text-[#171c24]"
      aria-labelledby="home-hero-heading"
    >
      <div className="absolute inset-0">
        <Image
          src="/brand/hero-uhd-office.jpg"
          alt=""
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-[76%_42%] saturate-[1.05] contrast-[1.04]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(95deg,rgba(250,246,239,0.88)_0%,rgba(250,246,239,0.62)_22%,rgba(250,246,239,0.18)_42%,transparent_58%)]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/10 to-transparent" />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1500px] flex-1 items-center gap-8 px-5 pt-8 sm:px-8 lg:grid-cols-12 lg:px-12 lg:pt-4">
        <div className="lg:col-span-6 xl:col-span-5">
          <p className="text-[12px] font-semibold uppercase tracking-[0.46em] text-[#c4a04a]">
            {HOME_POSITIONING.eyebrow}
          </p>
          <h1
            id="home-hero-heading"
            className="mt-4 font-[family-name:var(--font-display)] text-[44px] font-semibold leading-[0.98] tracking-[-0.045em] text-[#12161c] sm:text-[62px] xl:text-[72px]"
          >
            {HOME_POSITIONING.headlineLead}
            <span className="mt-2 block">
              <span className="text-[#c4a04a]">{HOME_POSITIONING.headlineGold}</span>{" "}
              {HOME_POSITIONING.headlineRest}
            </span>
          </h1>
          <p className="mt-6 max-w-[520px] text-[16px] leading-8 text-[#3f4741]">
            {HOME_POSITIONING.lede}
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {FEATURED.map((item) => {
              const Icon = HERO_FEATURE_ICONS[item.key];
              return (
                <li key={item.key} className="glass-panel rounded-[22px] px-4 py-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#c4a04a]/12 text-[#c4a04a]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <p className="mt-3 text-[14px] font-semibold leading-snug text-[#171c24]">
                    {item.title}
                    <span className="mt-0.5 block font-medium text-[#5c564c]">{item.line}</span>
                  </p>
                </li>
              );
            })}
          </ul>

          <div className="mt-7" id="technologies">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#6b6458]">
              Technologies we work with
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-3">
              {HOME_TECHNOLOGIES.map((name) => {
                const Mark = TECH_MARKS[name];
                return (
                  <span key={name} className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#1c242c]">
                    {Mark ? <Mark className="h-6 w-6" /> : null}
                    {name}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={HOME_POSITIONING.primaryCta.href}
              className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-[#e1b325] px-8 text-[15px] font-semibold text-[#1a1408] shadow-[0_12px_28px_rgba(180,140,20,0.28)]"
              style={{ height: "3.25rem" }}
            >
              {HOME_POSITIONING.primaryCta.label}
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href={HOME_POSITIONING.secondaryCta.href}
              className="glass-panel inline-flex items-center justify-center gap-2 rounded-full px-8 text-[15px] font-semibold text-[#1c242c]"
              style={{ height: "3.25rem" }}
            >
              <span
                aria-hidden="true"
                className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#1c242c]/35 text-[9px] leading-none"
              >
                ▶
              </span>
              {HOME_POSITIONING.secondaryCta.label}
            </Link>
          </div>
          <p className="mt-5 font-[family-name:var(--font-display)] text-[28px] italic leading-none text-[#171c24]">
            {HOME_POSITIONING.script}
          </p>
        </div>

        <div className="relative hidden min-h-[520px] lg:col-span-6 lg:block xl:col-span-7" id="work">
          {HOME_ORBIT_CARDS.map((card, index) => {
            const Icon = ORBIT_ICONS[card.icon];
            return (
              <div
                key={card.title}
                className={`glass-panel absolute z-10 min-w-[168px] rounded-[22px] px-4 py-3.5 text-[14px] font-semibold text-[#1c242c] ${ORBIT_PLACES[index].className}`}
              >
                <span className="mb-1.5 inline-flex text-[#c4a04a]">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="block leading-snug">{card.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 pb-7 pt-3 sm:px-8 lg:px-12">
        <div className="glass-panel flex flex-col gap-6 rounded-[32px] px-6 py-5 sm:px-8 lg:flex-row lg:items-center">
          <ul className="grid flex-1 grid-cols-2 gap-6 sm:grid-cols-4">
            {HOME_TRUST_STATS.map((item, index) => {
              const Icon = STAT_ICONS[index];
              return (
                <li key={item.label} className="flex items-center gap-3 text-[#1c242c]">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#c4a04a]/12 text-[#c4a04a]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span>
                    <span className="block font-[family-name:var(--font-display)] text-[30px] font-semibold leading-none">
                      {item.value}
                    </span>
                    <span className="mt-1 block text-[12px] font-medium text-[#5c564c]">{item.label}</span>
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
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            <p className="text-right text-[12px] font-semibold uppercase tracking-[0.2em] text-[#6b6458]">
              From Nepal
              <span className="mt-1 block tracking-[0.14em] text-[#1c242c]">To the world</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
