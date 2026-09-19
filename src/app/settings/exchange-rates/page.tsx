import { Badge } from "@/app/_hanooot/Badge"
import { BoardColumn } from "@/app/_hanooot/BoardColumn"
import { DataTable } from "@/app/_hanooot/DataTable"
import { HanoootAppShell } from "@/app/_hanooot/HanoootAppShell"
import { StatCard } from "@/app/_hanooot/StatCard"
import type { HanoootCard, HanoootStat } from "@/app/_hanooot/types"

const stats = [{"label": "Users", "value": "13", "detail": "real reference accounts", "tone": "green"}, {"label": "Branches", "value": "3", "detail": "Amman, Aqaba, Dubai", "tone": "blue"}, {"label": "Base currency", "value": "USD", "detail": "manual rates", "tone": "neutral"}, {"label": "Sales tax rate", "value": "15%", "detail": "locked for non-super admins", "tone": "amber"}] satisfies HanoootStat[]

const columns = [{"title": "Organisation", "cards": [{"title": "Hanooot", "meta": "Active departments and branch cards", "value": "Platform", "tone": "green"}]}, {"title": "Users & roles", "cards": [{"title": "Mustafa Waiz", "meta": "Managing Director · Super admin", "value": "Manage", "tone": "blue"}, {"title": "Mohammed Alwaidh", "meta": "Logistics & Sourcing Manager", "value": "Head", "tone": "amber"}]}, {"title": "Authority matrix", "cards": [{"title": "Department matrix", "meta": "none · view · edit · manage", "value": "LOCKED", "tone": "red"}, {"title": "Super admins bypass matrix", "meta": "every department/subdepartment open", "value": "READ ONLY", "tone": "neutral"}]}] satisfies { title: string; cards: HanoootCard[] }[]

const tableColumns = ["Name", "Organisation", "Phone", "Type", "Used By"]
const tableRows = [["Faisal Obeidat", "Obeidat Trading", "+962 7 9012 4455", "Client", "Legal · Importing"], ["Shenzhen Yuhua", "Yuhua Industrial", "+86 755 8812 3300", "Supplier", "Importing"], ["Jihan Ali", "Hanooot", "+964 770 100 1010", "Employee", "HR"]]
const chips = ["Organisation", "Users", "Roles", "Permissions", "Finance", "Exchange rates", "Notification rules"]

const Page = () => (
  <HanoootAppShell active="settings" primaryAction="+ Add user" title="Settings">
    <div className="mx-auto flex max-w-[1180px] flex-col gap-4" data-hanooot-route="Settings · Exchange Rates">
      <section className="rounded-[22px] border border-[#E4E0D6] bg-white p-5 shadow-[0_8px_24px_rgba(40,36,30,0.06)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-[#78736A]">PLATFORM WIDE • READ ONLY</p>
        <h1 className="mt-2 text-[28px] font-semibold leading-tight tracking-[-0.035em] text-[#3C382F]">Settings · Exchange Rates</h1>
        <p className="mt-3 max-w-3xl text-[13px] leading-6 text-[#78736A]">Organisation, branches, active departments, users, roles, permissions, authority matrix, base currency, tax, exchange rates and notification rules.</p>
        <div className="mt-4 flex flex-wrap gap-2">{chips.map((chip) => <Badge key={chip}>{chip}</Badge>)}</div>
      </section>
      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">{stats.map((stat) => <StatCard key={stat.label} stat={stat} />)}</section>
      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_330px]">
        <div className="space-y-4">
          <div className="grid gap-3 lg:grid-cols-3">{columns.map((column) => <BoardColumn cards={column.cards} key={column.title} title={column.title} />)}</div>
          <div className="rounded-[22px] border border-[#E4E0D6] bg-white p-4 shadow-[0_8px_24px_rgba(40,36,30,0.06)]">
            <h2 className="mb-4 text-[16px] font-semibold text-[#3C382F]">People directory</h2>
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
