"use client";

import React, { useState, useEffect, Suspense } from "react";
import { FadeIn } from "@/components/magicui/fade-in";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

type ItemType = "Projeto" | "Artigo";
type ViewMode = "grid" | "list";
type LifecycleStatus = "live" | "coming_soon";

interface ContentItem {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  area: string | string[];
  status?: string;
  lifecycle: LifecycleStatus;
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
    lifecycle: "live",
    slug: "kaleidos-digital",
    image: "/images/projects/kaleidos-digital.png",
    type: "Projeto",
    date: "2024-01-01",
    externalUrl: "https://kaleidos.com.br",
  },
  {
    id: 7,
    title: "Sequência Viral",
    description: "SaaS de carrosséis com IA para Instagram, LinkedIn e X. Gera conceito, copy e imagens em dois cliques, integrando Content Machine 5.4 para manter voz e marca consistentes.",
    technologies: ["Next.js 16", "Gemini 2.5 Pro", "Imagen 4", "Supabase", "Stripe"],
    area: ["Programação e Dev", "IA e Automações", "Marketing"],
    status: "Ativo",
    lifecycle: "live",
    slug: "sequencia-viral",
    image: "/images/projects/sequencia-viral.png",
    type: "Projeto",
    date: "2026-04-15",
    externalUrl: "https://viral.kaleidos.com.br",
  },
  {
    id: 17,
    title: "Reels Viral",
    description: "Cole o link de um reel que viralizou e a IA extrai a estrutura — hook, ritmo, gatilhos, storyboard cena por cena. Você recebe um roteiro adaptado pro seu perfil, pronto pra gravar.",
    technologies: ["Next.js 16", "Neon", "Gemini 2.5 Flash", "Apify"],
    area: ["Programação e Dev", "IA e Automações", "Marketing"],
    status: "Ativo",
    lifecycle: "live",
    slug: "reels-viral",
    image: "/images/projects/reels-viral.png",
    type: "Projeto",
    date: "2026-04-28",
    externalUrl: "https://reels.kaleidos.com.br",
  },
  {
    id: 5,
    title: "Folio",
    description: "Portfolio tracker e wallet tracker cripto multi-chain. Consolida preços reais, gráficos históricos, PnL e NFTs em uma interface simples. Em soft launch.",
    technologies: ["React", "TypeScript", "CoinGecko", "DeFiLlama"],
    area: ["Programação e Dev", "Crypto"],
    status: "Soft launch",
    lifecycle: "live",
    slug: "folio",
    image: "/images/projects/folio.png",
    type: "Projeto",
    date: "2026-04-01",
    externalUrl: "https://folio-landing.vercel.app/app",
  },
  {
    id: 4,
    title: "Jornal Cripto",
    description: "Portal de análise cripto que atingiu 10k visitas/mês organicamente. Newsletter 2x/semana com insights em tempo real. O projeto que me colocou no mapa do mercado cripto.",
    technologies: ["Next.js", "SEO", "Email Marketing", "n8n"],
    area: ["Crypto", "Marketing"],
    status: "Ativo",
    lifecycle: "live",
    slug: "jornal-cripto",
    image: "/images/projects/jornal-cripto.png",
    type: "Projeto",
    date: "2023-10-01",
    externalUrl: "https://jornal-cripto.vercel.app",
  },
  {
    id: 8,
    title: "Radar Viral",
    description: "Monitora creators no Instagram, TikTok, YouTube e Threads. Detecta conteúdo viral antes de explodir, transcreve e gera briefings de uso. Roda em cron 24/7.",
    technologies: ["Next.js 16", "Tailwind v4", "Supabase", "Apify", "Gemini"],
    area: ["Programação e Dev", "IA e Automações", "Marketing"],
    status: "Em breve",
    lifecycle: "coming_soon",
    slug: "defi-radar",
    image: "/images/projects/defi-radar.png",
    type: "Projeto",
    date: "2026-05-08",
  },
  {
    id: 10,
    title: "AutoBlogger",
    description: "Blog engine com IA para publicar em escala. Gera artigos com Gemini 2.5, valida SEO, agenda e publica. Ideal para quem precisa de volume com qualidade editorial.",
    technologies: ["Next.js", "Gemini 2.5 Flash", "Supabase", "SEO"],
    area: ["Programação e Dev", "IA e Automações", "Marketing"],
    status: "Em breve",
    lifecycle: "coming_soon",
    slug: "autoblogger",
    image: "/images/projects/autoblogger.png",
    type: "Projeto",
    date: "2026-04-08",
  },
  {
    id: 11,
    title: "AdFlow / Möbius",
    description: "Automação de criativos estáticos pra anúncios Meta/IG. URL da marca + fotos de produto viram 40 variações de anúncio em cerca de 10 minutos, com copy e layout prontos pra publicar.",
    technologies: ["Next.js", "IA", "Meta Ads", "Google Ads"],
    area: ["Programação e Dev", "IA e Automações", "Marketing"],
    status: "Em breve",
    lifecycle: "coming_soon",
    slug: "adflow",
    image: "/images/projects/adflow.png",
    type: "Projeto",
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

// Mantém ordem manual do array (destaques curados primeiro, coming_soon depois).
const sortByLifecycle = (items: ContentItem[]) => [...items];

function ProjectsContent() {
  const [filteredItems, setFilteredItems] = useState<ContentItem[]>(() => sortByLifecycle(projects));
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
    // Live primeiro, coming_soon depois — mantendo ordem interna estável.
    setFilteredItems(sortByLifecycle(filtered));
  }, [selectedAreas, selectedType]);

  const areas = ["Marketing", "IA e Automações", "Crypto", "Programação e Dev"];

  // Count updated dynamically based on the projects array
  const totalCount = projects.length;
  const projetoCount = projects.filter((p) => p.type === "Projeto").length;

  // coming_soon SEMPRE abre página interna de construção, mesmo que tenha externalUrl
  const getItemHref = (item: ContentItem) =>
    item.lifecycle === "coming_soon"
      ? `/projects/${item.slug}`
      : item.externalUrl
        ? item.externalUrl
        : `/projects/${item.slug}`;

  const getItemTarget = (item: ContentItem) =>
    item.lifecycle === "coming_soon"
      ? undefined
      : item.externalUrl
        ? "_blank"
        : undefined;

  const getItemRel = (item: ContentItem) =>
    item.lifecycle === "coming_soon"
      ? undefined
      : item.externalUrl
        ? "noopener noreferrer"
        : undefined;

  const getFirstArea = (item: ContentItem) =>
    Array.isArray(item.area) ? item.area[0] : item.area;

  // ── Grid card ──────────────────────────────────────────────────
  const GridCard = ({ item }: { item: ContentItem }) => (
    <div className={cn(
      "group relative flex flex-col overflow-hidden rounded-xl border bg-background hover:shadow-xl transition-all duration-300",
      "border-border hover:border-border",
      item.lifecycle === "coming_soon" && "opacity-70 hover:opacity-100"
    )}>
      {item.lifecycle === "coming_soon" && (
        <span className="absolute top-3 right-3 z-20 font-mono text-[10px] uppercase tracking-[0.18em] bg-background/85 backdrop-blur text-foreground/75 px-2 py-1 rounded-full border border-border">
          Em breve
        </span>
      )}
      {item.image && (
        <div className="relative w-full aspect-[500/360] overflow-hidden border-b border-border bg-card">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className={cn(
              "object-cover object-top group-hover:scale-[1.03] transition-transform duration-500",
              item.lifecycle === "coming_soon" && "grayscale-[35%] group-hover:grayscale-0"
            )}
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
            <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
              {getFirstArea(item)}
            </span>
          </div>
          <span className="text-xs text-muted-foreground shrink-0">
            {item.date
              ? new Date(item.date).toLocaleDateString("pt-BR", { month: "short", year: "numeric" })
              : item.status}
          </span>
        </div>
        <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-foreground transition-colors leading-snug">
          {item.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">{item.description}</p>
        <div className="flex flex-wrap gap-1 mb-4 mt-auto">
          {item.technologies.slice(0, 3).map((tech) => (
            <span key={tech} className="text-xs bg-muted/50 text-muted-foreground px-2 py-1 rounded border border-border/50">
              {tech}
            </span>
          ))}
          {item.technologies.length > 3 && (
            <span className="text-xs text-muted-foreground px-2 py-1">+{item.technologies.length - 3}</span>
          )}
        </div>
        <a href={getItemHref(item)} target={getItemTarget(item)} rel={getItemRel(item)} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium mt-2">
          {item.lifecycle === "coming_soon"
            ? "Ver prévia"
            : item.externalUrl
              ? "Abrir link"
              : "Ler artigo"}
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {item.lifecycle !== "coming_soon" && item.externalUrl ? (
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
        "border-border/60 hover:border-border hover:bg-card/30 bg-transparent",
        item.lifecycle === "coming_soon" && "opacity-65 hover:opacity-100"
      )}
    >
      <div className={cn(
        "shrink-0 w-0.5 self-stretch rounded-full",
        item.lifecycle === "coming_soon" ? "bg-muted-foreground/40" : "bg-green-500/50"
      )} />

      <h3 className="flex-1 text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors truncate">
        {item.title}
      </h3>

      <div className="flex items-center gap-2 shrink-0">
        {item.lifecycle === "coming_soon" && (
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] bg-foreground/8 text-foreground/65 px-2 py-0.5 rounded-full border border-border">
            Em breve
          </span>
        )}
        <span className={cn("text-xs px-2 py-0.5 rounded-full border", TYPE_COLORS[item.type])}>
          {item.type}
        </span>
        <span className="text-xs text-muted-foreground hidden sm:block">{getFirstArea(item)}</span>
        <span className="text-xs text-muted-foreground w-20 text-right">
          {item.date
            ? new Date(item.date).toLocaleDateString("pt-BR", { month: "short", year: "numeric" })
            : item.status}
        </span>
      </div>

      <svg className="shrink-0 w-3.5 h-3.5 text-muted-foreground group-hover:text-muted-foreground transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Voltar para home
            </Link>
          </FadeIn>

          {/* Header */}
          <FadeIn direction="down" className="text-center mb-8 sm:mb-10 px-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">Produtos que construí. Todos em produção.</h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
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
              ].map(({ label, value, count }) => (
                <button
                  key={value}
                  onClick={() => { setSelectedType(value); setSelectedAreas([]); }}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border flex items-center gap-1.5",
                    selectedType === value
                      ? "bg-white text-background border-white shadow font-semibold"
                      : "bg-card/50 text-muted-foreground border-border hover:border-border hover:text-foreground/80"
                  )}
                >
                  {label}
                  <span className={cn(
                    "text-xs px-1.5 py-0.5 rounded-full",
                    selectedType === value ? "bg-muted text-muted-foreground" : "bg-muted text-muted-foreground"
                  )}>
                    {count}
                  </span>
                </button>
              ))}
            </div>

            {/* View toggle */}
            <div className="flex items-center gap-1 p-1 bg-card border border-border rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-1.5 rounded-md transition-all duration-200",
                  viewMode === "grid"
                    ? "bg-muted-foreground/20 text-foreground"
                    : "text-muted-foreground hover:text-foreground/80"
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
                    ? "bg-muted-foreground/20 text-foreground"
                    : "text-muted-foreground hover:text-foreground/80"
                )}
                title="Visualização em lista"
              >
                <ListIcon />
              </button>
            </div>
          </FadeIn>

          {/* Area filter */}
          <FadeIn direction="up" className="flex flex-wrap gap-2 mb-6 sm:mb-8">
            {areas.map((area) => (
              <button
                key={area}
                onClick={() =>
                  setSelectedAreas((prev) =>
                    prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
                  )
                }
                className={cn(
                  "px-3 sm:px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 border min-h-[36px]",
                  selectedAreas.includes(area)
                    ? "bg-muted-foreground/20 text-foreground border-border"
                    : "bg-transparent text-muted-foreground border-border hover:border-border hover:text-muted-foreground"
                )}
              >
                {area}
              </button>
            ))}
          </FadeIn>

          {/* Content */}
          <FadeIn direction="up">
            {viewMode === "grid" ? (
              <div className="grid w-full max-w-7xl mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {filteredItems.map((item) => (
                  <GridCard key={item.id} item={item} />
                ))}
              </div>
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
              <div className="bg-card/50 border border-border rounded-xl p-8 max-w-md mx-auto">
                <p className="text-muted-foreground mb-4">Nenhum item encontrado.</p>
                <button
                  onClick={() => { setSelectedAreas([]); setSelectedType("Todos"); }}
                  className="text-foreground/80 hover:text-foreground transition-colors text-sm"
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
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    }>
      <ProjectsContent />
    </Suspense>
  );
}
