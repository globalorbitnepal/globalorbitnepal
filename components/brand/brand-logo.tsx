import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  priority?: boolean;
};

export function BrandLogo({ priority = false }: BrandLogoProps) {
  return (
    <Link
      href="/"
      className="relative block h-9 w-[158px] shrink-0 sm:h-11 sm:w-[200px] lg:h-[48px] lg:w-[228px]"
      aria-label="Global Orbit Pvt Ltd"
    >
      <Image
        src="/brand/logo-clear.png"
        alt="Global Orbit Pvt Ltd"
        width={514}
        height={108}
        priority={priority}
        unoptimized
        className="h-9 w-[158px] object-contain object-left drop-shadow-[0_8px_18px_rgba(0,0,0,0.35)] sm:h-11 sm:w-[200px] lg:h-[48px] lg:w-[228px]"
      />
    </Link>
  );
}
