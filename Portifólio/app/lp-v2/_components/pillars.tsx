import { RevealStagger, RevealItem } from "./reveal";

const pillars = [
  {
    icon: "◆",
    title: "Sistema, não prompt",
    body: "Desenho contexto, integração, versionamento e custo. Time não copia texto de Notion — usa pipeline com camadas trocáveis.",
    metric: "8 sistemas",
    metricLabel: "rodando na Kaleidos",
  },
  {
    icon: "▲",
    title: "Aplicado, não teórico",
    body: "Tudo o que ensino tá em produção pagando salário. Sequência Viral, Reels Viral, Radar Viral e Kaleidos Pay são casos reais, não slides.",
    metric: "6 meses",
    metricLabel: "shipando produtos próprios",
  },
  {
    icon: "●",
    title: "Modular, não amarrado",
    body: "Provider de IA, prompt, integração e UI separados. Quando Claude/Gemini muda, troca peça e segue. Não refaz tudo.",
    metric: "4 stacks",
    metricLabel: "intercambiáveis",
  },
];

export default function Pillars() {
  return (
    <RevealStagger
      className="grid grid-cols-1 gap-3 lg:grid-cols-3"
      staggerChildren={0.1}
    >
      {pillars.map((p, i) => (
        <RevealItem
          key={i}
          className="group relative flex flex-col gap-5 overflow-hidden border border-emerald-500/20 bg-gradient-to-b from-emerald-500/[0.02] to-transparent p-6 transition-colors hover:border-emerald-500/45 lg:p-8"
        >
          <span
            aria-hidden
            className="font-mono text-3xl text-emerald-400/80 transition-transform group-hover:scale-110"
          >
            {p.icon}
          </span>
          <h3 className="text-xl font-semibold leading-tight text-white">
            {p.title}
          </h3>
          <p className="text-sm leading-relaxed text-neutral-400">{p.body}</p>
          <div className="mt-auto flex items-baseline gap-2 border-t border-emerald-500/15 pt-4">
            <span className="font-mono text-2xl font-bold text-emerald-400">
              {p.metric}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
              {p.metricLabel}
            </span>
          </div>
        </RevealItem>
      ))}
    </RevealStagger>
  );
}
