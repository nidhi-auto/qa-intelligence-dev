# TEST_REPORT — QAlytics R1 (1.0.0)

## Execution mode note

Per `.cursor/rules/qa-playwright-generation-only.mdc`, test **source** was generated only. `npx playwright test` was **not** executed in this session.

## Rules consulted

| Rule | Application |
|------|-------------|
| `qa-playwright-generation-only.mdc` | Specs under `tests/qa-intelligence/r1-release/1-0-0/` only; no Playwright CLI or config changes |
| `playwright-spec-templates.mdc` | smoke, form, api templates; shared `fixtures/mock-data.ts` |

## Port resolution

- **Priority 1:** `process.env.BASE_URL`
- **Fallback:** `http://localhost:5173` (Vite default; no explicit port in `vite.config.ts`)
- **Warning:** If dev server uses a different port, set `BASE_URL` before running tests.

## Conflict resolution

User prompt requested `playwright.config.*` and `npx playwright test` verification. Project rule **forbids** both. Generation-only rule wins; no config file was created or modified.

## Coverage by route/feature

| Route | Specs | Coverage |
|-------|-------|----------|
| `/` Landing | `landing/smoke.spec.ts` | Load, heading, CTA navigation |
| `/sign-in` | `sign-in/smoke.spec.ts`, `form.spec.ts`, `api.spec.ts` | Form validation, happy path, API errors |
| `/dashboard` Overview | `dashboard/overview-smoke.spec.ts` | Nav, headings, route change |
| `/dashboard/projects` | `dashboard/projects-smoke.spec.ts` | Filters, pie charts, quality score |
| `/dashboard/defects` | `dashboard/defects-smoke.spec.ts` | Table, search |
| `/dashboard/tests` | `dashboard/tests-smoke.spec.ts` | Metrics table |
| `/dashboard/automation` | `dashboard/automation-smoke.spec.ts` | Flaky tests section |
| `/dashboard/settings` | `settings/general-smoke.spec.ts` | Profile form, settings nav |
| `/dashboard/settings/integrations` | `settings/integrations-smoke.spec.ts`, `integrations-modal.spec.ts` | Cards, search, connect/configure modals, filters |

## Gaps (not 100%)

- Chart interactions (Recharts) — visual only, no data-testid hooks
- Responsive/mobile/accessibility suites — templates available in rules but not generated for all features
- Auth-gated API routes — UI uses mock fallback when `VITE_API_BASE_URL` unset
- Integration disconnect/sync flows — partial (connect/configure covered; sync spinner not asserted)
- Settings profile save — button visible but save action is display-only (no backend mutation)

## Test layout

```
tests/qa-intelligence/r1-release/1-0-0/
├── fixtures/mock-data.ts
├── landing/smoke.spec.ts
├── sign-in/{smoke,form,api}.spec.ts
├── dashboard/{overview,projects,defects,tests,automation}-smoke.spec.ts
└── settings/{general-smoke,integrations-smoke,integrations-modal}.spec.ts
```

## Build verification

- `Frontend/`: `npm run build` — **passes**
- `backend/`: `npm run build` — **passes**
