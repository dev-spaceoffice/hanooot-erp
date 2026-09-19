"use client"

import { useMemo, useState } from "react"
import { activity, departmentTones, importingColumns, metrics, moduleCards, ModuleKey, navItems } from "@/data/hanooot"

const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ")

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={cn("rounded-[22px] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[0_18px_50px_rgba(60,56,47,0.08)]", className)}>
    {children}
  </section>
)

const Pill = ({ children, tone = "settings" }: { children: React.ReactNode; tone?: keyof typeof departmentTones }) => {
  const color = departmentTones[tone]
  return (
    <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: color.bg, color: color.fg }}>
      {children}
    </span>
  )
}

const LoginPanel = () => (
  <Card className="mx-auto flex w-full max-w-[420px] flex-col gap-4 p-6">
    <div className="flex items-center gap-3">
      <div className="grid size-12 place-items-center rounded-2xl bg-[var(--rail)] text-xl font-bold text-[var(--cream)]">H</div>
      <div>
        <h1 className="text-2xl font-semibold tracking-[-0.025em]">Hanooot ERP</h1>
        <p className="text-sm text-[var(--muted)]">Internal test build · role-aware access</p>
      </div>
    </div>
    <label className="text-sm font-semibold">Work email<input className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-[var(--input)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--focus)]" defaultValue="ops@hanooot.test" /></label>
    <label className="text-sm font-semibold">Password<input className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-[var(--input)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--focus)]" type="password" defaultValue="hanooot" /></label>
    <button className="rounded-2xl bg-[var(--ink)] px-4 py-3 text-sm font-bold text-[var(--cream)] transition hover:bg-[#2F2A23]">Sign in</button>
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-3 text-xs text-[var(--muted)]"><b className="text-[var(--ink)]">SIGNED IN AS</b><br />Admin · all departments open in demo mode.</div>
  </Card>
)

const Rail = ({ active, onChange }: { active: ModuleKey; onChange: (key: ModuleKey) => void }) => (
  <aside className="flex h-full w-[76px] shrink-0 flex-col items-center gap-3 bg-[var(--rail)] px-2 py-4 text-[var(--cream)]">
    <div className="mb-2 grid size-11 place-items-center rounded-2xl bg-[var(--cream)] text-xl font-bold text-[var(--rail)]">H</div>
    <button className="w-[60px] rounded-[18px] px-1 py-2 text-center text-[11px] text-[#EDE9E0]/80 hover:bg-white/10">Activity</button>
    <div className="h-px w-11 bg-[#EDE9E0]/30" />
    {navItems.map((item) => (
      <button
        key={item.key}
        onClick={() => onChange(item.key)}
        className={cn("flex w-[60px] flex-col items-center gap-1 rounded-[18px] px-1 pb-[7px] pt-[9px] text-[11px] transition", active === item.key ? "bg-[var(--cream)] text-[var(--rail)]" : "text-[#EDE9E0]/75 hover:bg-white/10 hover:text-[#EDE9E0]")}
        aria-pressed={active === item.key}
      >
        <span className="grid size-6 place-items-center rounded-full border border-current text-[10px] font-bold">{item.short}</span>
        {item.label.split(" ")[0]}
      </button>
    ))}
    <div className="mt-auto flex flex-col items-center gap-2">
      <button className="w-[60px] rounded-[18px] px-1 py-2 text-[11px] text-[#EDE9E0]/80 hover:bg-white/10">Alerts</button>
      <button className="w-[60px] rounded-[18px] border border-[#EDE9E0]/20 px-1 py-2 text-[11px] text-[#EDE9E0]/80 hover:bg-white/10">Report<br />bug</button>
      <div className="grid size-11 place-items-center rounded-2xl bg-[#EDE9E0]/15 text-xs font-bold">SA</div>
    </div>
  </aside>
)

const Header = ({ active, rtl, setRtl, dark, setDark }: { active: ModuleKey; rtl: boolean; setRtl: (v: boolean) => void; dark: boolean; setDark: (v: boolean) => void }) => {
  const title = navItems.find((item) => item.key === active)?.label ?? "Overview"
  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b border-[var(--line)] bg-[var(--surface)] px-6">
      <div>
        <h2 className="text-[15.5px] font-semibold tracking-[-0.015em]">{title}</h2>
        <p className="text-xs text-[var(--muted)]">19 Sep 2026 · b23</p>
      </div>
      <div className="flex-1" />
      <span className="text-xs text-[var(--muted)]">Good evening, Salim</span>
      <button onClick={() => setRtl(!rtl)} className="rounded-full border border-[var(--line)] px-3 py-2 text-xs font-semibold">{rtl ? "RTL" : "LTR"}</button>
      <button onClick={() => setDark(!dark)} className="rounded-full border border-[var(--line)] px-3 py-2 text-xs font-semibold">{dark ? "Dark" : "Light"}</button>
    </header>
  )
}

const Overview = () => (
  <div className="grid gap-5 xl:grid-cols-[1.5fr_0.9fr]">
    <div className="grid gap-5 md:grid-cols-2">
      {metrics.map((metric) => (
        <Card key={metric.label}>
          <div className="flex items-start justify-between gap-3"><p className="text-xs font-bold tracking-[0.12em] text-[var(--muted)]">{metric.label}</p><Pill tone={metric.tone as keyof typeof departmentTones}>Open →</Pill></div>
          <p className="mt-5 text-4xl font-semibold tracking-[-0.04em]" dir="ltr">{metric.value}</p>
          <p className="mt-2 text-sm text-[var(--muted)]">{metric.detail}</p>
        </Card>
      ))}
      <Card className="md:col-span-2">
        <div className="mb-4 flex items-center justify-between"><h3 className="font-semibold">Branches</h3><span className="text-sm text-[var(--muted)]">department health</span></div>
        <div className="grid gap-3 md:grid-cols-4">
          {Object.entries(departmentTones).map(([key, color]) => <div key={key} className="rounded-2xl p-4" style={{ background: color.bg, color: color.fg }}><p className="text-sm font-bold capitalize">{key}</p><p className="mt-4 text-2xl font-semibold">Live</p></div>)}
        </div>
      </Card>
    </div>
    <Card>
      <div className="flex items-center justify-between"><h3 className="font-semibold">PLATFORM ACTIVITY</h3><button className="text-xs font-semibold text-[var(--muted)]">Mark read</button></div>
      <div className="mt-4 space-y-3">
        {activity.map((item) => <div key={item.text} className="rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-3"><div className="flex items-center justify-between"><Pill>{item.dept}</Pill><span className="text-xs text-[var(--muted)]">{item.time}</span></div><p className="mt-3 text-sm leading-6">{item.text}</p></div>)}
      </div>
    </Card>
  </div>
)

const Importing = () => (
  <div className="space-y-5">
    <Card className="flex flex-wrap items-center gap-3"><div><h3 className="text-xl font-semibold">Importing</h3><p className="text-sm tracking-[0.18em] text-[var(--muted)]">TRADE OPERATIONS</p></div><div className="flex-1" /><Pill tone="importing">Facebook sync active</Pill><Pill>last run 12 min ago</Pill></Card>
    <div className="grid gap-5 lg:grid-cols-3">{["Deals won per week", "Funnel", "Who is keeping up"].map((title) => <Card key={title}><p className="text-sm font-semibold">{title}</p><div className="mt-4 h-28 rounded-2xl bg-[linear-gradient(135deg,#FBF4E4,#EDE9E0)]" /></Card>)}</div>
    <div className="grid gap-5 xl:grid-cols-3">{importingColumns.map((column) => <Card key={column.title}><div className="flex items-center justify-between"><h3 className="font-semibold">{column.title}</h3><button className="rounded-full bg-[var(--ink)] px-3 py-1 text-xs font-bold text-[var(--cream)]">+ New</button></div><div className="mt-4 space-y-3">{column.items.map((item) => <div key={item} className="rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-4 text-sm">{item}<p className="mt-3 text-xs text-[var(--muted)]">Thread · supplier link · photos / videos · quote action</p></div>)}</div></Card>)}</div>
  </div>
)

const ModuleGrid = ({ active }: { active: Exclude<ModuleKey, "overview" | "importing"> }) => (
  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
    {moduleCards[active].map((item) => <Card key={item}><p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--muted)]">{active}</p><h3 className="mt-4 text-xl font-semibold">{item}</h3><p className="mt-3 text-sm leading-6 text-[var(--muted)]">Prototype-aligned surface with role-aware state, document/activity hooks, and Supabase-ready data boundary.</p></Card>)}
  </div>
)

const BugReport = () => (
  <Card className="fixed bottom-6 end-6 z-20 hidden w-[340px] p-4 shadow-2xl xl:block">
    <div className="flex items-center justify-between"><h3 className="font-semibold">Report a bug</h3><span className="text-xl text-[var(--muted)]">×</span></div>
    <p className="mt-2 text-xs text-[var(--muted)]">Click the thing that’s wrong · severity · notes</p>
    <div className="mt-4 flex gap-2">{["Low", "Medium", "High"].map((s) => <button key={s} className="rounded-full border border-[var(--line)] px-3 py-1 text-xs">{s}</button>)}</div>
    <label className="mt-4 block text-xs font-semibold">What went wrong<textarea className="mt-2 h-20 w-full rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-3 outline-none focus:ring-2 focus:ring-[var(--focus)]" /></label>
  </Card>
)

export const HanoootApp = () => {
  const [active, setActive] = useState<ModuleKey>("overview")
  const [rtl, setRtl] = useState(false)
  const [dark, setDark] = useState(false)
  const content = useMemo(() => {
    if (active === "overview") return <Overview />
    if (active === "importing") return <Importing />
    return <ModuleGrid active={active} />
  }, [active])

  return (
    <main className={cn("h-screen overflow-hidden bg-[var(--bg)] text-[var(--ink)]", dark && "dark-theme")} dir={rtl ? "rtl" : "ltr"}>
      <div className="flex h-full">
        <Rail active={active} onChange={setActive} />
        <section className="flex min-w-0 flex-1 flex-col">
          <Header active={active} rtl={rtl} setRtl={setRtl} dark={dark} setDark={setDark} />
          <div className="flex-1 overflow-auto p-6">
            <div className="mb-5 grid gap-5 lg:grid-cols-[0.8fr_1.4fr]"><LoginPanel /><Card><h3 className="font-semibold">Foundation coverage</h3><p className="mt-3 text-sm leading-7 text-[var(--muted)]">Warm Hanooot shell, RTL toggle, dark mode tokens, role-aware login surface, dashboard cards, activity feed, importing kanban, and placeholders for Settings, Messages, Drive, HR, and Legal.</p></Card></div>
            {content}
          </div>
        </section>
      </div>
      <BugReport />
    </main>
  )
}
