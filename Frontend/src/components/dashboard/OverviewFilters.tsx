import { DateRangeFilter } from '@/components/dashboard/DateRangeFilter'
import { Select } from '@/components/ui/Input'
import type { SelectOption } from '@/lib/projectSprintFilters'
import type { DateRangePreset } from '@/types'

const headerFilterWrapperClass = 'w-56 shrink-0'
const headerFilterSelectClass = 'h-10 w-full truncate'

interface OverviewFiltersProps {
  selectedProject: string
  projectOptions: SelectOption[]
  onProjectChange: (value: string) => void
  selectedDatePreset: DateRangePreset
  dateRangeLabel: string
  customStart: string
  customEnd: string
  customError: string | null
  onDatePresetChange: (preset: DateRangePreset) => void
  onCustomStartChange: (value: string) => void
  onCustomEndChange: (value: string) => void
  onApplyCustom: () => boolean
  onResetCustom: () => void
}

export function OverviewFilters({
  selectedProject,
  projectOptions,
  onProjectChange,
  selectedDatePreset,
  dateRangeLabel,
  customStart,
  customEnd,
  customError,
  onDatePresetChange,
  onCustomStartChange,
  onCustomEndChange,
  onApplyCustom,
  onResetCustom,
}: OverviewFiltersProps) {
  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-stretch sm:justify-end lg:w-auto">
      <Select
        value={selectedProject}
        onChange={(e) => onProjectChange(e.target.value)}
        options={projectOptions}
        wrapperClassName={headerFilterWrapperClass}
        className={headerFilterSelectClass}
        aria-label="Select project"
      />
      <DateRangeFilter
        selectedPreset={selectedDatePreset}
        displayLabel={dateRangeLabel}
        customStart={customStart}
        customEnd={customEnd}
        customError={customError}
        onPresetChange={onDatePresetChange}
        onCustomStartChange={onCustomStartChange}
        onCustomEndChange={onCustomEndChange}
        onApplyCustom={onApplyCustom}
        onResetCustom={onResetCustom}
      />
    </div>
  )
}
