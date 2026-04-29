/**
 * Resend transactional emails — multi-product.
 *
 * Exporta:
 *   - sendWelcomeEmail(product, email, source)
 *   - notifyOwner(product, leadEmail, source)
 *
 * Cada produto tem sua copy de welcome (PT-BR, tom direto). Owner notification
 * é o mesmo padrão pra todos: `[<Produto>] Novo lead`.
 *
 * Tags Resend (filtragem em Insights):
 *   - type: welcome | owner_notification
 *   - source: ex `madureira_home`
 *   - product: ex `madureira`
 */

import { Resend } from "resend";
import { getResendConfig, type ResendProduct } from "./config";
import type { ResendResult } from "./contacts";

function brTimestamp(date = new Date()): string {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    dateStyle: "short",
    timeStyle: "medium",
  }).format(date);
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

interface WelcomeContent {
  subject: string;
  /** Title aparece em <h1> dentro do template. */
  title: string;
  /** Subtitle abaixo do título. */
  subtitle: string;
  /** Bloco principal (HTML inline permitido). */
  body: string;
  /** Linha de assinatura. */
  signature: string;
  /** Link CTA opcional (texto exibido fica em `body`, esse é só href). */
  ctaHref?: string;
  ctaLabel?: string;
}

const WELCOME_COPY: Record<ResendProduct, WelcomeContent> = {
  madureira: {
    subject: "Tá feito. Bem-vindo.",
    title: "Prazer, Gabriel Madureira.",
    subtitle: "Você está dentro.",
    body: `Sou fundador da <strong>Kaleidos</strong>, agência de marketing digital com foco em cripto, web3 e fintech. Construo produtos digitais e sistemas que integram <strong>IA na operação real</strong> de agências, SaaS e founders — automações, agentes, pipelines de conteúdo, growth.<br/><br/>Em breve começo a mandar emails por aqui — bastidores do que tô construindo, IA aplicada na prática, sem hype.<br/><br/>Se já quiser puxar papo, falar de algum projeto ou só trocar ideia: <a href="https://wa.me/5512997796835?text=Vim%20da%20newsletter%20-%20gostaria%20de%20conversar" style="color:#fff;text-decoration:underline;">manda um whats</a>.`,
    signature: "— Gabriel Madureira",
  },
  viral: {
    subject: "Bem-vindo ao Sequência Viral.",
    title: "Você está dentro.",
    subtitle: "Hora de gerar seu primeiro carrossel.",
    body: `O Sequência Viral transforma uma ideia simples em <strong>carrossel completo</strong> — copy, voz e imagem geradas em segundos.<br/><br/>Bora começar? Cole um link, descreva uma ideia, ou cole um texto. Em 30 segundos você tem 8 slides prontos pra publicar.`,
    ctaHref: "https://viral.kaleidos.com.br",
    ctaLabel: "Gerar primeiro carrossel",
    signature: "— Time Sequência Viral",
  },
  kaleidos: {
    subject: "Obrigado por entrar em contato com a Kaleidos.",
    title: "Recebido.",
    subtitle: "A gente te responde em até 24h úteis.",
    body: `A Kaleidos é uma agência de marketing digital especializada em <strong>cripto, web3 e fintech</strong>. Conteúdo, performance e branding feitos pra escalar.<br/><br/>Enquanto isso, dá uma olhada nos cases recentes em <a href="https://kaleidos.com.br" style="color:#fff;text-decoration:underline;">kaleidos.com.br</a>.`,
    signature: "— Time Kaleidos",
  },
  autoblogger: {
    subject: "Bem-vindo ao AutoBlogger.",
    title: "Conta criada.",
    subtitle: "Hora de gerar seu primeiro artigo.",
    body: `O AutoBlogger gera artigos otimizados pra SEO em segundos. <strong>Cole um tópico, escolha o tom, publique.</strong><br/><br/>Você tem créditos grátis pra testar. Bora?`,
    ctaHref: "https://autoblogger.dev/gerar",
    ctaLabel: "Gerar primeiro artigo",
    signature: "— Time AutoBlogger",
  },
  reels: {
    subject: "Bem-vindo ao Reels Viral.",
    title: "Tá dentro.",
    subtitle: "Hora de decifrar seu primeiro reel.",
    body: `O Reels Viral analisa qualquer reel do Instagram e devolve <strong>análise, roteiro e storyboard cena a cena</strong>. Cole o link, espera 30s, copia o roteiro.<br/><br/>Bora começar?`,
    ctaHref: "https://reels-viral.vercel.app",
    ctaLabel: "Analisar primeiro reel",
    signature: "— Time Reels Viral",
  },
};

const OWNER_SUBJECT_PREFIX: Record<ResendProduct, string> = {
  madureira: "[Madureira] Novo lead da newsletter",
  viral: "[Sequência Viral] Novo lead",
  kaleidos: "[Kaleidos] Novo lead",
  autoblogger: "[AutoBlogger] Novo lead",
  reels: "[Reels Viral] Novo lead",
};

function renderWelcomeHtml(content: WelcomeContent): string {
  const cta =
    content.ctaHref && content.ctaLabel
      ? `<tr><td style="padding:16px 0 0 0;">
          <a href="${content.ctaHref}" style="display:inline-block;background:#fff;color:#0a0a0a;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600;">${content.ctaLabel}</a>
        </td></tr>`
      : "";

  return `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${escapeHtml(content.subject)}</title>
  </head>
  <body style="margin:0;padding:0;background:#0a0a0a;color:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#0a0a0a;padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;background:#111;border:1px solid #222;border-radius:12px;padding:32px;">
            <tr>
              <td style="padding:0 0 24px 0;">
                <h1 style="margin:0;font-size:28px;line-height:1.2;color:#fff;font-weight:700;">${escapeHtml(content.title)}</h1>
                <p style="margin:8px 0 0 0;font-size:14px;color:#888;">${escapeHtml(content.subtitle)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 0 16px 0;font-size:16px;line-height:1.6;color:#e5e5e5;">
                ${content.body}
              </td>
            </tr>
            ${cta}
            <tr>
              <td style="padding:24px 0 0 0;border-top:1px solid #222;font-size:14px;color:#888;">
                ${escapeHtml(content.signature)}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function sendWelcomeEmail(
  product: ResendProduct,
  email: string,
  source: string,
): Promise<ResendResult> {
  const cfg = getResendConfig(product);
  if (!cfg) {
    console.log(
      `[resend:${product}:sendWelcomeEmail] sem credenciais, simulando`,
      JSON.stringify({ email, source }),
    );
    return { ok: true, skipped: true };
  }

  const content = WELCOME_COPY[product];
  const html = renderWelcomeHtml(content);
  const resend = new Resend(cfg.apiKey);

  try {
    const { error } = await resend.emails.send({
      from: cfg.fromEmail,
      to: email,
      subject: content.subject,
      html,
      tags: [
        { name: "type", value: "welcome" },
        { name: "source", value: source },
        { name: "product", value: product },
      ],
    });

    if (error) {
      const msg = (error as { message?: string }).message || "";
      console.warn(`[resend:${product}:sendWelcomeEmail] erro:`, msg);
      return { ok: false, error: msg };
    }

    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn(`[resend:${product}:sendWelcomeEmail] exceção:`, message);
    return { ok: false, error: message };
  }
}

export async function notifyOwner(
  product: ResendProduct,
  leadEmail: string,
  source: string,
): Promise<ResendResult> {
  const cfg = getResendConfig(product);
  if (!cfg) {
    console.log(
      `[resend:${product}:notifyOwner] sem credenciais, simulando`,
      JSON.stringify({ leadEmail, source, owner: "(env OWNER_EMAIL)" }),
    );
    return { ok: true, skipped: true };
  }

  const ts = brTimestamp();
  const text = `Email: ${leadEmail}\nSource: ${source}\nProduct: ${product}\nHora: ${ts}\n`;
  const html = `<pre style="font-family:ui-monospace,Menlo,monospace;font-size:14px;line-height:1.6;color:#111;">Email: ${escapeHtml(
    leadEmail,
  )}
Source: ${escapeHtml(source)}
Product: ${escapeHtml(product)}
Hora: ${escapeHtml(ts)}</pre>`;

  const resend = new Resend(cfg.apiKey);

  try {
    const { error } = await resend.emails.send({
      from: cfg.fromEmail,
      to: cfg.ownerEmail,
      subject: OWNER_SUBJECT_PREFIX[product],
      text,
      html,
      tags: [
        { name: "type", value: "owner_notification" },
        { name: "source", value: source },
        { name: "product", value: product },
      ],
    });

    if (error) {
      const msg = (error as { message?: string }).message || "";
      console.warn(`[resend:${product}:notifyOwner] erro:`, msg);
      return { ok: false, error: msg };
    }

    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn(`[resend:${product}:notifyOwner] exceção:`, message);
    return { ok: false, error: message };
  }
}
