import type { ReactNode } from "react";
import type { AdminPageId } from "@/lib/admin-nav";

function Icon({ d, children }: { d?: string; children?: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {d ? <path d={d} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /> : children}
    </svg>
  );
}

const PATHS: Record<string, ReactNode> = {
  dashboard: (
    <Icon>
      <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1.6" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <rect x="13" y="3.5" width="7.5" height="4.8" rx="1.6" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <rect x="13" y="10.6" width="7.5" height="9.9" rx="1.6" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <rect x="3.5" y="13.3" width="7.5" height="7.2" rx="1.6" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </Icon>
  ),
  home: <Icon d="M4.5 11.2 12 4.8l7.5 6.4V19a1.6 1.6 0 0 1-1.6 1.6H6.1A1.6 1.6 0 0 1 4.5 19Z" />,
  about: <Icon d="M12 12.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4ZM5.4 19.2a6.6 6.6 0 0 1 13.2 0" />,
  software: <Icon d="M8.2 8.2 4.6 12l3.6 3.8M15.8 8.2 19.4 12l-3.6 3.8M13.2 5.5 10.8 18.5" />,
  "website-development": (
    <Icon>
      <rect x="3.4" y="5" width="17.2" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.4 9h17.2M8 15.2h4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </Icon>
  ),
  projects: (
    <Icon>
      <rect x="3.5" y="3.5" width="7.2" height="7.2" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <rect x="13.3" y="3.5" width="7.2" height="7.2" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <rect x="3.5" y="13.3" width="7.2" height="7.2" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <rect x="13.3" y="13.3" width="7.2" height="7.2" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </Icon>
  ),
  careers: (
    <Icon>
      <rect x="3.5" y="8" width="17" height="11.2" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.2 8V6.6A2.1 2.1 0 0 1 10.3 4.5h3.4A2.1 2.1 0 0 1 15.8 6.6V8M3.5 12.4h17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </Icon>
  ),
  contact: (
    <Icon>
      <path d="M4.4 7.2h15.2v10.2H8.2L4.4 20.4V7.2Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M8 11.2h8M8 14.2h5.2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </Icon>
  ),
  "web-apps": (
    <Icon>
      <rect x="3.2" y="4.8" width="17.6" height="14.4" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.2 8.6h17.6" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="6.4" cy="6.7" r="0.7" fill="currentColor" />
      <circle cx="8.6" cy="6.7" r="0.7" fill="currentColor" />
    </Icon>
  ),
  "android-apps": (
    <Icon>
      <rect x="7" y="6.2" width="10" height="13.2" rx="2.1" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10 4.6 8.4 2.8M14 4.6l1.6-1.8M9.2 16.6h5.6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </Icon>
  ),
  "ios-apps": (
    <Icon>
      <rect x="7.2" y="3.2" width="9.6" height="17.6" rx="2.4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10.6 5.4h2.8M11.2 18.8h1.6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </Icon>
  ),
  packages: <Icon d="M4.6 8.2 12 4.6l7.4 3.6v7.6L12 19.4 4.6 15.8Z" />,
  services: <Icon d="M12 4.6v2.4M12 17v2.4M4.6 12H7M17 12h2.4M6.8 6.8l1.7 1.7M15.5 15.5l1.7 1.7M17.2 6.8l-1.7 1.7M8.5 15.5 6.8 17.2M12 15.4a3.4 3.4 0 1 0 0-6.8 3.4 3.4 0 0 0 0 6.8Z" />,
  blogs: <Icon d="M6 5.2h9.2L18.6 8.8V19a1.6 1.6 0 0 1-1.6 1.6H6A1.6 1.6 0 0 1 4.4 19V6.8A1.6 1.6 0 0 1 6 5.2Z" />,
  studio: <Icon d="M12 19.4c4 0 6.6-2.3 6.6-5.6 0-4.4-5.4-5.2-4.2-9.2-2.8 1.2-6.8 4.2-6.8 8.4 0 3.6 2 6.4 4.4 6.4Z" />,
  "inside-orbit": <Icon d="M12 19.6a7.6 7.6 0 1 0 0-15.2 7.6 7.6 0 0 0 0 15.2ZM4.8 12h14.4M12 4.4c2.3 2.4 3.5 5 3.5 7.6s-1.2 5.2-3.5 7.6c-2.3-2.4-3.5-5-3.5-7.6s1.2-5.2 3.5-7.6Z" />,
  privacy: <Icon d="M12 3.8 19 6.6v5.6c0 4.4-3 7.2-7 8.6-4-1.4-7-4.2-7-8.6V6.6Z" />,
  terms: <Icon d="M7 4.8h7.4L19 9.2V19a1.6 1.6 0 0 1-1.6 1.6H7A1.6 1.6 0 0 1 5.4 19V6.4A1.6 1.6 0 0 1 7 4.8ZM8.8 13h6.4M8.8 16.2h4.4" />,
  posts: <Icon d="M5.4 6.4h13.2M5.4 12h13.2M5.4 17.6h9.2" />,
  compose: <Icon d="M12 5.2v13.6M5.2 12h13.6" />,
  categories: <Icon d="M4.4 8.4h6.2l1.6 1.8h7.4v8.2A1.6 1.6 0 0 1 18 20H6A1.6 1.6 0 0 1 4.4 18.4V8.4Z" />,
  tags: <Icon d="M4.8 12.4 12.2 5H19v6.8L11.6 19.2Z" />,
  media: (
    <Icon>
      <rect x="3.6" y="5.4" width="16.8" height="13.2" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="m8 15.4 2.6-3.1 2.2 2.4 2.4-3.2L17.8 15.4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="8.4" cy="9.2" r="1.05" fill="currentColor" />
    </Icon>
  ),
  drafts: <Icon d="M7 4.8h7.2L19 9.4V19a1.6 1.6 0 0 1-1.6 1.6H7A1.6 1.6 0 0 1 5.4 19V6.4A1.6 1.6 0 0 1 7 4.8Z" />,
  "blog-seo": <Icon d="M10.6 17.2a6.6 6.6 0 1 0-1.3-1.3L17.8 20" />,
  seo: <Icon d="M4.8 16.8V9.2M9.6 16.8V6.2M14.4 16.8v-5.4M19.2 16.8V4.8" />,
  chrome: (
    <Icon>
      <rect x="3.4" y="5" width="17.2" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.4 9.2h17.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </Icon>
  ),
  inquiries: <Icon d="M4.4 7h15.2v10.4H8.4L4.4 20.6V7Z" />,
};

export function adminNavIcon(key: string): ReactNode {
  return PATHS[key] ?? PATHS.home;
}

export function adminPageIcon(id: AdminPageId): ReactNode {
  return adminNavIcon(id);
}
