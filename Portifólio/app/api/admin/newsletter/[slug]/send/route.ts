import { NextRequest, NextResponse } from "next/server";
import { isAdminFromRequest } from "@/lib/server/admin";
import {
  getNewsletterBySlug,
  listConfirmedActiveSubscribers,
  markNewsletterSent,
  isDbConfigured,
} from "@/lib/db/newsletter";
import { sendNewsletterBlast } from "@/lib/server/newsletter-emails";

/**
 * POST /api/admin/newsletter/[slug]/send
 *
 * Dispara post pra todos os subscribers confirmados via Resend batch.send.
 * Marca `sent_at` no post quando completa (mesmo se houver falhas parciais).
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  if (!isAdminFromRequest(request)) {
    return NextResponse.json({ ok: false, message: "unauthorized" }, { status: 401 });
  }
  if (!isDbConfigured) {
    return NextResponse.json({ ok: false, message: "db not configured" }, { status: 503 });
  }

  const { slug } = await params;
  const post = await getNewsletterBySlug(slug);
  if (!post) {
    return NextResponse.json({ ok: false, message: "post not found" }, { status: 404 });
  }
  if (!post.published_at) {
    return NextResponse.json(
      { ok: false, message: "post precisa estar publicado antes de enviar" },
      { status: 400 },
    );
  }

  const subscribers = await listConfirmedActiveSubscribers();
  const result = await sendNewsletterBlast(post, subscribers);

  if (result.sent > 0) {
    await markNewsletterSent(slug);
  }

  return NextResponse.json({
    ok: result.ok,
    recipients: subscribers.length,
    sent: result.sent,
    failed: result.failed,
    skipped: result.skipped,
    domainWarning: result.domainWarning,
    error: result.error,
  });
}
