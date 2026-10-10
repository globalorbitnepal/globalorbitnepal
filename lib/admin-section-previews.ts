import type { HeroConfig } from "@/lib/hero-config";
import type { NeedConfig } from "@/lib/need-config";
import type { WorkConfig } from "@/lib/work-config";
import type { SoftwareConfig } from "@/lib/software-config";
import type { CustomAppsConfig } from "@/lib/custom-apps-config";
import type { ProjectsConfig } from "@/lib/projects-config";
import type { AboutConfig } from "@/lib/about-config";
import type { CareersConfig } from "@/lib/careers-config";
import type { AdminPage, SectionId } from "@/lib/admin-nav";

export type SectionPreview = {
  mediaKind?: "image" | "video";
  mediaSrc?: string;
  posterSrc?: string;
  excerpt: string;
  mediaCount?: number;
};

type ContentBundle = {
  hero: HeroConfig;
  need: NeedConfig;
  work: WorkConfig;
  software: SoftwareConfig;
  about: AboutConfig;
  careers: CareersConfig;
  projects: ProjectsConfig;
  webApps: CustomAppsConfig;
  androidApps: CustomAppsConfig;
  iosApps: CustomAppsConfig;
};

function clip(text: string, max = 72) {
  const t = text.replace(/\s+/g, " ").trim();
  return t.length <= max ? t : `${t.slice(0, max - 1)}…`;
}

export function sectionPreviewForPage(
  page: AdminPage,
  sectionId: SectionId,
  content: ContentBundle,
): SectionPreview {
  if (sectionId === "seo") {
    return { excerpt: "Meta title, description, Open Graph, indexing" };
  }
  if (sectionId === "hub") {
    return { excerpt: `${page.sections.filter((s) => s.id !== "seo").length} editable blocks` };
  }

  switch (sectionId) {
    case "hero":
      return {
        mediaKind: content.hero.useVideo ? "video" : "image",
        mediaSrc: content.hero.useVideo ? content.hero.videoSrc : content.hero.imageSrc,
        posterSrc: content.hero.imageSrc,
        excerpt: clip(`${content.hero.headline} ${content.hero.headlineSecond}`),
        mediaCount: content.hero.trustLogos.length,
      };
    case "need":
      return {
        mediaKind: "video",
        mediaSrc: content.need.videoSrc,
        posterSrc: content.hero.imageSrc,
        excerpt: clip(content.need.slides[0]?.title || content.need.kicker),
        mediaCount: content.need.stats.length,
      };
    case "work": {
      const firstTile = content.work.tiles.find((t) => t.imageSrc);
      return {
        mediaKind: "image",
        mediaSrc: firstTile?.imageSrc,
        excerpt: clip(content.work.headline),
        mediaCount: content.work.tiles.length,
      };
    }
    case "homeSurface":
      return {
        excerpt: "Process, portfolio scroll, why us, reviews, FAQ, closing CTA",
      };
    case "software": {
      const first = content.software.products.find((p) => p.previewSrc);
      return {
        mediaKind: first?.previewSrc ? "image" : content.software.videoSrc ? "video" : undefined,
        mediaSrc: first?.previewSrc || content.software.videoSrc,
        excerpt: clip(content.software.headline),
        mediaCount: content.software.products.length,
      };
    }
    case "about":
      return {
        excerpt: clip(content.about.heroTitleBefore + " " + content.about.heroTitleAccent),
      };
    case "careers":
      return {
        excerpt: clip(content.careers.heroTitleBefore + " " + content.careers.heroTitleAccent),
        mediaCount: content.careers.roles.length,
      };
    case "projects": {
      const shot = content.projects.showcases.find((s) => s.imageSrc);
      return {
        mediaKind: shot?.imageSrc ? "image" : undefined,
        mediaSrc: shot?.imageSrc,
        excerpt: clip(content.projects.heroTitleBefore + " " + content.projects.heroTitleAccent),
        mediaCount: content.projects.showcases.length,
      };
    }
    case "customApps": {
      const cfg =
        page.platformSlug === "android-apps"
          ? content.androidApps
          : page.platformSlug === "ios-apps"
            ? content.iosApps
            : content.webApps;
      return {
        mediaKind: "video",
        mediaSrc: cfg.heroVideoSrc,
        posterSrc: content.hero.imageSrc,
        excerpt: clip(`${cfg.heroTitleBefore} ${cfg.heroTitleAccent}`),
        mediaCount: cfg.appVideos.length + 1,
      };
    }
    case "appointments":
      return { excerpt: "Appointment form submissions and inbox" };
    default:
      return { excerpt: "Edit live content" };
  }
}
