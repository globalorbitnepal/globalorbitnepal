type IconProps = { className?: string };

export function FooterMailIcon({ className }: IconProps) {
  return (
    <span className={`orbit-footer-chip-icon orbit-footer-chip-icon-mail${className ? ` ${className}` : ""}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M4 8.5 12 14l8-5.5V18a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18V8.5z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function FooterWebmailIcon({ className }: IconProps) {
  return (
    <span className={`orbit-footer-chip-icon orbit-footer-chip-icon-webmail${className ? ` ${className}` : ""}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M5 19V9l7-4 7 4v10H5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9 14h6M9 11h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function FooterWhatsAppIcon({ className }: IconProps) {
  return (
    <span className={`orbit-footer-chip-icon orbit-footer-chip-icon-wa${className ? ` ${className}` : ""}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M9.2 9.4c.2-.5.5-.5.8-.5h.7c.2 0 .4.1.5.4l.5 1.2c.1.2 0 .5-.2.6l-.6.5c.4.8 1 1.4 1.8 1.8l.5-.6c.2-.2.4-.2.6-.1l1.2.5c.3.1.4.3.4.5v.7c0 .3-.1.6-.5.8-.6.4-1.4.5-2.4.1-1.2-.5-2.4-1.6-3.3-2.5-.9-.9-2-2.1-2.5-3.3-.4-1-.3-1.8.1-2.4z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

export function FooterInstallIcon({ className }: IconProps) {
  return (
    <span className={`orbit-footer-chip-icon orbit-footer-chip-icon-install${className ? ` ${className}` : ""}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 4v10M8.5 10.5 12 14l3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 18h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </span>
  );
}
