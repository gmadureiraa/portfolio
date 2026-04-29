import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { newsletterSchema } from "@/lib/schema";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import {
  addContactToAudience,
  sendWelcomeEmail,
  notifyOwner,
} from "@/lib/server/resend";

const KV_URL =
  process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "";
const KV_TOKEN =
  process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";

const IS_CONFIGURED = Boolean(KV_URL && KV_TOKEN);

const redis = IS_CONFIGURED
  ? new Redis({ url: KV_URL, token: KV_TOKEN })
  : null;

// Hash set keeps O(1) "already subscribed" lookups even at 100k+ inscritos.
const EMAIL_SET_KEY = "newsletter:emails:set";

// Sources permitidos vindos do front. Qualquer string fora disso vira default.
const ALLOWED_SOURCES = new Set([
  "madureira_newsletter_page",
  "madureira_eu",
  "madureira_home",
  "madureira_footer",
  "madureira_popup",
]);
const DEFAULT_SOURCE = "madureira_unknown";

function normalizeSource(raw: unknown): string {
  if (typeof raw !== "string") return DEFAULT_SOURCE;
  const trimmed = raw.trim().toLowerCase().slice(0, 64);
  if (!trimmed) return DEFAULT_SOURCE;
  // Aceita conhecidos diretos. Senão, prefixa "madureira_" se ainda não tiver.
  if (ALLOWED_SOURCES.has(trimmed)) return trimmed;
  if (trimmed.startsWith("madureira_")) return trimmed;
  return `madureira_${trimmed.replace(/[^a-z0-9_]/g, "_")}`;
}

async function fanoutResend(email: string, source: string) {
  // Fire-and-forget: nunca bloqueia a resposta. Erros viram log.
  await Promise.allSettled([
    addContactToAudience(email, source),
    sendWelcomeEmail(email, source),
    notifyOwner(email, source),
  ]);
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const limit = await rateLimit("newsletter", ip, 5, 60 * 10); // 5 / 10min
    if (!limit.ok) {
      return NextResponse.json(
        {
          ok: false,
          message: "Muitas tentativas. Tenta de novo daqui a pouco.",
        },
        { status: 429, headers: { "Retry-After": "600" } },
      );
    }

    const body = await request.json().catch(() => ({}));
    const parsed = newsletterSchema.safeParse({ email: body?.email });

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          message: "E-mail invalido. Verifique e tente novamente.",
        },
        { status: 400 },
      );
    }

    const email = parsed.data.email.toLowerCase();
    const source = normalizeSource(body?.source);

    if (!redis) {
      // Fallback: log to stdout when KV is not configured. Keeps the
      // form working in preview/local environments without blocking deploy.
      console.log(
        "[newsletter] novo inscrito (KV nao configurado):",
        email,
        "source=",
        source,
      );
      // Mesmo sem Upstash, ainda tenta o Resend (fail-safe interno se sem key).
      await fanoutResend(email, source);
      return NextResponse.json({
        ok: true,
        message: "Inscricao recebida! Em breve voce recebe novidades.",
      });
    }

    // sadd retorna 1 se foi adicionado, 0 se já existia.
    const added = await redis.sadd(EMAIL_SET_KEY, email);

    if (added === 0) {
      return NextResponse.json({
        ok: true,
        message: "Voce ja estava inscrito. Valeu!",
      });
    }

    // Lead novo: dispara Resend (audience + welcome + owner notify) sem bloquear o response em caso de erro.
    await fanoutResend(email, source);

    return NextResponse.json({
      ok: true,
      message: "Inscricao feita. Bem-vindo.",
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Erro inesperado.";
    return NextResponse.json(
      { ok: false, message: `Falha ao inscrever: ${message}` },
      { status: 500 },
    );
  }
}
