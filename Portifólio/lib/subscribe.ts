import type { ActionResult } from "./utils";

export async function subscribe(email: string): Promise<ActionResult<string>> {
  try {
    const res = await fetch("/api/newsletter/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok || data?.ok === false) {
      return {
        success: false,
        message: data?.message || "Erro ao realizar inscricao.",
        id: crypto.randomUUID(),
      };
    }

    return {
      success: true,
      data: data?.message || "Inscricao realizada com sucesso!",
      id: crypto.randomUUID(),
    };
  } catch {
    return {
      success: false,
      message: "Erro de rede. Tente novamente.",
      id: crypto.randomUUID(),
    };
  }
}
