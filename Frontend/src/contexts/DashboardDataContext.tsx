import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type {
  AutomationMetrics,
  Defect,
  DefectMetrics,
  FlakyTest,
  ModuleAutomationCoverage,
  PortfolioSummary,
  Project,
  Sprint,
  TestExecution,
  TestExecutionMetrics,
  TrendPoint,
  User,
} from '@/types'
import * as mockData from '@/data/mockData'
import * as api from '@/api/resources'

interface DashboardData {
  currentUser: User
  portfolioSummary: PortfolioSummary
  projects: Project[]
  sprints: Sprint[]
  defectMetrics: DefectMetrics
  defectModuleOpenBugs: { module: string; openBugs: number }[]
  defectPriorityDistribution: { name: string; value: number; color: string }[]
  defects: Defect[]
  testExecutionMetrics: TestExecutionMetrics
  testRateTrends: typeof mockData.testRateTrends
  testExecutions: TestExecution[]
  automationMetrics: AutomationMetrics
  moduleAutomationCoverage: ModuleAutomationCoverage[]
  flakyTests: FlakyTest[]
  defectTrend: TrendPoint[]
  testTrend: TrendPoint[]
  automationTrend: TrendPoint[]
  qualityScoreTrend: TrendPoint[]
  loading: boolean
  error: Error | null
}

const DashboardDataContext = createContext<DashboardData | null>(null)

export function DashboardDataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Omit<DashboardData, 'loading' | 'error'>>({
    currentUser: mockData.currentUser,
    portfolioSummary: mockData.portfolioSummary,
    projects: mockData.projects,
    sprints: mockData.sprints,
    defectMetrics: mockData.defectMetrics,
    defectModuleOpenBugs: mockData.defectModuleOpenBugs,
    defectPriorityDistribution: mockData.defectPriorityDistribution,
    defects: mockData.defects,
    testExecutionMetrics: mockData.testExecutionMetrics,
    testRateTrends: mockData.testRateTrends,
    testExecutions: mockData.testExecutions,
    automationMetrics: mockData.automationMetrics,
    moduleAutomationCoverage: mockData.moduleAutomationCoverage,
    flakyTests: mockData.flakyTests,
    defectTrend: mockData.defectTrend,
    testTrend: mockData.testTrend,
    automationTrend: mockData.automationTrend,
    qualityScoreTrend: mockData.qualityScoreTrend,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const [
          currentUser,
          portfolioSummary,
          projects,
          sprints,
          defectMetrics,
          defectModuleOpenBugs,
          defectPriorityDistribution,
          defects,
          testExecutionMetrics,
          testRateTrends,
          testExecutions,
          automationMetrics,
          moduleAutomationCoverage,
          flakyTests,
          defectTrend,
          testTrend,
          automationTrend,
          qualityScoreTrend,
        ] = await Promise.all([
          api.fetchCurrentUser(),
          api.fetchPortfolioSummary(),
          api.fetchProjects(),
          api.fetchSprints(),
          api.fetchDefectMetrics(),
          api.fetchDefectModuleOpenBugs(),
          api.fetchDefectPriorityDistribution(),
          api.fetchDefects(),
          api.fetchTestExecutionMetrics(),
          api.fetchTestRateTrends(),
          api.fetchTestExecutions(),
          api.fetchAutomationMetrics(),
          api.fetchModuleAutomationCoverage(),
          api.fetchFlakyTests(),
          api.fetchDefectTrend(),
          api.fetchTestTrend(),
          api.fetchAutomationTrend(),
          api.fetchQualityScoreTrend(),
        ])

        if (!cancelled) {
          setState({
            currentUser,
            portfolioSummary,
            projects,
            sprints,
            defectMetrics,
            defectModuleOpenBugs,
            defectPriorityDistribution,
            defects,
            testExecutionMetrics,
            testRateTrends,
            testExecutions,
            automationMetrics,
            moduleAutomationCoverage,
            flakyTests,
            defectTrend,
            testTrend,
            automationTrend,
            qualityScoreTrend,
          })
          setError(null)
        }
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err : new Error('Failed to load data'))
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [])

  const value = useMemo(() => ({ ...state, loading, error }), [state, loading, error])

  return <DashboardDataContext.Provider value={value}>{children}</DashboardDataContext.Provider>
}

export function useDashboardData(): DashboardData {
  const ctx = useContext(DashboardDataContext)
  if (!ctx) {
    throw new Error('useDashboardData must be used within DashboardDataProvider')
  }
  return ctx
}
