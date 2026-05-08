import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  createSessionCookie,
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

  const cookieValue = createSessionCookie();
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
    // Server cap server-side é 24h via `MAX_SESSION_AGE_SEC` em admin.ts —
    // alinhamos o maxAge do cookie pra evitar cookies "vivos" inválidos.
    maxAge: 60 * 60 * 24,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
