import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Link from "next/link";
import { listPublishedNewsletters } from "@/lib/db/newsletter";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Newsletter — Gabriel Madureira",
  description:
    "Cartas semanais sobre marketing real, IA aplicada e bastidor de produto. Texto curto, números reais, zero hype.",
  alternates: { canonical: "/newsletter" },
  openGraph: {
    title: "Newsletter — Gabriel Madureira",
    description:
      "Cartas semanais sobre marketing real, IA aplicada e bastidor de produto.",
    url: "https://madureira.xyz/newsletter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Newsletter — Gabriel Madureira",
    description:
      "Cartas semanais sobre marketing real, IA aplicada e bastidor de produto.",
    creator: "@ogmadureira",
  },
};

// Revalida a cada 60s (server-side).
export const revalidate = 60;

function formatDate(d: Date | string | null) {
  if (!d) return "";
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function NewsletterPage() {
  const posts = await listPublishedNewsletters().catch(() => []);

  return (
    <main
      className={`${fraunces.variable} ${inter.variable}`}
      style={{
        background: "#0a0908",
        color: "#f4f1ea",
        minHeight: "100vh",
        fontFamily: 'var(--font-inter), "Inter", system-ui, -apple-system, sans-serif',
        fontFeatureSettings: '"ss01", "cv11"',
      }}
    >
      <div
        style={{
          maxWidth: 760,
          margin: "0 auto",
          padding: "120px 24px 96px",
        }}
      >
        {/* Eyebrow mono */}
        <p
          style={{
            fontFamily: '"Geist Mono", "JetBrains Mono", ui-monospace, monospace',
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(244, 241, 234, 0.45)",
            marginBottom: 24,
          }}
        >
          <span style={{ color: "#e63a1f" }}>●</span>&nbsp;&nbsp;Newsletter
          do Madureira&nbsp;&nbsp;·&nbsp;&nbsp;Toda semana
        </p>

        {/* Hero título Fraunces italic */}
        <h1
          style={{
            fontFamily: 'var(--font-fraunces), "Fraunces", Georgia, serif',
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(56px, 8vw, 96px)",
            lineHeight: 0.98,
            letterSpacing: "-0.025em",
            margin: 0,
            color: "#f4f1ea",
          }}
        >
          O que estou{" "}
          <span style={{ color: "#e63a1f" }}>aprendendo</span>
          ,
          <br />
          em primeira mão.
        </h1>

        {/* Lede */}
        <p
          style={{
            marginTop: 28,
            maxWidth: 540,
            fontSize: 18,
            lineHeight: 1.55,
            color: "rgba(244, 241, 234, 0.78)",
          }}
        >
          Cartas semanais sobre marketing real, IA aplicada e bastidor de
          produto. Texto curto, números reais, zero hype. Sai toda quinta,
          direto na sua caixa.
        </p>

        {/* Form de assinatura */}
        <form
          action="/api/newsletter/subscribe"
          method="post"
          style={{
            marginTop: 40,
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            alignItems: "stretch",
          }}
        >
          <input
            type="email"
            name="email"
            placeholder="seu melhor email"
            required
            style={{
              flex: "1 1 240px",
              minWidth: 200,
              padding: "14px 18px",
              background: "#111110",
              border: "1px solid rgba(244, 241, 234, 0.14)",
              color: "#f4f1ea",
              fontFamily: "inherit",
              fontSize: 15,
              outline: "none",
              borderRadius: 4,
            }}
          />
          <button
            type="submit"
            style={{
              padding: "14px 24px",
              background: "#e63a1f",
              color: "#fff",
              fontFamily: '"Geist Mono", "JetBrains Mono", ui-monospace, monospace',
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              borderRadius: 4,
            }}
          >
            Assinar →
          </button>
        </form>

        <p
          style={{
            marginTop: 12,
            fontSize: 12,
            color: "rgba(244, 241, 234, 0.40)",
            fontFamily: '"Geist Mono", ui-monospace, monospace',
            letterSpacing: "0.08em",
          }}
        >
          Sem spam. Cancela quando quiser.
        </p>

        {/* Divisor editorial */}
        <div
          style={{
            margin: "96px 0 48px",
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <span
            style={{
              fontFamily: '"Geist Mono", ui-monospace, monospace',
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(244, 241, 234, 0.50)",
              whiteSpace: "nowrap",
            }}
          >
            Edições anteriores
          </span>
          <span
            style={{
              flex: 1,
              height: 1,
              background: "rgba(244, 241, 234, 0.10)",
            }}
          />
          <span
            style={{
              fontFamily: '"Geist Mono", ui-monospace, monospace',
              fontSize: 11,
              letterSpacing: "0.22em",
              color: "rgba(244, 241, 234, 0.35)",
            }}
          >
            {String(posts.length).padStart(2, "0")} ·{" "}
            {String(posts.length).padStart(2, "0")}
          </span>
        </div>

        {/* Lista editorial */}
        {posts.length === 0 ? (
          <p
            style={{
              fontSize: 16,
              color: "rgba(244, 241, 234, 0.50)",
              fontStyle: "italic",
              fontFamily: 'var(--font-fraunces), "Fraunces", Georgia, serif',
            }}
          >
            A primeira edição sai em breve. Entra na lista pra receber.
          </p>
        ) : (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {posts.map((p, idx) => (
              <li
                key={p.id}
                style={{
                  borderTop:
                    idx === 0 ? "none" : "1px solid rgba(244, 241, 234, 0.08)",
                  padding: "32px 0",
                }}
              >
                <Link
                  href={`/newsletter/${p.slug}`}
                  className="newsletter-item"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: 12,
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  {/* Meta linha (data · tempo) */}
                  <div
                    style={{
                      display: "flex",
                      gap: 16,
                      alignItems: "center",
                      fontFamily: '"Geist Mono", ui-monospace, monospace',
                      fontSize: 11,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "rgba(244, 241, 234, 0.45)",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 500,
                        color: "rgba(244, 241, 234, 0.62)",
                      }}
                    >
                      Nº {String(posts.length - idx).padStart(2, "0")}
                    </span>
                    <span style={{ opacity: 0.4 }}>·</span>
                    <span>{formatDate(p.published_at)}</span>
                    {p.reading_time_min ? (
                      <>
                        <span style={{ opacity: 0.4 }}>·</span>
                        <span>{p.reading_time_min} min</span>
                      </>
                    ) : null}
                  </div>

                  {/* Título serif italic */}
                  <h2
                    style={{
                      fontFamily:
                        'var(--font-fraunces), "Fraunces", Georgia, serif',
                      fontStyle: "italic",
                      fontWeight: 300,
                      fontSize: "clamp(28px, 4.4vw, 40px)",
                      lineHeight: 1.08,
                      letterSpacing: "-0.02em",
                      margin: 0,
                      color: "#f4f1ea",
                    }}
                  >
                    {p.title}
                  </h2>

                  {/* Excerpt */}
                  {p.excerpt ? (
                    <p
                      style={{
                        margin: 0,
                        fontSize: 16,
                        lineHeight: 1.55,
                        color: "rgba(244, 241, 234, 0.65)",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {p.excerpt}
                    </p>
                  ) : null}

                  {/* CTA discreto */}
                  <span
                    style={{
                      fontFamily: '"Geist Mono", ui-monospace, monospace',
                      fontSize: 11,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "#e63a1f",
                      marginTop: 4,
                    }}
                  >
                    Ler edição →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* Footer minimalista */}
        <footer
          style={{
            marginTop: 120,
            paddingTop: 32,
            borderTop: "1px solid rgba(244, 241, 234, 0.08)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <span
            style={{
              fontFamily: '"Geist Mono", ui-monospace, monospace',
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(244, 241, 234, 0.40)",
            }}
          >
            madureira.xyz · 2026
          </span>
          <Link
            href="/links"
            style={{
              fontFamily: '"Geist Mono", ui-monospace, monospace',
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(244, 241, 234, 0.60)",
              textDecoration: "none",
            }}
          >
            ← Todos os links
          </Link>
        </footer>
      </div>

      <style>{`
        .newsletter-item:hover h2 {
          color: #e63a1f !important;
        }
        .newsletter-item:hover span:last-child {
          letter-spacing: 0.26em;
        }
      `}</style>
    </main>
  );
}
