export type ModuleStatus = "ready" | "stub" | "planned"

export type NavigationItem = {
  label: string
  shortLabel: string
  icon: string
  active?: boolean
}

export type ModuleInventoryItem = {
  title: string
  description: string
  status: ModuleStatus
}

export const navigationItems: NavigationItem[] = [
  { label: "نظرة عامة", shortLabel: "عام", icon: "⌂", active: true },
  { label: "استيراد", shortLabel: "ورد", icon: "⇄" },
  { label: "رسائل", shortLabel: "رسا", icon: "✉" },
  { label: "Drive", shortLabel: "ملف", icon: "▣" },
  { label: "HR", shortLabel: "فري", icon: "◌" },
  { label: "Legal", shortLabel: "قون", icon: "§" },
]

export const moduleInventory: ModuleInventoryItem[] = [
  {
    title: "تسجيل الدخول والأدوار",
    description: "بوابة دخول، حالة مستخدم تجريبية، وبنية جاهزة للصلاحيات.",
    status: "ready",
  },
  {
    title: "لوحة المؤشرات",
    description: "بطاقات أداء ونشاط سريع ومساحات للرسوم المالية والتشغيلية.",
    status: "ready",
  },
  {
    title: "عمليات الاستيراد",
    description: "خط سير الشحن والموردين والجمارك والفواتير كبنية placeholder.",
    status: "stub",
  },
  {
    title: "الرسائل والملفات",
    description: "أسطح أولية للرسائل وDrive دون اتصالات خارجية حية.",
    status: "stub",
  },
  {
    title: "HR والقانوني",
    description: "مخزون وحدات للأفراد والعقود والتنبيهات القانونية.",
    status: "planned",
  },
]

export const activityItems = [
  "تم إنشاء ملف مورد تجريبي للمراجعة.",
  "تذكير: مطابقة ضريبة القيمة المضافة قبل إصدار الفاتورة.",
  "تنبيه شحن: مستند بوليصة الشحن ينتظر الاعتماد.",
]
