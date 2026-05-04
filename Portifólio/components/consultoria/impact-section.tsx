const metrics = [
  {
    value: "1h → 30s",
    label: "Carrossel completo",
    description: "Brief vira 8 slides via Sequência Viral",
  },
  {
    value: "3 dias → 30min",
    label: "Pesquisa de mercado",
    description: "Agentes varrem 50 fontes com citação",
  },
  {
    value: "2h → 15min",
    label: "Reunião → conteúdo",
    description: "Transcrição + 5 peças prontas pra publicar",
  },
  {
    value: "5 dias → 1 dia",
    label: "Brief cliente → entrega",
    description: "Pipeline de produção operado por IA",
  },
];

export function ImpactSection() {
  return (
    <section id="impacto" className="px-6 py-24 bg-zinc-900/20 relative">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px)",
          backgroundSize: "120px 100%",
        }}
      />
      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-14">
          <p className="font-mono text-[10px] font-medium text-emerald-400 uppercase tracking-[0.22em] mb-4">
            O que muda na prática
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-100 mb-4 tracking-tight">
            Tarefa que era dia, vira minuto.
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Cada gargalo que mapeio vira sistema. Sem prompt mágico, sem ferramenta
            nova. Só IA aplicada onde o teu time já trabalha.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="group p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/60 hover:border-emerald-500/40 hover:bg-zinc-900/90 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <p className="text-2xl md:text-3xl font-bold text-zinc-100 mb-2 group-hover:text-emerald-300 transition-colors">
                  {metric.value}
                </p>
                <p className="text-sm font-semibold text-zinc-300 mb-1">
                  {metric.label}
                </p>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  {metric.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center font-mono text-[11px] text-zinc-500 uppercase tracking-[0.18em]">
          números reais de clientes Kaleidos · auditável no brief
        </p>
      </div>
    </section>
  );
}
