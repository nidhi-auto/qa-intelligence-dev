# Integrations Module — Product & Engineering Package

**Product:** QAlytics  
**Module:** Settings → Integrations  
**Phase:** 1 (MVP)  
**Status:** UI implemented with mock data; backend contracts defined below  

---

## Document index

| # | Deliverable | Location |
|---|-------------|----------|
| 1 | PRD | [PRD.md](./PRD.md) |
| 2 | UI/UX specification | [UI_UX_SPEC.md](./UI_UX_SPEC.md) |
| 3 | Dashboard wireframe description | [WIREFRAMES.md](./WIREFRAMES.md) |
| 4 | User stories | [USER_STORIES.md](./USER_STORIES.md) |
| 5 | Acceptance criteria | [ACCEPTANCE_CRITERIA.md](./ACCEPTANCE_CRITERIA.md) |
| 6 | API requirements | [API_REQUIREMENTS.md](./API_REQUIREMENTS.md) |
| 7 | Database schema | [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) |
| 8 | Workflow diagrams | [WORKFLOWS.md](./WORKFLOWS.md) |
| 9 | Responsive design | [RESPONSIVE.md](./RESPONSIVE.md) |
| 10 | Engineering task breakdown | [ENGINEERING_TASKS.md](./ENGINEERING_TASKS.md) |

---

## Implementation snapshot (frontend)

| Route | Component |
|-------|-----------|
| `/dashboard/settings` | General settings (profile, notifications, security) |
| `/dashboard/settings/integrations` | Integrations marketplace & configuration |

**Phase 1 connectors in UI:** Jira, Confluence, GitHub, Slack, Linear, Custom API.

**Client state:** `localStorage` persistence for connection metadata; tokens held in-memory only (never written to `localStorage`).
