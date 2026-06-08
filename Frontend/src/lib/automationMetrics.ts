import type { AutomationMetrics, FlakyTest, Project } from '@/types'

export function computeProjectAutomationMetrics(
  project: Project,
  flakyTestsForScope: FlakyTest[],
  portfolioMetrics: AutomationMetrics,
  projectCount: number,
): AutomationMetrics {
  const projectShare = 1 / Math.max(projectCount, 1)

  return {
    automatedTestCases: Math.round(portfolioMetrics.automatedTestCases * projectShare),
    manualTestCases: Math.round(portfolioMetrics.manualTestCases * projectShare),
    automationCoverage: project.automationCoverage,
    automationPassRate: project.testPassRate,
    flakyTests: flakyTestsForScope.length,
    stabilityRate: portfolioMetrics.stabilityRate,
    avgExecutionTime: portfolioMetrics.avgExecutionTime,
  }
}
