import { RevealStagger, RevealItem } from "./reveal";

const products = [
  {
    name: "Sequência Viral",
    href: "https://viral.kaleidos.com.br",
    role: "Cola link viral, sai carrossel",
    stack: ["Next 16", "Gemini 2.5", "Imagen 4", "Stripe"],
    learning:
      "Template vence prompt. IA precisa de contexto fixo, não criatividade infinita.",
  },
  {
    name: "Reels Viral",
    href: "https://reels.kaleidos.com.br",
    role: "Engenharia reversa de reel",
    stack: ["Next 16", "Apify", "Gemini Flash", "Neon"],
    learning:
      "Estrutura é replicável, copy é único. Engenharia reversa entrega esqueleto, não atalho.",
  },
  {
    name: "Radar Viral",
    href: "https://radar.kaleidos.com.br",
    role: "Brief diário cross-platform",
    stack: ["Next 16", "Cron", "Gemini OCR", "Postgres"],
    learning:
      "Tendência sem síntese é só ruído. Cruzar 4 fontes filtra o que vira pauta.",
  },
  {
    name: "Kaleidos Pay",
    href: "https://pay.kaleidos.com.br",
    role: "Cobrança Asaas + WhatsApp",
    stack: ["Next", "Asaas", "whatsapp-web.js", "Supabase"],
    learning:
      "Infra interna libera mais tempo do time que SaaS pago. Construir é mais barato do que parece.",
  },
];

export default function ProductsGrid() {
  return (
    <RevealStagger
      className="grid grid-cols-1 gap-3 sm:grid-cols-2"
      staggerChildren={0.1}
    >
      {products.map((p) => (
        <RevealItem key={p.name}>
          <a
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-full flex-col gap-4 overflow-hidden border border-emerald-500/20 bg-black p-6 transition-colors hover:border-emerald-500/55 hover:bg-emerald-500/[0.03] lg:p-7"
          >
            {/* Glow on hover */}
            <div
              aria-hidden
              className="absolute -inset-px -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(16,185,129,0.08), transparent 50%)",
              }}
            />

            <div className="flex items-start justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400"
                />
                Live
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400 transition-transform group-hover:translate-x-1">
                Abrir ↗
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <h3 className="text-2xl font-bold tracking-tight text-white">
                {p.name}
              </h3>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-emerald-400/80">
                {p.role}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="border border-emerald-500/20 bg-emerald-500/[0.03] px-2 py-0.5 font-mono text-[10px] text-neutral-400"
                >
                  {s}
                </span>
              ))}
            </div>

            <p className="mt-auto border-t border-emerald-500/15 pt-4 font-mono text-[11px] leading-relaxed text-neutral-300 lg:text-xs">
              <span className="text-emerald-400">→</span> {p.learning}
            </p>
          </a>
        </RevealItem>
      ))}
    </RevealStagger>
  );
}
