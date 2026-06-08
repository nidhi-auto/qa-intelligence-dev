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
import type {
  IntegrationActivityLog,
  IntegrationCatalogItem,
  IntegrationConnectionState,
  IntegrationId,
  IntegrationStateMap,
} from '@/types/integrations'
import { apiFetch } from './client'
import { isApiEnabled } from './config'
import * as mockData from '@/data/mockData'
import {
  defaultIntegrationStates,
  integrationActivityLogs,
  integrationCatalog,
} from '@/data/integrations'

export async function fetchCurrentUser(): Promise<User> {
  if (!isApiEnabled()) return mockData.currentUser
  return apiFetch<User>('/user/current')
}

export async function fetchPortfolioSummary(): Promise<PortfolioSummary> {
  if (!isApiEnabled()) return mockData.portfolioSummary
  return apiFetch<PortfolioSummary>('/portfolio/summary')
}

export async function fetchProjects(): Promise<Project[]> {
  if (!isApiEnabled()) return mockData.projects
  return apiFetch<Project[]>('/projects')
}

export async function fetchSprints(): Promise<Sprint[]> {
  if (!isApiEnabled()) return mockData.sprints
  return apiFetch<Sprint[]>('/sprints')
}

export async function fetchDefectMetrics(): Promise<DefectMetrics> {
  if (!isApiEnabled()) return mockData.defectMetrics
  return apiFetch<DefectMetrics>('/defects/metrics')
}

export async function fetchDefectModuleOpenBugs(): Promise<{ module: string; openBugs: number }[]> {
  if (!isApiEnabled()) return mockData.defectModuleOpenBugs
  return apiFetch('/defects/module-open-bugs')
}

export async function fetchDefectPriorityDistribution(): Promise<
  { name: string; value: number; color: string }[]
> {
  if (!isApiEnabled()) return mockData.defectPriorityDistribution
  return apiFetch('/defects/priority-distribution')
}

export async function fetchDefects(): Promise<Defect[]> {
  if (!isApiEnabled()) return mockData.defects
  return apiFetch<Defect[]>('/defects')
}

export async function fetchTestExecutionMetrics(): Promise<TestExecutionMetrics> {
  if (!isApiEnabled()) return mockData.testExecutionMetrics
  return apiFetch<TestExecutionMetrics>('/tests/metrics')
}

export async function fetchTestRateTrends(): Promise<typeof mockData.testRateTrends> {
  if (!isApiEnabled()) return mockData.testRateTrends
  return apiFetch('/tests/rate-trends')
}

export async function fetchTestExecutions(): Promise<TestExecution[]> {
  if (!isApiEnabled()) return mockData.testExecutions
  return apiFetch<TestExecution[]>('/tests/executions')
}

export async function fetchAutomationMetrics(): Promise<AutomationMetrics> {
  if (!isApiEnabled()) return mockData.automationMetrics
  return apiFetch<AutomationMetrics>('/automation/metrics')
}

export async function fetchModuleAutomationCoverage(): Promise<ModuleAutomationCoverage[]> {
  if (!isApiEnabled()) return mockData.moduleAutomationCoverage
  return apiFetch<ModuleAutomationCoverage[]>('/automation/module-coverage')
}

export async function fetchFlakyTests(): Promise<FlakyTest[]> {
  if (!isApiEnabled()) return mockData.flakyTests
  return apiFetch<FlakyTest[]>('/automation/flaky-tests')
}

export async function fetchDefectTrend(): Promise<TrendPoint[]> {
  if (!isApiEnabled()) return mockData.defectTrend
  return apiFetch<TrendPoint[]>('/trends/defects')
}

export async function fetchTestTrend(): Promise<TrendPoint[]> {
  if (!isApiEnabled()) return mockData.testTrend
  return apiFetch<TrendPoint[]>('/trends/tests')
}

export async function fetchAutomationTrend(): Promise<TrendPoint[]> {
  if (!isApiEnabled()) return mockData.automationTrend
  return apiFetch<TrendPoint[]>('/trends/automation')
}

export async function fetchQualityScoreTrend(): Promise<TrendPoint[]> {
  if (!isApiEnabled()) return mockData.qualityScoreTrend
  return apiFetch<TrendPoint[]>('/trends/quality-score')
}

export async function fetchIntegrationCatalog(): Promise<IntegrationCatalogItem[]> {
  if (!isApiEnabled()) return integrationCatalog
  return apiFetch<IntegrationCatalogItem[]>('/integrations/catalog')
}

export async function fetchIntegrationStates(): Promise<IntegrationStateMap> {
  if (!isApiEnabled()) return structuredClone(defaultIntegrationStates)
  return apiFetch<IntegrationStateMap>('/integrations/states')
}

export async function updateIntegrationState(
  id: IntegrationId,
  state: IntegrationConnectionState,
): Promise<IntegrationConnectionState> {
  if (!isApiEnabled()) return state
  return apiFetch<IntegrationConnectionState>(`/integrations/${id}`, {
    method: 'PUT',
    body: JSON.stringify(state),
  })
}

export async function syncIntegration(id: IntegrationId): Promise<IntegrationConnectionState> {
  if (!isApiEnabled()) {
    const states = structuredClone(defaultIntegrationStates)
    return states[id]
  }
  return apiFetch<IntegrationConnectionState>(`/integrations/${id}/sync`, { method: 'POST' })
}

export async function fetchIntegrationActivity(): Promise<IntegrationActivityLog[]> {
  if (!isApiEnabled()) return integrationActivityLogs
  return apiFetch<IntegrationActivityLog[]>('/integrations/activity')
}

export interface SignInRequest {
  email: string
  password: string
}

export interface SignInResponse {
  token: string
  user: User
}

export async function signIn(credentials: SignInRequest): Promise<SignInResponse> {
  if (!isApiEnabled()) {
    return {
      token: 'mock-token',
      user: mockData.currentUser,
    }
  }
  return apiFetch<SignInResponse>('/auth/sign-in', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
}
