import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export type PostLink = { label: string; url: string };
export type PostCover = { src: string; alt: string };

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  /** Raw front-matter publishAt, or null when unset. */
  publishAt: string | null;
  summary: string;
  draft: boolean;
  author: string;
  tags: string[];
  cover: PostCover | null;
  links: PostLink[];
  readingTime: number;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const TZ = "America/New_York";
const isDev = process.env.NODE_ENV !== "production";
const WORDS_PER_MINUTE = 225;

// Files starting with "_" (like _template.md) and README.md are never published.
const isPostFile = (f: string) => /\.mdx?$/.test(f) && !f.startsWith("_") && f.toLowerCase() !== "readme.md";

/** Current time in ms. Honors BLOG_NOW (ISO) for testing, else Date.now(). */
export function now(): number {
  const override = process.env.BLOG_NOW?.trim();
  if (override) {
    const t = Date.parse(override);
    if (!Number.isNaN(t)) return t;
  }
  return Date.now();
}

/** True if the string already has Z or a ±HH:MM / ±HHMM offset. */
function hasExplicitOffset(s: string): boolean {
  return /(?:Z|[+-]\d{2}:?\d{2})$/i.test(s);
}

/**
 * Convert a wall-clock time in America/New_York to a UTC epoch ms.
 * Uses Intl so DST (EST/EDT) is applied correctly.
 */
function zonedTimeToUtc(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number
): number {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });

  // Seed near ET (UTC-5); refine by comparing formatted parts to the desired wall time.
  let utc = Date.UTC(year, month - 1, day, hour + 5, minute, second);
  for (let i = 0; i < 3; i++) {
    const parts = Object.fromEntries(
      formatter
        .formatToParts(new Date(utc))
        .filter((p) => p.type !== "literal")
        .map((p) => [p.type, p.value])
    ) as Record<string, string>;
    const wanted = Date.UTC(year, month - 1, day, hour, minute, second);
    const got = Date.UTC(
      Number(parts.year),
      Number(parts.month) - 1,
      Number(parts.day),
      Number(parts.hour),
      Number(parts.minute),
      Number(parts.second)
    );
    const diff = wanted - got;
    if (diff === 0) break;
    utc += diff;
  }
  return utc;
}

/**
 * Parse a publish time string to UTC epoch ms.
 * With Z/offset: absolute. Without: America/New_York (date-only = 00:00 ET).
 */
export function parsePublishTime(value: string): number {
  const s = value.trim();
  if (!s) return NaN;

  if (hasExplicitOffset(s)) {
    return Date.parse(s);
  }

  const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (dateOnly) {
    return zonedTimeToUtc(+dateOnly[1], +dateOnly[2], +dateOnly[3], 0, 0, 0);
  }

  const dt = /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})(?::(\d{2}))?/.exec(s);
  if (dt) {
    return zonedTimeToUtc(+dt[1], +dt[2], +dt[3], +dt[4], +dt[5], +(dt[6] ?? 0));
  }

  return Date.parse(s);
}

function isVisible(draft: boolean, publishTimeMs: number): boolean {
  if (draft && !isDev) return false;
  if (publishTimeMs > now()) {
    return isDev && process.env.BLOG_SHOW_SCHEDULED === "1";
  }
  return true;
}

function readPost(file: string) {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const words = content.replace(/[#*_`>\[\]()-]/g, " ").split(/\s+/).filter(Boolean).length;
  const publishAtRaw = data.publishAt != null && String(data.publishAt).trim() !== "" ? String(data.publishAt) : null;
  const effectiveRaw = publishAtRaw ?? (data.date ? String(data.date) : "");
  const publishTimeMs = parsePublishTime(effectiveRaw);
  const meta: PostMeta = {
    slug: file.replace(/\.mdx?$/, ""),
    title: String(data.title ?? ""),
    date: data.date ? new Date(data.date).toISOString().slice(0, 10) : "",
    publishAt: publishAtRaw,
    summary: String(data.summary ?? ""),
    draft: Boolean(data.draft),
    author: String(data.author ?? "Will Dixon"),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    cover: data.cover?.src ? { src: String(data.cover.src), alt: String(data.cover.alt ?? "") } : null,
    links: Array.isArray(data.links)
      ? data.links.filter((l: any) => l?.label && l?.url).map((l: any) => ({ label: String(l.label), url: String(l.url) }))
      : [],
    readingTime: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
  };
  return { meta, content, publishTimeMs };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter(isPostFile)
    .map((f) => readPost(f))
    .filter(({ meta, publishTimeMs }) => isVisible(meta.draft, publishTimeMs))
    .map(({ meta }) => meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string) {
  if (slug.startsWith("_")) return null;
  const file = ["md", "mdx"].map((e) => `${slug}.${e}`).find((f) => isPostFile(f) && fs.existsSync(path.join(BLOG_DIR, f)));
  if (!file) return null;
  const { meta, content, publishTimeMs } = readPost(file);
  if (!isVisible(meta.draft, publishTimeMs)) return null;
  return { meta, html: marked.parse(content, { async: false }) as string };
}
