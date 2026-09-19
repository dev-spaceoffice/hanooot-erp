import type { ReactNode } from "react"

type TableRow = {
  cells: ReactNode[]
  id: string
}

type TableProps = {
  columns: string[]
  rows: TableRow[]
}

export const Table = ({ columns, rows }: TableProps) => (
  <div className="overflow-hidden rounded-[18px] border border-[var(--hanooot-border)]">
    <table className="w-full min-w-[520px] border-collapse text-start text-sm">
      <thead className="bg-[var(--hanooot-active)] text-[var(--hanooot-muted)]">
        <tr>
          {columns.map((column) => (
            <th className="px-4 py-3 text-start font-bold" key={column} scope="col">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-[var(--hanooot-border)]">
        {rows.map((row) => (
          <tr className="bg-[var(--hanooot-card)] text-[var(--hanooot-ink)]" key={row.id}>
            {row.cells.map((cell, index) => (
              <td className="px-4 py-3" key={`${row.id}-${index}`}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)
