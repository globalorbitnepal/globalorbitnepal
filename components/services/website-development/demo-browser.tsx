"use client";

import type { ReactNode } from "react";

export function WebsiteDemoBrowser({ children, url }: { children: ReactNode; url: string }) {
  return (
    <div className="wd-browser">
      <div className="wd-browser-chrome">
        <span className="orbit-projects-chrome-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="wd-browser-url">{url}</span>
      </div>
      <div className="wd-browser-viewport">{children}</div>
    </div>
  );
}
