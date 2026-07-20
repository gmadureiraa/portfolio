"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { LatestPost } from "../_lib/links";
import { trackClick } from "../_lib/tracking";

/**
 * "Últimos posts" — carrossel lateral (scroll horizontal com snap), replicando
 * o strip de cards do linktree do Felipe M3D (links-felipe.html: .strip/.pcard).
 * Fonte real: content/posts/*.md via lib/posts, lido no server em page.tsx.
 */
export function LatestPosts({ posts }: { posts: LatestPost[] }) {
  if (posts.length === 0) return null;

  return (
    <div className="posts-strip" role="list" aria-label="Últimos posts">
      {posts.map((post, index) => (
        <motion.a
          key={post.slug}
          role="listitem"
          href={`/posts/${post.slug}`}
          onClick={() => trackClick(`post-${post.slug}`)}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.15 + index * 0.06,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.985 }}
          className="group post-card relative block"
        >
          <div className="glass-card relative h-full overflow-hidden rounded-2xl">
            <div
              className="relative h-[104px] w-full overflow-hidden"
              style={{
                boxShadow: "inset 0 0 0 1px var(--links-glass-border)",
              }}
            >
              <Image
                src={post.image}
                alt=""
                fill
                sizes="176px"
                className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="px-3.5 pb-4 pt-3">
              <p
                className="ds-mono text-[8.5px]"
                style={{ color: "var(--links-fg-faint)" }}
              >
                {post.category}
              </p>
              <h3
                className="mt-1.5 text-[12.5px] font-medium leading-snug tracking-tight line-clamp-3"
                style={{ color: "var(--links-fg-strong)" }}
              >
                {post.title}
              </h3>
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
