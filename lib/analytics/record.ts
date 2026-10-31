import {
  kBlog,
  kConvRef,
  kEvents,
  kLandings,
  kOutbound,
  kCounters,
  kPages,
  kProjects,
  kRefDomains,
  kRefs,
  kVisitors,
  kVisitorsRef,
  utcDay,
} from "./keys";
import { KvCommand, pipeline } from "./store";
import { CONVERSION_EVENTS, TTL_SECONDS, TrackPayload } from "./types";

function expire(cmds: KvCommand[], key: string) {
  cmds.push(["EXPIRE", key, TTL_SECONDS]);
}

export async function recordHit(payload: TrackPayload): Promise<void> {
  const day = utcDay();
  const cmds: KvCommand[] = [];
  const attributionRef =
    payload.refFirst || payload.refLast || payload.ref || "none";

  cmds.push(["PFADD", kVisitors(day), payload.vid]);
  expire(cmds, kVisitors(day));

  if (attributionRef) {
    cmds.push(["PFADD", kVisitorsRef(day, attributionRef), payload.vid]);
    expire(cmds, kVisitorsRef(day, attributionRef));
    cmds.push(["HINCRBY", kRefs(day), attributionRef, 1]);
    expire(cmds, kRefs(day));
  }

  if (payload.referrerDomain) {
    cmds.push(["HINCRBY", kRefDomains(day), payload.referrerDomain, 1]);
    expire(cmds, kRefDomains(day));
  }

  if (payload.type === "pageview") {
    cmds.push(["HINCRBY", kCounters(day), "pageviews", 1]);
    expire(cmds, kCounters(day));
    const path = payload.path || "/";
    cmds.push(["HINCRBY", kPages(day), path, 1]);
    expire(cmds, kPages(day));
    if (payload.visit) {
      cmds.push(["HINCRBY", kLandings(day), path, 1]);
      expire(cmds, kLandings(day));
    }
  } else if (payload.event) {
    cmds.push(["HINCRBY", kEvents(day), payload.event, 1]);
    expire(cmds, kEvents(day));

    if (CONVERSION_EVENTS.has(payload.event)) {
      cmds.push(["HINCRBY", kConvRef(day), attributionRef, 1]);
      expire(cmds, kConvRef(day));
    }

    if (payload.event === "outbound_click" && payload.target) {
      cmds.push(["HINCRBY", kOutbound(day), payload.target, 1]);
      expire(cmds, kOutbound(day));
    }

    if (payload.event === "project_view" && payload.slug) {
      cmds.push(["HINCRBY", kProjects(day), payload.slug, 1]);
      expire(cmds, kProjects(day));
    }

    if (payload.event === "blog_read" && payload.slug) {
      cmds.push(["HINCRBY", kBlog(day), payload.slug, 1]);
      expire(cmds, kBlog(day));
    }
  }

  await pipeline(cmds);
}
