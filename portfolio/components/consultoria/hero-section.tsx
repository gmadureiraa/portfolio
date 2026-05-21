"use client";

import { Sparkles } from "lucide-react";
import { CtaButton } from "./cta-button";

interface HeroSectionProps {
  primaryCta: { href: string; label: string };
}

export function HeroSection({ primaryCta }: HeroSectionProps) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/60 via-transparent to-transparent pointer-events-none" />
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.15] blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.4) 0%, rgba(16,185,129,0) 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 mb-8">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400">
            Consultoria de IA · 3 vagas mensais
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-7">
          <span className="text-zinc-100 block">
            70% do teu dia é trabalho
          </span>
          <span className="block">
            <span className="text-zinc-100">que IA já </span>
            <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent">
              resolve hoje.
            </span>
          </span>
        </h1>

        {/* Subhead */}
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Eu mapeio onde estão os gargalos da tua operação e implemento IA
          dentro do teu fluxo. Em 30 dias você ganha o tempo de volta — sem
          stack nova, sem time novo, sem fábrica de prompt em Notion bagunçado.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <CtaButton href={primaryCta.href}>{primaryCta.label}</CtaButton>
          <CtaButton href="#gargalos" variant="ghost">
            Ver gargalos comuns
          </CtaButton>
        </div>

        {/* Validação social inline */}
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500 mb-16">
          já passaram por aqui ·{" "}
          <span className="text-zinc-300">Defiverso</span> ·{" "}
          <span className="text-zinc-300">D-Sec Labs</span> ·{" "}
          <span className="text-zinc-300">Buenas Ideias</span> ·{" "}
          <span className="text-zinc-300">Paradigma</span> ·{" "}
          <span className="text-zinc-300">Folio</span>
        </p>

        {/* Stat bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-10 border-t border-zinc-800/60">
          {[
            { v: "5+", l: "Anos operando IA" },
            { v: "Dezenas", l: "De clientes atendidos" },
            { v: "4", l: "Produtos em produção" },
            { v: "70%", l: "Tempo médio recuperado" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-zinc-100 mb-1">
                {s.v}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-500">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
