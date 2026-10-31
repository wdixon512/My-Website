export const dayKey = (day: string) => day;

export const kVisitors = (day: string) => `wd:uv:${day}`;
export const kVisitorsRef = (day: string, ref: string) => `wd:uvref:${day}:${ref}`;
export const kCounters = (day: string) => `wd:counters:${day}`;
export const kPages = (day: string) => `wd:pages:${day}`;
export const kEvents = (day: string) => `wd:events:${day}`;
export const kRefs = (day: string) => `wd:refs:${day}`;
export const kRefDomains = (day: string) => `wd:refdom:${day}`;
export const kLandings = (day: string) => `wd:land:${day}`;
export const kOutbound = (day: string) => `wd:out:${day}`;
export const kProjects = (day: string) => `wd:proj:${day}`;
export const kBlog = (day: string) => `wd:blog:${day}`;
export const kConvRef = (day: string) => `wd:convref:${day}`;

export function utcDay(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

export function dayPlus(day: string, days: number): string {
  const ms = Date.parse(day + "T00:00:00Z") + days * 86400000;
  return new Date(ms).toISOString().slice(0, 10);
}

export function daysInRange(range: 7 | 30, endDay = utcDay()): string[] {
  const out: string[] = [];
  for (let i = range - 1; i >= 0; i--) {
    out.push(dayPlus(endDay, -i));
  }
  return out;
}
