"use client"

import { useState, type ReactNode } from "react"
import { Header } from "./header"
import { LeftRail } from "./left-rail"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type DashboardShellProps = {
  children: ReactNode
}

export const DashboardShell = ({ children }: DashboardShellProps) => {
  const [isBugModalOpen, setIsBugModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[var(--hanooot-background)] text-[var(--hanooot-ink)]">
      <LeftRail />
      <Header onBugReport={() => setIsBugModalOpen(true)} />
      <main className="px-4 py-6 lg:ms-[76px] lg:p-6" id="overview">
        {children}
      </main>
      <Modal
        description="هذه واجهة placeholder لتسجيل الأخطاء داخلياً دون إرسال أي تكامل خارجي في v1."
        onClose={() => setIsBugModalOpen(false)}
        open={isBugModalOpen}
        title="بلاغ خطأ"
      >
        <form className="grid gap-4">
          <Input label="العنوان" placeholder="مثال: مشكلة في بطاقة المورد" />
          <label className="grid gap-2 text-start text-sm font-bold text-[var(--hanooot-ink)]">
            الوصف
            <textarea
              className="min-h-28 rounded-2xl border border-[var(--hanooot-border)] bg-[var(--hanooot-input)] p-4 text-start outline-none focus:border-[var(--hanooot-focus)] focus:ring-4 focus:ring-[var(--hanooot-focus-soft)]"
              placeholder="اكتب التفاصيل التي تساعد الفريق على إعادة إنتاج المشكلة."
            />
          </label>
          <div className="flex justify-end gap-2">
            <Button onClick={() => setIsBugModalOpen(false)} type="button" variant="ghost">
              إلغاء
            </Button>
            <Button type="button">حفظ محلياً</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
