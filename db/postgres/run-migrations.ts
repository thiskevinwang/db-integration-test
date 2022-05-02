import { migrate } from "postgres-migrations";

import { pool } from "./pool";

export async function runMigrations(migrationsDirectory: string) {
  let error = null;
  let poolClient = null;

  try {
    poolClient = await pool.connect();
    await migrate({ client: pool }, migrationsDirectory);
    console.log("Migrations complete");
  } catch (err) {
    console.error("Error running migrations", err);
    error = err;
  } finally {
    console.log("Releasing pool");
    if (poolClient) {
      poolClient.release(true);
    }
  }
  if (error) {
    throw error;
  }
}
