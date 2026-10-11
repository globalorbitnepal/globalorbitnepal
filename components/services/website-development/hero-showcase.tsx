import Image from "next/image";
import { WebsiteDemoBrowser } from "@/components/services/website-development/demo-browser";
import type { WebsiteDevelopmentPageConfig } from "@/lib/website-development-page-config";

export function WebsiteDevHeroShowcase({ composition }: { composition: WebsiteDevelopmentPageConfig["heroComposition"] }) {
  const satellites = composition.satellites.slice(0, 4);
  const satClass = ["wd-hero-sat--tl", "wd-hero-sat--tr", "wd-hero-sat--bl", "wd-hero-sat--br"];

  return (
    <div className="wd-hero-composition" aria-hidden="true">
      <div className="wd-hero-composition-glow" />
      {satellites.map((item, index) => (
        <div key={`${item.url}-${index}`} className={`wd-hero-sat ${satClass[index] ?? ""}`}>
          <div className="wd-hero-sat-chrome">
            <span />
            <span />
            <span />
            <em>{item.url}</em>
          </div>
          <div className="wd-hero-sat-screen">
            <Image
              src={item.src}
              alt={item.alt}
              width={640}
              height={400}
              sizes="(max-width: 768px) 28vw, 180px"
              quality={88}
            />
          </div>
        </div>
      ))}
      <div className="wd-hero-composition-main wd-hero-enter">
        <WebsiteDemoBrowser url={composition.mainBrowserUrl}>
          <Image
            src={composition.mainImage}
            alt=""
            width={1280}
            height={800}
            priority
            quality={92}
            sizes="(max-width: 768px) 92vw, (max-width: 1200px) 55vw, 640px"
            className="wd-hero-main-img"
          />
        </WebsiteDemoBrowser>
      </div>
      <p className="wd-hero-composition-caption">{composition.caption}</p>
    </div>
  );
}
