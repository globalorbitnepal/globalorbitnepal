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
          ? "h-[52px] w-[min(240px,64vw)] sm:h-[64px] sm:w-[240px]"
          : "h-[44px] w-[180px] sm:h-[52px] sm:w-[210px]"
      }`}
      aria-label="Global Orbit Pvt Ltd"
    >
      <Image
        src="/brand/logo-official-gold.png"
        alt="Global Orbit Pvt Ltd"
        width={600}
        height={400}
        priority={priority}
        unoptimized
        className="h-full w-full object-contain object-left"
      />
    </Link>
  );
}
