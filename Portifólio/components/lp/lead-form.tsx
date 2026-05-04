"use client";

import { useState } from "react";
import { profile } from "@/lib/constants";

const OBJECTIVES = [
  "Workshop pro time",
  "Consultoria mensal",
  "Sistema customizado",
  "Ainda não sei",
] as const;

type Objective = (typeof OBJECTIVES)[number];

const WHATSAPP_BASE = `https://wa.me/${profile.whatsapp}`;

export default function LeadForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [objective, setObjective] = useState<Objective>(OBJECTIVES[0]);
  const [problem, setProblem] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) return;
    setSubmitting(true);

    const message =
      `Olá Gabriel! Vim do site (madureira.xyz/lp).\n\n` +
      `Nome: ${name.trim()}\n` +
      `Contato: ${contact.trim()}\n` +
      `Interesse: ${objective}\n` +
      (problem.trim() ? `Contexto: ${problem.trim()}\n` : "");

    const url = `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    // pequeno timeout só pra dar feedback visual antes de resetar
    setTimeout(() => setSubmitting(false), 600);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-4 border border-emerald-500/25 bg-black/40 p-6 lg:grid-cols-2 lg:p-8"
    >
      <div className="flex flex-col gap-2 lg:col-span-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400">
          Prefere me mandar contexto antes do call?
        </span>
        <h3 className="text-2xl font-bold uppercase leading-tight tracking-tight text-white lg:text-3xl">
          Manda um brief curto.
        </h3>
        <p className="font-mono text-[11px] leading-relaxed text-neutral-400 lg:text-xs">
          Preencho menos pergunta no call, você ganha tempo. Eu respondo em até
          24h direto, sem SDR no meio.
        </p>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-400">
          Nome
        </span>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Como te chamo?"
          className="border border-emerald-500/25 bg-transparent px-3 py-2.5 font-mono text-sm text-white placeholder:text-neutral-600 focus:border-emerald-500/60 focus:outline-none"
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
          className="border border-emerald-500/25 bg-transparent px-3 py-2.5 font-mono text-sm text-white placeholder:text-neutral-600 focus:border-emerald-500/60 focus:outline-none"
        />
      </label>

      <label className="flex flex-col gap-1.5 lg:col-span-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-400">
          O que faz mais sentido pra ti
        </span>
        <div className="flex flex-wrap gap-2">
          {OBJECTIVES.map((opt) => {
            const active = objective === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => setObjective(opt)}
                aria-pressed={active}
                className={`border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
                  active
                    ? "border-emerald-500 bg-emerald-500 text-black"
                    : "border-emerald-500/25 text-emerald-400 hover:border-emerald-500/60 hover:bg-emerald-500/5"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </label>

      <label className="flex flex-col gap-1.5 lg:col-span-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-400">
          Contexto (opcional)
        </span>
        <textarea
          rows={3}
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          placeholder="Em 2-3 linhas, qual é o gargalo? (ex: time de 4 pessoas, 2h/dia perdidas em copy)"
          className="resize-none border border-emerald-500/25 bg-transparent px-3 py-2.5 font-mono text-sm text-white placeholder:text-neutral-600 focus:border-emerald-500/60 focus:outline-none"
        />
      </label>

      <div className="flex flex-col items-stretch gap-2 lg:col-span-2 lg:flex-row lg:items-center lg:justify-between">
        <p className="font-mono text-[10px] leading-relaxed text-neutral-500 lg:max-w-md">
          Ao enviar, abre o WhatsApp com o brief preenchido. Você revisa antes
          de mandar — nada vai automático.
        </p>
        <button
          type="submit"
          disabled={submitting || !name.trim() || !contact.trim()}
          className="inline-flex items-center justify-center gap-2 bg-emerald-500 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-black transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-emerald-500/40"
        >
          {submitting ? "Abrindo WhatsApp..." : "Enviar brief"}
          <span aria-hidden>↗</span>
        </button>
      </div>
    </form>
  );
}
