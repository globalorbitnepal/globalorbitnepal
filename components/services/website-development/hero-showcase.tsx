import Image from "next/image";
import type { WebsiteDevelopmentPageConfig } from "@/lib/website-development-page-config";

export function WebsiteDevHeroShowcase({ composition }: { composition: WebsiteDevelopmentPageConfig["heroComposition"] }) {
  return (
    <div className="wd-hero-composition wd-hero-enter">
      <Image
        src={composition.mainImage}
        alt="Conceptual website layout for a fictional brand"
        width={1280}
        height={720}
        priority
        quality={90}
        sizes="(max-width: 1024px) 88vw, 360px"
        className="wd-hero-main-img"
      />
      <p className="wd-hero-composition-caption">{composition.caption}</p>
    </div>
  );
}
