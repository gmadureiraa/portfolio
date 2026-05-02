import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  expectedCookieValue,
  verifySecret,
} from "@/lib/server/admin";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

/**
 * POST /api/admin/login  { secret }
 *
 * Compara `secret` com process.env.ADMIN_SECRET (constant-time).
 * Se válido, seta cookie httpOnly `madureira_admin` por 30 dias.
 */
export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const limit = await rateLimit("admin-login", ip, 8, 60 * 10);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, message: "Muitas tentativas." },
      { status: 429 },
    );
  }

  const body = await request.json().catch(() => ({}));
  const secret = typeof body?.secret === "string" ? body.secret : "";
  if (!secret || !verifySecret(secret)) {
    return NextResponse.json(
      { ok: false, message: "Senha inválida." },
      { status: 401 },
    );
  }

  const cookieValue = expectedCookieValue();
  if (!cookieValue) {
    return NextResponse.json(
      { ok: false, message: "ADMIN_SECRET não configurado no servidor." },
      { status: 500 },
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, cookieValue, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 dias
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
