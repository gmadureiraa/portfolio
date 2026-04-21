"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function KaleidosPayPage() {
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
            src="/images/projects/kaleidos-pay.svg"
            alt="Capa do Kaleidos Pay"
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
          <span className="inline-block mb-4 text-xs font-semibold px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-300">
            Soft launch
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-100 mb-4">Kaleidos Pay</h1>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Gateway de pagamentos para agências com PIX e cripto. Cobrança recorrente, split de
            comissão e conciliação num painel só.
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
              <CardTitle className="text-2xl text-neutral-100">O problema</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-neutral-300 leading-relaxed">
                Agências perdem tempo cobrando manualmente, lidando com inadimplência em planilha e
                emitindo notas na mão. Para clientes internacionais, ainda falta um caminho nativo
                em cripto que não exija intermediário.
              </p>
              <p className="text-neutral-300 leading-relaxed">
                Kaleidos Pay unifica PIX, cartão e stablecoins num link de cobrança, com
                recorrência, split automático pro time e API pra integrar em qualquer ERP ou
                proposta.
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
                {["Next.js", "Supabase", "Stripe", "PIX API", "USDC", "TypeScript"].map((t) => (
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
