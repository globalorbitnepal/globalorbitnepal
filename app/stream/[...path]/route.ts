import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const ROOT = path.join(process.cwd(), "public");
const ALLOW = new Set(["brand", "uploads"]);
const EXTS = [".mp4", ".webm", ".mov", ".m4v"];

function mimeFor(file: string) {
  if (file.endsWith(".webm")) return "video/webm";
  if (file.endsWith(".mov")) return "video/quicktime";
  return "video/mp4";
}

export async function GET(_request: Request, context: { params: Promise<{ path: string[] }> }) {
  const { path: parts } = await context.params;
  if (!parts?.length || !ALLOW.has(parts[0])) {
    return new NextResponse("Not found", { status: 404 });
  }
  if (parts.some((part) => part === ".." || part.includes("\\") || part.includes("\0"))) {
    return new NextResponse("Not found", { status: 404 });
  }

  const rel = parts.join("/");
  const candidates = EXTS.map((ext) => path.join(ROOT, `${rel}${ext}`));
  if (/\.[a-z0-9]+$/i.test(parts[parts.length - 1] ?? "")) {
    candidates.unshift(path.join(ROOT, rel));
  }

  let file = "";
  for (const candidate of candidates) {
    const resolved = path.resolve(candidate);
    if (!resolved.startsWith(ROOT)) continue;
    try {
      const info = await stat(resolved);
      if (info.isFile()) {
        file = resolved;
        break;
      }
    } catch {
      /* try next */
    }
  }

  if (!file) return new NextResponse("Not found", { status: 404 });

  const info = await stat(file);
  const nodeStream = createReadStream(file);
  const body = Readable.toWeb(nodeStream) as unknown as BodyInit;

  return new NextResponse(body, {
    headers: {
      "Content-Type": mimeFor(file),
      "Content-Length": String(info.size),
      "Content-Disposition": 'inline; filename="orbit-media"',
      "Cache-Control": "public, max-age=86400, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
