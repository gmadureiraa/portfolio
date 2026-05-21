import { NextRequest, NextResponse } from "next/server";
import { isAdminFromRequest } from "@/lib/server/admin";
import {
  deleteNewsletter,
  getNewsletterBySlug,
  upsertNewsletter,
  isDbConfigured,
} from "@/lib/db/newsletter";

/**
 * DELETE /api/admin/newsletter/[slug]
 *   Remove um post (irreversível).
 *
 * PATCH  /api/admin/newsletter/[slug]
 *   Body: { unpublish: true }
 *     -> seta published_at = null (vira draft).
 *
 *   Body: { published_at: "2026-..." | null, publish: boolean }
 *     -> reagenda ou publica.
 */

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
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

  const { slug } = await params;
  const ok = await deleteNewsletter(slug);
  if (!ok) {
    return NextResponse.json(
      { ok: false, message: "post not found" },
      { status: 404 },
    );
  }
  return NextResponse.json({ ok: true });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
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

  const { slug } = await params;
  const existing = await getNewsletterBySlug(slug);
  if (!existing) {
    return NextResponse.json(
      { ok: false, message: "post not found" },
      { status: 404 },
    );
  }

  const body = await request.json().catch(() => ({}));

  let publishedAt: Date | null = existing.published_at;
  if (body.unpublish === true) {
    publishedAt = null;
  } else if (body.publish === true) {
    publishedAt = new Date();
  } else if (body.published_at) {
    const d = new Date(body.published_at as string);
    if (!Number.isNaN(d.getTime())) publishedAt = d;
  } else if (body.published_at === null) {
    publishedAt = null;
  }

  const post = await upsertNewsletter({
    slug: existing.slug,
    title: existing.title,
    excerpt: existing.excerpt,
    content_md: existing.content_md,
    hero_image_url: existing.hero_image_url,
    og_image_url: existing.og_image_url,
    published_at: publishedAt,
    author_name: existing.author_name,
  });

  return NextResponse.json({ ok: true, post });
}
