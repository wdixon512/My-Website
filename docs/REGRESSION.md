# Regression suite

Playwright checks in `tests/regression` hit a running site (local or deployed) and
try to catch broken pages, bad meta, soft analytics failures, and odd-input 500s.
The suite is modeled on the AHPrice beta regression pattern: bot UA, opt-out of
tracking, light load, screenshots, and CI after a successful deploy.

## Analytics rule (critical)

Every navigation must opt out of analytics:

1. **URL:** append `?notrack` (helper `withNotrack()` preserves other query params).
2. **User-Agent:** contains `ahprice-regression-bot` (server already drops UAs matching `/bot/`).
3. **localStorage:** `wd_notrack=1` via Playwright `addInitScript`.

Do **not** POST real tracking payloads to `/api/track` except the single bot-UA
test that expects accepted-but-ignored (`204`) or rejected — never proving a write.

Optional CI secret `VERCEL_AUTOMATION_BYPASS_SECRET` is sent as
`x-vercel-protection-bypass` when Preview protection would otherwise block the suite.
It is not required for public Production or unprotected previews.

## Coverage

- **Pages:** `/`, `/home`, `/projects`, `/setup`, `/blog`, `/contact`, `/photos`,
  each published post linked from `/blog`, and `/steam-stats` only if it renders
  without login. Expect HTTP 200, an `H1`, non-trivial body text, no console errors,
  no page errors, no failed same-origin subresources.
- **Links:** crawl internal `a[href]` on those pages; status must be &lt; 400.
- **Meta:** `title`, `meta description`, `og:title`, `og:description`, `og:image`,
  `canonical` (if present: absolute, host `www.will-dixon.com`),
  `google-site-verification`.
- **404:** unknown route → 404 with friendly copy.
- **API / stats:** `/api/stats` without token and with a wrong fake token → 401/404
  (never read a real `STATS_TOKEN`). `/stats` without token must not show data.
  `/api/track` rejects garbage (huge body, invalid JSON, wrong method) without 500.
  One bot-UA track POST is accepted-but-ignored or rejected.
- **Resume / refs:** resume PDF/page links return 200; `?ref=` survives on the URL
  and on in-page ref links.
- **Screenshots:** desktop 1280 and mobile 390 for each page under
  `test-results/screenshots`, plus `document.documentElement.scrollWidth <= viewport`.
- **Odd inputs:** missing blog slug, `%00`, very long slug, `?ref=<script>`,
  `?range=999` on `/api/stats`, trailing slashes, uppercase paths → no 500.

## Run locally

```bash
npm ci
npx playwright install chromium
npm run build
npx next start -p 3200
# other terminal:
BASE_URL=http://localhost:3200 npm run test:regression
```

On Windows PowerShell:

```powershell
$env:BASE_URL="http://localhost:3200"; npm run test:regression
```

Default `BASE_URL` is `http://localhost:3000` if unset.

## CI

`.github/workflows/regression.yml` runs on successful `deployment_status`
(Preview and Production) using `github.event.deployment_status.environment_url`
as `BASE_URL`, and on `workflow_dispatch` with a `base_url` input. Artifacts:
`test-results` and `playwright-report`.
