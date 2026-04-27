import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { newsletterSchema } from "@/lib/schema";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

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

    if (!redis) {
      // Fallback: log to stdout when KV is not configured. Keeps the
      // form working in preview/local environments without blocking deploy.
      console.log("[newsletter] novo inscrito (KV nao configurado):", email);
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
