import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ className = "", priority = false }: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={`relative block h-[58px] w-[168px] shrink-0 overflow-hidden sm:h-[64px] sm:w-[188px] ${className}`.trim()}
      aria-label="Global Orbit Pvt Ltd"
    >
      <Image
        src="/brand/logo.png"
        alt="Global Orbit Pvt Ltd"
        fill
        priority={priority}
        sizes="188px"
        className="scale-[1.72] object-contain object-center"
      />
    </Link>
  );
}
