import type { ErpSuite } from "@/lib/orbit-software-page";

export type ErpShot = {
  src: string;
  frame: "laptop" | "phone";
  width: number;
  height: number;
};

const SHOTS: Record<ErpSuite["ui"], ErpShot> = {
  billing: { src: "/brand/orbit-software/uhd/billing-software.webp", frame: "laptop", width: 1024, height: 535 },
  hotel: { src: "/brand/orbit-software/uhd/hotel-management.webp", frame: "laptop", width: 1024, height: 535 },
  ota: { src: "/brand/orbit-software/uhd/ota-management.webp", frame: "laptop", width: 1024, height: 535 },
  warehouse: { src: "/brand/orbit-software/uhd/warehouse-management.webp", frame: "laptop", width: 1024, height: 535 },
  factory: { src: "/brand/orbit-software/manufacturing-erp.jpg", frame: "laptop", width: 1024, height: 535 },
  pos: { src: "/brand/orbit-software/uhd/restaurant-pos.webp", frame: "laptop", width: 1024, height: 535 },
  crm: { src: "/brand/orbit-software/uhd/crm-software.webp", frame: "laptop", width: 1024, height: 535 },
  saas: { src: "/brand/orbit-software/saas-business-suite.jpg", frame: "laptop", width: 1024, height: 535 },
  web: { src: "/brand/orbit-software/web-apps.jpg", frame: "laptop", width: 1024, height: 535 },
  android: { src: "/brand/orbit-software/android-apps.jpg", frame: "phone", width: 576, height: 1024 },
  ios: { src: "/brand/orbit-software/ios-apps.jpg", frame: "phone", width: 576, height: 1024 },
  tenant: { src: "/brand/orbit-software/saas-management.jpg", frame: "laptop", width: 1024, height: 576 },
};

export function erpSuiteShot(suite: ErpSuite): ErpShot {
  return SHOTS[suite.ui];
}
