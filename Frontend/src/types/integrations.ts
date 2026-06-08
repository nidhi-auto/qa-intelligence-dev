export type IntegrationId =
  | 'jira'
  | 'confluence'
  | 'github'
  | 'slack'
  | 'linear'
  | 'custom-api'

export type IntegrationConnectionStatus = 'connected' | 'warning' | 'failed' | 'disconnected'

export type IntegrationAuthMethod = 'oauth' | 'api_token'

export type IntegrationSyncStatus = 'success' | 'failed' | 'pending' | 'never'

export type IntegrationFilter = 'all' | 'connected' | 'not_connected'

export interface IntegrationMetrics {
  label: string
  value: string | number
}

export interface IntegrationCatalogItem {
  id: IntegrationId
  name: string
  description: string
  category: 'project-management' | 'documentation' | 'development' | 'communication' | 'custom'
  logoColor: string
  logoLabel: string
  supportsOAuth: boolean
  supportsApiToken: boolean
  defaultMetrics: IntegrationMetrics[]
  configureSections: ('connection' | 'sync' | 'mapping' | 'permissions' | 'logs')[]
}

export interface IntegrationConnectionState {
  status: IntegrationConnectionStatus
  connectedBy: string | null
  connectedAt: string | null
  lastSyncAt: string | null
  lastSyncStatus: IntegrationSyncStatus
  authMethod: IntegrationAuthMethod | null
  autoSync: boolean
  syncFrequency: '15m' | '30m' | '1h' | '6h' | '24h'
  organization?: string
  selectedProjects?: string[]
  selectedRepos?: string[]
  metrics: IntegrationMetrics[]
}

export type IntegrationStateMap = Record<IntegrationId, IntegrationConnectionState>

export interface IntegrationActivityLog {
  id: string
  integrationId: IntegrationId
  action: string
  actor: string
  timestamp: string
  status: 'success' | 'failed' | 'info'
  detail?: string
}
