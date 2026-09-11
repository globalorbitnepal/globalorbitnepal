import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "onDark" | "onDarkGhost" | "gold" | "goldOutline";
};

const variants: Record<NonNullable<ButtonLinkProps["variant"]>, string> = {
  primary:
    "bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-dark)]",
  ghost:
    "border border-[var(--color-line)] text-[var(--color-ink)] hover:bg-[var(--color-mist)]",
  onDark:
    "bg-[var(--color-copper)] text-[var(--color-hero)] hover:bg-[var(--color-copper-light)]",
  onDarkGhost:
    "border border-white/25 text-white hover:border-white/50 hover:bg-white/5",
  gold:
    "rounded-full bg-[var(--color-gold)] text-[#111] hover:bg-[var(--color-gold-light)]",
  goldOutline:
    "rounded-full border border-white/35 text-white hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium tracking-wide transition-colors duration-200 ${variants[variant]}`}
    >
      {children}
    </Link>
  );
}
