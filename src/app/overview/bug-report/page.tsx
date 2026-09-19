import { Badge } from "@/app/_hanooot/Badge"
import { BoardColumn } from "@/app/_hanooot/BoardColumn"
import { DataTable } from "@/app/_hanooot/DataTable"
import { HanoootAppShell } from "@/app/_hanooot/HanoootAppShell"
import { StatCard } from "@/app/_hanooot/StatCard"
import type { HanoootCard, HanoootStat } from "@/app/_hanooot/types"

const stats = [{"label": "Revenue MTD", "value": "USD 146K", "detail": "last 30 days", "tone": "green"}, {"label": "Open work", "value": "27", "detail": "6 need owner review", "tone": "amber"}, {"label": "Shipments", "value": "14", "detail": "3 need documents", "tone": "blue"}, {"label": "Branch staff", "value": "22", "detail": "Amman · Aqaba · Dubai", "tone": "neutral"}] satisfies HanoootStat[]

const columns = [{"title": "Platform activity", "cards": [{"title": "Order AQB-4471 cleared customs", "meta": "Importing · 14 min ago", "value": "Mark read", "tone": "green"}, {"title": "Mansour Group retainer signed", "meta": "Legal · 2 h ago", "value": "Open →", "tone": "blue"}]}, {"title": "Alerts", "cards": [{"title": "Leave request awaiting approval", "meta": "HR · 5 h ago", "value": "High", "tone": "amber"}, {"title": "New enquiry: Salameh & Sons", "meta": "Legal · Yesterday", "value": "New", "tone": "red"}]}, {"title": "Departments", "cards": [{"title": "Importing Service", "meta": "Leads · pipeline · sourcing · orders", "value": "Open →", "tone": "blue"}, {"title": "REPORT A BUG", "meta": "Target picker · Severity · expected result", "value": "Open", "tone": "red"}]}] satisfies { title: string; cards: HanoootCard[] }[]

const tableColumns = ["Branch", "City", "Staff", "Departments"]
const tableRows = [["Amman — Head office", "Amman, Jordan", "14", "Legal · HR · Importing"], ["Aqaba — Port office", "Aqaba, Jordan", "5", "Importing"], ["Dubai — Trade desk", "Dubai, UAE", "3", "Importing · Legal"]]
const chips = ["Activity", "Alerts", "SIGNED IN AS", "Build label"]

const Page = () => (
  <HanoootAppShell active="overview" primaryAction="Open activity" title="Overview">
    <div className="mx-auto flex max-w-[1180px] flex-col gap-4" data-hanooot-route="Overview · Bug Report">
      <section className="rounded-[22px] border border-[#E4E0D6] bg-white p-5 shadow-[0_8px_24px_rgba(40,36,30,0.06)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-[#78736A]">PLATFORM ACTIVITY</p>
        <h1 className="mt-2 text-[28px] font-semibold leading-tight tracking-[-0.035em] text-[#3C382F]">Overview · Bug Report</h1>
        <p className="mt-3 max-w-3xl text-[13px] leading-6 text-[#78736A]">Executive dashboard from the attached Hanooot bundle: revenue, open work, shipments, branch pulse, activity, alerts, report-a-bug and department shortcuts.</p>
        <div className="mt-4 flex flex-wrap gap-2">{chips.map((chip) => <Badge key={chip}>{chip}</Badge>)}</div>
      </section>
      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">{stats.map((stat) => <StatCard key={stat.label} stat={stat} />)}</section>
      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_330px]">
        <div className="space-y-4">
          <div className="grid gap-3 lg:grid-cols-3">{columns.map((column) => <BoardColumn cards={column.cards} key={column.title} title={column.title} />)}</div>
          <div className="rounded-[22px] border border-[#E4E0D6] bg-white p-4 shadow-[0_8px_24px_rgba(40,36,30,0.06)]">
            <h2 className="mb-4 text-[16px] font-semibold text-[#3C382F]">Branches</h2>
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
