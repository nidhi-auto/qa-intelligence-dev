# Engineering Task Breakdown

## Phase 1A — Frontend (complete in repo)

| ID | Task | Estimate |
|----|------|----------|
| FE-1 | Settings nested routes (General + Integrations) | 2h ✅ |
| FE-2 | Integration types, catalog, mock state | 3h ✅ |
| FE-3 | Summary metrics + search/filter | 3h ✅ |
| FE-4 | Integration cards + actions | 4h ✅ |
| FE-5 | Config modal (tabs, provider sections) | 8h ✅ |
| FE-6 | localStorage persistence + in-memory token vault | 2h ✅ |
| FE-7 | Top bar title resolution for settings paths | 1h ✅ |

## Phase 1B — Backend foundation

| ID | Task | Estimate | Owner |
|----|------|----------|-------|
| BE-1 | DB migrations: connections, credentials, logs, jobs | 1d | Backend |
| BE-2 | KMS encryption helper for credentials | 1d | Platform |
| BE-3 | RBAC middleware for integration mutations | 0.5d | Backend |
| BE-4 | `GET /catalog`, `GET /connections` | 1d | Backend |
| BE-5 | OAuth PKCE start/callback (Jira + GitHub first) | 2d | Backend |
| BE-6 | API token connect + test connection | 1d | Backend |
| BE-7 | PATCH config + DELETE disconnect | 1d | Backend |
| BE-8 | POST manual sync + job queue worker stub | 2d | Backend |

## Phase 1C — Sync workers

| ID | Task | Estimate |
|----|------|----------|
| SYNC-1 | Jira issue ingest + severity/status mapping | 3d |
| SYNC-2 | GitHub PR/issue/release ingest | 3d |
| SYNC-3 | Confluence page ingest + link table | 2d |
| SYNC-4 | Slack outbound notification adapter | 1d |
| SYNC-5 | Azure DevOps + Linear (parity with Jira-lite) | 3d each |
| SYNC-6 | Custom API connector executor | 2d |

## Phase 1D — Observability & hardening

| ID | Task | Estimate |
|----|------|----------|
| OPS-1 | Activity log API + UI binding | 1d |
| OPS-2 | Failed sync alerting (email + Slack) | 1d |
| OPS-3 | Rate limit + exponential backoff | 1d |
| OPS-4 | E2E tests (connect, sync, disconnect) | 2d |
| OPS-5 | Security review: token handling, OWASP | 1d |

## Phase 2 — Future enhancements

- Zapier, Teams, Notion, Jenkins, Bitbucket connectors
- Inbound webhooks
- Custom connector builder UI
- Bi-directional status updates to Jira/GitHub

## Suggested sprint plan

| Sprint | Goal |
|--------|------|
| S1 | BE-1–BE-7 + wire FE to real API |
| S2 | SYNC-1, SYNC-2 + manual sync |
| S3 | SYNC-3–SYNC-6 + OPS-1–OPS-3 |
| S4 | OPS-4–OPS-5, beta rollout |

## Dependencies

- OAuth app registrations (Jira, GitHub, Slack, Azure AD, Linear)
- Queue infrastructure (SQS/RabbitMQ) for sync jobs
- Secrets manager (AWS Secrets Manager / Vault)
