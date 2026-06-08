import type {
  IntegrationActivityLog,
  IntegrationCatalogItem,
  IntegrationConnectionState,
  IntegrationId,
  IntegrationStateMap,
} from '@/types/integrations'

export const integrationCatalog: IntegrationCatalogItem[] = [
  {
    id: 'jira',
    name: 'Jira',
    description: 'Sync issues, epics, stories, and defects from your Jira Cloud or Data Center workspace.',
    category: 'project-management',
    logoColor: '#0052CC',
    logoLabel: 'Ji',
    supportsOAuth: true,
    supportsApiToken: true,
    defaultMetrics: [
      { label: 'Total Synced Issues', value: 0 },
      { label: 'Open Issues', value: 0 },
      { label: 'Closed Issues', value: 0 },
      { label: 'Sync Health', value: '—' },
    ],
    configureSections: ['connection', 'sync', 'mapping', 'permissions', 'logs'],
  },
  {
    id: 'confluence',
    name: 'Confluence',
    description: 'Import requirements and documentation; link test cases to Confluence pages.',
    category: 'documentation',
    logoColor: '#172B4D',
    logoLabel: 'Cf',
    supportsOAuth: true,
    supportsApiToken: true,
    defaultMetrics: [
      { label: 'Pages Synced', value: 0 },
      { label: 'Last Sync', value: 'Never' },
      { label: 'Sync Status', value: '—' },
    ],
    configureSections: ['connection', 'sync', 'permissions', 'logs'],
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Connect repositories to sync pull requests, releases, issues, and commit activity.',
    category: 'development',
    logoColor: '#24292F',
    logoLabel: 'GH',
    supportsOAuth: true,
    supportsApiToken: true,
    defaultMetrics: [
      { label: 'Repositories Connected', value: 0 },
      { label: 'Open PRs', value: 0 },
      { label: 'Recent Releases', value: 0 },
      { label: 'Sync Status', value: '—' },
    ],
    configureSections: ['connection', 'sync', 'permissions', 'logs'],
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Send quality alerts and sync summaries to Slack channels your team already uses.',
    category: 'communication',
    logoColor: '#4A154B',
    logoLabel: 'Sl',
    supportsOAuth: true,
    supportsApiToken: false,
    defaultMetrics: [
      { label: 'Channels Linked', value: 0 },
      { label: 'Alerts Sent (30d)', value: 0 },
      { label: 'Sync Status', value: '—' },
    ],
    configureSections: ['connection', 'sync', 'permissions', 'logs'],
  },
  {
    id: 'linear',
    name: 'Linear',
    description: 'Import issues and cycles from Linear to align engineering and QA workflows.',
    category: 'project-management',
    logoColor: '#5E6AD2',
    logoLabel: 'Ln',
    supportsOAuth: true,
    supportsApiToken: true,
    defaultMetrics: [
      { label: 'Issues Synced', value: 0 },
      { label: 'Open Issues', value: 0 },
      { label: 'Sync Status', value: '—' },
    ],
    configureSections: ['connection', 'sync', 'permissions', 'logs'],
  },
  {
    id: 'custom-api',
    name: 'Custom API Integration',
    description: 'Connect any REST endpoint with configurable auth, field mapping, and webhooks.',
    category: 'custom',
    logoColor: '#64748b',
    logoLabel: 'API',
    supportsOAuth: false,
    supportsApiToken: true,
    defaultMetrics: [
      { label: 'Endpoints', value: 0 },
      { label: 'Last Sync', value: 'Never' },
      { label: 'Sync Status', value: '—' },
    ],
    configureSections: ['connection', 'sync', 'mapping', 'permissions', 'logs'],
  },
]

const disconnected = (metrics: IntegrationConnectionState['metrics']): IntegrationConnectionState => ({
  status: 'disconnected',
  connectedBy: null,
  connectedAt: null,
  lastSyncAt: null,
  lastSyncStatus: 'never',
  authMethod: null,
  autoSync: true,
  syncFrequency: '1h',
  metrics,
})

export const defaultIntegrationStates: IntegrationStateMap = {
  jira: {
    status: 'connected',
    connectedBy: 'Sarah Chen',
    connectedAt: '2026-04-12T10:00:00Z',
    lastSyncAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    lastSyncStatus: 'success',
    authMethod: 'oauth',
    autoSync: true,
    syncFrequency: '30m',
    organization: 'acme-corp',
    selectedProjects: ['Operator AI', 'PatriotPay'],
    metrics: [
      { label: 'Total Synced Issues', value: 4821 },
      { label: 'Open Issues', value: 312 },
      { label: 'Closed Issues', value: 4509 },
      { label: 'Sync Health', value: 'Healthy' },
    ],
  },
  confluence: disconnected([
    { label: 'Pages Synced', value: 0 },
    { label: 'Last Sync', value: 'Never' },
    { label: 'Sync Status', value: '—' },
  ]),
  github: {
    status: 'connected',
    connectedBy: 'Marcus Webb',
    connectedAt: '2026-03-20T14:30:00Z',
    lastSyncAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    lastSyncStatus: 'success',
    authMethod: 'oauth',
    autoSync: true,
    syncFrequency: '15m',
    organization: 'acme-engineering',
    selectedRepos: ['qalytics', 'operator-ai', 'patriotpay'],
    metrics: [
      { label: 'Repositories Connected', value: 12 },
      { label: 'Open PRs', value: 28 },
      { label: 'Recent Releases', value: 4 },
      { label: 'Sync Status', value: 'Healthy' },
    ],
  },
  slack: {
    status: 'warning',
    connectedBy: 'Elena Rodriguez',
    connectedAt: '2026-05-01T09:00:00Z',
    lastSyncAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    lastSyncStatus: 'failed',
    authMethod: 'oauth',
    autoSync: false,
    syncFrequency: '6h',
    metrics: [
      { label: 'Channels Linked', value: 3 },
      { label: 'Alerts Sent (30d)', value: 142 },
      { label: 'Sync Status', value: 'Degraded' },
    ],
  },
  linear: disconnected([
    { label: 'Issues Synced', value: 0 },
    { label: 'Open Issues', value: 0 },
    { label: 'Sync Status', value: '—' },
  ]),
  'custom-api': {
    status: 'failed',
    connectedBy: 'David Kim',
    connectedAt: '2026-05-15T11:00:00Z',
    lastSyncAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    lastSyncStatus: 'failed',
    authMethod: 'api_token',
    autoSync: true,
    syncFrequency: '1h',
    metrics: [
      { label: 'Endpoints', value: 2 },
      { label: 'Last Sync', value: '3 hours ago' },
      { label: 'Sync Status', value: 'Failed' },
    ],
  },
}

export const integrationActivityLogs: IntegrationActivityLog[] = [
  {
    id: 'log-1',
    integrationId: 'jira',
    action: 'Sync completed',
    actor: 'System',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    status: 'success',
    detail: '4821 issues synchronized',
  },
  {
    id: 'log-2',
    integrationId: 'github',
    action: 'Sync completed',
    actor: 'System',
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    status: 'success',
    detail: '12 repositories updated',
  },
  {
    id: 'log-3',
    integrationId: 'slack',
    action: 'Sync failed',
    actor: 'System',
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    status: 'failed',
    detail: 'OAuth token expired — reconnect required',
  },
  {
    id: 'log-4',
    integrationId: 'custom-api',
    action: 'Connection test failed',
    actor: 'David Kim',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    status: 'failed',
    detail: 'HTTP 401 from custom endpoint',
  },
  {
    id: 'log-5',
    integrationId: 'jira',
    action: 'Configuration updated',
    actor: 'Sarah Chen',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    status: 'info',
    detail: 'Status mapping rules updated',
  },
]

export const jiraOrganizations = [
  { value: 'acme-corp', label: 'Acme Corp (atlassian.net)' },
  { value: 'acme-eu', label: 'Acme EU (atlassian.net)' },
]

export const jiraProjects = [
  { value: 'operator-ai', label: 'Operator AI' },
  { value: 'patriotpay', label: 'PatriotPay' },
  { value: 'cyncly', label: 'Cyncly' },
  { value: '40-grid', label: '40 Grid' },
  { value: 'tbr', label: 'TBR' },
  { value: 'acl', label: 'ACL' },
  { value: 'sportspass', label: 'Sportspass' },
  { value: 'york-ie-hub', label: 'York IE Hub' },
  { value: 'admins', label: 'Admins' },
]

export const githubOrganizations = [
  { value: 'acme-engineering', label: 'acme-engineering' },
  { value: 'acme-labs', label: 'acme-labs' },
]

export const githubRepos = [
  { value: 'qalytics', label: 'qalytics' },
  { value: 'operator-ai', label: 'operator-ai' },
  { value: 'patriotpay', label: 'patriotpay' },
  { value: 'cyncly', label: 'cyncly' },
  { value: '40-grid', label: '40-grid' },
  { value: 'tbr', label: 'tbr' },
  { value: 'acl', label: 'acl' },
  { value: 'sportspass', label: 'sportspass' },
  { value: 'york-ie-hub', label: 'york-ie-hub' },
  { value: 'admins', label: 'admins' },
]

export const confluenceSpaces = [
  { value: 'qa-docs', label: 'QA Documentation' },
  { value: 'product-specs', label: 'Product Specifications' },
  { value: 'test-plans', label: 'Test Plans' },
]

export function getCatalogItem(id: IntegrationId): IntegrationCatalogItem {
  const item = integrationCatalog.find((i) => i.id === id)
  if (!item) throw new Error(`Unknown integration: ${id}`)
  return item
}
