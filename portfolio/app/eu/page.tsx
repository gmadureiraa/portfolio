import type { Metadata } from "next";

import HalftonePhoto from "@/components/eu/halftone-photo";
import { profile, socialLinks } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Mentoria & Consultoria — Gabriel Madureira",
  description:
    "Mentoria 1:1, consultoria de IA pra agências, e bastidores diários. Construo produtos digitais e ajudo founders a integrar IA na operação real.",
  alternates: { canonical: "/eu" },
  openGraph: {
    title: "Mentoria & Consultoria — Gabriel Madureira",
    description:
      "Mentoria 1:1, consultoria de IA pra agências e SaaS, conteúdo diário e bastidores reais. Marketing + IA em produção.",
    url: "https://madureira.xyz/eu",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mentoria & Consultoria — Gabriel Madureira",
    description:
      "Mentoria 1:1, consultoria de IA, conteúdo diário. IA aplicada na operação real.",
  },
};

const WHATSAPP_BASE = `https://wa.me/${profile.whatsapp}`;
const WA_MENTORIA = `${WHATSAPP_BASE}?text=${encodeURIComponent(
  "Olá Gabriel, vim da página /eu e quero agendar uma mentoria 1:1.",
)}`;
const WA_CONSULTORIA = `${WHATSAPP_BASE}?text=${encodeURIComponent(
  "Olá Gabriel, quero saber mais da consultoria de IA pra agências.",
)}`;

const arrowLines = [
  "Construo 36 produtos digitais — SaaS, agentes IA, automações.",
  "Ajudo founders a integrar IA na operação real.",
  "Ensino o que tá funcionando hoje — sem hype, com cases.",
  "Se quer atalho pra operar com IA, começa aqui.",
];

type CardProps = {
  label: string;
  title: string;
  description: string;
  href: string;
  badge?: string;
};

function StackedCard({ label, title, description, href, badge }: CardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col gap-3 border border-emerald-500/25 p-6 transition-colors hover:border-emerald-500/60 hover:bg-emerald-500/[0.03] lg:p-7"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400">
          {label}
        </span>
        <div className="flex items-center gap-2">
          {badge ? (
            <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-emerald-400">
              {badge}
            </span>
          ) : null}
          <span
            aria-hidden
            className="text-emerald-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            ↗
          </span>
        </div>
      </div>

      <h3 className="text-2xl font-bold leading-tight tracking-tight text-white lg:text-3xl">
        {title}
      </h3>

      <p className="font-mono text-[11px] leading-relaxed text-neutral-300 lg:text-xs">
        {description}
      </p>
    </a>
  );
}

export default function EuPage() {
  return (
    <main className="relative min-h-screen w-full bg-black text-white">
      {/* Grid overlay sutil em todo viewport */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Container interno com border lime */}
      <div className="relative z-10 mx-auto max-w-7xl px-3 py-3 sm:px-5 sm:py-5">
        <div className="overflow-hidden rounded-md border border-emerald-500/30 bg-black/60 backdrop-blur-sm">
          {/* Top bar */}
          <div className="flex items-center justify-between gap-3 border-b border-emerald-500/20 px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="grid h-5 w-5 place-items-center bg-emerald-500 font-mono text-[11px] font-bold text-black">
                M
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400 sm:text-xs">
                Marketing + IA em Produção
              </span>
            </div>
            <a
              href={socialLinks.x}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400 transition-colors hover:text-emerald-300 sm:text-xs"
            >
              {profile.twitterHandle}
            </a>
          </div>

          {/* Hero halftone */}
          <div className="relative border-b border-emerald-500/20 p-4 sm:p-6">
            <HalftonePhoto />
          </div>

          {/* Grid principal: título + cards */}
          <div className="grid grid-cols-1 lg:grid-cols-5 lg:divide-x lg:divide-emerald-500/20">
            {/* ESQUERDA — título massivo + lista > */}
            <div className="flex flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:col-span-3 lg:px-10 lg:py-12">
              <h1 className="font-bold uppercase leading-[1.05] tracking-tight text-white text-2xl sm:text-3xl lg:text-4xl xl:text-[44px]">
                <span className="block">Você ou aprende a</span>
                <span className="block">operar com IA</span>
                <span className="my-1 block w-fit bg-emerald-500 px-2 text-black">
                  ou fica por fora
                </span>
                <span className="block">em 2026.</span>
              </h1>

              <div className="border-t border-emerald-500/20 pt-6">
                <ul className="flex flex-col gap-3">
                  {arrowLines.map((line, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 font-mono text-xs uppercase leading-relaxed tracking-[0.08em] text-neutral-200 lg:text-sm"
                    >
                      <span className="mt-0.5 text-emerald-400" aria-hidden>
                        &gt;
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* DIREITA — 3 cards stacked */}
            <div className="flex flex-col divide-y divide-emerald-500/20 border-t border-emerald-500/20 lg:col-span-2 lg:border-t-0">
              <StackedCard
                label="Broadcast"
                title="Conteúdo Diário"
                description="Twitter e LinkedIn — bastidores dos 36 produtos que construo, IA aplicada, lições de erros e acertos."
                href={socialLinks.x}
              />
              <StackedCard
                label="Direct Access"
                title="Mentoria 1:1"
                description="60min focados em IA, growth, funis, lançamentos, automação ou o gargalo que tá te travando agora. Saímos da call com plano de ação."
                href={WA_MENTORIA}
              />
              <StackedCard
                label="Consultoria"
                title="Consultoria Recorrente"
                description="Versão estendida da mentoria. IA, growth, funis, lançamentos — mas com acompanhamento de 4 a 8 semanas até virar sistema rodando sozinho."
                href={WA_CONSULTORIA}
                badge="Limitado"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col items-start justify-between gap-3 border-t border-emerald-500/20 px-4 py-4 sm:flex-row sm:items-center sm:px-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-400 sm:text-xs">
              São Paulo, BR
            </span>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.22em] sm:text-xs">
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 transition-colors hover:text-white"
              >
                Instagram
              </a>
              <a
                href={socialLinks.x}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 transition-colors hover:text-white"
              >
                Twitter
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 transition-colors hover:text-white"
              >
                LinkedIn
              </a>
              <a
                href="/newsletter"
                className="text-emerald-400 transition-colors hover:text-white"
              >
                Newsletter
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
