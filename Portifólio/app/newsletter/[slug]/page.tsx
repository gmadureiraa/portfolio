import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Instrument_Serif } from "next/font/google";
import { marked } from "marked";
import {
  getNewsletterBySlug,
  listPublishedNewsletters,
} from "@/lib/db/newsletter";
import { NewsletterPostFooterForm } from "@/components/newsletter-synecdoche/post-footer-form";
import { ViewPing } from "@/components/newsletter-synecdoche/view-ping";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
});

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://madureira.xyz";

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

  const html = marked.parse(post.content_md, { async: false }) as string;

  return (
    <main className={`${instrumentSerif.variable} bg-background w-full`}>
      <article className="mx-auto max-w-3xl px-6 py-16 md:px-12 md:py-24">
        <ViewPing slug={post.slug} />

        <nav className="mb-12 flex items-center gap-3 text-xs uppercase tracking-widest text-neutral-500">
          <Link href="/newsletter" className="hover:text-neutral-300">
            ← Newsletter
          </Link>
        </nav>

        {post.hero_image_url ? (
          <div className="mb-10 overflow-hidden rounded-xl border border-neutral-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.hero_image_url}
              alt={post.title}
              className="h-auto w-full"
            />
          </div>
        ) : (
          <div className="mb-10 h-32 rounded-xl border border-neutral-800 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black" />
        )}

        <header className="mb-10 border-b border-neutral-800 pb-8">
          <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-neutral-500">
            <span>{formatDate(post.published_at)}</span>
            {post.reading_time_min ? (
              <>
                <span>·</span>
                <span>{post.reading_time_min} min de leitura</span>
              </>
            ) : null}
          </div>
          <h1 className="mt-3 font-serif text-4xl italic leading-tight text-foreground md:text-6xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-neutral-400">{post.excerpt}</p>
          <p className="mt-6 text-sm text-neutral-500">
            Por {post.author_name}
          </p>
        </header>

        <div
          className="prose prose-invert prose-neutral max-w-none prose-headings:font-serif prose-headings:font-normal prose-h2:text-3xl prose-h2:mt-12 prose-h3:text-2xl prose-a:text-foreground prose-a:underline prose-strong:text-foreground prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <footer className="mt-16 border-t border-neutral-800 pt-12">
          <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-8">
            <p className="text-xs uppercase tracking-widest text-neutral-500">
              Newsletter
            </p>
            <h3 className="mt-2 font-serif text-3xl italic text-foreground">
              Recebe a próxima na caixa.
            </h3>
            <p className="mt-2 text-sm text-neutral-400">
              IA aplicada em marketing e produto. 1x por semana, sem hype.
            </p>
            <div className="mt-6">
              <NewsletterPostFooterForm />
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href="/newsletter"
              className="text-xs uppercase tracking-widest text-neutral-500 hover:text-neutral-300"
            >
              Ver todas as edições →
            </Link>
          </div>
        </footer>
      </article>
    </main>
  );
}
