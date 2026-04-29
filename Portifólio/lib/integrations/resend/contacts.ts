/**
 * Resend Contacts wrapper.
 *
 * `addContactToAudience(product, email, source)`:
 *   - Cria contato na Audience configurada do produto.
 *   - Idempotente: trata "already exists" como sucesso.
 *   - Sem API key OU sem audienceId → loga e retorna `{ ok, skipped: true }`.
 *
 * Custom Properties (recomendado, opcional):
 *   Se você criou as Custom Contact Properties no dashboard Resend
 *   (Audiences → Properties), passe `useCustomProperties: true` em `options`.
 *   Sem custom properties, o source vai como prefixo `[source]` em `firstName`
 *   pra ficar visível na lista mesmo sem schema customizado.
 *
 *   Properties sugeridas (criar no dashboard, tipo `text`):
 *     - source       (madureira_home, sv_signup, ...)
 *     - product      (madureira, viral, kaleidos, ...)
 *     - signup_at    (ISO timestamp)
 *     - lead_value   (cold | warm | hot — cold é default)
 */

import { Resend } from "resend";
import { getResendConfig, type ResendProduct } from "./config";

export type ResendResult = {
  ok: boolean;
  skipped?: boolean;
  error?: string;
};

export interface AddContactOptions {
  /** Quando true, envia custom properties no payload (precisa criar no dashboard antes). */
  useCustomProperties?: boolean;
  /** Override manual de lead_value, default `cold`. */
  leadValue?: "cold" | "warm" | "hot";
}

export async function addContactToAudience(
  product: ResendProduct,
  email: string,
  source: string,
  options: AddContactOptions = {},
): Promise<ResendResult> {
  const cfg = getResendConfig(product);

  if (!cfg || !cfg.audienceId) {
    console.log(
      `[resend:${product}:addContactToAudience] sem credenciais, simulando`,
      JSON.stringify({ email, source }),
    );
    return { ok: true, skipped: true };
  }

  const resend = new Resend(cfg.apiKey);

  try {
    const payload: Parameters<typeof resend.contacts.create>[0] = {
      audienceId: cfg.audienceId,
      email,
      firstName: `[${source}]`,
      unsubscribed: false,
    };

    // Custom properties só funcionam se você criou as properties no dashboard
    // (Resend retorna 422 se a property não existir). Por isso é opt-in.
    if (options.useCustomProperties) {
      // O SDK ainda não tipa `properties` formalmente em todas as versões;
      // injetamos via Object.assign pra não brigar com TS.
      Object.assign(payload, {
        properties: {
          source,
          product,
          signup_at: new Date().toISOString(),
          lead_value: options.leadValue ?? "cold",
        },
      });
    }

    const { error } = await resend.contacts.create(payload);

    if (error) {
      const msg = (error as { message?: string }).message || "";
      // Resend retorna "already exists" quando o contato já está na audience.
      if (/already exists/i.test(msg)) {
        return { ok: true };
      }
      console.warn(
        `[resend:${product}:addContactToAudience] erro:`,
        msg,
      );
      return { ok: false, error: msg };
    }

    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn(
      `[resend:${product}:addContactToAudience] exceção:`,
      message,
    );
    return { ok: false, error: message };
  }
}
