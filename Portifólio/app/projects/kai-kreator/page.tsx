"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function KaiKreatorPage() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 lg:p-8">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar para projetos
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full aspect-video overflow-hidden rounded-xl border border-neutral-800 mb-10"
        >
          <Image
            src="/images/projects/kai-kreator.png"
            alt="Capa do KAI Kreator"
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block mb-4 text-xs font-semibold px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-300">
            Ferramenta interna Kaleidos
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-100 mb-4">KAI Kreator</h1>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Sistema de gestão editorial com IA que orquestra o pipeline de conteúdo dos clientes da
            Kaleidos, do briefing à publicação.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-background border-neutral-800">
            <CardHeader>
              <CardTitle className="text-2xl text-neutral-100">O que o KAI Kreator faz</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-neutral-300 leading-relaxed">
                Agência de conteúdo vive com dezenas de clientes em paralelo, cada um com voz, pauta e
                cadência próprias. KAI Kreator centraliza briefing, roteiro, aprovação, métricas e
                agendamento num painel só.
              </p>
              <p className="text-neutral-300 leading-relaxed">
                O Viral Hunter (monitor de tendências no YouTube) está integrado como módulo interno,
                alimentando o planejamento com ideias já validadas pelo mercado.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <Card className="bg-background border-neutral-800">
            <CardHeader>
              <CardTitle className="text-2xl text-neutral-100">Stack</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {["React 18", "Vite", "Supabase", "YouTube API", "Gemini", "Shadcn"].map((t) => (
                  <span
                    key={t}
                    className="text-sm bg-neutral-800 px-3 py-2 rounded-lg border border-neutral-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 px-6 py-3 rounded-lg transition-colors duration-200 border border-neutral-700"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar aos Projetos
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
