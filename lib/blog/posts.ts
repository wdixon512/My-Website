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
  summary: string;
  draft: boolean;
  author: string;
  tags: string[];
  cover: PostCover | null;
  links: PostLink[];
  readingTime: number;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const showDrafts = process.env.NODE_ENV !== "production";
const WORDS_PER_MINUTE = 225;

// Files starting with "_" (like _template.md) and README.md are never published.
const isPostFile = (f: string) => /\.mdx?$/.test(f) && !f.startsWith("_") && f.toLowerCase() !== "readme.md";

function readPost(file: string) {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const words = content.replace(/[#*_`>\[\]()-]/g, " ").split(/\s+/).filter(Boolean).length;
  const meta: PostMeta = {
    slug: file.replace(/\.mdx?$/, ""),
    title: String(data.title ?? ""),
    date: data.date ? new Date(data.date).toISOString().slice(0, 10) : "",
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
  return { meta, content };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter(isPostFile)
    .map((f) => readPost(f).meta)
    .filter((p) => showDrafts || !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string) {
  if (slug.startsWith("_")) return null;
  const file = ["md", "mdx"].map((e) => `${slug}.${e}`).find((f) => isPostFile(f) && fs.existsSync(path.join(BLOG_DIR, f)));
  if (!file) return null;
  const { meta, content } = readPost(file);
  if (meta.draft && !showDrafts) return null;
  return { meta, html: marked.parse(content, { async: false }) as string };
}
