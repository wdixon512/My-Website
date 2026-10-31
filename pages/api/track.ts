import type { NextApiRequest, NextApiResponse } from "next";
import { recordHit } from "@lib/analytics/record";
import { isBotUa, sanitizePayload } from "@lib/analytics/sanitize";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4kb",
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(405).json({ ok: false });
  }

  if (isBotUa(req.headers["user-agent"])) {
    return res.status(204).end();
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ ok: false });
    }
  }

  const payload = sanitizePayload(body);
  if (!payload) {
    return res.status(400).json({ ok: false });
  }

  try {
    await recordHit(payload);
  } catch {
    // Soft-fail — never break the site for analytics.
    return res.status(204).end();
  }

  return res.status(204).end();
}
