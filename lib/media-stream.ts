/** Serve videos without a .mp4 URL so download managers do not auto-steal the file. */
export function mediaStreamSrc(src: string): string {
  const raw = src.trim();
  if (!raw) return raw;
  if (/^(blob:|data:)/i.test(raw)) return raw;
  if (raw.startsWith("/stream/")) return raw;
  if (raw.startsWith("/api/")) return raw;

  let pathname = raw;
  try {
    if (/^https?:\/\//i.test(raw)) {
      pathname = new URL(raw).pathname;
    }
  } catch {
    return raw;
  }

  if (!pathname.startsWith("/brand/") && !pathname.startsWith("/uploads/")) {
    return raw;
  }

  const stripped = pathname.replace(/\.(mp4|webm|mov|m4v)$/i, "");
  return `/stream${stripped}`;
}

export function mediaStreamType(src: string): string {
  return src.split("?")[0]?.toLowerCase().endsWith(".webm") ? "video/webm" : "video/mp4";
}
