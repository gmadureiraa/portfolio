/**
 * Wrapper Resend legado — agora delega para `lib/integrations/resend/`.
 *
 * Esse arquivo existe pra MANTER COMPATIBILIDADE com `app/api/newsletter/subscribe/route.ts`
 * e qualquer outro caller que importe `@/lib/server/resend`. Toda a lógica nova
 * vive em `lib/integrations/resend/` (multi-produto), e aqui apenas fixamos
 * `product: 'madureira'` no caller.
 *
 * A API exportada continua a mesma:
 *   - addContactToAudience(email, source)
 *   - sendWelcomeEmail(email, source)
 *   - notifyOwner(leadEmail, source)
 *
 * Migração futura: trocar imports diretamente pra `@/lib/integrations/resend`
 * passando `product: 'madureira'` explicitamente, e remover este arquivo.
 *
 * ENV vars usadas (resolvidas em `lib/integrations/resend/config.ts`):
 *   RESEND_API_KEY                       — chave compartilhada (default)
 *   RESEND_MADUREIRA_API_KEY             — override por produto (opcional)
 *   RESEND_MADUREIRA_AUDIENCE_ID         — UUID da Audience
 *   RESEND_MADUREIRA_FROM_EMAIL          — remetente verificado
 *   OWNER_EMAIL                          — destino notify_owner
 *
 * Compat com env vars antigas (mantidas como fallback no resolver):
 *   RESEND_AUDIENCE_ID                   — DEPRECATED, use RESEND_MADUREIRA_AUDIENCE_ID
 *   RESEND_FROM_EMAIL                    — DEPRECATED, use RESEND_MADUREIRA_FROM_EMAIL
 */

import {
  addContactToAudience as addContactToAudienceImpl,
  sendWelcomeEmail as sendWelcomeEmailImpl,
  notifyOwner as notifyOwnerImpl,
  type ResendResult,
} from "@/lib/integrations/resend";

// Compat: se ninguém setou as env vars novas mas tem as antigas, propaga.
// Isso roda 1x no boot do módulo. Não-destrutivo: só seta se vazio.
if (!process.env.RESEND_MADUREIRA_AUDIENCE_ID && process.env.RESEND_AUDIENCE_ID) {
  process.env.RESEND_MADUREIRA_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;
}
if (!process.env.RESEND_MADUREIRA_FROM_EMAIL && process.env.RESEND_FROM_EMAIL) {
  process.env.RESEND_MADUREIRA_FROM_EMAIL = process.env.RESEND_FROM_EMAIL;
}

export type { ResendResult };

export async function addContactToAudience(
  email: string,
  source: string,
): Promise<ResendResult> {
  return addContactToAudienceImpl("madureira", email, source);
}

export async function sendWelcomeEmail(
  email: string,
  source: string,
): Promise<ResendResult> {
  return sendWelcomeEmailImpl("madureira", email, source);
}

export async function notifyOwner(
  leadEmail: string,
  source: string,
): Promise<ResendResult> {
  return notifyOwnerImpl("madureira", leadEmail, source);
}
