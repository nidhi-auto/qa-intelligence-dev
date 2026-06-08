import { RefreshCw, Settings2, Unplug } from 'lucide-react'
import { IntegrationLogo } from '@/components/integrations/IntegrationLogo'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import type { IntegrationCatalogItem, IntegrationConnectionState } from '@/types/integrations'
import { formatRelativeTime, integrationStatusConfig } from '@/lib/integrationUtils'

interface IntegrationCardProps {
  catalog: IntegrationCatalogItem
  state: IntegrationConnectionState
  onConnect: () => void
  onConfigure: () => void
  onDisconnect: () => void
  onSync: () => void
  syncing?: boolean
}

export function IntegrationCard({
  catalog,
  state,
  onConnect,
  onConfigure,
  onDisconnect,
  onSync,
  syncing = false,
}: IntegrationCardProps) {
  const isConnected = state.status !== 'disconnected'
  const statusStyle = integrationStatusConfig[state.status]

  return (
    <Card className="flex h-full flex-col">
      <div className="flex items-start gap-4">
        <IntegrationLogo label={catalog.logoLabel} color={catalog.logoColor} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-base font-semibold text-surface-900 dark:text-white">
              {catalog.name}
            </h3>
            <Badge label={statusStyle.label} className={statusStyle.className} />
          </div>
          <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">{catalog.description}</p>
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-xs text-surface-500 dark:text-surface-400">Last sync</dt>
          <dd className="font-medium text-surface-900 dark:text-white">
            {formatRelativeTime(state.lastSyncAt)}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-surface-500 dark:text-surface-400">Connected by</dt>
          <dd className="font-medium text-surface-900 dark:text-white">
            {state.connectedBy ?? '—'}
          </dd>
        </div>
      </dl>

      {isConnected && state.metrics.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-2 rounded-lg bg-surface-50 p-3 dark:bg-surface-800/60">
          {state.metrics.slice(0, 4).map((metric) => (
            <div key={metric.label}>
              <p className="text-xs text-surface-500 dark:text-surface-400">{metric.label}</p>
              <p className="text-sm font-semibold text-surface-900 dark:text-white">{metric.value}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        {!isConnected ? (
          <Button size="sm" onClick={onConnect}>
            Connect
          </Button>
        ) : (
          <>
            <Button size="sm" variant="outline" onClick={onConfigure}>
              <Settings2 className="h-4 w-4" aria-hidden="true" />
              Configure
            </Button>
            <Button size="sm" variant="ghost" onClick={onSync} disabled={syncing}>
              <RefreshCw className={`h-4 w-4 ${syncing ? 'animate-spin' : ''}`} aria-hidden="true" />
              {syncing ? 'Syncing…' : 'Sync now'}
            </Button>
            <Button size="sm" variant="ghost" onClick={onDisconnect} className="text-red-600 hover:text-red-700 dark:text-red-400">
              <Unplug className="h-4 w-4" aria-hidden="true" />
              Disconnect
            </Button>
          </>
        )}
      </div>
    </Card>
  )
}
