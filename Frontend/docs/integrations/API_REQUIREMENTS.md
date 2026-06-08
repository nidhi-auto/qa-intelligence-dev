# API Requirements — Integrations

Base path: `/api/v1/workspaces/{workspaceId}/integrations`

All endpoints require authenticated session. Mutations require role `admin` or `integration_manager`.

## Catalog

### `GET /catalog`

Returns static + feature-flagged integration definitions (id, name, capabilities, oauth scopes).

## Connections

### `GET /connections`

List connection summaries for workspace.

```json
{
  "connections": [
    {
      "integrationId": "jira",
      "status": "connected",
      "connectedBy": "user-uuid",
      "connectedAt": "2026-04-12T10:00:00Z",
      "lastSyncAt": "2026-06-04T12:00:00Z",
      "lastSyncStatus": "success",
      "autoSync": true,
      "syncFrequency": "30m",
      "metrics": { "totalSyncedIssues": 4821, "openIssues": 312 }
    }
  ],
  "summary": {
    "total": 7,
    "connected": 3,
    "active": 2,
    "failed": 1,
    "lastSyncAt": "2026-06-04T12:00:00Z"
  }
}
```

### `POST /connections/{integrationId}/oauth/start`

Starts OAuth PKCE flow; returns `{ "authorizationUrl": "..." }`.

### `POST /connections/{integrationId}/oauth/callback`

Body: `{ "code": "...", "state": "..." }`. Exchanges code, stores encrypted tokens.

### `POST /connections/{integrationId}/token`

Body: `{ "token": "...", "organizationId": "..." }`. Validates and stores token.

### `POST /connections/{integrationId}/test`

Tests credentials without persisting config changes. Returns `{ "ok": true }` or 4xx with error code.

### `PATCH /connections/{integrationId}`

Update sync settings, mappings, selected projects/repos.

```json
{
  "autoSync": true,
  "syncFrequency": "1h",
  "organizationId": "acme",
  "projectIds": ["QA-1"],
  "mapping": {
    "severity": { "Highest": "blocker", "High": "high" },
    "status": { "Done": "closed", "In Progress": "open" }
  }
}
```

### `DELETE /connections/{integrationId}`

Disconnect: revoke tokens, mark status disconnected, enqueue cleanup job.

### `POST /connections/{integrationId}/sync`

Trigger manual sync. Returns `{ "jobId": "sync-uuid", "status": "queued" }`.

### `GET /connections/{integrationId}/logs`

Query: `?limit=50&cursor=`. Returns paginated activity log entries.

## Provider proxies (internal)

| Service | Responsibility |
|---------|----------------|
| `jira-sync` | Issues, epics, stories; field mapping |
| `github-sync` | Repos, PRs, releases, issues |
| `confluence-sync` | Spaces, pages, links |
| `slack-notify` | Outbound alerts only (Phase 1) |

## Webhooks (Phase 2)

- `POST /webhooks/github`
- `POST /webhooks/jira`

## Error model

```json
{
  "error": {
    "code": "INTEGRATION_TOKEN_EXPIRED",
    "message": "Reconnect Slack to restore sync.",
    "integrationId": "slack"
  }
}
```

| HTTP | Code |
|------|------|
| 401 | UNAUTHORIZED |
| 403 | FORBIDDEN_ROLE |
| 404 | CONNECTION_NOT_FOUND |
| 409 | ALREADY_CONNECTED |
| 422 | INVALID_MAPPING |
| 502 | PROVIDER_UNAVAILABLE |
