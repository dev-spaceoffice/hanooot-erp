import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"

type CardProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode
}

export const Card = ({ children, className, ...props }: CardProps) => (
  <section
    className={cn(
      "rounded-[22px] border border-[var(--hanooot-border)] bg-[var(--hanooot-card)] p-5 shadow-[var(--hanooot-shadow-card)]",
      className,
    )}
    {...props}
  >
    {children}
  </section>
)
