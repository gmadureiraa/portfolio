/**
 * Google Analytics 4 — Data API wrapper.
 *
 * Server-side only. Lê credenciais via service account JSON em
 * `GOOGLE_APPLICATION_CREDENTIALS_JSON` (string com o JSON inteiro) e
 * Property ID em `GA4_PROPERTY_ID` (só números, sem "properties/").
 *
 * Setup obrigatório:
 *   1. Google Cloud Console → IAM → Service Accounts → criar conta.
 *   2. Habilitar "Google Analytics Data API" no projeto.
 *   3. Gerar chave JSON, colar inteira em `GOOGLE_APPLICATION_CREDENTIALS_JSON`.
 *   4. GA4 Admin → Property Access Management → adicionar email da service
 *      account como "Viewer".
 *   5. Property ID está em GA4 Admin → Property Settings (números).
 *
 * Se as envs não estiverem setadas, `isGa4Configured` retorna false e o
 * frontend mostra fallback gracioso com instruções.
 */

import { BetaAnalyticsDataClient, protos } from "@google-analytics/data";

type RunReportResponse =
  protos.google.analytics.data.v1beta.IRunReportResponse;

let _client: BetaAnalyticsDataClient | null = null;

function readCredentials(): Record<string, unknown> | null {
  const raw = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function isGa4Configured(): boolean {
  return Boolean(
    process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON &&
      process.env.GA4_PROPERTY_ID,
  );
}

function getClient(): BetaAnalyticsDataClient | null {
  if (_client) return _client;
  const creds = readCredentials();
  if (!creds) return null;
  _client = new BetaAnalyticsDataClient({ credentials: creds });
  return _client;
}

function propertyResource(): string | null {
  const id = process.env.GA4_PROPERTY_ID;
  if (!id) return null;
  return `properties/${id.replace(/^properties\//, "")}`;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Ga4Totals {
  totalUsers: number;
  sessions: number;
  screenPageViews: number;
  averageSessionDuration: number; // seconds
  bounceRate: number; // 0..1
}

export interface Ga4DailyPoint {
  date: string; // YYYY-MM-DD
  pageViews: number;
  users: number;
}

export interface Ga4TopPage {
  path: string;
  title: string;
  views: number;
}

export interface Ga4Source {
  source: string; // ex: "organic", "direct", "(none)"
  sessions: number;
}

export interface Ga4Device {
  category: string; // "desktop" | "mobile" | "tablet"
  users: number;
}

export interface Ga4Event {
  eventName: string;
  count: number;
}

export interface Ga4Bundle {
  configured: boolean;
  rangeDays: number;
  totals: Ga4Totals | null;
  daily: Ga4DailyPoint[];
  topPages: Ga4TopPage[];
  sources: Ga4Source[];
  devices: Ga4Device[];
  events: Ga4Event[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function num(v: string | null | undefined): number {
  const n = Number(v || 0);
  return Number.isFinite(n) ? n : 0;
}

function parseDateRow(d: string): string {
  // GA4 retorna YYYYMMDD
  if (!d || d.length < 8) return d;
  return `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`;
}

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

async function runReport(
  client: BetaAnalyticsDataClient,
  property: string,
  body: Omit<
    protos.google.analytics.data.v1beta.IRunReportRequest,
    "property"
  >,
): Promise<RunReportResponse | null> {
  try {
    const [resp] = await client.runReport({ property, ...body });
    return resp;
  } catch (err) {
    console.error("[ga4] runReport failed:", err);
    return null;
  }
}

export async function getGa4Bundle(
  rangeDays = 30,
): Promise<Ga4Bundle> {
  const empty: Ga4Bundle = {
    configured: false,
    rangeDays,
    totals: null,
    daily: [],
    topPages: [],
    sources: [],
    devices: [],
    events: [],
  };
  if (!isGa4Configured()) return empty;

  const client = getClient();
  const property = propertyResource();
  if (!client || !property) return empty;

  const dateRanges = [
    { startDate: `${rangeDays}daysAgo`, endDate: "today" },
  ];

  const [totalsResp, dailyResp, pagesResp, sourcesResp, devicesResp, eventsResp] =
    await Promise.all([
      runReport(client, property, {
        dateRanges,
        metrics: [
          { name: "totalUsers" },
          { name: "sessions" },
          { name: "screenPageViews" },
          { name: "averageSessionDuration" },
          { name: "bounceRate" },
        ],
      }),
      runReport(client, property, {
        dateRanges,
        dimensions: [{ name: "date" }],
        metrics: [{ name: "screenPageViews" }, { name: "totalUsers" }],
        orderBys: [{ dimension: { dimensionName: "date" } }],
      }),
      runReport(client, property, {
        dateRanges,
        dimensions: [{ name: "pagePath" }, { name: "pageTitle" }],
        metrics: [{ name: "screenPageViews" }],
        orderBys: [
          { metric: { metricName: "screenPageViews" }, desc: true },
        ],
        limit: 10,
      }),
      runReport(client, property, {
        dateRanges,
        dimensions: [{ name: "sessionDefaultChannelGroup" }],
        metrics: [{ name: "sessions" }],
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        limit: 10,
      }),
      runReport(client, property, {
        dateRanges,
        dimensions: [{ name: "deviceCategory" }],
        metrics: [{ name: "totalUsers" }],
        orderBys: [{ metric: { metricName: "totalUsers" }, desc: true }],
      }),
      runReport(client, property, {
        dateRanges,
        dimensions: [{ name: "eventName" }],
        metrics: [{ name: "eventCount" }],
        orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
        limit: 10,
      }),
    ]);

  const totals: Ga4Totals | null = totalsResp?.rows?.[0]
    ? {
        totalUsers: num(totalsResp.rows[0].metricValues?.[0]?.value),
        sessions: num(totalsResp.rows[0].metricValues?.[1]?.value),
        screenPageViews: num(totalsResp.rows[0].metricValues?.[2]?.value),
        averageSessionDuration: num(
          totalsResp.rows[0].metricValues?.[3]?.value,
        ),
        bounceRate: num(totalsResp.rows[0].metricValues?.[4]?.value),
      }
    : null;

  const daily: Ga4DailyPoint[] =
    dailyResp?.rows?.map((r) => ({
      date: parseDateRow(r.dimensionValues?.[0]?.value || ""),
      pageViews: num(r.metricValues?.[0]?.value),
      users: num(r.metricValues?.[1]?.value),
    })) || [];

  const topPages: Ga4TopPage[] =
    pagesResp?.rows?.map((r) => ({
      path: r.dimensionValues?.[0]?.value || "",
      title: r.dimensionValues?.[1]?.value || "",
      views: num(r.metricValues?.[0]?.value),
    })) || [];

  const sources: Ga4Source[] =
    sourcesResp?.rows?.map((r) => ({
      source: r.dimensionValues?.[0]?.value || "(unknown)",
      sessions: num(r.metricValues?.[0]?.value),
    })) || [];

  const devices: Ga4Device[] =
    devicesResp?.rows?.map((r) => ({
      category: r.dimensionValues?.[0]?.value || "unknown",
      users: num(r.metricValues?.[0]?.value),
    })) || [];

  const events: Ga4Event[] =
    eventsResp?.rows?.map((r) => ({
      eventName: r.dimensionValues?.[0]?.value || "",
      count: num(r.metricValues?.[0]?.value),
    })) || [];

  return {
    configured: true,
    rangeDays,
    totals,
    daily,
    topPages,
    sources,
    devices,
    events,
  };
}
