import { Calendar, ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { DATE_RANGE_PRESET_LABELS } from '@/lib/dateRangeFilter'
import { cn } from '@/lib/utils'
import type { DateRangePreset } from '@/types'

const PRESET_OPTIONS: DateRangePreset[] = [
  'current_month',
  'last_month',
  'last_3_months',
  'last_6_months',
  'last_12_months',
  'custom',
]

interface DateRangeFilterProps {
  selectedPreset: DateRangePreset
  displayLabel: string
  customStart: string
  customEnd: string
  customError: string | null
  onPresetChange: (preset: DateRangePreset) => void
  onCustomStartChange: (value: string) => void
  onCustomEndChange: (value: string) => void
  onApplyCustom: () => boolean
  onResetCustom: () => void
}

export function DateRangeFilter({
  selectedPreset,
  displayLabel,
  customStart,
  customEnd,
  customError,
  onPresetChange,
  onCustomStartChange,
  onCustomEndChange,
  onApplyCustom,
  onResetCustom,
}: DateRangeFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handlePresetSelect = (preset: DateRangePreset) => {
    onPresetChange(preset)
    if (preset !== 'custom') setIsOpen(false)
  }

  const handleApply = () => {
    const applied = onApplyCustom()
    if (applied) setIsOpen(false)
  }

  return (
    <div ref={containerRef} className="relative w-56 shrink-0">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className={cn(
          'flex h-10 w-full items-center justify-between gap-2 rounded-lg border border-surface-200 bg-white px-3.5 text-sm text-surface-900',
          'transition-colors hover:border-brand-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20',
          'dark:border-surface-700 dark:bg-surface-900 dark:text-white',
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Date range filter"
      >
        <span className="flex min-w-0 items-center gap-2">
          <Calendar className="h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400" aria-hidden="true" />
          <span className="truncate">{displayLabel}</span>
        </span>
        <ChevronDown
          className={cn('h-4 w-4 shrink-0 text-surface-400 transition-transform', isOpen && 'rotate-180')}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 z-50 mt-2 w-72 rounded-xl border border-surface-200 bg-white p-2 shadow-lg dark:border-surface-700 dark:bg-surface-900"
          role="listbox"
        >
          <ul className="space-y-0.5">
            {PRESET_OPTIONS.map((preset) => (
              <li key={preset}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selectedPreset === preset}
                  onClick={() => handlePresetSelect(preset)}
                  className={cn(
                    'w-full rounded-lg px-3 py-2 text-left text-sm transition-colors',
                    selectedPreset === preset
                      ? 'bg-brand-50 font-medium text-brand-700 dark:bg-brand-500/10 dark:text-brand-300'
                      : 'text-surface-700 hover:bg-surface-50 dark:text-surface-200 dark:hover:bg-surface-800',
                  )}
                >
                  {DATE_RANGE_PRESET_LABELS[preset]}
                </button>
              </li>
            ))}
          </ul>

          {selectedPreset === 'custom' && (
            <div className="mt-3 space-y-3 border-t border-surface-100 px-1 pt-3 dark:border-surface-800">
              <Input
                label="Start Date"
                type="date"
                value={customStart}
                onChange={(e) => onCustomStartChange(e.target.value)}
              />
              <Input
                label="End Date"
                type="date"
                value={customEnd}
                onChange={(e) => onCustomEndChange(e.target.value)}
              />
              {customError && (
                <p className="text-xs text-red-600 dark:text-red-400" role="alert">
                  {customError}
                </p>
              )}
              <div className="flex gap-2">
                <Button type="button" size="sm" className="flex-1" onClick={handleApply}>
                  Apply
                </Button>
                <Button type="button" size="sm" variant="outline" className="flex-1" onClick={onResetCustom}>
                  Reset
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
