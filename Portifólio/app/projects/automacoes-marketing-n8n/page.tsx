"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function AutomacoesMarketingN8nPage() {
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
            Automações de Marketing e N8N
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Sistema de automação para marketing de criptomoedas usando N8N
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
                Desenvolvi um sistema completo de automação para marketing de criptomoedas utilizando 
                a plataforma N8N. O sistema integra múltiplas ferramentas e APIs para otimizar 
                processos de marketing digital.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                A solução automatiza desde a coleta de dados de mercado até a publicação de conteúdo 
                e análise de performance, aumentando significativamente a eficiência operacional.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Workflows */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <Card className="bg-background border-border">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">Workflows Automatizados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">Coleta de Dados</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Preços de criptomoedas em tempo real</li>
                    <li>• Notícias do mercado cripto</li>
                    <li>• Análises de redes sociais</li>
                    <li>• Métricas de concorrentes</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">Automação de Conteúdo</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Publicação automática em redes sociais</li>
                    <li>• Geração de relatórios</li>
                    <li>• Envio de newsletters</li>
                    <li>• Alertas personalizados</li>
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
                {["N8N", "Automation", "Marketing Digital", "API Integration", "Social Media", "Analytics", "Webhooks", "JavaScript", "Node.js", "REST APIs"].map((tech) => (
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

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-12"
        >
          <Card className="bg-background border-border">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">Benefícios Alcançados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground mb-2">80%</div>
                  <div className="text-sm text-muted-foreground">Redução de Tempo Manual</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground mb-2">24/7</div>
                  <div className="text-sm text-muted-foreground">Operação Automatizada</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Precisão nos Dados</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Back to Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
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