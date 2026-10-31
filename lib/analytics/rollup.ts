import {
  daysInRange,
  kBlog,
  kConvRef,
  kCounters,
  kEvents,
  kLandings,
  kOutbound,
  kPages,
  kProjects,
  kRefDomains,
  kRefs,
  kVisitors,
  kVisitorsRef,
} from "./keys";
import { KvCommand, hashToObject, pipeline } from "./store";
import {
  DayBucket,
  NamedCount,
  RefRow,
  StatsPayload,
  TrackEventName,
} from "./types";

function num(v: unknown): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function mergeHash(into: Record<string, number>, from: Record<string, number>) {
  for (const [k, v] of Object.entries(from)) {
    into[k] = (into[k] || 0) + num(v);
  }
}

function toRanked(map: Record<string, number>, limit = 20): NamedCount[] {
  return Object.entries(map)
    .map(([name, count]) => ({ name, count: num(count) }))
    .filter((r) => r.count > 0 && r.name)
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, limit);
}

const CONV_KEYS: TrackEventName[] = [
  "contact_click",
  "resume_download",
  "resume_view",
  "hire_cta_click",
];

function conversionTotal(events: Record<string, number>): number {
  return CONV_KEYS.reduce((sum, k) => sum + num(events[k]), 0);
}

export async function buildStats(range: 7 | 30): Promise<StatsPayload> {
  const days = daysInRange(range);
  const cmds: KvCommand[] = [];

  // Per day: visitors, counters, events, pages, refs, convref, outbound, blog, projects, landings, refdomains
  for (const day of days) {
    cmds.push(["PFCOUNT", kVisitors(day)]);
    cmds.push(["HGETALL", kCounters(day)]);
    cmds.push(["HGETALL", kEvents(day)]);
    cmds.push(["HGETALL", kPages(day)]);
    cmds.push(["HGETALL", kRefs(day)]);
    cmds.push(["HGETALL", kConvRef(day)]);
    cmds.push(["HGETALL", kOutbound(day)]);
    cmds.push(["HGETALL", kBlog(day)]);
    cmds.push(["HGETALL", kProjects(day)]);
    cmds.push(["HGETALL", kLandings(day)]);
    cmds.push(["HGETALL", kRefDomains(day)]);
  }

  const results = await pipeline(cmds);
  const stride = 11;

  const dayBuckets: DayBucket[] = [];
  const eventsTotal: Record<string, number> = {};
  const pagesTotal: Record<string, number> = {};
  const outboundTotal: Record<string, number> = {};
  const blogTotal: Record<string, number> = {};
  const projectsTotal: Record<string, number> = {};
  const landingsTotal: Record<string, number> = {};
  const referrersTotal: Record<string, number> = {};
  const refVisitors: Record<string, number> = {};
  const refConversions: Record<string, number> = {};
  const allRefs = new Set<string>();

  let visitorsSum = 0;
  let pageviewsSum = 0;

  for (let i = 0; i < days.length; i++) {
    const base = i * stride;
    const day = days[i];
    const visitors = num(results[base]);
    const counters = hashToObject(results[base + 1]);
    const events = hashToObject(results[base + 2]);
    const pages = hashToObject(results[base + 3]);
    const refs = hashToObject(results[base + 4]);
    const convRef = hashToObject(results[base + 5]);
    const outbound = hashToObject(results[base + 6]);
    const blog = hashToObject(results[base + 7]);
    const projects = hashToObject(results[base + 8]);
    const landings = hashToObject(results[base + 9]);
    const refdom = hashToObject(results[base + 10]);

    const pageviews = num(counters.pageviews);
    const conversions = conversionTotal(events);

    dayBuckets.push({ day, visitors, pageviews, conversions });
    visitorsSum += visitors;
    pageviewsSum += pageviews;

    mergeHash(eventsTotal, events);
    mergeHash(pagesTotal, pages);
    mergeHash(outboundTotal, outbound);
    mergeHash(blogTotal, blog);
    mergeHash(projectsTotal, projects);
    mergeHash(landingsTotal, landings);
    mergeHash(referrersTotal, refdom);

    for (const ref of Object.keys(refs)) allRefs.add(ref);
    for (const ref of Object.keys(convRef)) allRefs.add(ref);
    mergeHash(refConversions, convRef);
  }

  // Unique visitors per ref via per-day HLLs (sum of daily uniques).
  if (allRefs.size > 0) {
    const refList = [...allRefs];
    const refCmds: KvCommand[] = [];
    for (const day of days) {
      for (const ref of refList) {
        refCmds.push(["PFCOUNT", kVisitorsRef(day, ref)]);
      }
    }
    const refResults = await pipeline(refCmds);
    for (let di = 0; di < days.length; di++) {
      for (let ri = 0; ri < refList.length; ri++) {
        const idx = di * refList.length + ri;
        const ref = refList[ri];
        refVisitors[ref] = (refVisitors[ref] || 0) + num(refResults[idx]);
      }
    }
  }

  const byRef: RefRow[] = [...allRefs]
    .map((ref) => {
      const visitors = num(refVisitors[ref]);
      const conversions = num(refConversions[ref]);
      return {
        ref,
        visitors,
        conversions,
        rate: visitors > 0 ? conversions / visitors : null,
      };
    })
    .sort(
      (a, b) =>
        b.conversions - a.conversions ||
        b.visitors - a.visitors ||
        a.ref.localeCompare(b.ref)
    )
    .slice(0, 40);

  const conversions = conversionTotal(eventsTotal);

  return {
    range,
    days: dayBuckets,
    totals: {
      visitors: visitorsSum,
      pageviews: pageviewsSum,
      conversions,
      conversionRate: visitorsSum > 0 ? conversions / visitorsSum : null,
      events: eventsTotal,
    },
    byRef,
    topPages: toRanked(pagesTotal),
    topBlog: toRanked(blogTotal),
    outbound: toRanked(outboundTotal),
    referrers: toRanked(referrersTotal),
    landings: toRanked(landingsTotal),
    projects: toRanked(projectsTotal),
  };
}
