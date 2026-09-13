import Image from "next/image";
import Link from "next/link";
import { HeroGlobePins } from "@/components/orbit/hero-flags";

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

function ServiceIcon({ name }: { name: string }) {
  const props = {
    className: "h-8 w-8 shrink-0 text-[#f0c43a]",
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
    className: "h-7 w-7 shrink-0 text-[#f0c43a]",
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
      className="relative isolate min-h-[calc(100svh-84px)] overflow-hidden bg-[#040a16] text-white"
      aria-labelledby="home-hero-heading"
    >
      <div className="orbit-hero-stage">
        <Image
          src="/brand/hero-globe.jpg"
          alt="Earth seen from space above the Himalaya"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover"
        />
        <HeroGlobePins />
      </div>
      <div className="orbit-hero-scrim pointer-events-none absolute inset-0" />

      <div className="relative z-[1] mx-auto flex min-h-[calc(100svh-84px)] w-full max-w-[1600px] flex-col px-5 pb-7 pt-[calc(74.25vw+1.25rem)] md:pt-14 lg:px-10 lg:pb-9">
        <div className="max-w-[46rem]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#f0c43a] sm:text-[12px] lg:text-[13px]">
            Built for a brighter tomorrow
          </p>
          <h1
            id="home-hero-heading"
            className="mt-4 font-[family-name:var(--font-jakarta)] text-[clamp(2.2rem,4.9vw,5.4rem)] font-extrabold leading-[1.03] tracking-[-0.035em]"
          >
            Digital Solutions
            <span className="mt-1 block">
              for a <span className="text-[#f0c43a]">Global World</span>
            </span>
          </h1>
          <p className="mt-6 max-w-[34rem] text-[14px] leading-[1.85] text-white/85 sm:text-[15px] lg:text-[17px]">
            We design and develop websites, web applications, ERP systems and digital solutions that help
            businesses grow, operate smarter and reach further — from local to global.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex h-[56px] items-center gap-3 rounded-full bg-[#f0c43a] py-2 pl-7 pr-2 text-[15px] font-semibold text-[#1a1408] shadow-[0_16px_38px_rgba(240,196,58,0.32)] transition-colors hover:bg-[#ffe38a] lg:text-[16px]"
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
              className="orbit-glass inline-flex h-[56px] items-center gap-3 rounded-full py-2 pl-2 pr-7 text-[15px] font-semibold text-white lg:text-[16px]"
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

        <div className="mt-auto pt-12">
          <ul className="mx-auto flex w-full max-w-[980px] flex-wrap justify-center gap-y-6 sm:flex-nowrap">
            {SERVICES.map((item, index) => (
              <li
                key={item.title}
                className={`flex w-1/2 items-center gap-3.5 px-3 sm:w-auto sm:flex-1 sm:justify-center ${
                  index === 0 ? "" : "sm:border-l sm:border-white/20"
                }`}
              >
                <ServiceIcon name={item.icon} />
                <span>
                  <span className="block text-[13px] font-semibold sm:text-[14px] lg:text-[15px]">
                    {item.title}
                  </span>
                  <span className="block text-[11px] text-white/65 sm:text-[12px] lg:text-[13px]">
                    {item.line}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <dl className="orbit-glass mx-auto mt-8 grid w-full max-w-[980px] grid-cols-2 rounded-[28px] px-3 py-5 sm:grid-cols-4 sm:px-6 sm:py-6">
            {STATS.map((item, index) => (
              <div
                key={item.label}
                className={`flex items-center justify-center gap-3.5 px-2 py-2 sm:py-0 ${
                  index === 0 ? "" : "sm:border-l sm:border-white/18"
                }`}
              >
                <StatIcon name={item.icon} />
                <div>
                  <dt className="font-[family-name:var(--font-jakarta)] text-[22px] font-extrabold leading-none text-[#f0c43a] sm:text-[26px] lg:text-[30px]">
                    {item.value}
                  </dt>
                  <dd className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/80 sm:text-[10px] lg:text-[11px]">
                    {item.label}
                  </dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="mt-7 flex items-end justify-between gap-6">
            <p className="flex items-center gap-4 text-[9px] font-semibold uppercase tracking-[0.32em] text-white/70 sm:text-[10px]">
              Explore a smarter tomorrow
              <span className="hidden h-px w-20 bg-white/45 sm:block" />
            </p>
            <p className="text-right font-[family-name:var(--font-script)] text-[26px] leading-[1.15] text-white sm:text-[34px] lg:mr-16 lg:text-[40px]">
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
