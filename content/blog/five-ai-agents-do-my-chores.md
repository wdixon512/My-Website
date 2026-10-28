---
title: "I have five AI agents now and they do my chores"
date: "2026-10-27"
summary: "How I use five Grok Bot AI agents to order food, ship code to my site, and market my side project, plus the parts that still suck."
draft: false
author: "Will Dixon"
cover:
  src: "/images/blog/five-ai-agents-cover.jpg"
  alt: "Pixel-art platformer level with five little robot helpers carrying a pizza, a laptop, a megaphone, a briefcase and a coin"
tags:
  - ai
  - automation
  - grok-bot
  - side-projects
links:
  - label: "ahprice"
    url: "https://ahprice.com/?ref=blog"
  - label: "Download ahprice"
    url: "https://ahprice.com/download?ref=blog"
---

I'm a senior software engineer. I've spent years being skeptical of every "AI will do your job" pitch. So it's a little embarrassing to admit that I now have five Grok Bot agents, each with a dumb name, and they handle a real chunk of my actual life.

Here's what they do, what works, and what still pisses me off.

## The roster

I didn't want one giant bot that knows everything and does everything badly. So I split them up by job, like a tiny company where I'm the only human:

- **food guy** orders food
- **developer guy** writes and ships code
- **hype guy** does marketing for my side project
- **work work** helps with work stuff
- **finances guy** keeps an eye on money

Yes, the names are stupid. They're also instantly clear, which is more than I can say for most of the services I've named at work.

## food guy: the gateway drug

This is the one that hooked me. I text it something like "make an order to my local pizza place, one margherita pizza, breadsticks, and a grilled chicken fajita wrap," and it goes and builds the cart on DoorDash.

The part that sold me is that it doesn't just YOLO it. That place didn't actually have the fajita wrap. So instead of guessing, it came back with the closest wraps they did have and asked me to pick. I changed the pizza size, picked a wrap, switched it to pickup, and it showed me the final cart and total. Nothing got placed until I said yes.

Same deal with a Panera order: it built the cart, flagged that DoorDash had quietly bumped my default tip, and let me set it back before placing anything. Then it remembered how I like that order so I don't have to explain it next time.

It's not perfect, though. One time I asked it for a buffalo chicken pizza, and it ordered a regular pizza with chicken on it. Technically chicken. Technically pizza. So yes, I still check the cart.

Is ordering a pizza hard? No. But "open app, find store, find item, item doesn't exist, find a substitute, fix the tip, checkout" is exactly the kind of tiny friction I don't want in my evening.

## developer guy: the one I actually trust with prod (sort of)

This is the one I lean on hardest. developer guy helped draft this post; the opinions and swearing are mine.

developer guy doesn't use some magic cloud sandbox. It drives the Cursor CLI on my own PC. It runs the agent in a real checkout of my repo, then it handles the rest: runs the build, pushes a branch, opens the PR on GitHub, and waits on the Vercel check.

In the last couple weeks it shipped a pile of stuff to this site:

- The Super Mario redesign you're probably looking at right now. Work history became "level cards" with company logos, skills turned into chips, and certifications became power-up badges.
- Swapped my About photo for one I don't hate, and pointed the social share image at it too.
- Fixed some ugly red lines that showed up whenever you clicked the stars to jump around the home page.
- Fixed the mobile hamburger menu, which was opening just fine and then getting clipped out of existence. Classic `overflow: hidden`.
- Built the pages for projects, this blog, a uses page, and contact.

It even fixed a Vercel build that broke because Node 18 got discontinued, which is precisely the kind of chore I'd let rot for a month.

For my WoW Forever addon side project, [ahprice](https://ahprice.com/?ref=blog), it handles the engineering grunt work: deploy pipelines and the beta server.

My job turned into reviewing PRs and saying "yes" or "no, that's ugly." Which, honestly, is what I wanted my job to be.

## hype guy: marketing I don't have to do

I'm an engineer, not a marketer. hype guy plans the marketing and writes the launch posts, and nothing goes out under my name until I approve the exact text.

It also owns the daily ahprice stats dashboard and tells me what actually matters, like when it told me a downloads dip was just because the beta ended and not worth panicking over. The coolest moment was when it noticed search traffic slipping and suggested a home page title change. I told it to "talk to developer guy about that," and it did. The two bots passed the request back and forth and I got a ready-to-run prompt out the other end. Watching two agents coordinate a change without me copy-pasting between them is kind of wild.

## work work and finances guy: the boring adults

work work helps with work stuff, like resume updates. finances guy runs a daily money check-in and sets reminders for things I'd otherwise forget, like double-checking that a bill actually got paid. Neither of these is flashy. Both of them save me from my own brain.

I'm not going to share details on either, for obvious reasons.

## The parts that still suck

This isn't an ad. Here's the stuff that annoyed me:

**It talks about PRs like it's living in the past.** More than once, developer guy said something like "once this PR is merged..." about a PR that was already merged. It once told hype guy to wait on a PR that had gone in two days earlier, then had to send a correction. I finally told it to always check the live status of a PR before mentioning it. It saved that as a rule, and it's been better since. But I shouldn't have had to say it.

**Background jobs can die silently.** It kicked off a Cursor CLI run on my PC for the redesign. It said it would check back, then it checked back and found the run had died almost immediately without changing anything. And it didn't tell me. I had to ask, "so did you check? why not." It restarted the run and owned it, but that's the kind of shit that kills trust fast.

**You have to tell it how often to check in.** Its default rhythm was checking back every 20-plus minutes, which is an eternity when you're waiting on a deploy. I told it to check in more often, and now it sends a status every 10 minutes. Fine. But it's a reminder that these things need a manager, not just a prompt.

**Guardrails are mandatory.** Every bot asks before it spends money, posts publicly, or merges something I didn't approve. That's not a nice-to-have. That's the whole reason I'm comfortable handing them any of this.

## So is it worth it?

Yeah. Fucking annoyingly, yes.

It's not magic. It's more like having a handful of eager junior teammates who never sleep, occasionally forget what happened yesterday, and need clear rules. I've managed that before. The difference is these ones order my pizza.

If you're an engineer and you're skeptical, good. Stay skeptical. Give it small, boring, reversible jobs first. Make it ask before anything irreversible. Then see how much of your week quietly disappears.
