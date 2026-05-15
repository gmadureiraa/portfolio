import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Fraunces, Inter } from "next/font/google";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import {
  getNewsletterBySlug,
  listPublishedNewsletters,
} from "@/lib/db/newsletter";
import { NewsletterPostFooterForm } from "@/components/newsletter-synecdoche/post-footer-form";
import { ViewPing } from "@/components/newsletter-synecdoche/view-ping";
import { ReadingProgress } from "@/components/reading-progress";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-inter",
});

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://madureira.xyz";

/* Theme-aware tokens — usam CSS vars do design system (light/dark via next-themes).
 * Antes eram hardcoded (cream paper / ink soft black) — quebrava Sun/Moon toggle nessa rota.
 * Agora full black/white via tokens HSL. */
const PAPER = "hsl(var(--foreground))"; // texto principal
const INK = "hsl(var(--background))"; // fundo
const ACCENT = "hsl(var(--foreground))"; // drop-cap, dot, blockquote bar (P&B)
const MUTED = "hsl(var(--muted-foreground))"; // texto secundário
const FAINT = "hsl(var(--muted-foreground) / 0.7)"; // labels, datas
const HAIRLINE = "hsl(var(--border))"; // bordas finas
const MONO = '"Geist Mono", "JetBrains Mono", ui-monospace, monospace';
const SERIF = 'var(--font-fraunces), "Fraunces", Georgia, serif';

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await listPublishedNewsletters().catch(() => []);
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsletterBySlug(slug).catch(() => null);
  if (!post || !post.published_at) {
    return {
      title: "Newsletter — Madureira®",
      robots: { index: false },
    };
  }

  const url = `${BASE}/newsletter/${post.slug}`;
  const ogImage = post.og_image_url || post.hero_image_url || undefined;

  return {
    title: `${post.title} — Madureira®`,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.published_at.toISOString(),
      authors: [post.author_name],
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      creator: "@ogmadureira",
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

function formatDate(d: Date | string | null) {
  if (!d) return "";
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function NewsletterPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getNewsletterBySlug(slug).catch(() => null);
  if (!post || !post.published_at) notFound();

  const html = sanitizeHtml(
    marked.parse(post.content_md, { async: false }) as string,
    {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([
        "img",
        "h1",
        "h2",
      ]),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ["src", "alt", "title", "loading", "width", "height"],
        a: ["href", "name", "target", "rel"],
      },
    },
  );

  // Edições relacionadas (as 2 mais recentes que não são esta).
  const all = await listPublishedNewsletters().catch(() => []);
  const more = all.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <main
      className={`${fraunces.variable} ${inter.variable}`}
      style={{
        background: INK,
        color: PAPER,
        minHeight: "100vh",
        fontFamily:
          'var(--font-inter), "Inter", system-ui, -apple-system, sans-serif',
        fontFeatureSettings: '"ss01", "cv11"',
      }}
    >
      <ReadingProgress />
      <ViewPing slug={post.slug} />

      <article
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "72px 24px 96px",
        }}
      >
        {/* Nav */}
        <nav style={{ marginBottom: 48 }}>
          <Link
            href="/newsletter"
            className="nl-back"
            style={{
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: MUTED,
              textDecoration: "none",
            }}
          >
            ← A Carta do Madureira
          </Link>
        </nav>

        {/* Header */}
        <header style={{ marginBottom: 40 }}>
          <div
            style={{
              display: "flex",
              gap: 14,
              alignItems: "center",
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: FAINT,
            }}
          >
            <span style={{ color: ACCENT }}>●</span>
            <span>{formatDate(post.published_at)}</span>
            {post.reading_time_min ? (
              <>
                <span style={{ opacity: 0.4 }}>·</span>
                <span>{post.reading_time_min} min de leitura</span>
              </>
            ) : null}
          </div>

          <h1
            style={{
              fontFamily: SERIF,
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(35px, 5.6vw, 60px)",
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              margin: "20px 0 0",
              color: PAPER,
            }}
          >
            {post.title}
          </h1>

          {post.excerpt ? (
            <p
              style={{
                margin: "20px 0 0",
                fontSize: 17,
                lineHeight: 1.55,
                color: MUTED,
                fontFamily: SERIF,
                fontStyle: "italic",
                fontWeight: 300,
              }}
            >
              {post.excerpt}
            </p>
          ) : null}

          {/* Byline */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginTop: 28,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/avatar.png"
              alt={post.author_name}
              width={36}
              height={36}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                objectFit: "cover",
                border: `1px solid ${HAIRLINE}`,
              }}
            />
            <span
              style={{
                fontFamily: MONO,
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: MUTED,
              }}
            >
              Por {post.author_name}
            </span>
          </div>
        </header>

        {/* Hero image */}
        {post.hero_image_url ? (
          <div
            style={{
              marginBottom: 48,
              overflow: "hidden",
              borderRadius: 10,
              border: `1px solid ${HAIRLINE}`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.hero_image_url}
              alt={post.title}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        ) : (
          <div
            style={{
              marginBottom: 48,
              height: 2,
              background: `linear-gradient(90deg, ${ACCENT}, transparent)`,
            }}
          />
        )}

        {/* Body */}
        <div
          className="nl-prose"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* CTA footer */}
        <footer style={{ marginTop: 80 }}>
          <div
            style={{
              border: `1px solid ${HAIRLINE}`,
              borderRadius: 12,
              background:
                "linear-gradient(135deg, hsl(var(--foreground) / 0.04), transparent 60%)",
              padding: "36px clamp(24px, 5vw, 44px)",
            }}
          >
            <p
              style={{
                fontFamily: MONO,
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: FAINT,
                margin: 0,
              }}
            >
              <span style={{ color: ACCENT }}>●</span>&nbsp;&nbsp;A Carta do
              Madureira
            </p>
            <h3
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(25px, 3.5vw, 33px)",
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                margin: "12px 0 0",
                color: PAPER,
              }}
            >
              Recebe a próxima na sua caixa.
            </h3>
            <p
              style={{
                margin: "10px 0 0",
                fontSize: 13,
                lineHeight: 1.6,
                color: MUTED,
              }}
            >
              IA aplicada em marketing e produto. Uma carta por semana, números
              reais, zero hype.
            </p>
            <div style={{ marginTop: 24 }}>
              <NewsletterPostFooterForm />
            </div>
          </div>

          {/* Mais edições */}
          {more.length > 0 ? (
            <div style={{ marginTop: 56 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  marginBottom: 24,
                }}
              >
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 11,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "hsl(var(--muted-foreground))",
                    whiteSpace: "nowrap",
                  }}
                >
                  Continue lendo
                </span>
                <span
                  style={{ flex: 1, height: 1, background: HAIRLINE }}
                />
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {more.map((p) => (
                  <li
                    key={p.id}
                    style={{
                      borderTop: `1px solid ${HAIRLINE}`,
                      padding: "22px 0",
                    }}
                  >
                    <Link
                      href={`/newsletter/${p.slug}`}
                      className="nl-more"
                      style={{
                        display: "block",
                        color: "inherit",
                        textDecoration: "none",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: MONO,
                          fontSize: 11,
                          letterSpacing: "0.16em",
                          textTransform: "uppercase",
                          color: FAINT,
                          marginBottom: 6,
                        }}
                      >
                        {formatDate(p.published_at)}
                      </div>
                      <h4
                        className="nl-more-title"
                        style={{
                          fontFamily: SERIF,
                          fontStyle: "italic",
                          fontWeight: 300,
                          fontSize: "clamp(18px, 2.6vw, 23px)",
                          lineHeight: 1.12,
                          margin: 0,
                          color: PAPER,
                          transition: "color 0.2s ease",
                        }}
                      >
                        {p.title}
                      </h4>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div
            style={{
              marginTop: 48,
              paddingTop: 28,
              borderTop: `1px solid ${HAIRLINE}`,
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 14,
            }}
          >
            <span
              style={{
                fontFamily: MONO,
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: FAINT,
              }}
            >
              madureira.xyz · 2026
            </span>
            <Link
              href="/newsletter"
              className="nl-back"
              style={{
                fontFamily: MONO,
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: MUTED,
                textDecoration: "none",
              }}
            >
              Ver todas as edições →
            </Link>
          </div>
        </footer>
      </article>

      {/* Estilos do corpo (markdown renderizado) — segue o design system */}
      <style>{`
        .nl-back:hover, .nl-more:hover .nl-more-title { color: ${ACCENT} !important; }

        .nl-prose {
          font-size: 16px;
          line-height: 1.78;
          color: hsl(var(--foreground) / 0.86);
        }
        .nl-prose > p:first-of-type::first-letter {
          float: left;
          font-family: ${SERIF};
          font-style: italic;
          font-weight: 300;
          font-size: 4.4em;
          line-height: 0.82;
          padding: 6px 12px 0 0;
          color: ${ACCENT};
        }
        .nl-prose p { margin: 0 0 1.5em; }
        .nl-prose h2 {
          font-family: ${SERIF};
          font-style: italic;
          font-weight: 300;
          font-size: clamp(25px, 3.5vw, 33px);
          line-height: 1.12;
          letter-spacing: -0.02em;
          color: ${PAPER};
          margin: 2.4em 0 0.7em;
        }
        .nl-prose h3 {
          font-family: ${SERIF};
          font-weight: 400;
          font-size: clamp(19px, 2.6vw, 24px);
          line-height: 1.2;
          color: ${PAPER};
          margin: 2em 0 0.6em;
        }
        .nl-prose a {
          color: ${PAPER};
          text-decoration: underline;
          text-decoration-color: ${ACCENT};
          text-underline-offset: 3px;
          transition: color 0.15s ease;
        }
        .nl-prose a:hover { color: ${ACCENT}; }
        .nl-prose strong { color: ${PAPER}; font-weight: 600; }
        .nl-prose em { font-style: italic; }
        .nl-prose ul, .nl-prose ol { margin: 0 0 1.5em; padding-left: 1.4em; }
        .nl-prose li { margin: 0.4em 0; }
        .nl-prose li::marker { color: ${ACCENT}; }
        .nl-prose blockquote {
          margin: 1.8em 0;
          padding: 4px 0 4px 24px;
          border-left: 2px solid ${ACCENT};
          font-family: ${SERIF};
          font-style: italic;
          font-weight: 300;
          font-size: 1.22em;
          line-height: 1.5;
          color: ${PAPER};
        }
        .nl-prose blockquote p { margin: 0; }
        .nl-prose img {
          width: 100%;
          height: auto;
          border-radius: 10px;
          border: 1px solid ${HAIRLINE};
          margin: 2em 0;
        }
        .nl-prose hr {
          border: none;
          border-top: 1px solid ${HAIRLINE};
          margin: 3em 0;
        }
        .nl-prose code {
          font-family: ${MONO};
          font-size: 0.86em;
          background: hsl(var(--muted));
          border: 1px solid ${HAIRLINE};
          padding: 2px 6px;
          border-radius: 4px;
          color: ${PAPER};
        }
        .nl-prose pre {
          background: hsl(var(--muted));
          border: 1px solid ${HAIRLINE};
          border-radius: 10px;
          padding: 20px;
          overflow-x: auto;
          margin: 1.8em 0;
        }
        .nl-prose pre code {
          background: none;
          border: none;
          padding: 0;
          font-size: 0.84em;
          line-height: 1.6;
        }
      `}</style>
    </main>
  );
}
