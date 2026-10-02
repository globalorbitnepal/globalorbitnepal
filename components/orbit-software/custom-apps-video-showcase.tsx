"use client";

import type { CustomAppsVideoClip } from "@/lib/custom-apps-config";

function videoMime(src: string) {
  if (src.endsWith(".webm")) return "video/webm";
  return "video/mp4";
}

type Header = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  lede: string;
};

export function CustomAppsVideoShowcase({ clips, header }: { clips: CustomAppsVideoClip[]; header: Header }) {
  return (
    <section className="orbit-custom-apps-section px-4 sm:px-6 lg:px-8" aria-labelledby="custom-apps-videos-heading">
      <div className="mx-auto max-w-[76rem]">
        <header className="mb-8 text-center lg:mb-10">
          <p className="orbit-work-badge mx-auto">
            <span className="orbit-work-badge-num">{String(clips.length).padStart(2, "0")}</span>
            {header.eyebrow}
          </p>
          <h2 id="custom-apps-videos-heading" className="orbit-projects-portfolio-title">
            {header.title} <span>{header.titleAccent}</span>
          </h2>
          <p className="orbit-projects-portfolio-lede mx-auto">{header.lede}</p>
        </header>

        <div className="orbit-custom-apps-video-grid">
          {clips.map((clip, index) => (
            <article key={clip.title} className="orbit-custom-apps-video-card">
              <div className="orbit-custom-apps-phone">
                <span className="orbit-custom-apps-phone-notch" aria-hidden="true" />
                <video
                  className="orbit-custom-apps-phone-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  disablePictureInPicture
                >
                  <source src={clip.videoSrc} type={videoMime(clip.videoSrc)} />
                </video>
              </div>
              <p className="orbit-custom-apps-video-index">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="orbit-custom-apps-video-title">{clip.title}</h3>
              <p className="orbit-custom-apps-video-body">{clip.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
