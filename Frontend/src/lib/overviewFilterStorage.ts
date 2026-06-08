import { resolveDateRange } from '@/lib/dateRangeFilter'
import type { DateRangePreset } from '@/types'

const STORAGE_KEY = 'qa-intelligence-overview-filters-v1'

export interface StoredOverviewFilters {
  selectedProject: string
  datePreset: DateRangePreset
  customStart: string
  customEnd: string
}

const DEFAULT_FILTERS: StoredOverviewFilters = {
  selectedProject: 'all',
  datePreset: 'last_3_months',
  customStart: '',
  customEnd: '',
}

export function loadOverviewFilters(): StoredOverviewFilters {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULT_FILTERS }
    const parsed = JSON.parse(raw) as Partial<StoredOverviewFilters>
    return { ...DEFAULT_FILTERS, ...parsed }
  } catch {
    return { ...DEFAULT_FILTERS }
  }
}

export function saveOverviewFilters(filters: StoredOverviewFilters): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filters))
}

export function resetOverviewFilters(): StoredOverviewFilters {
  localStorage.removeItem(STORAGE_KEY)
  return { ...DEFAULT_FILTERS }
}

export function storedFiltersToDateRange(filters: StoredOverviewFilters) {
  return resolveDateRange(
    filters.datePreset,
    filters.customStart || undefined,
    filters.customEnd || undefined,
  )
}
