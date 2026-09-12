import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  priority?: boolean;
};

export function BrandLogo({ priority = false }: BrandLogoProps) {
  return (
    <Link
      href="/"
      className="relative block h-[58px] w-[276px] shrink-0"
      aria-label="Global Orbit Pvt Ltd"
    >
      <Image
        src="/brand/logo-clear.png"
        alt="Global Orbit Pvt Ltd"
        width={514}
        height={108}
        priority={priority}
        unoptimized
        className="h-[58px] w-[276px] object-contain object-left"
      />
    </Link>
  );
}
