import { NextRequest, NextResponse } from "next/server";
import { incrementViewCount, isDbConfigured } from "@/lib/db/newsletter";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

/**
 * POST /api/newsletter/[slug]/view
 *
 * Incrementa view_count. Rate-limited por IP (1 view por slug por IP a cada 30min)
 * pra mitigar inflação por refresh.
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  if (!isDbConfigured) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const { slug } = await params;
  const ip = getClientIp(request);
  const limit = await rateLimit(`view:${slug}`, ip, 1, 60 * 30);
  if (!limit.ok) {
    return NextResponse.json({ ok: true, deduped: true });
  }

  await incrementViewCount(slug);
  return NextResponse.json({ ok: true });
}
