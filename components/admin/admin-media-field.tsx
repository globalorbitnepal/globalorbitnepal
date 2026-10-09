"use client";

type Props = {
  label: string;
  description?: string;
  src: string;
  kind: "image" | "video";
  accept: string;
  disabled?: boolean;
  onPick: (file: File) => void | Promise<void>;
};

export function AdminMediaField({ label, description, src, kind, accept, disabled, onPick }: Props) {
  const hasSrc = Boolean(src?.trim());

  return (
    <div className="go-admin-media">
      <div className="go-admin-media-head">
        <div>
          <strong>{label}</strong>
          {description ? <p>{description}</p> : null}
        </div>
        <label className="go-admin-media-upload">
          <input
            type="file"
            accept={accept}
            disabled={disabled}
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void onPick(file);
              event.target.value = "";
            }}
          />
          Replace file
        </label>
      </div>
      <div className="go-admin-media-stage">
        {hasSrc && kind === "video" ? (
          <video key={src} src={src} controls playsInline muted className="go-admin-media-video" />
        ) : null}
        {hasSrc && kind === "image" ? (
          <img key={src} src={src} alt="" className="go-admin-media-img" />
        ) : null}
        {!hasSrc ? <p className="go-admin-media-empty">No file set — upload to use on the live site.</p> : null}
      </div>
      {hasSrc ? <code className="go-admin-media-url">{src}</code> : null}
    </div>
  );
}
