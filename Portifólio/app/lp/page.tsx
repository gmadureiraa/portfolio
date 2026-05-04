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

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const painPoints = [
  {
    title: "2h/dia copy-pasting prompts",
    body: "Cada criativo perde 10h/sem procurando o prompt certo num Notion com 80 páginas. Em 30 dias ninguém lembra qual era a versão que funcionava.",
  },
  {
    title: "Cada projeto vira pesquisa de ferramenta",
    body: "Em vez de executar, o time abre 4 abas: Claude, ChatGPT, Gemini, Perplexity. Decide pelo gosto da hora. Sai cara, sai lento, sai sem padrão.",
  },
  {
    title: "Cliente paga estratégia, recebe rascunho",
    body: "IA entrega o primeiro draft em 30s. Mas a curadoria humana que transforma rascunho em entrega come 6h do PM e some no orçamento.",
  },
  {
    title: "Tooling viral no Twitter, zero pipeline",
    body: "Aquele agente que viralizou virou demo de stand. Sem retenção, sem versionamento, sem custo controlado. 3 meses depois ninguém usa.",
  },
];

const builtProducts = [
  {
    name: "Sequência Viral",
    href: "https://viral.kaleidos.com.br",
    role: "Carrosséis IA com voz",
    learning:
      "Template vence prompt. IA precisa de contexto fixo, não de criatividade infinita.",
  },
  {
    name: "Reels Viral",
    href: "https://reels.kaleidos.com.br",
    role: "Engenharia reversa de viral",
    learning:
      "Estrutura é replicável, copy é único. Engenharia reversa entrega esqueleto, não atalho.",
  },
  {
    name: "Radar Viral",
    href: "https://radar.kaleidos.com.br",
    role: "Brief diário cross-platform",
    learning:
      "Tendência sem síntese é só ruído. Cruzar 4 fontes filtra o que vira pauta.",
  },
  {
    name: "Kaleidos Pay",
    href: "https://pay.kaleidos.com.br",
    role: "Cobrança Asaas + IA",
    learning:
      "Infra interna libera mais tempo da equipe que SaaS pago. Construir é mais barato que se imagina.",
  },
];

type OfferProps = {
  label: string;
  title: string;
  price: string;
  description: string;
  bullets: string[];
  fitFor: string;
  notFor: string;
  deliverable: string;
  badge?: string;
};

function OfferCard({
  label,
  title,
  price,
  description,
  bullets,
  fitFor,
  notFor,
  deliverable,
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

      <div className="flex flex-col gap-3 border-t border-emerald-500/15 pt-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400">
            Entregável
          </span>
          <p className="mt-1 font-mono text-[11px] leading-relaxed text-neutral-300">
            {deliverable}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <p className="font-mono text-[11px] leading-relaxed text-emerald-300">
            <span className="text-emerald-400">+</span> certo se {fitFor}
          </p>
          <p className="font-mono text-[11px] leading-relaxed text-neutral-500">
            <span className="text-red-400/80">×</span> errado se {notFor}
          </p>
        </div>
      </div>

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

const credibility = [
  "Fundador da Kaleidos há 5+ anos — agência focada em cripto, web3 e fintech",
  "8 clientes ativos rodando estratégia de conteúdo + IA na operação",
  "4 produtos shipados em 6 meses — todos em produção, gerando uso real",
  "Construo em público no X (@ogmadureira) e LinkedIn — processo aberto, não promessa",
];

const notForList = [
  "Empresa grande com 6 meses de comitê pra aprovar prompt — velocidade é meio do trabalho",
  "Briefing vago do tipo 'quero usar IA' sem problema concreto — não vendo IA, vendo solução",
  "Cliente que quer só 'aquele prompt mágico' — se fosse só prompt, já tinha resolvido",
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
    q: "Funciona com time pequeno?",
    a: "Funciona melhor, na real. O foco da consultoria é destravar 1 a 3 pessoas que já operam. Sistema bom é o que cabe no time que tem, não o que precisa de mais 5 contratações.",
  },
  {
    q: "Faz integração com meu stack atual?",
    a: "Notion, Slack, Airtable, Asana, ClickUp, Supabase, Linear e webhook genérico — cobertura via n8n/Make. Stack mais exótico a gente avalia no brief.",
  },
  {
    q: "Quanto tempo até primeiro resultado?",
    a: "Workshop entrega no mesmo dia (time saindo aplicando). Consultoria mensal mostra ganho mensurável em 2 a 4 semanas. Sistema customizado fica pronto em 4 a 8 semanas.",
  },
  {
    q: "Atende fora do Brasil?",
    a: "Sim, em PT-BR ou EN. Consultoria mensal funciona melhor com gente do mesmo fuso (Américas), mas workshop e sistemas custom não têm restrição.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// REUSABLE BLOCKS
// ─────────────────────────────────────────────────────────────────────────────

function SectionHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
}) {
  return (
    <div className="mb-8 flex flex-col gap-3">
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400">
        {eyebrow}
      </span>
      <h2 className="text-2xl font-bold uppercase tracking-tight text-white lg:text-3xl">
        {title}
      </h2>
      {intro ? (
        <p className="max-w-3xl text-sm leading-relaxed text-neutral-300 lg:text-base">
          {intro}
        </p>
      ) : null}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

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

          {/* ════════════════════════════════════════════════════════════ */}
          {/* DOBRA 1 — HERO */}
          {/* ════════════════════════════════════════════════════════════ */}
          <section className="grid grid-cols-1 lg:grid-cols-5 lg:divide-x lg:divide-emerald-500/20">
            <div className="flex flex-col gap-7 px-4 py-8 sm:px-6 sm:py-10 lg:col-span-3 lg:px-10 lg:py-12">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400">
                  Pra founders, heads e agências
                </span>
                <span className="hidden h-1 w-1 rounded-full bg-emerald-500/40 sm:block" />
                <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-300/70 sm:block">
                  3 vagas em consultoria mensal
                </span>
              </div>

              <h1 className="font-bold uppercase leading-[1.05] tracking-tight text-white text-2xl sm:text-3xl lg:text-4xl xl:text-[44px]">
                <span className="block">Sequência Viral, Reels Viral,</span>
                <span className="block">Radar Viral e Kaleidos Pay.</span>
                <span className="my-1 block w-fit bg-emerald-500 px-2 text-black">
                  4 produtos de IA em 6 meses.
                </span>
                <span className="block">Posso ensinar teu time a fazer igual.</span>
              </h1>

              <p className="max-w-2xl text-base leading-relaxed text-neutral-300 lg:text-lg">
                Consultoria 1-1, workshops e sistemas customizados pra integrar
                Claude e Gemini no teu negócio sem virar fábrica de prompt em
                Notion bagunçado.
              </p>

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
                  WhatsApp direto
                </a>
              </div>

              {/* Stat bar */}
              <dl className="grid grid-cols-2 gap-4 border-t border-emerald-500/15 pt-5 sm:grid-cols-4">
                {[
                  { v: "5+", l: "anos founder" },
                  { v: "8", l: "clientes ativos" },
                  { v: "4", l: "produtos shipados" },
                  { v: "100%", l: "código teu" },
                ].map((s) => (
                  <div key={s.l} className="flex flex-col gap-1">
                    <dt className="font-mono text-xl font-bold text-emerald-400 lg:text-2xl">
                      {s.v}
                    </dt>
                    <dd className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-400">
                      {s.l}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Foto halftone */}
            <div className="relative border-t border-emerald-500/20 p-4 sm:p-6 lg:col-span-2 lg:border-t-0">
              <HalftonePhoto />
            </div>
          </section>

          {/* ════════════════════════════════════════════════════════════ */}
          {/* DOBRA 2 — PROBLEMA */}
          {/* ════════════════════════════════════════════════════════════ */}
          <section className="border-t border-emerald-500/20 px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
            <SectionHeader
              eyebrow="O Problema"
              title={
                <>
                  Tem 1.000 prompts circulando, mas tua agência não fica mais
                  rápida. Tem 50 ferramentas IA, mas o cliente continua
                  reclamando.
                </>
              }
              intro="A maioria dos times tá empilhando ferramenta sem desenhar fluxo. IA virou commodity, mas operação não. Esses são os 4 sintomas que mais aparecem quando começo um brief."
            />

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {painPoints.map((p, i) => (
                <div
                  key={i}
                  className="group relative flex gap-4 border border-emerald-500/20 p-5 transition-colors hover:border-emerald-500/45 hover:bg-emerald-500/[0.02] lg:p-6"
                >
                  <span
                    aria-hidden
                    className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-red-500/40 bg-red-500/10 font-mono text-[11px] font-bold text-red-400"
                  >
                    ×
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-base font-bold uppercase tracking-tight text-white lg:text-lg">
                      {p.title}
                    </h3>
                    <p className="font-mono text-[11px] leading-relaxed text-neutral-400 lg:text-xs">
                      {p.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ════════════════════════════════════════════════════════════ */}
          {/* DOBRA 3 — A VIRADA */}
          {/* ════════════════════════════════════════════════════════════ */}
          <section className="border-t border-emerald-500/20 px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
            <SectionHeader
              eyebrow="A Virada"
              title={
                <>
                  IA não é prompt. É sistema. E eu mostro qual é o desenho
                  certo pra cada caso.
                </>
              }
            />

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
              <div className="flex flex-col gap-4 lg:col-span-3">
                <p className="text-base leading-relaxed text-neutral-300 lg:text-lg">
                  Quem trata IA como prompt fica preso copiando texto de
                  Notion. Quem trata como sistema desenha contexto, integração,
                  versionamento e custo, e destrava o time inteiro.
                </p>
                <p className="text-base leading-relaxed text-neutral-300 lg:text-lg">
                  Na Kaleidos eu construí 8 sistemas internos pra resolver isso
                  na nossa operação: KAI (planning multi-cliente), AutoBlogger
                  (SEO em escala), Radar Viral (cross-platform), pipeline
                  editorial Defiverso, automação ManyChat, Kaleidos Pay,
                  agentes de pesquisa e cobrança Asaas. Cada um virou
                  aprendizado de onde IA cabe e onde IA atrapalha.
                </p>
                <p className="text-base leading-relaxed text-neutral-300 lg:text-lg">
                  Um agente bem desenhado substitui 4h de trabalho repetitivo
                  por dia. Um prompt solto substitui zero. Meu papel é
                  desenhar essa camada entre a IA, o time e o cliente pra teu
                  negócio sair de demo bonito pra operação que escala.
                </p>
              </div>

              <aside className="flex flex-col justify-between gap-6 border border-emerald-500/30 bg-emerald-500/[0.04] p-6 lg:col-span-2 lg:p-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400">
                  Em números
                </span>
                <div className="flex flex-col gap-5">
                  <div>
                    <p className="font-mono text-3xl font-bold text-emerald-400 lg:text-4xl">
                      4
                    </p>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-400">
                      produtos públicos shipados em 6 meses
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-3xl font-bold text-emerald-400 lg:text-4xl">
                      8
                    </p>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-400">
                      sistemas internos rodando na agência
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-3xl font-bold text-emerald-400 lg:text-4xl">
                      4h
                    </p>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-400">
                      por dia que um agente bem desenhado libera
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </section>

          {/* ════════════════════════════════════════════════════════════ */}
          {/* DOBRA 4 — OFERTAS */}
          {/* ════════════════════════════════════════════════════════════ */}
          <section className="border-t border-emerald-500/20 px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
            <SectionHeader
              eyebrow="O Que Eu Entrego"
              title="Escolhe o nível de envolvimento."
              intro="Três formatos. Mesma filosofia: IA como sistema, não como atalho. Cada um com escopo claro, deliverable concreto e zero PDF de 80 páginas."
            />

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <OfferCard
                label="Pontual"
                title="Workshop 1-day"
                price="R$ 3-5k · 1 dia"
                description="Time aprende a usar Claude Code, Cursor e Gemini pra automação editorial e dev. Hands-on com casos reais do teu negócio."
                bullets={[
                  "6h de workshop ao vivo (presencial ou remoto)",
                  "Materiais e prompts customizados pro time",
                  "Templates de agentes pra teu fluxo editorial",
                  "1 sessão de follow-up 2 semanas depois",
                  "Gravação completa + repositório de prompts",
                ]}
                deliverable="Time saindo do dia já operando com 3 agentes prontos no fluxo real."
                fitFor="tu quer destravar 4-8 pessoas em 1 dia"
                notFor="tu precisa de sistema custom rodando em produção"
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
                  "Mapa mensal de onde IA pode entrar no fluxo",
                  "Relatório curto de uso e custo de tokens",
                ]}
                deliverable="Agenda mensal com 4 entregas concretas — agente, automação, fluxo ou doc — versionadas."
                fitFor="tu opera time de 1-10 pessoas e quer evolução contínua"
                notFor="tu quer entrega única e pronta"
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
                  "Integrações com Notion, Slack, Airtable, n8n",
                  "Handoff com docs e treinamento do time",
                  "30 dias de suporte pós-launch incluso",
                ]}
                deliverable="Sistema rodando em produção, código no teu GitHub, time treinado pra manter."
                fitFor="tu tem problema específico e quer ferramenta tua"
                notFor="tu não tem clareza do problema ainda"
              />
            </div>
          </section>

          {/* ════════════════════════════════════════════════════════════ */}
          {/* DOBRA 5 — COMO FUNCIONA */}
          {/* ════════════════════════════════════════════════════════════ */}
          <section className="border-t border-emerald-500/20 px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
            <SectionHeader
              eyebrow="Processo"
              title="Como funciona."
              intro="4 etapas iguais pra qualquer formato. Tudo curto, documentado e focado em fluxo real, não em entregar pacote bonito que ninguém usa."
            />

            <ol className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((s) => (
                <li
                  key={s.n}
                  className="flex flex-col gap-3 border border-emerald-500/20 p-5 transition-colors hover:border-emerald-500/45 hover:bg-emerald-500/[0.02]"
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

          {/* ════════════════════════════════════════════════════════════ */}
          {/* DOBRA 6 — PROVA / O QUE EU JÁ CONSTRUÍ */}
          {/* ════════════════════════════════════════════════════════════ */}
          <section className="border-t border-emerald-500/20 px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
            <SectionHeader
              eyebrow="O Que Eu Já Construí"
              title="4 produtos shipados em 6 meses. Cada um virou aprendizado que vira sistema pros clientes."
              intro="Não falo de IA por teoria. Cada produto abaixo está em produção, com criadores reais usando — e cada um deixou um aprendizado que aplico em todo brief novo."
            />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {builtProducts.map((p) => (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-4 border border-emerald-500/25 p-6 transition-colors hover:border-emerald-500/55 hover:bg-emerald-500/[0.03] lg:p-7"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400">
                      Live
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-400 transition-transform group-hover:translate-x-0.5">
                      Abrir ↗
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-bold tracking-tight text-white lg:text-2xl">
                      {p.name}
                    </h3>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-400/80">
                      {p.role}
                    </p>
                  </div>
                  <p className="border-t border-emerald-500/15 pt-4 font-mono text-[11px] leading-relaxed text-neutral-300 lg:text-xs">
                    <span className="text-emerald-400">→</span> {p.learning}
                  </p>
                </a>
              ))}
            </div>
          </section>

          {/* ════════════════════════════════════════════════════════════ */}
          {/* DOBRA 7 — QUEM SOU EU */}
          {/* ════════════════════════════════════════════════════════════ */}
          <section className="border-t border-emerald-500/20 px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
            <SectionHeader
              eyebrow="Quem"
              title="Por que comigo."
            />

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
              <div className="lg:col-span-2">
                <HalftonePhoto />
              </div>

              <div className="flex flex-col gap-6 lg:col-span-3">
                <p className="text-base leading-relaxed text-neutral-300 lg:text-lg">
                  Sou Gabriel. Fundador da Kaleidos, agência de marketing
                  digital com foco em cripto, web3 e fintech. Os últimos 6
                  meses foram inteiros construindo IA aplicada pra resolver
                  problema real, em produção, pagando salário.
                </p>

                <ul className="flex flex-col gap-3 border-t border-emerald-500/15 pt-5">
                  {credibility.map((c, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 font-mono text-[11px] leading-relaxed text-neutral-300 lg:text-xs"
                    >
                      <span className="mt-0.5 text-emerald-400" aria-hidden>
                        ▸
                      </span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-emerald-500/15 pt-5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                    Não trabalho com
                  </span>
                  <ul className="mt-3 flex flex-col gap-2">
                    {notForList.map((n, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 font-mono text-[11px] leading-relaxed text-neutral-500 lg:text-xs"
                      >
                        <span
                          className="mt-0.5 text-red-400/70"
                          aria-hidden
                        >
                          ×
                        </span>
                        <span>{n}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* ════════════════════════════════════════════════════════════ */}
          {/* DOBRA 8 — FAQ */}
          {/* ════════════════════════════════════════════════════════════ */}
          <section className="border-t border-emerald-500/20 px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
            <SectionHeader
              eyebrow="Dúvidas Comuns"
              title="FAQ."
              intro="As perguntas que mais aparecem antes do brief. Se a tua não estiver aqui, manda no WhatsApp — respondo direto."
            />

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

          {/* ════════════════════════════════════════════════════════════ */}
          {/* DOBRA 9 — CTA FINAL */}
          {/* ════════════════════════════════════════════════════════════ */}
          <section className="border-t-2 border-emerald-500/60 bg-emerald-500/[0.03] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
            <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-col gap-4 max-w-2xl">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400">
                  Próximo passo
                </span>
                <h2 className="text-3xl font-bold uppercase leading-[1.05] tracking-tight text-white lg:text-5xl">
                  <span className="block">30 minutos</span>
                  <span className="my-1 block w-fit bg-emerald-500 px-2 text-black">
                    comigo.
                  </span>
                </h2>
                <p className="text-base leading-relaxed text-neutral-300 lg:text-lg">
                  Brief sem compromisso. Se eu não for a pessoa certa pra esse
                  projeto, te indico alguém que é — sem rodeio.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-500 px-8 py-4 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-black transition-colors hover:bg-emerald-400"
                >
                  Agendar 30min
                  <span aria-hidden>↗</span>
                </a>
                <a
                  href={WA_LP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-emerald-500/40 px-8 py-4 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400 transition-colors hover:bg-emerald-500/10"
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
