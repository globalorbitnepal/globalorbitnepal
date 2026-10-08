import Image from "next/image";
import type { CSSProperties } from "react";
import type { ErpSuite } from "@/lib/orbit-software-page";
import { erpSuiteShot } from "@/lib/orbit-software-shots";

export function ErpProductShot({ suite, priority = false }: { suite: ErpSuite; priority?: boolean }) {
  const shot = erpSuiteShot(suite);
  const phone = shot.frame === "phone";

  return (
    <figure
      className={`erp-device-frame ${phone ? "is-phone" : "is-laptop"}`}
      style={{ "--erp-accent": suite.accent } as CSSProperties}
    >
      <div className="erp-device-lid">
        {phone ? <span className="erp-device-notch" aria-hidden="true" /> : <span className="erp-device-cam" aria-hidden="true" />}
        <div className="erp-device-screen">
          <Image
            src={shot.src}
            alt={`${suite.title} product interface`}
            width={shot.width}
            height={shot.height}
            quality={96}
            priority={priority}
            sizes={phone ? "(max-width: 700px) 220px, 260px" : "(max-width: 1024px) 92vw, 58vw"}
          />
        </div>
      </div>
      {phone ? null : <div className="erp-device-base" aria-hidden="true" />}
    </figure>
  );
}
