import { VercelRequest, VercelResponse } from "@vercel/node";

import handler from "../../api/postgres";

const json = jest.fn();
const status = jest.fn(() => {
  return {
    json,
  };
});

describe("GET /api/health", () => {
  const resMock = {
    status,
    json,
  } as unknown as VercelResponse;

  it("should return 200 OK", async () => {
    const req = {} as VercelRequest;
    await handler(req, resMock);

    expect(status).toHaveBeenNthCalledWith(1, 200);
    expect(json).toHaveBeenNthCalledWith(1, [
      {
        extcondition: null,
        extconfig: null,
        extname: "plpgsql",
        extnamespace: 11,
        extowner: 10,
        extrelocatable: false,
        extversion: "1.0",
        oid: 13743,
      },
      {
        extcondition: null,
        extconfig: null,
        extname: "pgcrypto",
        extnamespace: 2200,
        extowner: 10,
        extrelocatable: true,
        extversion: "1.3",
        oid: 16392,
      },
    ]);
  });
});
