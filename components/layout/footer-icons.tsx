import type { ReactNode } from "react";

type IconProps = { className?: string };

function IconShell({ className, children, tone }: IconProps & { tone: "gold" | "blue"; children: ReactNode }) {
  return (
    <span
      className={`orbit-footer-link-icon orbit-footer-link-icon-${tone}${className ? ` ${className}` : ""}`}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

export function FooterExploreIcon({ id }: { id: string }) {
  const stroke = "#f0c43a";
  const common = { fill: "none", stroke, strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  const icons: Record<string, ReactNode> = {
    home: (
      <svg viewBox="0 0 24 24">
        <path {...common} d="M4 10.5 12 4l8 6.5V20a1.5 1.5 0 0 1-1.5 1.5H15v-6H9v6H5.5A1.5 1.5 0 0 1 4 20v-9.5z" />
      </svg>
    ),
    website: (
      <svg viewBox="0 0 24 24">
        <path {...common} d="M4 7h16v12H4zM8 7V5h8v2M9 11h6" />
      </svg>
    ),
    hotel: (
      <svg viewBox="0 0 24 24">
        <path {...common} d="M5 19V5h6v14M11 10h8v9M5 19h14" />
      </svg>
    ),
    trek: (
      <svg viewBox="0 0 24 24">
        <path {...common} d="m4 18 6-8 4 5 6-9 4 6" />
      </svg>
    ),
    restaurant: (
      <svg viewBox="0 0 24 24">
        <path {...common} d="M8 4v8M6 4v4M10 4v4M8 12v8M16 4v16" />
      </svg>
    ),
    ecommerce: (
      <svg viewBox="0 0 24 24">
        <path {...common} d="M6 6h15l-1.5 9h-12zM9 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM18 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
      </svg>
    ),
    about: (
      <svg viewBox="0 0 24 24">
        <path {...common} d="M8 11a4 4 0 1 1 8 0M6 19c.8-2.5 3-4 6-4s5.2 1.5 6 4" />
      </svg>
    ),
    contact: (
      <svg viewBox="0 0 24 24">
        <path {...common} d="M4 7.5 12 13l8-5.5V18a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18V7.5z" />
      </svg>
    ),
  };

  return <IconShell tone="gold">{icons[id] ?? icons.home}</IconShell>;
}

export function FooterServiceIcon({ id }: { id: string }) {
  const stroke = "#60a5fa";
  const common = { fill: "none", stroke, strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  const icons: Record<string, ReactNode> = {
    website: (
      <svg viewBox="0 0 24 24">
        <path {...common} d="M8 8h8M8 12h8M8 16h5M6 4h12v16H6z" />
      </svg>
    ),
    custom: (
      <svg viewBox="0 0 24 24">
        <path {...common} d="M12 3v3M12 18v3M3 12h3M18 12h3M6.2 6.2l2.1 2.1M15.7 15.7l2.1 2.1M17.8 6.2l-2.1 2.1M8.5 15.7l-2.1 2.1" />
      </svg>
    ),
    web: (
      <svg viewBox="0 0 24 24">
        <path {...common} d="M4 7h16v10H4zM4 11h16M9 7V5h6v2" />
      </svg>
    ),
    erp: (
      <svg viewBox="0 0 24 24">
        <path {...common} d="M5 19V9h4v10M10 19V5h4v14M15 19v-6h4v6" />
      </svg>
    ),
    seo: (
      <svg viewBox="0 0 24 24">
        <path {...common} d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-4-4" />
      </svg>
    ),
    local: (
      <svg viewBox="0 0 24 24">
        <path {...common} d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10zM12 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
      </svg>
    ),
    products: (
      <svg viewBox="0 0 24 24">
        <path {...common} d="M4 8h16v10H4zM8 8V6h8v2M8 14h8" />
      </svg>
    ),
  };

  return <IconShell tone="blue">{icons[id] ?? icons.website}</IconShell>;
}

export function FooterStatIcon({ kind }: { kind: "rocket" | "clients" | "star" }) {
  const stroke = "#f0c43a";
  const common = { fill: "none", stroke, strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (kind === "rocket") {
    return (
      <span className="orbit-footer-stat-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path {...common} d="M12 3c2 4 2 8 0 12M8 11l-4 1 1 4M16 11l4 1-1 4M9 15h6" />
        </svg>
      </span>
    );
  }
  if (kind === "clients") {
    return (
      <span className="orbit-footer-stat-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path {...common} d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM16 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM4 19c.6-2.2 2.4-4 4-4s3.4 1.8 4 4M14 19c.5-1.6 1.8-3 3.5-3.2" />
        </svg>
      </span>
    );
  }
  return (
    <span className="orbit-footer-stat-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path {...common} d="M12 3.5l2.2 4.5 4.9.7-3.55 3.5.84 4.9L12 14.8l-4.39 2.3.84-4.9L4.9 8.7l4.9-.7L12 3.5z" />
      </svg>
    </span>
  );
}

export function FooterPinIcon() {
  return (
    <span className="orbit-footer-pin-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z"
          stroke="#f0c43a"
          strokeWidth="1.5"
        />
        <circle cx="12" cy="11" r="2" fill="#f0c43a" />
      </svg>
    </span>
  );
}

export function FooterEnvelopeHero() {
  return (
    <span className="orbit-footer-mail-hero" aria-hidden="true">
      <span className="orbit-footer-mail-cube">
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M4 8.5 12 14l8-5.5V18a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18V8.5z"
            stroke="#f0c43a"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </span>
  );
}
