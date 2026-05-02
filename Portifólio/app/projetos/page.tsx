import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { socialLinks } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Projetos — Gabriel Madureira",
  description:
    "Produtos de IA shipados (e em construção). Sequência Viral, Reels Viral, Radar Viral, Kaleidos Pay e mais.",
  alternates: { canonical: "/projetos" },
  openGraph: {
    title: "Projetos — Gabriel Madureira",
    description:
      "Produtos de IA shipados (e em construção). Sequência Viral, Reels Viral, Radar Viral, Kaleidos Pay e mais.",
    url: "https://madureira.xyz/projetos",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projetos — Gabriel Madureira",
    description:
      "Produtos de IA shipados (e em construção). Construído em público.",
  },
};

type Status = "Live" | "Beta" | "Em construção" | "Soft launch";

type Project = {
  name: string;
  tagline: string;
  stack: string[];
  status: Status;
  url?: string;
  image?: string;
  fallback?: string; // gradient (CSS) usado quando não tem screenshot
  takeaway: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    name: "Sequência Viral",
    tagline:
      "Carrosséis com IA pra Instagram, LinkedIn e X. Conceito + copy + imagens em dois cliques.",
    stack: ["Next.js 16", "Supabase", "Gemini 2.5 Pro", "Imagen 4", "Stripe"],
    status: "Live",
    url: "https://viral.kaleidos.com.br",
    image: "/images/projects/sequencia-viral.png",
    takeaway:
      "Aprendi a desenhar prompt-systems que mantêm voz consistente em escala. Stripe, paywalls e recurring billing rodando há meses.",
    featured: true,
  },
  {
    name: "Reels Viral",
    tagline:
      "Cole um Reel viral, IA extrai estrutura — hook, ritmo, gatilhos, storyboard cena por cena.",
    stack: ["Next.js 16", "Neon", "Gemini 2.5 Flash", "Apify"],
    status: "Live",
    url: "https://reels.kaleidos.com.br",
    fallback: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    takeaway:
      "Pipeline híbrido: localStorage pra anônimos, DB pra logados. Apify pra scraping de Reels com cache de 24h.",
    featured: true,
  },
  {
    name: "Radar Viral",
    tagline:
      "Brief diário cross-platform — YouTube, Instagram, X, LinkedIn, notícias e newsletters num só feed.",
    stack: ["Next.js", "Supabase", "Apify", "Gemini OCR"],
    status: "Live",
    url: "https://radar.kaleidos.com.br",
    fallback: "from-lime-500/20 via-lime-500/5 to-transparent",
    takeaway:
      "Quotas por plano + scraping defensivo. Transcrição de IG só on-demand pra não estourar custo de API.",
    featured: true,
  },
  {
    name: "Kaleidos Pay",
    tagline:
      "Plataforma de cobrança Asaas pra agências — boletos, PIX e recorrência sem dor de cabeça.",
    stack: ["Next.js", "Supabase", "Asaas API"],
    status: "Beta",
    url: "https://pay.kaleidos.com.br",
    image: "/images/projects/kaleidos-pay.png",
    takeaway:
      "Webhook hell domado. Reconciliação automática de pagamentos com state machine bem definida.",
    featured: true,
  },
  {
    name: "AutoBlogger",
    tagline:
      "Blog engine com IA — gera, valida SEO, agenda e publica. Ideal pra volume com qualidade editorial.",
    stack: ["Next.js", "Gemini 2.5 Flash", "Supabase"],
    status: "Live",
    url: "https://template-brutalist-saas.vercel.app",
    image: "/images/projects/autoblogger.png",
    takeaway:
      "Visual brutalist distintivo + pipeline simples (Gemini Flash com thinkingBudget 0). Velocidade > sofisticação.",
  },
  {
    name: "AdFlow / Möbius",
    tagline:
      "URL da marca + fotos viram 40 variações de anúncio em ~10min, com copy e layout prontos.",
    stack: ["Next.js", "IA multimodal", "Meta Ads"],
    status: "Beta",
    url: "https://app-alpha-jet-10.vercel.app",
    image: "/images/projects/adflow.png",
    takeaway:
      "Inspirado no NBS — provou que dá pra automatizar criativo estático sem perder marca.",
  },
  {
    name: "Folio",
    tagline:
      "Portfolio tracker e wallet tracker cripto multi-chain. Preços reais, PnL e NFTs num só lugar.",
    stack: ["React", "TypeScript", "CoinGecko", "DeFiLlama"],
    status: "Soft launch",
    url: "https://folio-landing.vercel.app/app",
    image: "/images/projects/folio.png",
    takeaway:
      "Multi-chain é dor — cada API tem seu rate limit, schema e quirk. Cache + abstração salvou o produto.",
  },
  {
    name: "DeFi Radar",
    tagline:
      "Yield scanner DeFi com preços, gas, baleias e alertas em dashboard único.",
    stack: ["React", "Three.js", "CoinGecko", "Recharts"],
    status: "Live",
    url: "https://radar.kaleidos.com.br",
    image: "/images/projects/defi-radar.png",
    takeaway:
      "Three.js no hero + dados em tempo real. Aprendi a balancear visual hero-grade com performance mobile.",
  },
];

const STATUS_STYLES: Record<Status, string> = {
  Live: "bg-emerald-500/15 text-emerald-400 border-emerald-500/40",
  Beta: "bg-amber-500/15 text-amber-400 border-amber-500/40",
  "Em construção": "bg-neutral-500/15 text-neutral-300 border-neutral-500/40",
  "Soft launch": "bg-cyan-500/15 text-cyan-300 border-cyan-500/40",
};

const clientCases = [
  {
    label: "Cripto B2C",
    headline: "10k visitas orgânicas/mês em 6 meses",
    body:
      "Estratégia de conteúdo + SEO + newsletter automatizada com IA pra um portal de análise cripto. Resultado: tráfego orgânico de 10k/mês e lista de email engajada.",
  },
  {
    label: "Educação Web3",
    headline: "Dobrou a audiência de IG em 90 dias",
    body:
      "Sistema de produção de carrosséis com IA mantendo voz e marca. Postagem diária sustentada, taxa de engajamento subiu, parcerias fechadas via DM.",
  },
  {
    label: "Fintech B2B",
    headline: "Pipeline comercial 100% automatizado",
    body:
      "Scraper + qualificação por IA + sequência de email no Resend. Time comercial só toca lead quente. Custo operacional caiu, conversão subiu.",
  },
];

function StatusPill({ status }: { status: Status }) {
  return (
    <span
      className={`rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const Wrapper = project.url ? "a" : "div";
  const wrapperProps = project.url
    ? {
        href: project.url,
        target: "_blank" as const,
        rel: "noopener noreferrer",
      }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="group flex flex-col overflow-hidden border border-emerald-500/25 bg-black/40 transition-colors hover:border-emerald-500/60 hover:bg-emerald-500/[0.03]"
    >
      {/* Cover */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-emerald-500/20 bg-neutral-950">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div
            className={`relative flex h-full w-full items-center justify-center bg-gradient-to-br ${
              project.fallback ?? "from-emerald-500/20 via-emerald-500/5 to-transparent"
            }`}
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(16,185,129,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(16,185,129,0.25) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <span className="relative font-mono text-2xl font-bold uppercase tracking-tight text-white/90 sm:text-3xl">
              {project.name}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold leading-tight tracking-tight text-white sm:text-2xl">
            {project.name}
          </h3>
          <StatusPill status={project.status} />
        </div>

        <p className="text-sm leading-relaxed text-neutral-300">
          {project.tagline}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="border border-emerald-500/20 bg-emerald-500/[0.03] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-emerald-400/90"
            >
              {s}
            </span>
          ))}
        </div>

        <p className="border-t border-emerald-500/15 pt-3 font-mono text-[11px] leading-relaxed text-neutral-400">
          {project.takeaway}
        </p>

        {project.url ? (
          <span className="mt-auto inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-400 transition-transform group-hover:translate-x-0.5">
            Abrir produto ↗
          </span>
        ) : null}
      </div>
    </Wrapper>
  );
}

export default function ProjetosPage() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

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
              <Link
                href="/"
                className="grid h-5 w-5 place-items-center bg-emerald-500 font-mono text-[11px] font-bold text-black"
                aria-label="Voltar para home"
              >
                M
              </Link>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400 sm:text-xs">
                Projetos · Gabriel Madureira
              </span>
            </div>
            <Link
              href="/lp"
              className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400 transition-colors hover:text-emerald-300 sm:block sm:text-xs"
            >
              Consultoria ↗
            </Link>
          </div>

          {/* Header */}
          <section className="border-b border-emerald-500/20 px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
            <div className="flex flex-col gap-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400">
                Construído (e construindo) em público
              </span>
              <h1 className="font-bold uppercase leading-[1.05] tracking-tight text-white text-3xl sm:text-4xl lg:text-5xl xl:text-[56px]">
                <span className="block">Produtos shipados,</span>
                <span className="my-1 block w-fit bg-emerald-500 px-2 text-black">
                  receita rodando,
                </span>
                <span className="block">erros documentados.</span>
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-neutral-300 lg:text-lg">
                {projects.length} produtos de IA, marketing e cripto que toquei
                do zero até produção. Cada um tem URL ao vivo (ou link pra beta
                fechado) e uma lição que continua valendo.
              </p>
            </div>
          </section>

          {/* Trio viral em destaque */}
          <section className="border-b border-emerald-500/20 px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
            <div className="mb-8 flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400">
                Em destaque
              </span>
              <h2 className="text-xl font-bold uppercase tracking-tight text-white lg:text-2xl">
                Trio viral + Kaleidos Pay
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
              {featured.map((p) => (
                <ProjectCard key={p.name} project={p} />
              ))}
            </div>
          </section>

          {/* Outros projetos */}
          <section className="border-b border-emerald-500/20 px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
            <div className="mb-8 flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400">
                Mais produtos
              </span>
              <h2 className="text-xl font-bold uppercase tracking-tight text-white lg:text-2xl">
                Outros projetos em produção
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 lg:gap-6">
              {others.map((p) => (
                <ProjectCard key={p.name} project={p} />
              ))}
            </div>
          </section>

          {/* Para clientes */}
          <section className="border-b border-emerald-500/20 px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
            <div className="mb-8 flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400">
                Pra clientes (anonimizados)
              </span>
              <h2 className="text-2xl font-bold uppercase tracking-tight text-white lg:text-3xl">
                Casos reais Kaleidos.
              </h2>
              <p className="max-w-2xl font-mono text-xs text-neutral-400">
                O que rodamos pelos clientes da agência — nomes guardados,
                resultados medidos.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
              {clientCases.map((c) => (
                <div
                  key={c.headline}
                  className="flex flex-col gap-3 border border-emerald-500/25 p-5 lg:p-6"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400">
                    {c.label}
                  </span>
                  <h3 className="text-lg font-bold leading-tight tracking-tight text-white lg:text-xl">
                    {c.headline}
                  </h3>
                  <p className="font-mono text-[11px] leading-relaxed text-neutral-300">
                    {c.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
            <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-col gap-3 max-w-2xl">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400">
                  Quer construir junto?
                </span>
                <h2 className="text-2xl font-bold uppercase tracking-tight text-white lg:text-4xl">
                  Posso fazer parecido pro teu negócio.
                </h2>
                <p className="font-mono text-xs text-neutral-300">
                  Workshop, consultoria mensal ou sistema customizado — vê os 3
                  formatos na página de consultoria.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/lp"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-500 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-black transition-colors hover:bg-emerald-400"
                >
                  Ver consultoria
                  <span aria-hidden>↗</span>
                </Link>
                <a
                  href={socialLinks.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-emerald-500/40 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400 transition-colors hover:bg-emerald-500/10"
                >
                  Acompanhar no Twitter
                </a>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="flex flex-col items-start justify-between gap-3 border-t border-emerald-500/20 px-4 py-4 sm:flex-row sm:items-center sm:px-6">
            <Link
              href="/"
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-400 transition-colors hover:text-emerald-400 sm:text-xs"
            >
              ← Voltar pra home
            </Link>
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
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 transition-colors hover:text-white"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
