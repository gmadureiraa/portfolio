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
import { NewsletterMidScrollModal } from "@/components/newsletter-mid-scroll-modal";

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

// Fallback OG/hero quando a edição não declarou cover própria.
// Asset gerado via Higgsfield GPT Image 2 (editorial monochrome).
const DEFAULT_NEWSLETTER_COVER = "/assets/generated/newsletter-cover.jpg";

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
  // Agendadas (data futura) ou sem data: noindex, como se não existissem ainda.
  if (!post || !post.published_at || new Date(post.published_at) > new Date()) {
    return {
      title: "Newsletter — Madureira®",
      robots: { index: false },
    };
  }

  const url = `${BASE}/newsletter/${post.slug}`;
  const ogImage =
    post.og_image_url || post.hero_image_url || `${BASE}${DEFAULT_NEWSLETTER_COVER}`;

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
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      creator: "@ogmadureira",
      images: [ogImage],
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
  // Gate: sem data publicada OU com data no futuro (agendada) → ainda não existe.
  if (!post || !post.published_at || new Date(post.published_at) > new Date())
    notFound();

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

  const url = `${BASE}/newsletter/${post.slug}`;
  const heroImg =
    post.og_image_url || post.hero_image_url || `${BASE}${DEFAULT_NEWSLETTER_COVER}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || undefined,
    datePublished: post.published_at.toISOString(),
    dateModified: (post.updated_at ?? post.published_at).toISOString(),
    image: [heroImg],
    inLanguage: "pt-BR",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: {
      "@type": "Person",
      name: post.author_name,
      url: BASE,
      sameAs: [
        "https://x.com/ogmadureira",
        "https://www.instagram.com/ogmadureira/",
        "https://www.linkedin.com/in/gabrielmadureira",
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "Kaleidos",
      url: BASE,
    },
  };

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <ReadingProgress />
      <ViewPing slug={post.slug} />
      <NewsletterMidScrollModal />

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
          className="madureira-prose"
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

      {/* Hover dos links auxiliares (back + more) — mantido inline porque
       * usam classes locais do markup (.nl-back, .nl-more, .nl-more-title).
       * O body editorial (markdown renderizado) usa `.madureira-prose`
       * definido em styles/prose-madureira.css. */}
      <style>{`
        .nl-back:hover, .nl-more:hover .nl-more-title { color: ${ACCENT} !important; opacity: 0.7; }
      `}</style>
    </main>
  );
}
