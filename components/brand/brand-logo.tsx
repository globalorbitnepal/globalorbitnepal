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
        className="h-[56px] w-[240px] object-contain object-left [filter:drop-shadow(0_0_0.7px_#1a1610)_drop-shadow(0_0_0.7px_#1a1610)_drop-shadow(0_1px_2px_rgba(20,16,10,0.2))]"
      />
    </Link>
  );
}
