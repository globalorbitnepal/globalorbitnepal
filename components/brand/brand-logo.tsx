import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  priority?: boolean;
};

export function BrandLogo({ priority = false }: BrandLogoProps) {
  return (
    <Link
      href="/"
      className="relative block h-[72px] w-[240px] shrink-0 overflow-hidden"
      aria-label="Global Orbit Pvt Ltd"
    >
      <Image
        src="/brand/logo.png"
        alt="Global Orbit Pvt Ltd"
        width={240}
        height={72}
        priority={priority}
        className="h-[72px] w-[240px] scale-[1.85] object-contain object-center"
      />
    </Link>
  );
}
