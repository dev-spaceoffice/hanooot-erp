import type { ReactNode } from "react"
import { Button } from "./button"

type ModalProps = {
  children: ReactNode
  description?: string
  onClose: () => void
  open: boolean
  title: string
}

export const Modal = ({ children, description, onClose, open, title }: ModalProps) => {
  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/35 p-4 backdrop-blur-sm" role="presentation">
      <section
        aria-describedby={description ? "modal-description" : undefined}
        aria-modal="true"
        className="w-full max-w-lg rounded-[24px] border border-[var(--hanooot-border)] bg-[var(--hanooot-card)] p-6 text-start shadow-2xl"
        role="dialog"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-xl font-extrabold text-[var(--hanooot-ink)]">{title}</h2>
            {description ? (
              <p className="text-sm leading-6 text-[var(--hanooot-muted)]" id="modal-description">
                {description}
              </p>
            ) : null}
          </div>
          <Button aria-label="إغلاق النافذة" onClick={onClose} type="button" variant="ghost">
            ×
          </Button>
        </div>
        <div className="mt-6">{children}</div>
      </section>
    </div>
  )
}
