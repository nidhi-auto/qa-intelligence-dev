import type { TestExecution, TestExecutionMetrics } from '@/types'

export function computeTestExecutionMetrics(runs: TestExecution[]): TestExecutionMetrics {
  const executedTests = runs.length
  const passedTests = runs.filter((run) => run.status === 'passed').length
  const failedTests = runs.filter((run) => run.status === 'failed').length
  const blockedTests = runs.filter((run) => run.status === 'blocked').length
  const totalTestCases = executedTests

  return {
    totalTestCases,
    executedTests,
    passedTests,
    failedTests,
    blockedTests,
    executionRate: totalTestCases > 0 ? (executedTests / totalTestCases) * 100 : 0,
    passRate: executedTests > 0 ? (passedTests / executedTests) * 100 : 0,
    failureRate: executedTests > 0 ? (failedTests / executedTests) * 100 : 0,
  }
}
