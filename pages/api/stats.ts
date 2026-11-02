import type { NextApiRequest, NextApiResponse } from "next";
import { authorizeStats } from "@lib/analytics/auth";
import { demoStats } from "@lib/analytics/demo";
import { buildStats } from "@lib/analytics/rollup";
import { hasRedis } from "@lib/analytics/store";
import { parseRange } from "@lib/analytics/range";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "method_not_allowed" });
  }

  const auth = authorizeStats(req);
  if (auth === "missing") {
    return res.status(404).json({ error: "not_configured" });
  }
  if (auth === "denied") {
    return res.status(404).json({ error: "not_found" });
  }

  const range = parseRange(req.query.range);
  const demo =
    req.query.demo === "1" &&
    !hasRedis() &&
    process.env.NODE_ENV !== "production";

  try {
    const data = demo ? demoStats(range) : await buildStats(range);
    res.setHeader("Cache-Control", "private, no-store");
    // storage tells us whether hits persist (redis) or only live in one instance's memory.
    return res.status(200).json({ ...data, storage: hasRedis() ? "redis" : "memory" });
  } catch (err) {
    console.error("[stats] buildStats failed:", (err as Error)?.message || err);
    return res.status(500).json({ error: "stats_failed" });
  }
}
