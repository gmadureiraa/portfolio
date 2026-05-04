"use client";

import { ExternalLink } from "lucide-react";

const products = [
  {
    name: "Sequência Viral",
    href: "https://viral.kaleidos.com.br",
    role: "Cola link viral, sai carrossel",
    learning:
      "Brief de 1 linha vira 8 slides em 30s. Template vence prompt — IA precisa de contexto fixo, não criatividade infinita.",
    stack: "Next 16 · Gemini 2.5 · Imagen 4 · Stripe",
  },
  {
    name: "Reels Viral",
    href: "https://reels.kaleidos.com.br",
    role: "Engenharia reversa de reel",
    learning:
      "Cola link, IA destrincha estrutura cena por cena. Esqueleto replicável, copy é único.",
    stack: "Next 16 · Apify · Gemini Flash · Neon",
  },
  {
    name: "Radar Viral",
    href: "https://radar.kaleidos.com.br",
    role: "Brief diário cross-platform",
    learning:
      "Cron + agentes lendo IG, YouTube, news, newsletters. Cruzar fontes filtra ruído — sem síntese, tendência é só barulho.",
    stack: "Next 16 · Cron · Gemini OCR · Postgres",
  },
  {
    name: "Kaleidos Pay",
    href: "https://pay.kaleidos.com.br",
    role: "Cobrança Asaas + WhatsApp",
    learning:
      "Lembrete automático via WhatsApp + boleto pré-preenchido. Infra interna libera mais tempo do time que SaaS pago.",
    stack: "Next · Asaas · whatsapp-web.js · Supabase",
  },
];

export function ProofSection() {
  return (
    <section id="proof" className="px-6 py-24 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-mono text-[10px] font-medium text-emerald-400 uppercase tracking-[0.22em] mb-4">
            Por que comigo
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-100 mb-4 tracking-tight">
            Construí 4 produtos de IA em 6 meses.
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Não vendo IA de academia. Cada coisa que ensino tá rodando em
            produção — pra mim, pra Kaleidos e pras dezenas de clientes que
            já passaram pelo brief.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/60 hover:border-emerald-500/40 hover:bg-zinc-900/80 transition-all duration-300"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-bold text-zinc-100 tracking-tight">
                  {p.name}
                </h3>
                <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-emerald-400">
                {p.role}
              </p>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {p.learning}
              </p>
              <p className="mt-auto pt-3 border-t border-zinc-800/60 font-mono text-[10px] text-zinc-500 leading-relaxed">
                {p.stack}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
