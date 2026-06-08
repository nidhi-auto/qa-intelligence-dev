# Release R1 — 1.0.0 (QAlytics Base Release)

## Detected execution mode: **Cloud Mode**

Both `AWS CloudFormation` and environment variable placeholders are present. Backend is serverless AWS (Lambda + API Gateway + DynamoDB + Cognito). No resources were provisioned in this session.

---

## Phase 0 — Discovery & Inventory

### Data source inventory

| Source | Entity | Fields | Used by | Mutated |
|--------|--------|--------|---------|---------|
| `mockData.ts` | User | name, email, role, avatar | Sidebar, Settings | No |
| `mockData.ts` | PortfolioSummary | totalProjects, activeProjects, … | Landing, Overview | No |
| `mockData.ts` | Project[] | id, name, qaOwner, status, … | All dashboard pages | No |
| `mockData.ts` | Sprint[] | id, projectId, name, status | Filter hooks, pages | No |
| `mockData.ts` | DefectMetrics, Defect[] | metrics + defect rows | DefectsPage | No |
| `mockData.ts` | TestExecutionMetrics, TestExecution[] | metrics + runs | TestsPage | No |
| `mockData.ts` | AutomationMetrics, FlakyTest[], ModuleAutomationCoverage[] | AutomationPage | No |
| `mockData.ts` | TrendPoint[] | label, value, secondary?, periodStart? | Charts | No |
| `integrations.ts` | IntegrationCatalogItem[], IntegrationStateMap | catalog + connection state | IntegrationsPage | Yes (localStorage) |
| `integrationStorage.ts` | Token vault | in-memory Map | Integration modal | Yes |

### UI surface → data map

| Screen | Reads | Filters | Writes |
|--------|-------|---------|--------|
| Landing | portfolioSummary | — | — |
| Sign-in | — | — | navigate on submit |
| Overview | projects, trends, portfolioSummary | project, date range (localStorage) | — |
| Projects | projects, metrics aggregates | project/sprint | — |
| Defects | defects, metrics, trends | project/sprint, search, severity | — |
| Tests | executions, metrics, trends | project/sprint, search | — |
| Automation | flaky tests, coverage, metrics | project/sprint, search | — |
| Settings/General | currentUser | — | — |
| Settings/Integrations | catalog, states, activity | search, status filter | connect/disconnect/sync (localStorage) |

### Assumptions

- `launchpad-frontend/` submodule could not be cloned (private GitHub). `main/` used as canonical reference (same repo per `.gitmodules`).
- Sign-in has no real validation in mock mode; Cognito added for Cloud Mode.
- Integration secrets stay client-side (token vault); API persists connection metadata only.

---

## Phase 1 — API Contract

| Method | Path | Response shape | Auth |
|--------|------|----------------|------|
| POST | `/auth/sign-in` | `{ token, user }` | Public |
| GET | `/user/current` | `User` | JWT |
| GET | `/portfolio/summary` | `PortfolioSummary` | Public |
| GET | `/projects` | `Project[]` | JWT |
| GET | `/sprints` | `Sprint[]` | JWT |
| GET | `/defects/metrics` | `DefectMetrics` | JWT |
| GET | `/defects/module-open-bugs` | `{module, openBugs}[]` | JWT |
| GET | `/defects/priority-distribution` | `{name, value, color}[]` | JWT |
| GET | `/defects` | `Defect[]` | JWT |
| GET | `/tests/metrics` | `TestExecutionMetrics` | JWT |
| GET | `/tests/rate-trends` | rate trend object | JWT |
| GET | `/tests/executions` | `TestExecution[]` | JWT |
| GET | `/automation/metrics` | `AutomationMetrics` | JWT |
| GET | `/automation/module-coverage` | `ModuleAutomationCoverage[]` | JWT |
| GET | `/automation/flaky-tests` | `FlakyTest[]` | JWT |
| GET | `/trends/{defects,tests,automation,quality-score}` | `TrendPoint[]` | JWT |
| GET | `/integrations/catalog` | `IntegrationCatalogItem[]` | JWT |
| GET | `/integrations/states` | `IntegrationStateMap` | JWT |
| PUT | `/integrations/:id` | `IntegrationConnectionState` | JWT |
| POST | `/integrations/:id/sync` | updated state | JWT |
| GET | `/integrations/activity` | `IntegrationActivityLog[]` | JWT |

Errors: `{ message: string }` with 4xx/5xx status codes.

---

## Phase 2 — Implementation Plan

- [x] DynamoDB single-table: `pk` + `sk`, `data` attribute
- [x] Lambda router handler `src/handlers/api.ts`
- [x] Seed script ports all mock data
- [x] Frontend API layer `Frontend/src/api/` with mock fallback
- [x] `DashboardDataProvider` centralizes dashboard reads
- [x] CloudFormation template `backend/cloudformation-template.yaml`

---

## Phase 3 — Code locations

| Area | Path |
|------|------|
| Frontend app | `development-1/Frontend/` |
| API client | `Frontend/src/api/` |
| Backend | `development-1/backend/` |
| IaC | `backend/cloudformation-template.yaml` |
| Playwright specs | `tests/qa-intelligence/r1-release/1-0-0/` |

---

## Phase 4 — Deploy (operator runbook)

### 1. Build & upload Lambda

```bash
cd development-1/backend
npm install
npm run build
cd dist && zip -r ../api.zip .
aws s3 cp api.zip s3://<YOUR_ARTIFACT_BUCKET>/api.zip
```

### 2. Deploy stack

Load AWS credentials from `.env` into the environment, then:

```bash
aws cloudformation deploy \
  --template-file cloudformation-template.yaml \
  --stack-name qalytics-r1 \
  --parameter-overrides LambdaCodeS3Bucket=<YOUR_ARTIFACT_BUCKET> LambdaCodeS3Key=api.zip \
  --capabilities CAPABILITY_IAM
```

### 3. Capture outputs → Frontend env

| Stack output | Frontend env var |
|--------------|------------------|
| ApiBaseUrl | `VITE_API_BASE_URL` |
| CognitoUserPoolId | `VITE_COGNITO_USER_POOL_ID` |
| CognitoClientId | `VITE_COGNITO_CLIENT_ID` |
| AwsRegion | `VITE_COGNITO_REGION` |

### 4. Seed DynamoDB

```bash
export TABLE_NAME=<DynamoDbTableName output>
npm run seed
```

### 5. Create Cognito user (example)

```bash
aws cognito-idp admin-create-user --user-pool-id <pool-id> --username <email> ...
aws cognito-idp admin-set-user-password --user-pool-id <pool-id> --username <email> --password <redacted> --permanent
```

---

## Frontend sync summary

### Changed in `Frontend/`

- Added `src/api/` — config, client, resources (mock fallback when `VITE_API_BASE_URL` unset)
- Added `src/contexts/DashboardDataContext.tsx` — loads all dashboard data
- Added `src/hooks/useAsyncResource.ts`
- Updated dashboard pages, Sidebar, SignInPage, LandingPage to use API layer
- Added `.env.example`

### Intentional divergences preserved

| Item | Reason |
|------|--------|
| Integration token vault (in-memory) | Security — secrets never persisted; matches submodule pattern |
| Overview/integration filter localStorage | Client UX state; not backend-modeled |
| Sign-in navigates on API failure | Matches original mock behavior (demo-friendly) |
| `launchpadEmbedBasename.js` | Launchpad embed routing preserved from main |

### Needs human judgment

| Item | Question |
|------|----------|
| `launchpad-frontend/` submodule empty | Re-init submodule with credentials, or continue using `main/` as reference? |
| Integration PUT to API vs localStorage | Should integration state be server-authoritative in production? |
| Auth route protection | Dashboard routes are not client-guarded; rely on API JWT only? |

---

## Verification checklist (endpoint → UI)

| Endpoint | UI surface |
|----------|------------|
| GET /portfolio/summary | Landing stats, Overview KPIs |
| GET /projects | Overview table, Projects, all filters |
| GET /defects/* | Defects page metrics + table |
| GET /tests/* | Tests page metrics + table |
| GET /automation/* | Automation page |
| GET /trends/* | All trend charts |
| GET /integrations/* | Integrations settings |
| POST /auth/sign-in | Sign-in page |
