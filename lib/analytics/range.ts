export type StatsRange = 1 | 7 | 30;

/** Parse ?range= for the stats API/page. Accepts 1/7/30 plus "1d"/"today"/"7d"/"30d"; anything else is 7. */
export function parseRange(raw: unknown): StatsRange {
  const v = (Array.isArray(raw) ? raw[0] : raw);
  const s = typeof v === "string" ? v.trim().toLowerCase() : "";
  if (s === "1" || s === "1d" || s === "today") return 1;
  if (s === "30" || s === "30d") return 30;
  return 7;
}
