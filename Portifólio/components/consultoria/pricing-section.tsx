import { Check } from "lucide-react";

interface Plan {
  badge: string;
  name: string;
  description: string;
  price: string;
  priceSuffix?: string;
  features: string[];
  fitFor: string;
  notFor: string;
  cta: string;
  ctaHref: string;
  highlighted?: boolean;
}

interface PricingSectionProps {
  plans: Plan[];
}

export function PricingSection({ plans }: PricingSectionProps) {
  return (
    <section id="planos" className="px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-mono text-[10px] font-medium text-emerald-400 uppercase tracking-[0.22em] mb-4">
            Planos
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-100 mb-4 tracking-tight">
            Três formatos. Sem fidelidade.
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Cancela a qualquer mês. Código fica com tu. Sem lock-in, sem
            licença mensal de plataforma fantasma.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {plans.map((plan) => {
            const highlighted = !!plan.highlighted;
            return (
              <div
                key={plan.name}
                className={`relative p-7 rounded-2xl border flex flex-col h-full transition-all duration-300 ${
                  highlighted
                    ? "bg-gradient-to-b from-emerald-950/40 to-zinc-900/80 border-emerald-500/50 shadow-[0_0_60px_-20px_rgba(16,185,129,0.3)]"
                    : "bg-zinc-900/50 border-zinc-800/60 hover:border-zinc-700"
                }`}
              >
                {highlighted ? (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald-500 text-black font-mono text-[10px] uppercase tracking-[0.18em] font-semibold">
                    Mais escolhido
                  </div>
                ) : null}

                <div className="mb-5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400">
                    {plan.badge}
                  </span>
                  <h3 className="mt-3 text-2xl font-bold text-zinc-100 tracking-tight">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-6 pb-5 border-b border-zinc-800/60">
                  <span className="text-3xl md:text-4xl font-bold text-zinc-100">
                    {plan.price}
                  </span>
                  {plan.priceSuffix ? (
                    <span className="text-sm text-zinc-500 ml-1">
                      {plan.priceSuffix}
                    </span>
                  ) : null}
                </div>

                <ul className="space-y-2.5 mb-7 flex-1">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-zinc-300 leading-relaxed"
                    >
                      <Check className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-2 mb-6 pb-5 border-t border-zinc-800/60 pt-5">
                  <p className="font-mono text-[11px] leading-relaxed text-emerald-300">
                    <span className="text-emerald-400">+</span> certo se{" "}
                    {plan.fitFor}
                  </p>
                  <p className="font-mono text-[11px] leading-relaxed text-zinc-500">
                    <span className="text-red-400/80">×</span> errado se{" "}
                    {plan.notFor}
                  </p>
                </div>

                <a
                  href={plan.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full py-3 px-6 text-center rounded-full font-semibold text-sm transition-colors ${
                    highlighted
                      ? "bg-emerald-500 text-black hover:bg-emerald-400"
                      : "bg-zinc-800 text-zinc-100 hover:bg-zinc-700"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center font-mono text-[11px] text-zinc-500 uppercase tracking-[0.16em]">
          valores em BRL · pagamento PIX/boleto · 50% início + 50% entrega em projetos fechados
        </p>
      </div>
    </section>
  );
}
