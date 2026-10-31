export type OutboundTarget = "github" | "linkedin" | "ahprice" | "dmsquire" | "other";

export type TrackEventName =
  | "contact_click"
  | "resume_download"
  | "resume_view"
  | "hire_cta_click"
  | "outbound_click"
  | "project_view"
  | "blog_read";

export type TrackPayload = {
  vid: string;
  type: "pageview" | "event";
  path?: string;
  event?: TrackEventName;
  target?: OutboundTarget;
  slug?: string;
  visit?: boolean;
  ref?: string;
  refFirst?: string;
  refLast?: string;
  referrerDomain?: string;
};

export type DayBucket = {
  day: string;
  visitors: number;
  pageviews: number;
  conversions: number;
};

export type NamedCount = {
  name: string;
  count: number;
};

export type RefRow = {
  ref: string;
  visitors: number;
  conversions: number;
  rate: number | null;
};

export type StatsPayload = {
  range: 7 | 30;
  demo?: boolean;
  days: DayBucket[];
  totals: {
    visitors: number;
    pageviews: number;
    conversions: number;
    conversionRate: number | null;
    events: Record<string, number>;
  };
  byRef: RefRow[];
  topPages: NamedCount[];
  topBlog: NamedCount[];
  outbound: NamedCount[];
  referrers: NamedCount[];
  landings: NamedCount[];
  projects: NamedCount[];
};

export const CONVERSION_EVENTS = new Set<TrackEventName>([
  "contact_click",
  "resume_download",
  "resume_view",
  "hire_cta_click",
]);

export const TTL_SECONDS = 400 * 24 * 60 * 60;
