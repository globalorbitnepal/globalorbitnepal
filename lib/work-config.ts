export type WorkAppLine = {
  left: string;
  right: string;
};

export type WorkDashStat = {
  label: string;
  value: string;
};

export type WorkTile = {
  slot: string;
  type: "phone-screen" | "phone-app" | "browser-screen" | "dashboard" | "seo";
  phoneTime?: string;
  imageSrc?: string;
  chromeTitle?: string;
  nav?: string;
  title?: string;
  subtitle?: string;
  appKicker?: string;
  appTotal?: string;
  appLines?: WorkAppLine[];
  appCta?: string;
  appVariant?: "default" | "violet";
  dashStats?: WorkDashStat[];
  seoLabel?: string;
  seoRank?: string;
  seoKeyword?: string;
};

export type WorkConfig = {
  badgeNum: string;
  badgeLabel: string;
  headline: string;
  madeLabel: string;
  tiles: WorkTile[];
};

export const WORK_TILE_SLOTS = [
  "col1-top",
  "col1-bottom",
  "col2-top",
  "col2-mid",
  "col2-bottom",
  "col3-top",
  "col3-bottom",
  "col4-top",
  "col4-bottom",
] as const;

export type WorkTileSlot = (typeof WORK_TILE_SLOTS)[number];

const DEFAULT_TILES: WorkTile[] = [
  {
    slot: "col1-top",
    type: "phone-screen",
    phoneTime: "09:41",
    imageSrc: "/brand/work/zen-spa.jpg",
    title: "Zen Spa",
    subtitle: "Healing centre · Kathmandu",
  },
  {
    slot: "col1-bottom",
    type: "phone-screen",
    phoneTime: "18:22",
    imageSrc: "/brand/work/kaya-spa.jpg",
    title: "Kaya Healing Spa",
    subtitle: "Wellness · bookings",
  },
  {
    slot: "col2-top",
    type: "browser-screen",
    chromeTitle: "summitseek.com",
    imageSrc: "/brand/work/summit-seek.jpg",
    title: "Summit Seek",
    subtitle: "Himalayan treks · peak climbs",
  },
  {
    slot: "col2-mid",
    type: "browser-screen",
    chromeTitle: "ambitionholidays.com",
    imageSrc: "/brand/work/ambition-holidays.jpg",
    title: "Ambition Holidays",
    subtitle: "Luxury tour & trek",
  },
  {
    slot: "col2-bottom",
    type: "browser-screen",
    chromeTitle: "marlohotels.com",
    imageSrc: "/brand/work/marlo-hotels.jpg",
    title: "Marlo Hotels",
    subtitle: "Rooms · dining · spa",
  },
  {
    slot: "col3-top",
    type: "browser-screen",
    chromeTitle: "hotelthamelpark.com",
    imageSrc: "/brand/work/thamel-hotel.jpg",
    title: "Hotel Thamel Park",
    subtitle: "Rooms · dining · events",
  },
  {
    slot: "col3-bottom",
    type: "browser-screen",
    chromeTitle: "hotelthamelparkspa.com",
    imageSrc: "/brand/work/thamel-spa.jpg",
    title: "Thamel Park & Spa",
    subtitle: "Luxury wellness · Kathmandu",
  },
  {
    slot: "col4-top",
    type: "phone-screen",
    phoneTime: "11:08",
    imageSrc: "/brand/work/ambition-holidays.jpg",
    title: "Ambition Holidays",
    subtitle: "Luxury tour & trek",
  },
  {
    slot: "col4-bottom",
    type: "phone-screen",
    phoneTime: "07:55",
    imageSrc: "/brand/work/thamel-spa.jpg",
    title: "Thamel Park & Spa",
    subtitle: "Reserve your experience",
  },
];

export const DEFAULT_WORK: WorkConfig = {
  badgeNum: "3",
  badgeLabel: "What we do",
  headline: "Helped businesses transform ideas into intuitive designs.",
  madeLabel: "Made at Global Orbit",
  tiles: DEFAULT_TILES,
};

function parseLines(raw: unknown, fallback: WorkAppLine[]): WorkAppLine[] {
  if (!Array.isArray(raw)) return fallback;
  return fallback.map((fb, i) => {
    const row = raw[i];
    const data = row && typeof row === "object" ? (row as Record<string, unknown>) : {};
    const left = typeof data.left === "string" && data.left.trim() ? data.left : fb.left;
    const right = typeof data.right === "string" && data.right.trim() ? data.right : fb.right;
    return { left, right };
  });
}

function parseDashStats(raw: unknown, fallback: WorkDashStat[]): WorkDashStat[] {
  if (!Array.isArray(raw)) return fallback;
  return fallback.map((fb, i) => {
    const row = raw[i];
    const data = row && typeof row === "object" ? (row as Record<string, unknown>) : {};
    const label = typeof data.label === "string" && data.label.trim() ? data.label : fb.label;
    const value = typeof data.value === "string" && data.value.trim() ? data.value : fb.value;
    return { label, value };
  });
}

function parseTile(raw: unknown, fallback: WorkTile): WorkTile {
  const data = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const str = (key: keyof WorkTile): string | undefined => {
    const value = data[key];
    if (typeof value === "string" && value.trim()) return value;
    const fb = fallback[key];
    return typeof fb === "string" ? fb : undefined;
  };
  const typeRaw = data.type;
  const type =
    typeRaw === "phone-screen" ||
    typeRaw === "phone-app" ||
    typeRaw === "browser-screen" ||
    typeRaw === "dashboard" ||
    typeRaw === "seo"
      ? typeRaw
      : fallback.type;
  const variantRaw = data.appVariant;
  const appVariant =
    variantRaw === "violet" || variantRaw === "default" ? variantRaw : fallback.appVariant;

  return {
    slot: fallback.slot,
    type,
    phoneTime: str("phoneTime"),
    imageSrc: str("imageSrc"),
    chromeTitle: str("chromeTitle"),
    nav: str("nav"),
    title: str("title"),
    subtitle: str("subtitle"),
    appKicker: str("appKicker"),
    appTotal: str("appTotal"),
    appLines: parseLines(data.appLines, fallback.appLines || []),
    appCta: str("appCta"),
    appVariant,
    dashStats: parseDashStats(data.dashStats, fallback.dashStats || []),
    seoLabel: str("seoLabel"),
    seoRank: str("seoRank"),
    seoKeyword: str("seoKeyword"),
  };
}

export function parseWorkConfig(raw: unknown): WorkConfig {
  const data = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const str = (key: keyof WorkConfig, fallback: string) => {
    const value = data[key];
    return typeof value === "string" && value.trim() ? value : fallback;
  };
  const tilesRaw = Array.isArray(data.tiles) ? data.tiles : [];
  const tiles = DEFAULT_WORK.tiles.map((fallback, index) => {
    const bySlot = tilesRaw.find(
      (t) => t && typeof t === "object" && (t as WorkTile).slot === fallback.slot,
    );
    return parseTile(bySlot ?? tilesRaw[index], fallback);
  });
  return {
    badgeNum: str("badgeNum", DEFAULT_WORK.badgeNum),
    badgeLabel: str("badgeLabel", DEFAULT_WORK.badgeLabel),
    headline: str("headline", DEFAULT_WORK.headline),
    madeLabel: str("madeLabel", DEFAULT_WORK.madeLabel),
    tiles,
  };
}

export function workTileBySlot(config: WorkConfig, slot: WorkTileSlot): WorkTile {
  return config.tiles.find((t) => t.slot === slot) ?? DEFAULT_WORK.tiles.find((t) => t.slot === slot)!;
}

export const WORK_TILE_LABELS: Record<WorkTileSlot, string> = {
  "col1-top": "Column 1 · top website",
  "col1-bottom": "Column 1 · bottom website",
  "col2-top": "Column 2 · top website",
  "col2-mid": "Column 2 · middle website",
  "col2-bottom": "Column 2 · bottom website",
  "col3-top": "Column 3 · top website",
  "col3-bottom": "Column 3 · bottom website",
  "col4-top": "Column 4 · top website",
  "col4-bottom": "Column 4 · bottom website",
};
