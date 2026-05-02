/**
 * Admin auth helper para `/admin/newsletter`.
 *
 * Estratégia simples e suficiente pra single-user:
 *   - Cookie `madureira_admin` = SHA256(ADMIN_SECRET)
 *   - Login via `POST /api/admin/login` com `{ secret }` (compara constant-time)
 *
 * Não usa NextAuth/Clerk porque é só Gabriel acessando.
 */

import crypto from "node:crypto";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export const ADMIN_COOKIE = "madureira_admin";

export function getAdminSecret(): string | null {
  return process.env.ADMIN_SECRET || null;
}

export function hashSecret(secret: string): string {
  return crypto.createHash("sha256").update(secret).digest("hex");
}

export function verifySecret(input: string): boolean {
  const secret = getAdminSecret();
  if (!secret) return false;
  // Constant-time compare
  const a = Buffer.from(hashSecret(input));
  const b = Buffer.from(hashSecret(secret));
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function expectedCookieValue(): string | null {
  const secret = getAdminSecret();
  if (!secret) return null;
  return hashSecret(secret);
}

export async function isAdminFromCookies(): Promise<boolean> {
  const expected = expectedCookieValue();
  if (!expected) return false;
  const jar = await cookies();
  const got = jar.get(ADMIN_COOKIE)?.value;
  return Boolean(got && got === expected);
}

export function isAdminFromRequest(req: NextRequest): boolean {
  const expected = expectedCookieValue();
  if (!expected) return false;
  const got = req.cookies.get(ADMIN_COOKIE)?.value;
  return Boolean(got && got === expected);
}
