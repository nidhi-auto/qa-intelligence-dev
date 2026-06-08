import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Activity,
  AlertTriangle,
  Archive,
  FolderKanban,
  PlayCircle,
  TrendingUp,
  Zap,
} from 'lucide-react'
import { OverviewFilters } from '@/components/dashboard/OverviewFilters'
import { TrendChart } from '@/components/charts/TrendChart'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { MetricCard } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageElements'
import { useOverviewFilters } from '@/hooks/useOverviewFilters'
import { useDashboardData } from '@/contexts/DashboardDataContext'
import { filterTrendByDateRange } from '@/lib/dateRangeFilter'
import { computeOverviewKpis } from '@/lib/overviewMetrics'
import {
  formatDate,
  getScoreColor,
  riskLevelConfig,
} from '@/lib/utils'

export function OverviewPage() {
  const { defectTrend, portfolioSummary, projects, qualityScoreTrend } = useDashboardData()
  const {
    selectedProject,
    datePreset,
    dateRange,
    dateRangeLabel,
    projectOptions,
    customDraft,
    customError,
    setSelectedProject,
    setDatePreset,
    setCustomDraft,
    applyCustomRange,
    resetCustomRange,
  } = useOverviewFilters()

  const kpis = useMemo(
    () =>
      computeOverviewKpis(projects, qualityScoreTrend, defectTrend, dateRange, selectedProject, {
        avgQualityScore: portfolioSummary.avgQualityScore,
        portfolioPassRate: portfolioSummary.portfolioPassRate,
        automationCoverage: portfolioSummary.automationCoverage,
        openedDefects: 151,
      }),
    [dateRange, selectedProject],
  )

  const filteredQualityTrend = useMemo(
    () => filterTrendByDateRange(qualityScoreTrend, dateRange),
    [dateRange],
  )

  const filteredDefectTrend = useMemo(
    () => filterTrendByDateRange(defectTrend, dateRange),
    [dateRange],
  )

  const atRiskProjects = useMemo(() => {
    const scoped =
      selectedProject === 'all'
        ? projects
        : projects.filter((project) => project.id === selectedProject)
    return scoped.filter((project) => project.status === 'at-risk')
  }, [selectedProject])

  const periodDescription = `Showing data for ${dateRangeLabel.toLowerCase()}`

  return (
    <div>
      <PageHeader
        title="Portfolio Overview"
        description="Real-time visibility into quality health across your entire project portfolio—track trends, spot risks early, and act on what matters."
        action={
          <OverviewFilters
            selectedProject={selectedProject}
            projectOptions={projectOptions}
            onProjectChange={setSelectedProject}
            selectedDatePreset={datePreset}
            dateRangeLabel={dateRangeLabel}
            customStart={customDraft.start}
            customEnd={customDraft.end}
            customError={customError}
            onDatePresetChange={setDatePreset}
            onCustomStartChange={(value) => setCustomDraft((draft) => ({ ...draft, start: value }))}
            onCustomEndChange={(value) => setCustomDraft((draft) => ({ ...draft, end: value }))}
            onApplyCustom={applyCustomRange}
            onResetCustom={resetCustomRange}
          />
        }
      />

      <p className="mb-6 text-sm text-surface-500 dark:text-surface-400">{periodDescription}</p>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Total Projects"
          value={kpis.totalProjects}
          icon={FolderKanban}
          trend={{ value: '3 new this quarter', positive: true }}
        />
        <MetricCard
          title="Active Projects"
          value={kpis.activeProjects}
          icon={PlayCircle}
          subtitle={`${kpis.atRiskProjects} at risk`}
        />
        <MetricCard
          title="Closed Projects"
          value={kpis.completedProjects}
          icon={Archive}
        />
        <MetricCard
          title="Portfolio Pass Rate"
          value={`${kpis.portfolioPassRate}%`}
          icon={TrendingUp}
          subtitle="Across active test suites"
        />
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <TrendChart
          title="Quality Score Trend"
          description={`Portfolio-wide quality score · ${dateRangeLabel}`}
          data={filteredQualityTrend}
          type="area"
          primaryLabel="Quality Score"
        />
        <TrendChart
          title="Defect Activity"
          description={`Opened vs closed defects · ${dateRangeLabel}`}
          data={filteredDefectTrend}
          type="bar"
          primaryLabel="Opened"
          secondaryLabel="Closed"
          secondaryColor="#1fa67f"
        />
      </div>

      <Card title="Projects at Risk" description="Requires immediate attention" className="mb-8">
        {atRiskProjects.length === 0 ? (
          <p className="text-sm text-surface-500 dark:text-surface-400">All projects are on track.</p>
        ) : (
          <div className="space-y-4">
            {atRiskProjects.map((project) => (
              <div
                key={project.id}
                className="flex cursor-pointer items-center justify-between rounded-lg border border-surface-100 p-4 transition-colors hover:bg-surface-50 dark:border-surface-800 dark:hover:bg-surface-800/60"
              >
                <div>
                  <p className="font-medium text-surface-900 dark:text-white">{project.name}</p>
                  <p className="text-xs text-surface-500 dark:text-surface-400">
                    {project.qaOwner} · Target {formatDate(project.releaseDate)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    label={riskLevelConfig[project.riskLevel].label}
                    className={riskLevelConfig[project.riskLevel].className}
                  />
                  <span className={`text-sm font-semibold ${getScoreColor(project.qualityScore)}`}>
                    {project.qualityScore}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          to="/dashboard/defects"
          className="flex cursor-pointer items-center gap-4 rounded-xl border border-surface-200 bg-white p-5 transition-shadow hover:shadow-md dark:border-surface-800 dark:bg-surface-900 dark:hover:shadow-lg dark:hover:shadow-black/20"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
            <AlertTriangle className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="font-medium text-surface-900 dark:text-white">Defect Intelligence</p>
            <p className="text-xs text-surface-500 dark:text-surface-400">
              {kpis.openedDefects} defects opened in period
            </p>
          </div>
        </Link>
        <Link
          to="/dashboard/automation"
          className="flex cursor-pointer items-center gap-4 rounded-xl border border-surface-200 bg-white p-5 transition-shadow hover:shadow-md dark:border-surface-800 dark:bg-surface-900 dark:hover:shadow-lg dark:hover:shadow-black/20"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <Zap className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="font-medium text-surface-900 dark:text-white">Automation Health</p>
            <p className="text-xs text-surface-500 dark:text-surface-400">{kpis.automationCoverage}% coverage</p>
          </div>
        </Link>
        <Link
          to="/dashboard/tests"
          className="flex cursor-pointer items-center gap-4 rounded-xl border border-surface-200 bg-white p-5 transition-shadow hover:shadow-md dark:border-surface-800 dark:bg-surface-900 dark:hover:shadow-lg dark:hover:shadow-black/20"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
            <Activity className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="font-medium text-surface-900 dark:text-white">Test Execution</p>
            <p className="text-xs text-surface-500 dark:text-surface-400">{kpis.portfolioPassRate}% pass rate</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
