/**
 * Resend multi-product config resolver.
 *
 * Resolve as variáveis de ambiente certas para cada "product" (madureira,
 * viral, kaleidos, autoblogger, reels). Cada projeto tem sua própria Audience,
 * remetente e (opcionalmente) API key dedicada.
 *
 * Resolução de API key (precedência):
 *   1. RESEND_<PRODUCT>_API_KEY (override por produto)
 *   2. RESEND_API_KEY (compartilhada, default)
 *
 * Resolução de Audience ID:
 *   - RESEND_<PRODUCT>_AUDIENCE_ID (obrigatório por produto)
 *
 * Resolução de From email:
 *   - RESEND_<PRODUCT>_FROM_EMAIL (obrigatório por produto)
 *   - Fallback hardcoded de cada produto (domínio precisa estar verificado).
 *
 * OWNER_EMAIL é compartilhado entre todos os produtos (dono = Gabriel).
 *
 * Retorna `null` quando faltar API key — caller faz fallback para log/no-op.
 */

export type ResendProduct =
  | "madureira"
  | "viral"
  | "kaleidos"
  | "autoblogger"
  | "reels";

export interface ResendConfig {
  apiKey: string;
  audienceId: string;
  fromEmail: string;
  ownerEmail: string;
  product: ResendProduct;
}

/** Defaults de from-email caso a env var específica não esteja setada. */
const DEFAULT_FROM_EMAIL: Record<ResendProduct, string> = {
  madureira: "Madureira <noreply@madureira.xyz>",
  viral: "Sequência Viral <noreply@viral.kaleidos.com.br>",
  kaleidos: "Kaleidos <noreply@kaleidos.com.br>",
  autoblogger: "AutoBlogger <noreply@autoblogger.dev>",
  reels: "Reels Viral <noreply@reels-viral.com>",
};

/** Mapeia o produto para a env var prefixada (ex: madureira → MADUREIRA). */
function envPrefix(product: ResendProduct): string {
  return product.toUpperCase();
}

/**
 * Lê env vars e devolve config validada para um produto.
 * Retorna `null` se não houver API key resolvível (modo "skipped").
 */
export function getResendConfig(product: ResendProduct): ResendConfig | null {
  const prefix = envPrefix(product);

  const productKey = process.env[`RESEND_${prefix}_API_KEY`] || "";
  const sharedKey = process.env.RESEND_API_KEY || "";
  const apiKey = productKey || sharedKey;

  if (!apiKey) return null;

  const audienceId = process.env[`RESEND_${prefix}_AUDIENCE_ID`] || "";
  const fromEmail =
    process.env[`RESEND_${prefix}_FROM_EMAIL`] || DEFAULT_FROM_EMAIL[product];
  const ownerEmail = process.env.OWNER_EMAIL || "gf.madureiraa@gmail.com";

  return {
    apiKey,
    audienceId,
    fromEmail,
    ownerEmail,
    product,
  };
}

/**
 * Helper booleano: produto está configurado o bastante pra Audience writes?
 * (precisa de API key + audienceId)
 */
export function isAudienceConfigured(product: ResendProduct): boolean {
  const cfg = getResendConfig(product);
  return Boolean(cfg && cfg.audienceId);
}
