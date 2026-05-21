/**
 * Insere os 3 rascunhos da voz Dan Koe como DRAFTS no DB Neon.
 * - published_at = null (não vão pra /newsletter público)
 * - sent_at = null (não envia email)
 * Aparecem em /admin/newsletter como rascunhos pro Gabriel revisar.
 *
 * Uso: bun --env-file=.env.local run scripts/insert-rascunhos-dankoe-voice.ts
 */

import { readFile } from "node:fs/promises";
import matter from "gray-matter";
import { upsertNewsletter, isDbConfigured } from "../lib/db/newsletter";

const RASCUNHOS_DIR =
  "/Users/gabrielmadureira/GOS/vault/01 - KALEIDOS/011 - CLIENTES/MADUREIRA/04-EMAILS/rascunhos-dankoe-voice";

const FILES = [
  "01-30-dias-com-a-minha-cabeca.md",
  "02-ninguem-le-seu-texto.md",
  "03-5-hooks-que-funcionam.md",
] as const;

async function main() {
  if (!isDbConfigured) {
    console.error("✗ DB não configurado. Verifica DATABASE_URL no .env.local");
    process.exit(1);
  }

  for (const filename of FILES) {
    const path = `${RASCUNHOS_DIR}/${filename}`;
    const raw = await readFile(path, "utf-8");
    const parsed = matter(raw);
    const { data, content } = parsed;

    const slug = data.slug as string;
    const title = data.title as string;
    const excerpt = (data.description as string) || "";
    const heroImage = (data.image as string) || null;
    const contentMd = content.replace(/^#\s+.+\n+/, "").trim();

    const post = await upsertNewsletter({
      slug,
      title,
      excerpt,
      content_md: contentMd,
      hero_image_url: heroImage,
      og_image_url: heroImage,
      published_at: null,
      author_name: (data.author_name as string) || "Gabriel Madureira",
    });

    if (!post) {
      console.error(`✗ Falhou ao inserir: ${slug}`);
      continue;
    }

    console.log(`✓ ${slug}`);
    console.log(`  id:             ${post.id}`);
    console.log(`  title:          ${post.title}`);
    console.log(`  reading_time:   ${post.reading_time_min} min`);
    console.log(`  published_at:   ${post.published_at ? "PUBLICADO" : "DRAFT"}`);
    console.log("");
  }

  console.log("→ Admin: https://madureira.xyz/admin/newsletter");
  console.log("Status: 3 rascunhos no DB com published_at=null, sent_at=null.");
}

main().catch((e) => {
  console.error("✗ Erro:", e);
  process.exit(1);
});
