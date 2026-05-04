import { RevealStagger, RevealItem } from "./reveal";

// Cases reais da Kaleidos resumidos — sem citação fabricada.
// TODO: substituir por depoimentos com autorização explícita dos clientes.
const cases = [
  {
    metric: "1 → 4",
    metricLabel: "newsletters/semana",
    body: "Pipeline editorial automatizado pro time do Lucas (Investidor 4.20). Mesma equipe, 4× mais entrega. Brief, draft e review separados em fluxo modular.",
    project: "Defiverso · Pipeline editorial",
  },
  {
    metric: "2 sem",
    metricLabel: "até agente em produção",
    body: "Agente de review de copy customizado pra DSEC Labs. Identificou padrão de hooks e regravou 30% antes do PM revisar. Caso documentado, não tese.",
    project: "DSEC Labs · Review automatizado",
  },
  {
    metric: "50%",
    metricLabel: "menos retrabalho",
    body: "Migração de Notion bagunçado pra Claude Code com workflow versionado em time editorial. Prompt deixou de ser texto solto e virou repositório com camadas trocáveis.",
    project: "Cliente Kaleidos · Workflow IA",
  },
];

export default function Testimonials() {
  return (
    <RevealStagger
      className="grid grid-cols-1 gap-3 lg:grid-cols-3"
      staggerChildren={0.1}
    >
      {cases.map((c, i) => (
        <RevealItem
          key={i}
          className="group relative flex flex-col gap-5 border border-emerald-500/15 bg-black p-6 transition-colors hover:border-emerald-500/40 lg:p-7"
        >
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-3xl font-bold text-emerald-400">
              {c.metric}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
              {c.metricLabel}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-neutral-300 lg:text-base">
            {c.body}
          </p>
          <div className="mt-auto flex items-center gap-2 border-t border-emerald-500/15 pt-4">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-emerald-400"
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400">
              {c.project}
            </span>
          </div>
        </RevealItem>
      ))}
    </RevealStagger>
  );
}
