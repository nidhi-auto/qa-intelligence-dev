import { useMemo, useState } from 'react'
import { ProjectSprintFilters } from '@/components/dashboard/ProjectSprintFilters'
import { useProjectSprintFilters } from '@/hooks/useProjectSprintFilters'
import { matchesProjectAndSprint } from '@/lib/projectSprintFilters'
import { computeTestExecutionMetrics } from '@/lib/testExecutionMetrics'
import {
  Ban,
  CheckCircle2,
  ClipboardList,
  Play,
  XCircle,
} from 'lucide-react'
import { TrendChart } from '@/components/charts/TrendChart'
import { TestRateKpiCard } from '@/components/dashboard/TestRateKpiCard'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { MetricCard } from '@/components/ui/Card'
import { PageHeader, SearchBar } from '@/components/ui/PageElements'
import { useDashboardData } from '@/contexts/DashboardDataContext'
import { formatPercent } from '@/lib/utils'

const statusConfig = {
  passed: { label: 'Passed', className: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' },
  failed: { label: 'Failed', className: 'bg-red-50 text-red-700 ring-red-600/20' },
  blocked: { label: 'Blocked', className: 'bg-amber-50 text-amber-700 ring-amber-600/20' },
  pending: { label: 'Pending', className: 'bg-surface-100 text-surface-600 ring-surface-500/20' },
}

export function TestsPage() {
  const { projects, testExecutionMetrics, testExecutions, testRateTrends, testTrend } =
    useDashboardData()
  const [search, setSearch] = useState('')
  const {
    selectedProject,
    selectedSprint,
    setSelectedProject,
    setSelectedSprint,
    projectOptions,
    sprintOptions,
  } = useProjectSprintFilters()

  const scopedRuns = useMemo(() => {
    return testExecutions.filter((run) =>
      matchesProjectAndSprint(run, selectedProject, selectedSprint, projects),
    )
  }, [testExecutions, projects, selectedProject, selectedSprint])

  const metrics = useMemo(() => {
    if (selectedProject === 'all' && selectedSprint === 'all') return testExecutionMetrics
    return computeTestExecutionMetrics(scopedRuns)
  }, [selectedProject, selectedSprint, scopedRuns, testExecutionMetrics])

  const filtered = useMemo(() => {
    return scopedRuns.filter(
      (t) =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.project.toLowerCase().includes(search.toLowerCase()) ||
        t.suite.toLowerCase().includes(search.toLowerCase()),
    )
  }, [scopedRuns, search])

  return (
    <div>
      <PageHeader
        title="Test Execution"
        description="Track test case coverage, execution progress, and pass/fail rates across all projects."
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

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <MetricCard
          title="Total Test Cases"
          value={metrics.totalTestCases.toLocaleString()}
          icon={ClipboardList}
        />
        <MetricCard
          title="Executed Tests"
          value={metrics.executedTests.toLocaleString()}
          icon={Play}
        />
        <MetricCard
          title="Passed Tests"
          value={metrics.passedTests.toLocaleString()}
          icon={CheckCircle2}
        />
        <MetricCard title="Failed Tests" value={metrics.failedTests} icon={XCircle} />
        <MetricCard title="Blocked Tests" value={metrics.blockedTests} icon={Ban} />
      </div>

      <section className="mb-8" aria-label="Test Execution Summary">
        <h2 className="mb-4 font-display text-base font-semibold text-surface-900 dark:text-white">
          Test Execution Summary
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <TestRateKpiCard
            label="Execution Rate"
            value={formatPercent(metrics.executionRate)}
            trend={testRateTrends.executionRate}
            variant="execution"
          />
          <TestRateKpiCard
            label="Pass Rate"
            value={formatPercent(metrics.passRate)}
            trend={testRateTrends.passRate}
            variant="pass"
          />
          <TestRateKpiCard
            label="Failure Rate"
            value={formatPercent(metrics.failureRate)}
            trend={testRateTrends.failureRate}
            variant="failure"
          />
        </div>
      </section>

      <div className="mb-8">
        <TrendChart
          title="Execution & Pass Rate Trend"
          description="Weekly execution and pass rate performance"
          data={testTrend}
          type="line"
          primaryLabel="Execution Rate"
          secondaryLabel="Pass Rate"
          primaryColor="#1fa67f"
          secondaryColor="#6366f1"
        />
      </div>

      <Card title="Recent Test Runs">
        <div className="mb-4">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search test runs..."
            className="max-w-md"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-surface-100 dark:border-surface-800">
                <th scope="col" className="pb-3 font-medium text-surface-600 dark:text-surface-400">Run ID</th>
                <th scope="col" className="pb-3 font-medium text-surface-600 dark:text-surface-400">Name</th>
                <th scope="col" className="pb-3 font-medium text-surface-600 dark:text-surface-400">Project</th>
                <th scope="col" className="pb-3 font-medium text-surface-600 dark:text-surface-400">Suite</th>
                <th scope="col" className="pb-3 font-medium text-surface-600 dark:text-surface-400">Status</th>
                <th scope="col" className="pb-3 font-medium text-surface-600 dark:text-surface-400">Executed</th>
                <th scope="col" className="pb-3 font-medium text-surface-600 dark:text-surface-400">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-sm text-surface-500 dark:text-surface-400">
                    No test runs match the selected project and sprint.
                  </td>
                </tr>
              ) : (
                filtered.map((run) => (
                <tr key={run.id} className="cursor-pointer transition-colors hover:bg-surface-50 dark:hover:bg-surface-800/60">
                  <td className="py-3.5 font-mono text-xs text-surface-500 dark:text-surface-400">{run.id}</td>
                  <td className="py-3.5 font-medium text-surface-900 dark:text-white">{run.name}</td>
                  <td className="py-3.5 text-surface-600 dark:text-surface-300">{run.project}</td>
                  <td className="py-3.5 text-surface-600 dark:text-surface-300">{run.suite}</td>
                  <td className="py-3.5">
                    <Badge
                      label={statusConfig[run.status].label}
                      className={statusConfig[run.status].className}
                    />
                  </td>
                  <td className="py-3.5 text-surface-500 dark:text-surface-400">{run.executedAt}</td>
                  <td className="py-3.5 text-surface-600 dark:text-surface-300">{run.duration}</td>
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
