export type PseoService = Readonly<{
  kind: 'service';
  slug: string;
  name: string;
  title: string;
  description: string;
  intent: string;
  buyer: string;
  context: string;
  workflow: readonly string[];
  deliverables: readonly string[];
  evidence: readonly string[];
  readiness: string;
  agencySlug: string;
  agencyName: string;
  agencyThaiName: string;
  agencyStatus: 'incubating' | 'target' | 'locked';
  agencyStage: string;
}>;

export const pseoService: PseoService = {
  "kind": "service",
  "slug": "technical-commercial-diligence",
  "name": "Technical and commercial diligence",
  "title": "Technical & Commercial Diligence สำหรับการตัดสินใจธุรกรรม",
  "description": "ตรวจระบบหรือความเสี่ยงหนึ่งด้าน โดยแยก fact, assumption, gap และคำถามที่ต้องปิด",
  "intent": "ต้องการเข้าใจ technology, operations หรือ commercial risk ก่อนซื้อขาย ระดมทุน หรือปรับโครงสร้าง",
  "buyer": "Owner, CEO, CFO และผู้ซื้อกิจการ",
  "context": "เริ่มจาก diligence scope ที่แคบและ evidence room ที่ได้รับอนุญาต โดยใช้ qualified partner เมื่อเรื่องอยู่นอกขอบเขต",
  "workflow": [
    "กำหนด transaction question และ materiality threshold",
    "ตรวจ source, assumption, dependency และ missing evidence",
    "จัด risk register พร้อม owner และคำถามที่ต้องปิด",
    "ส่ง diligence memo ที่แยก fact กับ interpretation ชัดเจน"
  ],
  "deliverables": [
    "diligence scope และ request list",
    "fact/assumption/gap register",
    "risk and dependency map",
    "decision memo และ follow-up questions"
  ],
  "evidence": [
    "ไม่อ้าง valuation, investment advice หรือการรับประกันดีล",
    "ไม่เปิดเผย transaction records หรือข้อมูลบริษัทใน public page",
    "งานกฎหมาย บัญชี และการเงินใช้ผู้เชี่ยวชาญที่มีคุณสมบัติเหมาะสม"
  ],
  "readiness": "ต้องมี transaction lead, finance/technical reviewer, confidentiality boundary และ partner handoff ก่อนเริ่มงาน",
  "agencySlug": "transactions-corporate-finance",
  "agencyName": "Transactions & Corporate Finance",
  "agencyThaiName": "ธุรกรรมและการเงินองค์กร",
  "agencyStatus": "target",
  "agencyStage": "P2"
};
