import { Badge } from "@/app/_hanooot/Badge"
import { BoardColumn } from "@/app/_hanooot/BoardColumn"
import { DataTable } from "@/app/_hanooot/DataTable"
import { HanoootAppShell } from "@/app/_hanooot/HanoootAppShell"
import { StatCard } from "@/app/_hanooot/StatCard"
import type { HanoootCard, HanoootStat } from "@/app/_hanooot/types"

const stats = [{"label": "Headcount", "value": "18", "detail": "3 contractors", "tone": "green"}, {"label": "Leave", "value": "5", "detail": "2 awaiting decision", "tone": "amber"}, {"label": "Payroll", "value": "Aug 2026", "detail": "Gross, tax, social security", "tone": "blue"}, {"label": "Docs", "value": "4 missing", "detail": "contracts, IDs, visas", "tone": "red"}] satisfies HanoootStat[]

const columns = [{"title": "Employee", "cards": [{"title": "Abdullah Thamer", "meta": "Sourcing & Logistics Agent", "value": "Active", "tone": "green"}]}, {"title": "Leave requests", "cards": [{"title": "Annual leave", "meta": "Approve / Decline · Decided by", "value": "Pending", "tone": "amber"}]}, {"title": "Payroll run", "cards": [{"title": "AUGUST 2026 RUN", "meta": "Basic · Allow. · Deduct. · Net", "value": "Draft", "tone": "blue"}]}] satisfies { title: string; cards: HanoootCard[] }[]

const tableColumns = ["Employee", "Role", "Document", "Expiry"]
const tableRows = [["Mohammed Alwaidh", "Logistics Manager", "Passport copy", "09 Jul 2026"], ["Abdullah Thamer", "Agent", "Employment contract", "02 Jul 2026"], ["Jihan Ali", "Employee", "ID + visa", "Review"]]
const chips = ["Contact", "Annual leave", "Salary — monthly", "Documents"]

const Page = () => (
  <HanoootAppShell active="hr" primaryAction="Add employee" title="People">
    <div className="mx-auto flex max-w-[1180px] flex-col gap-4" data-hanooot-route="People · People">
      <section className="rounded-[22px] border border-[#E4E0D6] bg-white p-5 shadow-[0_8px_24px_rgba(40,36,30,0.06)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-[#78736A]">HUMAN RESOURCES</p>
        <h1 className="mt-2 text-[28px] font-semibold leading-tight tracking-[-0.035em] text-[#3C382F]">People · People</h1>
        <p className="mt-3 max-w-3xl text-[13px] leading-6 text-[#78736A]">People/headcount, employee table, leave approve/decline, August 2026 payroll run, employee documents, contact, annual leave and salary panels.</p>
        <div className="mt-4 flex flex-wrap gap-2">{chips.map((chip) => <Badge key={chip}>{chip}</Badge>)}</div>
      </section>
      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">{stats.map((stat) => <StatCard key={stat.label} stat={stat} />)}</section>
      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_330px]">
        <div className="space-y-4">
          <div className="grid gap-3 lg:grid-cols-3">{columns.map((column) => <BoardColumn cards={column.cards} key={column.title} title={column.title} />)}</div>
          <div className="rounded-[22px] border border-[#E4E0D6] bg-white p-4 shadow-[0_8px_24px_rgba(40,36,30,0.06)]">
            <h2 className="mb-4 text-[16px] font-semibold text-[#3C382F]">Employee documents</h2>
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
