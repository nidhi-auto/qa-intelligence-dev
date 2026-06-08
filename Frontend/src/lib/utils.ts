import type { RiskLevel, ProjectStatus, Severity, BugStatus } from '@/types'

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`
}

export const riskLevelConfig: Record<RiskLevel, { label: string; className: string }> = {
  low: { label: 'Low', className: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' },
  medium: { label: 'Medium', className: 'bg-amber-50 text-amber-700 ring-amber-600/20' },
  high: { label: 'High', className: 'bg-orange-50 text-orange-700 ring-orange-600/20' },
  critical: { label: 'Critical', className: 'bg-red-50 text-red-700 ring-red-600/20' },
}

export const projectStatusConfig: Record<ProjectStatus, { label: string; className: string }> = {
  active: { label: 'Active', className: 'bg-brand-50 text-brand-700 ring-brand-600/20' },
  'at-risk': { label: 'At Risk', className: 'bg-amber-50 text-amber-700 ring-amber-600/20' },
  completed: { label: 'Completed', className: 'bg-surface-100 text-surface-600 ring-surface-500/20' },
  'on-hold': { label: 'On Hold', className: 'bg-surface-100 text-surface-500 ring-surface-400/20' },
}

export const severityConfig: Record<Severity, { label: string; className: string }> = {
  critical: { label: 'Critical', className: 'bg-red-50 text-red-700 ring-red-600/20' },
  high: { label: 'High', className: 'bg-orange-50 text-orange-700 ring-orange-600/20' },
  medium: { label: 'Medium', className: 'bg-amber-50 text-amber-700 ring-amber-600/20' },
  low: { label: 'Low', className: 'bg-surface-100 text-surface-600 ring-surface-500/20' },
}

export const bugStatusConfig: Record<BugStatus, { label: string; className: string }> = {
  open: { label: 'Open', className: 'bg-blue-50 text-blue-700 ring-blue-600/20' },
  closed: { label: 'Closed', className: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' },
  reopened: { label: 'Reopened', className: 'bg-amber-50 text-amber-700 ring-amber-600/20' },
}

export function getScoreColor(score: number): string {
  if (score >= 85) return 'text-emerald-600'
  if (score >= 70) return 'text-amber-600'
  return 'text-red-600'
}

export function getProgressColor(value: number): string {
  if (value >= 85) return 'bg-emerald-500'
  if (value >= 70) return 'bg-amber-500'
  return 'bg-red-500'
}
