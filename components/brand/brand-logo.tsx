import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  priority?: boolean;
  variant?: "default" | "hero" | "bar";
};

export function BrandLogo({ priority = false, variant = "default" }: BrandLogoProps) {
  const bar = variant === "bar";
  const hero = variant === "hero";

  return (
    <Link
      href="/"
      className={`relative z-[2] block shrink-0 self-center ${
        bar
          ? "h-[52px] w-[min(220px,52vw)] sm:h-[56px] sm:w-[min(260px,44vw)] lg:h-[60px] lg:w-[220px] xl:w-[240px]"
          : hero
            ? "h-[88px] w-[min(280px,78vw)] sm:h-[104px] sm:w-[min(340px,70vw)] lg:h-[118px] lg:w-[255px] xl:h-[128px] xl:w-[255px]"
            : "h-[56px] w-[220px] sm:h-[64px] sm:w-[260px]"
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
