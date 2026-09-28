import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { cookies } from "next/headers";
import { getAppEnv } from "@/lib/env";

const COOKIE = "orbit_editor";

function authFile() {
  return path.join(path.dirname(getAppEnv().uploadDir), "orbit-auth.json");
}

function cookieSecret() {
  return process.env.ORBIT_EDITOR_KEY || "globalorbitnepal-orbit-editor";
}

function sign(value: string) {
  return createHmac("sha256", cookieSecret()).update(value).digest("hex");
}

export async function hasOrbitPassword() {
  try {
    const raw = await readFile(authFile(), "utf8");
    const data = JSON.parse(raw) as { hash?: string };
    return Boolean(data.hash);
  } catch {
    return false;
  }
}

export async function setOrbitPassword(password: string) {
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 32).toString("hex");
  const file = authFile();
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, `${JSON.stringify({ salt, hash })}\n`, "utf8");
}

export async function verifyOrbitPassword(password: string) {
  const raw = await readFile(authFile(), "utf8");
  const data = JSON.parse(raw) as { salt: string; hash: string };
  const next = scryptSync(password, data.salt, 32);
  const prev = Buffer.from(data.hash, "hex");
  if (next.length !== prev.length) return false;
  return timingSafeEqual(next, prev);
}

export async function isOrbitAuthed() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return false;
  const [value, mac] = token.split(".");
  if (!value || !mac) return false;
  return sign(value) === mac && value.startsWith("ok:");
}

export async function setOrbitSession() {
  const jar = await cookies();
  const value = `ok:${Date.now()}`;
  jar.set(COOKIE, `${value}.${sign(value)}`, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearOrbitSession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}
