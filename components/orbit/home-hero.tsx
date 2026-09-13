import Image from "next/image";
import Link from "next/link";

const MAP = { width: 1024, height: 585 } as const;

const PINS = [
  { code: "np", name: "Nepal", x: 550, y: 236 },
  { code: "in", name: "India", x: 538, y: 318 },
  { code: "us", name: "USA", x: 868, y: 246 },
] as const;

const SERVICES = [
  { title: "Web Development", line: "Modern & Scalable", icon: "web" },
  { title: "ERP Software", line: "Business Automation", icon: "erp" },
  { title: "Cloud & Hosting", line: "Secure & Reliable", icon: "cloud" },
  { title: "Digital Growth", line: "SEO & Marketing", icon: "growth" },
] as const;

const STATS = [
  { value: "03+", label: "Studios", icon: "people" },
  { value: "25+", label: "Live Projects", icon: "code" },
  { value: "100+", label: "Happy Clients", icon: "users" },
  { value: "6+", label: "Years of Trust", icon: "award" },
] as const;

function ServiceIcon({ name }: { name: string }) {
  const common = "h-8 w-8 text-[#f0c43a]";
  if (name === "web") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <rect x="3" y="5" width="18" height="13" rx="1.5" />
        <path d="M8 21h8M12 18v3" />
      </svg>
    );
  }
  if (name === "erp") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
      </svg>
    );
  }
  if (name === "cloud") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <path d="M7 18h10a4 4 0 0 0 .4-8 6 6 0 0 0-11.5-1.6A3.5 3.5 0 0 0 7 18z" />
      </svg>
    );
  }
  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M4 19V10l4 3 4-8 4 8 4-3v9H4z" />
    </svg>
  );
}

function StatIcon({ name }: { name: string }) {
  const common = "h-7 w-7 text-[#f0c43a]";
  if (name === "people") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <circle cx="9" cy="8" r="3" />
        <circle cx="16" cy="9" r="2.4" />
        <path d="M3.5 19a5.5 5.5 0 0 1 11 0M14 16.5a4.5 4.5 0 0 1 6.5 2.5" />
      </svg>
    );
  }
  if (name === "code") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13 5l-2 14" />
      </svg>
    );
  }
  if (name === "users") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <circle cx="12" cy="8" r="3" />
        <path d="M5 19a7 7 0 0 1 14 0" />
      </svg>
    );
  }
  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <circle cx="12" cy="8" r="3" />
      <path d="M8 21 12 11l4 10-4-2-4 2z" />
    </svg>
  );
}

function GlobeFlags() {
  const size = 34;
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox={`0 0 ${MAP.width} ${MAP.height}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        {PINS.map((pin) => (
          <clipPath id={`flag-clip-${pin.code}`} key={pin.code}>
            <circle cx={pin.x} cy={pin.y} r={size / 2} />
          </clipPath>
        ))}
      </defs>
      {PINS.map((pin) => (
        <g key={pin.code}>
          <circle cx={pin.x} cy={pin.y} r={size / 2 + 2.5} fill="rgba(4,12,28,0.55)" stroke="rgba(255,255,255,0.85)" strokeWidth="1.6" />
          <image
            href={`https://flagcdn.com/w80/${pin.code}.png`}
            x={pin.x - size / 2}
            y={pin.y - size / 2}
            width={size}
            height={size}
            clipPath={`url(#flag-clip-${pin.code})`}
            preserveAspectRatio="xMidYMid slice"
          />
          <text
            x={pin.x + size / 2 + 8}
            y={pin.y + 5}
            fill="white"
            fontSize="15"
            fontWeight="700"
            style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
          >
            {pin.name}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function OrbitHomeHero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden text-white" aria-labelledby="home-hero-heading">
      <Image
        src="/brand/hero-earth.jpg"
        alt=""
        fill
        priority
        unoptimized
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#040c1c]/70 via-[#040c1c]/18 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#06122e] to-transparent" />
      <GlobeFlags />

      <div className="relative z-[1] mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-between px-5 pb-8 pt-28 lg:px-10 lg:pb-10 lg:pt-32">
        <div className="max-w-[560px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#f0c43a]">Built for a brighter tomorrow</p>
          <h1
            id="home-hero-heading"
            className="mt-4 font-[family-name:var(--font-jakarta)] text-[42px] font-extrabold leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-[68px]"
          >
            Digital Solutions
            <span className="mt-1 block text-[#f0c43a]">for a Global World</span>
          </h1>
          <p className="mt-5 max-w-[460px] text-[15px] leading-7 text-white/82">
            We design and develop websites, web applications, ERP systems and digital solutions that help businesses grow,
            operate smarter and reach further — from local to global.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-[#f0c43a] px-7 text-[14px] font-semibold text-[#1a1408]"
            >
              Start a project
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/projects"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/35 bg-white/5 px-6 text-[14px] font-semibold text-white backdrop-blur-md"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/40" aria-hidden="true">
                ▶
              </span>
              View our work
            </Link>
          </div>
        </div>

        <div className="mt-16">
          <ul className="mx-auto flex max-w-4xl flex-wrap items-start justify-center gap-x-10 gap-y-6">
            {SERVICES.map((item) => (
              <li key={item.title} className="flex items-start gap-3 text-left">
                <ServiceIcon name={item.icon} />
                <span>
                  <span className="block text-[14px] font-semibold">{item.title}</span>
                  <span className="block text-[12px] text-white/65">{item.line}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mx-auto mt-7 max-w-[820px] rounded-[28px] border border-white/18 bg-[#071018]/45 px-4 py-4 backdrop-blur-md sm:px-8">
            <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:divide-x sm:divide-white/15">
              {STATS.map((item) => (
                <div key={item.label} className="flex items-center justify-center gap-3 px-2">
                  <StatIcon name={item.icon} />
                  <div>
                    <dt className="font-[family-name:var(--font-jakarta)] text-[22px] font-extrabold text-[#f0c43a]">{item.value}</dt>
                    <dd className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/75">{item.label}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-6 flex items-end justify-between gap-4">
            <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/70">
              Explore a smarter tomorrow
              <span className="hidden h-px w-16 bg-white/50 sm:block" />
            </p>
            <p className="font-[family-name:var(--font-script)] text-2xl leading-none text-white sm:text-[32px]">
              Building
              <span className="block">a Smarter</span>
              <span className="block">Tomorrow</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
