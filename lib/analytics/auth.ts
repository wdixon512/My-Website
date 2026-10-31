import { timingSafeEqual } from "crypto";
import type { NextApiRequest } from "next";

export function getStatsToken(): string {
  return (process.env.STATS_TOKEN || "").trim();
}

export function statsConfigured(): boolean {
  return getStatsToken().length > 0;
}

/** Constant-time string compare. Length mismatch returns false without leaking. */
export function tokensEqual(a: string, b: string): boolean {
  if (!a || !b) return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    // Still compare equal-length buffers to keep timing flatter.
    timingSafeEqual(bufA, bufA);
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

export function extractToken(req: NextApiRequest): string {
  const q = req.query?.token;
  if (typeof q === "string" && q) return q;
  if (Array.isArray(q) && q[0]) return q[0];
  const auth = req.headers.authorization || "";
  const m = /^Bearer\s+(.+)$/i.exec(auth);
  return m?.[1]?.trim() || "";
}

export function authorizeStats(req: NextApiRequest): "ok" | "missing" | "denied" {
  const expected = getStatsToken();
  if (!expected) return "missing";
  const got = extractToken(req);
  if (!tokensEqual(got, expected)) return "denied";
  return "ok";
}

export function authorizeStatsQuery(token: string | string[] | undefined): "ok" | "missing" | "denied" {
  const expected = getStatsToken();
  if (!expected) return "missing";
  const got = typeof token === "string" ? token : Array.isArray(token) ? token[0] || "" : "";
  if (!tokensEqual(got, expected)) return "denied";
  return "ok";
}
