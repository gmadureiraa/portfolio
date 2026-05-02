/**
 * Neon Postgres client (singleton).
 *
 * Suporta as env vars padrão que a integração Neon do Vercel provisiona:
 *   - DATABASE_URL          (default Neon)
 *   - POSTGRES_URL          (alias Vercel Postgres / Neon Marketplace)
 *   - POSTGRES_URL_NON_POOLING (write-friendly, sem pgbouncer)
 *
 * Uso:
 *   import { sql } from "@/lib/db";
 *   const rows = await sql`SELECT * FROM newsletters LIMIT 10`;
 *
 * Em ambientes sem DB configurado, exporta `sql = null` e os callers tratam
 * o fallback (ex: subscribe segue só logando).
 */

import postgres from "postgres";

const DATABASE_URL =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_URL_NON_POOLING ||
  "";

export const isDbConfigured = Boolean(DATABASE_URL);

// `prepare: false` é recomendado pra Neon serverless (pooler não suporta).
// `idle_timeout: 20` libera conexões em ambientes Lambda.
export const sql = isDbConfigured
  ? postgres(DATABASE_URL, {
      ssl: "require",
      prepare: false,
      idle_timeout: 20,
      max: 5,
    })
  : null;

if (!isDbConfigured && process.env.NODE_ENV !== "production") {
  console.warn(
    "[db] DATABASE_URL/POSTGRES_URL não configurada — queries vão retornar null/fallback.",
  );
}
