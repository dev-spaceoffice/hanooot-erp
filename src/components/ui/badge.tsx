import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"

type BadgeTone = "success" | "warning" | "neutral"

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode
  tone?: BadgeTone
}

const toneClasses: Record<BadgeTone, string> = {
  success: "bg-[var(--hanooot-success-soft)] text-[var(--hanooot-success)]",
  warning: "bg-[var(--hanooot-warning-soft)] text-[var(--hanooot-warning)]",
  neutral: "bg-[var(--hanooot-active)] text-[var(--hanooot-muted)]",
}

export const Badge = ({ children, className, tone = "neutral", ...props }: BadgeProps) => (
  <span
    className={cn("inline-flex rounded-full px-3 py-1 text-xs font-bold", toneClasses[tone], className)}
    {...props}
  >
    {children}
  </span>
)
