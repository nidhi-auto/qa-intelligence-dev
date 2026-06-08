# UI/UX Specification — Integrations

## Design principles

- **Enterprise SaaS:** clean cards, generous whitespace, brand green accents, surface neutrals.
- **Marketplace pattern:** browsable catalog, not a settings form list.
- **Status at a glance:** color-coded badges (green / amber / red / gray).

## Information architecture

```
Settings
├── General (profile, notifications, security)
└── Integrations
    ├── Overview (summary metrics + catalog)
    └── [Modal] Connect / Configure {Provider}
        ├── Connection
        ├── Sync
        ├── Mapping (provider-specific)
        ├── Permissions
        └── Error logs
```

## Status badges

| Status | Color | Label |
|--------|-------|-------|
| Connected | Emerald | Connected |
| Warning | Amber | Warning |
| Failed | Red | Failed |
| Disconnected | Gray | Not Connected |

## Summary cards (top row)

Five `MetricCard` components in responsive grid:

1. Available — total catalog count  
2. Connected — status = connected  
3. Active — connected + autoSync  
4. Failed / degraded — failed status or last sync failed  
5. Last sync — relative time + subtitle  

## Integration card anatomy

```
┌─────────────────────────────────────────┐
│ [Logo]  Name                    [Badge]│
│         Description (2 lines max)        │
│ Last sync          Connected by          │
│ ┌─────────┬─────────┐ metrics (2x2)     │
│ [Configure] [Sync now] [Disconnect]      │
└─────────────────────────────────────────┘
```

**Disconnected:** single primary CTA — **Connect**.

## Toolbar

- Full-width search (debounced 200ms recommended for API phase).
- Filter dropdown right-aligned on desktop; stacked on mobile.

## Configuration modal

- Max width 672px (`max-w-2xl`), 90vh max height, scrollable body.
- Tab bar: Connection | Sync | Mapping | Permissions | Error logs (subset per provider).
- Footer: security note + Cancel + primary (Connect / Save).

### Jira-specific

- Organization select  
- Project multi-select  
- Work types: Issues, Epics, Stories, Tasks  
- Defect severity mapping + status mapping dropdowns  
- Metrics: Total synced, Open, Closed, Sync health  

### Confluence-specific

- Workspace select  
- Space checkboxes  
- Metrics: Pages synced, Last sync, Sync status  

### GitHub-specific

- Organization select  
- Repository checkboxes  
- Sync: PRs, Releases, Issues, Commits  
- Metrics: Repos connected, Open PRs, Recent releases, Sync status  

## Empty states

| Scenario | Title | CTA |
|----------|-------|-----|
| New workspace, no filters | No integrations yet | Implicit: browse cards |
| Search/filter no match | No integrations match | Clear filters (future) |

## Accessibility

- Modal: `role="dialog"`, `aria-modal`, focus trap (enhance in Phase 2).
- Escape closes modal.
- All icon buttons have `aria-label`.
- Status not conveyed by color alone (text label in badge).

## Motion

- Sync button: spinner on `Sync now` while in flight.
- Modal: backdrop blur, no excessive animation.
