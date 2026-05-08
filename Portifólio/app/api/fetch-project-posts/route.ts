/**
 * GET /api/fetch-project-posts
 *
 * Agrega feed do `bento.engage-dev.com`. URL inicial é hardcoded.
 *
 * Hardenings (vs versão anterior):
 *   - Timeout 5s por request (AbortSignal).
 *   - Max 5 páginas (`MAX_PAGES`) — protege contra paginação infinita injetada
 *     por upstream malicioso que travaria o serverless (Vercel cobra exec time).
 *   - Validação de host na URL `next`: rejeita pagination link que pule pra
 *     outro host (defesa-em-profundidade contra SSRF caso o feed seja
 *     comprometido).
 *   - Cache: 5min revalidate em vez de `force-dynamic`.
 */

const ALLOWED_HOST = "bento.engage-dev.com";
const MAX_PAGES = 5;
const FETCH_TIMEOUT_MS = 5000;

export const revalidate = 300;

interface BentoPost {
  [key: string]: unknown;
}

export async function GET(): Promise<Response> {
  const initialUrl = `https://${ALLOWED_HOST}/api/v1/fetchProjectsFeed.json`;
  const headers = { Accept: "application/json" };

  try {
    const postsData: BentoPost[] = [];
    let nextUrl: string | null = initialUrl;
    let pageCount = 0;

    while (nextUrl !== null && pageCount < MAX_PAGES) {
      const currentUrl: string = nextUrl;
      const response: Response = await fetch(currentUrl, {
        headers,
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
        next: { revalidate: 300 },
      });
      if (!response.ok) {
        return new Response(
          JSON.stringify({ error: "Failed to fetch projects feed" }),
          { status: response.status },
        );
      }

      const posts = (await response.json()) as BentoPost[];
      if (Array.isArray(posts)) postsData.push(...posts);
      pageCount++;

      const linkHeader: string | null = response.headers.get("link");
      let candidate: string | null = null;
      if (linkHeader) {
        const nextLink: string | undefined = linkHeader
          .split(",")
          .find((s: string) => s.includes('rel="next"'));
        if (nextLink) {
          candidate = nextLink.split(";")[0].replace("<", "").replace(">", "").trim();
        }
      }

      // Defesa-em-profundidade: só seguimos paginação no mesmo host inicial.
      if (candidate) {
        try {
          const url: URL = new URL(candidate);
          if (url.protocol !== "https:" || url.hostname !== ALLOWED_HOST) {
            nextUrl = null;
          } else {
            nextUrl = url.toString();
          }
        } catch {
          nextUrl = null;
        }
      } else {
        nextUrl = null;
      }
    }

    return new Response(JSON.stringify({ postsData }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("Error fetching projects feed:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch projects feed" }),
      { status: 500 },
    );
  }
}
