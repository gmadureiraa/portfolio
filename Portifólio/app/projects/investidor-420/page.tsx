"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Investidor420Page() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 lg:p-8">
      <div className="max-w-4xl w-full">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar para projetos
          </Link>
        </motion.div>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4 leading-tight break-words">
            Investidor 4.20
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Copywriter estratégico para Lucas Amendola
          </p>
        </motion.div>

        {/* Project Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-background border-border">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">Visão Geral</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground/80 leading-relaxed">
                Trabalhei como copywriter estratégico para Lucas Amendola (Investidor 4.20), 
                criando conteúdo persuasivo e estratégias de marketing para o mercado de investimentos.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Desenvolvi campanhas de conversão, emails persuasivos e estratégias de conteúdo 
                que resultaram em aumento significativo de engajamento e conversões.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <Card className="bg-background border-border">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">Serviços Desenvolvidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">Copywriting</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Emails de conversão</li>
                    <li>• Posts para redes sociais</li>
                    <li>• Landing pages</li>
                    <li>• Anúncios persuasivos</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">Estratégia de Marketing</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Campanhas de lançamento</li>
                    <li>• Sequências de emails</li>
                    <li>• Funil de conversão</li>
                    <li>• Otimização de conversão</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <Card className="bg-background border-border">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">Tecnologias</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {["Copywriting", "Marketing Digital", "Investment", "Content Strategy", "Social Media", "Email Marketing", "Conversion Optimization"].map((tech) => (
                  <span
                    key={tech}
                    className="text-sm bg-muted px-3 py-2 rounded-lg border border-border"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Back to Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 bg-muted hover:bg-muted/80 text-foreground/80 px-6 py-3 rounded-lg transition-colors duration-200 border border-border"
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