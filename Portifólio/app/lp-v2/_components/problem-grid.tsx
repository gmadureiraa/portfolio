import { RevealStagger, RevealItem } from "./reveal";

const painPoints = [
  {
    stat: "10h/sem",
    title: "Copy-pasting prompts",
    body: "Cada criativo perde 10 horas por semana procurando o prompt certo num Notion com 80 páginas. Em 30 dias ninguém lembra qual era a versão que funcionava.",
  },
  {
    stat: "4 abas",
    title: "Cada projeto vira pesquisa de ferramenta",
    body: "Em vez de executar, o time abre Claude, ChatGPT, Gemini, Perplexity. Decide pelo gosto da hora. Sai cara, sai lento, sai sem padrão.",
  },
  {
    stat: "6h",
    title: "Cliente paga estratégia, recebe rascunho",
    body: "IA entrega o primeiro draft em 30 segundos. Mas a curadoria humana que transforma rascunho em entrega come 6 horas do PM e some no orçamento.",
  },
  {
    stat: "3 meses",
    title: "Tooling viral no Twitter, zero pipeline",
    body: "Aquele agente que viralizou virou demo de stand. Sem retenção, sem versionamento, sem custo controlado. Três meses depois ninguém usa.",
  },
];

export default function ProblemGrid() {
  return (
    <RevealStagger
      className="grid grid-cols-1 gap-3 md:grid-cols-2"
      staggerChildren={0.1}
    >
      {painPoints.map((p, i) => (
        <RevealItem
          key={i}
          className="group relative flex flex-col gap-4 border border-emerald-500/15 bg-black p-6 transition-all hover:border-emerald-500/40 hover:bg-emerald-500/[0.02] lg:p-7"
        >
          <div className="flex items-start justify-between gap-3">
            <span className="font-mono text-2xl font-bold tabular-nums text-emerald-400 sm:text-3xl">
              {p.stat}
            </span>
            <span
              aria-hidden
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-red-500/30 bg-red-500/10 font-mono text-xs font-bold text-red-400"
            >
              ×
            </span>
          </div>
          <h3 className="text-lg font-semibold leading-tight text-white">
            {p.title}
          </h3>
          <p className="font-mono text-[11px] leading-relaxed text-neutral-400 lg:text-xs">
            {p.body}
          </p>
        </RevealItem>
      ))}
    </RevealStagger>
  );
}
