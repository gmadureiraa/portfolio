import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { isAdminFromRequest } from "@/lib/server/admin";

/**
 * POST /api/admin/newsletter/upload-image
 *
 * Faz upload de imagem pro Vercel Blob (store `newsletter/`) e retorna a URL
 * pública. Usada pela toolbar do editor + drop/paste no body + ImageUploadField.
 *
 * Requisitos:
 *   - Auth admin (mesmo cookie do resto do /admin)
 *   - `BLOB_READ_WRITE_TOKEN` setado no Vercel (auto-injetado pelo store)
 *
 * Validações:
 *   - file obrigatório (multipart/form-data)
 *   - tipo: JPG/PNG/WEBP/GIF
 *   - tamanho: até 8MB
 */

const MAX_SIZE = 8 * 1024 * 1024; // 8MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(request: NextRequest) {
  if (!isAdminFromRequest(request)) {
    return NextResponse.json(
      { ok: false, error: "unauthorized" },
      { status: 401 },
    );
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "BLOB_READ_WRITE_TOKEN não configurado. Crie um Blob store no dashboard Vercel.",
      },
      { status: 503 },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Body inválido (esperado multipart/form-data)" },
      { status: 400 },
    );
  }

  const file = form.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json(
      { ok: false, error: "Nenhum arquivo enviado" },
      { status: 400 },
    );
  }

  if (file.size === 0) {
    return NextResponse.json(
      { ok: false, error: "Arquivo vazio" },
      { status: 400 },
    );
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { ok: false, error: `Tamanho máximo 8MB (recebido ${(file.size / 1024 / 1024).toFixed(1)}MB)` },
      { status: 400 },
    );
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { ok: false, error: "Apenas JPG, PNG, WEBP ou GIF" },
      { status: 400 },
    );
  }

  // Nome único pra evitar colisão. Mantém extensão do tipo, não do nome
  // (mais seguro: ignora extensões fake tipo `foo.png.exe`).
  const extByType: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
  };
  const ext = extByType[file.type] || "bin";
  const filename = `newsletter/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  try {
    const blob = await put(filename, file, {
      access: "public",
      // addRandomSuffix=false porque já geramos suffix único acima
      addRandomSuffix: false,
      contentType: file.type,
    });
    return NextResponse.json({
      ok: true,
      url: blob.url,
      size: file.size,
      type: file.type,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "upload failed";
    return NextResponse.json(
      { ok: false, error: `Falha no upload: ${msg}` },
      { status: 500 },
    );
  }
}
