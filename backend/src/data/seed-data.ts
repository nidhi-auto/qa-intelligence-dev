/** Seed data ported from Frontend mock sources (R1). */

export const currentUser = {
  name: 'Sarah Chen',
  email: 'sarah.chen@company.com',
  role: 'QA Lead',
  avatar: 'SC',
}

export const portfolioSummary = {
  totalProjects: 34,
  activeProjects: 26,
  atRiskProjects: 5,
  completedProjects: 3,
  avgQualityScore: 82,
  portfolioPassRate: 91.4,
  automationCoverage: 68,
}

export const projects = [
  { id: '1', name: 'Operator AI', qaOwner: 'Sarah Chen', status: 'active', releaseDate: '2026-06-15', riskLevel: 'low', qualityScore: 91, openBugs: 12, testPassRate: 94, automationCoverage: 78 },
  { id: '2', name: 'PatriotPay', qaOwner: 'Marcus Webb', status: 'at-risk', releaseDate: '2026-06-08', riskLevel: 'high', qualityScore: 68, openBugs: 34, testPassRate: 82, automationCoverage: 55 },
  { id: '3', name: 'Cyncly', qaOwner: 'Priya Sharma', status: 'active', releaseDate: '2026-06-22', riskLevel: 'medium', qualityScore: 85, openBugs: 18, testPassRate: 89, automationCoverage: 72 },
  { id: '4', name: '40 Grid', qaOwner: 'James Okonkwo', status: 'active', releaseDate: '2026-06-18', riskLevel: 'low', qualityScore: 88, openBugs: 9, testPassRate: 92, automationCoverage: 81 },
  { id: '5', name: 'TBR', qaOwner: 'Elena Rodriguez', status: 'at-risk', releaseDate: '2026-06-05', riskLevel: 'critical', qualityScore: 58, openBugs: 47, testPassRate: 71, automationCoverage: 42 },
  { id: '6', name: 'ACL', qaOwner: 'David Kim', status: 'active', releaseDate: '2026-07-01', riskLevel: 'low', qualityScore: 90, openBugs: 7, testPassRate: 95, automationCoverage: 85 },
  { id: '7', name: 'Sportspass', qaOwner: 'Amanda Foster', status: 'active', releaseDate: '2026-06-28', riskLevel: 'medium', qualityScore: 79, openBugs: 22, testPassRate: 86, automationCoverage: 63 },
  { id: '8', name: 'York IE Hub', qaOwner: 'Sarah Chen', status: 'completed', releaseDate: '2026-05-20', riskLevel: 'low', qualityScore: 94, openBugs: 2, testPassRate: 97, automationCoverage: 88 },
  { id: '9', name: 'Admins', qaOwner: 'James Okonkwo', status: 'active', releaseDate: '2026-07-10', riskLevel: 'low', qualityScore: 87, openBugs: 5, testPassRate: 93, automationCoverage: 76 },
]

export const sprints = [
  { id: 'oai-s24', projectId: '1', name: 'Sprint 24', status: 'active' },
  { id: 'oai-s23', projectId: '1', name: 'Sprint 23', status: 'completed' },
  { id: 'oai-s25', projectId: '1', name: 'Sprint 25', status: 'planned' },
  { id: 'pp-s18', projectId: '2', name: 'Sprint 18', status: 'active' },
  { id: 'pp-s17', projectId: '2', name: 'Sprint 17', status: 'completed' },
  { id: 'cy-s12', projectId: '3', name: 'Sprint 12', status: 'active' },
  { id: 'cy-s11', projectId: '3', name: 'Sprint 11', status: 'completed' },
  { id: 'fg-s9', projectId: '4', name: 'Sprint 9', status: 'active' },
  { id: 'fg-s8', projectId: '4', name: 'Sprint 8', status: 'completed' },
  { id: 'tbr-s15', projectId: '5', name: 'Sprint 15', status: 'active' },
  { id: 'tbr-s14', projectId: '5', name: 'Sprint 14', status: 'completed' },
  { id: 'acl-s7', projectId: '6', name: 'Sprint 7', status: 'active' },
  { id: 'sp-s10', projectId: '7', name: 'Sprint 10', status: 'active' },
  { id: 'sp-s9', projectId: '7', name: 'Sprint 9', status: 'completed' },
  { id: 'yih-s6', projectId: '8', name: 'Sprint 6', status: 'completed' },
  { id: 'adm-s3', projectId: '9', name: 'Sprint 3', status: 'active' },
]

export const defectMetrics = {
  openBugs: 151, closedBugs: 892, criticalBugs: 14, highSeverityBugs: 38,
  reopenedBugs: 23, escapedBugs: 7, closureRate: 85.5, defectLeakage: 2.1, reopenRate: 4.8,
}

export const defectModuleOpenBugs = [
  { module: 'Payments', openBugs: 28 }, { module: 'Mobile Core', openBugs: 24 },
  { module: 'Authentication', openBugs: 22 }, { module: 'Reporting', openBugs: 18 },
  { module: 'Checkout', openBugs: 15 }, { module: 'Admin Portal', openBugs: 14 },
  { module: 'API Gateway', openBugs: 12 }, { module: 'Data Export', openBugs: 10 },
  { module: 'Notifications', openBugs: 8 },
]

export const defectPriorityDistribution = [
  { name: 'Blocker', value: 8, color: '#7f1d1d' }, { name: 'Critical', value: 14, color: '#ef4444' },
  { name: 'High', value: 38, color: '#f97316' }, { name: 'Medium', value: 55, color: '#3b82f6' },
  { name: 'Low', value: 36, color: '#64748b' },
]

export const defects = [
  { id: 'BUG-4821', title: 'Session timeout not enforced on payment flow', project: 'PatriotPay', sprintId: 'pp-s18', module: 'Checkout', severity: 'critical', priority: 'blocker', status: 'open', assignee: 'Marcus Webb', createdAt: '2026-05-28', reopenedCount: 1 },
  { id: 'BUG-4819', title: 'OAuth redirect fails on Safari mobile', project: 'TBR', sprintId: 'tbr-s15', module: 'Authentication', severity: 'critical', priority: 'blocker', status: 'open', assignee: 'Elena Rodriguez', createdAt: '2026-05-27', reopenedCount: 2 },
  { id: 'BUG-4815', title: 'Duplicate charge on retry payment', project: 'PatriotPay', sprintId: 'pp-s17', module: 'Payments', severity: 'high', priority: 'high', status: 'open', assignee: 'Marcus Webb', createdAt: '2026-05-26', reopenedCount: 0 },
  { id: 'BUG-4808', title: 'Grid widget renders stale data after refresh', project: '40 Grid', sprintId: 'fg-s9', module: 'Reporting', severity: 'medium', priority: 'medium', status: 'reopened', assignee: 'James Okonkwo', createdAt: '2026-05-24', reopenedCount: 1 },
  { id: 'BUG-4802', title: 'AI inference pipeline fails on edge nodes', project: 'Operator AI', sprintId: 'oai-s24', module: 'Mobile Core', severity: 'high', priority: 'high', status: 'open', assignee: 'Sarah Chen', createdAt: '2026-05-23', reopenedCount: 0 },
  { id: 'BUG-4798', title: 'Export CSV missing currency formatting', project: 'ACL', sprintId: 'acl-s7', module: 'Data Export', severity: 'low', priority: 'low', status: 'closed', assignee: 'David Kim', createdAt: '2026-05-22', reopenedCount: 0 },
  { id: 'BUG-4791', title: 'Player stats not updating after live match sync', project: 'Sportspass', sprintId: 'sp-s10', module: 'Data Sync', severity: 'high', priority: 'high', status: 'open', assignee: 'Amanda Foster', createdAt: '2026-05-21', reopenedCount: 0 },
  { id: 'BUG-4785', title: 'Admin role assignment not persisting across sessions', project: 'Admins', sprintId: 'adm-s3', module: 'Admin Portal', severity: 'medium', priority: 'medium', status: 'open', assignee: 'James Okonkwo', createdAt: '2026-05-20', reopenedCount: 0 },
]

export const testExecutionMetrics = {
  totalTestCases: 12480, executedTests: 10842, passedTests: 9912, failedTests: 687,
  blockedTests: 243, executionRate: 86.9, passRate: 91.4, failureRate: 6.3,
}

export const testRateTrends = {
  executionRate: { change: '2%', improved: true },
  passRate: { change: '1%', improved: true },
  failureRate: { change: '1%', improved: true },
}

export const testExecutions = [
  { id: 'TE-9021', name: 'Regression Suite v4.2', project: 'Operator AI', sprintId: 'oai-s24', suite: 'Full Regression', status: 'passed', executedAt: '2026-06-01 09:15', duration: '2h 14m' },
  { id: 'TE-9020', name: 'Payment Flow Smoke', project: 'PatriotPay', sprintId: 'pp-s18', suite: 'Smoke', status: 'failed', executedAt: '2026-06-01 08:42', duration: '45m' },
  { id: 'TE-9019', name: 'UI Component Suite', project: 'Cyncly', sprintId: 'cy-s12', suite: 'Authentication', status: 'passed', executedAt: '2026-05-31 16:30', duration: '1h 08m' },
  { id: 'TE-9018', name: 'SSO Integration Tests', project: 'TBR', sprintId: 'tbr-s15', suite: 'Integration', status: 'blocked', executedAt: '2026-05-31 14:20', duration: '32m' },
  { id: 'TE-9017', name: 'Grid Rendering Tests', project: '40 Grid', sprintId: 'fg-s9', suite: 'UI Components', status: 'passed', executedAt: '2026-05-31 11:05', duration: '58m' },
  { id: 'TE-9016', name: 'Inventory Smoke Tests', project: 'ACL', sprintId: 'acl-s7', suite: 'Smoke', status: 'passed', executedAt: '2026-05-30 15:00', duration: '28m' },
  { id: 'TE-9015', name: 'Match Feed E2E Tests', project: 'Sportspass', sprintId: 'sp-s10', suite: 'Full Regression', status: 'failed', executedAt: '2026-05-30 10:30', duration: '1h 42m' },
  { id: 'TE-9014', name: 'Hub Navigation Tests', project: 'York IE Hub', sprintId: 'yih-s6', suite: 'UI Components', status: 'passed', executedAt: '2026-05-29 14:00', duration: '52m' },
  { id: 'TE-9013', name: 'Admin RBAC Tests', project: 'Admins', sprintId: 'adm-s3', suite: 'Integration', status: 'passed', executedAt: '2026-05-29 09:45', duration: '37m' },
]

export const automationMetrics = {
  automatedTestCases: 8486, manualTestCases: 3994, automationCoverage: 68,
  automationPassRate: 93.2, flakyTests: 47, stabilityRate: 96.8, avgExecutionTime: '18m 42s',
}

export const moduleAutomationCoverage = [
  { module: 'Login', totalTestCases: 50, automatedTestCases: 48 },
  { module: 'Projects', totalTestCases: 120, automatedTestCases: 80 },
  { module: 'Defects', totalTestCases: 100, automatedTestCases: 55 },
  { module: 'Test Execution', totalTestCases: 80, automatedTestCases: 60 },
  { module: 'Automation', totalTestCases: 70, automatedTestCases: 65 },
  { module: 'Settings', totalTestCases: 45, automatedTestCases: 38 },
  { module: 'Reporting', totalTestCases: 90, automatedTestCases: 72 },
  { module: 'Integrations', totalTestCases: 60, automatedTestCases: 42 },
  { module: 'Payments', totalTestCases: 110, automatedTestCases: 88 },
  { module: 'Notifications', totalTestCases: 40, automatedTestCases: 28 },
  { module: 'Admin Portal', totalTestCases: 85, automatedTestCases: 51 },
  { module: 'API Gateway', totalTestCases: 95, automatedTestCases: 70 },
]

export const flakyTests = [
  { id: 'FT-101', name: 'checkout.payment.retry.spec.ts', project: 'PatriotPay', sprintId: 'pp-s18', failureRate: 18.4, lastRun: '2026-06-01', trend: 'worsening' },
  { id: 'FT-102', name: 'auth.sso.redirect.spec.ts', project: 'TBR', sprintId: 'tbr-s15', failureRate: 14.2, lastRun: '2026-06-01', trend: 'stable' },
  { id: 'FT-103', name: 'grid.widget.refresh.spec.ts', project: '40 Grid', sprintId: 'fg-s9', failureRate: 9.8, lastRun: '2026-05-31', trend: 'improving' },
  { id: 'FT-104', name: 'operator.inference.pipeline.spec.ts', project: 'Operator AI', sprintId: 'oai-s24', failureRate: 7.5, lastRun: '2026-05-31', trend: 'improving' },
  { id: 'FT-105', name: 'sportspass.match.feed.sync.spec.ts', project: 'Sportspass', sprintId: 'sp-s10', failureRate: 5.2, lastRun: '2026-05-30', trend: 'stable' },
]

export const defectTrend = [
  { label: 'Jan', value: 142, secondary: 118, periodStart: '2026-01-01' },
  { label: 'Feb', value: 128, secondary: 132, periodStart: '2026-02-01' },
  { label: 'Mar', value: 156, secondary: 145, periodStart: '2026-03-01' },
  { label: 'Apr', value: 134, secondary: 158, periodStart: '2026-04-01' },
  { label: 'May', value: 151, secondary: 172, periodStart: '2026-05-01' },
  { label: 'Jun', value: 98, secondary: 89, periodStart: '2026-06-01' },
]

export const testTrend = [
  { label: 'Week 1', value: 88, secondary: 91 }, { label: 'Week 2', value: 90, secondary: 89 },
  { label: 'Week 3', value: 87, secondary: 92 }, { label: 'Week 4', value: 91, secondary: 93 },
  { label: 'Week 5', value: 89, secondary: 91 }, { label: 'Week 6', value: 92, secondary: 94 },
]

export const automationTrend = [
  { label: 'Jan', value: 58 }, { label: 'Feb', value: 61 }, { label: 'Mar', value: 63 },
  { label: 'Apr', value: 65 }, { label: 'May', value: 67 }, { label: 'Jun', value: 68 },
]

export const qualityScoreTrend = [
  { label: 'Jan', value: 76, periodStart: '2026-01-01' }, { label: 'Feb', value: 78, periodStart: '2026-02-01' },
  { label: 'Mar', value: 79, periodStart: '2026-03-01' }, { label: 'Apr', value: 80, periodStart: '2026-04-01' },
  { label: 'May', value: 81, periodStart: '2026-05-01' }, { label: 'Jun', value: 82, periodStart: '2026-06-01' },
]

export const integrationCatalog = [
  { id: 'jira', name: 'Jira', description: 'Sync issues, epics, stories, and defects from your Jira Cloud or Data Center workspace.', category: 'project-management', logoColor: '#0052CC', logoLabel: 'Ji', supportsOAuth: true, supportsApiToken: true, defaultMetrics: [{ label: 'Total Synced Issues', value: 0 }, { label: 'Open Issues', value: 0 }, { label: 'Closed Issues', value: 0 }, { label: 'Sync Health', value: '—' }], configureSections: ['connection', 'sync', 'mapping', 'permissions', 'logs'] },
  { id: 'confluence', name: 'Confluence', description: 'Import requirements and documentation; link test cases to Confluence pages.', category: 'documentation', logoColor: '#172B4D', logoLabel: 'Cf', supportsOAuth: true, supportsApiToken: true, defaultMetrics: [{ label: 'Pages Synced', value: 0 }, { label: 'Last Sync', value: 'Never' }, { label: 'Sync Status', value: '—' }], configureSections: ['connection', 'sync', 'permissions', 'logs'] },
  { id: 'github', name: 'GitHub', description: 'Connect repositories to sync pull requests, releases, issues, and commit activity.', category: 'development', logoColor: '#24292F', logoLabel: 'GH', supportsOAuth: true, supportsApiToken: true, defaultMetrics: [{ label: 'Repositories Connected', value: 0 }, { label: 'Open PRs', value: 0 }, { label: 'Recent Releases', value: 0 }, { label: 'Sync Status', value: '—' }], configureSections: ['connection', 'sync', 'permissions', 'logs'] },
  { id: 'slack', name: 'Slack', description: 'Send quality alerts and sync summaries to Slack channels your team already uses.', category: 'communication', logoColor: '#4A154B', logoLabel: 'Sl', supportsOAuth: true, supportsApiToken: false, defaultMetrics: [{ label: 'Channels Linked', value: 0 }, { label: 'Alerts Sent (30d)', value: 0 }, { label: 'Sync Status', value: '—' }], configureSections: ['connection', 'sync', 'permissions', 'logs'] },
  { id: 'linear', name: 'Linear', description: 'Import issues and cycles from Linear to align engineering and QA workflows.', category: 'project-management', logoColor: '#5E6AD2', logoLabel: 'Ln', supportsOAuth: true, supportsApiToken: true, defaultMetrics: [{ label: 'Issues Synced', value: 0 }, { label: 'Open Issues', value: 0 }, { label: 'Sync Status', value: '—' }], configureSections: ['connection', 'sync', 'permissions', 'logs'] },
  { id: 'custom-api', name: 'Custom API Integration', description: 'Connect any REST endpoint with configurable auth, field mapping, and webhooks.', category: 'custom', logoColor: '#64748b', logoLabel: 'API', supportsOAuth: false, supportsApiToken: true, defaultMetrics: [{ label: 'Endpoints', value: 0 }, { label: 'Last Sync', value: 'Never' }, { label: 'Sync Status', value: '—' }], configureSections: ['connection', 'sync', 'mapping', 'permissions', 'logs'] },
]

export const defaultIntegrationStates = {
  jira: { status: 'connected', connectedBy: 'Sarah Chen', connectedAt: '2026-04-12T10:00:00Z', lastSyncAt: '2026-06-01T10:00:00Z', lastSyncStatus: 'success', authMethod: 'oauth', autoSync: true, syncFrequency: '30m', organization: 'acme-corp', selectedProjects: ['Operator AI', 'PatriotPay'], metrics: [{ label: 'Total Synced Issues', value: 4821 }, { label: 'Open Issues', value: 312 }, { label: 'Closed Issues', value: 4509 }, { label: 'Sync Health', value: 'Healthy' }] },
  confluence: { status: 'disconnected', connectedBy: null, connectedAt: null, lastSyncAt: null, lastSyncStatus: 'never', authMethod: null, autoSync: true, syncFrequency: '1h', metrics: [{ label: 'Pages Synced', value: 0 }, { label: 'Last Sync', value: 'Never' }, { label: 'Sync Status', value: '—' }] },
  github: { status: 'connected', connectedBy: 'Marcus Webb', connectedAt: '2026-03-20T14:30:00Z', lastSyncAt: '2026-06-01T10:02:00Z', lastSyncStatus: 'success', authMethod: 'oauth', autoSync: true, syncFrequency: '15m', organization: 'acme-engineering', selectedRepos: ['qalytics', 'operator-ai', 'patriotpay'], metrics: [{ label: 'Repositories Connected', value: 12 }, { label: 'Open PRs', value: 28 }, { label: 'Recent Releases', value: 4 }, { label: 'Sync Status', value: 'Healthy' }] },
  slack: { status: 'warning', connectedBy: 'Elena Rodriguez', connectedAt: '2026-05-01T09:00:00Z', lastSyncAt: '2026-06-01T09:15:00Z', lastSyncStatus: 'failed', authMethod: 'oauth', autoSync: false, syncFrequency: '6h', metrics: [{ label: 'Channels Linked', value: 3 }, { label: 'Alerts Sent (30d)', value: 142 }, { label: 'Sync Status', value: 'Degraded' }] },
  linear: { status: 'disconnected', connectedBy: null, connectedAt: null, lastSyncAt: null, lastSyncStatus: 'never', authMethod: null, autoSync: true, syncFrequency: '1h', metrics: [{ label: 'Issues Synced', value: 0 }, { label: 'Open Issues', value: 0 }, { label: 'Sync Status', value: '—' }] },
  'custom-api': { status: 'failed', connectedBy: 'David Kim', connectedAt: '2026-05-15T11:00:00Z', lastSyncAt: '2026-06-01T07:00:00Z', lastSyncStatus: 'failed', authMethod: 'api_token', autoSync: true, syncFrequency: '1h', metrics: [{ label: 'Endpoints', value: 2 }, { label: 'Last Sync', value: '3 hours ago' }, { label: 'Sync Status', value: 'Failed' }] },
}

export const integrationActivityLogs = [
  { id: 'log-1', integrationId: 'jira', action: 'Sync completed', actor: 'System', timestamp: '2026-06-01T10:00:00Z', status: 'success', detail: '4821 issues synchronized' },
  { id: 'log-2', integrationId: 'github', action: 'Sync completed', actor: 'System', timestamp: '2026-06-01T10:02:00Z', status: 'success', detail: '12 repositories updated' },
  { id: 'log-3', integrationId: 'slack', action: 'Sync failed', actor: 'System', timestamp: '2026-06-01T09:15:00Z', status: 'failed', detail: 'OAuth token expired — reconnect required' },
  { id: 'log-4', integrationId: 'custom-api', action: 'Connection test failed', actor: 'David Kim', timestamp: '2026-06-01T07:00:00Z', status: 'failed', detail: 'HTTP 401 from custom endpoint' },
  { id: 'log-5', integrationId: 'jira', action: 'Configuration updated', actor: 'Sarah Chen', timestamp: '2026-05-31T10:00:00Z', status: 'info', detail: 'Status mapping rules updated' },
]
