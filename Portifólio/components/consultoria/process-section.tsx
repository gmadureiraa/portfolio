const steps = [
  {
    n: "01",
    title: "Brief 30min",
    body: "Call rápida pra mapear os top 5 gargalos do teu dia, time, stack e onde IA dá alavanca real. Sem questionário de 40 perguntas.",
  },
  {
    n: "02",
    title: "Mapa de 1 página",
    body: "Documento curto com hipótese, sistema proposto, escopo e estimativa. Sem PDF de 80 slides que ninguém abre.",
  },
  {
    n: "03",
    title: "Build no teu fluxo",
    body: "Workshop, consultoria 1-1 ou sistema customizado. Aplicado no teu trabalho real, não em sandbox bonito.",
  },
  {
    n: "04",
    title: "Iteração 2-4 sem",
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <div
              key={step.n}
              className="relative flex flex-col gap-3 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/60"
            >
              {i < steps.length - 1 ? (
                <div
                  aria-hidden
                  className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-gradient-to-r from-emerald-500/40 to-transparent"
                />
              ) : null}
              <span className="font-mono text-xs text-emerald-400 tracking-[0.18em]">
                {step.n}
              </span>
              <h3 className="text-lg font-semibold text-zinc-100 tracking-tight">
                {step.title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
