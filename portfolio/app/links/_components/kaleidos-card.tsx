"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { trackClick } from "../_lib/tracking";

/**
 * Card destaque da Agência Kaleidos — logo oficial (kaleidos-logo-white.svg,
 * símbolo branco do brandbook, mesmo Logos-10 do site-kaleidos) sobre tile escuro,
 * banda de gradiente sutil e copy da agência.
 */
export function KaleidosCard() {
  return (
    <motion.a
      href="https://kaleidos.com.br"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackClick("kaleidos")}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
      className="group relative block w-full"
    >
      <div className="glass-card kaleidos-card relative overflow-hidden rounded-2xl">
        {/* brilho radial atrás do logo */}
        <div className="kaleidos-card-glow" aria-hidden="true" />
        <div className="relative flex items-center gap-5 px-5 py-6">
          <div className="kaleidos-logo-tile shrink-0">
            <Image
              src="/kaleidos-logo-white.svg"
              alt="Logo da Kaleidos"
              width={44}
              height={31}
              className="transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          <div className="flex-1 min-w-0">
            <p
              className="ds-mono text-[8.5px]"
              style={{ color: "var(--links-fg-faint)" }}
            >
              A agência
            </p>
            <h3
              className="mt-1 font-semibold text-[18px] leading-tight tracking-tight"
              style={{ color: "var(--links-fg-strong)" }}
            >
              Agência Kaleidos
            </h3>
            <p
              className="mt-1.5 text-[12.5px] leading-relaxed font-light"
              style={{ color: "var(--links-fg-muted)" }}
            >
              Marketing digital para cripto, web3 e fintech
            </p>
          </div>

          <div
            className="shrink-0 transition-opacity duration-300 opacity-40 group-hover:opacity-100"
            style={{ color: "var(--links-accent)" }}
          >
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.a>
  );
}
