import type { ActionResult } from "./utils";

export async function subscribe(
  email: string,
  source: string = "madureira_unknown",
  hp: string = "",
): Promise<ActionResult<string>> {
  try {
    const res = await fetch("/api/newsletter/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source, _hp: hp }),
    });

    const data = await res.json();

    if (!res.ok || data?.ok === false) {
      return {
        success: false,
        message: data?.message || "Erro ao realizar inscricao.",
        id: crypto.randomUUID(),
      };
    }

    // Marca como assinante — todos os boxes de inscrição (modal, sidebar,
    // hero) checam essa flag e somem após sucesso. Centralizado aqui pra que
    // qualquer entry point (hero, sidebar, modal, footer) tenha o mesmo
    // comportamento sem cada form ter que lembrar de setar.
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem("nl_subscribed", "true");
        window.dispatchEvent(new CustomEvent("newsletter:subscribed"));
      } catch {}
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
