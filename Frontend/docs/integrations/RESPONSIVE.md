# Responsive Design Requirements

## Breakpoints (Tailwind defaults)

| Token | Min width | Usage |
|-------|-----------|--------|
| `sm` | 640px | 2-column grids |
| `lg` | 1024px | Side-by-side settings layout |
| `xl` | 1280px | 3-column integration cards, 5 summary metrics |

## Settings layout

| Viewport | Sub-navigation | Content |
|----------|----------------|---------|
| <1024px | Horizontal scroll row above content | Full width |
| ≥1024px | Fixed 208px left column | Fluid main |

## Integrations summary cards

| Viewport | Grid |
|----------|------|
| <640px | 2 columns |
| 640–1023px | 2 columns |
| ≥1024px | 5 columns |

Cards must remain readable: min height auto, no clipped metric labels.

## Integration marketplace grid

| Viewport | Columns |
|----------|---------|
| <640px | 1 |
| 640–1279px | 2 |
| ≥1280px | 3 |

Card actions wrap to multiple lines on narrow widths; primary CTA remains tappable (min 44px touch target).

## Toolbar

- Search: full width on mobile.
- Filter: full width below search on `<sm`; inline `w-48` on `≥sm`.

## Configuration modal

| Viewport | Behavior |
|----------|----------|
| All | `max-w-2xl`, horizontal padding 16px |
| <640px | Full viewport height cap 90vh; tab labels may scroll horizontally (future) |
| ≥640px | Centered overlay |

## Typography scale

- Page title: `text-2xl sm:text-3xl` (existing PageHeader).
- Card title: `text-base font-semibold`.
- Metrics in cards: `text-sm` labels, `text-sm font-semibold` values.

## Dark mode

All integration surfaces must support `.dark` theme (existing design tokens: `surface-*`, `brand-*`).

## Performance

- Lazy-load provider logos when real assets replace lettermarks.
- Virtualize catalog if count exceeds 20 (future).
