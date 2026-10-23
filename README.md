# Transactions & Corporate Finance — ธุรกรรมและการเงินองค์กร

Static showcase site for the Transactions & Corporate Finance vertical of Solo Empire. It shows positioning and is used for message
testing only: one home page and one service page, built from data in `lib/`.

- Visual world: Deal room evidence board
- Vercel project: `solo-agency-transactions-corporate-finance` (live: https://solo-agency-transactions-corporate.vercel.app, deployed by Vercel CLI; it can lag `main`, see `PRODUCT.md`)
- Routes: `/`, `/services/`, `/services/technical-commercial-diligence/`
- Commercial status: `target` / P2 (เตรียมไว้ใน portfolio)
- No database, authentication, API, payment, lead form or customer data.

## What it does not do

- Diligence begins where the evidence boundary is explicit.
- No inquiry intake, contact form, client records or case studies. Earlier freelance/client work is not counted as an
  agency customer here.
- It is `noindex` with `Disallow: /` unless `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_SITE_INDEXABLE=true` are both set
  (an approved public URL).

## Run

```bash
npm ci
npm run dev        # http://localhost:3010
```

## Checks

```bash
npm run lint       # ESLint (eslint-config-next)
npm run typecheck
npm test           # Vitest: site config + robots/sitemap, service data, page renders, Sentry scrubbing
npm run check      # typecheck + static export to out/ (bundled Thai fonts)
```

CI (`.github/workflows/ci.yml`) runs the shared Node workflow (lint, typecheck, Vitest with a line-coverage gate,
then `npm run check`) and the shared security scan on every push and PR to `main`.

## Code map

- `lib/site.ts`: the vertical's public-safe copy and design tokens. `lib/pseo.ts`: the one service page.
- `lib/readiness.ts`: status label and note, shared by the home and service pages.
- `lib/site-config.ts`: public URL parsing, the indexable switch, canonical URLs and page metadata.
- `app/robots.ts`, `app/sitemap.ts`: `Disallow: /` and an empty sitemap unless indexing is approved.
- `lib/sentry.ts` + `instrumentation-client.ts`: browser-only error reporting (static export, no server runtime),
  errors only, personal data stripped; off when `NEXT_PUBLIC_SENTRY_DSN` is unset.
- This repo was generated from `agency-main-web`; its copies of CI, Sentry and Vitest were added by hand in batch
  b-website (2026-10-22/23). Each agency repo owns its own copy (no shared package).
