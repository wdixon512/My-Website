---
title: "I'm launching a WoW addon on day one, which is probably a mistake"
date: "2026-11-01"
publishAt: "2026-11-01T09:00:00-05:00"
summary: "What it's like shipping an auction house addon before the game it's for even launches, plus the parts that still suck."
draft: false
author: "Will Dixon"
cover:
  src: "/images/blog/launching-a-wow-addon-on-day-one-cover.jpg"
  alt: "ahprice Insights card recommending a Handstitched Leather Belt craft, with profit, margin and material costs including Coarse Thread from a vendor at 9c"
tags:
  - ahprice
  - world-of-warcraft
  - side-projects
  - launches
links:
  - label: "ahprice"
    url: "https://ahprice.com/?ref=blog"
---

I'm a longtime software engineer. I've shipped plenty of things to production. I have never shipped something for a game that doesn't exist yet. WoW Forever launches on November 4, and ahprice is going to be there on day one, whether day one likes it or not.

Here's what I built, why launching this early is kind of dumb, and what the numbers look like so far.

## What ahprice actually is

ahprice is a World of Warcraft addon that tells you whether an auction is a good price. You scan the auction house, it saves what it sees, and the next time you hover an item it compares the current price to the usual low. That's it. No gold-making course. No spreadsheet you have to babysit.

There are three pieces. The addon runs in the game. A small desktop app, the ahprice app, uploads your scans. The site at [ahprice.com](https://ahprice.com/?ref=blog) shows prices across everyone's scans. I started it because I used TSM for years and it felt too bulky. I wanted something simple, effective and reliable, and the only way to know it was all three was to build it myself.

## Why day one is a weird time to launch

Every price tool has the same problem on launch day: there is no price history. Nobody has scanned anything. The auction house is a few hours old and everyone is selling copper ore for whatever number they typed first.

So on November 4, ahprice will know roughly nothing. It gets useful as people scan. That's a chicken-and-egg problem, and I picked the version where I'm the chicken standing in an empty coop.

The upside is that people pick their addons early and then never change them. If I show up in week three, everyone already has a setup. Day one is the only day the shelf is empty.

## How a scan works, without the marketing

I get asked this a lot, so here's the honest version. A full scan reads every listing. For each item it saves the cheapest real price, how many are up at that price, the total quantity, and the six cheapest price levels with their quantities. If you just browse a list instead, it only grabs the cheapest price and the total.

**The bait filter.** Some sellers post one item way under market to make everyone else undercut. If the cheapest listing's quantity is under 5% of the pile above it, ahprice skips it. One lonely bait auction doesn't get to set the price.

**The average.** The market number is weighted by quantity and uses floor prices with a 7-day half-life, so last week matters less than today. One snapshot's quantity counts for at most 200 in that average. That's a cap on influence, not a scan limit. There's no median, which I'm sure someone will yell at me about.

## The numbers so far

I don't have a marketing budget. I have a Discord, a CurseForge page and a lot of opinions. Here's where it stands four days out, from my own dashboard:

- 97 downloads all-time: 41 from the site and 56 from CurseForge.
- 21 downloads in the last 7 days, out of 1,153 visitors.
- About 20 Google Search clicks a week, sitting around position 8.

That visit-to-download rate is roughly 2%. That's not great. Two days last week had zero downloads, and I refreshed the dashboard like it owed me money. Two people joined the Discord in one day and I was way too happy about it.

The top search query is "wow forever auction house prices". So at least the people finding it are looking for the right thing.

## The parts that still suck

This isn't an ad. Here's what's rough.

**It's empty at launch.** I covered this, but it's the big one. Prices will be noisy for the first days. My guess: the insights get useful after about the first week, and prices really settle in around a month.

**The desktop app is extra friction.** Addons can't talk to the internet, so uploading needs a separate app. Asking gamers to install a second thing is a hard sell. I know. I'd be suspicious too.

**I'm one person.** If a patch breaks the addon at 2 AM, the support team is me, half asleep, in Discord. It already happened once in beta. For a while, crafting costs trusted a generic "buy price" field from Wowhead as proof that a vendor sells an item. So mats like Medium Leather and Kingsblood got costed at a few copper, and Insights cheerfully recommended crafts that weren't actually profitable. Now vendor pricing only counts items a real WoW Forever NPC sells in unlimited stock, and there are tests for it. Lesson learned: a field existing doesn't mean it means what you think.

**Reddit has rules, and they're fair.** r/wowaddons allows one release post a week and requires an AI disclaimer. So I get one shot on launch day and I'd better not waste it.

## About the AI part

I built ahprice with a lot of help from AI tools. I wrote the design, made the calls and fixed the stuff it got confidently wrong, which was a shit ton of stuff. It made a side project possible on nights and weekends. It did not make it free. One of my agents helped draft this post; the opinions and the swearing are mine.

## So should you launch on day one?

Probably not, if you want a calm life. Yes, if the thing gets better with users and the window for picking tools is short. That's the only reason I'm doing it.

If you're building something similar: show your real numbers to yourself every morning, even the ugly ones. Answer every question in Discord. Read the subreddit rules before you post, not after you get removed.

And if you play WoW Forever, grab [ahprice](https://ahprice.com/?ref=blog), scan the auction house once, and tell me what's broken. Found a bug or have an idea? Come say hi on [Discord](https://discord.gg/ey8TPStRCY).
