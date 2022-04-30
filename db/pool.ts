import "dotenv/config";

import { Pool } from "pg";
import type { PoolConfig } from "pg";

const config: PoolConfig = {
  database: "postgres",
  user: "postgres",
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT),
  host: process.env.POSTGRES_HOST,
};

export const pool = new Pool(config);
