import { listPublishedNewsletters } from "@/lib/db/newsletter";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://madureira.xyz";

const FEED_PATH = "/newsletter/rss.xml";

// Revalida o feed a cada hora (ISR no route handler).
export const revalidate = 3600;

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  // Build-safe: se o DB não estiver configurado ou a query falhar, devolve feed vazio.
  // listPublishedNewsletters já filtra published_at <= now() e ordena por data desc.
  const posts = await listPublishedNewsletters().catch(() => []);

  const lastBuild = posts.length && posts[0].published_at
    ? new Date(posts[0].published_at).toUTCString()
    : new Date().toUTCString();

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/newsletter/${post.slug}`;
      const pubDate = post.published_at
        ? new Date(post.published_at).toUTCString()
        : new Date().toUTCString();
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.excerpt || "")}</description>
      <dc:creator>Gabriel Madureira</dc:creator>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Madureira — Newsletter</title>
    <link>${SITE_URL}/newsletter</link>
    <description>Cartas semanais sobre marketing direto, IA aplicada e bastidor real de quem constrói. Texto curto, números reais, zero hype.</description>
    <language>pt-BR</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${SITE_URL}${FEED_PATH}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
