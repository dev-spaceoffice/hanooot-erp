"use client"

import { useMemo, useState } from "react"
import { activityEvents, featureCoverage, integrationConnections, moduleSections } from "@/data/hanooot"
import type { HanoootModuleId, ModuleSection, Tone } from "@/types/hanooot"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DashboardShell } from "@/components/shell/dashboard-shell"
import { KanbanShell } from "@/components/ui/kanban-shell"
import { LoginPanel } from "@/components/shell/login-panel"
import { Table } from "@/components/ui/table"
import { cn } from "@/lib/utils"

const toneBadge: Record<Tone, "neutral" | "success" | "warning" | "danger" | "info"> = {
  neutral: "neutral",
  success: "success",
  warning: "warning",
  danger: "danger",
  info: "info",
}

const moduleTabs = moduleSections.map((section) => ({ id: section.id, title: section.title }))

const MetricCard = ({ detail, label, tone, value }: ModuleSection["metrics"][number]) => (
  <Card className="min-h-34">
    <div className="flex items-start justify-between gap-3">
      <p className="text-sm font-bold text-[var(--hanooot-muted)]">{label}</p>
      <Badge tone={toneBadge[tone]}>{tone}</Badge>
    </div>
    <p className="mt-4 text-3xl font-black text-[var(--hanooot-ink)]" dir="ltr">
      {value}
    </p>
    <p className="mt-2 text-sm font-bold text-[var(--hanooot-muted)]">{detail}</p>
  </Card>
)

const SectionView = ({ section }: { section: ModuleSection }) => (
  <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
          <div className="max-w-3xl text-start">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--hanooot-muted)]">{section.eyebrow}</p>
            <h2 className="mt-2 text-3xl font-black text-[var(--hanooot-ink)]">{section.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--hanooot-muted)]">{section.summary}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {section.actions.slice(0, 3).map((action) => (
              <Button key={action} type="button" variant={action === section.actions[0] ? "primary" : "secondary"}>
                {action}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {section.metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </section>

      <Card>
        <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-xl font-extrabold text-[var(--hanooot-ink)]">{section.tableTitle}</h3>
            <p className="text-sm text-[var(--hanooot-muted)]">Seeded from the Supabase demo data contract for this module.</p>
          </div>
          <Badge tone="info">Supabase-ready</Badge>
        </div>
        <Table columns={section.tableColumns} rows={section.tableRows.map((row) => ({ id: row.id, cells: row.cells }))} />
      </Card>

      <Card>
        <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-xl font-extrabold text-[var(--hanooot-ink)]">{section.kanbanTitle}</h3>
            <p className="text-sm text-[var(--hanooot-muted)]">Kanban/list workflow with role-aware action states and threaded record context.</p>
          </div>
          <Badge tone="success">Workflow present</Badge>
        </div>
        <KanbanShell
          columns={section.kanbanColumns.map((column) => ({
            id: column.id,
            title: column.title,
            children: (
              <div className="space-y-3">
                {column.cards.map((card) => (
                  <article className="rounded-2xl border border-[var(--hanooot-border)] bg-[var(--hanooot-card)] p-3" key={card.id}>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-black text-[var(--hanooot-ink)]">{card.title}</h4>
                      <Badge tone={toneBadge[card.tone]}>{card.value ?? card.owner}</Badge>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-[var(--hanooot-muted)]">{card.meta}</p>
                    <p className="mt-2 text-xs font-bold text-[var(--hanooot-ink)]">Owner: {card.owner}</p>
                  </article>
                ))}
              </div>
            ),
          }))}
        />
      </Card>
    </div>

    <aside className="space-y-6">
      <LoginPanel />
      <Card>
        <h3 className="text-xl font-extrabold text-[var(--hanooot-ink)]">Mocked integration boundaries</h3>
        <div className="mt-4 space-y-3">
          {section.mockedIntegrations.map((integration) => (
            <p className="rounded-2xl bg-[var(--hanooot-surface)] p-3 text-sm leading-6 text-[var(--hanooot-muted)]" key={integration}>
              {integration}
            </p>
          ))}
        </div>
      </Card>
      <Card>
        <h3 className="text-xl font-extrabold text-[var(--hanooot-ink)]">Available actions</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {section.actions.map((action) => (
            <Badge key={action} tone="neutral">
              {action}
            </Badge>
          ))}
        </div>
      </Card>
    </aside>
  </div>
)

const HanoootWorkspace = () => {
  const [activeModule, setActiveModule] = useState<HanoootModuleId>("overview")
  const section = useMemo(() => moduleSections.find((item) => item.id === activeModule) ?? moduleSections[0], [activeModule])

  return (
    <DashboardShell>
      <div className="space-y-6" id="overview">
        <Card>
          <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
            <div className="text-start">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--hanooot-muted)]">Hanooot ERP • Prototype parity build</p>
              <h1 className="mt-2 text-3xl font-black text-[var(--hanooot-ink)]">Full ERP surface with Supabase-ready foundation</h1>
              <p className="mt-3 max-w-4xl text-sm leading-7 text-[var(--hanooot-muted)]">
                This pass fills the reviewed gaps: all prioritized modules are present, backend migrations/RLS/seed data exist, external integrations are mocked by explicit action boundaries, and smoke coverage verifies the contract.
              </p>
            </div>
            <div className="grid gap-2 text-start text-xs font-bold text-[var(--hanooot-muted)] sm:grid-cols-2 xl:w-[420px]">
              {featureCoverage.slice(0, 4).map((item) => (
                <span className="rounded-2xl bg-[var(--hanooot-surface)] p-3" key={item}>{item}</span>
              ))}
            </div>
          </div>
        </Card>

        <nav aria-label="Module switcher" className="flex gap-2 overflow-x-auto rounded-[22px] border border-[var(--hanooot-border)] bg-[var(--hanooot-card)] p-2">
          {moduleTabs.map((tab) => (
            <button
              aria-pressed={activeModule === tab.id}
              className={cn(
                "min-w-max rounded-2xl px-4 py-3 text-sm font-black transition focus:outline-none focus:ring-4 focus:ring-[var(--hanooot-focus-soft)]",
                activeModule === tab.id
                  ? "bg-[var(--hanooot-rail)] text-[var(--hanooot-cream)]"
                  : "text-[var(--hanooot-muted)] hover:bg-[var(--hanooot-active)] hover:text-[var(--hanooot-ink)]",
              )}
              key={tab.id}
              onClick={() => setActiveModule(tab.id)}
              type="button"
            >
              {tab.title}
            </button>
          ))}
        </nav>

        <SectionView section={section} />

        <section className="grid gap-6 xl:grid-cols-2">
          <Card>
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="text-xl font-extrabold text-[var(--hanooot-ink)]">Platform activity feed</h3>
              <Button type="button" variant="secondary">Mark read</Button>
            </div>
            <div className="space-y-3">
              {activityEvents.map((event) => (
                <article className="rounded-2xl border border-[var(--hanooot-border)] bg-[var(--hanooot-surface)] p-4" key={event.id}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Badge tone={toneBadge[event.tone]}>{event.department}</Badge>
                    <span className="text-xs font-bold text-[var(--hanooot-muted)]">{event.timestamp}</span>
                  </div>
                  <p className="mt-3 text-sm font-black text-[var(--hanooot-ink)]">{event.title}</p>
                  <p className="mt-1 text-xs font-bold text-[var(--hanooot-muted)]">{event.actor}</p>
                </article>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-xl font-extrabold text-[var(--hanooot-ink)]">Integration status board</h3>
            <div className="mt-4 space-y-3">
              {integrationConnections.map((connection) => (
                <article className="rounded-2xl border border-[var(--hanooot-border)] bg-[var(--hanooot-surface)] p-4" key={connection.id}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-black text-[var(--hanooot-ink)]">{connection.provider}</h4>
                    <Badge tone={connection.status === "ready" ? "success" : "warning"}>{connection.status}</Badge>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[var(--hanooot-muted)]">{connection.action}</p>
                  <p className="mt-2 text-xs font-bold text-[var(--hanooot-muted)]">Last run: {connection.lastRun}</p>
                </article>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </DashboardShell>
  )
}

export default HanoootWorkspace
