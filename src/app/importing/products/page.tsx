import { Badge } from "@/app/_hanooot/Badge"
import { BoardColumn } from "@/app/_hanooot/BoardColumn"
import { DataTable } from "@/app/_hanooot/DataTable"
import { HanoootAppShell } from "@/app/_hanooot/HanoootAppShell"
import { StatCard } from "@/app/_hanooot/StatCard"
import type { HanoootCard, HanoootStat } from "@/app/_hanooot/types"

const stats = [{"label": "Deals won / week", "value": "8", "detail": "last 8 weeks", "tone": "green"}, {"label": "Funnel", "value": "61%", "detail": "lead in → delivered", "tone": "blue"}, {"label": "Orders", "value": "18", "detail": "purchase to delivery", "tone": "amber"}, {"label": "Quote value", "value": "USD 63K", "detail": "priced drafts", "tone": "neutral"}] satisfies HanoootStat[]

const columns = [{"title": "Leads", "cards": [{"title": "Facebook DM — bulk spices", "meta": "Source · Campaign · assignee filter · quick filter", "value": "Call 1", "tone": "blue"}, {"title": "Website enquiry", "meta": "New lead modal · CRM first contact", "value": "New", "tone": "neutral"}]}, {"title": "Pipeline", "cards": [{"title": "Qadri Auto Parts", "meta": "New deal modal · Advance → Lost", "value": "USD 21,700", "tone": "green"}, {"title": "Drop-to-won creates order", "meta": "Order lands in purchase-to-delivery board", "value": "Auto", "tone": "amber"}]}, {"title": "Sourcing", "cards": [{"title": "CN-7629 bearings", "meta": "Customer CN search · supplier photos · customer photos", "value": "RMB 18,400", "tone": "amber"}, {"title": "QR workflow", "meta": "Comments/thread · RMB/USD price fields", "value": "USD 2,540", "tone": "blue"}]}] satisfies { title: string; cards: HanoootCard[] }[]

const tableColumns = ["CN", "DN", "Invoice", "Customer", "Stage"]
const tableRows = [["CN-7629", "DN-218", "INV-2026-118", "Qadri Auto Parts", "Customs"], ["CN-88021", "DN-241", "Draft quote", "Obeidat Trading", "Supplier photos"], ["CN-99210", "DN-309", "Generate quote PDF", "Mansour Group", "Shipment"]]
const chips = ["Products", "Contacts", "Facebook audience CSV", "WhatsApp bulk action", "Zoho status"]

const Page = () => (
  <HanoootAppShell active="importing" primaryAction="+ New lead" title="Importing">
    <div className="mx-auto flex max-w-[1180px] flex-col gap-4" data-hanooot-route="Importing · Products">
      <section className="rounded-[22px] border border-[#E4E0D6] bg-white p-5 shadow-[0_8px_24px_rgba(40,36,30,0.06)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-[#78736A]">TRADE OPERATIONS • FACEBOOK SYNC ACTIVE • LAST RUN 12 MIN AGO</p>
        <h1 className="mt-2 text-[28px] font-semibold leading-tight tracking-[-0.035em] text-[#3C382F]">Importing · Products</h1>
        <p className="mt-3 max-w-3xl text-[13px] leading-6 text-[#78736A]">Leads, campaigns, call attempts, pipeline, sourcing, orders, products, contacts, shipment flow, quote PDF and mocked Zoho/WhatsApp/Facebook surfaces from the reference bundle.</p>
        <div className="mt-4 flex flex-wrap gap-2">{chips.map((chip) => <Badge key={chip}>{chip}</Badge>)}</div>
      </section>
      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">{stats.map((stat) => <StatCard key={stat.label} stat={stat} />)}</section>
      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_330px]">
        <div className="space-y-4">
          <div className="grid gap-3 lg:grid-cols-3">{columns.map((column) => <BoardColumn cards={column.cards} key={column.title} title={column.title} />)}</div>
          <div className="rounded-[22px] border border-[#E4E0D6] bg-white p-4 shadow-[0_8px_24px_rgba(40,36,30,0.06)]">
            <h2 className="mb-4 text-[16px] font-semibold text-[#3C382F]">Orders</h2>
            <DataTable columns={tableColumns} rows={tableRows} />
          </div>
        </div>
        <aside className="rounded-[22px] border border-[#E4E0D6] bg-[#3C382F] p-4 text-[#EDE9E0] shadow-[0_12px_34px_rgba(40,36,30,0.22)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-[#CFC9B8]">SIGNED IN AS</p>
          <div className="mt-3 flex items-center gap-3 border-y border-white/10 py-3"><span className="grid h-[34px] w-[34px] place-items-center rounded-full bg-[#EDE9E0] text-[12px] font-semibold text-[#3C382F]">MW</span><div><p className="text-[13.5px] font-semibold">Mustafa Waiz</p><p className="text-[11.5px] text-[#CFC9B8]">Managing Director</p></div></div>
          <button className="mt-3 w-full rounded-[16px] bg-[#2F2A23] px-3 py-2 text-[12px] font-semibold" type="button">Sign out</button>
        </aside>
      </section>
    </div>
  </HanoootAppShell>
)

export default Page
