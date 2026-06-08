import { useEffect, useMemo, useState } from 'react'
import { useDashboardData } from '@/contexts/DashboardDataContext'
import { buildProjectOptions, buildSprintOptions } from '@/lib/projectSprintFilters'

export function useProjectSprintFilters() {
  const { projects, sprints } = useDashboardData()
  const [selectedProject, setSelectedProject] = useState('all')
  const [selectedSprint, setSelectedSprint] = useState('all')

  const projectOptions = useMemo(() => buildProjectOptions(projects), [projects])
  const sprintOptions = useMemo(
    () => buildSprintOptions(sprints, projects, selectedProject),
    [sprints, projects, selectedProject],
  )

  useEffect(() => {
    setSelectedSprint('all')
  }, [selectedProject])

  useEffect(() => {
    if (selectedSprint === 'all') return
    const sprintStillValid = sprintOptions.some((option) => option.value === selectedSprint)
    if (!sprintStillValid) setSelectedSprint('all')
  }, [selectedSprint, sprintOptions])

  return {
    selectedProject,
    selectedSprint,
    setSelectedProject,
    setSelectedSprint,
    projectOptions,
    sprintOptions,
  }
}
