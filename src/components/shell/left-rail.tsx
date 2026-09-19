import { navigationItems } from "@/constants/hanooot"
import { cn } from "@/lib/utils"

export const LeftRail = () => (
  <aside className="fixed inset-y-0 start-0 z-30 hidden w-[76px] flex-col items-center bg-[var(--hanooot-rail)] py-4 text-[var(--hanooot-cream)] shadow-xl lg:flex">
    <a
      aria-label="Hanooot home"
      className="grid size-12 place-items-center rounded-2xl bg-[var(--hanooot-brand)] text-2xl font-black text-[var(--hanooot-rail)]"
      href="#overview"
    >
      H
    </a>
    <nav aria-label="التنقل الرئيسي" className="mt-8 flex flex-1 flex-col items-center gap-3">
      {navigationItems.map((item) => (
        <a
          aria-current={item.active ? "page" : undefined}
          className={cn(
            "group grid w-[58px] place-items-center gap-1 rounded-2xl px-2 py-2 text-center text-[10px] font-bold transition",
            item.active
              ? "bg-[var(--hanooot-active)] text-[var(--hanooot-rail)]"
              : "text-[var(--hanooot-muted-rail)] hover:bg-white/10 hover:text-[var(--hanooot-cream)]",
          )}
          href="#overview"
          key={item.label}
          title={item.label}
        >
          <span aria-hidden="true" className="text-lg leading-none">
            {item.icon}
          </span>
          <span>{item.shortLabel}</span>
        </a>
      ))}
    </nav>
    <div className="grid gap-3">
      <button aria-label="Activity" className="size-10 rounded-2xl bg-white/10 text-sm font-bold">
        ◷
      </button>
      <button aria-label="Alerts" className="size-10 rounded-2xl bg-white/10 text-sm font-bold">
        !
      </button>
      <button aria-label="Profile" className="size-10 rounded-full bg-[var(--hanooot-active)] text-sm font-black text-[var(--hanooot-rail)]">
        ل
      </button>
    </div>
  </aside>
)
