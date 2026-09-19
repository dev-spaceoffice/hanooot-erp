import { Badge } from "./Badge"
import type { HanoootStat } from "./types"

export const StatCard = ({ stat }: { stat: HanoootStat }) => (
  <article className="rounded-[18px] border border-[#E4E0D6] bg-white p-[16px_17px] shadow-[0_8px_24px_rgba(40,36,30,0.06)]">
    <div className="flex items-start justify-between gap-3">
      <span className="text-[11px] font-semibold uppercase tracking-[0.09em] text-[#78736A]">{stat.label}</span>
      <Badge tone={stat.tone}>{stat.tone}</Badge>
    </div>
    <div className="mt-[10px] text-[27px] font-semibold leading-none tracking-[-0.035em] text-[#3C382F]">{stat.value}</div>
    <div className="mt-[7px] text-[11.5px] font-medium text-[#78736A]">{stat.detail}</div>
  </article>
)
