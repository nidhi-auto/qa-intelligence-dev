import { filterTrendByDateRange } from '@/lib/dateRangeFilter'
import type { DateRange, OverviewKpis, Project, TrendPoint } from '@/types'

export function computeOverviewKpis(
  projectList: Project[],
  qualityTrend: TrendPoint[],
  defectTrend: TrendPoint[],
  range: DateRange,
  selectedProject: string,
  portfolioDefaults: Pick<
    OverviewKpis,
    'avgQualityScore' | 'portfolioPassRate' | 'automationCoverage' | 'openedDefects'
  >,
): OverviewKpis {
  const scopedProjects =
    selectedProject === 'all'
      ? projectList
      : projectList.filter((project) => project.id === selectedProject)

  const qualityInRange = filterTrendByDateRange(qualityTrend, range)
  const defectsInRange = filterTrendByDateRange(defectTrend, range)

  const avgQualityScore =
    qualityInRange.length > 0
      ? Math.round(qualityInRange.reduce((sum, point) => sum + point.value, 0) / qualityInRange.length)
      : portfolioDefaults.avgQualityScore

  const openedDefects =
    defectsInRange.length > 0
      ? defectsInRange.reduce((sum, point) => sum + point.value, 0)
      : portfolioDefaults.openedDefects

  const closedDefects = defectsInRange.reduce((sum, point) => sum + (point.secondary ?? 0), 0)

  const portfolioPassRate =
    scopedProjects.length > 0
      ? Math.round(
          (scopedProjects.reduce((sum, project) => sum + project.testPassRate, 0) / scopedProjects.length) * 10,
        ) / 10
      : portfolioDefaults.portfolioPassRate

  const automationCoverage =
    scopedProjects.length > 0
      ? Math.round(
          scopedProjects.reduce((sum, project) => sum + project.automationCoverage, 0) /
            scopedProjects.length,
        )
      : portfolioDefaults.automationCoverage

  return {
    totalProjects: scopedProjects.length,
    activeProjects: scopedProjects.filter((project) => project.status === 'active').length,
    atRiskProjects: scopedProjects.filter((project) => project.status === 'at-risk').length,
    completedProjects: scopedProjects.filter((project) => project.status === 'completed').length,
    avgQualityScore,
    portfolioPassRate,
    automationCoverage,
    openedDefects,
    closedDefects,
  }
}
