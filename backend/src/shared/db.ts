import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand, ScanCommand } from '@aws-sdk/lib-dynamodb'
import { AWS_REGION, TABLE_NAME } from './config.js'

const client = DynamoDBDocumentClient.from(new DynamoDBClient({ region: AWS_REGION }))

export async function getItem<T>(pk: string, sk: string): Promise<T | null> {
  const result = await client.send(
    new GetCommand({ TableName: TABLE_NAME, Key: { pk, sk } }),
  )
  return (result.Item?.data as T) ?? null
}

export async function putItem(pk: string, sk: string, data: unknown): Promise<void> {
  await client.send(
    new PutCommand({ TableName: TABLE_NAME, Item: { pk, sk, data } }),
  )
}

export async function queryByPk<T>(pk: string): Promise<T[]> {
  const result = await client.send(
    new QueryCommand({
      TableName: TABLE_NAME,
      KeyConditionExpression: 'pk = :pk',
      ExpressionAttributeValues: { ':pk': pk },
    }),
  )
  return (result.Items ?? []).map((item) => item.data as T)
}

export async function scanAll<T>(): Promise<T[]> {
  const result = await client.send(new ScanCommand({ TableName: TABLE_NAME }))
  return (result.Items ?? []).map((item) => item.data as T)
}

export { client }
