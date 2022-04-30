import type { VercelRequest, VercelResponse } from "@vercel/node";

import { runMigrations } from "../db/run-migrations";

const handler = async (req: VercelRequest, res: VercelResponse) => {
  // log(req, res, () => {});

  try {
    await runMigrations("db/migrations");
    return res.status(200).send("OK");
  } catch (err: any) {
    throw err;
    return res.status(400).send(err.message);
  }
};

export default handler;
