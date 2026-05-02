import { NextRequest, NextResponse } from "next/server";
import { unsubscribeByToken, isDbConfigured } from "@/lib/db/newsletter";

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://madureira.xyz";

/**
 * GET  /api/newsletter/unsubscribe?token=xxx — link clicável (one-click)
 * POST /api/newsletter/unsubscribe?token=xxx — `List-Unsubscribe-Post` (RFC 8058)
 *
 * Marca unsubscribed_at=NOW() e redireciona pra /newsletter?unsubscribed=true
 */
async function handle(request: NextRequest, isPost = false) {
  const token = request.nextUrl.searchParams.get("token") || "";
  if (!token) {
    if (isPost) return new NextResponse("missing token", { status: 400 });
    return NextResponse.redirect(new URL("/newsletter?error=token", BASE));
  }
  if (!isDbConfigured) {
    if (isPost) return new NextResponse("db not configured", { status: 503 });
    return NextResponse.redirect(new URL("/newsletter?error=db", BASE));
  }

  try {
    await unsubscribeByToken(token);
    if (isPost) return new NextResponse("ok", { status: 200 });
    return NextResponse.redirect(
      new URL("/newsletter?unsubscribed=true", BASE),
    );
  } catch (err) {
    console.error("[newsletter/unsubscribe] erro:", err);
    if (isPost)
      return new NextResponse("server error", { status: 500 });
    return NextResponse.redirect(new URL("/newsletter?error=server", BASE));
  }
}

export async function GET(request: NextRequest) {
  return handle(request, false);
}

export async function POST(request: NextRequest) {
  return handle(request, true);
}
