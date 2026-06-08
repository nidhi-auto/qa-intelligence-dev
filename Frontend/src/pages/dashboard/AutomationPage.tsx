import { useMemo, useState } from 'react'
import { ProjectSprintFilters } from '@/components/dashboard/ProjectSprintFilters'
import { useProjectSprintFilters } from '@/hooks/useProjectSprintFilters'
import { computeProjectAutomationMetrics } from '@/lib/automationMetrics'
import { matchesProjectAndSprint } from '@/lib/projectSprintFilters'
import {
  AlertTriangle,
  Clock,
  Percent,
  Zap,
} from 'lucide-react'
import { ModuleAutomationCoverageSection } from '@/components/automation/ModuleAutomationCoverageSection'
import { TrendChart } from '@/components/charts/TrendChart'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { MetricCard } from '@/components/ui/Card'
import { PageHeader, SearchBar } from '@/components/ui/PageElements'
import { useDashboardData } from '@/contexts/DashboardDataContext'
import { formatPercent } from '@/lib/utils'

const trendConfig = {
  improving: { label: 'Improving', className: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' },
  stable: { label: 'Stable', className: 'bg-surface-100 text-surface-600 ring-surface-500/20' },
  worsening: { label: 'Worsening', className: 'bg-red-50 text-red-700 ring-red-600/20' },
}

export function AutomationPage() {
  const { automationMetrics, automationTrend, flakyTests, moduleAutomationCoverage, projects } =
    useDashboardData()
  const [flakySearch, setFlakySearch] = useState('')
  const {
    selectedProject,
    selectedSprint,
    setSelectedProject,
    setSelectedSprint,
    projectOptions,
    sprintOptions,
  } = useProjectSprintFilters()

  const scopedFlakyTests = useMemo(() => {
    return flakyTests.filter((test) =>
      matchesProjectAndSprint(test, selectedProject, selectedSprint, projects),
    )
  }, [selectedProject, selectedSprint])

  const metrics = useMemo(() => {
    if (selectedProject === 'all' && selectedSprint === 'all') return automationMetrics

    if (selectedProject !== 'all') {
      const project = projects.find((item) => item.id === selectedProject)
      if (project) {
        return computeProjectAutomationMetrics(
          project,
          scopedFlakyTests,
          automationMetrics,
          projects.length,
        )
      }
    }

    return {
      ...automationMetrics,
      flakyTests: scopedFlakyTests.length,
    }
  }, [selectedProject, selectedSprint, scopedFlakyTests])

  const filteredFlakyTests = useMemo(() => {
    return scopedFlakyTests.filter(
      (t) =>
        t.name.toLowerCase().includes(flakySearch.toLowerCase()) ||
        t.project.toLowerCase().includes(flakySearch.toLowerCase()),
    )
  }, [scopedFlakyTests, flakySearch])

  return (
    <div>
      <PageHeader
        title="Automation Health"
        description="Monitor automation coverage, stability, and flaky test patterns across your suites."
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
        <MetricCard
          title="Automated Tests"
          value={metrics.automatedTestCases.toLocaleString()}
          icon={Zap}
        />
        <MetricCard
          title="Automation Coverage"
          value={formatPercent(metrics.automationCoverage)}
          icon={Percent}
        />
        <MetricCard
          title="Avg Execution Time"
          value={metrics.avgExecutionTime}
          icon={Clock}
        />
        <MetricCard
          title="Automation Pass Rate"
          value={formatPercent(metrics.automationPassRate)}
          icon={Zap}
        />
        <MetricCard
          title="Automation Fail Rate"
          value={formatPercent(100 - metrics.automationPassRate)}
          icon={AlertTriangle}
        />
        <MetricCard title="Flaky Test" value={metrics.flakyTests} icon={AlertTriangle} />
      </div>

      <div className="mb-8">
        <TrendChart
          title="Automation Coverage Trend"
          description="Portfolio automation coverage growth over time"
          data={automationTrend}
          type="area"
          primaryLabel="Coverage %"
        />
      </div>

      <ModuleAutomationCoverageSection modules={moduleAutomationCoverage} />

      <Card title="Flaky Test Analysis">
        <div className="mb-4">
          <SearchBar
            value={flakySearch}
            onChange={setFlakySearch}
            placeholder="Search flaky tests..."
            className="max-w-md"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-surface-100 dark:border-surface-800">
                <th scope="col" className="pb-3 font-medium text-surface-600 dark:text-surface-400">Test</th>
                <th scope="col" className="pb-3 font-medium text-surface-600 dark:text-surface-400">Project</th>
                <th scope="col" className="pb-3 font-medium text-surface-600 dark:text-surface-400">Failure Rate</th>
                <th scope="col" className="pb-3 font-medium text-surface-600 dark:text-surface-400">Last Run</th>
                <th scope="col" className="pb-3 font-medium text-surface-600 dark:text-surface-400">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
              {filteredFlakyTests.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-sm text-surface-500 dark:text-surface-400">
                    No flaky tests match the selected project and sprint.
                  </td>
                </tr>
              ) : (
                filteredFlakyTests.map((test) => (
                <tr key={test.id} className="cursor-pointer transition-colors hover:bg-surface-50 dark:hover:bg-surface-800/60">
                  <td className="py-3.5 font-mono text-xs text-surface-900 dark:text-white">{test.name}</td>
                  <td className="py-3.5 text-surface-600 dark:text-surface-300">{test.project}</td>
                  <td className="py-3.5 font-semibold text-red-600 dark:text-red-400">{test.failureRate}%</td>
                  <td className="py-3.5 text-surface-500 dark:text-surface-400">{test.lastRun}</td>
                  <td className="py-3.5">
                    <Badge
                      label={trendConfig[test.trend].label}
                      className={trendConfig[test.trend].className}
                    />
                  </td>
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
