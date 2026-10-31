---
title: "I track my site traffic without cookies, and it's mostly fine"
date: ""  # TODO: publish date (must be YYYY-MM-DD before publishing)
summary: "How my personal site counts visitors with localStorage and a free Redis instead of a cookie banner, plus the parts that still suck."
draft: true
author: "Will Dixon"
# TODO: cover image path and alt text, e.g. the private stats dashboard with numbers blurred
tags:
  - analytics
  - privacy
  - nextjs
  - side-projects
links:
  - label: "will-dixon.com"
    url: "https://www.will-dixon.com/?ref=blog"
  - label: "ahprice"
    url: "https://ahprice.com/?ref=blog"
---

I'm a longtime software engineer, and I hate cookie banners. I also really wanted to know if anyone reads my site. Those two things fight each other, so I wrote my own tiny analytics instead of installing something with a 40-page privacy policy.

Here's what it tracks, how it works under the hood and where it falls apart.

## Why not just use Google Analytics

Because then I need a banner, and nobody has ever enjoyed a banner. I also don't need most of what it does. I want a few answers: how many people showed up, where they came from and whether they clicked anything I care about.

That's a small problem. It deserved a small tool.

## What it actually does

Every visitor gets a random ID stored in `localStorage`. Not a cookie. No IP address gets stored, no name, no email. The ID is just a UUID from `crypto.randomUUID()`, so it means nothing outside my site.

The browser sends events to `/api/track` with `navigator.sendBeacon`, falling back to a plain `fetch` with `keepalive` if that fails. The server checks and caps the payload, then writes counts into Upstash Redis on the free tier. Keys expire after about 400 days. Nothing lives forever.

It's a Next.js site on Vercel, so the whole thing is one client file, one API route and a private stats page.

## What it counts

I kept the list short on purpose. Pageviews, plus a "visit" flag the first time a session starts, which I keep in `sessionStorage`. Then a handful of events:

- `contact_click` for email links.
- `resume_view` and `resume_download` for my resume.
- `outbound_click` for links to GitHub, LinkedIn or ahprice.
- `project_view` for project cards.
- `blog_read` when you scroll past 75% of a post. So yes, if you're reading this far, you might count. Hi.

That last one is my favorite. Pageviews lie. Scrolling to the bottom of a post is a much better sign that a human actually read it.

## Ref tags do the heavy lifting

Links I share carry a `?ref=` tag, like `?ref=blog` on every link in this post. The tag gets lowercased, stripped to letters, numbers and dashes, and capped at 64 characters.

I store two of them. The first-touch ref never gets overwritten, and the last-touch ref updates every time you arrive with a new tag. Conversions get credited to first touch. If there's no tag at all, I record the hostname from `document.referrer` instead, skipping my own domain.

This is how I know whether a link on ahprice, a resume or a Discord message actually sends anyone. [TODO: one real, non-identifying example of a ref tag that surprised you, if you're OK sharing it]

## Not counting myself

The fastest way to ruin your own stats is to visit your own site 300 times while fixing CSS. So any page loaded with `?notrack` sets a `wd_notrack` flag in `localStorage` and tracking turns off for that browser. `?track` turns it back on.

It also skips automated browsers. If `navigator.webdriver` is set, nothing gets sent. That matters more than you'd think, because I have AI agents that load my sites, and I don't want them counted as fans. The stats page itself is never tracked either.

The stats come back from a token-gated `/api/stats` endpoint as JSON: visitors, pageviews, conversions, top pages, top blog posts and where people came from. My morning report reads that and tells me how sad to be.

## The parts that still suck

This isn't an ad for rolling your own. Here's what bugs me.

**One person, many IDs.** If you clear storage or switch from your phone to your laptop, you're a new visitor. My visitor counts are definitely inflated, and I can't tell by how much.

**localStorage isn't a loophole.** It's still storage on your device. I'm not a lawyer and I'm not claiming this magically skips every privacy rule. [TODO: whether you've checked this against any specific privacy law, or just say you haven't]

**Bots still get in.** The browser skips tracking when `navigator.webdriver` is set, and the server drops empty user agents and anything that looks like curl, wget, a headless browser or a crawler. That catches the polite ones. The rude ones fake a normal Chrome, and so does me forgetting `?notrack` while testing. One day this week, most of my "visitors" were me.

**Time zones are a pain.** On ahprice, my daily numbers get stitched from two partial UTC days, so a visitor who shows up on both sides of 8 PM Eastern counts twice. Fucking time zones. Every project, every time.

**No dashboards for free.** I had to build the stats page. Google gives you charts for nothing. I gave myself a weekend of work and a JSON blob.

I built this with a lot of help from AI tools, the same way I built ahprice. I picked the design and reviewed the code. One of my agents helped draft this post; the opinions and the swearing are mine.

## So should you do this?

If you run a big store, no. Use a real product and talk to a lawyer. If you have a personal site and you want three or four honest answers, yes. It's maybe a few hundred lines of code and a free Redis.

My advice for a skeptic: decide which questions you want answered before you track anything. Tag every link you share. Exclude yourself on day one. And don't trust any single number too much, including mine.

If you want to see how it looks from the outside, poke around [my site](https://www.will-dixon.com/?ref=blog) or check out [ahprice](https://ahprice.com/?ref=blog).
