import { VercelRequest, VercelResponse } from "@vercel/node";

import handler from "../../api/dynamo";

const json = jest.fn();
const status = jest.fn(() => {
  return {
    json,
  };
});

describe("GET /api/dynamo", () => {
  const resMock = {
    status,
    json,
  } as unknown as VercelResponse;

  it("should return 200 OK", async () => {
    const req = {} as VercelRequest;
    await handler(req, resMock);

    expect(status).toHaveBeenNthCalledWith(1, 200);
    expect(json.mock.calls[0][0].AttributeDefinitions).toMatchInlineSnapshot(`
      Array [
        Object {
          "AttributeName": "PK",
          "AttributeType": "S",
        },
        Object {
          "AttributeName": "SK",
          "AttributeType": "S",
        },
      ]
    `);
    expect(json.mock.calls[0][0].KeySchema).toMatchInlineSnapshot(`
      Array [
        Object {
          "AttributeName": "PK",
          "KeyType": "HASH",
        },
        Object {
          "AttributeName": "SK",
          "KeyType": "RANGE",
        },
      ]
    `);
    expect(json.mock.calls[0][0].TableName).toMatchInlineSnapshot(`"test"`);
  });
});
