"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";

/**
 * Preview das 3 cartas mais recentes pra render dentro de um BentoCard.
 * Renderiza no `background` do card — daí o `absolute inset-0` e o padding
 * que combina com os outros backgrounds da Bento.
 *
 * Recebe os posts já carregados server-side em `app/page.tsx`.
 * Falha aberta: se não vier nada, mostra placeholder linkando pra /newsletter.
 */

const MONO = '"Geist Mono", "JetBrains Mono", ui-monospace, monospace';
const SERIF = '"Fraunces", Georgia, serif';

export interface NewsletterPreviewItem {
  slug: string;
  title: string;
  excerpt: string;
  published_at: string | null; // ISO string serializável de Server→Client
  reading_time_min: number | null;
}

function formatDate(iso: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
}

export function NewsletterPreviewCard({
  posts,
}: {
  posts: NewsletterPreviewItem[];
}) {
  const items = posts.slice(0, 3);

  return (
    <div className="absolute inset-0 px-4 sm:px-6 pt-4 pb-20 sm:pt-6 sm:pb-24 flex flex-col gap-2 sm:gap-3 [mask-image:linear-gradient(to_top,transparent_0%,#000_18%)]">
      <div
        className="text-muted-foreground"
        style={{
          fontFamily: MONO,
          fontSize: 10,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        Últimas cartas
      </div>

      {items.length === 0 ? (
        <Link
          href="/newsletter"
          onClick={() =>
            track("newsletter_preview_click", { source: "bento_empty" })
          }
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Em breve. Primeira carta sai semana que vem →
        </Link>
      ) : (
        <ul className="flex flex-col gap-1.5 sm:gap-2">
          {items.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/newsletter/${p.slug}`}
                onClick={() =>
                  track("newsletter_preview_click", {
                    source: "bento_preview",
                    slug: p.slug,
                  })
                }
                className="group block rounded-md border border-border bg-card/40 px-3 py-2 sm:px-3.5 sm:py-2.5 hover:bg-card transition-colors"
              >
                <div className="flex items-center gap-2 mb-0.5">
                  <span
                    className="text-muted-foreground shrink-0"
                    style={{
                      fontFamily: MONO,
                      fontSize: 9.5,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                    }}
                  >
                    {formatDate(p.published_at)}
                    {p.reading_time_min ? ` · ${p.reading_time_min} min` : ""}
                  </span>
                </div>
                <div
                  className="text-foreground/90 group-hover:text-foreground transition-colors leading-snug line-clamp-1"
                  style={{
                    fontFamily: SERIF,
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: 16,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {p.title}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
