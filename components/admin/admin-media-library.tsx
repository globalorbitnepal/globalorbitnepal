"use client";

import { useEffect, useMemo, useState } from "react";

export type MediaItem = {
  name: string;
  url: string;
  size: number;
  kind: string;
  updatedAt: string;
  usedBy?: string[];
};

type Props = {
  picker?: boolean;
  onSelect?: (item: MediaItem) => void;
};

export function AdminMediaLibrary({ picker, onSelect }: Props) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [query, setQuery] = useState("");
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  async function load() {
    setLoading(true);
    const response = await fetch("/api/orbit/media");
    if (!response.ok) {
      setError("Could not load media.");
      setLoading(false);
      return;
    }
    const data = (await response.json()) as { items?: MediaItem[] };
    setItems(data.items || []);
    setError("");
    setLoading(false);
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void load();
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => !q || item.name.toLowerCase().includes(q));
  }, [items, query]);

  async function upload(file?: File) {
    if (!file) return;
    setBusy(true);
    const form = new FormData();
    form.set("kind", "blogImage");
    form.set("file", file);
    const response = await fetch("/api/orbit/upload", { method: "POST", body: form });
    setBusy(false);
    if (!response.ok) {
      setError("Upload failed. Use a JPG, PNG, or WebP under 80MB.");
      return;
    }
    await load();
  }

  return (
    <section className="go-cms-card">
      {!picker ? <h2>Media library</h2> : <h2>Choose image</h2>}
      <p className="go-cms-help">Blog uploads are stored as blog-* files and do not replace the homepage hero.</p>
      <div className="go-cms-toolbar">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search files" />
        <button type="button" onClick={() => setLayout(layout === "grid" ? "list" : "grid")}>
          {layout === "grid" ? "List view" : "Grid view"}
        </button>
        <label className="go-cms-upload">
          {busy ? "Uploading…" : "Upload image"}
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => void upload(e.target.files?.[0])} />
        </label>
      </div>
      {loading ? <p className="go-cms-help">Loading media…</p> : null}
      {error ? <p className="go-cms-error">{error}</p> : null}
      {!loading && !filtered.length ? <p className="go-cms-empty">No media matches this search.</p> : null}
      <div className={layout === "grid" ? "go-cms-media" : "go-cms-media-list"}>
        {filtered.map((item) => (
          <figure key={item.name}>
            {item.kind === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.url} alt={item.name} />
            ) : (
              <span>Video</span>
            )}
            <figcaption>
              <strong>{item.name}</strong>
              <small>
                {Math.round(item.size / 1024)} KB · {item.kind}
              </small>
              <small>{item.usedBy?.length ? `Used in: ${item.usedBy.join(", ")}` : "Not referenced by a blog post"}</small>
            </figcaption>
            {picker ? (
              <button type="button" className="is-primary" onClick={() => onSelect?.(item)}>
                Select
              </button>
            ) : (
              <a href={item.url} target="_blank" rel="noreferrer">
                Open
              </a>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}
