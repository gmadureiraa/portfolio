/**
 * Insere o post "Ninguém lê seu texto" como NEWSLETTER no DB Neon.
 * Lê o conteúdo do .md original e publica com published_at = agora.
 * NÃO envia email (sent_at fica null).
 *
 * Uso: bun run scripts/insert-newsletter-escaneia.ts
 */

// bun carrega .env automaticamente quando rodado com --env-file=.env
import { readFile } from "node:fs/promises";
import matter from "gray-matter";
import { upsertNewsletter, isDbConfigured } from "../lib/db/newsletter";

const MD_PATH = "./content/posts/ninguem-le-seu-texto-escaneia.md";

async function main() {
  if (!isDbConfigured) {
    console.error("✗ DB não configurado. Verifica DATABASE_URL no .env");
    process.exit(1);
  }

  const raw = await readFile(MD_PATH, "utf-8");
  const parsed = matter(raw);
  const { data, content } = parsed;

  const slug = "ninguem-le-seu-texto-escaneia";
  const title = (data.title as string) || "Ninguém lê seu texto. As pessoas escaneiam.";
  const excerpt = (data.description as string) || "";
  const heroImage = (data.image as string) || null;
  // h1 inicial vira redundante — o newsletter renderer já mostra title
  const contentMd = content.replace(/^#\s+.+\n+/, "").trim();

  const post = await upsertNewsletter({
    slug,
    title,
    excerpt,
    content_md: contentMd,
    hero_image_url: heroImage,
    og_image_url: heroImage,
    published_at: new Date(), // publicado agora, mas sem enviar email
    author_name: "Gabriel Madureira",
  });

  if (!post) {
    console.error("✗ Falhou ao inserir.");
    process.exit(1);
  }

  console.log("✓ Newsletter inserida no DB:");
  console.log(`  id:            ${post.id}`);
  console.log(`  slug:          ${post.slug}`);
  console.log(`  title:         ${post.title}`);
  console.log(`  published_at:  ${post.published_at?.toISOString()}`);
  console.log(`  reading_time:  ${post.reading_time_min} min`);
  console.log(`  hero_image:    ${post.hero_image_url}`);
  console.log(`\n→ URL pública: https://madureira.xyz/newsletter/${post.slug}`);
  console.log("→ Admin:        https://madureira.xyz/admin/newsletter");
  console.log("\nObs: email NÃO enviado (sent_at = null). Disparar manual no admin.");
}

main().catch((e) => {
  console.error("✗ Erro:", e);
  process.exit(1);
});
