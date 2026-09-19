import type { InputHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
}

export const Input = ({ className, id, label, ...props }: InputProps) => {
  const inputId = id ?? label.replaceAll(" ", "-").toLowerCase()

  return (
    <label className="grid gap-2 text-start text-sm font-bold text-[var(--hanooot-ink)]" htmlFor={inputId}>
      {label}
      <input
        id={inputId}
        className={cn(
          "min-h-12 rounded-2xl border border-[var(--hanooot-border)] bg-[var(--hanooot-input)] px-4 text-start text-[var(--hanooot-ink)] outline-none transition placeholder:text-[var(--hanooot-muted)] focus:border-[var(--hanooot-focus)] focus:ring-4 focus:ring-[var(--hanooot-focus-soft)]",
          className,
        )}
        {...props}
      />
    </label>
  )
}
