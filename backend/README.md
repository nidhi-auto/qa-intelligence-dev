# QAlytics Backend — R1 Cloud Mode

Serverless API for the QAlytics frontend (release 1.0.0).

## Stack

- AWS Lambda (Node.js 20)
- API Gateway HTTP API + Cognito JWT authorizer
- DynamoDB (single-table: `pk` / `sk` / `data`)
- Amazon Cognito (email sign-in)

## Environment variables

| Variable | Set by | Purpose |
|----------|--------|---------|
| `TABLE_NAME` | CloudFormation / local | DynamoDB table |
| `COGNITO_CLIENT_ID` | CloudFormation | Auth |
| `COGNITO_USER_POOL_ID` | CloudFormation | Auth |
| `AWS_ACCESS_KEY_ID` | Deploy-time only | AWS CLI auth |
| `AWS_SECRET_ACCESS_KEY` | Deploy-time only | AWS CLI auth |
| `AWS_DEFAULT_REGION` | Deploy-time only | Region |

See `.env.example` for placeholders. Never commit real values.

## Scripts

```bash
npm install
npm run build      # esbuild → dist/
npm run package    # build + zip
npm run seed       # seed DynamoDB (requires TABLE_NAME)
```

## Deploy

See `../RELEASE_R1_1-0-0.md` Phase 4 for full instructions.

## DynamoDB access patterns

| pk | sk | Serves |
|----|-----|--------|
| USER | CURRENT | Current user profile |
| PORTFOLIO | SUMMARY | Landing + overview KPIs |
| PROJECT | {id} | Project list |
| SPRINT | {id} | Sprint filters |
| DEFECT | METRICS / MODULE_OPEN / PRIORITY | Defect aggregates |
| DEFECT_ITEM | {id} | Defect table rows |
| TEST | METRICS / RATE_TRENDS | Test metrics |
| TEST_EXEC | {id} | Test run rows |
| AUTOMATION | METRICS / MODULE_COVERAGE | Automation page |
| FLAKY_TEST | {id} | Flaky test list |
| TREND | DEFECTS / TESTS / AUTOMATION / QUALITY | Charts |
| INTEGRATION | CATALOG / STATES / ACTIVITY | Settings integrations |
