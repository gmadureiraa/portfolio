import { NextRequest, NextResponse } from "next/server";
import { unsubscribeByToken, isDbConfigured } from "@/lib/db/newsletter";

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://madureira.xyz";

/**
 * GET  /api/newsletter/unsubscribe?token=xxx
 *   → Render página de confirmação (NÃO desinscreve).
 *     Protege contra Outlook Safe Links / scanners de email que prefetcham
 *     URLs e desinscrevem subscribers automaticamente.
 *
 * POST /api/newsletter/unsubscribe?token=xxx
 *   → Efetiva o unsubscribe (chamado tanto pelo botão da página GET quanto
 *     pelo `List-Unsubscribe-Post` RFC 8058 dos clientes de email).
 *     Marca unsubscribed_at=NOW() e redireciona pra /newsletter?unsubscribed=true
 */

function escapeHtml(s: string) {
  return s.replace(/[&<>"'`]/g, (c) => {
    const map: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
      "`": "&#96;",
    };
    return map[c] || c;
  });
}

function renderConfirmPage(token: string, error?: string): string {
  const safeToken = escapeHtml(token);
  const errorBanner = error
    ? `<p style="margin:0 0 16px;padding:12px 16px;background:#3b1414;border:1px solid #5a1f1f;border-radius:8px;color:#ffb4b4;font-size:14px;">${escapeHtml(error)}</p>`
    : "";
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex,nofollow" />
<title>Desinscrever da newsletter — Madureira</title>
<style>
  * { box-sizing: border-box; }
  body { margin:0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif; background:#0a0a0a; color:#e5e5e5; min-height:100vh; display:flex; align-items:center; justify-content:center; padding:24px; }
  .card { max-width: 480px; width:100%; background:#111; border:1px solid #262626; border-radius:16px; padding:40px 32px; }
  h1 { margin:0 0 12px; font-size:24px; font-weight:600; color:#fafafa; }
  p { margin:0 0 16px; line-height:1.6; color:#a3a3a3; font-size:15px; }
  form { margin-top:24px; }
  button { width:100%; padding:14px 20px; border:0; border-radius:10px; background:#dc2626; color:#fff; font-size:15px; font-weight:600; cursor:pointer; transition:background 0.15s; }
  button:hover { background:#b91c1c; }
  .cancel { display:inline-block; margin-top:12px; text-align:center; width:100%; color:#737373; text-decoration:none; font-size:14px; }
  .cancel:hover { color:#a3a3a3; }
</style>
</head>
<body>
  <main class="card">
    ${errorBanner}
    <h1>Quer mesmo desinscrever?</h1>
    <p>Você está prestes a sair da newsletter do Madureira. Vai parar de receber os emails semanais sobre IA aplicada em marketing e produto.</p>
    <p>Clique no botão pra confirmar.</p>
    <form method="POST" action="/api/newsletter/unsubscribe?token=${safeToken}">
      <button type="submit">Sim, quero sair</button>
    </form>
    <a class="cancel" href="${BASE}/newsletter">Cancelar e voltar</a>
  </main>
</body>
</html>`;
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token") || "";
  if (!token) {
    return NextResponse.redirect(new URL("/newsletter?error=token", BASE));
  }
  // NÃO desinscreve. Só renderiza confirmação.
  return new NextResponse(renderConfirmPage(token), {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

export async function POST(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token") || "";
  if (!token) return new NextResponse("missing token", { status: 400 });
  if (!isDbConfigured)
    return new NextResponse("db not configured", { status: 503 });

  // Detecta se é submit do form HTML (browser) ou List-Unsubscribe-Post (cliente de email)
  const contentType = request.headers.get("content-type") || "";
  const isFormSubmit = contentType.includes("application/x-www-form-urlencoded");

  try {
    await unsubscribeByToken(token);
    if (isFormSubmit) {
      return NextResponse.redirect(
        new URL("/newsletter?unsubscribed=true", BASE),
        303, // See Other — força GET no redirect
      );
    }
    return new NextResponse("ok", { status: 200 });
  } catch (err) {
    console.error("[newsletter/unsubscribe] erro:", err);
    if (isFormSubmit) {
      return NextResponse.redirect(new URL("/newsletter?error=server", BASE), 303);
    }
    return new NextResponse("server error", { status: 500 });
  }
}
