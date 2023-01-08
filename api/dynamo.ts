import type { VercelRequest, VercelResponse } from "@vercel/node";

import { DbClient } from "../db/dynamo/dynamo-client";

const handler = async (req: VercelRequest, res: VercelResponse) => {
  try {
    const dbClient = new DbClient();
    const output = await dbClient.createTable(
      "test",
      [
        { AttributeName: "PK", KeyType: "HASH" },
        { AttributeName: "SK", KeyType: "RANGE" },
      ],
      [
        { AttributeName: "PK", AttributeType: "S" },
        { AttributeName: "SK", AttributeType: "S" },
      ]
    );

    console.log("$metadata", output.$metadata);

    return res.status(200).json(output.TableDescription);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json(err);
  }
};

export default handler;
