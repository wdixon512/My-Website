import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  draft: boolean;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const showDrafts = process.env.NODE_ENV !== "production";

function readPost(file: string) {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const meta: PostMeta = {
    slug: file.replace(/\.mdx?$/, ""),
    title: String(data.title ?? ""),
    date: data.date ? new Date(data.date).toISOString().slice(0, 10) : "",
    summary: String(data.summary ?? ""),
    draft: Boolean(data.draft),
  };
  return { meta, content };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => readPost(f).meta)
    .filter((p) => showDrafts || !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string) {
  const file = ["md", "mdx"].map((e) => `${slug}.${e}`).find((f) => fs.existsSync(path.join(BLOG_DIR, f)));
  if (!file) return null;
  const { meta, content } = readPost(file);
  if (meta.draft && !showDrafts) return null;
  return { meta, html: marked.parse(content, { async: false }) as string };
}
