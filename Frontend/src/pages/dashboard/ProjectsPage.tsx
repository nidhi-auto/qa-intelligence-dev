import { useMemo } from 'react'
import { PieChartCard, type PieSlice } from '@/components/charts/PieChartCard'
import { ProjectSprintFilters } from '@/components/dashboard/ProjectSprintFilters'
import { PageHeader } from '@/components/ui/PageElements'
import { useProjectSprintFilters } from '@/hooks/useProjectSprintFilters'
import { useDashboardData } from '@/contexts/DashboardDataContext'

function executionTimeToMinutes(time: string): number {
  const match = time.match(/(\d+)m(?:\s*(\d+)s)?/)
  if (!match) return 0
  return Number(match[1]) + Number(match[2] ?? 0) / 60
}

const RISK_LEVEL_COLORS = {
  Critical: '#ef4444',
  High: '#f97316',
  Medium: '#eab308',
  Low: '#1fa67f',
} as const

function buildQualityScoreSlices(scores: number[]): PieSlice[] {
  const buckets = [
    { name: 'Defects', min: 90, max: 101, color: '#1fa67f' },
    { name: 'Test Cases', min: 80, max: 90, color: '#3b82f6' },
    { name: 'Automation test cases', min: 70, max: 80, color: '#f59e0b' },
    { name: 'Automation Defects', min: 0, max: 70, color: '#ef4444' },
  ]

  return buckets
    .map((bucket) => ({
      name: bucket.name,
      value: scores.filter((s) => s >= bucket.min && s < bucket.max).length,
      color: bucket.color,
    }))
    .filter((slice) => slice.value > 0)
}

export function ProjectsPage() {
  const {
    automationMetrics,
    defectMetrics,
    defectPriorityDistribution,
    portfolioSummary,
    projects,
    testExecutionMetrics,
  } = useDashboardData()

  const {
    selectedProject,
    selectedSprint,
    setSelectedProject,
    setSelectedSprint,
    projectOptions,
    sprintOptions,
  } = useProjectSprintFilters()

  const riskLevelPieData: PieSlice[] = (['Critical', 'High', 'Medium', 'Low'] as const).map(
    (name) => ({
      name,
      value: defectPriorityDistribution.find((d) => d.name === name)?.value ?? 0,
      color: RISK_LEVEL_COLORS[name],
    }),
  )

  const testPieCards: { title: string; data: PieSlice[] }[] = [
    {
      title: 'Defects',
      data: [
        { name: 'Open Bugs', value: defectMetrics.openBugs, color: '#1fa67f' },
        { name: 'Critical Bugs', value: defectMetrics.criticalBugs, color: '#ef4444' },
        { name: 'High Severity', value: defectMetrics.highSeverityBugs, color: '#f59e0b' },
        { name: 'Re-open Bugs', value: defectMetrics.reopenedBugs, color: '#8b5cf6' },
        { name: 'Beta Bugs', value: defectMetrics.escapedBugs, color: '#3b82f6' },
        { name: 'Closed Bugs', value: defectMetrics.closedBugs, color: '#64748b' },
      ],
    },
    {
      title: 'Test Execution Rate',
      data: [
        { name: 'Executed tests', value: testExecutionMetrics.executedTests, color: '#3b82f6' },
        { name: 'Passed tests', value: testExecutionMetrics.passedTests, color: '#1fa67f' },
        { name: 'Failed tests', value: testExecutionMetrics.failedTests, color: '#ef4444' },
        { name: 'Blocked tests', value: testExecutionMetrics.blockedTests, color: '#f59e0b' },
      ],
    },
    {
      title: 'Automation Coverage',
      data: [
        { name: 'Automated tests', value: automationMetrics.automatedTestCases, color: '#3b82f6' },
        {
          name: 'Automation Coverage',
          value: automationMetrics.automationCoverage,
          color: '#f59e0b',
        },
        {
          name: 'Avg Execution Time',
          value: executionTimeToMinutes(automationMetrics.avgExecutionTime),
          color: '#8b5cf6',
        },
        {
          name: 'Automation Pass Rate',
          value: automationMetrics.automationPassRate,
          color: '#1fa67f',
        },
        {
          name: 'Automation Fail Rate',
          value: 100 - automationMetrics.automationPassRate,
          color: '#ef4444',
        },
        { name: 'Flaky Test', value: automationMetrics.flakyTests, color: '#64748b' },
      ],
    },
    {
      title: 'Risk Level',
      data: riskLevelPieData,
    },
  ]

  const filteredProjects = useMemo(() => {
    if (selectedProject === 'all') return projects
    return projects.filter((p) => p.id === selectedProject)
  }, [projects, selectedProject])

  const avgQualityScore = useMemo(() => {
    if (filteredProjects.length === 0) return portfolioSummary.avgQualityScore
    const total = filteredProjects.reduce((sum, p) => sum + p.qualityScore, 0)
    return Math.round(total / filteredProjects.length)
  }, [filteredProjects, portfolioSummary.avgQualityScore])

  const qualityScorePieData = useMemo(
    () => buildQualityScoreSlices(filteredProjects.map((p) => p.qualityScore)),
    [filteredProjects],
  )

  return (
    <div>
      <PageHeader
        title="Project Management"
        description="Track project health, ownership, and release timelines across your portfolio."
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

      <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <PieChartCard
          title="Avg. Quality Score"
          description={`Portfolio average: ${avgQualityScore}%`}
          data={qualityScorePieData}
          className="h-full"
        />
        {testPieCards.map((card) => (
          <PieChartCard key={card.title} title={card.title} data={card.data} className="h-full" />
        ))}
      </div>
    </div>
  )
}
