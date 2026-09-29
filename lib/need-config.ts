export type NeedStat = {
  value: string;
  caption: string;
};

export type NeedSlide = {
  index: string;
  tag: string;
  title: string;
  accent: string;
  href: string;
};

export type NeedConfig = {
  kicker: string;
  knowMoreLabel: string;
  videoSrc: string;
  stats: NeedStat[];
  slides: NeedSlide[];
};

export const DEFAULT_NEED_STATS: NeedStat[] = [
  {
    value: "94%",
    caption: "Of first impressions about a business come from its design.",
  },
  {
    value: "3×",
    caption: "Increase in revenue is seen by businesses that switch from a website to an app.",
  },
  {
    value: "99%",
    caption: "Of users won’t reopen an app after a bad first experience.",
  },
  {
    value: "53%",
    caption: "Of mobile users will abandon an app if it takes more than 5 seconds to load.",
  },
];

export const DEFAULT_NEED_SLIDES: NeedSlide[] = [
  {
    index: "1",
    tag: "About Us",
    title:
      "We blend the power of strategy, design, and code to transform your vision into an app which keeps its users",
    accent: "HOOKED!",
    href: "/about",
  },
  {
    index: "2",
    tag: "Our Services",
    title: "With an in-house team of designers, developers and animators, we build applications that",
    accent: "STAND OUT from the crowd!",
    href: "/services",
  },
];

export const DEFAULT_NEED: NeedConfig = {
  kicker: "Why you need us!",
  knowMoreLabel: "Know More",
  videoSrc: "/brand/need-phone-reel.mp4",
  stats: DEFAULT_NEED_STATS,
  slides: DEFAULT_NEED_SLIDES,
};

function parseStat(raw: unknown, fallback: NeedStat): NeedStat {
  const data = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const str = (key: keyof NeedStat) => {
    const value = data[key];
    return typeof value === "string" && value.trim() ? value : fallback[key];
  };
  return { value: str("value"), caption: str("caption") };
}

function parseSlide(raw: unknown, fallback: NeedSlide): NeedSlide {
  const data = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const str = (key: keyof NeedSlide) => {
    const value = data[key];
    return typeof value === "string" && value.trim() ? value : fallback[key];
  };
  return {
    index: str("index"),
    tag: str("tag"),
    title: str("title"),
    accent: str("accent"),
    href: str("href"),
  };
}

export function parseNeedConfig(raw: unknown): NeedConfig {
  const data = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const str = (key: keyof NeedConfig, fallback: string) => {
    const value = data[key];
    return typeof value === "string" && value.trim() ? value : fallback;
  };
  const statsRaw = Array.isArray(data.stats) ? data.stats : [];
  const slidesRaw = Array.isArray(data.slides) ? data.slides : [];
  const stats = DEFAULT_NEED.stats.map((fallback, index) =>
    parseStat(statsRaw[index], fallback),
  );
  const slides = DEFAULT_NEED.slides.map((fallback, index) =>
    parseSlide(slidesRaw[index], fallback),
  );
  return {
    kicker: str("kicker", DEFAULT_NEED.kicker),
    knowMoreLabel: str("knowMoreLabel", DEFAULT_NEED.knowMoreLabel),
    videoSrc: str("videoSrc", DEFAULT_NEED.videoSrc),
    stats,
    slides,
  };
}
