import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  priority?: boolean;
};

export function BrandLogo({ priority = false }: BrandLogoProps) {
  return (
    <Link
      href="/"
      className="relative block h-[56px] w-[240px] shrink-0"
      aria-label="Global Orbit Pvt Ltd"
    >
      <Image
        src="/brand/logo-clear.png"
        alt="Global Orbit Pvt Ltd"
        width={240}
        height={56}
        priority={priority}
        className="h-[56px] w-[240px] object-contain object-left"
      />
    </Link>
  );
}
