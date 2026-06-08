# Module-wise Automation Coverage

## 1. UI/UX specification

**Placement:** Automation Health → below *Automation Coverage Trend* → above *Flaky Test Analysis*.

**Section header**
- Title: Module-wise Automation Coverage
- Subtitle: Track automation coverage across individual application modules and identify automation gaps.

**Layout (top to bottom)**
1. Toolbar: search, sort, Export CSV
2. Data table with pagination (5 rows per page)

**Interaction**
- Search filters modules client-side (case-insensitive)
- Sort resets pagination to page 1
- Row `title` attribute acts as hover summary (module, counts, %)
- Export downloads filtered/sorted rows as CSV (Excel-compatible)

## 2. Table design

| Column | Alignment | Format |
|--------|-----------|--------|
| Module | Left | Plain text, medium weight |
| Total Test Cases | Left | Integer, locale-formatted |
| Automated Test Cases | Left | Integer, locale-formatted |
| Automation Coverage % | Left | Percent, color: green ≥70%, amber ≥50%, red &lt;50% |

## 3. Coverage calculation logic

```text
Automation Coverage % = (Automated Test Cases / Total Test Cases) × 100
```

- Rounded to one decimal place for display
- Returns `0` when `totalTestCases` is 0
- Implemented in `src/lib/moduleAutomationCoverage.ts` → `computeCoveragePercent()`

## 4. Sample mock data

See `moduleAutomationCoverage` in `src/data/mockData.ts` (12 modules including Login, Projects, Defects, Test Execution, Automation).

## 5. Responsive behavior

| Breakpoint | Toolbar | Table |
|------------|---------|-------|
| &lt;640px | Stacked | Horizontal scroll |
| ≥640px | Row on sm+ | Full width |
| ≥1024px | Inline search + sort | Full width |

## 6. Acceptance criteria

- [ ] Section appears between trend chart and flaky test table
- [ ] Table columns match spec; coverage matches formula
- [ ] Search, sort, pagination, and CSV export work without errors
- [ ] Empty state when search returns no modules
- [ ] Styling matches Automation Health cards and typography

## 7. API response structure

```json
{
  "modules": [
    {
      "module": "Login",
      "totalTestCases": 50,
      "automatedTestCases": 48,
      "coveragePercent": 96.0
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 5,
    "totalItems": 12,
    "totalPages": 3
  }
}
```

**Suggested endpoint:** `GET /api/v1/workspaces/{workspaceId}/automation/module-coverage?search=&sort=coverage_desc&page=1&pageSize=5`

Server computes `coveragePercent`; client may request `Accept: text/csv` for export.
