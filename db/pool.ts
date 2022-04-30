import "dotenv/config";

import { Pool } from "pg";
import type { PoolConfig } from "pg";

const config: PoolConfig = {
  database: "postgres",
  user: "postgres",
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
  host: process.env.POSTGRES_HOST,
  idleTimeoutMillis: 120_000,
  // lambda timeout is 30
  connectionTimeoutMillis: 16_000,
  ssl:
    process.env.NODE === "production"
      ? { rejectUnauthorized: false }
      : undefined,
};

export const pool = new Pool(config);
