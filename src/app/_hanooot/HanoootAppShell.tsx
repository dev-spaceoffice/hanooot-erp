import Link from "next/link"

const navItems = [
  ["overview", "⌂", "Home"],
  ["importing", "⇄", "Import"],
  ["settings", "⚙", "Settings"],
  ["messages", "✉", "Messages"],
  ["drive", "▣", "Drive"],
  ["hr", "◌", "HR"],
  ["legal", "§", "Legal"],
]

export const HanoootAppShell = ({ active, title, primaryAction, children }: { active: string; title: string; primaryAction: string; children: React.ReactNode }) => (
  <main className="h-screen overflow-hidden bg-[#F5F3EE] font-[Tajawal,ui-sans-serif,system-ui] text-[#3C382F]" dir="ltr">
    <div className="flex h-full overflow-hidden">
      <aside className="hidden w-[76px] flex-none flex-col items-center bg-[#3C382F] py-4 text-[#EDE9E0] shadow-[10px_0_30px_rgba(40,36,30,0.16)] lg:flex">
        <Link className="grid h-11 w-11 place-items-center rounded-[16px] bg-[#EDE9E0] text-[22px] font-bold text-[#3C382F]" href="/overview">H</Link>
        <nav className="mt-7 flex flex-1 flex-col items-center gap-2" aria-label="Hanooot modules">
          {navItems.map(([id, icon, label]) => (
            <Link aria-current={id === active ? "page" : undefined} className={`grid w-[60px] place-items-center gap-[5px] rounded-[18px] px-0 pb-[7px] pt-[9px] text-center transition ${id === active ? "bg-[#EDE9E0] text-[#3C382F]" : "text-[#CFC9B8] hover:text-[#EDE9E0]"}`} href={`/${id}`} key={id} title={label}>
              <span className="text-[20px] leading-none">{icon}</span>
              <span className="text-[9.5px] font-semibold leading-tight">{label}</span>
            </Link>
          ))}
        </nav>
        <div className="grid gap-3">
          <Link className="relative grid h-10 w-10 place-items-center rounded-[16px] bg-white/10 text-[13px] font-semibold text-[#CFC9B8]" href="/overview/alerts">!<span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[#A8453F] px-1 text-[10px] text-white">4</span></Link>
          <Link className="grid h-10 w-10 place-items-center rounded-[16px] bg-white/10 text-[13px] font-semibold text-[#CFC9B8]" href="/overview/bug-report">🐞</Link>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[#EDE9E0] text-[12px] font-semibold text-[#3C382F]">MW</span>
        </div>
      </aside>
      <section className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <header className="flex h-[56px] flex-none items-center gap-3 border-b border-[#E4E0D6] bg-white px-6">
          <span className="text-[15.5px] font-semibold tracking-[-0.015em] text-[#3C382F]">{title}</span>
          <span className="text-[12.5px] text-[#78736A]">Sat 19 Sep 2026</span>
          <div className="flex-1" />
          <span className="hidden text-[12.5px] text-[#78736A] md:block">Good evening, Mustafa</span>
          <button className="rounded-full border border-[#E4E0D6] bg-[#F5F3EE] px-3 py-2 text-[12px] font-semibold text-[#3C382F]" type="button">{primaryAction}</button>
        </header>
        <div className="min-h-0 flex-1 overflow-auto p-6">{children}</div>
      </section>
    </div>
    <div className="fixed inset-x-0 bottom-0 z-30 flex border-t border-[#E4E0D6] bg-[#3C382F] p-2 lg:hidden">{navItems.map(([id, , label]) => <Link className={`flex-1 rounded-[14px] px-2 py-2 text-center text-[11px] font-semibold ${id === active ? "bg-[#EDE9E0] text-[#3C382F]" : "text-[#CFC9B8]"}`} href={`/${id}`} key={id}>{label}</Link>)}</div>
  </main>
)
