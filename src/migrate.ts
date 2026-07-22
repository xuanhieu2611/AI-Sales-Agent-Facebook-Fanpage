import "dotenv/config";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Pool } from "pg";
import { poolConfigFromUrl } from "./pg.js";

/**
 * Runs the SQL migrations against DATABASE_URL.
 * Usage: npm run db:migrate
 */
const url = process.env.DATABASE_URL;
if (!url) {
  console.error("❌ DATABASE_URL is not set. Add it to .env first.");
  process.exit(1);
}

const here = dirname(fileURLToPath(import.meta.url));
const sql = readFileSync(join(here, "..", "migrations", "001_init.sql"), "utf8");

const pool = new Pool(poolConfigFromUrl(url));

try {
  await pool.query(sql);
  console.log("✅ Migration applied — tables are ready.");
} catch (err) {
  console.error("❌ Migration failed:", err);
  process.exitCode = 1;
} finally {
  await pool.end();
}
