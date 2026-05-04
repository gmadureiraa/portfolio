import { Reveal, RevealStagger, RevealItem } from "./reveal";

type Offer = {
  label: string;
  title: string;
  price: string;
  priceSuffix?: string;
  description: string;
  bullets: string[];
  fitFor: string;
  notFor: string;
  deliverable: string;
  highlight?: boolean;
  badge?: string;
};

const offers: Offer[] = [
  {
    label: "Pontual · 1 dia",
    title: "Workshop 1-day",
    price: "R$ 3-5k",
    description:
      "Time aprende Claude Code, Cursor e Gemini hands-on com casos reais do teu negócio. Saída do dia já com agente rodando.",
    bullets: [
      "6h ao vivo (presencial em SP ou remoto)",
      "Prompts e agentes customizados pro teu fluxo",
      "Templates de planning, copy e dev pra usar segunda",
      "1 sessão de follow-up 2 semanas depois",
      "Gravação completa + repositório no GitHub teu",
    ],
    deliverable:
      "Time saindo do dia operando com 3 agentes prontos integrados no fluxo real.",
    fitFor: "tu quer destravar 4-8 pessoas em 1 dia",
    notFor: "tu precisa de sistema custom rodando em produção",
  },
  {
    label: "Recorrente · 1 mês",
    title: "Consultoria mensal",
    price: "R$ 4-6k",
    priceSuffix: "/mês",
    description:
      "6h/mês 1-1, review semanal e design de sistemas IA pro teu fluxo. Sem fidelidade, cancela quando quiser.",
    bullets: [
      "1 call semanal de 1h focada em problema real",
      "Review de prompts, agentes e automações",
      "Acesso direto via WhatsApp/Slack pra dúvidas",
      "Mapa mensal de onde IA cabe no fluxo",
      "Relatório curto de uso e custo de tokens",
    ],
    deliverable:
      "4 entregas concretas/mês — agente, automação, fluxo ou doc — versionadas no Git.",
    fitFor: "tu opera time de 1-10 pessoas e quer evolução contínua",
    notFor: "tu quer entrega única e pronta",
    highlight: true,
    badge: "3 vagas",
  },
  {
    label: "Implementação · 4-8 sem",
    title: "Sistema customizado",
    price: "A partir R$ 15k",
    description:
      "Construo pipeline IA completo (scraper → IA → CMS/redes) pro teu caso específico. Entrega rodando, código teu.",
    bullets: [
      "Discovery + design + build + deploy",
      "Stack moderno (Next 16, Supabase, Claude/Gemini)",
      "Integrações Notion, Slack, Airtable, n8n",
      "Handoff com docs e treinamento do time",
      "30 dias de suporte pós-launch incluso",
    ],
    deliverable:
      "Sistema rodando em produção no teu GitHub, time treinado pra manter sem dependência.",
    fitFor: "tu tem problema específico e quer ferramenta tua",
    notFor: "tu ainda não tem clareza do problema concreto",
  },
];

export default function Offers() {
  return (
    <RevealStagger
      className="grid grid-cols-1 gap-3 lg:grid-cols-3"
      staggerChildren={0.1}
    >
      {offers.map((o, i) => (
        <RevealItem
          key={i}
          className={`group relative flex flex-col gap-5 border p-6 transition-colors lg:p-7 ${
            o.highlight
              ? "border-emerald-500/60 bg-emerald-500/[0.04] lg:scale-[1.02]"
              : "border-emerald-500/20 hover:border-emerald-500/45"
          }`}
        >
          {o.badge ? (
            <span className="absolute -top-3 left-6 inline-flex items-center gap-1.5 border border-emerald-500/60 bg-black px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-emerald-400">
              <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400" />
              {o.badge}
            </span>
          ) : null}

          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400">
            {o.label}
          </span>

          <h3 className="text-2xl font-bold leading-tight tracking-tight text-white">
            {o.title}
          </h3>

          <div className="flex items-baseline gap-1">
            <span className="font-mono text-3xl font-bold text-white">
              {o.price}
            </span>
            {o.priceSuffix ? (
              <span className="font-mono text-sm text-neutral-400">
                {o.priceSuffix}
              </span>
            ) : null}
          </div>

          <p className="font-mono text-[11px] leading-relaxed text-neutral-300 lg:text-xs">
            {o.description}
          </p>

          <ul className="flex flex-col gap-2 border-t border-emerald-500/15 pt-4">
            {o.bullets.map((b, j) => (
              <li
                key={j}
                className="flex items-start gap-2 font-mono text-[11px] leading-relaxed text-neutral-300"
              >
                <span className="mt-0.5 text-emerald-400" aria-hidden>
                  →
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 border-t border-emerald-500/15 pt-4">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400">
                Entregável
              </span>
              <p className="mt-1 font-mono text-[11px] leading-relaxed text-neutral-300">
                {o.deliverable}
              </p>
            </div>
            <p className="font-mono text-[11px] leading-relaxed text-emerald-300">
              <span className="text-emerald-400">+</span> certo se {o.fitFor}
            </p>
            <p className="font-mono text-[11px] leading-relaxed text-neutral-500">
              <span className="text-red-400/80">×</span> errado se {o.notFor}
            </p>
          </div>
        </RevealItem>
      ))}
    </RevealStagger>
  );
}
