"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { playbook } from "../_lib/links";
import { trackClick } from "../_lib/tracking";

/**
 * Card destaque do playbook — equivalente ao card primário com mockup do
 * linktree do Felipe M3D, no DS Madureira: capa editorial à esquerda
 * (Fraunces italic sobre preto) + copy + seta.
 *
 * TODO: substituir a capa CSS por <Image> quando existir asset real da capa
 * do playbook (nenhum encontrado no repo — não inventar/baixar).
 */
export function PlaybookCard() {
  return (
    <motion.a
      href={playbook.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackClick(playbook.id)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
      className="group relative block w-full"
    >
      <div className="glass-card relative overflow-hidden rounded-2xl">
        <div className="relative flex items-stretch gap-4 p-4 sm:p-5">
          {/* Capa editorial (CSS) */}
          <div className="playbook-cover shrink-0" aria-hidden="true">
            <span className="playbook-cover-kicker">Kaleidos</span>
            <span className="playbook-cover-title">
              Play
              <br />
              book
            </span>
            <span className="playbook-cover-sub">marketing no bear market</span>
          </div>

          <div className="flex flex-1 min-w-0 flex-col justify-center py-1">
            <span
              className="ds-mono inline-flex w-fit items-center rounded-full px-2 py-1 text-[9px]"
              style={{
                color: "var(--links-accent)",
                boxShadow:
                  "inset 0 0 0 1px rgba(var(--links-accent-rgb), 0.35)",
              }}
            >
              Grátis
            </span>
            <h3
              className="mt-2.5 font-semibold text-[17px] leading-tight tracking-tight"
              style={{ color: "var(--links-fg-strong)" }}
            >
              {playbook.title}
            </h3>
            <p
              className="mt-1.5 text-[12.5px] leading-relaxed font-light"
              style={{ color: "var(--links-fg-muted)" }}
            >
              {playbook.description}
            </p>
          </div>

          <div
            className="shrink-0 self-start transition-opacity duration-300 opacity-40 group-hover:opacity-100"
            style={{ color: "var(--links-accent)" }}
          >
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.a>
  );
}
