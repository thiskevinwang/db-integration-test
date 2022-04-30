import "dotenv/config";

import { Pool } from "pg";
import type { PoolConfig } from "pg";

const config: PoolConfig = {
  database: "postgres",
  user: "postgres",
  password: process.env.DB_PASS,
  port: 5432,
  host: process.env.DB_HOST,
  idleTimeoutMillis: 120_000,
  // lambda timeout is 30
  connectionTimeoutMillis: 16_000,
  ssl:
    process.env.NODE === "production"
      ? { rejectUnauthorized: false }
      : undefined,
};

export const pool = new Pool(config);
