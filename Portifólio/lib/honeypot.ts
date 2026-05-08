/**
 * Honeypot anti-bot helper.
 *
 * Forms públicos incluem um campo `_hp` invisível (display:none ou
 * absolute:offscreen). Usuário humano não preenche, bot scraper preenche
 * tudo automaticamente. Servidor checa: se vier preenchido, retorna 200
 * silencioso (NÃO 400) pra não dar feedback ao bot de que detectamos.
 *
 * Uso server-side:
 *   if (isBot(body)) return silentSuccess();
 */

export const HONEYPOT_FIELD = "_hp";

/**
 * Checa se um body de form contém o campo honeypot preenchido.
 * Retorna true se for bot (campo veio com valor não-vazio).
 */
export function isBot(body: unknown): boolean {
  if (!body || typeof body !== "object") return false;
  const raw = (body as Record<string, unknown>)[HONEYPOT_FIELD];
  if (raw === undefined || raw === null) return false;
  if (typeof raw === "string") return raw.trim().length > 0;
  // Qualquer outro tipo preenchido = bot bobo serializando objeto
  return true;
}

/**
 * Resposta 200 falsa pra bots — finge que deu certo, sem efeito real.
 * Mantém atacante no escuro sobre a detecção.
 */
export function silentSuccess(extras: Record<string, unknown> = {}) {
  return new Response(JSON.stringify({ ok: true, ...extras }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
