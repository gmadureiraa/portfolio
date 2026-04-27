"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default function PostPage({ params }: PostPageProps) {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLocalPost, setIsLocalPost] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      try {
        // Try local post first
        const localRes = await fetch(`/api/posts/${params.slug}`);
        if (localRes.ok) {
          const localPost = await localRes.json();
          setPost(localPost);
          setIsLocalPost(true);
          setLoading(false);
          return;
        }

        // Fallback: search in Bento posts list
        const postsRes = await fetch("/api/fetch-posts");
        const postsData = await postsRes.json();
        if (postsData?.postsData) {
          const foundPost = postsData.postsData.find(
            (p: any) => p.slug === params.slug
          );
          if (foundPost) {
            setPost(foundPost);
          }
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    getPost();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-neutral-400">Carregando...</div>
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  const postData = isLocalPost ? post.data : post.data;
  const postContent = isLocalPost ? post.content : null;

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 lg:p-8">
      <div className="max-w-4xl w-full">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar aos posts
          </Link>
        </motion.div>

        {/* Post Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-neutral-800 text-neutral-300 text-sm rounded-full border border-neutral-700">
              {postData?.category || "Geral"}
            </span>
            <span className="text-neutral-500 text-sm">
              {new Date(postData?.date || "2024-01-01").toLocaleDateString("pt-BR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-100 mb-6 leading-tight">
            {postData?.title}
          </h1>

          <p className="text-xl text-neutral-400 leading-relaxed border-l-2 border-neutral-700 pl-4">
            {postData?.description}
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="flex-1 h-px bg-neutral-800" />
          <span className="text-neutral-600 text-sm">Gabriel Madureira</span>
          <div className="flex-1 h-px bg-neutral-800" />
        </motion.div>

        {/* Post Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {postContent ? (
            <div
              className="prose prose-invert prose-lg max-w-none
                prose-headings:text-neutral-100 prose-headings:font-bold
                prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8
                prose-p:text-neutral-300 prose-p:leading-relaxed prose-p:mb-6
                prose-strong:text-neutral-100 prose-strong:font-semibold
                prose-em:text-neutral-300
                prose-ul:text-neutral-300 prose-ul:space-y-2
                prose-ol:text-neutral-300 prose-ol:space-y-2
                prose-li:text-neutral-300
                prose-code:text-green-400 prose-code:bg-neutral-900 prose-code:px-1 prose-code:rounded prose-code:text-sm
                prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-neutral-800 prose-pre:rounded-lg
                prose-blockquote:border-l-neutral-700 prose-blockquote:text-neutral-400
                prose-hr:border-neutral-800
                prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300"
              dangerouslySetInnerHTML={{ __html: postContent }}
            />
          ) : (
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-8 text-center">
              <p className="text-neutral-400">Conteúdo não disponível.</p>
            </div>
          )}
        </motion.div>

        {/* Author Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 pt-8 border-t border-neutral-800"
        >
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <p className="text-neutral-100 font-semibold mb-1">Gabriel Madureira</p>
              <p className="text-neutral-400 text-sm">
                Fundador da Kaleidos (agência de marketing digital). Escreve sobre marketing, IA e automação.
              </p>
              <div className="flex gap-4 mt-3">
                <a
                  href="https://x.com/madureira0x"
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
        </motion.div>

        {/* Back to posts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 text-center"
        >
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-300 hover:border-neutral-700 hover:text-neutral-100 transition-all"
          >
            ← Ver todos os posts
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
