"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { LatestPost } from "../_lib/links";
import { trackClick } from "../_lib/tracking";

/**
 * "Últimos posts" — seção de conteúdo recente do próprio Madureira
 * (fonte real: content/posts/*.md via lib/posts, lido no server em page.tsx).
 * Estrutura inspirada no strip de cards do linktree do Felipe M3D.
 */
export function LatestPosts({ posts }: { posts: LatestPost[] }) {
  if (posts.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      {posts.map((post, index) => (
        <motion.a
          key={post.slug}
          href={`/posts/${post.slug}`}
          onClick={() => trackClick(`post-${post.slug}`)}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.15 + index * 0.06,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.985 }}
          className="group relative block w-full"
        >
          <div className="glass-card relative overflow-hidden rounded-2xl">
            <div className="relative flex items-center gap-4 px-4 py-4">
              <div
                className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl"
                style={{
                  boxShadow: "inset 0 0 0 1px var(--links-glass-border)",
                }}
              >
                <Image
                  src={post.image}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex-1 min-w-0">
                <p
                  className="ds-mono text-[9px]"
                  style={{ color: "var(--links-fg-faint)" }}
                >
                  {post.category}
                </p>
                <h3
                  className="mt-1 text-[13.5px] font-medium leading-snug tracking-tight line-clamp-2"
                  style={{ color: "var(--links-fg-strong)" }}
                >
                  {post.title}
                </h3>
              </div>

              <div
                className="shrink-0 transition-opacity duration-300 opacity-40 group-hover:opacity-100"
                style={{ color: "var(--links-icon-fg)" }}
              >
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
