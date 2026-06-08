import { Select } from '@/components/ui/Input'
import type { SelectOption } from '@/lib/projectSprintFilters'

const headerFilterWrapperClass = 'w-56 shrink-0'
const headerFilterSelectClass = 'h-10 w-full truncate'

interface ProjectSprintFiltersProps {
  selectedProject: string
  selectedSprint: string
  projectOptions: SelectOption[]
  sprintOptions: SelectOption[]
  onProjectChange: (value: string) => void
  onSprintChange: (value: string) => void
}

export function ProjectSprintFilters({
  selectedProject,
  selectedSprint,
  projectOptions,
  sprintOptions,
  onProjectChange,
  onSprintChange,
}: ProjectSprintFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
      <Select
        value={selectedProject}
        onChange={(e) => onProjectChange(e.target.value)}
        options={projectOptions}
        wrapperClassName={headerFilterWrapperClass}
        className={headerFilterSelectClass}
        aria-label="Select project"
      />
      <Select
        value={selectedSprint}
        onChange={(e) => onSprintChange(e.target.value)}
        options={sprintOptions}
        wrapperClassName={headerFilterWrapperClass}
        className={headerFilterSelectClass}
        aria-label="Filter by sprint"
      />
    </div>
  )
}
