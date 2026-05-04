"use client";

import { useState } from "react";

const TEAM_SIZES = ["Eu sozinho", "2-5", "6-15", "15+"] as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// E-mail OU número (algum dígito + 7+ chars).
const CONTACT_REGEX = /^(?:[^\s@]+@[^\s@]+\.[^\s@]+|[+\d\s().-]{8,20})$/;

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; waUrl?: string }
  | { kind: "error"; message: string };

export function CtaSection() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [bottleneck, setBottleneck] = useState("");
  const [teamSize, setTeamSize] = useState<(typeof TEAM_SIZES)[number]>(
    TEAM_SIZES[0],
  );
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const trimmedName = name.trim();
  const trimmedContact = contact.trim();
  const validContact = CONTACT_REGEX.test(trimmedContact);
  const formValid = trimmedName.length >= 2 && validContact;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formValid || status.kind === "submitting") return;
    setStatus({ kind: "submitting" });

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          contact: trimmedContact,
          teamSize,
          bottleneck: bottleneck.trim(),
          source: "madureira_consultoria",
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        waUrl?: string;
        error?: string;
      };

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Falha ao enviar");
      }

      setStatus({ kind: "success", waUrl: data.waUrl });

      // Abre o WhatsApp em paralelo (best-effort, não bloqueia o success state).
      if (data.waUrl) {
        window.open(data.waUrl, "_blank", "noopener,noreferrer");
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Erro inesperado.";
      setStatus({ kind: "error", message });
    }
  }

  // Fallback wa.me caso API falhe — mantém usuário vivo no funil.
  const fallbackWaUrl =
    `https://wa.me/5512997796835?text=` +
    encodeURIComponent(
      `Olá Gabriel! Tentei o form mas falhou.\nNome: ${trimmedName}\nContato: ${trimmedContact}`,
    );

  if (status.kind === "success") {
    return (
      <section id="contato" className="px-6 py-24 relative">
        <div
          aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.18] blur-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(16,185,129,0.5) 0%, rgba(16,185,129,0) 60%)",
          }}
        />
        <div className="max-w-3xl mx-auto relative text-center">
          <p className="font-mono text-[10px] font-medium text-emerald-400 uppercase tracking-[0.22em] mb-4">
            Recebido
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-100 mb-4 tracking-tight">
            Tá comigo. Respondo em até 24h.
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto leading-relaxed mb-8">
            Acabei de receber teu brief no e-mail. Sem SDR no meio — quem
            responde sou eu mesmo. Se preferir, já abri o WhatsApp em uma aba
            nova com a mensagem pronta pra acelerar o ping.
          </p>
          {status.waUrl ? (
            <a
              href={status.waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-3.5 font-semibold text-sm text-black transition-all hover:bg-emerald-400 hover:scale-[1.02] shadow-[0_0_30px_-10px_rgba(16,185,129,0.6)]"
            >
              Abrir WhatsApp
              <span aria-hidden>↗</span>
            </a>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <section id="contato" className="px-6 py-24 relative">
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.12] blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.5) 0%, rgba(16,185,129,0) 60%)",
        }}
      />
      <div className="max-w-4xl mx-auto relative">
        <div className="text-center mb-12">
          <p className="font-mono text-[10px] font-medium text-emerald-400 uppercase tracking-[0.22em] mb-4">
            Diagnóstico gratuito
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-100 mb-4 tracking-tight">
            Quer saber onde a IA vai cortar 70% do teu dia?
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Manda um brief curto. Eu respondo em até 24h, sem SDR no meio.
            Marcamos 30min pra mapear teus gargalos — se fizer sentido.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-6 lg:p-8 rounded-3xl border border-emerald-500/30 bg-zinc-900/60 backdrop-blur-sm"
        >
          <label className="flex flex-col gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-400">
              Nome
            </span>
            <input
              type="text"
              required
              minLength={2}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Como te chamo?"
              className="rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-emerald-500/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-colors"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-400">
              E-mail ou WhatsApp
            </span>
            <input
              type="text"
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="exemplo@dominio.com ou +55..."
              aria-invalid={contact.length > 0 && !validContact}
              className="rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-emerald-500/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-colors aria-[invalid=true]:border-red-500/60"
            />
            {contact.length > 0 && !validContact ? (
              <span className="font-mono text-[10px] text-red-400/80">
                Coloca um e-mail válido ou número com DDD.
              </span>
            ) : null}
          </label>

          <label className="flex flex-col gap-1.5 lg:col-span-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-400">
              Tamanho do time
            </span>
            <div className="flex flex-wrap gap-2">
              {TEAM_SIZES.map((size) => {
                const active = teamSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setTeamSize(size)}
                    aria-pressed={active}
                    className={`rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
                      active
                        ? "border-emerald-500 bg-emerald-500 text-black"
                        : "border-zinc-700 text-zinc-300 hover:border-emerald-500/50 hover:text-emerald-300"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </label>

          <label className="flex flex-col gap-1.5 lg:col-span-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-400">
              Qual teu maior gargalo hoje? (opcional)
            </span>
            <textarea
              rows={3}
              value={bottleneck}
              onChange={(e) => setBottleneck(e.target.value)}
              placeholder="Em 2-3 linhas, onde tu sente que tá perdendo tempo? (ex: 2h/dia em e-mail, criação de proposta toma 5 dias, atendimento esgota o time...)"
              className="resize-none rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-emerald-500/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-colors"
            />
          </label>

          <div className="lg:col-span-2 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between pt-2">
            <p className="font-mono text-[10px] leading-relaxed text-zinc-500 lg:max-w-md">
              Eu recebo direto no e-mail e respondo em até 24h. Nada de SDR
              nem fluxo de nutrição automatizado.
            </p>
            <button
              type="submit"
              disabled={!formValid || status.kind === "submitting"}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-7 py-3.5 font-semibold text-sm text-black transition-all hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-emerald-500/40 disabled:hover:scale-100 shadow-[0_0_30px_-10px_rgba(16,185,129,0.6)]"
            >
              {status.kind === "submitting" ? (
                <>
                  <span
                    aria-hidden
                    className="w-3.5 h-3.5 border-2 border-black/40 border-t-black rounded-full animate-spin"
                  />
                  Enviando...
                </>
              ) : (
                <>
                  Mandar brief
                  <span aria-hidden>↗</span>
                </>
              )}
            </button>
          </div>

          {status.kind === "error" ? (
            <div className="lg:col-span-2 rounded-xl border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-300">
              Falhou ({status.message}). Tenta de novo, ou{" "}
              <a
                href={fallbackWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-red-300/60 hover:text-red-200"
              >
                manda direto no WhatsApp →
              </a>
            </div>
          ) : null}
        </form>
      </div>
    </section>
  );
}
