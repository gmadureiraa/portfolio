/**
 * /api/lead — Captura de lead da LP de consultoria (`/lp` e `/consultoria`).
 *
 * Fluxo:
 *   1. Valida payload (name + contact obrigatórios; teamSize + bottleneck opcionais).
 *   2. Rate-limit por IP (5 req / 10min) reutilizando lib/rate-limit.
 *   3. Se contact for e-mail válido → cadastra na audience Resend `madureira`.
 *   4. Notifica Gabriel via Resend (e-mail rico com todos os dados + link
 *      WhatsApp pré-preenchido pra responder).
 *   5. Devolve `{ ok: true, waUrl }` pro client abrir o WhatsApp em paralelo.
 *
 * Sem credenciais Resend? `addContactToAudience`/`notifyOwner` retornam
 * `{ ok: true, skipped: true }` — request continua passando, log no server.
 *
 * Env vars necessárias (setar no Vercel):
 *   - RESEND_API_KEY                 (compartilhada)
 *   - RESEND_MADUREIRA_AUDIENCE_ID   (UUID dashboard Resend)
 *   - RESEND_MADUREIRA_FROM_EMAIL    (default: noreply@madureira.xyz)
 *   - OWNER_EMAIL                    (default: gf.madureiraa@gmail.com)
 *   - MADUREIRA_PHONE_DIGITS         (default: lib/constants profile.whatsapp)
 */

import { NextRequest } from "next/server";
import { Resend } from "resend";
import {
  addContactToAudience,
  getResendConfig,
} from "@/lib/integrations/resend";
import { profile } from "@/lib/constants";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function brTimestamp(date = new Date()): string {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    dateStyle: "short",
    timeStyle: "medium",
  }).format(date);
}

interface LeadPayload {
  name: string;
  contact: string;
  teamSize?: string;
  bottleneck?: string;
  source?: string;
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const limit = await rateLimit("consultoria-lead", ip, 5, 60 * 10);
  if (!limit.ok) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "Muitos pedidos. Tenta de novo daqui a pouco.",
      }),
      {
        status: 429,
        headers: { "Content-Type": "application/json", "Retry-After": "600" },
      },
    );
  }

  const body = (await request.json().catch(() => ({}))) as Partial<LeadPayload>;
  const name = (body.name || "").trim().slice(0, 120);
  const contact = (body.contact || "").trim().slice(0, 200);
  const teamSize = (body.teamSize || "").trim().slice(0, 40);
  const bottleneck = (body.bottleneck || "").trim().slice(0, 1000);
  const source = (body.source || "madureira_consultoria").trim().slice(0, 60);

  if (name.length < 2 || contact.length < 4) {
    return new Response(
      JSON.stringify({ ok: false, error: "Nome e contato são obrigatórios." }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const isEmail = EMAIL_REGEX.test(contact);
  const phoneDigits =
    process.env.MADUREIRA_PHONE_DIGITS || profile.whatsapp || "";

  // Mensagem WhatsApp que o client vai abrir em paralelo (já preenchida).
  const waText =
    `Olá Gabriel! Vim do site (madureira.xyz/lp).\n\n` +
    `Nome: ${name}\n` +
    `Contato: ${contact}\n` +
    (teamSize ? `Time: ${teamSize}\n` : "") +
    (bottleneck ? `Gargalo: ${bottleneck}\n` : "");
  const waUrl = phoneDigits
    ? `https://wa.me/${phoneDigits}?text=${encodeURIComponent(waText)}`
    : "";

  // 1. Cadastra na audience Resend (só se for e-mail válido).
  if (isEmail) {
    await addContactToAudience("madureira", contact, source).catch(() => null);
  }

  // 2. Notifica Gabriel com payload completo via Resend.
  const cfg = getResendConfig("madureira");
  if (cfg) {
    try {
      const resend = new Resend(cfg.apiKey);
      const ts = brTimestamp();
      const replyWaText = `Olá ${name}! Vi que você preencheu o form da LP. Bora conversar?`;
      const replyWaUrl = phoneDigits
        ? `https://wa.me/${phoneDigits}?text=${encodeURIComponent(replyWaText)}`
        : "";

      const html = `<!DOCTYPE html>
<html lang="pt-BR">
  <head><meta charset="utf-8"/></head>
  <body style="margin:0;padding:0;background:#0a0a0a;color:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#0a0a0a;padding:40px 16px;">
      <tr><td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;background:#111;border:1px solid #222;border-radius:12px;padding:32px;">
          <tr><td style="padding:0 0 16px 0;">
            <p style="margin:0;font-family:ui-monospace,Menlo,monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#10b981;">Novo lead · LP /lp</p>
            <h1 style="margin:8px 0 0 0;font-size:24px;line-height:1.2;color:#fff;font-weight:700;">${escapeHtml(name)}</h1>
          </td></tr>
          <tr><td style="padding:0 0 16px 0;font-size:15px;line-height:1.7;color:#e5e5e5;">
            <p style="margin:0 0 6px 0;"><strong>Contato:</strong> ${escapeHtml(contact)}${isEmail ? " · email" : " · whatsapp/outro"}</p>
            ${teamSize ? `<p style="margin:0 0 6px 0;"><strong>Time:</strong> ${escapeHtml(teamSize)}</p>` : ""}
            ${bottleneck ? `<p style="margin:0 0 6px 0;"><strong>Gargalo:</strong></p><p style="margin:0 0 6px 0;padding:12px;background:#0a0a0a;border:1px solid #222;border-radius:8px;color:#d4d4d4;">${escapeHtml(bottleneck)}</p>` : ""}
            <p style="margin:12px 0 0 0;color:#888;font-size:13px;">${escapeHtml(ts)} · IP ${escapeHtml(ip)}</p>
          </td></tr>
          ${
            replyWaUrl
              ? `<tr><td style="padding:16px 0 0 0;">
                  <a href="${replyWaUrl}" style="display:inline-block;background:#10b981;color:#0a0a0a;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600;">Responder no WhatsApp</a>
                </td></tr>`
              : ""
          }
        </table>
      </td></tr>
    </table>
  </body>
</html>`;

      await resend.emails.send({
        from: cfg.fromEmail,
        to: cfg.ownerEmail,
        replyTo: isEmail ? contact : undefined,
        subject: `[Madureira] Lead consultoria: ${name}`,
        html,
        tags: [
          { name: "type", value: "lead_notification" },
          { name: "source", value: source },
          { name: "product", value: "madureira" },
        ],
      });
    } catch (err) {
      console.warn("[api/lead] notifyOwner exceção:", err);
    }
  } else {
    console.log("[api/lead] sem credenciais Resend, lead recebido:", {
      name,
      contact,
      teamSize,
      bottleneck: bottleneck.slice(0, 80),
      source,
    });
  }

  return new Response(JSON.stringify({ ok: true, waUrl }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
