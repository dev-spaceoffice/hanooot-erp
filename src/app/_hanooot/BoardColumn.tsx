import { Badge } from "./Badge"
import type { HanoootCard } from "./types"

export const BoardColumn = ({ title, cards }: { title: string; cards: HanoootCard[] }) => (
  <article className="min-h-[220px] rounded-[20px] border border-[#E4E0D6] bg-[#FBFAF7] p-3">
    <div className="mb-3 flex items-center justify-between">
      <h3 className="text-[13px] font-semibold text-[#3C382F]">{title}</h3>
      <span className="rounded-full bg-[#EFEDE6] px-2 py-1 text-[10px] font-semibold text-[#78736A]">{cards.length}</span>
    </div>
    <div className="space-y-3">
      {cards.map((card) => (
        <article className="rounded-[18px] border border-[#E4E0D6] bg-white p-3 shadow-[0_8px_20px_rgba(40,36,30,0.04)]" key={card.title}>
          <div className="flex items-start justify-between gap-3">
            <h4 className="text-[13px] font-semibold text-[#3C382F]">{card.title}</h4>
            <Badge tone={card.tone}>{card.value}</Badge>
          </div>
          <p className="mt-2 text-[12px] leading-5 text-[#78736A]">{card.meta}</p>
        </article>
      ))}
    </div>
  </article>
)
