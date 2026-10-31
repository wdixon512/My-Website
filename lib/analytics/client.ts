import type { OutboundTarget, TrackEventName, TrackPayload } from "./types";

const VID_KEY = "wd_vid";
const NOTRACK_KEY = "wd_notrack";
const REF_FIRST_KEY = "wd_ref_first";
const REF_LAST_KEY = "wd_ref_last";
const SESSION_KEY = "wd_session";
const OWN_HOSTS = new Set(["will-dixon.com", "www.will-dixon.com", "localhost"]);

function canUseStorage(): boolean {
  try {
    return typeof window !== "undefined" && !!window.localStorage;
  } catch {
    return false;
  }
}

function isOptedOut(): boolean {
  if (!canUseStorage()) return true;
  return localStorage.getItem(NOTRACK_KEY) === "1";
}

function shouldSkip(): boolean {
  if (typeof window === "undefined") return true;
  if (isOptedOut()) return true;
  if (navigator.webdriver) return true;
  const path = window.location.pathname;
  if (path === "/stats" || path.startsWith("/stats/")) return true;
  return false;
}

function sanitizeRef(raw: string): string {
  return raw.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "").slice(0, 64);
}

function getVid(): string {
  let vid = localStorage.getItem(VID_KEY) || "";
  if (!vid) {
    vid =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0;
            const v = c === "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
          });
    localStorage.setItem(VID_KEY, vid);
  }
  return vid;
}

function handleOptFlags() {
  if (!canUseStorage()) return;
  const params = new URLSearchParams(window.location.search);
  if (params.has("notrack")) {
    localStorage.setItem(NOTRACK_KEY, "1");
  } else if (params.has("track")) {
    localStorage.removeItem(NOTRACK_KEY);
  }
}

function referrerHostname(): string {
  try {
    const ref = document.referrer;
    if (!ref) return "";
    const host = new URL(ref).hostname.toLowerCase();
    if (!host || OWN_HOSTS.has(host)) return "";
    return host.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function resolveRefs(): { ref: string; refFirst: string; refLast: string; referrerDomain: string } {
  const params = new URLSearchParams(window.location.search);
  const fromQuery = sanitizeRef(params.get("ref") || "");
  const domain = referrerHostname();

  if (fromQuery) {
    localStorage.setItem(REF_LAST_KEY, fromQuery);
    if (!localStorage.getItem(REF_FIRST_KEY)) {
      localStorage.setItem(REF_FIRST_KEY, fromQuery);
    }
  } else if (domain) {
    if (!localStorage.getItem(REF_FIRST_KEY)) localStorage.setItem(REF_FIRST_KEY, "none");
    if (!localStorage.getItem(REF_LAST_KEY)) localStorage.setItem(REF_LAST_KEY, "none");
  }

  const refFirst = localStorage.getItem(REF_FIRST_KEY) || "none";
  const refLast =
    fromQuery || localStorage.getItem(REF_LAST_KEY) || (domain ? "none" : "none");

  return {
    ref: refLast,
    refFirst,
    refLast,
    referrerDomain: domain,
  };
}

function send(payload: TrackPayload) {
  if (shouldSkip()) return;
  const body = JSON.stringify(payload);
  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      if (navigator.sendBeacon("/api/track", blob)) return;
    }
  } catch {
    /* fall through */
  }
  try {
    void fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    });
  } catch {
    /* ignore */
  }
}

function basePayload(): Omit<TrackPayload, "type"> {
  const refs = resolveRefs();
  return {
    vid: getVid(),
    path: window.location.pathname || "/",
    ...refs,
  };
}

function markVisit(): boolean {
  try {
    if (sessionStorage.getItem(SESSION_KEY)) return false;
    sessionStorage.setItem(SESSION_KEY, "1");
    return true;
  } catch {
    return true;
  }
}

export function trackPageview(path?: string) {
  if (shouldSkip()) return;
  const visit = markVisit();
  send({
    ...basePayload(),
    type: "pageview",
    path: path || window.location.pathname || "/",
    visit,
  });
}

export function trackEvent(
  event: TrackEventName,
  extra?: { target?: OutboundTarget; slug?: string; path?: string }
) {
  if (shouldSkip()) return;
  send({
    ...basePayload(),
    type: "event",
    event,
    path: extra?.path || window.location.pathname || "/",
    target: extra?.target,
    slug: extra?.slug,
  });
}

function outboundTarget(hostname: string): OutboundTarget {
  const h = hostname.toLowerCase().replace(/^www\./, "");
  if (h === "github.com" || h.endsWith(".github.com") || h.endsWith(".github.io")) return "github";
  if (h === "linkedin.com" || h.endsWith(".linkedin.com")) return "linkedin";
  if (h === "ahprice.com" || h.endsWith(".ahprice.com")) return "ahprice";
  if (h === "dmsquire.com" || h.endsWith(".dmsquire.com")) return "dmsquire";
  return "other";
}

function projectSlugFromEl(el: Element): string {
  const raw =
    el.getAttribute("data-project") ||
    el.getAttribute("data-slug") ||
    "";
  return raw.trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "").slice(0, 80);
}

function onClick(e: MouseEvent) {
  if (shouldSkip()) return;
  const target = e.target as Element | null;
  if (!target || typeof target.closest !== "function") return;
  const a = target.closest("a,button,[data-track]") as HTMLElement | null;
  if (!a) return;

  const track = (a.getAttribute("data-track") || "").trim().toLowerCase();
  const href = (a.getAttribute("href") || "").trim();

  if (track === "hire_cta" || track === "hire_cta_click") {
    trackEvent("hire_cta_click", { path: window.location.pathname || "/" });
    return;
  }

  if (track === "project_view") {
    const slug = projectSlugFromEl(a);
    if (slug) trackEvent("project_view", { slug });
    if (/^https?:\/\//i.test(href)) {
      try {
        const url = new URL(href);
        if (!OWN_HOSTS.has(url.hostname.toLowerCase())) {
          trackEvent("outbound_click", { target: outboundTarget(url.hostname) });
        }
      } catch {
        /* ignore */
      }
    }
    return;
  }

  if (track === "contact_click") {
    trackEvent("contact_click");
    return;
  }

  if (track === "resume_download") {
    trackEvent("resume_download");
    return;
  }

  if (track === "resume_view") {
    trackEvent("resume_view");
    return;
  }

  if (/^mailto:/i.test(href)) {
    trackEvent("contact_click");
    return;
  }

  if (/\.pdf($|\?)/i.test(href) || /resume/i.test(href)) {
    if (a.hasAttribute("download")) trackEvent("resume_download");
    else trackEvent("resume_view");
    return;
  }

  if (/^https?:\/\//i.test(href)) {
    try {
      const url = new URL(href);
      if (OWN_HOSTS.has(url.hostname.toLowerCase())) return;
      const slug = projectSlugFromEl(a);
      if (slug) {
        trackEvent("project_view", { slug });
      }
      trackEvent("outbound_click", { target: outboundTarget(url.hostname) });
    } catch {
      /* ignore bad urls */
    }
  }
}

function setupBlogRead() {
  const m = /^\/blog\/([^/]+)\/?$/.exec(window.location.pathname);
  if (!m) return;
  const slug = m[1];
  let sent = false;

  const check = () => {
    if (sent || shouldSkip()) return;
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return;
    const pct = window.scrollY / scrollable;
    if (pct >= 0.75) {
      sent = true;
      trackEvent("blog_read", { slug });
      window.removeEventListener("scroll", check);
    }
  };

  window.addEventListener("scroll", check, { passive: true });
  check();
}

let started = false;

/** Mount once from _app. Tracks pageviews, clicks, and blog reads. */
export function initAnalytics(router: {
  events: {
    on: (event: string, cb: (url: string) => void) => void;
    off: (event: string, cb: (url: string) => void) => void;
  };
  asPath: string;
  pathname: string;
}) {
  if (typeof window === "undefined" || started) return;
  started = true;

  handleOptFlags();
  if (shouldSkip()) return;

  document.addEventListener("click", onClick, true);

  const onRoute = (url: string) => {
    const path = url.split(/[?#]/)[0] || "/";
    if (path === "/stats" || path.startsWith("/stats/")) return;
    trackPageview(path);
    // Re-bind blog scroll for client navigations
    setTimeout(setupBlogRead, 50);
  };

  router.events.on("routeChangeComplete", onRoute);
  trackPageview(router.pathname || window.location.pathname || "/");
  setupBlogRead();
}
