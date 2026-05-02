/**
 * Migra schema da newsletter no Neon Postgres.
 *
 * Uso:
 *   bun run scripts/migrate-newsletter.ts
 *
 * Lê DATABASE_URL ou POSTGRES_URL do env (suporta `.env.local`).
 *
 * É idempotente: pode rodar várias vezes sem efeitos colaterais.
 */

import fs from "node:fs";
import path from "node:path";
import postgres from "postgres";

// Carrega .env.local manualmente (sem next runtime)
function loadEnv() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;
  const raw = fs.readFileSync(envPath, "utf-8");
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

async function main() {
  loadEnv();

  const url =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_URL_NON_POOLING;

  if (!url) {
    console.error(
      "[migrate] erro: nenhuma DATABASE_URL/POSTGRES_URL configurada.",
    );
    console.error(
      "         Provisione um Neon DB em https://vercel.com → Storage e roda `vercel env pull .env.local`.",
    );
    process.exit(1);
  }

  const schemaPath = path.join(process.cwd(), "lib", "db", "schema.sql");
  if (!fs.existsSync(schemaPath)) {
    console.error("[migrate] schema.sql não encontrado em", schemaPath);
    process.exit(1);
  }

  const schema = fs.readFileSync(schemaPath, "utf-8");

  console.log("[migrate] conectando no Postgres...");
  const sql = postgres(url, {
    ssl: "require",
    prepare: false,
    max: 1,
  });

  try {
    console.log("[migrate] aplicando schema.sql...");
    await sql.unsafe(schema);
    console.log("[migrate] OK — tabelas/índices/triggers aplicados.");

    const tables = await sql<{ table_name: string }[]>`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_name IN ('newsletters', 'newsletter_subscribers')
      ORDER BY table_name
    `;
    console.log(
      "[migrate] tabelas presentes:",
      tables.map((t) => t.table_name).join(", "),
    );
  } catch (err) {
    console.error("[migrate] erro:", err);
    process.exit(1);
  } finally {
    await sql.end({ timeout: 5 });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
