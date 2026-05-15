import { NextRequest, NextResponse } from "next/server";
import { isAdminFromRequest } from "@/lib/server/admin";
import { getAnalyticsBundle, isDbConfigured } from "@/lib/db/newsletter";

/**
 * GET /api/admin/newsletter/analytics
 *
 * Bundle de métricas pro painel admin:
 *  - posts: views por post (total + 30d + 7d)
 *  - daily30d: série diária de views (últimos 30 dias)
 *  - topReferrers: de onde o tráfego veio (hostname agregado)
 *  - subscriberSources: de onde os leads vieram (campo `source`)
 *  - totals: views all/30d, subscribers confirmados/pendentes
 */
export async function GET(request: NextRequest) {
  if (!isAdminFromRequest(request)) {
    return NextResponse.json(
      { ok: false, message: "unauthorized" },
      { status: 401 },
    );
  }
  if (!isDbConfigured) {
    return NextResponse.json(
      { ok: false, message: "db not configured" },
      { status: 503 },
    );
  }

  const data = await getAnalyticsBundle();
  if (!data) {
    return NextResponse.json(
      { ok: false, message: "analytics unavailable" },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true, ...data });
}
