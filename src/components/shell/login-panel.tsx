import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export const LoginPanel = () => (
  <Card className="grid gap-5 bg-[linear-gradient(145deg,var(--hanooot-card),var(--hanooot-active))]">
    <div className="space-y-2 text-start">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--hanooot-muted)]">Secure access</p>
      <h2 className="text-2xl font-extrabold text-[var(--hanooot-ink)]">دخول الموظفين</h2>
      <p className="text-sm leading-6 text-[var(--hanooot-muted)]">
        شاشة دخول تجريبية جاهزة للربط لاحقاً مع Supabase Auth والأدوار والصلاحيات.
      </p>
    </div>
    <div className="grid gap-4">
      <Input autoComplete="email" label="البريد الإلكتروني" placeholder="user@hanooot.test" type="email" />
      <Input autoComplete="current-password" label="كلمة المرور" placeholder="••••••••" type="password" />
      <Button type="button">متابعة كمدير تجريبي</Button>
    </div>
  </Card>
)
