export type HanoootModuleId = "overview" | "settings" | "importing" | "messages" | "drive" | "hr" | "legal"

export type Tone = "neutral" | "success" | "warning" | "danger" | "info"

export type Metric = {
  label: string
  value: string
  detail: string
  tone: Tone
}

export type TableRecord = {
  id: string
  cells: string[]
}

export type KanbanCard = {
  id: string
  title: string
  meta: string
  owner: string
  value?: string
  tone: Tone
}

export type KanbanColumn = {
  id: string
  title: string
  cards: KanbanCard[]
}

export type ModuleSection = {
  id: HanoootModuleId
  title: string
  eyebrow: string
  summary: string
  metrics: Metric[]
  tableTitle: string
  tableColumns: string[]
  tableRows: TableRecord[]
  kanbanTitle: string
  kanbanColumns: KanbanColumn[]
  actions: string[]
  mockedIntegrations: string[]
}

export type ActivityEvent = {
  id: string
  department: string
  title: string
  actor: string
  timestamp: string
  tone: Tone
}

export type IntegrationConnection = {
  id: string
  provider: string
  status: "mocked" | "ready" | "disabled"
  lastRun: string
  action: string
}
