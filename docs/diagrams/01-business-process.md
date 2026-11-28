# 01 — Business process (As-Is / To-Be)

agency-transactions-corporate-finance-web คือเว็บ showcase แบบ static (Next.js `output: "export"`) ของกลุ่มงาน Transactions & Corporate Finance (สถานะ `target` / P2) มีหน้าแรกและหน้า service หน้าเดียว ใช้ทดสอบ positioning และ search intent โดยเจ้าของเท่านั้น ผู้เข้าชมอ่านได้อย่างเดียว ไม่มีฟอร์ม ไม่มี API ไม่มีฐานข้อมูล

Last reviewed: 2026-11-28 · commit `e9a3f7a`

## As-Is (จากโค้ดวันนี้)

```mermaid
flowchart TD
  DEV["push or PR to main"] --> CI["CI: two independent jobs, web (ESLint, typecheck, Vitest, check) and security"]
  CI -->|"fails closed"| CIFAIL["red check on the commit"]
  DEV -->|"push to main deploys via Vercel Git link (verified 2026-11-28), separate from CI, not gated by it"| VERCEL["Vercel project solo-agency-transactions-corporate-finance: static out/"]
  DATA["lib/site.ts + lib/pseo.ts (hard-coded copy)"] --> BUILD["next build, output export, trailingSlash"]
  ENV["NEXT_PUBLIC_SITE_URL + NEXT_PUBLIC_SITE_INDEXABLE"] --> GATE{"SITE_URL valid AND INDEXABLE == true?"}
  GATE -->|no, default| NOIDX["meta noindex, robots Disallow: / (link-preview bots allowed), empty sitemap; canonical and share-image base follow NEXT_PUBLIC_SITE_URL, not the INDEXABLE flag"]
  GATE -->|yes| IDX["index,follow, canonical, sitemap with 3 paths"]
  NOIDX --> BUILD
  IDX --> BUILD
  BUILD --> VERCEL
  VISITOR["visitor"] --> HOME["/ home: promise, scope, readiness note"]
  VISITOR --> SERVICE["/services/ directory (no JSON-LD)"]
  VISITOR --> DETAIL["/services/technical-commercial-diligence/ (Service + BreadcrumbList JSON-LD)"]
  VISITOR --> OTHER["unknown path: not-found page"]
  HOME --> NOFORM["dead end: no form, no API, no database, no inquiry intake"]
  HOME --> PORTFOLIO["out-link to agency portfolio, privacy, status, mail"]
  SERVICE --> NOFORM
  DETAIL --> NOFORM
  VERCEL --> VISITOR
  VISITOR -.->|"browser error"| SENTRY["Sentry error events, if NEXT_PUBLIC_SENTRY_DSN set; beforeSend drops request, user, breadcrumbs, extra, non-platform contexts and strips query strings; SDK client reports/sessions are outside beforeSend [ต้องยืนยัน]"]
```

Sources: `app/page.tsx`, `app/services/page.tsx`, `app/services/[slug]/page.tsx`, `app/robots.ts`, `app/sitemap.ts`, `lib/site-config.ts`, `lib/site.ts`, `lib/pseo.ts`, `lib/readiness.ts`, `components/pseo-page.tsx`, `components/site-links.tsx`, `next.config.ts`, `instrumentation-client.ts`, `lib/sentry.ts`, `.github/workflows/ci.yml`, `README.md`, `PRODUCT.md`

ข้อเท็จจริงสำคัญจากโค้ด:

- ข้อความทั้งหมดอยู่ในโค้ด (`lib/site.ts`, `lib/pseo.ts`) ไม่มีการอ่านข้อมูลตอนรัน; `generateStaticParams` ให้ service slug เดียว (`technical-commercial-diligence`) และ `dynamicParams = false` ดังนั้น path อื่นใต้ `/services/` เป็น 404
- `isIndexable` เป็นจริงเมื่อมี `NEXT_PUBLIC_SITE_URL` ที่ parse ผ่าน (http/https, ไม่มี query, fragment หรือ user:password) และ `NEXT_PUBLIC_SITE_INDEXABLE` เท่ากับ `true` พอดี ถ้าไม่ครบ ทุกหน้าเป็น `noindex, nofollow` และ sitemap ว่าง; canonical แยกจากเงื่อนไขนี้: มีเมื่อ `NEXT_PUBLIC_SITE_URL` ผ่านการ parse (แม้ไม่ได้เปิด index); ภาพ og/share ใช้ `NEXT_PUBLIC_SITE_URL` ถ้าไม่ใช่ loopback ไม่เช่นนั้นใช้โดเมน production ของ site เอง (`lib/site-config.ts`)
- sitemap ในโหมด index มี `/`, `/services`, `/services/technical-commercial-diligence` (ไม่มี trailing slash)
- social card คือ `public/og.png` (วาดโดย `scripts/og.mjs` แล้ว commit ไว้)
- CI มี 2 job อิสระต่อกัน (ไม่มี `needs`): `web` รัน ESLint + typecheck + Vitest (coverage gate 76%) + `npm run check` และ `security` (scan ที่ใช้ร่วมกัน) ซึ่งรันได้แม้ `web` ล้ม (`.github/workflows/ci.yml`); CI ไม่ deploy
- Sentry เปิดเฉพาะฝั่ง browser เมื่อมี DSN (`instrumentation-client.ts`, `lib/sentry.ts`) ไม่มี DSN คือปิด; `beforeSend` ลบ request/user/breadcrumbs/extra และ context ที่ไม่ใช่ข้อมูลแพลตฟอร์ม กับตัด query/hash ออกจากข้อความ ไม่ได้ลบข้อมูลอื่นทั้งหมด (stack trace และชื่อ error ยังส่ง); `beforeSend` ครอบเฉพาะ error event ส่วน client reports/session ของ SDK ไม่ผ่าน `beforeSend` และ `sentryOptions()` ไม่ได้ปิด [ต้องยืนยัน] ว่า production ส่งอะไรบ้าง
- การ deploy: ในโค้ดไม่มี deploy step (`ci.yml` ไม่ deploy) แต่ Vercel project `solo-agency-transactions-corporate-finance` มี Git link ไป GitHub repo นี้ production branch `main` จึง push เข้า `main` แล้ว deploy (ตรวจผ่าน Vercel API 2026-11-28) เป็นเส้นทางแยกจาก CI ไม่ถูก CI gate; production = e9aa438 ผ่าน Vercel Git; `main` HEAD ea45666 ล้ำหน้าเฉพาะ commit ใน docs/. `PRODUCT.md` (2026-10-23) ที่บอกว่าไม่มี Git link และ deploy ด้วย CLI เป็นข้อมูลเก่า
- sitemap ใช้ path ไม่มี trailing slash ทั้งที่ `next.config.ts` ตั้ง `trailingSlash: true` (`app/sitemap.ts`) [ต้องยืนยัน] ว่าตั้งใจหรือไม่; มีผลเมื่อเปิด index เท่านั้น

## To-Be (จาก PRODUCT.md)

```mermaid
flowchart TD
  GITLINK["Vercel Git link to repo (owner action D9, done, verified 2026-11-28)"] --> PUSH["push to main"]
  PUSH --> DEPLOY["Vercel deploys main (Git integration, separate from CI, not gated by it)"]
  PUSH --> CI["CI: web + security (separate check)"]
  DEPLOY --> BUILD["static export out/"]
  BUILD --> SITE["pages live, noindex until indexing is approved"]
```

Sources: `PRODUCT.md` (Live URL and deploy state)

## Gap

| ID | As-Is → To-Be | Status | Owner | Evidence |
|---|---|---|---|---|
| G1 | deploy by Vercel CLI, `main` push does not deploy → Vercel Git link, push to `main` deploys | done | owner | `PRODUCT.md` (owner action D9, 2026-10-23); Vercel API 2026-11-28: project `solo-agency-transactions-corporate-finance` Git link → `bookchaowalit-agency/agency-transactions-corporate-finance-web`, production branch `main` |
| G2 | noindex by default → owner decides when to set an approved `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_SITE_INDEXABLE=true`. Inquiry intake is a separate matter: out of scope for this showcase (no lead collection), and the readiness gate in `lib/pseo.ts` must pass before any inquiry is accepted | decide | owner | `PRODUCT.md`, `lib/pseo.ts` (readiness), `AGENTS.md` (no lead collection); owner decision needed for indexing; no spec in repo |

## Open questions

- ไม่มีคำถามค้างเรื่อง Git link: ปิดแล้ว (production = e9aa438 ผ่าน Vercel Git; `main` HEAD ea45666 ล้ำหน้าเฉพาะ commit ใน docs/)
