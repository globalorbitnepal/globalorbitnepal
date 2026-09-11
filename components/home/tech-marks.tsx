type MarkProps = { className?: string };

export function MarkNext({ className = "h-5 w-5" }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#111" />
      <path d="M8 16.5V7.5h2.1l5.7 7.2V7.5H18v9h-2.1L10.2 9.3v7.2H8Z" fill="#fff" />
    </svg>
  );
}

export function MarkLaravel({ className = "h-5 w-5" }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#FF2D20" d="M4 7.2 8.4 4.8v4.7L4 12V7.2Zm5.1-.1 4.4-2.4v4.7L9.1 12V7.1Zm5.2-2.4 4.4 2.5V12l-4.4-2.4V4.7ZM4 13.1l4.4 2.4v4.6L4 17.8v-4.7Zm5.1 0 4.4 2.4v4.6l-4.4-2.3v-4.7Z" />
    </svg>
  );
}

export function MarkReact({ className = "h-5 w-5" }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="2.1" fill="#61DAFB" />
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.4" transform="rotate(120 12 12)" />
    </svg>
  );
}

export function MarkNode({ className = "h-5 w-5" }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#5FA04A" d="M12 2.4 20 7v10l-8 4.6L4 17V7l8-4.6Z" />
      <path fill="#fff" d="M10.2 8.2h2.3c1.8 0 3 .9 3 2.4 0 1.1-.6 1.9-1.7 2.2l2 3.2h-2.1l-1.7-2.9H12v2.9h-1.8V8.2Zm1.8 3.6h.5c.7 0 1.1-.3 1.1-.9s-.4-.9-1.1-.9h-.5v1.8Z" />
    </svg>
  );
}

export function MarkMysql({ className = "h-5 w-5" }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#00758F" d="M5 16.8c2.4 1.6 4.6 2.2 6.7 2.2 3.4 0 5.2-1.4 6.3-4.1.4 2.6 1.8 3.6 4 4.1-.9-1-1.4-2-1.6-4.2-.2-2.3.6-4.1 1.6-5.3-2.3 1.1-3.8 3.1-3.8 6.1 0 2.3-1.2 3.8-3.3 3.8-1.6 0-3.1-.6-4.7-1.6L5 16.8Z" />
      <path fill="#F29111" d="M7.2 6.2c1.4 3.3 2.7 5 4.8 7.2-1.7-2-2.8-3.8-3.6-7.2H7.2Z" />
    </svg>
  );
}

export function MarkPostgres({ className = "h-5 w-5" }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#336791" d="M12.4 3c3.8.1 6.4 2.2 6.2 6.3-.2 3.4-1.6 5.3-4.2 6.6-.6.3-1 .8-1.1 1.5l-.3 2.3H11l-.2-2.1c-.2-1.2-.8-1.9-1.9-2.4-2.2-.9-3.5-2.7-3.4-5.7C5.6 5.1 8.3 2.9 12.4 3Z" />
      <circle cx="10.2" cy="9.2" r="1" fill="#fff" />
    </svg>
  );
}

export const TECH_MARKS = {
  "Next.js": MarkNext,
  Laravel: MarkLaravel,
  React: MarkReact,
  "Node.js": MarkNode,
  MySQL: MarkMysql,
  PostgreSQL: MarkPostgres,
} as const;
