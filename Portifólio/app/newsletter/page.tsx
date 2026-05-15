import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Image from "next/image";
import { listPublishedNewsletters } from "@/lib/db/newsletter";
import { NewsletterHeroForm } from "@/components/newsletter-synecdoche/hero-form";
import { NewsletterList } from "@/components/newsletter-list";

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
  title: "Cartas do Madureira — Newsletter",
  description:
    "Cartas semanais sobre marketing direto, IA aplicada e bastidor real de quem constrói. Texto curto, números reais, zero hype.",
  alternates: { canonical: "/newsletter" },
  openGraph: {
    title: "Cartas do Madureira — Newsletter",
    description:
      "Cartas semanais sobre marketing direto, IA aplicada e bastidor real de quem constrói.",
    url: "https://madureira.xyz/newsletter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cartas do Madureira — Newsletter",
    description:
      "Cartas semanais sobre marketing direto, IA aplicada e bastidor real de quem constrói.",
    creator: "@ogmadureira",
  },
};

// Revalida a cada 60s (server-side).
export const revalidate = 60;

const MONO = '"Geist Mono", "JetBrains Mono", ui-monospace, monospace';
const SERIF = 'var(--font-fraunces), "Fraunces", Georgia, serif';

export default async function NewsletterPage() {
  const posts = await listPublishedNewsletters().catch(() => []);

  return (
    <main
      className={`${fraunces.variable} ${inter.variable} bg-background text-foreground`}
      style={{
        minHeight: "100vh",
        fontFamily:
          'var(--font-inter), "Inter", system-ui, -apple-system, sans-serif',
        fontFeatureSettings: '"ss01", "cv11"',
      }}
    >
      {/* ════════════════════════ MANIFESTO ════════════════════════ */}
      <section
        className="border-b border-border"
        style={{
          paddingTop: "clamp(80px, 12vw, 144px)",
          paddingBottom: "clamp(56px, 9vw, 96px)",
          paddingLeft: "clamp(20px, 4vw, 56px)",
          paddingRight: "clamp(20px, 4vw, 56px)",
        }}
      >
        <div style={{ maxWidth: 880, margin: "0 auto", textAlign: "center" }}>
          <p
            className="text-muted-foreground"
            style={{
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              margin: 0,
              marginBottom: 28,
            }}
          >
            <span className="text-foreground/50">●</span>
            &nbsp;&nbsp;Manifesto&nbsp;&nbsp;·&nbsp;&nbsp;Toda quinta
          </p>

          <h1
            style={{
              fontFamily: SERIF,
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(44px, 7vw, 84px)",
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              margin: 0,
            }}
          >
            marketing direto.
            <br />
            IA aplicada.
            <br />
            bastidor real de
            <br />
            quem constrói.
          </h1>

          <p
            className="text-foreground/75 mx-auto"
            style={{
              marginTop: 32,
              maxWidth: 580,
              fontSize: 17,
              lineHeight: 1.65,
            }}
          >
            Cartas semanais com o que funcionou, o que quebrou e os números por
            trás. Texto curto, zero hype, números reais. Sai toda quinta direto
            na sua caixa.
          </p>

          <p
            className="text-muted-foreground"
            style={{
              marginTop: 24,
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            uma por semana&nbsp;&nbsp;·&nbsp;&nbsp;zero spam&nbsp;&nbsp;·&nbsp;&nbsp;cancela quando quiser
          </p>
        </div>
      </section>

      {/* ════════════════════════ LISTA + SIDEBAR ════════════════════════ */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "clamp(56px, 8vw, 96px) clamp(20px, 4vw, 56px)",
        }}
      >
        {/* Título da seção */}
        <header style={{ marginBottom: 48, maxWidth: 720 }}>
          <p
            className="text-muted-foreground"
            style={{
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Arquivo completo
          </p>
          <h2
            style={{
              fontFamily: SERIF,
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(40px, 5.4vw, 64px)",
              lineHeight: 1.04,
              letterSpacing: "-0.022em",
              margin: 0,
            }}
          >
            Cartas do Madureira
          </h2>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
          {/* Coluna esquerda — filtros + lista */}
          <div>
            <NewsletterList posts={posts} />
          </div>

          {/* Sidebar direita */}
          <aside className="space-y-10 lg:sticky lg:top-32 self-start">
            {/* Identity card */}
            <div
              className="border border-border rounded-lg p-7"
              style={{
                background: "transparent",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/avatar.png"
                  alt="Gabriel Madureira"
                  width={48}
                  height={48}
                  className="rounded-full border border-border"
                />
                <div>
                  <p
                    style={{
                      fontFamily: SERIF,
                      fontStyle: "italic",
                      fontWeight: 300,
                      fontSize: 20,
                      lineHeight: 1.1,
                      margin: 0,
                    }}
                  >
                    Gabriel Madureira
                  </p>
                  <p
                    className="text-muted-foreground"
                    style={{
                      fontFamily: MONO,
                      fontSize: 11,
                      letterSpacing: "0.12em",
                      margin: "4px 0 0",
                    }}
                  >
                    @ogmadureira
                  </p>
                </div>
              </div>
              <p
                className="text-foreground/75"
                style={{
                  fontSize: 14,
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                Fundador da Kaleidos. Construo produtos e sistemas de marketing
                com IA e automação. Aqui eu divido o que funcionou, o que
                quebrou, e os números por trás — sem teoria de palco.
              </p>
              <div className="flex gap-3 mt-4">
                {[
                  { label: "X", href: "https://x.com/ogmadureira" },
                  {
                    label: "LinkedIn",
                    href: "https://www.linkedin.com/in/gabriel-madureira/",
                  },
                  {
                    label: "IG",
                    href: "https://www.instagram.com/ogmadureira/",
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    style={{
                      fontFamily: MONO,
                      fontSize: 11,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                    }}
                  >
                    {s.label} ↗
                  </a>
                ))}
              </div>
            </div>

            {/* Email signup */}
            <div
              className="border border-border rounded-lg p-7"
              style={{
                background: "transparent",
              }}
            >
              <p
                className="text-muted-foreground"
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  margin: 0,
                  marginBottom: 12,
                }}
              >
                Assina a carta
              </p>
              <h3
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: 26,
                  lineHeight: 1.15,
                  letterSpacing: "-0.018em",
                  margin: "0 0 8px",
                }}
              >
                Quinta na sua caixa.
              </h3>
              <p
                className="text-foreground/70"
                style={{
                  fontSize: 13.5,
                  lineHeight: 1.55,
                  margin: "0 0 18px",
                }}
              >
                Sem spam, cancela quando quiser.
              </p>
              <NewsletterHeroForm />
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
