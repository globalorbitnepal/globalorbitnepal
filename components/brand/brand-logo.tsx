import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  priority?: boolean;
  variant?: "default" | "hero";
};

export function BrandLogo({ priority = false, variant = "default" }: BrandLogoProps) {
  const hero = variant === "hero";

  return (
    <Link
      href="/"
      className={`relative block shrink-0 ${
        hero
          ? "h-10 w-[172px] sm:h-12 sm:w-[210px] lg:h-[52px] lg:w-[248px]"
          : "h-9 w-[158px] sm:h-11 sm:w-[200px] lg:h-[48px] lg:w-[228px]"
      }`}
      aria-label="Global Orbit Pvt Ltd"
    >
      <Image
        src="/brand/logo-clear.png"
        alt="Global Orbit Pvt Ltd"
        width={514}
        height={108}
        priority={priority}
        unoptimized
        className={`object-contain object-left drop-shadow-[0_8px_22px_rgba(0,0,0,0.45)] ${
          hero
            ? "h-10 w-[172px] sm:h-12 sm:w-[210px] lg:h-[52px] lg:w-[248px]"
            : "h-9 w-[158px] sm:h-11 sm:w-[200px] lg:h-[48px] lg:w-[228px]"
        }`}
      />
    </Link>
  );
}
