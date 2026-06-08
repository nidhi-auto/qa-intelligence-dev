import type { Project, Sprint } from '@/types'

export interface SelectOption {
  value: string
  label: string
}

export function buildProjectOptions(projectList: Project[]): SelectOption[] {
  return [
    { value: 'all', label: 'All projects' },
    ...projectList
      .map((project) => ({ value: project.id, label: project.name }))
      .sort((a, b) => a.label.localeCompare(b.label)),
  ]
}

export function buildSprintOptions(
  sprintList: Sprint[],
  projectList: Project[],
  selectedProject: string,
): SelectOption[] {
  const relevant =
    selectedProject === 'all'
      ? sprintList
      : sprintList.filter((sprint) => sprint.projectId === selectedProject)

  const sprintChoices = relevant.map((sprint) => {
    const projectName = projectList.find((project) => project.id === sprint.projectId)?.name
    const label =
      selectedProject === 'all' && projectName ? `${projectName} · ${sprint.name}` : sprint.name
    const statusSuffix =
      sprint.status === 'active' ? ' (Current)' : sprint.status === 'planned' ? ' (Planned)' : ''
    return { value: sprint.id, label: `${label}${statusSuffix}` }
  })

  return [{ value: 'all', label: 'All sprints' }, ...sprintChoices]
}

export function getProjectNameById(projectList: Project[], projectId: string): string | undefined {
  return projectList.find((project) => project.id === projectId)?.name
}

export function matchesProjectAndSprint<T extends { project: string; sprintId: string }>(
  item: T,
  selectedProject: string,
  selectedSprint: string,
  projectList: Project[],
): boolean {
  if (selectedProject !== 'all') {
    const projectName = getProjectNameById(projectList, selectedProject)
    if (!projectName || item.project !== projectName) return false
  }

  if (selectedSprint !== 'all' && item.sprintId !== selectedSprint) return false

  return true
}
