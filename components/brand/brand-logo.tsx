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
          ? "h-[80px] w-[min(320px,78vw)] sm:h-[96px] sm:w-[min(400px,55vw)] lg:h-[108px] lg:w-[min(460px,30vw)] xl:h-[120px] xl:w-[min(520px,32vw)] 2xl:h-[128px] 2xl:w-[560px]"
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
