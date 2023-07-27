import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, DynamoDBDocument } from '@aws-sdk/lib-dynamodb';

const client: DynamoDB = new DynamoDB({
    region: process.env.AWS_REGION
})

export const DynamoDb = DynamoDBDocument.from(client);