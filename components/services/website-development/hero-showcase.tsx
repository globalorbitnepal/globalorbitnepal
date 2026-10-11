import Image from "next/image";
import { WebsiteDemoBrowser } from "@/components/services/website-development/demo-browser";

const SATELLITES = [
  { src: "/brand/website-demos/trek-hero.jpg", alt: "Trekking website concept preview", url: "trail.demo", className: "wd-hero-sat wd-hero-sat--tl" },
  { src: "/brand/website-demos/fashion-hero.jpg", alt: "E-commerce website concept preview", url: "shop.demo", className: "wd-hero-sat wd-hero-sat--tr" },
  { src: "/brand/website-demos/dine-hero.jpg", alt: "Restaurant website concept preview", url: "dine.demo", className: "wd-hero-sat wd-hero-sat--bl" },
  { src: "/brand/website-demos/saas-hero.jpg", alt: "SaaS marketing site concept preview", url: "app.demo", className: "wd-hero-sat wd-hero-sat--br" },
] as const;

export function WebsiteDevHeroShowcase() {
  return (
    <div className="wd-hero-composition" aria-hidden="true">
      <div className="wd-hero-composition-glow" />
      {SATELLITES.map((item) => (
        <div key={item.url} className={item.className}>
          <div className="wd-hero-sat-chrome">
            <span />
            <span />
            <span />
            <em>{item.url}</em>
          </div>
          <div className="wd-hero-sat-screen">
            <Image src={item.src} alt="" width={640} height={400} sizes="(max-width: 768px) 28vw, 180px" quality={88} />
          </div>
        </div>
      ))}
      <div className="wd-hero-composition-main wd-hero-enter">
        <WebsiteDemoBrowser url="yourbrand.com.np">
          <Image
            src="/brand/website-demos/lodge-hero.jpg"
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
      <p className="wd-hero-composition-caption">Conceptual layouts — fictional brands for demonstration</p>
    </div>
  );
}
