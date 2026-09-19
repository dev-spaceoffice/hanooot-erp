import type { ButtonHTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: ButtonVariant
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-[var(--hanooot-rail)] text-[var(--hanooot-cream)] shadow-[var(--hanooot-shadow-soft)] hover:bg-[var(--hanooot-rail-soft)]",
  secondary: "border border-[var(--hanooot-border)] bg-[var(--hanooot-card)] text-[var(--hanooot-ink)] hover:bg-[var(--hanooot-active)]",
  ghost: "text-[var(--hanooot-muted)] hover:bg-[var(--hanooot-active)] hover:text-[var(--hanooot-ink)]",
  danger: "bg-[var(--hanooot-danger)] text-white hover:opacity-90",
}

export const Button = ({ children, className, variant = "primary", ...props }: ButtonProps) => (
  <button
    className={cn(
      "inline-flex min-h-11 items-center justify-center rounded-2xl px-4 py-2 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hanooot-focus)] disabled:cursor-not-allowed disabled:opacity-50",
      variantClasses[variant],
      className,
    )}
    {...props}
  >
    {children}
  </button>
)
