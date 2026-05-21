export const dynamic = 'force-dynamic';

import { getLocalPosts } from "@/lib/posts";

export async function GET(request: Request) {
  // Posts locais (markdown em content/posts/) — sempre disponíveis
  const localPosts = getLocalPosts();

  // Tenta buscar posts do Bento em paralelo (opcional)
  let bentoPosts: any[] = [];
  try {
    const bentoUrl = `https://bento.engage-dev.com/api/v1/fetchPostsFeed.json`;
    const response = await fetch(bentoUrl, {
      headers: { "Accept": "application/json" },
      signal: AbortSignal.timeout(5000), // 5s timeout
    });
    if (response.ok) {
      const data = await response.json();
      bentoPosts = Array.isArray(data) ? data : [];
    }
  } catch {
    // Silently ignore — local posts are the source of truth
  }

  // Merge: local posts first (more recent, controlled), then Bento
  const postsData = [...localPosts, ...bentoPosts];

  return new Response(JSON.stringify({ postsData }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
