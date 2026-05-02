/**
 * Emails específicos da newsletter (Madureira):
 *
 *   - sendConfirmationEmail(email, token)
 *       → double opt-in. Manda email com link `/api/newsletter/confirm?token=...`
 *
 *   - sendNewsletterBlast(post, subscribers)
 *       → dispara post pra todos os subscribers confirmados (Resend batch).
 *
 * Reaproveita config do `lib/integrations/resend` (product: 'madureira').
 */

import { Resend } from "resend";
import { getResendConfig } from "@/lib/integrations/resend";
import { marked } from "marked";
import type { Newsletter, Subscriber } from "@/lib/db/newsletter";

const PRODUCT = "madureira" as const;

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXT_PUBLIC_PORTFOLIO_URL ||
    "https://madureira.xyz"
  );
}

// ----------------------------------------------------------------------------
// Confirmation (double opt-in)
// ----------------------------------------------------------------------------

export async function sendConfirmationEmail(
  email: string,
  confirmationToken: string,
): Promise<{ ok: boolean; skipped?: boolean; error?: string }> {
  const cfg = getResendConfig(PRODUCT);
  if (!cfg) {
    console.log(
      "[newsletter:confirm] sem credenciais Resend, simulando.",
      email,
    );
    return { ok: true, skipped: true };
  }

  const url = `${getBaseUrl()}/api/newsletter/confirm?token=${encodeURIComponent(confirmationToken)}`;

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <title>Confirme sua inscrição</title>
  </head>
  <body style="margin:0;padding:0;background:#0a0a0a;color:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#0a0a0a;padding:40px 16px;">
      <tr><td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;background:#111;border:1px solid #222;border-radius:12px;padding:32px;">
          <tr><td>
            <h1 style="margin:0 0 12px 0;font-size:24px;color:#fff;font-weight:700;">Confirme seu email</h1>
            <p style="margin:0 0 24px 0;font-size:16px;line-height:1.6;color:#ccc;">
              Clica no botão abaixo pra confirmar a inscrição na newsletter do Madureira.
              Sem confirmar, você não vai receber nada.
            </p>
            <p style="margin:0 0 24px 0;">
              <a href="${url}" style="display:inline-block;background:#fff;color:#0a0a0a;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600;">Confirmar inscrição</a>
            </p>
            <p style="margin:0;font-size:13px;color:#888;line-height:1.5;">
              Se o botão não abrir, cola esse link no navegador:<br/>
              <span style="color:#aaa;word-break:break-all;">${escapeHtml(url)}</span>
            </p>
            <p style="margin:24px 0 0 0;border-top:1px solid #222;padding-top:16px;font-size:13px;color:#666;">
              Não foi você? Ignora esse email — sem clique, nada acontece.
            </p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;

  try {
    const resend = new Resend(cfg.apiKey);
    const { error } = await resend.emails.send({
      from: cfg.fromEmail,
      to: email,
      subject: "Confirme sua inscrição — Madureira",
      html,
      tags: [
        { name: "type", value: "confirmation" },
        { name: "product", value: PRODUCT },
      ],
    });
    if (error) {
      const msg = (error as { message?: string }).message || "";
      console.warn("[newsletter:confirm] erro:", msg);
      return { ok: false, error: msg };
    }
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, error: message };
  }
}

// ----------------------------------------------------------------------------
// Newsletter blast
// ----------------------------------------------------------------------------

interface BlastResult {
  ok: boolean;
  sent: number;
  failed: number;
  skipped?: boolean;
  error?: string;
  domainWarning?: string;
}

function renderNewsletterHtml(
  post: Newsletter,
  unsubscribeUrl: string,
  webUrl: string,
): string {
  const bodyHtml = marked.parse(post.content_md, { async: false }) as string;
  const heroImg = post.hero_image_url
    ? `<tr><td style="padding:0 0 24px 0;">
         <img src="${post.hero_image_url}" alt="${escapeHtml(post.title)}" style="width:100%;border-radius:8px;display:block;" />
       </td></tr>`
    : "";

  return `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <title>${escapeHtml(post.title)}</title>
    <style>
      .nl-body h1, .nl-body h2 { color: #fff; margin: 24px 0 12px 0; line-height: 1.3; }
      .nl-body h2 { font-size: 22px; }
      .nl-body h3 { color: #fff; margin: 20px 0 10px 0; font-size: 18px; }
      .nl-body p { margin: 0 0 16px 0; color: #d0d0d0; line-height: 1.7; font-size: 16px; }
      .nl-body a { color: #fff; text-decoration: underline; }
      .nl-body strong { color: #fff; }
      .nl-body code { background: #1a1a1a; padding: 2px 6px; border-radius: 4px; font-family: ui-monospace, Menlo, monospace; font-size: 14px; color: #f0f0f0; }
      .nl-body pre { background: #1a1a1a; padding: 16px; border-radius: 8px; overflow-x: auto; }
      .nl-body pre code { background: transparent; padding: 0; }
      .nl-body ul, .nl-body ol { padding-left: 24px; color: #d0d0d0; }
      .nl-body li { margin-bottom: 8px; line-height: 1.7; }
      .nl-body blockquote { border-left: 3px solid #444; padding-left: 16px; margin: 16px 0; color: #aaa; font-style: italic; }
      .nl-body img { max-width: 100%; border-radius: 8px; margin: 16px 0; }
    </style>
  </head>
  <body style="margin:0;padding:0;background:#0a0a0a;color:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#0a0a0a;padding:40px 16px;">
      <tr><td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:640px;background:#111;border:1px solid #222;border-radius:12px;padding:32px;">
          <tr><td style="padding:0 0 16px 0;border-bottom:1px solid #222;">
            <p style="margin:0;font-size:13px;color:#888;letter-spacing:0.05em;text-transform:uppercase;">Newsletter do Madureira</p>
            <h1 style="margin:8px 0 0 0;font-size:30px;line-height:1.25;color:#fff;font-weight:700;">${escapeHtml(post.title)}</h1>
          </td></tr>
          ${heroImg}
          <tr><td class="nl-body" style="padding:8px 0 0 0;font-size:16px;line-height:1.7;color:#d0d0d0;">
            ${bodyHtml}
          </td></tr>
          <tr><td style="padding:32px 0 0 0;border-top:1px solid #222;margin-top:32px;">
            <p style="margin:24px 0 0 0;font-size:14px;color:#888;line-height:1.6;">
              Recebeu por engano? <a href="${unsubscribeUrl}" style="color:#aaa;">Cancela aqui</a> · <a href="${webUrl}" style="color:#aaa;">Ler no site</a>
            </p>
            <p style="margin:8px 0 0 0;font-size:13px;color:#666;">— Gabriel Madureira</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

export async function sendNewsletterBlast(
  post: Newsletter,
  subscribers: Subscriber[],
): Promise<BlastResult> {
  const cfg = getResendConfig(PRODUCT);
  if (!cfg) {
    console.log(
      "[newsletter:blast] sem credenciais Resend, simulando.",
      JSON.stringify({ slug: post.slug, recipients: subscribers.length }),
    );
    return { ok: true, sent: 0, failed: 0, skipped: true };
  }

  if (subscribers.length === 0) {
    return { ok: true, sent: 0, failed: 0 };
  }

  const resend = new Resend(cfg.apiKey);
  const baseUrl = getBaseUrl();
  const webUrl = `${baseUrl}/newsletter/${post.slug}`;
  const subject = post.title;

  // Verifica domain ANTES (warning, não bloqueia — Resend já erra de qualquer forma se não tiver)
  let domainWarning: string | undefined;
  const fromMatch = cfg.fromEmail.match(/<([^>]+)>|^([^\s<]+@[^\s>]+)$/);
  const fromAddress = fromMatch?.[1] || fromMatch?.[2] || cfg.fromEmail;
  const fromDomain = fromAddress.split("@")[1];
  if (fromDomain) {
    try {
      // ResendSDK não expõe domains.list em todas as versões; tentamos best-effort
      const domains = await (resend as unknown as {
        domains: { list: () => Promise<{ data?: { data?: { name: string; status: string }[] } }> };
      }).domains.list();
      const list = domains?.data?.data || [];
      const found = list.find((d) => d.name === fromDomain);
      if (!found) {
        domainWarning = `Domínio ${fromDomain} não existe no Resend dashboard. Adicione e verifique antes de enviar.`;
      } else if (found.status !== "verified") {
        domainWarning = `Domínio ${fromDomain} status=${found.status}. Verifique no dashboard.`;
      }
    } catch {
      // Best-effort: se falhar listar, segue
    }
  }

  // Send em batches de 100 (limite Resend batch)
  const BATCH_SIZE = 100;
  let sent = 0;
  let failed = 0;
  const errors: string[] = [];

  for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
    const chunk = subscribers.slice(i, i + BATCH_SIZE);
    const payload = chunk.map((sub) => {
      const unsubUrl = sub.unsubscribe_token
        ? `${baseUrl}/api/newsletter/unsubscribe?token=${encodeURIComponent(sub.unsubscribe_token)}`
        : `${baseUrl}/newsletter`;
      return {
        from: cfg.fromEmail,
        to: [sub.email],
        subject,
        html: renderNewsletterHtml(post, unsubUrl, webUrl),
        headers: {
          "List-Unsubscribe": `<${unsubUrl}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
        tags: [
          { name: "type", value: "newsletter" },
          { name: "product", value: PRODUCT },
          { name: "slug", value: post.slug.slice(0, 40) },
        ],
      };
    });

    try {
      const result = await resend.batch.send(payload);
      if (result.error) {
        const msg = (result.error as { message?: string }).message || "batch error";
        errors.push(msg);
        failed += chunk.length;
      } else {
        sent += chunk.length;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      errors.push(message);
      failed += chunk.length;
    }
  }

  return {
    ok: failed === 0,
    sent,
    failed,
    domainWarning,
    error: errors.length ? errors.slice(0, 3).join("; ") : undefined,
  };
}
