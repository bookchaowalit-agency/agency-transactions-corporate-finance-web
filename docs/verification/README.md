# Verification

หลักฐานและ checklist สำหรับ Transactions & Corporate Finance showcase

## pSEO service page

- Route: `/services/technical-commercial-diligence/`
- ขอบเขต: workflow, deliverables, evidence boundary และ readiness ของ Transactions & Corporate Finance
- ไม่มี lead form, API, database, analytics identifier หรือข้อมูลลูกค้า
- ค่าเริ่มต้นของ build เป็น `noindex` และ `Disallow: /`; เปิด index ได้เฉพาะเมื่อกำหนด `NEXT_PUBLIC_SITE_URL` และ `NEXT_PUBLIC_SITE_INDEXABLE=true` ที่ผ่านการอนุมัติ

## Local checks

```bash
npm run lint
npm run typecheck
npm test        # includes the noindex / Disallow default and the indexing switch (tests/site-config.test.ts)
npm run check   # typecheck + static export
```

CI runs the same checks through the shared workflow (`.github/workflows/ci.yml`) with a line-coverage gate.
