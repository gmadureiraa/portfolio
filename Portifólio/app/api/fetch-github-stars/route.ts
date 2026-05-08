/**
 * GET /api/fetch-github-stars
 *
 * Soma stars de todos os repos públicos do `gmadureiraa`. Faz request
 * autenticado com `GITHUB_TOKEN` (rate limit 5000/h vs 60/h anônimo).
 *
 * Cache: revalidate 1h (3600s). Antes era `force-dynamic`, o que permitia
 * atacante bombar o endpoint pra queimar quota do token.
 */

interface Repo {
  stargazers_count: number;
  name: string;
}

// Revalida no máximo 1x/hora, mesmo sob carga.
export const revalidate = 3600;

export async function GET(): Promise<Response> {
  const username = "gmadureiraa";
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.error("GitHub token is missing");
    return new Response(JSON.stringify({ error: "GitHub token is missing" }), {
      status: 500,
    });
  }

  const baseUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
  const headers = {
    Accept: "application/vnd.github.v3+json",
    Authorization: `token ${token}`,
  };

  try {
    let totalStars = 0;
    let nextUrl: string | null = baseUrl;
    const MAX_PAGES = 10;
    let pages = 0;

    while (nextUrl && pages < MAX_PAGES) {
      pages++;
      const response: Response = await fetch(nextUrl, {
        headers,
        // Aproveita HTTP cache do Next (revalida em 1h).
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(5000),
      });
      if (!response.ok) {
        console.error(
          `Failed to fetch URL: ${nextUrl}, Status: ${response.status}`,
        );
        // NÃO repassa headers da GitHub pro client (poderia vazar info do token).
        return new Response(
          JSON.stringify({
            error: `Failed to fetch repositories, Status: ${response.status}`,
          }),
          { status: response.status },
        );
      }

      const repos: Repo[] = await response.json();
      for (const repo of repos) {
        totalStars += repo.stargazers_count;
      }

      const linkHeader: string | null = response.headers.get("link");
      if (linkHeader) {
        const nextLink = linkHeader
          .split(",")
          .find((s) => s.includes('rel="next"'));
        const match = nextLink?.match(/<([^>]+)>/);
        nextUrl = match ? match[1] : null;
      } else {
        nextUrl = null;
      }
    }

    return new Response(JSON.stringify({ totalStars }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        // Permite CDN/proxy cachear por 1h também.
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch repositories" }),
      { status: 500 },
    );
  }
}
