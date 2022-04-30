import {
  DynamoDBClient,
  CreateTableCommand,
  KeySchemaElement,
  AttributeDefinition,
} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const dynamodbClient = new DynamoDBClient({
  region: "localhost",
  // Does this have to map to a "service" name?
  endpoint: "http://dynamo:8000",
  credentials: {
    accessKeyId: "accessKeyId",
    secretAccessKey: "secretAccessKey",
  },
});

const docClient = DynamoDBDocumentClient.from(dynamodbClient);

export class DbClient {
  private dynamodbClient = dynamodbClient;
  private docClient = docClient;

  constructor() {}

  async createTable(
    tableName: string,
    keySchema: KeySchemaElement[],
    attributeDefinitions: AttributeDefinition[]
  ) {
    const cmd = new CreateTableCommand({
      TableName: tableName,
      KeySchema: keySchema,
      AttributeDefinitions: attributeDefinitions,
      BillingMode: "PAY_PER_REQUEST",
    });
    const result = await this.dynamodbClient.send(cmd);
    return result;
  }
}
