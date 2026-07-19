"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type Props = {
  title: string;
  tagline?: string;
  description?: string;
};

export function ProjectConstruction({ title, tagline, description }: Props) {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center px-6 pt-32 pb-24 text-center">
      {/* Back */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-28 left-6 sm:left-10"
      >
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar pra projetos
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl"
      >
        <p className="text-muted-foreground text-[11px] font-mono uppercase tracking-[0.24em] mb-6">
          Em construção
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
          {title}
        </h1>

        {tagline && (
          <p className="text-foreground/75 text-lg sm:text-xl max-w-xl mx-auto mb-6 leading-relaxed">
            {tagline}
          </p>
        )}

        {description && (
          <p className="text-muted-foreground text-base max-w-lg mx-auto leading-relaxed mb-10">
            {description}
          </p>
        )}

        <div className="inline-flex items-center gap-2 text-muted-foreground/80 font-mono text-[11px] uppercase tracking-[0.18em] border border-border/60 rounded-full px-4 py-2 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 animate-pulse" />
          Página em escrita. Volta em breve.
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://kaleidos.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors"
          >
            Conheça a Kaleidos
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
          <Link
            href="/projects"
            className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium border border-border text-foreground/80 hover:text-foreground hover:border-foreground/40 transition-colors"
          >
            Ver projetos ativos
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
