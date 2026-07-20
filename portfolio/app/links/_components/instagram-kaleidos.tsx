"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { InstagramIcon } from "../_lib/links";
import { trackClick } from "../_lib/tracking";

/**
 * Bloco do Instagram da Kaleidos (@digitalkaleidos) — link visual pro perfil,
 * abaixo dos últimos posts. Ícone com o gradiente oficial do Instagram como
 * único ponto de cor da página (reconhecimento imediato da plataforma);
 * grade decorativa monocromática à direita sugere o feed sem inventar posts.
 */
export function InstagramKaleidos() {
  return (
    <motion.a
      href="https://www.instagram.com/digitalkaleidos"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackClick("kaleidos-instagram")}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
      className="group relative block w-full"
    >
      <div className="glass-card relative overflow-hidden rounded-2xl">
        <div className="relative flex items-center gap-4 px-5 py-5">
          <div className="ig-gradient-tile shrink-0">
            <InstagramIcon className="w-[22px] h-[22px] text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <p
              className="ds-mono text-[8.5px]"
              style={{ color: "var(--links-fg-faint)" }}
            >
              Instagram
            </p>
            <h3
              className="mt-1 font-semibold text-[15px] leading-tight tracking-tight"
              style={{ color: "var(--links-fg-strong)" }}
            >
              @digitalkaleidos
            </h3>
            <p
              className="mt-1 text-[12px] truncate font-light"
              style={{ color: "var(--links-fg-muted)" }}
            >
              Bastidores e método da agência
            </p>
          </div>

          {/* mini-grade decorativa (sugere o feed, sem posts inventados) */}
          <div className="ig-feed-hint shrink-0" aria-hidden="true">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <span key={i} style={{ opacity: 0.9 - i * 0.12 }} />
            ))}
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
  );
}
