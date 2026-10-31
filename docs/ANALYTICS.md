# Privacy-friendly analytics

Lightweight first-party analytics for will-dixon.com. No cookies, no PII, no IP storage. Visitors get a random id in `localStorage`. Data lives in Upstash Redis (Vercel Marketplace free tier) with ~400-day TTL keys.

## Setup (Vercel)

1. In the Vercel project, open **Storage** → create / connect **Upstash Redis** (free).
2. Connecting injects `KV_REST_API_URL` and `KV_REST_API_TOKEN` (also accepted: `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`).
3. Add a secret env var `STATS_TOKEN` (long random string). Redeploy.
4. Open the private dashboard: `/stats?token=YOUR_STATS_TOKEN`  
   Optional range: `&range=7` (default) or `&range=30`.

If Redis env vars are unset (local `next dev`), an in-memory store is used so tracking still works for the process lifetime.

## Opt-out

- Visit any page with `?notrack` → sets `localStorage wd_notrack=1` and disables tracking.
- Visit with `?track` → clears the flag.
- Automated browsers (`navigator.webdriver`) and obvious bot user-agents are ignored.

## Referral convention

Use `?ref=<source>-<campaign>` (lowercased, `[a-z0-9-]`, max 64).

Suggested sources: `reddit`, `linkedin`, `x`, `discord`, `github`, `ahprice`, `curseforge`, `blog`, `email`, `resume`.

Examples:

- `https://www.will-dixon.com/?ref=linkedin-profile`
- `https://www.will-dixon.com/projects?ref=reddit-r-webdev`
- `https://www.will-dixon.com/?ref=ahprice-footer`

First-touch ref is stored in `localStorage` and never overwritten. Last-touch updates on each new `?ref=`. Conversions attribute to **first-touch**. If there is no `ref`, hostname of `document.referrer` (excluding this site) is recorded as referrer domain with ref `none`.

## Events

| Event | When |
| --- | --- |
| `pageview` | Initial load + client route changes (`visit: true` on new session → landing page) |
| `contact_click` | `mailto:` links / contact CTA |
| `hire_cta_click` | Elements with `data-track="hire_cta"` |
| `resume_download` / `resume_view` | Resume PDF links |
| `outbound_click` | External links (`target`: github \| linkedin \| ahprice \| dmsquire \| other) |
| `project_view` | Project cards/links with `data-track="project_view"` + `data-project` |
| `blog_read` | Blog post scrolled ≥ 75% (once per page view) |

## JSON shape

`GET /api/stats?token=…&range=7|30` (or `Authorization: Bearer …`) returns:

```json
{
  "range": 7,
  "days": [{ "day": "2026-10-31", "visitors": 12, "pageviews": 40, "conversions": 3 }],
  "totals": {
    "visitors": 80,
    "pageviews": 200,
    "conversions": 15,
    "conversionRate": 0.1875,
    "events": { "contact_click": 5, "outbound_click": 20 }
  },
  "byRef": [{ "ref": "linkedin-profile", "visitors": 10, "conversions": 2, "rate": 0.2 }],
  "topPages": [{ "name": "/home", "count": 50 }],
  "topBlog": [{ "name": "post-slug", "count": 8 }],
  "outbound": [{ "name": "github", "count": 12 }],
  "referrers": [{ "name": "reddit.com", "count": 9 }],
  "landings": [{ "name": "/home", "count": 40 }],
  "projects": [{ "name": "ahprice", "count": 11 }]
}
```

`POST /api/track` body (validated & capped server-side):

```json
{
  "vid": "uuid",
  "type": "pageview",
  "path": "/home",
  "visit": true,
  "ref": "linkedin-profile",
  "refFirst": "linkedin-profile",
  "refLast": "linkedin-profile",
  "referrerDomain": ""
}
```

## Local demo screenshots

With Redis unset and `NODE_ENV !== "production"`, `/stats?token=…&demo=1` renders realistic sample data (still token-gated). Set `STATS_TOKEN` in `.env.local` to try it.
