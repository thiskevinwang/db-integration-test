import type { VercelRequest, VercelResponse } from "@vercel/node";

import { pool } from "../db/pool";
import { runMigrations } from "../db/run-migrations";

const handler = async (req: VercelRequest, res: VercelResponse) => {
  try {
    await runMigrations("db/migrations");
    const { rows } = await pool.query("SELECT * FROM pg_extension");
    return res.status(200).json(rows);
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
};

export default handler;
