export const signInData = {
  valid: {
    email: 'sarah.chen@company.com',
    password: 'Password1!',
  },
  invalid: {
    email: 'not-an-email',
    password: '',
  },
  edge: {
    longEmail: `${'a'.repeat(200)}@company.com`,
    whitespacePassword: '     ',
  },
  api: {
    user: {
      name: 'Sarah Chen',
      email: 'sarah.chen@company.com',
      role: 'QA Lead',
      avatar: 'SC',
    },
    token: 'mock-jwt-token',
  },
}

export const portfolioData = {
  valid: {
    totalProjects: 34,
    activeProjects: 26,
    atRiskProjects: 5,
    completedProjects: 3,
    avgQualityScore: 82,
    portfolioPassRate: 91.4,
    automationCoverage: 68,
  },
}

export const projectsData = {
  valid: [
    { id: '1', name: 'Operator AI', qaOwner: 'Sarah Chen', status: 'active', releaseDate: '2026-06-15', riskLevel: 'low', qualityScore: 91, openBugs: 12, testPassRate: 94, automationCoverage: 78 },
  ],
}

export const integrationsData = {
  valid: {
    catalog: [{ id: 'jira', name: 'Jira', description: 'Sync issues' }],
    states: {
      jira: { status: 'connected', connectedBy: 'Sarah Chen', metrics: [] },
    },
  },
}
