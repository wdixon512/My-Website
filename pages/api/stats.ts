import type { NextApiRequest, NextApiResponse } from "next";
import { authorizeStats } from "@lib/analytics/auth";
import { demoStats } from "@lib/analytics/demo";
import { buildStats } from "@lib/analytics/rollup";
import { hasRedis } from "@lib/analytics/store";

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

  const rangeRaw = typeof req.query.range === "string" ? req.query.range : "7";
  const range: 7 | 30 = rangeRaw === "30" ? 30 : 7;
  const demo =
    req.query.demo === "1" &&
    !hasRedis() &&
    process.env.NODE_ENV !== "production";

  try {
    const data = demo ? demoStats(range) : await buildStats(range);
    res.setHeader("Cache-Control", "private, no-store");
    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ error: "stats_failed" });
  }
}
