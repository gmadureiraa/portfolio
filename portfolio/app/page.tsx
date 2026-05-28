import { Bento } from "@/components/bento";
import { listPublishedNewsletters } from "@/lib/db/newsletter";
import type { NewsletterPreviewItem } from "@/components/newsletter-preview-card";

// Server fetch das últimas cartas pra preview no bento. Revalida a cada 60s
// — mesma cadência da página /newsletter. Falha aberta: array vazio.
export const revalidate = 60;

export default async function Home() {
  const posts = await listPublishedNewsletters().catch(() => []);
  const latestNewsletters: NewsletterPreviewItem[] = posts
    .slice(0, 3)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      published_at: p.published_at
        ? new Date(p.published_at).toISOString()
        : null,
      reading_time_min: p.reading_time_min ?? null,
    }));

  return (
    <div className="w-full flex items-center justify-center max-w-5xl mx-auto">
      <div className="flex flex-col items-center overflow-hidden">
        <div className="w-full py-2 px-2 lg:py-10 lg:px-4">
          <Bento latestNewsletters={latestNewsletters} />
        </div>
      </div>
    </div>
  );
}
