/**
 * PostHog — wrapper read-only via Query API (HogQL).
 *
 * Server-side only. Lê eventos do project "Kaleidos Group" (id 387434)
 * filtrados por $host = madureira.xyz/www.madureira.xyz.
 *
 * Setup obrigatório:
 *   1. PostHog → Settings → Personal API keys → criar com scopes
 *      `query:read`, `event:read`, `insight:read`, `dashboard:read`.
 *   2. Setar no Vercel:
 *      - POSTHOG_PERSONAL_API_KEY=phx_...
 *      - POSTHOG_PROJECT_ID=387434
 *      - (opcional) POSTHOG_HOST=https://us.posthog.com (default)
 *
 * Se as envs não estiverem setadas, `isPosthogConfigured` retorna false
 * e o frontend renderiza fallback gracioso com instruções.
 */

const POSTHOG_HOST_DEFAULT = "https://us.posthog.com";
const HOST_FILTER_SITES = ["madureira.xyz", "www.madureira.xyz"];

export function isPosthogConfigured(): boolean {
  return Boolean(
    process.env.POSTHOG_PERSONAL_API_KEY && process.env.POSTHOG_PROJECT_ID,
  );
}

function getHost(): string {
  return (process.env.POSTHOG_HOST || POSTHOG_HOST_DEFAULT).replace(/\/$/, "");
}

interface HogQLResponse {
  results?: Array<Array<string | number | null>>;
  columns?: string[];
  hogql?: string;
  error?: string;
}

async function runQuery(query: string): Promise<HogQLResponse> {
  const apiKey = process.env.POSTHOG_PERSONAL_API_KEY;
  const projectId = process.env.POSTHOG_PROJECT_ID;
  if (!apiKey || !projectId) {
    throw new Error("PostHog API key/project ID não configurados");
  }
  const res = await fetch(
    `${getHost()}/api/projects/${projectId}/query/`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: { kind: "HogQLQuery", query },
      }),
      cache: "no-store",
    },
  );
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`PostHog Query API ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json();
}

function hostFilter(): string {
  return HOST_FILTER_SITES.map((h) => `'${h}'`).join(", ");
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PostHogTotals {
  pageviews: number;
  uniqueVisitors: number;
  sessions: number;
}

export interface PostHogDailyPoint {
  date: string; // YYYY-MM-DD
  pageviews: number;
  visitors: number;
}

export interface PostHogTopPath {
  path: string;
  views: number;
}

export interface PostHogTopReferrer {
  referrer: string;
  visits: number;
}

export interface PostHogTopEvent {
  event: string;
  count: number;
}

export interface PostHogBundle {
  configured: boolean;
  rangeDays: number;
  totals: PostHogTotals | null;
  daily: PostHogDailyPoint[];
  topPaths: PostHogTopPath[];
  topReferrers: PostHogTopReferrer[];
  topEvents: PostHogTopEvent[];
}

export const emptyBundle = (rangeDays: number): PostHogBundle => ({
  configured: false,
  rangeDays,
  totals: null,
  daily: [],
  topPaths: [],
  topReferrers: [],
  topEvents: [],
});

function num(v: string | number | null | undefined): number {
  if (v == null) return 0;
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : 0;
}

// ---------------------------------------------------------------------------
// Bundle
// ---------------------------------------------------------------------------

export async function getPostHogBundle(
  rangeDays: number,
): Promise<PostHogBundle> {
  if (!isPosthogConfigured()) return emptyBundle(rangeDays);

  const sinceClause = `timestamp >= now() - INTERVAL ${rangeDays} DAY`;
  const hostClause = `properties.$host IN (${hostFilter()})`;

  const [totalsRes, dailyRes, pathsRes, referrersRes, eventsRes] =
    await Promise.all([
      runQuery(`
        SELECT
          countIf(event = '$pageview') AS pageviews,
          count(DISTINCT person_id) AS unique_visitors,
          count(DISTINCT properties.$session_id) AS sessions
        FROM events
        WHERE ${sinceClause} AND ${hostClause}
      `),
      runQuery(`
        SELECT
          toDate(timestamp) AS day,
          countIf(event = '$pageview') AS pageviews,
          count(DISTINCT person_id) AS visitors
        FROM events
        WHERE ${sinceClause} AND ${hostClause}
        GROUP BY day
        ORDER BY day
      `),
      runQuery(`
        SELECT
          properties.$pathname AS path,
          count() AS views
        FROM events
        WHERE event = '$pageview'
          AND ${sinceClause} AND ${hostClause}
        GROUP BY path
        ORDER BY views DESC
        LIMIT 10
      `),
      runQuery(`
        SELECT
          properties.$referring_domain AS referrer,
          count(DISTINCT person_id) AS visits
        FROM events
        WHERE event = '$pageview'
          AND ${sinceClause} AND ${hostClause}
          AND properties.$referring_domain != '$direct'
        GROUP BY referrer
        ORDER BY visits DESC
        LIMIT 10
      `),
      runQuery(`
        SELECT event, count() AS c
        FROM events
        WHERE ${sinceClause} AND ${hostClause}
          AND event NOT LIKE '$%'
        GROUP BY event
        ORDER BY c DESC
        LIMIT 10
      `),
    ]);

  const totals: PostHogTotals | null = totalsRes.results?.[0]
    ? {
        pageviews: num(totalsRes.results[0][0]),
        uniqueVisitors: num(totalsRes.results[0][1]),
        sessions: num(totalsRes.results[0][2]),
      }
    : null;

  const daily: PostHogDailyPoint[] =
    dailyRes.results?.map((r) => ({
      date: String(r[0] ?? ""),
      pageviews: num(r[1]),
      visitors: num(r[2]),
    })) ?? [];

  const topPaths: PostHogTopPath[] =
    pathsRes.results?.map((r) => ({
      path: String(r[0] ?? "(unknown)"),
      views: num(r[1]),
    })) ?? [];

  const topReferrers: PostHogTopReferrer[] =
    referrersRes.results?.map((r) => ({
      referrer: String(r[0] ?? "(unknown)"),
      visits: num(r[1]),
    })) ?? [];

  const topEvents: PostHogTopEvent[] =
    eventsRes.results?.map((r) => ({
      event: String(r[0] ?? ""),
      count: num(r[1]),
    })) ?? [];

  return {
    configured: true,
    rangeDays,
    totals,
    daily,
    topPaths,
    topReferrers,
    topEvents,
  };
}
