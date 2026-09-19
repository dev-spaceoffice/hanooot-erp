export type HanoootTone = "blue" | "green" | "amber" | "purple" | "red" | "neutral"

export type HanoootStat = {
  label: string
  value: string
  detail: string
  tone: HanoootTone
}

export type HanoootCard = {
  title: string
  meta: string
  value: string
  tone: HanoootTone
}
