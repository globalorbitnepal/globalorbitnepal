import Image from "next/image";
import Link from "next/link";
import {
  HERO_FEATURE_ICONS,
  IconChart,
  IconGlobe,
  IconIdea,
  IconPeople,
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
  { className: "left-[6%] top-[18%]" },
  { className: "right-[4%] top-[22%]" },
  { className: "left-[2%] top-[58%]" },
  { className: "right-[0%] top-[62%]" },
] as const;

export function HomeHero() {
  return (
    <section
      className="relative isolate overflow-hidden bg-[#f4efe6] text-[#141c24]"
      aria-labelledby="home-hero-heading"
    >
      <div className="absolute inset-0">
        <Image
          src="/brand/hero-bright-office.jpg"
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[70%_40%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(250,246,238,0.96)_0%,rgba(250,246,238,0.88)_28%,rgba(250,246,238,0.42)_52%,rgba(250,246,238,0.12)_72%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.35)_0%,transparent_18%,transparent_78%,rgba(244,239,230,0.75)_100%)]" />
      </div>

      <div className="relative mx-auto grid max-w-[1600px] items-center gap-8 px-5 pb-6 pt-8 sm:px-8 lg:grid-cols-12 lg:gap-6 lg:px-10 lg:pt-10">
        <div className="lg:col-span-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#b38616]">
            {HOME_POSITIONING.eyebrow}
          </p>
          <h1
            id="home-hero-heading"
            className="mt-3 font-[family-name:var(--font-display)] text-[40px] font-medium leading-[1.05] tracking-[-0.035em] text-[#141c24] sm:text-[56px] xl:text-[64px]"
          >
            {HOME_POSITIONING.headlineLead}{" "}
            <span className="text-[#b38616]">{HOME_POSITIONING.headlineGold}</span>
            <span className="mt-1 block">{HOME_POSITIONING.headlineRest}</span>
          </h1>
          <p className="mt-5 max-w-[560px] text-[15px] leading-7 text-[#4a524c]">
            {HOME_POSITIONING.lede}
          </p>

          <ul className="mt-7 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {HOME_HERO_FEATURES.map((item) => {
              const Icon = HERO_FEATURE_ICONS[item.key];
              return (
                <li
                  key={item.key}
                  className="flex items-center gap-2.5 rounded-2xl border border-white/80 bg-white/55 px-3 py-3 shadow-[0_8px_24px_rgba(40,30,16,0.06)] backdrop-blur-xl"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#d4a017]/12 text-[#b38616]">
                    <Icon className="h-5 w-5" />
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

          <div className="mt-6" id="technologies">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#6b6458]">
              Technologies we work with
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {HOME_TECHNOLOGIES.map((name) => (
                <span
                  key={name}
                  className="inline-flex h-9 items-center rounded-full border border-white/80 bg-white/60 px-3.5 text-[12px] font-semibold text-[#1c242c] shadow-[0_4px_14px_rgba(40,30,16,0.05)] backdrop-blur-md"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={HOME_POSITIONING.primaryCta.href}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#d4a017] px-7 text-[14px] font-semibold text-[#1a1408] shadow-[0_10px_24px_rgba(180,140,20,0.22)]"
            >
              {HOME_POSITIONING.primaryCta.label}
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href={HOME_POSITIONING.secondaryCta.href}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#eadfcd] bg-white/55 px-7 text-[14px] font-semibold text-[#1c242c] backdrop-blur-md"
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
          <p className="mt-4 font-[family-name:var(--font-display)] text-[22px] italic text-[#1c242c]/80">
            {HOME_POSITIONING.script}
          </p>
        </div>

        <div className="relative min-h-[420px] lg:col-span-5 lg:min-h-[560px]" id="work">
          <div className="absolute inset-6 rounded-full bg-[#d4a017]/15 blur-3xl" />
          <Image
            src="/brand/hero-globe.png"
            alt=""
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="z-[1] object-contain object-center mix-blend-multiply drop-shadow-[0_30px_50px_rgba(40,30,16,0.18)]"
          />
          {HOME_ORBIT_CARDS.map((card, index) => {
            const Icon = ORBIT_ICONS[card.icon];
            return (
              <div
                key={card.title}
                className={`absolute z-10 max-w-[150px] rounded-2xl border border-white/80 bg-white/70 px-3 py-2.5 text-[12px] font-semibold text-[#1c242c] shadow-[0_12px_30px_rgba(40,30,16,0.1)] backdrop-blur-xl ${ORBIT_PLACES[index].className}`}
              >
                <span className="mb-1 inline-flex text-[#b38616]">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="block leading-snug">{card.title}</span>
              </div>
            );
          })}
          <p className="absolute bottom-2 left-1/2 z-10 w-max -translate-x-1/2 rounded-full border border-white/70 bg-white/65 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5c564c] backdrop-blur-md">
            Ideas · Technology · Growth
          </p>
        </div>
      </div>

      <div className="relative mx-auto max-w-[1600px] px-5 pb-8 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-5 rounded-[28px] border border-white/80 bg-white/60 px-5 py-5 shadow-[0_16px_40px_rgba(40,30,16,0.07)] backdrop-blur-2xl sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <ul className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-4">
            {HOME_TRUST_STATS.map((item) => (
              <li key={item.label} className="text-[#1c242c]">
                <p className="font-[family-name:var(--font-display)] text-[28px] leading-none">{item.value}</p>
                <p className="mt-1 text-[12px] font-medium text-[#5c564c]">{item.label}</p>
              </li>
            ))}
          </ul>
          <p className="shrink-0 text-right text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6b6458]">
            From Nepal
            <span className="mt-1 block tracking-[0.18em] text-[#1c242c]">To the world</span>
          </p>
        </div>
      </div>
    </section>
  );
}
