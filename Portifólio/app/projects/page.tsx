"use client";

import React, { useState, useEffect, Suspense } from "react";
import { BentoGrid } from "@/components/magicui/bento-grid";
import { FadeIn } from "@/components/magicui/fade-in";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

type ItemType = "Projeto" | "Artigo";
type ViewMode = "grid" | "list";

interface ContentItem {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  area: string | string[];
  status?: string;
  slug: string;
  image: string;
  type: ItemType;
  date?: string;
  externalUrl?: string;
}

const projects: ContentItem[] = [
  {
    id: 1,
    title: "Kaleidos Digital",
    description: "Minha agência de marketing digital para cripto, web3 e fintech. O negócio que sustenta tudo: time distribuído, automações de IA no centro da operação e clientes em produção.",
    technologies: ["Marketing", "IA", "Growth", "Copywriting"],
    area: ["Marketing", "Crypto"],
    status: "Ativo",
    slug: "kaleidos-digital",
    image: "/images/projects/kaleidos-digital.svg",
    type: "Projeto",
    date: "2024-01-01",
    externalUrl: "https://kaleidos.com.br",
  },
  {
    id: 2,
    title: "KAI Kreator",
    description: "Ferramenta interna da Kaleidos para gestão editorial com IA. Orquestra pipeline de conteúdo dos clientes, detecta tendências no YouTube e automatiza briefings, roteiros e publicação.",
    technologies: ["React 18", "Vite", "Supabase", "YouTube API", "IA"],
    area: ["Programação e Dev", "IA e Automações", "Marketing"],
    status: "Interno",
    slug: "kai-kreator",
    image: "/images/projects/kai-kreator.svg",
    type: "Projeto",
    date: "2026-03-17",
  },
  {
    id: 3,
    title: "Kaleidos Pay",
    description: "Gateway de pagamentos para agências com PIX e cripto. Unifica cobrança recorrente, split de comissão e conciliação num painel só. Landing em desenvolvimento, produto em soft launch.",
    technologies: ["Next.js", "Supabase", "Stripe", "PIX"],
    area: ["Programação e Dev", "Marketing"],
    status: "Soft launch",
    slug: "kaleidos-pay",
    image: "/images/projects/kaleidos-pay.svg",
    type: "Projeto",
    date: "2026-04-12",
  },
  {
    id: 4,
    title: "Jornal Cripto",
    description: "Portal de análise cripto que atingiu 10k visitas/mês organicamente. Newsletter 2x/semana com insights em tempo real. O projeto que me colocou no mapa do mercado cripto.",
    technologies: ["Next.js", "SEO", "Email Marketing", "n8n"],
    area: ["Crypto", "Marketing"],
    status: "Ativo",
    slug: "jornal-cripto",
    image: "/images/projects/jornal-cripto.svg",
    type: "Projeto",
    date: "2023-10-01",
    externalUrl: "https://jornal-cripto.vercel.app",
  },
  {
    id: 5,
    title: "Folio",
    description: "Portfolio tracker e wallet tracker cripto multi-chain. Consolida preços reais, gráficos históricos, PnL e NFTs em uma interface simples. Em soft launch.",
    technologies: ["React", "TypeScript", "CoinGecko", "DeFiLlama"],
    area: ["Programação e Dev", "Crypto"],
    status: "Soft launch",
    slug: "folio",
    image: "/images/projects/folio.svg",
    type: "Projeto",
    date: "2026-04-01",
  },
  {
    id: 6,
    title: "Rabito",
    description: "Manter hábitos é difícil sem feedback visual. Rabito transforma consistência em jogo: streaks, mood tracking, analytics e gamificação que fazem você voltar todo dia.",
    technologies: ["Next.js", "Zustand", "Recharts", "Framer Motion"],
    area: ["Programação e Dev"],
    status: "Ativo",
    slug: "rabito",
    image: "/images/projects/rabito.svg",
    type: "Projeto",
    date: "2026-04-05",
    externalUrl: "https://rabito-ashen.vercel.app",
  },
  {
    id: 7,
    title: "Sequência Viral",
    description: "SaaS de carrosséis com IA para Instagram, LinkedIn e X. Gera conceito, copy e imagens em dois cliques, integrando Content Machine 5.4 para manter voz e marca consistentes.",
    technologies: ["Next.js 16", "Gemini 2.5 Pro", "Imagen 4", "Supabase", "Stripe"],
    area: ["Programação e Dev", "IA e Automações", "Marketing"],
    status: "Ativo",
    slug: "sequencia-viral",
    image: "/images/projects/sequencia-viral.svg",
    type: "Projeto",
    date: "2026-04-15",
    externalUrl: "https://viral.kaleidos.com.br",
  },
  {
    id: 8,
    title: "DeFi Radar",
    description: "Investidores cripto precisam de dados em tempo real para tomar decisões rápidas. DeFi Radar consolida preços, gas, movimentação de baleias e alertas em um dashboard único.",
    technologies: ["React", "Three.js", "CoinGecko", "Recharts"],
    area: ["Programação e Dev", "Crypto"],
    status: "Ativo",
    slug: "defi-radar",
    image: "/images/projects/defi-radar.png",
    type: "Projeto",
    date: "2026-03-25",
    externalUrl: "https://defi-radar-eta.vercel.app",
  },
  {
    id: 9,
    title: "Aegis Yield",
    description: "Stablecoin yield scanner focado em risco real. Compara rendimentos DeFi de protocolos, classifica por segurança e mostra o que vale a pena.",
    technologies: ["Next.js", "DeFiLlama", "TypeScript", "Recharts"],
    area: ["Programação e Dev", "Crypto"],
    status: "Ativo",
    slug: "aegis-yield",
    image: "/images/projects/aegis-yield.png",
    type: "Projeto",
    date: "2026-04-02",
    externalUrl:
      "https://aegis-yield-app-gfmadureiraa-3391s-projects.vercel.app",
  },
  {
    id: 10,
    title: "AutoBlogger",
    description: "Blog engine com IA para publicar em escala. Gera artigos com Gemini 2.5, valida SEO, agenda e publica. Ideal para quem precisa de volume com qualidade editorial.",
    technologies: ["Next.js", "Gemini 2.5 Flash", "Supabase", "SEO"],
    area: ["Programação e Dev", "IA e Automações", "Marketing"],
    status: "Ativo",
    slug: "autoblogger",
    image: "/images/projects/autoblogger.png",
    type: "Projeto",
    date: "2026-04-08",
    externalUrl: "https://autoblogger-rosy.vercel.app",
  },
  {
    id: 11,
    title: "AdFlow / Möbius",
    description: "IA que cria, publica e otimiza campanhas de anúncios sozinha. Gera criativos, monitora performance e ajusta bids em tempo real. Em soft launch.",
    technologies: ["Next.js", "IA", "Meta Ads", "Google Ads"],
    area: ["Programação e Dev", "IA e Automações", "Marketing"],
    status: "Soft launch",
    slug: "adflow",
    image: "/images/projects/adflow.png",
    type: "Projeto",
    date: "2026-04-10",
  },
  {
    id: 12,
    title: "O Futuro do Trabalho Automático",
    description: "Um manifesto sobre o que acontece quando IA faz 90% do trabalho operacional. Escalabilidade, criação humana e por que Renda Básica Universal vai ser inevitável.",
    technologies: ["Ensaio", "IA", "Futuro", "UBI"],
    area: ["IA e Automações", "Programação e Dev"],
    status: "Publicado",
    slug: "manifesto-ia",
    image: "/images/projects/manifesto-ia.svg",
    type: "Artigo",
    date: "2026-04-10",
  },
];

const TYPE_COLORS: Record<ItemType, string> = {
  Projeto: "bg-green-500/10 text-green-400 border-green-500/20",
  Artigo: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

function GridIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function ProjectsContent() {
  const [filteredItems, setFilteredItems] = useState<ContentItem[]>(projects);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>("Todos");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const searchParams = useSearchParams();

  useEffect(() => {
    const areaParam = searchParams.get("area");
    if (areaParam) setSelectedAreas([areaParam]);
    const typeParam = searchParams.get("type");
    if (typeParam) setSelectedType(typeParam);
  }, [searchParams]);

  useEffect(() => {
    let filtered = projects;
    if (selectedType !== "Todos") {
      filtered = filtered.filter((item) => item.type === selectedType);
    }
    if (selectedAreas.length > 0) {
      filtered = filtered.filter((item) => {
        if (typeof item.area === "string") return selectedAreas.length === 1 && selectedAreas.includes(item.area);
        if (Array.isArray(item.area)) return selectedAreas.every((a) => item.area.includes(a));
        return false;
      });
    }
    setFilteredItems(filtered);
  }, [selectedAreas, selectedType]);

  const areas = ["Marketing", "IA e Automações", "Crypto", "Programação e Dev"];

  // Count updated dynamically based on the projects array
  const totalCount = projects.length;
  const projetoCount = projects.filter((p) => p.type === "Projeto").length;
  const artigoCount = projects.filter((p) => p.type === "Artigo").length;

  const getItemHref = (item: ContentItem) =>
    item.externalUrl ? item.externalUrl : `/projects/${item.slug}`;

  const getItemTarget = (item: ContentItem) =>
    item.externalUrl ? "_blank" : undefined;

  const getItemRel = (item: ContentItem) =>
    item.externalUrl ? "noopener noreferrer" : undefined;

  const getFirstArea = (item: ContentItem) =>
    Array.isArray(item.area) ? item.area[0] : item.area;

  // ── Grid card ──────────────────────────────────────────────────
  const GridCard = ({ item }: { item: ContentItem }) => (
    <div className={cn(
      "group flex flex-col overflow-hidden rounded-xl border bg-background hover:shadow-xl transition-all duration-300",
      "border-neutral-800 hover:border-neutral-700"
    )}>
      {item.image && (
        <div className="relative w-full aspect-video overflow-hidden border-b border-neutral-800">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="flex flex-col flex-1 p-6 relative z-10">
        <div className="flex items-start justify-between mb-4 gap-2">
          <div className="flex flex-wrap gap-1">
            <span className={cn("text-xs px-2 py-1 rounded-full flex items-center gap-1.5 font-semibold border", TYPE_COLORS[item.type])}>
              {item.type === "Artigo" ? (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              ) : (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              )}
              {item.type}
            </span>
            <span className="text-xs text-neutral-500 bg-neutral-800/50 px-2 py-1 rounded-full">
              {getFirstArea(item)}
            </span>
          </div>
          <span className="text-xs text-neutral-600 shrink-0">
            {item.date
              ? new Date(item.date).toLocaleDateString("pt-BR", { month: "short", year: "numeric" })
              : item.status}
          </span>
        </div>
        <h3 className="text-lg font-bold text-neutral-100 mb-3 group-hover:text-neutral-200 transition-colors leading-snug">
          {item.title}
        </h3>
        <p className="text-neutral-400 text-sm mb-4 line-clamp-3 flex-1">{item.description}</p>
        <div className="flex flex-wrap gap-1 mb-4 mt-auto">
          {item.technologies.slice(0, 3).map((tech) => (
            <span key={tech} className="text-xs bg-neutral-800/50 text-neutral-400 px-2 py-1 rounded border border-neutral-700/50">
              {tech}
            </span>
          ))}
          {item.technologies.length > 3 && (
            <span className="text-xs text-neutral-600 px-2 py-1">+{item.technologies.length - 3}</span>
          )}
        </div>
        <a href={getItemHref(item)} target={getItemTarget(item)} rel={getItemRel(item)} className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-200 transition-colors font-medium mt-2">
          {item.externalUrl ? "Abrir link" : "Ler artigo"}
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {item.externalUrl ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            )}
          </svg>
        </a>
      </div>
    </div>
  );

  // ── List row ───────────────────────────────────────────────────
  const ListRow = ({ item }: { item: ContentItem }) => (
    <a
      href={getItemHref(item)}
      target={getItemTarget(item)}
      rel={getItemRel(item)}
      className={cn(
        "group flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200",
        "border-neutral-800/60 hover:border-neutral-700 hover:bg-neutral-900/30 bg-transparent"
      )}
    >
      <div className={cn(
        "shrink-0 w-0.5 self-stretch rounded-full",
        "bg-green-500/50"
      )} />

      <h3 className="flex-1 text-sm font-medium text-neutral-300 group-hover:text-neutral-100 transition-colors truncate">
        {item.title}
      </h3>

      <div className="flex items-center gap-2 shrink-0">
        <span className={cn("text-xs px-2 py-0.5 rounded-full border", TYPE_COLORS[item.type])}>
          {item.type}
        </span>
        <span className="text-xs text-neutral-600 hidden sm:block">{getFirstArea(item)}</span>
        <span className="text-xs text-neutral-600 w-20 text-right">
          {item.date
            ? new Date(item.date).toLocaleDateString("pt-BR", { month: "short", year: "numeric" })
            : item.status}
        </span>
      </div>

      <svg className="shrink-0 w-3.5 h-3.5 text-neutral-700 group-hover:text-neutral-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </a>
  );

  const projectCount = totalCount;

  return (
    <div className="w-full flex items-center justify-center max-w-7xl mx-auto">
      <div className="flex flex-col items-center overflow-hidden w-full">
        <div className="w-full py-2 px-2 lg:py-10 lg:px-4">

          {/* Back */}
          <FadeIn direction="down" className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-neutral-400 hover:text-neutral-200 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Voltar para home
            </Link>
          </FadeIn>

          {/* Header */}
          <FadeIn direction="down" className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-100 mb-4">Produtos que construí. Todos em produção.</h1>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
              De SaaS com IA a scanners DeFi — cada projeto tem demo ao vivo ou está em soft launch.
            </p>
          </FadeIn>

          {/* Type filter + view toggle */}
          <FadeIn direction="up" className="flex items-center justify-between gap-3 mb-4 flex-wrap">
            {/* Type pills */}
            <div className="flex gap-2 flex-wrap">
              {[
                { label: "Tudo", value: "Todos", count: totalCount },
                { label: "Projetos", value: "Projeto", count: projetoCount },
                { label: "Artigos", value: "Artigo", count: artigoCount },
              ].map(({ label, value, count }) => (
                <button
                  key={value}
                  onClick={() => { setSelectedType(value); setSelectedAreas([]); }}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border flex items-center gap-1.5",
                    selectedType === value
                      ? "bg-white text-neutral-900 border-white shadow font-semibold"
                      : "bg-neutral-900/50 text-neutral-400 border-neutral-700 hover:border-neutral-600 hover:text-neutral-300"
                  )}
                >
                  {label}
                  <span className={cn(
                    "text-xs px-1.5 py-0.5 rounded-full",
                    selectedType === value ? "bg-neutral-200 text-neutral-700" : "bg-neutral-800 text-neutral-500"
                  )}>
                    {count}
                  </span>
                </button>
              ))}
            </div>

            {/* View toggle */}
            <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-1.5 rounded-md transition-all duration-200",
                  viewMode === "grid"
                    ? "bg-neutral-700 text-neutral-100"
                    : "text-neutral-500 hover:text-neutral-300"
                )}
                title="Visualização em grade"
              >
                <GridIcon />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-1.5 rounded-md transition-all duration-200",
                  viewMode === "list"
                    ? "bg-neutral-700 text-neutral-100"
                    : "text-neutral-500 hover:text-neutral-300"
                )}
                title="Visualização em lista"
              >
                <ListIcon />
              </button>
            </div>
          </FadeIn>

          {/* Area filter */}
          <FadeIn direction="up" className="flex flex-wrap gap-2 mb-8">
            {areas.map((area) => (
              <button
                key={area}
                onClick={() =>
                  setSelectedAreas((prev) =>
                    prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
                  )
                }
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border",
                  selectedAreas.includes(area)
                    ? "bg-neutral-700 text-neutral-100 border-neutral-600"
                    : "bg-transparent text-neutral-500 border-neutral-800 hover:border-neutral-700 hover:text-neutral-400"
                )}
              >
                {area}
              </button>
            ))}
          </FadeIn>

          {/* Content */}
          <FadeIn direction="up">
            {viewMode === "grid" ? (
              <BentoGrid className="max-w-7xl mx-auto">
                {filteredItems.map((item) => (
                  <GridCard key={item.id} item={item} />
                ))}
              </BentoGrid>
            ) : (
              <div className="flex flex-col gap-2 max-w-4xl mx-auto">
                {filteredItems.map((item) => (
                  <ListRow key={item.id} item={item} />
                ))}
              </div>
            )}
          </FadeIn>

          {filteredItems.length === 0 && (
            <FadeIn direction="up" className="text-center py-16">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-8 max-w-md mx-auto">
                <p className="text-neutral-400 mb-4">Nenhum item encontrado.</p>
                <button
                  onClick={() => { setSelectedAreas([]); setSelectedType("Todos"); }}
                  className="text-neutral-300 hover:text-neutral-200 transition-colors text-sm"
                >
                  Ver tudo
                </button>
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={
      <div className="w-full flex items-center justify-center py-20">
        <div className="animate-pulse text-neutral-600">Carregando...</div>
      </div>
    }>
      <ProjectsContent />
    </Suspense>
  );
}
