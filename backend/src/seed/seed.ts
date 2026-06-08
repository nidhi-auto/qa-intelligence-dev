import { putItem } from '../shared/db.js'
import * as seed from '../data/seed-data.js'

async function main() {
  await putItem('USER', 'CURRENT', seed.currentUser)
  await putItem('PORTFOLIO', 'SUMMARY', seed.portfolioSummary)
  for (const project of seed.projects) {
    await putItem('PROJECT', project.id, project)
  }
  for (const sprint of seed.sprints) {
    await putItem('SPRINT', sprint.id, sprint)
  }
  await putItem('DEFECT', 'METRICS', seed.defectMetrics)
  await putItem('DEFECT', 'MODULE_OPEN', seed.defectModuleOpenBugs)
  await putItem('DEFECT', 'PRIORITY', seed.defectPriorityDistribution)
  for (const defect of seed.defects) {
    await putItem('DEFECT_ITEM', defect.id, defect)
  }
  await putItem('TEST', 'METRICS', seed.testExecutionMetrics)
  await putItem('TEST', 'RATE_TRENDS', seed.testRateTrends)
  for (const exec of seed.testExecutions) {
    await putItem('TEST_EXEC', exec.id, exec)
  }
  await putItem('AUTOMATION', 'METRICS', seed.automationMetrics)
  await putItem('AUTOMATION', 'MODULE_COVERAGE', seed.moduleAutomationCoverage)
  for (const flaky of seed.flakyTests) {
    await putItem('FLAKY_TEST', flaky.id, flaky)
  }
  await putItem('TREND', 'DEFECTS', seed.defectTrend)
  await putItem('TREND', 'TESTS', seed.testTrend)
  await putItem('TREND', 'AUTOMATION', seed.automationTrend)
  await putItem('TREND', 'QUALITY', seed.qualityScoreTrend)
  await putItem('INTEGRATION', 'CATALOG', seed.integrationCatalog)
  await putItem('INTEGRATION', 'STATES', seed.defaultIntegrationStates)
  await putItem('INTEGRATION', 'ACTIVITY', seed.integrationActivityLogs)
  console.log('Seed complete')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
