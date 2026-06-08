import type { ModuleAutomationCoverage } from '@/types'

export type ModuleCoverageSort = 'module' | 'coverage_desc' | 'coverage_asc' | 'automated_desc'

export interface ModuleCoverageRow extends ModuleAutomationCoverage {
  coveragePercent: number
}

export function computeCoveragePercent(automated: number, total: number): number {
  if (total <= 0) return 0
  return Math.round((automated / total) * 1000) / 10
}

export function toCoverageRows(modules: ModuleAutomationCoverage[]): ModuleCoverageRow[] {
  return modules.map((row) => ({
    ...row,
    coveragePercent: computeCoveragePercent(row.automatedTestCases, row.totalTestCases),
  }))
}

export function sortModuleCoverageRows(
  rows: ModuleCoverageRow[],
  sort: ModuleCoverageSort,
): ModuleCoverageRow[] {
  const copy = [...rows]
  switch (sort) {
    case 'module':
      return copy.sort((a, b) => a.module.localeCompare(b.module))
    case 'coverage_asc':
      return copy.sort((a, b) => a.coveragePercent - b.coveragePercent)
    case 'automated_desc':
      return copy.sort((a, b) => b.automatedTestCases - a.automatedTestCases)
    case 'coverage_desc':
    default:
      return copy.sort((a, b) => b.coveragePercent - a.coveragePercent)
  }
}

export function exportModuleCoverageCsv(rows: ModuleCoverageRow[]): void {
  const header = 'Module,Total Test Cases,Automated Test Cases,Automation Coverage %'
  const lines = rows.map(
    (r) =>
      `"${r.module.replace(/"/g, '""')}",${r.totalTestCases},${r.automatedTestCases},${r.coveragePercent}`,
  )
  const csv = [header, ...lines].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `module-automation-coverage-${new Date().toISOString().slice(0, 10)}.csv`
  link.click()
  URL.revokeObjectURL(url)
}
