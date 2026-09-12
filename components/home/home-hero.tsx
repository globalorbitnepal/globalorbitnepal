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
  HOME_POSITIONING,
  HOME_TECHNOLOGIES,
  HOME_TRUST_STATS,
} from "@/lib/home-content";

const STAT_ICONS = [IconPeople, IconChart, IconGlobe, IconShield];
const PLACES = [
  { src: "/brand/places/himalaya.jpg", alt: "Himalaya" },
  { src: "/brand/places/pagoda.jpg", alt: "Kathmandu" },
  { src: "/brand/places/city.jpg", alt: "Global city" },
] as const;

export function HomeHero() {
  return (
    <section
      className="relative isolate flex min-h-[calc(100svh-84px)] flex-col overflow-hidden bg-[#f4f1ea] text-[#171c24]"
      aria-labelledby="home-hero-heading"
    >
      <div className="absolute inset-0">
        <Image
          src="/brand/hero-studio.png"
          alt=""
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-[58%_42%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,252,247,0.74)_0%,rgba(255,252,247,0.32)_20%,rgba(255,252,247,0.06)_38%,transparent_52%)]" />
      </div>

      <div className="relative z-[2] mx-auto w-full max-w-[1440px] flex-1 px-5 pt-7 sm:px-8 lg:px-10">
        <div className="max-w-[640px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.42em] text-[#c9a227]">
            {HOME_POSITIONING.eyebrow}
          </p>
          <h1
            id="home-hero-heading"
            className="mt-3 font-[family-name:var(--font-display)] text-[42px] font-semibold leading-[1.02] tracking-[-0.04em] text-[#151a22] sm:text-[58px] xl:text-[68px]"
          >
            {HOME_POSITIONING.headlineLead}
            <span className="mt-1 block">
              <span className="text-[#c9a227]">{HOME_POSITIONING.headlineGold}</span>{" "}
              {HOME_POSITIONING.headlineRest}
            </span>
          </h1>
          <p className="mt-5 max-w-[540px] text-[15px] leading-7 text-[#4a524c]">
            {HOME_POSITIONING.lede}
          </p>

          <ul className="mt-7 grid grid-cols-2 gap-2.5 sm:grid-cols-3 xl:grid-cols-6">
            {HOME_HERO_FEATURES.map((item) => {
              const Icon = HERO_FEATURE_ICONS[item.key];
              return (
                <li key={item.key} className="glass-chip flex items-center gap-2.5 rounded-[20px] px-3 py-2.5">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/80 text-[#c9a227]">
                    <Icon className="h-4 w-4" />
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

          <div className="mt-6" id="technologies">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#6b6458]">
              Technologies we work with
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
              {HOME_TECHNOLOGIES.map((name) => {
                const Mark = TECH_MARKS[name];
                return (
                  <span key={name} className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#1c242c]">
                    {Mark ? <Mark className="h-5 w-5" /> : null}
                    {name}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={HOME_POSITIONING.primaryCta.href}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#e1b325] px-7 text-[14px] font-semibold text-[#1a1408] shadow-[0_10px_24px_rgba(180,140,20,0.25)]"
            >
              {HOME_POSITIONING.primaryCta.label}
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href={HOME_POSITIONING.secondaryCta.href}
              className="glass-chip inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-[14px] font-semibold text-[#1c242c]"
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
          <p className="mt-5 font-[family-name:var(--font-display)] text-[26px] italic leading-none text-[#171c24]">
            {HOME_POSITIONING.script}
          </p>
        </div>

      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] hidden lg:block" id="work" aria-hidden="true">
        <ul className="absolute right-10 top-[16%] flex flex-col gap-1.5 text-right text-[10px] font-semibold uppercase tracking-[0.34em] text-[#c9a227]">
          <li>Websites</li>
          <li>Apps</li>
          <li>ERP Systems</li>
          <li>SEO</li>
          <li>Business Email</li>
          <li>Audit</li>
          <li>Support</li>
        </ul>
        <div className="glass-chip absolute right-[24%] top-[18%] rounded-[18px] px-3.5 py-2.5 text-[12px] font-semibold text-[#1c242c]">
          <span className="mb-1 flex text-[#c9a227]">
            <IconIdea className="h-4 w-4" />
          </span>
          Innovative Solutions
        </div>
        <div className="glass-chip absolute right-[7%] top-[22%] rounded-[18px] px-3.5 py-2.5 text-[12px] font-semibold text-[#1c242c]">
          <span className="mb-1 flex text-[#c9a227]">
            <IconGlobe className="h-4 w-4" />
          </span>
          Global Reach
        </div>
        <div className="glass-chip absolute right-[30%] top-[48%] rounded-[18px] px-3.5 py-2.5 text-[12px] font-semibold text-[#1c242c]">
          <span className="mb-1 flex text-[#c9a227]">
            <IconPeople className="h-4 w-4" />
          </span>
          Trusted Partner
        </div>
        <div className="glass-chip absolute right-[5%] top-[54%] rounded-[18px] px-3.5 py-2.5 text-[12px] font-semibold text-[#1c242c]">
          <span className="mb-1 flex text-[#c9a227]">
            <IconChart className="h-4 w-4" />
          </span>
          Real Business Impact
        </div>
        <p className="absolute bottom-[18%] right-[15%] rounded-full bg-white/75 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5c564c] backdrop-blur-md">
          Ideas · Technology · Growth
        </p>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-6 pt-4 sm:px-8 lg:px-10">
        <div className="glass-chip flex flex-col gap-5 rounded-[28px] px-5 py-4 sm:px-7 lg:flex-row lg:items-center">
          <ul className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-4">
            {HOME_TRUST_STATS.map((item, index) => {
              const Icon = STAT_ICONS[index];
              return (
                <li key={item.label} className="flex items-center gap-3 text-[#1c242c]">
                  <span className="text-[#c9a227]">
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
