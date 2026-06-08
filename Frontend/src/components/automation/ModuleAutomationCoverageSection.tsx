import { useMemo, useState } from 'react'
import { Download, FolderKanban } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Select } from '@/components/ui/Input'
import { EmptyState, SearchBar } from '@/components/ui/PageElements'
import {
  exportModuleCoverageCsv,
  sortModuleCoverageRows,
  toCoverageRows,
  type ModuleCoverageSort,
} from '@/lib/moduleAutomationCoverage'
import { formatPercent, cn } from '@/lib/utils'
import type { ModuleAutomationCoverage } from '@/types'

const PAGE_SIZE = 5

interface ModuleAutomationCoverageSectionProps {
  modules: ModuleAutomationCoverage[]
}

export function ModuleAutomationCoverageSection({ modules }: ModuleAutomationCoverageSectionProps) {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<ModuleCoverageSort>('coverage_desc')
  const [page, setPage] = useState(0)

  const allRows = useMemo(() => toCoverageRows(modules), [modules])

  const filteredSorted = useMemo(() => {
    const q = search.trim().toLowerCase()
    const filtered = q
      ? allRows.filter((r) => r.module.toLowerCase().includes(q))
      : allRows
    return sortModuleCoverageRows(filtered, sort)
  }, [allRows, search, sort])

  const totalPages = Math.max(1, Math.ceil(filteredSorted.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages - 1)
  const pageRows = filteredSorted.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE)

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setPage(0)
  }

  const handleSortChange = (value: ModuleCoverageSort) => {
    setSort(value)
    setPage(0)
  }

  return (
    <Card
      title="Module-wise Automation Coverage"
      description="Track automation coverage across individual application modules and identify automation gaps."
      className="mb-8"
    >
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          <SearchBar
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by module name…"
            className="flex-1"
          />
          <Select
            value={sort}
            onChange={(e) => handleSortChange(e.target.value as ModuleCoverageSort)}
            options={[
              { value: 'coverage_desc', label: 'Coverage % (high to low)' },
              { value: 'coverage_asc', label: 'Coverage % (low to high)' },
              { value: 'automated_desc', label: 'Automated tests (high to low)' },
              { value: 'module', label: 'Module name (A–Z)' },
            ]}
            wrapperClassName="sm:w-56"
            aria-label="Sort modules"
          />
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => exportModuleCoverageCsv(filteredSorted)}
          disabled={filteredSorted.length === 0}
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Export CSV
        </Button>
      </div>

      {filteredSorted.length === 0 ? (
        <EmptyState
          icon={<FolderKanban className="h-7 w-7" aria-hidden="true" />}
          title="No modules match"
          description="Try a different search term or clear the filter to see all modules."
        />
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-surface-100 dark:border-surface-800">
                  <th scope="col" className="pb-3 font-medium text-surface-600 dark:text-surface-400">
                    Module
                  </th>
                  <th scope="col" className="pb-3 font-medium text-surface-600 dark:text-surface-400">
                    Total Test Cases
                  </th>
                  <th scope="col" className="pb-3 font-medium text-surface-600 dark:text-surface-400">
                    Automated Test Cases
                  </th>
                  <th scope="col" className="pb-3 font-medium text-surface-600 dark:text-surface-400">
                    Automation Coverage %
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
                {pageRows.map((row) => (
                  <tr
                    key={row.module}
                    title={`${row.module}: ${row.automatedTestCases} of ${row.totalTestCases} automated (${formatPercent(row.coveragePercent)})`}
                    className="transition-colors hover:bg-surface-50 dark:hover:bg-surface-800/60"
                  >
                    <td className="py-3.5 font-medium text-surface-900 dark:text-white">{row.module}</td>
                    <td className="py-3.5 text-surface-600 dark:text-surface-300">
                      {row.totalTestCases.toLocaleString()}
                    </td>
                    <td className="py-3.5 text-surface-600 dark:text-surface-300">
                      {row.automatedTestCases.toLocaleString()}
                    </td>
                    <td className="py-3.5">
                      <span
                        className={cn(
                          'font-semibold',
                          row.coveragePercent >= 70
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : row.coveragePercent >= 50
                              ? 'text-amber-600 dark:text-amber-400'
                              : 'text-red-600 dark:text-red-400',
                        )}
                      >
                        {formatPercent(row.coveragePercent)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredSorted.length > PAGE_SIZE && (
            <div className="mt-4 flex items-center justify-between text-sm text-surface-500 dark:text-surface-400">
              <p>
                Showing {safePage * PAGE_SIZE + 1}–{Math.min((safePage + 1) * PAGE_SIZE, filteredSorted.length)} of{' '}
                {filteredSorted.length}
              </p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={safePage === 0}
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                >
                  Previous
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={safePage >= totalPages - 1}
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </Card>
  )
}
