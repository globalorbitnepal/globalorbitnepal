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

/** Metaminds work_grid-wrap tile order (4-column bento). */
export const WORK_BENTO_ORDER: WorkTileSlot[] = [
  "col1-top",
  "col2-top",
  "col3-top",
  "col4-top",
  "col1-bottom",
  "col2-mid",
  "col3-bottom",
  "col4-bottom",
];

const DEFAULT_TILES: WorkTile[] = [
  {
    slot: "col1-top",
    type: "browser-screen",
    chromeTitle: "atelierbakery.com",
    imageSrc: "/brand/work/work-bakery.jpg",
    title: "Atelier Bakery",
    subtitle: "Artisan cookies · editorial site",
  },
  {
    slot: "col1-bottom",
    type: "browser-screen",
    chromeTitle: "forma.studio",
    imageSrc: "/brand/work/work-architects.jpg",
    title: "Forma Studio",
    subtitle: "Architecture · interiors",
  },
  {
    slot: "col2-top",
    type: "browser-screen",
    chromeTitle: "journeystarts.here",
    imageSrc: "/brand/work/work-journey.jpg",
    title: "Journey Starts Here",
    subtitle: "Luxury travel brand",
  },
  {
    slot: "col2-mid",
    type: "browser-screen",
    chromeTitle: "northstar.ai",
    imageSrc: "/brand/work/work-ai-agenda.jpg",
    title: "Northstar AI",
    subtitle: "Strategy consulting",
  },
  {
    slot: "col2-bottom",
    type: "browser-screen",
    chromeTitle: "peaklodge.com",
    imageSrc: "/brand/work/work-resort.jpg",
    title: "Peak Lodge",
    subtitle: "Mountain resort",
  },
  {
    slot: "col3-top",
    type: "browser-screen",
    chromeTitle: "peaklodge.com",
    imageSrc: "/brand/work/work-resort.jpg",
    title: "Peak Lodge",
    subtitle: "Facilities · wedding",
  },
  {
    slot: "col3-bottom",
    type: "browser-screen",
    chromeTitle: "lumenrealty.com",
    imageSrc: "/brand/work/work-realty.jpg",
    title: "Lumen Realty",
    subtitle: "Property · interiors",
  },
  {
    slot: "col4-top",
    type: "browser-screen",
    chromeTitle: "orbitpulse.ai",
    imageSrc: "/brand/work/work-ai-saas.jpg",
    title: "Orbit Pulse",
    subtitle: "AI revenue platform",
  },
  {
    slot: "col4-bottom",
    type: "browser-screen",
    chromeTitle: "wildline.adventure",
    imageSrc: "/brand/work/work-adventure-mobile.jpg",
    title: "Wildline",
    subtitle: "Adventure sports",
  },
];

export const DEFAULT_WORK: WorkConfig = {
  badgeNum: "3",
  badgeLabel: "What we do",
  headline: "Websites we ship.",
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

  const imageSrcRaw = str("imageSrc");
  const stale =
    !imageSrcRaw ||
    /\/(zen-spa|kaya-spa|summit-seek|ambition-holidays|marlo-hotels|thamel-hotel|thamel-spa)\.jpg$/.test(
      imageSrcRaw,
    );

  return {
    slot: fallback.slot,
    type: stale ? fallback.type : type,
    phoneTime: str("phoneTime"),
    imageSrc: stale ? fallback.imageSrc : imageSrcRaw,
    chromeTitle: str("chromeTitle"),
    nav: str("nav"),
    title: stale ? fallback.title : str("title"),
    subtitle: stale ? fallback.subtitle : str("subtitle"),
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
    headline: str("headline", DEFAULT_WORK.headline).includes("transform ideas")
      ? DEFAULT_WORK.headline
      : str("headline", DEFAULT_WORK.headline),
    madeLabel: str("madeLabel", DEFAULT_WORK.madeLabel),
    tiles,
  };
}

export function workTileBySlot(config: WorkConfig, slot: WorkTileSlot): WorkTile {
  return config.tiles.find((t) => t.slot === slot) ?? DEFAULT_WORK.tiles.find((t) => t.slot === slot)!;
}

export function workSlidesOrdered(config: WorkConfig): WorkTile[] {
  return WORK_TILE_SLOTS.map((slot) => workTileBySlot(config, slot));
}

export const WORK_TILE_LABELS: Record<WorkTileSlot, string> = {
  "col1-top": "Wall · bakery site",
  "col1-bottom": "Wall · architecture site",
  "col2-top": "Wall · travel site",
  "col2-mid": "Wall · consulting site",
  "col2-bottom": "Wall · extra (hidden on mosaic)",
  "col3-top": "Wall · resort site",
  "col3-bottom": "Wall · realty site",
  "col4-top": "Wall · AI SaaS site",
  "col4-bottom": "Wall · adventure site",
};
