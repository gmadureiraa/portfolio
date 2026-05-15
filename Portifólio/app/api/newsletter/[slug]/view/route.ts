import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import {
  incrementViewCount,
  recordNewsletterEvent,
  isDbConfigured,
} from "@/lib/db/newsletter";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

/**
 * POST /api/newsletter/[slug]/view
 *
 * Dois efeitos:
 *  1. Incrementa `view_count` agregado — rate-limited por IP (1 por slug a cada
 *     30min) pra mitigar inflação por refresh.
 *  2. Registra um evento bruto em `newsletter_events` (slug, ip_hash, referrer,
 *     utm_*) SEMPRE — alimenta o painel de analytics e o mapeamento de origem.
 *     Aqui também deduplica na mesma janela de 30min pra não poluir o gráfico.
 *
 * Body opcional (JSON): { referrer, utm_source, utm_medium, utm_campaign }
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

  const body = await request.json().catch(() => ({}) as Record<string, unknown>);
  const str = (v: unknown) => (typeof v === "string" ? v : "");

  // Hash não reversível (ip + slug). Só serve pra contagem/dedupe interno.
  const ipHash = crypto
    .createHash("sha256")
    .update(`${ip}:${slug}`)
    .digest("hex")
    .slice(0, 32);

  // Normaliza referrer pro hostname (privacidade + agregação melhor).
  let referrer = str(body.referrer);
  if (referrer) {
    try {
      referrer = new URL(referrer).hostname.replace(/^www\./, "");
    } catch {
      referrer = referrer.slice(0, 120);
    }
  }

  await Promise.allSettled([
    incrementViewCount(slug),
    recordNewsletterEvent({
      slug,
      eventType: "view",
      ipHash,
      referrer,
      utmSource: str(body.utm_source),
      utmMedium: str(body.utm_medium),
      utmCampaign: str(body.utm_campaign),
    }),
  ]);

  return NextResponse.json({ ok: true });
}
