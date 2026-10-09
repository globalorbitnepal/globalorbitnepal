"use client";

import type { SectionPreview } from "@/lib/admin-section-previews";

/** Static preview only — no &lt;video&gt; controls leaking over the dashboard. */
export function AdminSectionThumb({ preview }: { preview: SectionPreview }) {
  if (preview.mediaSrc && preview.mediaKind === "video") {
    return (
      <div
        className="go-cms-metric-visual is-video"
        style={
          preview.posterSrc
            ? { backgroundImage: `url(${preview.posterSrc})` }
            : undefined
        }
      >
        <span className="go-cms-video-badge">▶ Video</span>
      </div>
    );
  }
  if (preview.mediaSrc && preview.mediaKind === "image") {
    return (
      <div className="go-cms-metric-visual">
        <img src={preview.mediaSrc} alt="" className="go-cms-metric-thumb" />
      </div>
    );
  }
  return (
    <div className="go-cms-metric-visual is-empty">
      <span className="go-cms-metric-thumb is-text">Edit</span>
    </div>
  );
}
