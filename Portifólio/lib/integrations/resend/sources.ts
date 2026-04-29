/**
 * Allowlist de sources por produto.
 *
 * Source = origem do lead dentro do funil (qual form, qual página, qual modal).
 * Padronização ajuda a filtrar nos logs do Resend (Insights → tag `source`)
 * e a segmentar audiences depois.
 *
 * Convenção:
 *   - prefixo curto do produto + underscore + identificador semântico
 *   - tudo lowercase, snake_case
 *   - exemplos: `madureira_home`, `sv_signup`, `kaleidos_blog_post`
 *
 * Fora da allowlist → fallback `<product>_unknown` (ex: `madureira_unknown`).
 */

import type { ResendProduct } from "./config";

export const VALID_SOURCES: Record<ResendProduct, readonly string[]> = {
  madureira: [
    "madureira_newsletter_page",
    "madureira_eu",
    "madureira_home",
    "madureira_footer",
    "madureira_popup",
  ],
  viral: ["sv_signup", "sv_landing", "sv_inapp_notify"],
  kaleidos: [
    "kaleidos_landing",
    "kaleidos_blog_post",
    "kaleidos_contact_form",
  ],
  autoblogger: ["ab_signup", "ab_landing"],
  reels: ["rv_signup", "rv_landing"],
} as const;

/** Prefixo padrão por produto (usado pra `_unknown` fallback e auto-prefix). */
const PRODUCT_PREFIX: Record<ResendProduct, string> = {
  madureira: "madureira",
  viral: "sv",
  kaleidos: "kaleidos",
  autoblogger: "ab",
  reels: "rv",
};

/**
 * Normaliza source vindo do front:
 *   - Se está na allowlist do produto → retorna como veio (lowercase + trim).
 *   - Se já tem o prefixo do produto → mantém (sanitiza chars).
 *   - Caso contrário → `<prefix>_<sanitized>` ou `<prefix>_unknown`.
 *
 * Defensivo: se `raw` não for string ou for vazio, retorna `<prefix>_unknown`.
 */
export function normalizeSource(
  product: ResendProduct,
  raw: unknown,
): string {
  const prefix = PRODUCT_PREFIX[product];
  const fallback = `${prefix}_unknown`;

  if (typeof raw !== "string") return fallback;
  const trimmed = raw.trim().toLowerCase().slice(0, 64);
  if (!trimmed) return fallback;

  const allowed = VALID_SOURCES[product];
  if (allowed.includes(trimmed)) return trimmed;
  if (trimmed.startsWith(`${prefix}_`)) {
    return trimmed.replace(/[^a-z0-9_]/g, "_");
  }
  return `${prefix}_${trimmed.replace(/[^a-z0-9_]/g, "_")}`;
}
