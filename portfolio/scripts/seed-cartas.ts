/**
 * Seed das 13 cartas "Synecdoche" (A Carta do Madureira) com agendamento real.
 *
 * Idempotente: INSERT ... ON CONFLICT (slug) DO NOTHING — não toca linhas existentes.
 * Fonte: vault/01 - KALEIDOS/011 - CLIENTES/MADUREIRA/02-CONTEUDO/cartas/<NN-slug>.md
 *
 * Cada carta:
 *   - title             = `titulo` do frontmatter
 *   - slug              = nome do arquivo sem `NN-` e sem `.md`
 *   - excerpt           = `description` do frontmatter
 *   - content_md        = corpo (sem frontmatter)
 *   - hero/og image     = /newsletter/cartas/<slug>.png
 *   - reading_time_min  = round(palavras / 220), min 1
 *   - published_at      = quinta correspondente às 12:00 UTC (agendamento)
 *
 * Uso: bun run scripts/seed-cartas.ts
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import postgres from "postgres";

const CARTAS_DIR =
  "/Users/gabrielmadureira/GOS/vault/01 - KALEIDOS/011 - CLIENTES/MADUREIRA/02-CONTEUDO/cartas";

const WORDS_PER_MIN = 220;
function calcReadingTimeMin(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MIN));
}

// file = nome do .md na pasta; date = quinta às 12:00 UTC
const PLAN: { file: string; date: string }[] = [
  { file: "01-construindo-a-vida-de-outro.md", date: "2026-06-11" },
  { file: "03-construir-com-o-medo-do-lado.md", date: "2026-06-18" },
  { file: "21-parei-de-buscar-motivacao.md", date: "2026-06-25" },
  { file: "02-disciplina-e-design.md", date: "2026-07-02" },
  { file: "05-a-solidao-de-construir.md", date: "2026-07-09" },
  { file: "14-perfeccionismo-e-medo.md", date: "2026-07-16" },
  { file: "24-o-preco-de-dizer-sim.md", date: "2026-07-23" },
  { file: "16-comparacao-ladra-do-foco.md", date: "2026-07-30" },
  { file: "09-o-vazio-depois-da-conquista.md", date: "2026-08-06" },
  { file: "10-dinheiro-compra-liberdade-nao-sentido.md", date: "2026-08-13" },
  { file: "23-ninguem-vem-te-salvar.md", date: "2026-08-20" },
  { file: "07-tempo-a-moeda-que-nao-volta.md", date: "2026-08-27" },
  { file: "13-a-vida-que-voce-adia.md", date: "2026-09-03" },
];

function slugFromFile(file: string): string {
  return file.replace(/^\d+-/, "").replace(/\.md$/, "");
}

const url =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_URL_NON_POOLING ||
  "";
if (!url) {
  console.error("✗ DATABASE_URL não configurada");
  process.exit(1);
}

const sql = postgres(url, { ssl: "require", prepare: false, idle_timeout: 20 });

let inserted = 0;
let skipped = 0;

for (const { file, date } of PLAN) {
  const slug = slugFromFile(file);
  const raw = readFileSync(join(CARTAS_DIR, file), "utf8");
  const { data, content } = matter(raw);

  const title = (data.titulo ?? "").toString().trim();
  const excerpt = (data.description ?? "").toString().trim();
  const content_md = content.trim();

  if (!title) {
    console.error(`✗ ${file}: frontmatter sem 'titulo' — pulando`);
    continue;
  }

  const reading_time_min = calcReadingTimeMin(content_md);
  const publishedAt = new Date(`${date}T12:00:00.000Z`);
  const image = `/newsletter/cartas/${slug}.png`;

  const rows = await sql`
    INSERT INTO newsletters (
      slug, title, excerpt, content_md, hero_image_url, og_image_url,
      published_at, author_name, reading_time_min
    ) VALUES (
      ${slug},
      ${title},
      ${excerpt},
      ${content_md},
      ${image},
      ${image},
      ${publishedAt},
      ${"Gabriel Madureira"},
      ${reading_time_min}
    )
    ON CONFLICT (slug) DO NOTHING
    RETURNING id
  `;

  if (rows.length > 0) {
    inserted++;
    console.log(
      `✓ inserida  ${slug}  pub=${publishedAt.toISOString()}  (${reading_time_min}min)`,
    );
  } else {
    skipped++;
    console.log(`· já existe ${slug} — não tocada`);
  }
}

console.log(`\nResumo: ${inserted} inseridas, ${skipped} já existiam.`);

await sql.end();
