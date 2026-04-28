import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

let pool = null;
let db = null;

if (process.env.DATABASE_URL) {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle(pool, { schema });
} else {
  console.warn("[DB DISABLED] No DATABASE_URL provided. Running in stateless mode.");
}

export { pool, db };
export * from "./schema";
