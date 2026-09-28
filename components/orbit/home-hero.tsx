import Link from "next/link";
import { HeroGlobePins } from "@/components/orbit/hero-flags";
import { OrbitHomeHeroMedia } from "@/components/orbit/home-hero-media";

const SERVICES = [
  { title: "Web Development", line: "Modern & Scalable", icon: "monitor" },
  { title: "ERP Software", line: "Business Automation", icon: "gear" },
  { title: "Cloud & Hosting", line: "Secure & Reliable", icon: "cloud" },
  { title: "Digital Growth", line: "SEO & Marketing", icon: "chart" },
] as const;

const STATS = [
  { value: "03+", label: "Studios", icon: "team" },
  { value: "25+", label: "Live Projects", icon: "code" },
  { value: "100+", label: "Happy Clients", icon: "users" },
  { value: "6+", label: "Years of Trust", icon: "award" },
] as const;

const MARKETS = [
  { code: "np", name: "Nepal" },
  { code: "in", name: "India" },
  { code: "us", name: "USA" },
] as const;

function ServiceIcon({ name }: { name: string }) {
  const props = {
    className: "h-8 w-8 shrink-0 text-[#f0c43a] sm:h-9 sm:w-9 lg:h-11 lg:w-11",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "monitor") {
    return (
      <svg {...props}>
        <rect x="2.5" y="4.5" width="19" height="13" rx="1.6" />
        <path d="M9 21h6M12 17.5V21" />
      </svg>
    );
  }
  if (name === "gear") {
    return (
      <svg {...props}>
        <circle cx="12" cy="12" r="3.2" />
        <path d="M12 2.6v2.6M12 18.8v2.6M2.6 12h2.6M18.8 12h2.6M5.3 5.3l1.9 1.9M16.8 16.8l1.9 1.9M18.7 5.3l-1.9 1.9M7.2 16.8l-1.9 1.9" />
      </svg>
    );
  }
  if (name === "cloud") {
    return (
      <svg {...props}>
        <path d="M7 18.5h10.2a3.9 3.9 0 0 0 .4-7.8A6.2 6.2 0 0 0 6 9.2 3.7 3.7 0 0 0 7 18.5z" />
      </svg>
    );
  }
  return (
    <svg {...props}>
      <path d="M4 20V11M9.3 20V5M14.7 20v-6.5M20 20V8" />
    </svg>
  );
}

function StatIcon({ name }: { name: string }) {
  const props = {
    className: "h-7 w-7 shrink-0 text-[#f0c43a] sm:h-8 sm:w-8 lg:h-10 lg:w-10",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "team") {
    return (
      <svg {...props}>
        <circle cx="8.6" cy="8.4" r="2.8" />
        <circle cx="16.2" cy="9.2" r="2.2" />
        <path d="M3.2 18.4a5.4 5.4 0 0 1 10.8 0M14.6 15.6a4.4 4.4 0 0 1 6.2 2.4" />
      </svg>
    );
  }
  if (name === "code") {
    return (
      <svg {...props}>
        <path d="m8.4 7.8-4.2 4.2 4.2 4.2M15.6 7.8l4.2 4.2-4.2 4.2M13.4 4.6l-2.8 14.8" />
      </svg>
    );
  }
  if (name === "users") {
    return (
      <svg {...props}>
        <circle cx="12" cy="8" r="3.1" />
        <path d="M5.4 19.2a6.6 6.6 0 0 1 13.2 0" />
      </svg>
    );
  }
  return (
    <svg {...props}>
      <circle cx="12" cy="8.4" r="4.4" />
      <path d="m8.6 13.4-1.4 7 4.8-2.6 4.8 2.6-1.4-7" />
    </svg>
  );
}

export function OrbitHomeHero() {
  return (
    <section
      className="orbit-home-hero relative isolate overflow-hidden bg-[#040a16] text-white lg:min-h-[calc(100svh-82px)]"
      aria-labelledby="home-hero-heading"
    >
      <div className="orbit-hero-stage">
        <OrbitHomeHeroMedia />
        <div className="orbit-hero-veil pointer-events-none absolute inset-0" />
        <div className="orbit-neural pointer-events-none absolute inset-0 opacity-[0.38]" />
        <div className="orbit-scan pointer-events-none absolute inset-0 opacity-80" />
        <div className="orbit-ai-orb orbit-ai-orb-cyan pointer-events-none" aria-hidden="true" />
        <div className="orbit-ai-orb orbit-ai-orb-gold pointer-events-none" aria-hidden="true" />
        <div className="orbit-hero-grain pointer-events-none absolute inset-0" />
        <div className="orbit-hero-vignette pointer-events-none absolute inset-0" />
        <div className="hidden lg:block">
          <HeroGlobePins />
        </div>
      </div>
      <div className="orbit-hero-scrim pointer-events-none absolute inset-0" />

      <div className="orbit-hero-content relative z-[1] mx-auto flex w-full max-w-[1600px] flex-col px-4 pb-24 sm:px-6 sm:pb-16 lg:min-h-[calc(100svh-82px)] lg:px-10 lg:pb-[clamp(1rem,2.4vh,2.25rem)] xl:px-14">
        <div className="orbit-hero-copy max-w-[43rem]">
          <p className="orbit-about-reveal orbit-hero-eyebrow text-[10px] font-semibold uppercase text-[#f0c43a] sm:text-[12px] lg:text-[13px]">
            Built for a brighter tomorrow
          </p>
          <h1
            id="home-hero-heading"
            className="orbit-about-reveal orbit-about-delay-1 orbit-hero-title-shadow mt-3 font-[family-name:var(--font-jakarta)] text-[clamp(2.05rem,8.4vw,5.15rem)] font-extrabold leading-[1.02] tracking-[-0.04em] sm:mt-4"
          >
            Digital Solutions
            <span className="mt-1 block">
              for a <span className="orbit-hero-gold">Global World</span>
            </span>
          </h1>
          <p className="orbit-about-reveal orbit-about-delay-2 mt-3 max-w-[34rem] text-[14px] leading-[1.7] text-white/88 sm:mt-[clamp(0.85rem,2.2vh,1.35rem)] sm:text-[15px] sm:leading-[1.75] lg:text-[16px]">
            We design and develop websites, web applications, ERP systems and digital solutions that help
            businesses grow, operate smarter and reach further — from local to global.
          </p>
          <ul className="mt-4 flex flex-wrap items-center gap-2 lg:hidden">
            {MARKETS.map((market) => (
              <li
                key={market.code}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-2.5 py-1.5 backdrop-blur-md"
              >
                <img
                  src={`https://flagcdn.com/w80/${market.code}.png`}
                  alt=""
                  className="h-5 w-5 rounded-full object-cover ring-1 ring-white/80"
                />
                <span className="text-[12px] font-semibold text-white">{market.name}</span>
              </li>
            ))}
          </ul>
          <div className="orbit-about-reveal orbit-hero-delay-3 mt-5 flex flex-col gap-3 sm:mt-[clamp(1.1rem,2.8vh,1.85rem)] sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Link
              href="/contact"
              className="group inline-flex h-12 w-full items-center justify-center gap-3 rounded-full bg-[#f0c43a] py-2 pl-6 pr-2 text-[15px] font-semibold text-[#1a1408] shadow-[0_16px_38px_rgba(240,196,58,0.38),0_0_0_1px_rgba(255,255,255,0.25)_inset] transition-[transform,background,box-shadow] hover:bg-[#ffe38a] hover:shadow-[0_20px_48px_rgba(240,196,58,0.45)] sm:h-[clamp(48px,6.4vh,56px)] sm:w-auto sm:justify-start sm:pl-7 lg:text-[16px]"
            >
              Start a project
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#12100a] text-[14px] text-[#f0c43a] transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
            <Link
              href="/projects"
              className="orbit-glass inline-flex h-12 w-full items-center justify-center gap-3 rounded-full py-2 pl-2 pr-6 text-[15px] font-semibold text-white sm:h-[clamp(48px,6.4vh,56px)] sm:w-auto sm:justify-start sm:pr-7 lg:text-[16px]"
            >
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[11px] text-[#0b1220]"
                aria-hidden="true"
              >
                ▶
              </span>
              View our work
            </Link>
          </div>
        </div>

        <div className="mt-10 lg:mt-auto lg:pt-[clamp(1rem,3vh,3rem)]">
          <ul className="mx-auto grid w-full max-w-[980px] grid-cols-2 gap-y-5 sm:flex sm:flex-nowrap sm:justify-center">
            {SERVICES.map((item, index) => (
              <li
                key={item.title}
                className={`flex items-center gap-3 px-1.5 sm:w-auto sm:flex-1 sm:justify-center sm:gap-3.5 sm:px-3 ${
                  index === 0 ? "" : "sm:border-l sm:border-white/20"
                }`}
              >
                <ServiceIcon name={item.icon} />
                <span>
                  <span className="block text-[12px] font-semibold sm:text-[14px] lg:text-[15px]">
                    {item.title}
                  </span>
                  <span className="block text-[10px] text-white/65 sm:text-[12px] lg:text-[13px]">
                    {item.line}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <dl className="orbit-glass-strong orbit-about-reveal orbit-hero-delay-5 mx-auto mt-5 grid w-full max-w-[980px] grid-cols-2 overflow-hidden rounded-[22px] px-1 py-3 sm:mt-[clamp(0.75rem,2.2vh,2rem)] sm:grid-cols-4 sm:rounded-[28px] sm:px-6 sm:py-[clamp(0.75rem,1.9vh,1.5rem)]">
            {STATS.map((item, index) => (
              <div
                key={item.label}
                className={`flex items-center justify-center gap-2.5 px-2 py-3 sm:gap-3.5 sm:py-0 ${
                  index === 0 ? "" : "sm:border-l sm:border-white/18"
                } ${index % 2 === 1 ? "border-l border-white/12 sm:border-l-0" : ""} ${
                  index < 2 ? "border-b border-white/12 sm:border-b-0" : ""
                } ${index === 2 || index === 3 ? "sm:border-l sm:border-white/18" : ""}`}
              >
                <StatIcon name={item.icon} />
                <div>
                  <dt className="font-[family-name:var(--font-jakarta)] text-[20px] font-extrabold leading-none text-white sm:text-[26px] lg:text-[30px]">
                    {item.value}
                  </dt>
                  <dd className="mt-1 text-[8px] font-semibold uppercase tracking-[0.16em] text-white/80 sm:mt-1.5 sm:text-[10px] lg:text-[11px]">
                    {item.label}
                  </dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex items-end justify-between gap-4 pr-16 sm:mt-[clamp(0.75rem,2.2vh,1.75rem)] sm:gap-6 sm:pr-0">
            <p className="flex items-center gap-3 text-[8px] font-semibold uppercase tracking-[0.24em] text-white/70 sm:gap-4 sm:text-[10px] sm:tracking-[0.32em]">
              Explore a smarter tomorrow
              <span className="hidden h-px w-20 bg-white/45 sm:block" />
            </p>
            <p className="max-w-[46%] text-right font-[family-name:var(--font-script)] text-[clamp(18px,5.2vw,38px)] leading-[1.12] text-white sm:max-w-none lg:mr-16">
              Building
              <span className="block">a Smarter</span>
              <span className="relative inline-block">
                Tomorrow
                <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-[#f0c43a]" aria-hidden="true" />
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
