import { useCallback, useMemo, useState } from 'react'
import { Plug } from 'lucide-react'
import { IntegrationCard } from '@/components/integrations/IntegrationCard'
import { IntegrationConfigModal } from '@/components/integrations/IntegrationConfigModal'
import { PageHeader, SearchBar, EmptyState } from '@/components/ui/PageElements'
import { Select } from '@/components/ui/Input'
import { getCatalogItem, integrationCatalog } from '@/data/integrations'
import {
  clearIntegrationToken,
  loadIntegrationStates,
  saveIntegrationStates,
} from '@/lib/integrationStorage'
import { matchesFilter } from '@/lib/integrationUtils'
import type {
  IntegrationConnectionState,
  IntegrationFilter,
  IntegrationId,
  IntegrationStateMap,
} from '@/types/integrations'

export function IntegrationsPage() {
  const [states, setStates] = useState<IntegrationStateMap>(() => loadIntegrationStates())
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<IntegrationFilter>('all')
  const [modalId, setModalId] = useState<IntegrationId | null>(null)
  const [modalMode, setModalMode] = useState<'connect' | 'configure'>('connect')
  const [syncingId, setSyncingId] = useState<IntegrationId | null>(null)

  const persist = useCallback((next: IntegrationStateMap) => {
    setStates(next)
    saveIntegrationStates(next)
  }, [])

  const filteredCatalog = useMemo(() => {
    const q = search.trim().toLowerCase()
    return integrationCatalog.filter((item) => {
      const state = states[item.id]
      if (!matchesFilter(state.status, filter)) return false
      if (!q) return true
      return (
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      )
    })
  }, [search, filter, states])

  const openConnect = (id: IntegrationId) => {
    setModalId(id)
    setModalMode('connect')
  }

  const openConfigure = (id: IntegrationId) => {
    setModalId(id)
    setModalMode('configure')
  }

  const updateIntegration = (id: IntegrationId, next: IntegrationConnectionState) => {
    persist({ ...states, [id]: next })
  }

  const handleDisconnect = (id: IntegrationId) => {
    const catalog = getCatalogItem(id)
    clearIntegrationToken(id)
    persist({
      ...states,
      [id]: {
        status: 'disconnected',
        connectedBy: null,
        connectedAt: null,
        lastSyncAt: null,
        lastSyncStatus: 'never',
        authMethod: null,
        autoSync: true,
        syncFrequency: '1h',
        metrics: catalog.defaultMetrics,
      },
    })
  }

  const handleSync = async (id: IntegrationId) => {
    setSyncingId(id)
    await new Promise((r) => setTimeout(r, 1500))
    const current = states[id]
    persist({
      ...states,
      [id]: {
        ...current,
        lastSyncAt: new Date().toISOString(),
        lastSyncStatus: current.status === 'failed' ? 'failed' : 'success',
        status: current.status === 'failed' ? 'failed' : 'connected',
      },
    })
    setSyncingId(null)
  }

  const showEmpty = filteredCatalog.length === 0

  return (
    <div>
      <PageHeader
        title="Integrations"
        description="Connect third-party tools to sync defects, tests, documentation, and delivery signals into QAlytics."
      />

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search integrations…"
          className="flex-1"
        />
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value as IntegrationFilter)}
          options={[
            { value: 'all', label: 'All integrations' },
            { value: 'connected', label: 'Connected' },
            { value: 'not_connected', label: 'Not connected' },
          ]}
          wrapperClassName="sm:w-48"
          aria-label="Filter integrations"
        />
      </div>

      {showEmpty ? (
        <EmptyState
          icon={<Plug className="h-7 w-7" aria-hidden="true" />}
          title={search || filter !== 'all' ? 'No integrations match' : 'No integrations yet'}
          description={
            search || filter !== 'all'
              ? 'Try a different search term or filter to find integrations.'
              : 'Connect Jira, GitHub, or Slack to start syncing quality data into your workspace.'
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredCatalog.map((item) => (
            <IntegrationCard
              key={item.id}
              catalog={item}
              state={states[item.id]}
              onConnect={() => openConnect(item.id)}
              onConfigure={() => openConfigure(item.id)}
              onDisconnect={() => handleDisconnect(item.id)}
              onSync={() => handleSync(item.id)}
              syncing={syncingId === item.id}
            />
          ))}
        </div>
      )}

      <p className="mt-8 text-center text-xs text-surface-500 dark:text-surface-400">
        Coming soon: Zapier, Microsoft Teams, Notion, Jenkins, Bitbucket, webhooks, and custom connector builder.
      </p>

      {modalId && (
        <IntegrationConfigModal
          integrationId={modalId}
          state={states[modalId]}
          isOpen={Boolean(modalId)}
          mode={modalMode}
          onClose={() => setModalId(null)}
          onSave={(next) => updateIntegration(modalId, next)}
        />
      )}
    </div>
  )
}
