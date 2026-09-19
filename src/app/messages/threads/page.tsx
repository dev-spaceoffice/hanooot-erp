import { Badge } from "@/app/_hanooot/Badge"
import { BoardColumn } from "@/app/_hanooot/BoardColumn"
import { DataTable } from "@/app/_hanooot/DataTable"
import { HanoootAppShell } from "@/app/_hanooot/HanoootAppShell"
import { StatCard } from "@/app/_hanooot/StatCard"
import type { HanoootCard, HanoootStat } from "@/app/_hanooot/types"

const stats = [{"label": "Unread", "value": "5", "detail": "tagged comments", "tone": "amber"}, {"label": "Groups", "value": "6", "detail": "Importing · Legal · HR", "tone": "blue"}, {"label": "Threads", "value": "19", "detail": "record-linked", "tone": "green"}, {"label": "People", "value": "13", "detail": "directory search", "tone": "neutral"}] satisfies HanoootStat[]

const columns = [{"title": "Conversations", "cards": [{"title": "Supplier photos review", "meta": "Sourcing SRC-18 · 9 min ago", "value": "Reply", "tone": "blue"}, {"title": "Legal contract clause", "meta": "Matter LEG-44 · 1 hr ago", "value": "@Mariam", "tone": "amber"}]}, {"title": "People search", "cards": [{"title": "Abeer", "meta": "Importing manager", "value": "Send", "tone": "green"}, {"title": "No users match", "meta": "empty search state", "value": "Empty", "tone": "neutral"}]}, {"title": "Activity", "cards": [{"title": "Every comment where tagged", "meta": "Open → record card", "value": "Mention", "tone": "red"}]}] satisfies { title: string; cards: HanoootCard[] }[]

const tableColumns = ["Record", "Assigned", "Conversation", "History"]
const tableRows = [["Sourcing SRC-18", "Abeer", "Supplier photos are ready", "Created · commented · moved"], ["LEG-44", "Mariam", "Clause review", "Draft · reply · owner review"], ["Payroll", "HR", "Payslip note", "Run created · approved"]]
const chips = ["New group", "People", "Thread", "Reply", "Mentions"]

const Page = () => (
  <HanoootAppShell active="messages" primaryAction="New group" title="Messages">
    <div className="mx-auto flex max-w-[1180px] flex-col gap-4" data-hanooot-route="Messages · Threads">
      <section className="rounded-[22px] border border-[#E4E0D6] bg-white p-5 shadow-[0_8px_24px_rgba(40,36,30,0.06)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-[#78736A]">GROUPS • PEOPLE • THREADS • ACTIVITY</p>
        <h1 className="mt-2 text-[28px] font-semibold leading-tight tracking-[-0.035em] text-[#3C382F]">Messages · Threads</h1>
        <p className="mt-3 max-w-3xl text-[13px] leading-6 text-[#78736A]">New group, people search, thread and reply views, mentions, activity handoff and linked record/history panels.</p>
        <div className="mt-4 flex flex-wrap gap-2">{chips.map((chip) => <Badge key={chip}>{chip}</Badge>)}</div>
      </section>
      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">{stats.map((stat) => <StatCard key={stat.label} stat={stat} />)}</section>
      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_330px]">
        <div className="space-y-4">
          <div className="grid gap-3 lg:grid-cols-3">{columns.map((column) => <BoardColumn cards={column.cards} key={column.title} title={column.title} />)}</div>
          <div className="rounded-[22px] border border-[#E4E0D6] bg-white p-4 shadow-[0_8px_24px_rgba(40,36,30,0.06)]">
            <h2 className="mb-4 text-[16px] font-semibold text-[#3C382F]">Record history panel</h2>
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
