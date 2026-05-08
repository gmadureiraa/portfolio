/**
 * Admin auth helper para `/admin/newsletter`.
 *
 * Estratégia (single-user, sem dependência externa):
 *   - Login via `POST /api/admin/login` com `{ secret }` (compara constant-time
 *     contra `ADMIN_SECRET`).
 *   - Cookie `madureira_admin` = `base64url(payload).base64url(sig)`, onde:
 *       payload = `{ iat: <unix-seconds> }`
 *       sig     = HMAC-SHA256(payload, ADMIN_SESSION_SECRET || ADMIN_SECRET)
 *   - Sessão expira em `MAX_SESSION_AGE_SEC` (24h) — verificado em todo guard.
 *     Mesmo que `maxAge` do cookie seja maior, o servidor recusa tokens > 24h.
 *
 * Vantagens vs SHA256(secret):
 *   - HMAC com chave separada: exposição do hash não permite reverter o secret
 *     (rainbow tables não atacam HMAC sem a chave).
 *   - `iat` permite cap por idade (24h cap explícito) e revogação por bump
 *     de `MIN_TOKEN_DATE` (env opcional).
 *   - Sem dependência (jose/jsonwebtoken).
 *
 * Compat: tokens no formato antigo (apenas hash hex) são rejeitados — usuário
 * precisa logar de novo após o deploy. Aceitável (single-user).
 */

import crypto from "node:crypto";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export const ADMIN_COOKIE = "madureira_admin";

/** Sessão admin expira em 24h (cap server-side, independente do cookie maxAge). */
const MAX_SESSION_AGE_SEC = 60 * 60 * 24;

export function getAdminSecret(): string | null {
  return process.env.ADMIN_SECRET || null;
}

/**
 * Chave usada para o HMAC do cookie. Preferimos `ADMIN_SESSION_SECRET` para
 * podermos rotar sessões sem trocar a senha de login. Cai pra `ADMIN_SECRET`
 * se não setado (ainda melhor que SHA256 plain do secret).
 */
function getSessionSecret(): string | null {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_SECRET || null;
}

/**
 * Timestamp mínimo aceito (em segundos). Cookies emitidos antes disso são
 * recusados — útil pra revogar sessões em massa via env var.
 */
function getMinTokenDateSec(): number {
  const raw = process.env.MIN_TOKEN_DATE_SEC;
  if (!raw) return 0;
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

function base64url(buf: Buffer): string {
  return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64urlDecode(s: string): Buffer {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  return Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/") + pad, "base64");
}

function sign(payload: string, key: string): string {
  return base64url(crypto.createHmac("sha256", key).update(payload).digest());
}

export function verifySecret(input: string): boolean {
  const secret = getAdminSecret();
  if (!secret) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(secret);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

/**
 * Cria valor de cookie pra sessão atual (com `iat` agora).
 * Retorna `null` se faltar secret.
 */
export function createSessionCookie(): string | null {
  const key = getSessionSecret();
  if (!key) return null;
  const payload = base64url(Buffer.from(JSON.stringify({ iat: Math.floor(Date.now() / 1000) })));
  const sig = sign(payload, key);
  return `${payload}.${sig}`;
}

/**
 * Valida cookie. Retorna `true` se assinatura confere e `iat` está dentro
 * de `MAX_SESSION_AGE_SEC` e acima de `MIN_TOKEN_DATE_SEC`.
 */
function verifyCookieValue(value: string | undefined): boolean {
  if (!value) return false;
  const key = getSessionSecret();
  if (!key) return false;

  const dot = value.indexOf(".");
  if (dot <= 0 || dot === value.length - 1) return false;
  const payloadB64 = value.slice(0, dot);
  const sigB64 = value.slice(dot + 1);

  const expected = sign(payloadB64, key);
  const a = Buffer.from(sigB64);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  if (!crypto.timingSafeEqual(a, b)) return false;

  let parsed: unknown;
  try {
    parsed = JSON.parse(base64urlDecode(payloadB64).toString("utf8"));
  } catch {
    return false;
  }
  if (!parsed || typeof parsed !== "object") return false;
  const iat = (parsed as { iat?: unknown }).iat;
  if (typeof iat !== "number" || !Number.isFinite(iat)) return false;

  const now = Math.floor(Date.now() / 1000);
  if (iat > now + 60) return false; // skew tolerance
  if (now - iat > MAX_SESSION_AGE_SEC) return false;
  if (iat < getMinTokenDateSec()) return false;

  return true;
}

export async function isAdminFromCookies(): Promise<boolean> {
  const jar = await cookies();
  return verifyCookieValue(jar.get(ADMIN_COOKIE)?.value);
}

export function isAdminFromRequest(req: NextRequest): boolean {
  return verifyCookieValue(req.cookies.get(ADMIN_COOKIE)?.value);
}
