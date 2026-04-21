import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { newsletterSchema } from "@/lib/schema";

const KV_URL =
  process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "";
const KV_TOKEN =
  process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";

const IS_CONFIGURED = Boolean(KV_URL && KV_TOKEN);

const redis = IS_CONFIGURED
  ? new Redis({ url: KV_URL, token: KV_TOKEN })
  : null;

const EMAIL_LIST_KEY = "newsletter:emails";

export async function POST(request: NextRequest) {
  try {
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

    const emailList = (await redis.get<string[]>(EMAIL_LIST_KEY)) || [];

    if (emailList.includes(email)) {
      return NextResponse.json({
        ok: true,
        message: "Voce ja estava inscrito. Valeu!",
      });
    }

    await redis.set(EMAIL_LIST_KEY, [...emailList, email]);

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
