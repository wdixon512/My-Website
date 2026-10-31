import { daysInRange } from "./keys";
import type { StatsPayload } from "./types";

/** Realistic sample dashboard for local screenshots (?demo=1). */
export function demoStats(range: 7 | 30): StatsPayload {
  const days = daysInRange(range);
  const seed = range === 7 ? 3 : 1;

  const dayBuckets = days.map((day, i) => {
    const wave = Math.sin((i + seed) * 0.7) * 0.35 + 1;
    const visitors = Math.max(2, Math.round((8 + (i % 5) * 3) * wave));
    const pageviews = Math.round(visitors * (1.8 + (i % 3) * 0.35));
    const conversions = Math.max(0, Math.round(visitors * (0.06 + (i % 4) * 0.02)));
    return { day, visitors, pageviews, conversions };
  });

  const visitors = dayBuckets.reduce((s, d) => s + d.visitors, 0);
  const pageviews = dayBuckets.reduce((s, d) => s + d.pageviews, 0);
  const conversions = dayBuckets.reduce((s, d) => s + d.conversions, 0);

  return {
    range,
    demo: true,
    days: dayBuckets,
    totals: {
      visitors,
      pageviews,
      conversions,
      conversionRate: visitors > 0 ? conversions / visitors : null,
      events: {
        contact_click: Math.round(conversions * 0.45),
        hire_cta_click: Math.round(conversions * 0.25),
        resume_download: Math.round(conversions * 0.2),
        resume_view: Math.max(1, Math.round(conversions * 0.1)),
        outbound_click: Math.round(visitors * 0.4),
        project_view: Math.round(visitors * 0.22),
        blog_read: Math.round(visitors * 0.15),
      },
    },
    byRef: [
      { ref: "linkedin-profile", visitors: Math.round(visitors * 0.28), conversions: Math.round(conversions * 0.4), rate: 0.18 },
      { ref: "reddit-r-webdev", visitors: Math.round(visitors * 0.18), conversions: Math.round(conversions * 0.15), rate: 0.1 },
      { ref: "ahprice-footer", visitors: Math.round(visitors * 0.14), conversions: Math.round(conversions * 0.12), rate: 0.11 },
      { ref: "github-readme", visitors: Math.round(visitors * 0.1), conversions: Math.round(conversions * 0.08), rate: 0.09 },
      { ref: "none", visitors: Math.round(visitors * 0.22), conversions: Math.round(conversions * 0.15), rate: 0.08 },
      { ref: "blog-share", visitors: Math.round(visitors * 0.08), conversions: Math.round(conversions * 0.1), rate: 0.14 },
    ].map((r) => ({
      ...r,
      rate: r.visitors > 0 ? r.conversions / r.visitors : null,
    })),
    topPages: [
      { name: "/home", count: Math.round(pageviews * 0.42) },
      { name: "/projects", count: Math.round(pageviews * 0.18) },
      { name: "/blog", count: Math.round(pageviews * 0.12) },
      { name: "/blog/five-ai-agents-do-my-chores", count: Math.round(pageviews * 0.1) },
      { name: "/contact", count: Math.round(pageviews * 0.09) },
      { name: "/setup", count: Math.round(pageviews * 0.09) },
    ],
    topBlog: [
      { name: "five-ai-agents-do-my-chores", count: Math.round(visitors * 0.12) },
      { name: "buffalo-chicken-pizza", count: Math.round(visitors * 0.05) },
    ],
    outbound: [
      { name: "github", count: Math.round(visitors * 0.16) },
      { name: "linkedin", count: Math.round(visitors * 0.12) },
      { name: "ahprice", count: Math.round(visitors * 0.08) },
      { name: "dmsquire", count: Math.round(visitors * 0.04) },
      { name: "other", count: Math.round(visitors * 0.03) },
    ],
    referrers: [
      { name: "linkedin.com", count: Math.round(visitors * 0.2) },
      { name: "reddit.com", count: Math.round(visitors * 0.12) },
      { name: "ahprice.com", count: Math.round(visitors * 0.08) },
      { name: "t.co", count: Math.round(visitors * 0.05) },
      { name: "google.com", count: Math.round(visitors * 0.15) },
    ],
    landings: [
      { name: "/home", count: Math.round(visitors * 0.55) },
      { name: "/projects", count: Math.round(visitors * 0.15) },
      { name: "/blog/five-ai-agents-do-my-chores", count: Math.round(visitors * 0.12) },
      { name: "/contact", count: Math.round(visitors * 0.1) },
      { name: "/setup", count: Math.round(visitors * 0.08) },
    ],
    projects: [
      { name: "ahprice", count: Math.round(visitors * 0.14) },
      { name: "dmsquire", count: Math.round(visitors * 0.08) },
      { name: "will-dixon", count: Math.round(visitors * 0.04) },
    ],
  };
}
