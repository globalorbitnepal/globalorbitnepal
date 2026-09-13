import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  priority?: boolean;
};

export function BrandLogo({ priority = false }: BrandLogoProps) {
  return (
    <Link
      href="/"
      className="relative block h-[48px] w-[228px] shrink-0"
      aria-label="Global Orbit Pvt Ltd"
    >
      <Image
        src="/brand/logo-clear.png"
        alt="Global Orbit Pvt Ltd"
        width={514}
        height={108}
        priority={priority}
        unoptimized
      className="h-[48px] w-[228px] object-contain object-left drop-shadow-[0_8px_18px_rgba(0,0,0,0.35)]"
      />
    </Link>
  );
}
