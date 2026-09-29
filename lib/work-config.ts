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
    imageSrc: "/brand/places/himalaya.jpg",
    title: "Himalaya Grand",
    subtitle: "Book suite · NPR 18,500",
  },
  {
    slot: "col1-bottom",
    type: "phone-app",
    phoneTime: "12:08",
    appKicker: "TableLine POS",
    appTotal: "NPR 4,280",
    appLines: [
      { left: "Thakali set × 2", right: "1,800" },
      { left: "Momo platter", right: "650" },
      { left: "Service", right: "180" },
    ],
    appCta: "Close bill",
    appVariant: "default",
  },
  {
    slot: "col2-top",
    type: "browser-screen",
    chromeTitle: "lakeside-stay.com",
    imageSrc: "/brand/places/pagoda.jpg",
    nav: "Stay · Rooms · Book",
    title: "Lakeside Stay Pokhara",
    subtitle: "Direct booking · lakeside view",
  },
  {
    slot: "col2-mid",
    type: "dashboard",
    chromeTitle: "orbit-billing.app",
    dashStats: [
      { label: "Invoices", value: "128" },
      { label: "Collected", value: "NPR 9.4L" },
      { label: "GST", value: "On time" },
    ],
  },
  {
    slot: "col2-bottom",
    type: "browser-screen",
    chromeTitle: "annapurna-trails.com",
    imageSrc: "/brand/places/city.jpg",
    title: "Annapurna Trails",
    subtitle: "Seasonal itineraries · 4× sessions",
  },
  {
    slot: "col3-top",
    type: "browser-screen",
    chromeTitle: "citycare.hospital",
    imageSrc: "/brand/offices/nepal.jpg",
    nav: "Doctors · Appointments · Labs",
    title: "City Care Hospital",
    subtitle: "Schedules routed to the desk",
  },
  {
    slot: "col3-bottom",
    type: "seo",
    chromeTitle: "seo.globalorbitnepal.com",
    seoLabel: "Organic visibility",
    seoRank: "#1",
    seoKeyword: "hotel pokhara booking",
  },
  {
    slot: "col4-top",
    type: "phone-screen",
    phoneTime: "18:22",
    imageSrc: "/brand/studio-service-apps.jpg",
    title: "Partner portal",
    subtitle: "Dealer login · live orders",
  },
  {
    slot: "col4-bottom",
    type: "phone-app",
    phoneTime: "07:55",
    appKicker: "Wellness Spa",
    appTotal: "Today · 14",
    appLines: [
      { left: "Hot stone 10:00", right: "Booked" },
      { left: "Ayurveda 13:30", right: "Booked" },
      { left: "Steam 16:00", right: "Open" },
    ],
    appCta: "New booking",
    appVariant: "violet",
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
  "col1-top": "Column 1 · top phone screen",
  "col1-bottom": "Column 1 · bottom phone app",
  "col2-top": "Column 2 · top website",
  "col2-mid": "Column 2 · billing dashboard",
  "col2-bottom": "Column 2 · bottom website",
  "col3-top": "Column 3 · top website",
  "col3-bottom": "Column 3 · SEO tile",
  "col4-top": "Column 4 · top phone screen",
  "col4-bottom": "Column 4 · bottom phone app",
};
