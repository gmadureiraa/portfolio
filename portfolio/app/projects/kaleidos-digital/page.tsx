"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function KaleidosDigitalPage() {
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
            Kaleidos Digital
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Agência digital especializada em marketing para criptomoedas e fintech
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
              <CardTitle className="text-2xl text-foreground">Visão Geral do Projeto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground/80 leading-relaxed">
                A Kaleidos Digital é uma agência digital especializada em marketing para criptomoedas e fintech, 
                onde atuo como cofundador e responsável por estratégias de crescimento e automação.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                A agência oferece soluções completas de marketing digital, desde copywriting e SEO até 
                automação de processos e growth hacking para empresas do setor cripto e fintech.
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
              <CardTitle className="text-2xl text-foreground">Serviços Oferecidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">Marketing Digital</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Estratégias de crescimento para cripto</li>
                    <li>• SEO especializado em fintech</li>
                    <li>• Gestão de redes sociais</li>
                    <li>• Campanhas de performance</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">Copywriting</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Conteúdo persuasivo para cripto</li>
                    <li>• Landing pages otimizadas</li>
                    <li>• Emails de conversão</li>
                    <li>• Posts para redes sociais</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">Automação</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Workflows de marketing</li>
                    <li>• Integração de APIs</li>
                    <li>• Automação de vendas</li>
                    <li>• Análise de dados</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">Growth Hacking</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Experimentos de crescimento</li>
                    <li>• Otimização de conversão</li>
                    <li>• Análise de métricas</li>
                    <li>• Estratégias de aquisição</li>
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
              <CardTitle className="text-2xl text-foreground">Tecnologias e Ferramentas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {["Marketing Digital", "Automação", "Copywriting", "SEO", "Analytics", "Growth Hacking", "N8N", "Zapier", "Google Analytics", "Facebook Ads", "Google Ads", "LinkedIn Ads", "Notion", "Canva", "Figma"].map((tech) => (
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

        {/* Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-12"
        >
          <Card className="bg-background border-border">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">Metodologia de Trabalho</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-muted-foreground/20 rounded-full flex items-center justify-center text-sm font-bold text-foreground/80">1</div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Análise e Estratégia</h3>
                    <p className="text-sm text-muted-foreground">
                      Análise profunda do mercado, concorrência e público-alvo para desenvolver estratégias 
                      personalizadas de marketing digital.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-muted-foreground/20 rounded-full flex items-center justify-center text-sm font-bold text-foreground/80">2</div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Implementação</h3>
                    <p className="text-sm text-muted-foreground">
                      Execução das estratégias com foco em automação, otimização e crescimento sustentável 
                      para maximizar ROI.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-muted-foreground/20 rounded-full flex items-center justify-center text-sm font-bold text-foreground/80">3</div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Otimização Contínua</h3>
                    <p className="text-sm text-muted-foreground">
                      Monitoramento constante de métricas, testes A/B e ajustes estratégicos para 
                      melhorar continuamente os resultados.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mb-12"
        >
          <Card className="bg-background border-border">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">Resultados para Clientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground mb-2">300%+</div>
                  <div className="text-sm text-muted-foreground">Aumento Médio em Conversões</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Projetos Entregues</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground mb-2">95%</div>
                  <div className="text-sm text-muted-foreground">Taxa de Satisfação</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mb-12"
        >
          <Card className="bg-background border-border">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">Entre em Contato</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">
                Interessado em trabalhar com a Kaleidos Digital?
              </p>
              <Link 
                href="https://kaleidos.com.br" 
                target="_blank"
                className="inline-flex items-center gap-2 bg-muted hover:bg-muted/80 text-foreground/80 px-6 py-3 rounded-lg transition-colors duration-200 border border-border"
              >
                Visitar Site
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Back to Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
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