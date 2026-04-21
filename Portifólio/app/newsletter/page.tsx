import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Mail } from "lucide-react";
import type { Metadata } from "next";
import { getLocalPosts } from "@/lib/posts";
import { NewsletterSignup } from "@/components/newsletter-signup";
import ThemeToggle from "@/components/theme-toggle";
import RetroGrid from "@/components/magicui/retro-grid";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Newsletter — Madureira",
  description:
    "Bastidores de como construo produtos digitais, marketing e automacao no mercado cripto. Enviado toda semana, direto ao ponto.",
  openGraph: {
    title: "Newsletter do Madureira",
    description:
      "Bastidores de como construo produtos digitais, marketing e automacao no mercado cripto.",
  },
};

export default function NewsletterPage() {
  const posts = getLocalPosts();

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground">
      <RetroGrid className="opacity-20 fixed inset-0 pointer-events-none" />

      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-white transition-colors hover:bg-white/5 py-2 px-4 rounded-full"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao portfolio
        </Link>
        <ThemeToggle />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-4xl px-4 pt-28 pb-20">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/50 px-3 py-1 text-xs text-neutral-300 mb-6">
            <Mail className="h-3.5 w-3.5" />
            Newsletter
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-100 mb-4">
            Marketing, cripto e IA — sem achismo.
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Toda semana um post com bastidores reais de como construo produtos,
            estrategias e automacoes no mercado cripto. Sem spam, sem enrolacao.
          </p>
        </header>

        <div className="mb-16">
          <NewsletterSignup
            title="Assinar a newsletter"
            description="Receba direto no seu e-mail os bastidores de cada build. Cancele quando quiser."
          />
        </div>

        <section>
          <h2 className="text-2xl font-bold text-neutral-100 mb-6">
            Edicoes publicadas
          </h2>

          {posts.length === 0 ? (
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-8 text-center text-neutral-400">
              Nenhuma edicao publicada ainda. Assine para receber a primeira.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  className="group relative overflow-hidden rounded-xl border border-neutral-800 bg-background transition-all hover:border-neutral-700 hover:shadow-xl"
                >
                  <div className="relative aspect-video w-full overflow-hidden border-b border-neutral-800">
                    <Image
                      src={post.data.image}
                      alt={post.data.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <div className="mb-3 flex items-center gap-2 text-xs">
                      <span className="rounded-full border border-neutral-700 bg-neutral-800/50 px-2 py-0.5 text-neutral-300">
                        {post.data.category}
                      </span>
                      <span className="text-neutral-500">
                        {new Date(post.data.date).toLocaleDateString("pt-BR", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-100 leading-snug group-hover:text-white">
                      {post.data.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm text-neutral-400">
                      {post.data.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-neutral-300 group-hover:text-white">
                      Ler edicao
                      <span className="transition-transform group-hover:translate-x-0.5">
                        &rarr;
                      </span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
