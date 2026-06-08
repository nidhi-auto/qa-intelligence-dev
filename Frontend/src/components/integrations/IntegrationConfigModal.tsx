import { useEffect, useMemo, useState } from 'react'
import { X, Shield, Zap } from 'lucide-react'
import { IntegrationLogo } from '@/components/integrations/IntegrationLogo'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input, Select } from '@/components/ui/Input'
import {
  confluenceSpaces,
  getCatalogItem,
  githubOrganizations,
  githubRepos,
  integrationActivityLogs,
  jiraOrganizations,
  jiraProjects,
} from '@/data/integrations'
import { currentUser } from '@/data/mockData'
import { hasIntegrationToken, maskToken, storeIntegrationToken } from '@/lib/integrationStorage'
import { integrationStatusConfig, syncFrequencyOptions } from '@/lib/integrationUtils'
import { cn } from '@/lib/utils'
import type {
  IntegrationAuthMethod,
  IntegrationCatalogItem,
  IntegrationConnectionState,
  IntegrationId,
} from '@/types/integrations'

type ConfigTab = 'connection' | 'sync' | 'mapping' | 'permissions' | 'logs'

interface IntegrationConfigModalProps {
  integrationId: IntegrationId
  state: IntegrationConnectionState
  isOpen: boolean
  mode: 'connect' | 'configure'
  onClose: () => void
  onSave: (next: IntegrationConnectionState) => void
}

export function IntegrationConfigModal({
  integrationId,
  state,
  isOpen,
  mode,
  onClose,
  onSave,
}: IntegrationConfigModalProps) {
  const catalog = getCatalogItem(integrationId)
  const [draft, setDraft] = useState(state)
  const [activeTab, setActiveTab] = useState<ConfigTab>('connection')
  const [authMethod, setAuthMethod] = useState<IntegrationAuthMethod>(state.authMethod ?? 'oauth')
  const [apiToken, setApiToken] = useState('')
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState<'idle' | 'success' | 'error'>('idle')
  const [saveMessage, setSaveMessage] = useState<string | null>(null)

  const tabs = useMemo(
    () =>
      catalog.configureSections.map((section) => ({
        id: section as ConfigTab,
        label:
          section === 'connection'
            ? 'Connection'
            : section === 'sync'
              ? 'Sync'
              : section === 'mapping'
                ? 'Mapping'
                : section === 'permissions'
                  ? 'Permissions'
                  : 'Error logs',
      })),
    [catalog.configureSections],
  )

  useEffect(() => {
    if (isOpen) {
      setDraft(state)
      setAuthMethod(state.authMethod ?? (catalog.supportsOAuth ? 'oauth' : 'api_token'))
      setApiToken('')
      setTestResult('idle')
      setSaveMessage(null)
      setActiveTab(mode === 'connect' ? 'connection' : 'connection')
    }
  }, [isOpen, state, mode, catalog.supportsOAuth])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const logs = integrationActivityLogs.filter((l) => l.integrationId === integrationId)

  const handleTestConnection = async () => {
    setTesting(true)
    setTestResult('idle')
    await new Promise((r) => setTimeout(r, 1200))
    if (authMethod === 'api_token' && !apiToken.trim() && !hasIntegrationToken(integrationId)) {
      setTestResult('error')
      setTesting(false)
      return
    }
    if (authMethod === 'api_token' && apiToken.trim()) {
      storeIntegrationToken(integrationId, apiToken.trim())
    }
    setTestResult('success')
    setTesting(false)
  }

  const handleConnect = () => {
    const now = new Date().toISOString()
    const connected: IntegrationConnectionState = {
      ...draft,
      status: testResult === 'error' ? 'failed' : 'connected',
      connectedBy: currentUser.name,
      connectedAt: now,
      lastSyncAt: now,
      lastSyncStatus: testResult === 'error' ? 'failed' : 'success',
      authMethod,
      metrics: catalog.defaultMetrics.map((m, i) =>
        i === catalog.defaultMetrics.length - 1
          ? { ...m, value: testResult === 'error' ? 'Failed' : 'Healthy' }
          : { ...m, value: typeof m.value === 'number' ? m.value || (i === 0 ? 1 : 0) : m.value },
      ),
    }
    if (integrationId === 'jira') {
      connected.metrics = [
        { label: 'Total Synced Issues', value: 124 },
        { label: 'Open Issues', value: 18 },
        { label: 'Closed Issues', value: 106 },
        { label: 'Sync Health', value: 'Healthy' },
      ]
    }
    if (integrationId === 'github') {
      connected.metrics = [
        { label: 'Repositories Connected', value: draft.selectedRepos?.length ?? 1 },
        { label: 'Open PRs', value: 3 },
        { label: 'Recent Releases', value: 1 },
        { label: 'Sync Status', value: 'Healthy' },
      ]
    }
    if (integrationId === 'confluence') {
      connected.metrics = [
        { label: 'Pages Synced', value: 48 },
        { label: 'Last Sync', value: 'Just now' },
        { label: 'Sync Status', value: 'Healthy' },
      ]
    }
    onSave(connected)
    setSaveMessage('Integration connected successfully.')
    setTimeout(onClose, 800)
  }

  const handleSaveConfig = () => {
    onSave({ ...draft, authMethod })
    setSaveMessage('Configuration saved.')
    setTimeout(() => setSaveMessage(null), 2500)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="integration-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-surface-900/50 backdrop-blur-sm"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-surface-200 bg-white shadow-xl dark:border-surface-700 dark:bg-surface-900">
        <div className="flex items-start justify-between border-b border-surface-100 px-6 py-4 dark:border-surface-800">
          <div className="flex items-center gap-3">
            <IntegrationLogo label={catalog.logoLabel} color={catalog.logoColor} />
            <div>
              <h2 id="integration-modal-title" className="font-display text-lg font-semibold text-surface-900 dark:text-white">
                {mode === 'connect' ? `Connect ${catalog.name}` : `Configure ${catalog.name}`}
              </h2>
              <Badge
                label={integrationStatusConfig[draft.status].label}
                className={integrationStatusConfig[draft.status].className}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-surface-500 transition-colors hover:bg-surface-100 hover:text-surface-900 dark:hover:bg-surface-800 dark:hover:text-white"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex border-b border-surface-100 px-6 dark:border-surface-800">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                '-mb-px border-b-2 px-4 py-3 text-sm font-medium transition-colors',
                activeTab === tab.id
                  ? 'border-brand-600 text-brand-700 dark:border-brand-400 dark:text-brand-300'
                  : 'border-transparent text-surface-500 hover:text-surface-800 dark:text-surface-400 dark:hover:text-white',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {activeTab === 'connection' && (
            <ConnectionPanel
              catalog={catalog}
              integrationId={integrationId}
              authMethod={authMethod}
              setAuthMethod={setAuthMethod}
              apiToken={apiToken}
              setApiToken={setApiToken}
              draft={draft}
              setDraft={setDraft}
              testing={testing}
              testResult={testResult}
              onTest={handleTestConnection}
            />
          )}
          {activeTab === 'sync' && (
            <SyncPanel draft={draft} setDraft={setDraft} integrationId={integrationId} />
          )}
          {activeTab === 'mapping' && (
            <MappingPanel integrationId={integrationId} draft={draft} setDraft={setDraft} />
          )}
          {activeTab === 'permissions' && <PermissionsPanel />}
          {activeTab === 'logs' && <LogsPanel logs={logs} />}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-surface-100 px-6 py-4 dark:border-surface-800">
          {saveMessage ? (
            <p className="text-sm text-emerald-600 dark:text-emerald-400">{saveMessage}</p>
          ) : (
            <p className="text-xs text-surface-500 dark:text-surface-400">
              Tokens are encrypted at rest. Only workspace admins can manage integrations.
            </p>
          )}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            {mode === 'connect' ? (
              <Button
                size="sm"
                onClick={handleConnect}
                disabled={testResult !== 'success' && draft.status === 'disconnected'}
              >
                Connect integration
              </Button>
            ) : (
              <Button size="sm" onClick={handleSaveConfig}>
                Save changes
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ConnectionPanel({
  catalog,
  integrationId,
  authMethod,
  setAuthMethod,
  apiToken,
  setApiToken,
  draft,
  setDraft,
  testing,
  testResult,
  onTest,
}: {
  catalog: IntegrationCatalogItem
  integrationId: IntegrationId
  authMethod: IntegrationAuthMethod
  setAuthMethod: (m: IntegrationAuthMethod) => void
  apiToken: string
  setApiToken: (t: string) => void
  draft: IntegrationConnectionState
  setDraft: (d: IntegrationConnectionState) => void
  testing: boolean
  testResult: 'idle' | 'success' | 'error'
  onTest: () => void
}) {
  return (
    <div className="space-y-5">
      <p className="text-sm text-surface-600 dark:text-surface-300">
        Authenticate with OAuth 2.0 or an API token. Credentials are never stored in the browser—only
        session-scoped tokens after a successful test.
      </p>

      <div className="flex gap-2">
        {catalog.supportsOAuth && (
          <button
            type="button"
            onClick={() => setAuthMethod('oauth')}
            className={cn(
              'flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors',
              authMethod === 'oauth'
                ? 'border-brand-500 bg-brand-50 text-brand-800 dark:bg-brand-500/10 dark:text-brand-300'
                : 'border-surface-200 text-surface-600 dark:border-surface-700 dark:text-surface-400',
            )}
          >
            OAuth 2.0
          </button>
        )}
        {catalog.supportsApiToken && (
          <button
            type="button"
            onClick={() => setAuthMethod('api_token')}
            className={cn(
              'flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors',
              authMethod === 'api_token'
                ? 'border-brand-500 bg-brand-50 text-brand-800 dark:bg-brand-500/10 dark:text-brand-300'
                : 'border-surface-200 text-surface-600 dark:border-surface-700 dark:text-surface-400',
            )}
          >
            API token
          </button>
        )}
      </div>

      {authMethod === 'oauth' ? (
        <Button variant="outline" className="w-full" onClick={onTest} disabled={testing}>
          {testing ? 'Redirecting…' : `Authorize with ${catalog.name}`}
        </Button>
      ) : (
        <Input
          label="API token"
          type="password"
          value={apiToken}
          onChange={(e) => setApiToken(e.target.value)}
          placeholder="Paste your API token"
          autoComplete="off"
        />
      )}

      {integrationId === 'jira' && (
        <Select
          label="Organization"
          value={draft.organization ?? ''}
          onChange={(e) => setDraft({ ...draft, organization: e.target.value })}
          options={[{ value: '', label: 'Select organization…' }, ...jiraOrganizations]}
        />
      )}

      {integrationId === 'github' && (
        <Select
          label="GitHub organization"
          value={draft.organization ?? ''}
          onChange={(e) => setDraft({ ...draft, organization: e.target.value })}
          options={[{ value: '', label: 'Select organization…' }, ...githubOrganizations]}
        />
      )}

      {integrationId === 'confluence' && (
        <Select
          label="Confluence workspace"
          value={draft.organization ?? ''}
          onChange={(e) => setDraft({ ...draft, organization: e.target.value })}
          options={[{ value: '', label: 'Select workspace…' }, ...jiraOrganizations]}
        />
      )}

      {integrationId === 'custom-api' && (
        <>
          <Input
            label="Base URL"
            placeholder="https://api.example.com/v1"
            defaultValue="https://internal-tools.acme.com/qa"
          />
          <Input label="API token" type="password" value={apiToken} onChange={(e) => setApiToken(e.target.value)} />
        </>
      )}

      {hasIntegrationToken(integrationId) && authMethod === 'api_token' && (
        <p className="text-xs text-surface-500">Stored token: {maskToken('sk_live_abc123xyz789')}</p>
      )}

      <div className="flex items-center gap-3">
        <Button size="sm" variant="secondary" onClick={onTest} disabled={testing}>
          <Zap className="h-4 w-4" aria-hidden="true" />
          {testing ? 'Testing…' : 'Test connection'}
        </Button>
        {testResult === 'success' && (
          <span className="text-sm text-emerald-600 dark:text-emerald-400">Connection successful</span>
        )}
        {testResult === 'error' && (
          <span className="text-sm text-red-600 dark:text-red-400">Connection failed — check credentials</span>
        )}
      </div>
    </div>
  )
}

function SyncPanel({
  draft,
  setDraft,
  integrationId,
}: {
  draft: IntegrationConnectionState
  setDraft: (d: IntegrationConnectionState) => void
  integrationId: IntegrationId
}) {
  return (
    <div className="space-y-5">
      <label className="flex cursor-pointer items-center justify-between rounded-lg border border-surface-100 p-4 dark:border-surface-800">
        <div>
          <p className="text-sm font-medium text-surface-900 dark:text-white">Auto sync</p>
          <p className="text-xs text-surface-500">Automatically pull updates on schedule</p>
        </div>
        <input
          type="checkbox"
          checked={draft.autoSync}
          onChange={(e) => setDraft({ ...draft, autoSync: e.target.checked })}
          className="h-4 w-4 rounded border-surface-300 text-brand-600 focus:ring-brand-500"
        />
      </label>

      <Select
        label="Sync frequency"
        value={draft.syncFrequency}
        onChange={(e) =>
          setDraft({ ...draft, syncFrequency: e.target.value as IntegrationConnectionState['syncFrequency'] })
        }
        options={syncFrequencyOptions}
      />

      {integrationId === 'jira' && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-surface-900 dark:text-white">Sync work item types</p>
          {['Issues / Bugs', 'Epics', 'Stories', 'Tasks'].map((type) => (
            <label key={type} className="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-300">
              <input type="checkbox" defaultChecked className="rounded text-brand-600" />
              {type}
            </label>
          ))}
        </div>
      )}

      {integrationId === 'github' && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-surface-900 dark:text-white">Sync data types</p>
          {['Pull requests', 'Releases', 'Issues', 'Commit activity'].map((type) => (
            <label key={type} className="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-300">
              <input type="checkbox" defaultChecked className="rounded text-brand-600" />
              {type}
            </label>
          ))}
        </div>
      )}

      {integrationId === 'confluence' && (
        <p className="text-sm text-surface-500">
          Requirements and documentation pages sync on the schedule above. Test case links are updated
          incrementally.
        </p>
      )}
    </div>
  )
}

function MappingPanel({
  integrationId,
  draft,
  setDraft,
}: {
  integrationId: IntegrationId
  draft: IntegrationConnectionState
  setDraft: (d: IntegrationConnectionState) => void
}) {
  if (integrationId === 'jira') {
    return (
      <div className="space-y-5">
        <Select
          label="Jira projects"
          value=""
          onChange={() => {}}
          options={[{ value: '', label: 'Select projects to sync…' }, ...jiraProjects]}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Select
            label="Defect severity mapping"
            options={[
              { value: 'default', label: 'Jira Priority → QA Severity' },
              { value: 'custom', label: 'Custom field mapping' },
            ]}
          />
          <Select
            label="Status mapping"
            options={[
              { value: 'default', label: 'Jira Status → Bug Status' },
              { value: 'custom', label: 'Custom rules' },
            ]}
          />
        </div>
        <p className="text-xs text-surface-500">
          Map Blocker/Critical/High/Medium/Low priorities to your QAlytics defect model.
        </p>
        <input type="hidden" value={draft.selectedProjects?.join(',') ?? ''} readOnly />
      </div>
    )
  }

  if (integrationId === 'github') {
    return (
      <div className="space-y-4">
        <p className="text-sm font-medium text-surface-900 dark:text-white">Repositories</p>
        {githubRepos.map((repo) => (
          <label
            key={repo.value}
            className="flex items-center gap-2 rounded-lg border border-surface-100 p-3 dark:border-surface-800"
          >
            <input
              type="checkbox"
              checked={draft.selectedRepos?.includes(repo.value) ?? false}
              onChange={(e) => {
                const current = draft.selectedRepos ?? []
                const next = e.target.checked
                  ? [...current, repo.value]
                  : current.filter((r) => r !== repo.value)
                setDraft({ ...draft, selectedRepos: next })
              }}
              className="rounded text-brand-600"
            />
            <span className="text-sm text-surface-700 dark:text-surface-200">{repo.label}</span>
          </label>
        ))}
      </div>
    )
  }

  if (integrationId === 'confluence') {
    return (
      <div className="space-y-4">
        <p className="text-sm font-medium text-surface-900 dark:text-white">Spaces to import</p>
        {confluenceSpaces.map((space) => (
          <label
            key={space.value}
            className="flex items-center gap-2 rounded-lg border border-surface-100 p-3 dark:border-surface-800"
          >
            <input type="checkbox" defaultChecked className="rounded text-brand-600" />
            <span className="text-sm text-surface-700 dark:text-surface-200">{space.label}</span>
          </label>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Input label="External ID field" placeholder="external_id" />
      <Input label="Title field" placeholder="summary" />
      <Select
        label="HTTP method"
        options={[
          { value: 'GET', label: 'GET' },
          { value: 'POST', label: 'POST' },
        ]}
      />
    </div>
  )
}

function PermissionsPanel() {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3 rounded-lg border border-surface-100 bg-surface-50 p-4 dark:border-surface-800 dark:bg-surface-800/40">
        <Shield className="h-5 w-5 shrink-0 text-brand-600 dark:text-brand-400" />
        <div>
          <p className="text-sm font-medium text-surface-900 dark:text-white">Role-based access</p>
          <p className="mt-1 text-xs text-surface-500 dark:text-surface-400">
            Only users with Admin or Integration Manager roles can connect, configure, or disconnect
            integrations. All connection events are written to the audit log.
          </p>
        </div>
      </div>
      <ul className="space-y-2 text-sm text-surface-600 dark:text-surface-300">
        <li>• Read workspace metadata</li>
        <li>• Read and write issues / work items</li>
        <li>• Read repository and pull request data</li>
        <li>• Post messages to configured Slack channels</li>
      </ul>
      <Button size="sm" variant="outline">
        Reconnect with updated scopes
      </Button>
    </div>
  )
}

function LogsPanel({
  logs,
}: {
  logs: typeof integrationActivityLogs
}) {
  if (logs.length === 0) {
    return <p className="text-sm text-surface-500">No activity recorded yet.</p>
  }

  return (
    <ul className="space-y-3">
      {logs.map((log) => (
        <li
          key={log.id}
          className="rounded-lg border border-surface-100 px-4 py-3 dark:border-surface-800"
        >
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium text-surface-900 dark:text-white">{log.action}</p>
            <span
              className={cn(
                'text-xs font-medium',
                log.status === 'success' && 'text-emerald-600',
                log.status === 'failed' && 'text-red-600',
                log.status === 'info' && 'text-surface-500',
              )}
            >
              {log.status}
            </span>
          </div>
          <p className="mt-1 text-xs text-surface-500">
            {log.actor} · {new Date(log.timestamp).toLocaleString()}
          </p>
          {log.detail && <p className="mt-1 text-xs text-surface-600 dark:text-surface-400">{log.detail}</p>}
        </li>
      ))}
    </ul>
  )
}
