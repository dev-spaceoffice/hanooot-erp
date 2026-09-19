export const DataTable = ({ columns, rows }: { columns: string[]; rows: string[][] }) => (
  <div className="overflow-hidden rounded-[18px] border border-[#E4E0D6]">
    <table className="w-full min-w-[720px] border-collapse text-start text-[12.5px]">
      <thead className="bg-[#EFEDE6] text-[#78736A]">
        <tr>{columns.map((column) => <th className="px-4 py-3 text-start font-semibold" key={column}>{column}</th>)}</tr>
      </thead>
      <tbody className="divide-y divide-[#E4E0D6] bg-white">
        {rows.map((row) => <tr key={row.join("-")}>{row.map((cell) => <td className="px-4 py-3 text-[#3C382F]" key={cell}>{cell}</td>)}</tr>)}
      </tbody>
    </table>
  </div>
)
