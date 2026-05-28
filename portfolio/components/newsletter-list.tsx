"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { NewsletterListItem } from "@/lib/db/newsletter";

const MONO = '"Geist Mono", "JetBrains Mono", ui-monospace, monospace';
const SERIF = 'var(--font-fraunces), "Fraunces", Georgia, serif';

/**
 * Inferência de categoria por palavras-chave no título/slug/excerpt.
 * Schema não tem `category` ainda — quando tiver, trocar pra `post.category`.
 */
function inferCategory(post: NewsletterListItem): Category {
  const hay = `${post.title} ${post.slug} ${post.excerpt}`.toLowerCase();
  if (/(carross|carousel|slide)/.test(hay)) return "carrosseis";
  if (/(case|bastidor|number|client|case-study|stripe|funil)/.test(hay)) return "cases";
  if (/(\bia\b|ai\b|automa|workflow|prompt|llm|claude|gpt|agent)/.test(hay))
    return "ia";
  return "marketing";
}

type Category = "marketing" | "ia" | "cases" | "carrosseis";

const FILTERS: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "Todas" },
  { id: "marketing", label: "Marketing" },
  { id: "ia", label: "IA & Automação" },
  { id: "cases", label: "Cases & Bastidor" },
  { id: "carrosseis", label: "Carrosséis" },
];

function formatDate(d: Date | string | null) {
  if (!d) return "";
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export interface NewsletterListProps {
  posts: NewsletterListItem[];
}

export function NewsletterList({ posts }: NewsletterListProps) {
  const [filter, setFilter] = useState<"all" | Category>("all");
  const [query, setQuery] = useState("");

  // Pre-compute categoria de cada post (evita recálculo no render).
  const postsWithCat = useMemo(
    () => posts.map((p) => ({ ...p, _cat: inferCategory(p) })),
    [posts],
  );

  // Normaliza string pra busca: lowercase + remove acentos (combining marks U+0300–U+036F).
  const normalize = (s: string) =>
    s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

  const filtered = useMemo(() => {
    let base = postsWithCat;
    if (filter !== "all") {
      base = base.filter((p) => p._cat === filter);
    }
    const q = normalize(query.trim());
    if (!q) return base;
    return base.filter((p) =>
      normalize(`${p.title} ${p.excerpt} ${p.slug}`).includes(q),
    );
  }, [postsWithCat, filter, query]);

  const total = posts.length;

  return (
    <div>
      {/* Busca por texto */}
      <div className="mb-6">
        <label htmlFor="nl-search" className="sr-only">
          Buscar cartas
        </label>
        <div className="relative">
          <input
            id="nl-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar nas cartas…"
            aria-label="Buscar cartas por título, resumo ou slug"
            className="w-full bg-transparent text-foreground border border-border placeholder:text-muted-foreground focus:border-foreground/50 focus:outline-none"
            style={{
              padding: "12px 16px 12px 40px",
              borderRadius: 8,
              fontFamily: "inherit",
              fontSize: 14,
              transition: "border-color 180ms ease",
            }}
          />
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted-foreground"
            style={{
              position: "absolute",
              left: 14,
              top: "50%",
              transform: "translateY(-50%)",
              width: 16,
              height: 16,
              pointerEvents: "none",
            }}
          >
            <circle cx={11} cy={11} r={7} />
            <line x1={21} y1={21} x2={16.65} y2={16.65} />
          </svg>
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Limpar busca"
              className="text-muted-foreground hover:text-foreground transition-colors"
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                padding: 6,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontFamily: MONO,
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              limpar
            </button>
          ) : null}
        </div>
      </div>

      {/* Filtros chips */}
      <div
        role="tablist"
        aria-label="Filtrar cartas por categoria"
        className="flex flex-wrap gap-2 mb-10"
      >
        {FILTERS.map((f) => {
          const active = f.id === filter;
          return (
            <button
              key={f.id}
              role="tab"
              aria-selected={active}
              type="button"
              onClick={() => setFilter(f.id)}
              className={
                active
                  ? "bg-foreground text-background"
                  : "bg-transparent text-muted-foreground border border-border hover:text-foreground hover:border-foreground/40"
              }
              style={{
                padding: "8px 16px",
                borderRadius: 999,
                fontFamily: MONO,
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 500,
                cursor: "pointer",
                transition:
                  "background-color 180ms ease, color 180ms ease, border-color 180ms ease",
              }}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Meta */}
      <div
        className="text-muted-foreground"
        style={{
          fontFamily: MONO,
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          marginBottom: 28,
        }}
      >
        {filter === "all"
          ? `${String(total).padStart(2, "0")} edições`
          : `${String(filtered.length).padStart(2, "0")} de ${String(total).padStart(2, "0")}`}
      </div>

      {filtered.length === 0 ? (
        <p
          className="text-muted-foreground"
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: 22,
            lineHeight: 1.4,
          }}
        >
          {total === 0
            ? "A primeira carta sai em breve. Entra na lista pra receber."
            : query.trim()
              ? `Nada encontrado para "${query.trim()}". Tenta outra busca?`
              : "Nenhuma carta dessa categoria por enquanto."}
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {filtered.map((p, idx) => {
            // numeração descrescente conservada por toda a lista (incluindo filtros)
            const num = total - postsWithCat.findIndex((q) => q.id === p.id);
            return (
              <li
                key={p.id}
                className="border-t border-border"
                style={{
                  padding: "28px 0",
                }}
              >
                <Link
                  href={`/newsletter/${p.slug}`}
                  className="nl-list-item"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: "clamp(16px, 4vw, 32px)",
                    color: "inherit",
                    textDecoration: "none",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <div
                      className="text-muted-foreground"
                      style={{
                        display: "flex",
                        gap: 14,
                        alignItems: "center",
                        fontFamily: MONO,
                        fontSize: 11,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        marginBottom: 10,
                      }}
                    >
                      <span>Nº {String(num).padStart(2, "0")}</span>
                      <span style={{ opacity: 0.4 }}>·</span>
                      <span>{formatDate(p.published_at)}</span>
                      {p.reading_time_min ? (
                        <>
                          <span style={{ opacity: 0.4 }}>·</span>
                          <span>{p.reading_time_min} min</span>
                        </>
                      ) : null}
                      <span style={{ opacity: 0.4 }}>·</span>
                      <span>{labelOf(p._cat)}</span>
                    </div>

                    <h3
                      className="nl-list-title text-foreground"
                      style={{
                        fontFamily: SERIF,
                        fontStyle: "italic",
                        fontWeight: 300,
                        fontSize: "clamp(22px, 3.4vw, 32px)",
                        lineHeight: 1.1,
                        letterSpacing: "-0.018em",
                        margin: 0,
                        transition: "opacity 0.2s ease",
                      }}
                    >
                      {p.title}
                    </h3>

                    {p.excerpt ? (
                      <p
                        className="text-muted-foreground"
                        style={{
                          margin: "10px 0 0",
                          fontSize: 15,
                          lineHeight: 1.55,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          maxWidth: 620,
                        }}
                      >
                        {p.excerpt}
                      </p>
                    ) : null}
                  </div>

                  {p.hero_image_url ? (
                    <div
                      className="hidden sm:block border border-border overflow-hidden"
                      style={{
                        width: 120,
                        height: 120,
                        borderRadius: 8,
                        flexShrink: 0,
                        position: "relative",
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.hero_image_url}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      className="hidden sm:flex border border-border bg-foreground/[0.03] items-center justify-center"
                      style={{
                        width: 120,
                        height: 120,
                        borderRadius: 8,
                        flexShrink: 0,
                      }}
                    >
                      <Image
                        src="/avatar.png"
                        alt=""
                        width={48}
                        height={48}
                        className="rounded-full opacity-60"
                      />
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      <style jsx>{`
        .nl-list-item:hover .nl-list-title {
          opacity: 0.65;
        }
      `}</style>
    </div>
  );
}

function labelOf(c: Category) {
  switch (c) {
    case "marketing":
      return "Marketing";
    case "ia":
      return "IA & Automação";
    case "cases":
      return "Cases";
    case "carrosseis":
      return "Carrosséis";
  }
}

export default NewsletterList;
