# Blog posts

Each `.md` file in this folder is a post at `/blog/<file-name>`.

Start from [`_template.md`](./_template.md), which documents every front-matter field
(title, date, publishAt, summary, draft, author, cover, tags, links). Reading time is computed automatically.

Optional `publishAt` (ISO) schedules go-live; without it, `date` at 00:00 America/New_York is used. Strings without a timezone offset/Z are interpreted in America/New_York. Scheduled posts go live within ~1 minute of the first visit after that time — no deploy needed.

Files starting with `_` and this README are never built or published.
