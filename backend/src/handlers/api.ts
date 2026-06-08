import type { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda'
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import { z } from 'zod'
import { getItem, putItem, queryByPk } from '../shared/db.js'
import { COGNITO_CLIENT_ID, COGNITO_USER_POOL_ID, AWS_REGION } from '../shared/config.js'
import { errorResponse, jsonResponse, optionsResponse } from '../shared/response.js'
import * as seed from '../data/seed-data.js'

const cognito = new CognitoIdentityProviderClient({ region: AWS_REGION })

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

const PUBLIC_ROUTES = new Set([
  'POST /auth/sign-in',
  'GET /portfolio/summary',
])

export async function handler(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
  const method = event.requestContext.http.method
  const path = event.rawPath.replace(/\/$/, '') || '/'

  if (method === 'OPTIONS') return optionsResponse()

  const routeKey = `${method} ${path}`

  try {
    if (routeKey === 'POST /auth/sign-in') {
      return await handleSignIn(event.body)
    }

    if (!PUBLIC_ROUTES.has(routeKey) && !event.requestContext.authorizer?.jwt) {
      return errorResponse(401, 'Unauthorized')
    }

    switch (routeKey) {
      case 'GET /user/current':
        return jsonResponse(200, (await getItem('USER', 'CURRENT')) ?? seed.currentUser)
      case 'GET /portfolio/summary':
        return jsonResponse(200, (await getItem('PORTFOLIO', 'SUMMARY')) ?? seed.portfolioSummary)
      case 'GET /projects':
        return jsonResponse(200, await queryByPk('PROJECT'))
      case 'GET /sprints':
        return jsonResponse(200, await queryByPk('SPRINT'))
      case 'GET /defects/metrics':
        return jsonResponse(200, (await getItem('DEFECT', 'METRICS')) ?? seed.defectMetrics)
      case 'GET /defects/module-open-bugs':
        return jsonResponse(200, (await getItem('DEFECT', 'MODULE_OPEN')) ?? seed.defectModuleOpenBugs)
      case 'GET /defects/priority-distribution':
        return jsonResponse(200, (await getItem('DEFECT', 'PRIORITY')) ?? seed.defectPriorityDistribution)
      case 'GET /defects':
        return jsonResponse(200, await queryByPk('DEFECT_ITEM'))
      case 'GET /tests/metrics':
        return jsonResponse(200, (await getItem('TEST', 'METRICS')) ?? seed.testExecutionMetrics)
      case 'GET /tests/rate-trends':
        return jsonResponse(200, (await getItem('TEST', 'RATE_TRENDS')) ?? seed.testRateTrends)
      case 'GET /tests/executions':
        return jsonResponse(200, await queryByPk('TEST_EXEC'))
      case 'GET /automation/metrics':
        return jsonResponse(200, (await getItem('AUTOMATION', 'METRICS')) ?? seed.automationMetrics)
      case 'GET /automation/module-coverage':
        return jsonResponse(200, (await getItem('AUTOMATION', 'MODULE_COVERAGE')) ?? seed.moduleAutomationCoverage)
      case 'GET /automation/flaky-tests':
        return jsonResponse(200, await queryByPk('FLAKY_TEST'))
      case 'GET /trends/defects':
        return jsonResponse(200, (await getItem('TREND', 'DEFECTS')) ?? seed.defectTrend)
      case 'GET /trends/tests':
        return jsonResponse(200, (await getItem('TREND', 'TESTS')) ?? seed.testTrend)
      case 'GET /trends/automation':
        return jsonResponse(200, (await getItem('TREND', 'AUTOMATION')) ?? seed.automationTrend)
      case 'GET /trends/quality-score':
        return jsonResponse(200, (await getItem('TREND', 'QUALITY')) ?? seed.qualityScoreTrend)
      case 'GET /integrations/catalog':
        return jsonResponse(200, (await getItem('INTEGRATION', 'CATALOG')) ?? seed.integrationCatalog)
      case 'GET /integrations/states':
        return jsonResponse(200, (await getItem('INTEGRATION', 'STATES')) ?? seed.defaultIntegrationStates)
      case 'GET /integrations/activity':
        return jsonResponse(200, (await getItem('INTEGRATION', 'ACTIVITY')) ?? seed.integrationActivityLogs)
      default: {
        const integrationMatch = path.match(/^\/integrations\/([^/]+)(\/sync)?$/)
        if (integrationMatch) {
          const id = integrationMatch[1]
          if (method === 'PUT' && !integrationMatch[2]) {
            const body = JSON.parse(event.body ?? '{}')
            const states = (await getItem<Record<string, unknown>>('INTEGRATION', 'STATES')) ?? seed.defaultIntegrationStates
            const next = { ...states, [id]: body }
            await putItem('INTEGRATION', 'STATES', next)
            return jsonResponse(200, body)
          }
          if (method === 'POST' && integrationMatch[2]) {
            const states = (await getItem<Record<string, unknown>>('INTEGRATION', 'STATES')) ?? seed.defaultIntegrationStates
            const current = states[id] as Record<string, unknown>
            const updated = {
              ...current,
              lastSyncAt: new Date().toISOString(),
              lastSyncStatus: 'success',
            }
            const next = { ...states, [id]: updated }
            await putItem('INTEGRATION', 'STATES', next)
            return jsonResponse(200, updated)
          }
        }
        return errorResponse(404, 'Not Found')
      }
    }
  } catch (err) {
    console.error(err)
    const message = err instanceof Error ? err.message : 'Internal Server Error'
    return errorResponse(500, message)
  }
}

async function handleSignIn(body: string | undefined): Promise<APIGatewayProxyResultV2> {
  const parsed = signInSchema.safeParse(JSON.parse(body ?? '{}'))
  if (!parsed.success) return errorResponse(400, 'Invalid credentials')

  if (!COGNITO_CLIENT_ID || !COGNITO_USER_POOL_ID) {
    return jsonResponse(200, { token: 'dev-mock-token', user: seed.currentUser })
  }

  try {
    const result = await cognito.send(
      new InitiateAuthCommand({
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: COGNITO_CLIENT_ID,
        AuthParameters: {
          USERNAME: parsed.data.email,
          PASSWORD: parsed.data.password,
        },
      }),
    )

    const token = result.AuthenticationResult?.IdToken
    if (!token) return errorResponse(401, 'Invalid credentials')

    return jsonResponse(200, { token, user: seed.currentUser })
  } catch {
    return errorResponse(401, 'Invalid credentials')
  }
}
