---
# Copy this file to content/blog/<your-slug>.md. The file name becomes the URL: /blog/<your-slug>
# Files starting with "_" (like this one) and README.md are never published.

title: "Post title"              # required. shown as the H1
date: "2026-01-01"               # required. YYYY-MM-DD
summary: "One or two sentences." # shown under the title, on /blog, and in search/social previews
draft: true                      # true = only visible in `npm run dev`. set false to publish
author: "Will Dixon"             # optional. defaults to Will Dixon
cover:                           # optional. full-width hero image
  src: "/images/blog/my-cover.jpg"   # put the file in public/images/blog/
  alt: "Describe the image for screen readers"
tags:                            # optional. shown as chips on the post and on /blog
  - example
  - another-tag
links:                           # optional. "Related links" in the sidebar
  - label: "Something related"
    url: "https://example.com"
# readingTime is calculated automatically from the word count. don't set it.
---

Write the post in Markdown here. `## Headings`, **bold**, lists, links and code blocks all work.
