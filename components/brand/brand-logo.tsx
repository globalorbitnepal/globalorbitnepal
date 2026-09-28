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
      className={`relative z-[2] block shrink-0 ${
        hero
          ? "h-[72px] w-[min(280px,72vw)] sm:h-[88px] sm:w-[min(360px,52vw)] lg:h-[96px] lg:w-[min(420px,26vw)] xl:h-[108px] xl:w-[min(480px,28vw)] 2xl:h-[112px] 2xl:w-[480px]"
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
