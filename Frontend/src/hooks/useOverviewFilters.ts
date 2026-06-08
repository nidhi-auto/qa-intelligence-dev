import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDashboardData } from '@/contexts/DashboardDataContext'
import {
  DATE_RANGE_PRESET_LABELS,
  resolveDateRange,
  validateCustomRange,
} from '@/lib/dateRangeFilter'
import { buildProjectOptions } from '@/lib/projectSprintFilters'
import {
  loadOverviewFilters,
  saveOverviewFilters,
  type StoredOverviewFilters,
} from '@/lib/overviewFilterStorage'
import type { DateRange, DateRangePreset } from '@/types'

export function useOverviewFilters() {
  const { projects } = useDashboardData()
  const [stored, setStored] = useState<StoredOverviewFilters>(() => loadOverviewFilters())
  const [customDraft, setCustomDraft] = useState({
    start: stored.customStart,
    end: stored.customEnd,
  })
  const [customError, setCustomError] = useState<string | null>(null)

  const projectOptions = useMemo(() => buildProjectOptions(projects), [projects])

  const dateRange: DateRange = useMemo(
    () => resolveDateRange(stored.datePreset, stored.customStart, stored.customEnd),
    [stored],
  )

  const persist = useCallback((next: StoredOverviewFilters) => {
    setStored(next)
    saveOverviewFilters(next)
  }, [])

  const setSelectedProject = useCallback(
    (value: string) => {
      persist({ ...stored, selectedProject: value })
    },
    [persist, stored],
  )

  const setDatePreset = useCallback(
    (preset: DateRangePreset) => {
      if (preset === 'custom') {
        const draftStart = customDraft.start || dateRange.start
        const draftEnd = customDraft.end || dateRange.end
        setCustomDraft({ start: draftStart, end: draftEnd })
        persist({
          ...stored,
          datePreset: 'custom',
          customStart: draftStart,
          customEnd: draftEnd,
        })
        return
      }

      setCustomError(null)
      persist({
        ...stored,
        datePreset: preset,
      })
    },
    [customDraft.end, customDraft.start, dateRange.end, dateRange.start, persist, stored],
  )

  const applyCustomRange = useCallback(() => {
    const error = validateCustomRange(customDraft.start, customDraft.end)
    if (error) {
      setCustomError(error)
      return false
    }

    setCustomError(null)
    persist({
      ...stored,
      datePreset: 'custom',
      customStart: customDraft.start,
      customEnd: customDraft.end,
    })
    return true
  }, [customDraft.end, customDraft.start, persist, stored])

  const resetCustomRange = useCallback(() => {
    const defaultRange = resolveDateRange('last_3_months')
    setCustomDraft({ start: defaultRange.start, end: defaultRange.end })
    setCustomError(null)
    persist({
      ...stored,
      datePreset: 'last_3_months',
      customStart: '',
      customEnd: '',
    })
  }, [persist, stored])

  useEffect(() => {
    if (stored.datePreset === 'custom') {
      setCustomDraft({
        start: stored.customStart,
        end: stored.customEnd,
      })
    }
  }, [stored.customEnd, stored.customStart, stored.datePreset])

  const dateRangeLabel = useMemo(() => {
    if (stored.datePreset === 'custom') {
      return formatCustomLabel(dateRange.start, dateRange.end)
    }
    return DATE_RANGE_PRESET_LABELS[stored.datePreset]
  }, [dateRange.end, dateRange.start, stored.datePreset])

  return {
    selectedProject: stored.selectedProject,
    datePreset: stored.datePreset,
    dateRange,
    dateRangeLabel,
    projectOptions,
    customDraft,
    customError,
    setSelectedProject,
    setDatePreset,
    setCustomDraft,
    applyCustomRange,
    resetCustomRange,
  }
}

function formatCustomLabel(start: string, end: string): string {
  const fmt = (iso: string) =>
    new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  return `${fmt(start)} – ${fmt(end)}`
}
