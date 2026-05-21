import { NextRequest, NextResponse } from "next/server";
import { isAdminFromRequest } from "@/lib/server/admin";
import {
  listAllNewsletters,
  upsertNewsletter,
  isDbConfigured,
} from "@/lib/db/newsletter";

/**
 * GET  /api/admin/newsletter             — lista todos os posts (drafts + publicados)
 * POST /api/admin/newsletter             — cria/atualiza post
 */

export async function GET(request: NextRequest) {
  if (!isAdminFromRequest(request)) {
    return NextResponse.json({ ok: false, message: "unauthorized" }, { status: 401 });
  }
  if (!isDbConfigured) {
    return NextResponse.json({ ok: false, message: "db not configured" }, { status: 503 });
  }
  const items = await listAllNewsletters();
  return NextResponse.json({ ok: true, items });
}

export async function POST(request: NextRequest) {
  if (!isAdminFromRequest(request)) {
    return NextResponse.json({ ok: false, message: "unauthorized" }, { status: 401 });
  }
  if (!isDbConfigured) {
    return NextResponse.json({ ok: false, message: "db not configured" }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, message: "invalid body" }, { status: 400 });
  }

  const required = ["slug", "title", "excerpt", "content_md"] as const;
  for (const k of required) {
    if (typeof (body as Record<string, unknown>)[k] !== "string" || !(body as Record<string, string>)[k].trim()) {
      return NextResponse.json(
        { ok: false, message: `missing field: ${k}` },
        { status: 400 },
      );
    }
  }

  const slugRaw = (body.slug as string).trim().toLowerCase();
  const slug = slugRaw.replace(/[^a-z0-9-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  if (!slug) {
    return NextResponse.json({ ok: false, message: "invalid slug" }, { status: 400 });
  }

  let publishedAt: Date | null = null;
  if (body.published_at) {
    const d = new Date(body.published_at as string);
    if (!Number.isNaN(d.getTime())) publishedAt = d;
  } else if (body.publish === true) {
    publishedAt = new Date();
  }

  const post = await upsertNewsletter({
    slug,
    title: (body.title as string).trim(),
    excerpt: (body.excerpt as string).trim(),
    content_md: body.content_md as string,
    hero_image_url: typeof body.hero_image_url === "string" ? body.hero_image_url || null : null,
    og_image_url: typeof body.og_image_url === "string" ? body.og_image_url || null : null,
    published_at: publishedAt,
    author_name: typeof body.author_name === "string" ? body.author_name : undefined,
  });

  return NextResponse.json({ ok: true, post });
}
