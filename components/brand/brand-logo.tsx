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
          ? "h-11 w-[168px] sm:h-12 sm:w-[196px] lg:h-[54px] lg:w-[220px]"
          : "h-10 w-[156px] sm:h-11 sm:w-[180px] lg:h-[50px] lg:w-[200px]"
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
        className={`h-full w-full object-contain object-left drop-shadow-[0_10px_24px_rgba(0,0,0,0.45)]`}
      />
    </Link>
  );
}
