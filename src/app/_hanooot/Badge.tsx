import type { HanoootTone } from "./types"

const toneClass: Record<HanoootTone, string> = {
  blue: "bg-[#E7EEFB] text-[#1D4ED8] border-[#CAD8F6]",
  green: "bg-[#E6F2EA] text-[#2F8F63] border-[#CDE7D5]",
  amber: "bg-[#FBF4E4] text-[#8A5A12] border-[#F1DCAC]",
  purple: "bg-[#EFE9F3] text-[#5B4B9A] border-[#DFD2EA]",
  red: "bg-[#F4E3E1] text-[#A2402F] border-[#E6C3BD]",
  neutral: "bg-[#EFEDE6] text-[#78736A] border-[#E4E0D6]",
}

export const Badge = ({ children, tone = "neutral" }: { children: React.ReactNode; tone?: HanoootTone }) => (
  <span className={`inline-flex rounded-full border px-[9px] py-[3px] text-[11px] font-semibold ${toneClass[tone]}`}>{children}</span>
)
