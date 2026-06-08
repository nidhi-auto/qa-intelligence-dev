import type { DateRange, DateRangePreset } from '@/types'

/** Reference "today" aligned with mock portfolio data (June 2026). */
export const PORTFOLIO_REFERENCE_DATE = new Date('2026-06-04T12:00:00')

export const DATE_RANGE_PRESET_LABELS: Record<DateRangePreset, string> = {
  current_month: 'Current Month',
  last_month: 'Last Month',
  last_3_months: 'Last 3 Months',
  last_6_months: 'Last 6 Months',
  last_12_months: 'Last 12 Months',
  custom: 'Custom Date Range',
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

function toIsoDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function addMonths(date: Date, months: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + months, date.getDate())
}

export function resolveDateRange(
  preset: DateRangePreset,
  customStart?: string,
  customEnd?: string,
  referenceDate: Date = PORTFOLIO_REFERENCE_DATE,
): DateRange {
  const today = referenceDate
  const currentStart = startOfMonth(today)
  const currentEnd = endOfMonth(today)

  switch (preset) {
    case 'current_month':
      return { preset, start: toIsoDate(currentStart), end: toIsoDate(currentEnd) }
    case 'last_month': {
      const lastMonth = addMonths(today, -1)
      return {
        preset,
        start: toIsoDate(startOfMonth(lastMonth)),
        end: toIsoDate(endOfMonth(lastMonth)),
      }
    }
    case 'last_3_months':
      return {
        preset,
        start: toIsoDate(startOfMonth(addMonths(today, -2))),
        end: toIsoDate(currentEnd),
      }
    case 'last_6_months':
      return {
        preset,
        start: toIsoDate(startOfMonth(addMonths(today, -5))),
        end: toIsoDate(currentEnd),
      }
    case 'last_12_months':
      return {
        preset,
        start: toIsoDate(startOfMonth(addMonths(today, -11))),
        end: toIsoDate(currentEnd),
      }
    case 'custom':
      return {
        preset,
        start: customStart ?? toIsoDate(currentStart),
        end: customEnd ?? toIsoDate(currentEnd),
      }
    default:
      return resolveDateRange('last_3_months', undefined, undefined, referenceDate)
  }
}

export function formatDateRangeLabel(range: DateRange): string {
  if (range.preset !== 'custom') {
    return DATE_RANGE_PRESET_LABELS[range.preset]
  }

  const start = formatShortDate(range.start)
  const end = formatShortDate(range.end)
  return `${start} – ${end}`
}

export function formatShortDate(isoDate: string): string {
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function isDateInRange(isoDate: string, range: DateRange): boolean {
  return isoDate >= range.start && isoDate <= range.end
}

export function filterTrendByDateRange<T extends { periodStart?: string }>(
  points: T[],
  range: DateRange,
): T[] {
  return points.filter((point) => point.periodStart && isDateInRange(point.periodStart, range))
}

export function validateCustomRange(start: string, end: string): string | null {
  if (!start || !end) return 'Start and end dates are required.'
  if (start > end) return 'Start date must be on or before end date.'
  return null
}
