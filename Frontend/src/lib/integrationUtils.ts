import type {
  IntegrationConnectionStatus,
  IntegrationFilter,
  IntegrationStateMap,
  IntegrationSyncStatus,
} from '@/types/integrations'
import { integrationCatalog } from '@/data/integrations'

export const integrationStatusConfig: Record<
  IntegrationConnectionStatus,
  { label: string; className: string }
> = {
  connected: {
    label: 'Connected',
    className: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400',
  },
  warning: {
    label: 'Warning',
    className: 'bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400',
  },
  failed: {
    label: 'Failed',
    className: 'bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-500/10 dark:text-red-400',
  },
  disconnected: {
    label: 'Not Connected',
    className: 'bg-surface-100 text-surface-600 ring-surface-500/20 dark:bg-surface-800 dark:text-surface-400',
  },
}

export function formatRelativeTime(iso: string | null): string {
  if (!iso) return 'N/A'
  const diffMs = Date.now() - new Date(iso).getTime()
  const minutes = Math.floor(diffMs / 60_000)
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes} min${minutes === 1 ? '' : 's'} ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`
  const days = Math.floor(hours / 24)
  return `${days} day${days === 1 ? '' : 's'} ago`
}

export function getLastSyncSummary(states: IntegrationStateMap): {
  label: string
  status: IntegrationSyncStatus
} {
  const synced = Object.values(states).filter((s) => s.lastSyncAt)
  if (synced.length === 0) return { label: 'No syncs yet', status: 'never' }

  const latest = synced.reduce((a, b) =>
    new Date(a.lastSyncAt!).getTime() > new Date(b.lastSyncAt!).getTime() ? a : b,
  )
  const failed = synced.some((s) => s.lastSyncStatus === 'failed')
  return {
    label: formatRelativeTime(latest.lastSyncAt),
    status: failed ? 'failed' : latest.lastSyncStatus,
  }
}

export function computeIntegrationSummary(states: IntegrationStateMap) {
  const total = integrationCatalog.length
  const connected = Object.values(states).filter((s) => s.status === 'connected').length
  const active = Object.values(states).filter(
    (s) => s.status === 'connected' && s.autoSync,
  ).length
  const failed = Object.values(states).filter(
    (s) => s.status === 'failed' || s.lastSyncStatus === 'failed',
  ).length
  const lastSync = getLastSyncSummary(states)

  return { total, connected, active, failed, lastSync }
}

export function matchesFilter(
  status: IntegrationConnectionStatus,
  filter: IntegrationFilter,
): boolean {
  if (filter === 'all') return true
  if (filter === 'connected') return status === 'connected' || status === 'warning' || status === 'failed'
  return status === 'disconnected'
}

export const syncFrequencyOptions = [
  { value: '15m', label: 'Every 15 minutes' },
  { value: '30m', label: 'Every 30 minutes' },
  { value: '1h', label: 'Every hour' },
  { value: '6h', label: 'Every 6 hours' },
  { value: '24h', label: 'Daily' },
]
