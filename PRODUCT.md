# Transactions & Corporate Finance showcase — Product truth

> Inferred from the code and copy (no user interview), 2026-10-23. The portfolio card claims review
> (`portfolio-site-web/docs/audits/CARD-CLAIMS-REVIEW-2026-10.md`) has no row for this site; nothing here goes beyond
> what the pages render.

## What it is

A static (Next.js `output: "export"`) showcase page for the Transactions & Corporate Finance vertical, plus one service page
(`/services/technical-commercial-diligence/`). All copy is hard-coded in `lib/site.ts` and `lib/pseo.ts`.

## Who it is for

The owner, to test positioning and search intent for the offer "Technical and commercial diligence". Visitors can read it; they cannot
send anything.

## What works today

1. Home page: promise, buyer, starting offer, scope (M&A, Valuation, Due diligence, Fundraising, Restructuring), what must be built, and an honest readiness note
   (`target` / P2, "เตรียมไว้ใน portfolio").
2. Service page: search intent, a 4-step workflow, deliverables, evidence boundary and the readiness
   gate that must pass before any inquiry is accepted. It carries Service and BreadcrumbList JSON-LD.
3. Search engines are kept out by default (`noindex, nofollow`, `Disallow: /`, empty sitemap). Indexing turns on only
   when an approved `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_SITE_INDEXABLE=true` are set at build time.
4. Browser errors go to Sentry (errors only, personal data stripped) when `NEXT_PUBLIC_SENTRY_DSN` is set.

## What does not work (and must not be claimed)

- Diligence begins where the evidence boundary is explicit.
- ไม่อ้าง valuation, investment advice หรือการรับประกันดีล
- ไม่เปิดเผย transaction records หรือข้อมูลบริษัทใน public page
- งานกฎหมาย บัญชี และการเงินใช้ผู้เชี่ยวชาญที่มีคุณสมบัติเหมาะสม
- No lead form, inquiry intake, account, API, database, analytics identifier or client data.
- No clients, case studies or results. The workflow and deliverables describe a planned scope, not delivered work.

## Live URL and deploy state

- Live: https://solo-agency-transactions-corporate.vercel.app (HTTP 200 on 2026-10-23).
- The Vercel project `solo-agency-transactions-corporate-finance` has no Git link, so a push to `main` does not deploy. The last production deployment
  is the CVE patch (2026-10-23 12:17, Vercel CLI, commit 60ba2fe). The L2 commits (tests, Sentry, CI, heading spacing) stay
  undeployed until the owner connects Vercel Git to `bookchaowalit-agency/agency-transactions-corporate-finance-web` (owner action D9).
- `NEXT_PUBLIC_SENTRY_DSN` is set on the Vercel project (Sentry project `agency-transactions-corporate-finance-web`, org `personal-yu0`); it takes
  effect with the next deployment.

## Boundaries

- Static files only; no server runtime. Keep `npm run check` (typecheck + static export) passing.
- Follow `AGENTS.md`: public-safe positioning only.
