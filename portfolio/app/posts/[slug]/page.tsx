import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ReadingProgress } from "@/components/reading-progress";
import { getLocalPostBySlug, getLocalPosts } from "@/lib/posts";

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://madureira.xyz";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = getLocalPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getLocalPostBySlug(slug);
  if (!post) {
    return {
      title: "Post — Madureira®",
      robots: { index: false },
    };
  }

  const url = `${BASE}/posts/${post.slug}`;
  const ogImage = post.data.image || undefined;

  return {
    title: `${post.data.title} — Madureira®`,
    description: post.data.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.data.title,
      description: post.data.description,
      url,
      type: "article",
      publishedTime: post.data.date,
      authors: ["Gabriel Madureira"],
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.data.title,
      description: post.data.description,
      creator: "@ogmadureira",
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getLocalPostBySlug(slug);
  if (!post) notFound();

  const url = `${BASE}/posts/${post.slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.data.title,
    description: post.data.description,
    datePublished: post.data.date || undefined,
    dateModified: post.data.date || undefined,
    image: post.data.image ? [post.data.image] : undefined,
    inLanguage: "pt-BR",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: {
      "@type": "Person",
      name: "Gabriel Madureira",
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

  const formattedDate = new Date(post.data.date || "2024-01-01").toLocaleDateString(
    "pt-BR",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );

  return (
    <main className="min-h-screen w-full flex flex-col items-center px-4 py-6 sm:p-6 lg:p-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <ReadingProgress />
      <div className="max-w-4xl w-full">
        {/* Back Button */}
        <div className="mb-6 sm:mb-8">
          <Link
            href="/newsletter"
            className="inline-flex items-center gap-2 min-h-[44px] text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Voltar aos posts
          </Link>
        </div>

        {/* Post Header */}
        <div className="mb-8 sm:mb-10">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <span className="px-3 py-1 bg-neutral-800 text-neutral-300 text-xs sm:text-sm rounded-full border border-neutral-700">
              {post.data.category || "Geral"}
            </span>
            <span className="text-neutral-500 text-xs sm:text-sm">
              {formattedDate}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-100 mb-4 sm:mb-6 leading-tight break-words">
            {post.data.title}
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-neutral-400 leading-relaxed border-l-2 border-neutral-700 pl-3 sm:pl-4">
            {post.data.description}
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-neutral-800" />
          <span className="text-neutral-600 text-sm">Gabriel Madureira</span>
          <div className="flex-1 h-px bg-neutral-800" />
        </div>

        {/* Post Content */}
        {post.content ? (
          <div
            className="madureira-prose max-w-none break-words"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        ) : (
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-8 text-center">
            <p className="text-neutral-400">Conteúdo não disponível.</p>
          </div>
        )}

        {/* Author Footer */}
        <div className="mt-16 pt-8 border-t border-neutral-800">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <p className="text-neutral-100 font-semibold mb-1">
                Gabriel Madureira
              </p>
              <p className="text-neutral-400 text-sm">
                Fundador da Kaleidos (agência de marketing digital). Escreve
                sobre marketing, IA e automação.
              </p>
              <div className="flex gap-4 mt-3">
                <a
                  href="https://x.com/ogmadureira"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-neutral-300 text-sm transition-colors"
                >
                  Twitter/X
                </a>
                <a
                  href="https://www.linkedin.com/in/gabrielmadureira"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-neutral-300 text-sm transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Back to posts */}
        <div className="mt-8 text-center">
          <Link
            href="/newsletter"
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-300 hover:border-neutral-700 hover:text-neutral-100 transition-all"
          >
            ← Ver todos os posts
          </Link>
        </div>
      </div>
    </main>
  );
}
