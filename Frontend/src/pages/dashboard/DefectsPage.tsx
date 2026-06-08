import { useMemo, useState } from 'react'
import { ProjectSprintFilters } from '@/components/dashboard/ProjectSprintFilters'
import { useProjectSprintFilters } from '@/hooks/useProjectSprintFilters'
import { matchesProjectAndSprint } from '@/lib/projectSprintFilters'
import {
  AlertCircle,
  Bug,
  RefreshCw,
  ShieldAlert,
  TrendingDown,
  XCircle,
} from 'lucide-react'
import { PieChartCard } from '@/components/charts/PieChartCard'
import { TrendChart } from '@/components/charts/TrendChart'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { MetricCard } from '@/components/ui/Card'
import { PageHeader, SearchBar } from '@/components/ui/PageElements'
import { Select } from '@/components/ui/Input'
import { useDashboardData } from '@/contexts/DashboardDataContext'
import { computeDefectMetrics, computeModuleOpenBugs, computePriorityPieData } from '@/lib/defectMetrics'
import { bugStatusConfig, formatDate, formatPercent, severityConfig } from '@/lib/utils'
import type { Severity } from '@/types'

export function DefectsPage() {
  const {
    defectMetrics,
    defectModuleOpenBugs,
    defectPriorityDistribution,
    defects,
    defectTrend,
    projects,
  } = useDashboardData()
  const [search, setSearch] = useState('')
  const [severityFilter, setSeverityFilter] = useState('all')
  const {
    selectedProject,
    selectedSprint,
    setSelectedProject,
    setSelectedSprint,
    projectOptions,
    sprintOptions,
  } = useProjectSprintFilters()

  const scopedDefects = useMemo(() => {
    return defects.filter((defect) =>
      matchesProjectAndSprint(defect, selectedProject, selectedSprint, projects),
    )
  }, [selectedProject, selectedSprint])

  const metrics = useMemo(() => {
    if (selectedProject === 'all' && selectedSprint === 'all') return defectMetrics
    return computeDefectMetrics(scopedDefects)
  }, [selectedProject, selectedSprint, scopedDefects])

  const priorityPieData = useMemo(() => {
    if (selectedProject === 'all' && selectedSprint === 'all') return defectPriorityDistribution
    return computePriorityPieData(scopedDefects)
  }, [selectedProject, selectedSprint, scopedDefects])

  const moduleOpenBugs = useMemo(() => {
    if (selectedProject === 'all' && selectedSprint === 'all') return defectModuleOpenBugs
    return computeModuleOpenBugs(scopedDefects)
  }, [selectedProject, selectedSprint, scopedDefects])

  const filtered = useMemo(() => {
    return scopedDefects.filter((d) => {
      const matchesSearch =
        d.title.toLowerCase().includes(search.toLowerCase()) ||
        d.id.toLowerCase().includes(search.toLowerCase()) ||
        d.project.toLowerCase().includes(search.toLowerCase())
      const matchesSeverity = severityFilter === 'all' || d.severity === severityFilter
      return matchesSearch && matchesSeverity
    })
  }, [scopedDefects, search, severityFilter])

  return (
    <div>
      <PageHeader
        title="Defect Intelligence"
        description="Monitor defect trends, severity distribution, and closure performance across projects."
        action={
          <ProjectSprintFilters
            selectedProject={selectedProject}
            selectedSprint={selectedSprint}
            projectOptions={projectOptions}
            sprintOptions={sprintOptions}
            onProjectChange={setSelectedProject}
            onSprintChange={setSelectedSprint}
          />
        }
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <MetricCard title="Open Bugs" value={metrics.openBugs} icon={Bug} />
        <MetricCard title="Critical Bugs" value={metrics.criticalBugs} icon={ShieldAlert} />
        <MetricCard title="High Severity" value={metrics.highSeverityBugs} icon={AlertCircle} />
        <MetricCard title="Reopen Bugs" value={metrics.reopenedBugs} icon={RefreshCw} />
        <MetricCard title="Beta Bugs" value={metrics.escapedBugs} icon={XCircle} />
        <MetricCard title="Closed Bugs" value={metrics.closedBugs} icon={TrendingDown} />
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-sm font-medium text-surface-500 dark:text-surface-400">Bug Closure Rate</p>
          <p className="mt-1 font-display text-3xl font-semibold text-emerald-600 dark:text-emerald-400">
            {formatPercent(metrics.closureRate)}
          </p>
          <p className="mt-1 text-xs text-surface-400">Last 30 days</p>
        </Card>
        <Card>
          <p className="text-sm font-medium text-surface-500 dark:text-surface-400">Defect Leakage</p>
          <p className="mt-1 font-display text-3xl font-semibold text-amber-600 dark:text-amber-400">
            {formatPercent(metrics.defectLeakage)}
          </p>
          <p className="mt-1 text-xs text-surface-400">Production escape rate</p>
        </Card>
        <Card>
          <p className="text-sm font-medium text-surface-500 dark:text-surface-400">Reopen Rate</p>
          <p className="mt-1 font-display text-3xl font-semibold text-surface-900 dark:text-white">
            {formatPercent(metrics.reopenRate)}
          </p>
          <p className="mt-1 text-xs text-surface-400">Of resolved defects</p>
        </Card>
      </div>

      <div className="mb-8 grid gap-4 lg:grid-cols-2">
        <TrendChart
          title="Defect Trend Analysis"
          description="Monthly opened vs closed defect volume"
          data={defectTrend}
          type="bar"
          primaryLabel="Opened"
          secondaryLabel="Closed"
          primaryColor="#ef4444"
          secondaryColor="#1fa67f"
        />
        <PieChartCard
          title="Priority"
          description="Active defects by priority level"
          data={priorityPieData}
        />
      </div>

      <Card title="Module-wise Defects" className="mb-8">
        <p className="mb-4 text-sm text-surface-500 dark:text-surface-400">
          Summary of open defects grouped by product module.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-surface-100 dark:border-surface-800">
                <th scope="col" className="pb-3 font-medium text-surface-600 dark:text-surface-400">Module</th>
                <th scope="col" className="pb-3 font-medium text-surface-600 dark:text-surface-400">Open Bugs</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
              {moduleOpenBugs.length === 0 ? (
                <tr>
                  <td colSpan={2} className="py-8 text-center text-sm text-surface-500 dark:text-surface-400">
                    No open defects for the selected project and sprint.
                  </td>
                </tr>
              ) : (
                moduleOpenBugs.map((row) => (
                  <tr
                    key={row.module}
                    className="transition-colors hover:bg-surface-50 dark:hover:bg-surface-800/60"
                  >
                    <td className="py-3.5 font-medium text-surface-900 dark:text-white">{row.module}</td>
                    <td className="py-3.5 text-surface-600 dark:text-surface-300">{row.openBugs}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="Recent Defects" className="mb-6">
        <div className="mb-4 flex flex-col gap-4 sm:flex-row">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search defects..."
            className="flex-1"
          />
          <Select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            options={[
              { value: 'all', label: 'All severities' },
              { value: 'critical', label: 'Critical' },
              { value: 'high', label: 'High' },
              { value: 'medium', label: 'Medium' },
              { value: 'low', label: 'Low' },
            ]}
            className="sm:w-44"
            aria-label="Filter by severity"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-surface-100 dark:border-surface-800">
                <th scope="col" className="pb-3 font-medium text-surface-600 dark:text-surface-400">ID</th>
                <th scope="col" className="pb-3 font-medium text-surface-600 dark:text-surface-400">Title</th>
                <th scope="col" className="pb-3 font-medium text-surface-600 dark:text-surface-400">Project</th>
                <th scope="col" className="pb-3 font-medium text-surface-600 dark:text-surface-400">Severity</th>
                <th scope="col" className="pb-3 font-medium text-surface-600 dark:text-surface-400">Status</th>
                <th scope="col" className="pb-3 font-medium text-surface-600 dark:text-surface-400">Assignee</th>
                <th scope="col" className="pb-3 font-medium text-surface-600 dark:text-surface-400">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-sm text-surface-500 dark:text-surface-400">
                    No defects match the current filters.
                  </td>
                </tr>
              ) : (
                filtered.map((defect) => (
                  <tr key={defect.id} className="cursor-pointer transition-colors hover:bg-surface-50 dark:hover:bg-surface-800/60">
                    <td className="py-3.5 font-mono text-xs text-surface-500 dark:text-surface-400">{defect.id}</td>
                    <td className="py-3.5 font-medium text-surface-900 dark:text-white">{defect.title}</td>
                    <td className="py-3.5 text-surface-600 dark:text-surface-300">{defect.project}</td>
                    <td className="py-3.5">
                      <Badge
                        label={severityConfig[defect.severity as Severity].label}
                        className={severityConfig[defect.severity as Severity].className}
                      />
                    </td>
                    <td className="py-3.5">
                      <Badge
                        label={bugStatusConfig[defect.status].label}
                        className={bugStatusConfig[defect.status].className}
                      />
                    </td>
                    <td className="py-3.5 text-surface-600 dark:text-surface-300">{defect.assignee}</td>
                    <td className="py-3.5 text-surface-500 dark:text-surface-400">{formatDate(defect.createdAt)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
