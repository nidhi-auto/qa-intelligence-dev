# Dashboard Wireframe Descriptions

## Screen 1: Settings shell

```
┌──────────────────────────────────────────────────────────────┐
│ TopBar: "Settings"                                            │
├──────────┬───────────────────────────────────────────────────┤
│ General  │  PageHeader: Settings + description               │
│ Integr.● │  ┌─────────┬──────────────────────────────────┐  │
│          │  │ Side nav│  [Outlet: child page content]     │  │
│          │  └─────────┴──────────────────────────────────┘  │
└──────────┴───────────────────────────────────────────────────┘
```

- Left sub-nav (horizontal scroll on mobile): **General** | **Integrations**
- Active item: brand tint background

## Screen 2: Integrations overview

```
┌──────────────────────────────────────────────────────────────┐
│ Integrations                                                  │
│ Connect third-party tools…                                    │
├──────────────────────────────────────────────────────────────┤
│ [Avail 7] [Conn 3] [Active 2] [Failed 2] [Last sync 2m ago] │
├──────────────────────────────────────────────────────────────┤
│ [🔍 Search integrations…………………] [Filter ▼ All integrations]│
├──────────────────────────────────────────────────────────────┤
│ ┌──────────┐ ┌──────────┐ ┌──────────┐                     │
│ │ Jira     │ │ GitHub   │ │ Confluence│  … 3-column grid   │
│ │ Connected│ │ Connected│ │ Not conn. │                     │
│ └──────────┘ └──────────┘ └──────────┘                     │
│ Coming soon: Zapier, Teams, Notion…                          │
└──────────────────────────────────────────────────────────────┘
```

## Screen 3: Connect Jira (modal)

```
┌──────────────── Connect Jira ──────────────── ✕ ─┐
│ Connection | Sync | Mapping | Permissions | Logs │
├──────────────────────────────────────────────────┤
│ [OAuth 2.0] [API token]                           │
│ [ Authorize with Jira ]                           │
│ Organization [Acme Corp ▼]                      │
│ [Test connection]  ✓ Connection successful        │
├──────────────────────────────────────────────────┤
│ Tokens encrypted…          [Cancel] [Connect]     │
└──────────────────────────────────────────────────┘
```

## Screen 4: Configure GitHub (modal, Sync tab)

```
│ Sync                                              │
│ Auto sync ───────────────────────────── [✓]      │
│ Frequency [Every 15 minutes ▼]                   │
│ ☑ Pull requests  ☑ Releases  ☑ Issues  ☑ Commits │
```

## Responsive breakpoints

| Breakpoint | Summary cards | Integration grid |
|------------|---------------|------------------|
| <640px | 2 columns | 1 column |
| 640–1024px | 2 columns | 2 columns |
| ≥1024px | 5 columns | 3 columns |
