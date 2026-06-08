# Acceptance Criteria — Integrations Phase 1

## Navigation

- [ ] **AC-NAV-01:** Settings shows sub-navigation with General and Integrations.
- [ ] **AC-NAV-02:** Integrations route is `/dashboard/settings/integrations`.
- [ ] **AC-NAV-03:** Top bar title shows “Integrations” on integrations route.

## Overview dashboard

- [ ] **AC-OV-01:** Five summary cards display: Available, Connected, Active, Failed, Last sync.
- [ ] **AC-OV-02:** Counts update when an integration is connected or disconnected.
- [ ] **AC-OV-03:** Last sync displays relative time (e.g. “5 mins ago”) or “N/A” / “No syncs yet”.

## Marketplace list

- [ ] **AC-LIST-01:** All seven Phase 1 integrations appear as cards.
- [ ] **AC-LIST-02:** Each card shows logo, name, description, status badge, last sync, connected by.
- [ ] **AC-LIST-03:** Disconnected cards show only **Connect** action.
- [ ] **AC-LIST-04:** Connected cards show Configure, Sync now, Disconnect.
- [ ] **AC-LIST-05:** Search filters cards by name and description (case-insensitive).
- [ ] **AC-LIST-06:** Filter “Connected” shows connected, warning, and failed states.
- [ ] **AC-LIST-07:** Filter “Not connected” shows only disconnected.
- [ ] **AC-LIST-08:** Empty state when no cards match search/filter.

## Connect flow

- [ ] **AC-CONN-01:** Connect opens modal in connect mode with Connection tab active.
- [ ] **AC-CONN-02:** OAuth and API token options shown per provider capabilities.
- [ ] **AC-CONN-03:** Test connection shows success or error inline.
- [ ] **AC-CONN-04:** Connect button disabled until test succeeds (new connections).
- [ ] **AC-CONN-05:** On connect, card status becomes Connected and metrics populate.
- [ ] **AC-CONN-06:** API tokens are not persisted in localStorage (client).

## Configure flow

- [ ] **AC-CFG-01:** Configure opens modal in configure mode with existing settings.
- [ ] **AC-CFG-02:** Sync tab: auto-sync toggle and frequency selector persist on save.
- [ ] **AC-CFG-03:** Jira mapping tab: project and mapping controls visible.
- [ ] **AC-CFG-04:** GitHub mapping tab: repository checkboxes persist on save.
- [ ] **AC-CFG-05:** Permissions tab documents RBAC and scopes.
- [ ] **AC-CFG-06:** Logs tab shows activity for that integration.

## Sync & disconnect

- [ ] **AC-SYNC-01:** Sync now shows loading state and updates last sync time on success.
- [ ] **AC-SYNC-02:** Disconnect resets card to Not Connected and clears client token vault entry.

## Security (backend phase)

- [ ] **AC-SEC-01:** Only Admin / Integration Manager roles can POST connect/disconnect.
- [ ] **AC-SEC-02:** Tokens stored encrypted server-side.
- [ ] **AC-SEC-03:** All connect/disconnect/sync events written to audit log.

## Responsive

- [ ] **AC-RES-01:** Layout usable at 320px width without horizontal page scroll.
- [ ] **AC-RES-02:** Summary cards and integration grid reflow per breakpoints in RESPONSIVE.md.
