import { RevealStagger, RevealItem } from "./reveal";

const steps = [
  {
    n: "01",
    title: "Brief 30min",
    body: "Call rápida pra mapear gargalo, time, stack e onde IA dá alavanca real. Sem questionário de 40 perguntas.",
    duration: "30 minutos",
  },
  {
    n: "02",
    title: "Mapa de 1 página",
    body: "Documento curto com hipótese, sistema proposto, escopo e estimativa. Sem PDF de 80 slides que ninguém abre.",
    duration: "48h depois",
  },
  {
    n: "03",
    title: "Build no teu fluxo",
    body: "Workshop, consultoria ou sistema rodando. Aplicado no teu trabalho real, não em sandbox bonito.",
    duration: "1 a 8 semanas",
  },
  {
    n: "04",
    title: "Iteração 2-4 sem",
    body: "IA muda toda semana. Ajuste pós-entrega vem incluso pra adaptar quando o modelo muda ou o time pede troca.",
    duration: "Pós-entrega",
  },
];

export default function Process() {
  return (
    <div className="relative">
      {/* Linha conectando steps no desktop */}
      <div
        aria-hidden
        className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent lg:block"
      />

      <RevealStagger
        className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4"
        staggerChildren={0.1}
      >
        {steps.map((s) => (
          <RevealItem
            key={s.n}
            className="group relative flex flex-col gap-4 border border-emerald-500/20 bg-black p-5 transition-colors hover:border-emerald-500/45 hover:bg-emerald-500/[0.02] lg:p-6"
          >
            <span className="grid h-14 w-14 place-items-center border border-emerald-500/40 bg-emerald-500/[0.04] font-mono text-xl font-bold text-emerald-400 transition-colors group-hover:border-emerald-500 group-hover:bg-emerald-500 group-hover:text-black">
              {s.n}
            </span>
            <h3 className="text-lg font-semibold tracking-tight text-white">
              {s.title}
            </h3>
            <p className="font-mono text-[11px] leading-relaxed text-neutral-400">
              {s.body}
            </p>
            <span className="mt-auto font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400/70">
              ↪ {s.duration}
            </span>
          </RevealItem>
        ))}
      </RevealStagger>
    </div>
  );
}
