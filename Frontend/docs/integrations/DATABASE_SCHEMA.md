# Database Schema Recommendations

PostgreSQL 15+. All secrets in `integration_credentials` encrypted with KMS (AES-256-GCM).

## `integration_catalog`

Static reference data (can be seed JSON).

| Column | Type | Notes |
|--------|------|-------|
| id | varchar PK | e.g. `jira` |
| name | varchar | Display name |
| supports_oauth | boolean | |
| supports_api_token | boolean | |
| is_enabled | boolean | Feature flags |

## `integration_connections`

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| workspace_id | uuid FK | Tenant scope |
| integration_id | varchar FK | catalog id |
| status | enum | connected, warning, failed, disconnected |
| auth_method | enum | oauth, api_token |
| connected_by | uuid FK users | |
| connected_at | timestamptz | |
| disconnected_at | timestamptz nullable | |
| organization_external_id | varchar nullable | |
| config_json | jsonb | projects, repos, mapping rules |
| auto_sync | boolean | |
| sync_frequency_minutes | int | 15, 30, 60, 360, 1440 |
| last_sync_at | timestamptz nullable | |
| last_sync_status | enum | success, failed, pending, never |
| created_at | timestamptz | |
| updated_at | timestamptz | |

**Unique:** `(workspace_id, integration_id)` where status != disconnected OR partial unique on active only.

## `integration_credentials`

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| connection_id | uuid FK | ON DELETE CASCADE |
| credential_type | enum | oauth_refresh, oauth_access, api_token |
| encrypted_payload | bytea | Ciphertext |
| expires_at | timestamptz nullable | |
| rotated_at | timestamptz | |

Never log or return decrypted values via API.

## `integration_sync_jobs`

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| connection_id | uuid FK | |
| trigger | enum | manual, scheduled, webhook |
| status | enum | queued, running, success, failed |
| started_at | timestamptz | |
| finished_at | timestamptz nullable | |
| records_processed | int | |
| error_message | text nullable | |

## `integration_activity_logs`

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| connection_id | uuid FK | |
| actor_user_id | uuid nullable | null = system |
| action | varchar | e.g. `sync_completed` |
| status | enum | success, failed, info |
| detail | text nullable | |
| created_at | timestamptz | |

Index: `(connection_id, created_at DESC)`.

## `synced_external_entities` (optional Phase 1b)

Maps external IDs to internal defects/tests.

| Column | Type |
|--------|------|
| connection_id | uuid |
| entity_type | enum (issue, pr, page) |
| external_id | varchar |
| internal_id | uuid |
| last_seen_at | timestamptz |

**Unique:** `(connection_id, entity_type, external_id)`.

## ERD (simplified)

```
workspace ──< integration_connections ──< integration_credentials
                      │
                      ├──< integration_sync_jobs
                      ├──< integration_activity_logs
                      └──< synced_external_entities
```
