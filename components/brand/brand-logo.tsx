import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  priority?: boolean;
  variant?: "default" | "hero" | "bar" | "footer";
};

export function BrandLogo({ priority = false, variant = "default" }: BrandLogoProps) {
  const bar = variant === "bar";
  const hero = variant === "hero";
  const footer = variant === "footer";

  return (
    <Link
      href="/"
      className={`relative z-[2] block shrink-0 self-center ${
        bar
          ? "orbit-brand-logo-bar h-[clamp(5.75rem,9.4vw,9.25rem)] w-[clamp(18.5rem,28vw,30rem)]"
          : footer
            ? "orbit-footer-logo h-[clamp(4.5rem,6.5vw,7.25rem)] w-[min(100%,420px)] max-w-[min(420px,92vw)] sm:w-[min(380px,48vw)] lg:w-[min(420px,22vw)] xl:w-[420px]"
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
