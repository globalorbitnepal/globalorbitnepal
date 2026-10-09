import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  priority?: boolean;
  variant?: "default" | "hero" | "bar" | "footer";
  src?: string;
};

export function BrandLogo({ priority = false, variant = "default", src }: BrandLogoProps) {
  const imageSrc = src?.trim() || "/brand/logo-official-gold.png";
  const bar = variant === "bar";
  const hero = variant === "hero";
  const footer = variant === "footer";

  return (
    <Link
      href="/"
      className={`relative z-[2] block shrink-0 self-center ${
        bar
          ? "orbit-brand-logo-bar"
          : footer
            ? "orbit-footer-logo h-[clamp(5.4rem,7.8vw,8.7rem)] w-[min(100%,504px)] max-w-[min(504px,92vw)] sm:w-[min(456px,48vw)] lg:w-[min(504px,22vw)] xl:w-[504px]"
          : hero
            ? "h-[88px] w-[min(280px,78vw)] sm:h-[104px] sm:w-[min(340px,70vw)] lg:h-[118px] lg:w-[255px] xl:h-[128px] xl:w-[255px]"
            : "h-[56px] w-[220px] sm:h-[64px] sm:w-[260px]"
      }`}
      aria-label="Global Orbit Pvt Ltd"
    >
      <Image
        src={imageSrc}
        alt="Global Orbit Pvt Ltd"
        width={600}
        height={400}
        priority={priority}
        fetchPriority={priority ? "high" : "low"}
        loading={priority ? "eager" : "lazy"}
        unoptimized
        className={bar ? "orbit-brand-logo-bar-img" : "h-full w-full object-contain object-left"}
      />
    </Link>
  );
}
