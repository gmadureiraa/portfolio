import type { Metadata } from "next";

import HalftonePhoto from "@/components/eu/halftone-photo";
import { profile, socialLinks } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Consultoria de IA pra agências e founders — Gabriel Madureira",
  description:
    "Workshops, consultoria 1-1 e sistemas customizados de IA pra integrar Claude/Gemini no teu negócio sem virar fábrica de prompt.",
  alternates: { canonical: "/lp" },
  openGraph: {
    title: "Consultoria de IA pra agências e founders — Gabriel Madureira",
    description:
      "Workshops, consultoria 1-1 e sistemas customizados de IA pra integrar Claude/Gemini no teu negócio sem virar fábrica de prompt.",
    url: "https://madureira.xyz/lp",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Consultoria de IA — Gabriel Madureira",
    description:
      "Workshops, consultoria 1-1 e sistemas customizados de IA pra agências e founders.",
  },
};

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://cal.com/madureira";

const WHATSAPP_BASE = `https://wa.me/${profile.whatsapp}`;
const WA_LP = `${WHATSAPP_BASE}?text=${encodeURIComponent(
  "Olá Gabriel, vim da página /lp e quero conversar sobre consultoria de IA.",
)}`;

const proofProducts = [
  {
    name: "Sequência Viral",
    metric: "Carrosséis IA com voz",
    href: "https://viral.kaleidos.com.br",
  },
  {
    name: "Reels Viral",
    metric: "Engenharia reversa de Reels",
    href: "https://reels.kaleidos.com.br",
  },
  {
    name: "Radar Viral",
    metric: "Brief diário cross-platform",
    href: "https://radar.kaleidos.com.br",
  },
  {
    name: "Kaleidos Pay",
    metric: "Cobrança Asaas + IA",
    href: "https://pay.kaleidos.com.br",
  },
];

type OfferProps = {
  label: string;
  title: string;
  price: string;
  description: string;
  bullets: string[];
  badge?: string;
};

function OfferCard({
  label,
  title,
  price,
  description,
  bullets,
  badge,
}: OfferProps) {
  return (
    <div className="group relative flex flex-col gap-4 border border-emerald-500/25 p-6 transition-colors hover:border-emerald-500/60 hover:bg-emerald-500/[0.03] lg:p-7">
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400">
          {label}
        </span>
        {badge ? (
          <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-emerald-400">
            {badge}
          </span>
        ) : null}
      </div>

      <h3 className="text-2xl font-bold leading-tight tracking-tight text-white lg:text-3xl">
        {title}
      </h3>

      <p className="font-mono text-[11px] leading-relaxed text-neutral-300 lg:text-xs">
        {description}
      </p>

      <ul className="flex flex-col gap-2 border-t border-emerald-500/15 pt-4">
        {bullets.map((b, i) => (
          <li
            key={i}
            className="flex items-start gap-2 font-mono text-[11px] leading-relaxed text-neutral-300"
          >
            <span className="mt-0.5 text-emerald-400" aria-hidden>
              &gt;
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto border-t border-emerald-500/15 pt-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400">
          Investimento
        </span>
        <p className="mt-1 font-mono text-sm font-semibold text-white">
          {price}
        </p>
      </div>
    </div>
  );
}

const steps = [
  {
    n: "01",
    title: "Brief 30min",
    body: "Call rápida pra entender o gargalo, time, stack e onde IA pode dar alavanca real.",
  },
  {
    n: "02",
    title: "Mapeamento",
    body: "Documento curto com hipóteses, sistema proposto e estimativa. Sem PDF de 80 páginas.",
  },
  {
    n: "03",
    title: "Entrega",
    body: "Workshop, mentoria ou sistema rodando — dependendo do escopo. Tudo aplicado no teu fluxo real.",
  },
  {
    n: "04",
    title: "Iteração",
    body: "2 a 4 semanas de ajuste pós-entrega. IA muda toda semana, então o sistema também muda.",
  },
];

const faq = [
  {
    q: "Tem vagas agora?",
    a: "Pego no máximo 3 contas em consultoria mensal por vez pra manter qualidade. Workshop e sistemas customizados rodam por demanda — pergunta no brief.",
  },
  {
    q: "Como você cobra?",
    a: "Workshop e sistemas customizados são fechados por escopo (50% início, 50% entrega). Consultoria mensal é boleto/PIX recorrente, sem fidelidade — cancela a qualquer mês.",
  },
  {
    q: "Trabalha com qual stack?",
    a: "Claude (Code/API), Gemini, OpenAI, n8n, Make, Cursor, Supabase, Next.js, Python. Stack do cliente é prioridade — não vou empurrar ferramenta nova só porque eu uso.",
  },
  {
    q: "E se a IA mudar daqui 3 meses?",
    a: "Vai mudar. Os sistemas que construo são modulares com camadas trocáveis — provider de IA, prompt, integração e UI separados. Atualizar é trocar peça, não refazer tudo.",
  },
  {
    q: "Atende fora do Brasil?",
    a: "Sim, em PT-BR ou EN. Consultoria mensal funciona melhor com gente do mesmo fuso (Américas), mas workshop e sistemas custom não têm restrição.",
  },
  {
    q: "Não tenho time técnico. Adianta?",
    a: "Adianta — boa parte da consultoria é justamente desenhar fluxos onde quem opera não precisa programar. Mas se for sistema customizado complexo, a gente alinha um dev seu (ou meu time) pra manutenção.",
  },
];

export default function LandingPage() {
  return (
    <main className="relative min-h-screen w-full bg-black text-white">
      {/* Grid overlay sutil */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-3 py-3 sm:px-5 sm:py-5">
        <div className="overflow-hidden rounded-md border border-emerald-500/30 bg-black/60 backdrop-blur-sm">
          {/* Top bar */}
          <div className="flex items-center justify-between gap-3 border-b border-emerald-500/20 px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="grid h-5 w-5 place-items-center bg-emerald-500 font-mono text-[11px] font-bold text-black">
                M
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400 sm:text-xs">
                Consultoria de IA · Gabriel Madureira
              </span>
            </div>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400 transition-colors hover:text-emerald-300 sm:block sm:text-xs"
            >
              Agendar conversa ↗
            </a>
          </div>

          {/* HERO */}
          <section className="grid grid-cols-1 lg:grid-cols-5 lg:divide-x lg:divide-emerald-500/20">
            <div className="flex flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:col-span-3 lg:px-10 lg:py-12">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400">
                Pra agências e founders
              </span>
              <h1 className="font-bold uppercase leading-[1.05] tracking-tight text-white text-2xl sm:text-3xl lg:text-4xl xl:text-[44px]">
                <span className="block">Eu construí 4 produtos</span>
                <span className="block">de IA do zero em 6 meses.</span>
                <span className="my-1 block w-fit bg-emerald-500 px-2 text-black">
                  Posso ensinar tua agência
                </span>
                <span className="block">ou time a fazer o mesmo.</span>
              </h1>

              <p className="max-w-2xl text-base leading-relaxed text-neutral-300 lg:text-lg">
                Consultoria 1-1 + workshops + sistemas customizados pra
                integrar IA no teu negócio sem virar fábrica de prompt vazio.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-500 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-black transition-colors hover:bg-emerald-400"
                >
                  Agendar conversa de 30min
                  <span aria-hidden>↗</span>
                </a>
                <a
                  href={WA_LP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-emerald-500/40 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400 transition-colors hover:bg-emerald-500/10"
                >
                  WhatsApp direto
                </a>
              </div>
            </div>

            {/* Foto halftone */}
            <div className="relative border-t border-emerald-500/20 p-4 sm:p-6 lg:col-span-2 lg:border-t-0">
              <HalftonePhoto />
            </div>
          </section>

          {/* PROVA SOCIAL — 4 produtos */}
          <section className="border-t border-emerald-500/20 px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
            <div className="mb-8 flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400">
                Construído (e construindo) em público
              </span>
              <h2 className="text-2xl font-bold uppercase tracking-tight text-white lg:text-3xl">
                4 produtos shipados. Centenas de criadores usando.
              </h2>
              <p className="max-w-2xl font-mono text-xs text-neutral-400">
                Não falo de IA por teoria. Falo do que tá rodando em produção,
                gerando receita e errando junto com a gente.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {proofProducts.map((p) => (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-2 border border-emerald-500/20 p-4 transition-colors hover:border-emerald-500/50 hover:bg-emerald-500/[0.03]"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400">
                    Live
                  </span>
                  <h3 className="text-lg font-bold text-white">{p.name}</h3>
                  <p className="font-mono text-[11px] text-neutral-400">
                    {p.metric}
                  </p>
                  <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-400 transition-transform group-hover:translate-x-0.5">
                    Abrir ↗
                  </span>
                </a>
              ))}
            </div>
          </section>

          {/* 3 OFERTAS */}
          <section className="border-t border-emerald-500/20 px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
            <div className="mb-8 flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400">
                3 formatos de trabalho
              </span>
              <h2 className="text-2xl font-bold uppercase tracking-tight text-white lg:text-3xl">
                Escolhe o nível de envolvimento.
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <OfferCard
                label="Pontual"
                title="Workshop 1-day"
                price="R$ 3-5k · 1 dia"
                description="Time aprende a usar Claude Code, Cursor e Gemini pra automação editorial e dev. Hands-on com casos reais do teu negócio."
                bullets={[
                  "6h de workshop ao vivo (presencial ou remoto)",
                  "Materiais e prompts customizados pro time",
                  "1 sessão de follow-up 2 semanas depois",
                ]}
              />
              <OfferCard
                label="Recorrente"
                title="Consultoria mensal"
                price="R$ 4-6k · /mês"
                description="6 horas/mês 1-1, review semanal e design de sistemas IA pra teu fluxo. Sem fidelidade."
                bullets={[
                  "1 call semanal de 1h focada em problema real",
                  "Review de prompts, agentes e automações",
                  "Acesso direto via WhatsApp/Slack pra dúvidas",
                ]}
                badge="3 vagas"
              />
              <OfferCard
                label="Implementação"
                title="Sistemas customizados"
                price="Sob orçamento"
                description="Construo o pipeline IA completo (scraper → IA → CMS/redes) pra teu caso. Entrega rodando, código teu."
                bullets={[
                  "Discovery + design + build + deploy",
                  "Stack moderno (Next, Supabase, Claude/Gemini)",
                  "Handoff com docs e treinamento do time",
                ]}
              />
            </div>
          </section>

          {/* COMO FUNCIONA */}
          <section className="border-t border-emerald-500/20 px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
            <div className="mb-8 flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400">
                Processo
              </span>
              <h2 className="text-2xl font-bold uppercase tracking-tight text-white lg:text-3xl">
                Como funciona.
              </h2>
            </div>

            <ol className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((s) => (
                <li
                  key={s.n}
                  className="flex flex-col gap-3 border border-emerald-500/20 p-5"
                >
                  <span className="font-mono text-3xl font-bold text-emerald-400">
                    {s.n}
                  </span>
                  <h3 className="text-lg font-bold uppercase tracking-tight text-white">
                    {s.title}
                  </h3>
                  <p className="font-mono text-[11px] leading-relaxed text-neutral-300">
                    {s.body}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          {/* FAQ */}
          <section className="border-t border-emerald-500/20 px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
            <div className="mb-8 flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400">
                Dúvidas comuns
              </span>
              <h2 className="text-2xl font-bold uppercase tracking-tight text-white lg:text-3xl">
                FAQ.
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {faq.map((f, i) => (
                <details
                  key={i}
                  className="group border border-emerald-500/20 p-5 transition-colors open:border-emerald-500/40 hover:border-emerald-500/40"
                >
                  <summary className="flex cursor-pointer items-start justify-between gap-3 list-none">
                    <h3 className="text-base font-bold text-white">{f.q}</h3>
                    <span
                      aria-hidden
                      className="font-mono text-emerald-400 transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 font-mono text-[11px] leading-relaxed text-neutral-300">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA FINAL */}
          <section className="border-t border-emerald-500/20 px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
            <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-col gap-3 max-w-2xl">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400">
                  Próximo passo
                </span>
                <h2 className="text-2xl font-bold uppercase tracking-tight text-white lg:text-4xl">
                  Bora montar isso pro teu time?
                </h2>
                <p className="font-mono text-xs text-neutral-300">
                  Brief de 30min, sem compromisso. Se eu não for a pessoa certa
                  pra esse projeto, te indico alguém que é.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-500 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-black transition-colors hover:bg-emerald-400"
                >
                  Agendar 30min
                  <span aria-hidden>↗</span>
                </a>
                <a
                  href={WA_LP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-emerald-500/40 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400 transition-colors hover:bg-emerald-500/10"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="flex flex-col items-start justify-between gap-3 border-t border-emerald-500/20 px-4 py-4 sm:flex-row sm:items-center sm:px-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-400 sm:text-xs">
              São Paulo, BR · {profile.twitterHandle}
            </span>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.22em] sm:text-xs">
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 transition-colors hover:text-white"
              >
                LinkedIn
              </a>
              <a
                href={socialLinks.x}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 transition-colors hover:text-white"
              >
                Twitter
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 transition-colors hover:text-white"
              >
                Instagram
              </a>
              <a
                href="/projetos"
                className="text-emerald-400 transition-colors hover:text-white"
              >
                Projetos
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
