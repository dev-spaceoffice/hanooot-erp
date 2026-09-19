import type { ReactNode } from "react"

type KanbanColumn = {
  id: string
  title: string
  children: ReactNode
}

type KanbanShellProps = {
  columns: KanbanColumn[]
}

export const KanbanShell = ({ columns }: KanbanShellProps) => (
  <div className="grid gap-4 md:grid-cols-3">
    {columns.map((column) => (
      <section className="rounded-[20px] bg-[var(--hanooot-surface)] p-4" key={column.id}>
        <h3 className="mb-3 text-sm font-extrabold text-[var(--hanooot-ink)]">{column.title}</h3>
        <div className="space-y-3">{column.children}</div>
      </section>
    ))}
  </div>
)
