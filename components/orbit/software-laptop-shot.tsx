import Image from "next/image";
import type { CSSProperties } from "react";
import { SOFTWARE_SHOT_HEIGHT, SOFTWARE_SHOT_WIDTH } from "@/lib/software-shots";

type Size = "hero" | "card";

export function SoftwareLaptopShot({
  src,
  alt,
  accent,
  size = "card",
  priority = false,
  cinema = false,
}: {
  src: string;
  alt: string;
  accent: string;
  size?: Size;
  priority?: boolean;
  cinema?: boolean;
}) {
  const hero = size === "hero";

  return (
    <figure
      className={`orbit-soft-laptop ${hero ? "is-hero" : "is-card"}${cinema ? " is-cinema" : ""}`}
      style={{ "--soft-accent": accent } as CSSProperties}
    >
      <div className="orbit-soft-laptop-bezel">
        <span className="orbit-soft-laptop-cam" aria-hidden="true" />
        <div className="orbit-soft-laptop-screen">
          <Image
            src={src}
            alt={alt}
            width={SOFTWARE_SHOT_WIDTH}
            height={SOFTWARE_SHOT_HEIGHT}
            quality={100}
            priority={priority}
            sizes={
              hero
                ? "(max-width: 768px) 94vw, (max-width: 1200px) 88vw, 1024px"
                : "(max-width: 720px) 92vw, (max-width: 1040px) 44vw, 30vw"
            }
            className="orbit-soft-laptop-img"
          />
        </div>
      </div>
      <div className="orbit-soft-laptop-base" aria-hidden="true">
        <span className="orbit-soft-laptop-notch" />
      </div>
    </figure>
  );
}
