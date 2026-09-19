import { activityItems, moduleInventory } from "@/constants/hanooot"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { KanbanShell } from "@/components/ui/kanban-shell"
import { Table } from "@/components/ui/table"
import { DashboardShell } from "@/components/shell/dashboard-shell"
import { LoginPanel } from "@/components/shell/login-panel"

const statusLabel = {
  ready: "جاهز",
  stub: "مبدئي",
  planned: "لاحقاً",
}

const statusTone = {
  ready: "success",
  stub: "warning",
  planned: "neutral",
} as const

const tradeRows = [
  { id: "po-241", cells: ["PO-241", "شنغهاي", "تدقيق مستندات", "12,400 USD"] },
  { id: "po-309", cells: ["PO-309", "جدة", "جمارك", "8,950 USD"] },
  { id: "po-388", cells: ["PO-388", "دبي", "فاتورة أولية", "21,700 USD"] },
]

const columns = [
  {
    id: "incoming",
    title: "وارد",
    children: <p className="rounded-2xl bg-[var(--hanooot-card)] p-3 text-sm text-[var(--hanooot-muted)]">طلب مورد جديد</p>,
  },
  {
    id: "review",
    title: "مراجعة",
    children: <p className="rounded-2xl bg-[var(--hanooot-card)] p-3 text-sm text-[var(--hanooot-muted)]">تدقيق ضريبي</p>,
  },
  {
    id: "done",
    title: "مكتمل",
    children: <p className="rounded-2xl bg-[var(--hanooot-card)] p-3 text-sm text-[var(--hanooot-muted)]">أرشفة عقد</p>,
  },
]

const OverviewPage = () => (
  <DashboardShell>
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="space-y-6">
        <section className="grid gap-4 md:grid-cols-3">
          {[
            ["قيمة الشحنات", "SAR 482K", "+12%"],
            ["طلبات قيد الاعتماد", "27", "6 عاجلة"],
            ["تنبيهات الامتثال", "9", "3 قانونية"],
          ].map(([label, value, detail]) => (
            <Card className="min-h-36" key={label}>
              <p className="text-sm font-bold text-[var(--hanooot-muted)]">{label}</p>
              <p className="mt-4 text-3xl font-black text-[var(--hanooot-ink)]" dir="ltr">
                {value}
              </p>
              <p className="mt-2 text-sm font-bold text-[var(--hanooot-success)]">{detail}</p>
            </Card>
          ))}
        </section>

        <Card>
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-[var(--hanooot-ink)]">عمليات الاستيراد</h2>
              <p className="text-sm text-[var(--hanooot-muted)]">جدول placeholder يثبت شكل البيانات قبل بناء Supabase schema.</p>
            </div>
            <Badge tone="warning">Mock data</Badge>
          </div>
          <Table columns={["الطلب", "الميناء", "الحالة", "القيمة"]} rows={tradeRows} />
        </Card>

        <Card>
          <div className="mb-4">
            <h2 className="text-xl font-extrabold text-[var(--hanooot-ink)]">مسار العمل</h2>
            <p className="text-sm text-[var(--hanooot-muted)]">Kanban shell مشترك للوحدات القادمة.</p>
          </div>
          <KanbanShell columns={columns} />
        </Card>
      </div>

      <aside className="space-y-6">
        <LoginPanel />
        <Card>
          <h2 className="text-xl font-extrabold text-[var(--hanooot-ink)]">النشاط الأخير</h2>
          <div className="mt-4 space-y-3">
            {activityItems.map((item) => (
              <p className="rounded-2xl bg-[var(--hanooot-surface)] p-3 text-sm leading-6 text-[var(--hanooot-muted)]" key={item}>
                {item}
              </p>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-extrabold text-[var(--hanooot-ink)]">مخزون الوحدات</h2>
          <div className="mt-4 space-y-3">
            {moduleInventory.map((module) => (
              <article className="rounded-2xl border border-[var(--hanooot-border)] p-4" key={module.title}>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-extrabold text-[var(--hanooot-ink)]">{module.title}</h3>
                  <Badge tone={statusTone[module.status]}>{statusLabel[module.status]}</Badge>
                </div>
                <p className="mt-2 text-sm leading-6 text-[var(--hanooot-muted)]">{module.description}</p>
              </article>
            ))}
          </div>
        </Card>
      </aside>
    </div>
  </DashboardShell>
)

export default OverviewPage
