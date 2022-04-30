import { VercelRequest, VercelResponse } from "@vercel/node";

import handler from "../../api/health";

const send = jest.fn();
const status = jest.fn(() => {
  return {
    send,
  };
});

describe("GET /api/health", () => {
  const resMock = {
    status,
    send,
  } as unknown as VercelResponse;

  it("should return 200 OK", async () => {
    const req = {} as VercelRequest;
    await handler(req, resMock);

    expect(status).toHaveBeenNthCalledWith(1, 200);
    expect(send).toHaveBeenNthCalledWith(1, "OK");
  });
});
