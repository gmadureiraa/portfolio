"use client";

import { useState } from "react";
import { profile } from "@/lib/constants";

const TEAM_SIZES = ["Eu sozinho", "2-5", "6-15", "15+"] as const;

const WHATSAPP_BASE = `https://wa.me/${profile.whatsapp}`;

export function CtaSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bottleneck, setBottleneck] = useState("");
  const [teamSize, setTeamSize] = useState<(typeof TEAM_SIZES)[number]>(
    TEAM_SIZES[0],
  );
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitting(true);

    const message =
      `Olá Gabriel! Vim do site (madureira.xyz/consultoria).\n\n` +
      `Nome: ${name.trim()}\n` +
      `Contato: ${email.trim()}\n` +
      `Tamanho do time: ${teamSize}\n` +
      (bottleneck.trim() ? `Maior gargalo hoje: ${bottleneck.trim()}\n` : "");

    const url = `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => setSubmitting(false), 600);
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemplo@dominio.com ou +55..."
              className="rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-emerald-500/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-colors"
            />
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
              Ao enviar, abre o WhatsApp com o brief preenchido. Você revisa
              antes de mandar — nada vai automático.
            </p>
            <button
              type="submit"
              disabled={submitting || !name.trim() || !email.trim()}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-7 py-3.5 font-semibold text-sm text-black transition-all hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-emerald-500/40 disabled:hover:scale-100 shadow-[0_0_30px_-10px_rgba(16,185,129,0.6)]"
            >
              {submitting ? "Abrindo WhatsApp..." : "Mandar brief"}
              <span aria-hidden>↗</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
