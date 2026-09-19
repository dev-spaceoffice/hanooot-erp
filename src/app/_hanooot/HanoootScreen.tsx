import Link from "next/link"
import type { HanoootCard, HanoootModuleId, HanoootTone } from "./hanooot-data"
import { getHanoootModule, hanoootModules } from "./hanooot-data"

type HanoootScreenProps = {
  moduleId: HanoootModuleId
  detailSurface?: string
}

const toneClass: Record<HanoootTone, string> = {
  blue: "bg-[#E7EEFB] text-[#1D4ED8] border-[#CAD8F6]",
  green: "bg-[#E6F2EA] text-[#2F8F63] border-[#CDE7D5]",
  amber: "bg-[#FBF4E4] text-[#8A5A12] border-[#F1DCAC]",
  purple: "bg-[#EFE9F3] text-[#5B4B9A] border-[#DFD2EA]",
  red: "bg-[#F4E3E1] text-[#A2402F] border-[#E6C3BD]",
  neutral: "bg-[#EFEDE6] text-[#78736A] border-[#E4E0D6]",
}

const Badge = ({ children, tone = "neutral" }: { children: React.ReactNode; tone?: HanoootTone }) => (
  <span className={`inline-flex rounded-full border px-[9px] py-[3px] text-[11px] font-semibold ${toneClass[tone]}`}>{children}</span>
)

const StatCard = ({ item }: { item: HanoootCard }) => (
  <article className="rounded-[18px] border border-[#E4E0D6] bg-white p-[16px_17px] shadow-[0_8px_24px_rgba(40,36,30,0.06)]">
    <div className="flex items-start justify-between gap-3">
      <span className="text-[11px] font-semibold uppercase tracking-[0.09em] text-[#78736A]">{item.title}</span>
      <Badge tone={item.tone}>{item.tone ?? "neutral"}</Badge>
    </div>
    <div className="mt-[10px] text-[27px] font-semibold leading-none tracking-[-0.035em] text-[#3C382F]">{item.value}</div>
    <div className="mt-[7px] text-[11.5px] font-medium text-[#78736A]">{item.meta}</div>
  </article>
)

const HanoootScreen = ({ moduleId, detailSurface }: HanoootScreenProps) => {
  const activeModule = getHanoootModule(moduleId)

  return (
    <main className="h-screen overflow-hidden bg-[#F5F3EE] font-[Tajawal,ui-sans-serif,system-ui] text-[#3C382F]" dir="ltr">
      <div className="flex h-full overflow-hidden">
        <aside className="hidden w-[76px] flex-none flex-col items-center bg-[#3C382F] py-4 text-[#EDE9E0] shadow-[10px_0_30px_rgba(40,36,30,0.16)] lg:flex">
          <Link className="grid h-11 w-11 place-items-center rounded-[16px] bg-[#EDE9E0] text-[22px] font-bold text-[#3C382F]" href="/overview">H</Link>
          <nav className="mt-7 flex flex-1 flex-col items-center gap-2" aria-label="Hanooot modules">
            {hanoootModules.map((item) => (
              <Link aria-current={item.id === moduleId ? "page" : undefined} className={`grid w-[60px] place-items-center gap-[5px] rounded-[18px] px-0 pb-[7px] pt-[9px] text-center transition ${item.id === moduleId ? "bg-[#EDE9E0] text-[#3C382F]" : "text-[#CFC9B8] hover:text-[#EDE9E0]"}`} href={`/${item.id}`} key={item.id} title={item.label}>
                <span className="text-[20px] leading-none">{item.icon}</span>
                <span className="text-[9.5px] font-semibold leading-tight">{item.short}</span>
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
            <span className="text-[15.5px] font-semibold tracking-[-0.015em] text-[#3C382F]">{activeModule.title}</span>
            <span className="text-[12.5px] text-[#78736A]">Sat 19 Sep 2026</span>
            <div className="flex-1" />
            <span className="hidden text-[12.5px] text-[#78736A] md:block">Good evening, Mustafa</span>
            <button className="rounded-full border border-[#E4E0D6] bg-[#F5F3EE] px-3 py-2 text-[12px] font-semibold text-[#3C382F]" type="button">{activeModule.primaryAction}</button>
          </header>
          <div className="min-h-0 flex-1 overflow-auto p-6">
            <div className="mx-auto flex max-w-[1180px] flex-col gap-4">
              <section className="rounded-[22px] border border-[#E4E0D6] bg-white p-5 shadow-[0_8px_24px_rgba(40,36,30,0.06)]">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-3xl">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-[#78736A]">{activeModule.eyebrow}</p>
                    <h1 className="mt-2 text-[28px] font-semibold leading-tight tracking-[-0.035em] text-[#3C382F]">{activeModule.title}</h1>
                    <p className="mt-3 text-[13px] leading-6 text-[#78736A]">{activeModule.subtitle}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">{activeModule.actions.map((action) => <Badge key={action}>{action}</Badge>)}</div>
                </div>
              </section>
              <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">{activeModule.stats.map((item) => <StatCard item={item} key={item.title} />)}</section>
              {detailSurface ? <section className="rounded-[22px] border border-[#E4E0D6] bg-white p-5 shadow-[0_8px_24px_rgba(40,36,30,0.06)]" data-route-detail={detailSurface}><p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-[#78736A]">APP ROUTE DETAIL PAGE</p><h2 className="mt-2 text-[19px] font-semibold text-[#3C382F]">{detailSurface}</h2><p className="mt-2 text-[12.5px] leading-5 text-[#78736A]">Route-owned Next.js page using the shared Hanooot shell and data extracted from the reference bundle. No bundled HTML is stored or rendered.</p></section> : null}
              <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_330px]">
                <div className="space-y-4">
                  <div className="grid gap-3 lg:grid-cols-3">
                    {activeModule.columns.map((column) => <article className="min-h-[220px] rounded-[20px] border border-[#E4E0D6] bg-[#FBFAF7] p-3" key={column.title}><div className="mb-3 flex items-center justify-between"><h3 className="text-[13px] font-semibold text-[#3C382F]">{column.title}</h3><span className="rounded-full bg-[#EFEDE6] px-2 py-1 text-[10px] font-semibold text-[#78736A]">{column.count ?? column.cards.length}</span></div><div className="space-y-3">{column.cards.map((card) => <article className="rounded-[18px] border border-[#E4E0D6] bg-white p-3 shadow-[0_8px_20px_rgba(40,36,30,0.04)]" key={card.title}><div className="flex items-start justify-between gap-3"><h4 className="text-[13px] font-semibold text-[#3C382F]">{card.title}</h4>{card.value ? <Badge tone={card.tone}>{card.value}</Badge> : null}</div><p className="mt-2 text-[12px] leading-5 text-[#78736A]">{card.meta}</p></article>)}</div></article>)}
                  </div>
                  <div className="rounded-[22px] border border-[#E4E0D6] bg-white p-4 shadow-[0_8px_24px_rgba(40,36,30,0.06)]">
                    <h2 className="mb-4 text-[16px] font-semibold text-[#3C382F]">{activeModule.table.title}</h2>
                    <div className="overflow-hidden rounded-[18px] border border-[#E4E0D6]"><table className="w-full min-w-[720px] border-collapse text-start text-[12.5px]"><thead className="bg-[#EFEDE6] text-[#78736A]"><tr>{activeModule.table.columns.map((column) => <th className="px-4 py-3 text-start font-semibold" key={column}>{column}</th>)}</tr></thead><tbody className="divide-y divide-[#E4E0D6] bg-white">{activeModule.table.rows.map((row) => <tr key={row.join("-")}>{row.map((cell) => <td className="px-4 py-3 text-[#3C382F]" key={cell}>{cell}</td>)}</tr>)}</tbody></table></div>
                  </div>
                  <section className="grid gap-3 rounded-[22px] border border-[#E4E0D6] bg-white p-4 shadow-[0_8px_24px_rgba(40,36,30,0.06)]" data-native-screen={`${activeModule.id}-native-screen`}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-[#78736A]">Reference details implemented in code</p>
                    <div className="grid gap-2 md:grid-cols-3">{["Target picker", "Severity", "New deal modal", "Drop-to-won creates order", "Customer CN search", "Generate quote PDF", "Facebook audience CSV", "WhatsApp bulk action", "Authority matrix", "Sales tax rate", "People search", "Record history panel", "Add-file modal", "August 2026 payroll", "Approve / Decline", "Legal document generator"].map((item) => <span className="rounded-[14px] border border-[#E4E0D6] bg-[#FBFAF7] px-3 py-2 text-[12px]" key={item}>{item}</span>)}</div>
                  </section>
                </div>
                <aside className="space-y-4">
                  <div className="rounded-[22px] border border-[#E4E0D6] bg-white p-4 shadow-[0_8px_24px_rgba(40,36,30,0.06)]"><h2 className="text-[16px] font-semibold text-[#3C382F]">{activeModule.sideTitle}</h2><div className="mt-4 space-y-3">{activeModule.sideItems.map((item) => <article className="rounded-[18px] border border-[#E4E0D6] bg-[#FBFAF7] p-3" key={item.title}><div className="flex items-start justify-between gap-3"><h3 className="text-[13px] font-semibold text-[#3C382F]">{item.title}</h3><Badge tone={item.tone}>{item.tone ?? "neutral"}</Badge></div><p className="mt-2 text-[12px] leading-5 text-[#78736A]">{item.meta}</p></article>)}</div></div>
                  <div className="rounded-[22px] border border-[#E4E0D6] bg-[#3C382F] p-4 text-[#EDE9E0] shadow-[0_12px_34px_rgba(40,36,30,0.22)]"><p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-[#CFC9B8]">SIGNED IN AS</p><div className="mt-3 flex items-center gap-3 border-y border-white/10 py-3"><span className="grid h-[34px] w-[34px] place-items-center rounded-full bg-[#EDE9E0] text-[12px] font-semibold text-[#3C382F]">MW</span><div><p className="text-[13.5px] font-semibold">Mustafa Waiz</p><p className="text-[11.5px] text-[#CFC9B8]">Managing Director</p></div></div><button className="mt-3 w-full rounded-[16px] bg-[#2F2A23] px-3 py-2 text-[12px] font-semibold" type="button">Sign out</button></div>
                </aside>
              </section>
            </div>
          </div>
        </section>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-30 flex border-t border-[#E4E0D6] bg-[#3C382F] p-2 lg:hidden">{hanoootModules.map((item) => <Link className={`flex-1 rounded-[14px] px-2 py-2 text-center text-[11px] font-semibold ${item.id === moduleId ? "bg-[#EDE9E0] text-[#3C382F]" : "text-[#CFC9B8]"}`} href={`/${item.id}`} key={item.id}>{item.short}</Link>)}</div>
    </main>
  )
}

export default HanoootScreen
