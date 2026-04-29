/**
 * Resend multi-product integration — index / barrel.
 *
 * ┌────────────────────────────────────────────────────────────────────────┐
 * │ SOURCE OF TRUTH                                                        │
 * │                                                                        │
 * │ Esse pacote é a "source of truth" pro integration Resend de TODOS os   │
 * │ projetos do Gabriel. Quando atualizar aqui, copiar a pasta inteira     │
 * │ pra:                                                                   │
 * │                                                                        │
 * │   - code/sequencia-viral/lib/integrations/resend/                      │
 * │   - code/autoblogger/lib/integrations/resend/                          │
 * │   - code/reels-viral/lib/integrations/resend/                          │
 * │   - code/site-kaleidos/lib/integrations/resend/  (quando tiver form)   │
 * │                                                                        │
 * │ Em cada cópia, NÃO é preciso trocar nada — o `getResendConfig(product)`│
 * │ resolve via env vars. Só passar `product: 'viral' | 'autoblogger' | …` │
 * │ no caller de cada projeto.                                             │
 * │                                                                        │
 * │ Quando virar monorepo, mover esse pacote pra `packages/resend/`.       │
 * └────────────────────────────────────────────────────────────────────────┘
 *
 * USO BÁSICO:
 *
 *   import {
 *     addContactToAudience,
 *     sendWelcomeEmail,
 *     notifyOwner,
 *     normalizeSource,
 *   } from "@/lib/integrations/resend";
 *
 *   const source = normalizeSource("madureira", body.source);
 *   await Promise.allSettled([
 *     addContactToAudience("madureira", email, source),
 *     sendWelcomeEmail("madureira", email, source),
 *     notifyOwner("madureira", email, source),
 *   ]);
 *
 * ENV VARS NECESSÁRIAS (ver `.env.example`):
 *
 *   RESEND_API_KEY                        (compartilhada, default)
 *   RESEND_<PRODUCT>_API_KEY              (override por produto, opcional)
 *   RESEND_<PRODUCT>_AUDIENCE_ID          (UUID do dashboard Resend)
 *   RESEND_<PRODUCT>_FROM_EMAIL           (remetente, domínio verificado)
 *   OWNER_EMAIL                           (destino das notify_owner)
 */

export { getResendConfig, isAudienceConfigured } from "./config";
export type { ResendConfig, ResendProduct } from "./config";

export { VALID_SOURCES, normalizeSource } from "./sources";

export { addContactToAudience } from "./contacts";
export type { ResendResult, AddContactOptions } from "./contacts";

export { sendWelcomeEmail, notifyOwner } from "./emails";
