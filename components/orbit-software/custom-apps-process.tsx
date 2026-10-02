"use client";

import { useEffect, useRef } from "react";
import type { CustomAppsStep } from "@/lib/custom-apps-config";
import { bindOrbitScroll } from "@/lib/orbit/scroll-performance";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function CustomAppsProcessTimeline({ steps }: { steps: CustomAppsStep[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const apply = () => {
      const track = trackRef.current;
      const fill = fillRef.current;
      if (!track || !fill) return;
      const rect = track.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.75;
      const end = vh * 0.25;
      const progress = clamp((start - rect.top) / (start - end + rect.height * 0.5), 0, 1);
      fill.style.transform = `scaleX(${progress})`;
    };

    return bindOrbitScroll(trackRef.current, apply, frameRef);
  }, []);

  return (
    <div ref={trackRef} className="orbit-custom-apps-process">
      <div className="orbit-custom-apps-process-rail" aria-hidden="true">
        <div ref={fillRef} className="orbit-custom-apps-process-fill" />
      </div>
      <ol className="orbit-custom-apps-process-steps">
        {steps.map((step, index) => (
          <li key={step.title} className="orbit-custom-apps-process-step">
            <span className="orbit-custom-apps-process-num">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="orbit-custom-apps-process-title">{step.title}</h3>
            <p className="orbit-custom-apps-process-body">{step.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
