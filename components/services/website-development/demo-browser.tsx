"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function WebsiteDemoBrowser({ children, url }: { children: ReactNode; url: string }) {
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let dir = 1;
    let frame = 0;

    const tick = () => {
      const max = el.scrollHeight - el.clientHeight;
      if (max > 8) {
        el.scrollTop += dir * 0.22;
        if (el.scrollTop >= max - 1) dir = -1;
        if (el.scrollTop <= 0) dir = 1;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

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
      <div ref={viewportRef} className="wd-browser-viewport">
        {children}
      </div>
    </div>
  );
}
