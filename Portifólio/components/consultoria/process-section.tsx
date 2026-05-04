const steps = [
  {
    n: "01",
    title: "Brief 30min",
    eta: "Dia 0",
    body: "Call rápida pra mapear os top 5 gargalos do teu dia, time, stack e onde IA dá alavanca real. Sem questionário de 40 perguntas.",
  },
  {
    n: "02",
    title: "Mapa de 1 página",
    eta: "Dia 2",
    body: "Documento curto com hipótese, sistema proposto, escopo e estimativa. Sem PDF de 80 slides que ninguém abre.",
  },
  {
    n: "03",
    title: "Build no teu fluxo",
    eta: "Sem 2-4",
    body: "Workshop, consultoria 1-1 ou sistema customizado. Aplicado no teu trabalho real, não em sandbox bonito.",
  },
  {
    n: "04",
    title: "Iteração contínua",
    eta: "Sem 4-8",
    body: "IA muda toda semana. Ajuste pós-entrega vem incluso pra adaptar quando o modelo muda ou o time pede troca.",
  },
];

export function ProcessSection() {
  return (
    <section id="como-funciona" className="px-6 py-24 bg-zinc-900/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-mono text-[10px] font-medium text-emerald-400 uppercase tracking-[0.22em] mb-4">
            Como funciona
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-100 mb-4 tracking-tight">
            Do brief ao sistema rodando: 4 a 8 semanas.
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Linha do tempo real, sem etapa de proposta de 80 slides nem
            workshop pra arrancar verba.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Linha conectora horizontal (desktop) */}
          <div
            aria-hidden
            className="hidden lg:block absolute top-[60px] left-[8%] right-[8%] h-px bg-gradient-to-r from-emerald-500/0 via-emerald-500/40 to-emerald-500/0 pointer-events-none"
          />
          {steps.map((step) => (
            <div
              key={step.n}
              className="relative flex flex-col gap-3 p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800/60 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-emerald-400 tracking-[0.18em]">
                  {step.n}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                  {step.eta}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-zinc-100 tracking-tight">
                {step.title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center font-mono text-[11px] text-zinc-500 uppercase tracking-[0.16em]">
          Brief 30min → Mapa em 2 dias → Build em 2-4 sem → Iteração contínua
        </p>
      </div>
    </section>
  );
}
