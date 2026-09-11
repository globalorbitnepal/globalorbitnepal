type IconProps = { className?: string };

export function IconGear({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 15.2A3.2 3.2 0 1 0 12 8.8a3.2 3.2 0 0 0 0 6.4Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M19.4 13a7.8 7.8 0 0 0 .1-2l2-1.5-2-3.5-2.4.5a8 8 0 0 0-1.7-1L15 3.2h-6l-.4 2.3a8 8 0 0 0-1.7 1L4.5 6l-2 3.5L4.4 11a7.8 7.8 0 0 0 0 2l-2 1.5 2 3.5 2.4-.5a8 8 0 0 0 1.7 1l.4 2.3h6l.4-2.3a8 8 0 0 0 1.7-1l2.4.5 2-3.5-1.9-1.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconServers({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="3" y="14" width="18" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6 7h.01M6 17h.01M9 7h4M9 17h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconChart({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 19V5M4 19h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8 15v-4M12 15V8M16 15v-7l3-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconShield({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconSearch({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function IconMail({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="m5 8 7 5 7-5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

export function IconCode({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13 5l-2 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconGrid({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function IconHeadset({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 13V11a7 7 0 0 1 14 0v2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="3.5" y="12" width="4" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="16.5" y="12" width="4" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M16.5 18v1a3 3 0 0 1-3 3H12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconPeople({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="8" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16" cy="9" r="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4.5 18c.4-2.8 2.4-4.2 4.5-4.2s4.1 1.4 4.5 4.2M13.5 18c.3-1.8 1.4-3 2.7-3 1.5 0 2.6 1.1 2.8 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconGlobe({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4.5 12h15M12 4c2.2 2.4 3.3 5 3.3 8s-1.1 5.6-3.3 8c-2.2-2.4-3.3-5-3.3-8s1.1-5.6 3.3-8Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function IconIdea({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 18h6M10 21h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 3a6 6 0 0 0-3.5 10.8c.6.5 1 1.2 1.1 2h4.8c.1-.8.5-1.5 1.1-2A6 6 0 0 0 12 3Z" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export const HERO_FEATURE_ICONS = {
  web: IconCode,
  seo: IconChart,
  erp: IconGrid,
  email: IconMail,
  audit: IconSearch,
  support: IconHeadset,
} as const;
