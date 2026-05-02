import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import Link from "next/link";
import { Background } from "@/components/newsletter-synecdoche/background";
import { NewsletterHero } from "@/components/newsletter-synecdoche/hero";
import { NewsletterFooter } from "@/components/newsletter-synecdoche/footer";
import { listPublishedNewsletters } from "@/lib/db/newsletter";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  title: "Newsletter — Madureira®",
  description:
    "Bastidores de produtos digitais, IA e marketing. Toda semana, com print da tela e número. Sem hype.",
  alternates: { canonical: "/newsletter" },
  openGraph: {
    title: "Newsletter do Madureira",
    description:
      "Bastidores de produtos digitais, IA e marketing. Toda semana, com print da tela e número. Sem hype.",
    url: "https://madureira.xyz/newsletter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Newsletter do Madureira",
    description:
      "Bastidores de produtos digitais, IA e marketing. Toda semana, com print da tela e número. Sem hype.",
    creator: "@ogmadureira",
  },
};

// Server-side: lista de posts. Revalida a cada 60s.
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
    <main className={`${instrumentSerif.variable} w-full`}>
      {/* Hero (full viewport) */}
      <section className="p-inset relative h-[100dvh] w-full">
        <div className="relative h-full w-full">
          <Background
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alt-g7Cv2QzqL3k6ey3igjNYkM32d8Fld7.mp4"
            placeholder="/newsletter/alt-placeholder.png"
          />
          <NewsletterHero />
          <NewsletterFooter />
        </div>
      </section>

      {/* Lista de posts publicados */}
      {posts.length > 0 && (
        <section className="bg-background w-full px-6 py-24 md:px-12 lg:px-20">
          <div className="mx-auto max-w-3xl">
            <header className="mb-12 border-b border-neutral-800 pb-8">
              <p className="text-xs uppercase tracking-widest text-neutral-500">
                Edições anteriores
              </p>
              <h2 className="mt-2 font-serif text-4xl italic text-foreground md:text-5xl">
                Tudo que já saiu.
              </h2>
            </header>

            <ul className="divide-y divide-neutral-800">
              {posts.map((p) => (
                <li key={p.id} className="py-8">
                  <Link
                    href={`/newsletter/${p.slug}`}
                    className="group flex flex-col gap-2"
                  >
                    <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-neutral-500">
                      <span>{formatDate(p.published_at)}</span>
                      {p.reading_time_min ? (
                        <>
                          <span>·</span>
                          <span>{p.reading_time_min} min de leitura</span>
                        </>
                      ) : null}
                    </div>
                    <h3 className="font-serif text-2xl text-foreground transition-colors group-hover:text-neutral-200 md:text-3xl">
                      {p.title}
                    </h3>
                    <p className="text-base text-neutral-400 line-clamp-2">
                      {p.excerpt}
                    </p>
                    <span className="mt-1 text-xs uppercase tracking-widest text-neutral-500 group-hover:text-neutral-300">
                      Ler →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
}
