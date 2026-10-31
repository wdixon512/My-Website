import type { OutboundTarget, TrackEventName, TrackPayload } from "./types";

const VID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const REF_RE = /[^a-z0-9-]+/g;
const BOT_UA_RE =
  /bot|crawl|spider|slurp|preview|headless|wget|curl|python-requests|scrapy|facebookexternalhit|embedly|quora link preview|pingdom|monitor|lighthouse|pagespeed|semrush|ahrefs|yandex|baidu|duckduck|bingpreview/i;

const EVENTS = new Set<TrackEventName>([
  "contact_click",
  "resume_download",
  "resume_view",
  "hire_cta_click",
  "outbound_click",
  "project_view",
  "blog_read",
]);

const OUTBOUNDS = new Set<OutboundTarget>([
  "github",
  "linkedin",
  "ahprice",
  "dmsquire",
  "other",
]);

export function isBotUa(ua: string | undefined): boolean {
  const text = (ua || "").trim();
  if (!text) return true;
  return BOT_UA_RE.test(text);
}

export function sanitizeRef(raw: string | undefined | null, fallback = ""): string {
  const text = (raw || "").trim().toLowerCase().replace(REF_RE, "").slice(0, 64);
  return text || fallback;
}

export function sanitizePath(raw: string | undefined | null): string {
  let path = (raw || "/").trim() || "/";
  if (!path.startsWith("/")) path = "/" + path;
  path = path.split(/[?#]/)[0] || "/";
  if (path.length > 200) path = path.slice(0, 200);
  return path;
}

export function sanitizeSlug(raw: string | undefined | null): string {
  return (raw || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "")
    .slice(0, 80);
}

export function sanitizeDomain(raw: string | undefined | null): string {
  return (raw || "")
    .trim()
    .toLowerCase()
    .replace(/^www\./, "")
    .replace(/[^a-z0-9.-]+/g, "")
    .slice(0, 120);
}

export function sanitizePayload(body: unknown): TrackPayload | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;
  const vid = typeof b.vid === "string" ? b.vid.trim() : "";
  if (!VID_RE.test(vid)) return null;

  const type = b.type === "event" ? "event" : b.type === "pageview" ? "pageview" : null;
  if (!type) return null;

  const path = sanitizePath(typeof b.path === "string" ? b.path : "/");
  if (path === "/stats" || path.startsWith("/stats/") || path === "/api/stats" || path === "/api/track") {
    return null;
  }

  const out: TrackPayload = {
    vid,
    type,
    path,
    visit: Boolean(b.visit),
    ref: sanitizeRef(typeof b.ref === "string" ? b.ref : "", ""),
    refFirst: sanitizeRef(typeof b.refFirst === "string" ? b.refFirst : "", ""),
    refLast: sanitizeRef(typeof b.refLast === "string" ? b.refLast : "", ""),
    referrerDomain: sanitizeDomain(typeof b.referrerDomain === "string" ? b.referrerDomain : ""),
  };

  if (type === "event") {
    const event = typeof b.event === "string" ? (b.event as TrackEventName) : null;
    if (!event || !EVENTS.has(event)) return null;
    out.event = event;
    if (event === "outbound_click") {
      const target = typeof b.target === "string" ? (b.target as OutboundTarget) : "other";
      out.target = OUTBOUNDS.has(target) ? target : "other";
    }
    if (event === "project_view" || event === "blog_read") {
      const slug = sanitizeSlug(typeof b.slug === "string" ? b.slug : "");
      if (!slug) return null;
      out.slug = slug;
    }
  }

  return out;
}
