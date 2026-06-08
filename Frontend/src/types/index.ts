export type RiskLevel = 'low' | 'medium' | 'high' | 'critical'
export type ProjectStatus = 'active' | 'at-risk' | 'completed' | 'on-hold'
export type Severity = 'critical' | 'high' | 'medium' | 'low'
export type Priority = 'blocker' | 'critical' | 'high' | 'medium' | 'low'
export type BugStatus = 'open' | 'closed' | 'reopened'

export type SprintStatus = 'active' | 'planned' | 'completed'

export interface Sprint {
  id: string
  projectId: string
  name: string
  status: SprintStatus
}

export interface Project {
  id: string
  name: string
  qaOwner: string
  status: ProjectStatus
  releaseDate: string
  riskLevel: RiskLevel
  qualityScore: number
  openBugs: number
  testPassRate: number
  automationCoverage: number
}

export interface DefectMetrics {
  openBugs: number
  closedBugs: number
  criticalBugs: number
  highSeverityBugs: number
  reopenedBugs: number
  escapedBugs: number
  closureRate: number
  defectLeakage: number
  reopenRate: number
}

export interface ModuleDefectSummary {
  module: string
  openBugs: number
}

export interface Defect {
  id: string
  title: string
  project: string
  sprintId: string
  module: string
  severity: Severity
  priority: Priority
  status: BugStatus
  assignee: string
  createdAt: string
  reopenedCount: number
}

export interface TestExecutionMetrics {
  totalTestCases: number
  executedTests: number
  passedTests: number
  failedTests: number
  blockedTests: number
  executionRate: number
  passRate: number
  failureRate: number
}

export interface TestExecution {
  id: string
  name: string
  project: string
  sprintId: string
  suite: string
  status: 'passed' | 'failed' | 'blocked' | 'pending'
  executedAt: string
  duration: string
}

export interface AutomationMetrics {
  automatedTestCases: number
  manualTestCases: number
  automationCoverage: number
  automationPassRate: number
  flakyTests: number
  stabilityRate: number
  avgExecutionTime: string
}

export interface ModuleAutomationCoverage {
  module: string
  totalTestCases: number
  automatedTestCases: number
}

export interface FlakyTest {
  id: string
  name: string
  project: string
  sprintId: string
  failureRate: number
  lastRun: string
  trend: 'improving' | 'stable' | 'worsening'
}

export interface PortfolioSummary {
  totalProjects: number
  activeProjects: number
  atRiskProjects: number
  completedProjects: number
  avgQualityScore: number
  portfolioPassRate: number
  automationCoverage: number
}

export interface TrendPoint {
  label: string
  value: number
  secondary?: number
  /** ISO date (YYYY-MM-DD) — start of the trend bucket for date-range filtering */
  periodStart?: string
}

export type DateRangePreset =
  | 'current_month'
  | 'last_month'
  | 'last_3_months'
  | 'last_6_months'
  | 'last_12_months'
  | 'custom'

export interface DateRange {
  preset: DateRangePreset
  start: string
  end: string
}

export interface OverviewKpis {
  totalProjects: number
  activeProjects: number
  atRiskProjects: number
  completedProjects: number
  avgQualityScore: number
  portfolioPassRate: number
  automationCoverage: number
  openedDefects: number
  closedDefects: number
}

export interface NavItem {
  label: string
  path: string
  icon: string
}

export interface User {
  name: string
  email: string
  role: string
  avatar: string
}
