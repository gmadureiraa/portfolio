import { NextRequest, NextResponse } from "next/server";
import { confirmSubscriber, isDbConfigured } from "@/lib/db/newsletter";

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://madureira.xyz";

/**
 * GET /api/newsletter/confirm?token=xxx
 *
 * Marca subscriber como confirmed=true e redireciona pra /newsletter?confirmed=true
 */
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token") || "";
  if (!token) {
    return NextResponse.redirect(new URL("/newsletter?error=token", BASE));
  }
  if (!isDbConfigured) {
    return NextResponse.redirect(new URL("/newsletter?error=db", BASE));
  }

  try {
    const sub = await confirmSubscriber(token);
    if (!sub) {
      return NextResponse.redirect(
        new URL("/newsletter?error=invalid", BASE),
      );
    }
    return NextResponse.redirect(
      new URL("/newsletter?confirmed=true", BASE),
    );
  } catch (err) {
    console.error("[newsletter/confirm] erro:", err);
    return NextResponse.redirect(new URL("/newsletter?error=server", BASE));
  }
}
