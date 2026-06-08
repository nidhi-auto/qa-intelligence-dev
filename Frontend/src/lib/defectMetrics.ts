import type { PieSlice } from '@/components/charts/PieChartCard'
import type { Defect, DefectMetrics, ModuleDefectSummary, Priority } from '@/types'

const PRIORITY_ORDER: Priority[] = ['blocker', 'critical', 'high', 'medium', 'low']

const PRIORITY_PIE_META: Record<Priority, { label: string; color: string }> = {
  blocker: { label: 'Blocker', color: '#7f1d1d' },
  critical: { label: 'Critical', color: '#ef4444' },
  high: { label: 'High', color: '#f97316' },
  medium: { label: 'Medium', color: '#3b82f6' },
  low: { label: 'Low', color: '#64748b' },
}

export function computeModuleOpenBugs(defectList: Defect[]): ModuleDefectSummary[] {
  const open = defectList.filter((d) => d.status === 'open' || d.status === 'reopened')
  const counts = new Map<string, number>()

  for (const defect of open) {
    counts.set(defect.module, (counts.get(defect.module) ?? 0) + 1)
  }

  return Array.from(counts.entries())
    .map(([module, openBugs]) => ({ module, openBugs }))
    .sort((a, b) => b.openBugs - a.openBugs || a.module.localeCompare(b.module))
}

export function computePriorityPieData(defectList: Defect[]): PieSlice[] {
  const active = defectList.filter((d) => d.status === 'open' || d.status === 'reopened')

  return PRIORITY_ORDER.map((priority) => ({
    name: PRIORITY_PIE_META[priority].label,
    value: active.filter((d) => d.priority === priority).length,
    color: PRIORITY_PIE_META[priority].color,
  }))
}

export function computeDefectMetrics(defectList: Defect[]): DefectMetrics {
  const openBugs = defectList.filter((d) => d.status === 'open' || d.status === 'reopened').length
  const closedBugs = defectList.filter((d) => d.status === 'closed').length
  const criticalBugs = defectList.filter(
    (d) => d.severity === 'critical' && d.status !== 'closed',
  ).length
  const highSeverityBugs = defectList.filter(
    (d) => d.severity === 'high' && d.status !== 'closed',
  ).length
  const reopenedBugs = defectList.filter(
    (d) => d.status === 'reopened' || d.reopenedCount > 0,
  ).length
  const total = openBugs + closedBugs

  return {
    openBugs,
    closedBugs,
    criticalBugs,
    highSeverityBugs,
    reopenedBugs,
    escapedBugs: 0,
    closureRate: total > 0 ? (closedBugs / total) * 100 : 0,
    defectLeakage: 0,
    reopenRate: closedBugs > 0 ? (reopenedBugs / closedBugs) * 100 : 0,
  }
}
