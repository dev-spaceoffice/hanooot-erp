import { Button } from "@/components/ui/button"

type HeaderProps = {
  onBugReport: () => void
}

export const Header = ({ onBugReport }: HeaderProps) => (
  <header className="sticky top-0 z-20 flex min-h-16 items-center justify-between gap-4 border-b border-[var(--hanooot-border)] bg-[var(--hanooot-background)]/85 px-4 backdrop-blur lg:ms-[76px] lg:px-6">
    <div className="text-start">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--hanooot-muted)]">Hanooot ERP</p>
      <h1 className="text-xl font-extrabold text-[var(--hanooot-ink)]">لوحة التحكم الرئيسية</h1>
    </div>
    <div className="flex items-center gap-2">
      <Button className="hidden sm:inline-flex" type="button" variant="secondary">
        النشاط
      </Button>
      <Button onClick={onBugReport} type="button" variant="primary">
        بلّغ عن خطأ
      </Button>
    </div>
  </header>
)
