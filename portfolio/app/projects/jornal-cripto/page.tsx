"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function JornalCriptoPage() {
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
            Jornal Cripto
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Plataforma líder de notícias e análise do mercado cripto no Brasil
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
                O Jornal Cripto é uma plataforma completa de notícias e análise do mercado cripto, 
                fundada e desenvolvida como CEO. A plataforma oferece conteúdo especializado, 
                análises técnicas e insights para investidores do mercado brasileiro.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Como fundador e CEO, fui responsável por toda a estratégia de conteúdo, 
                desenvolvimento da plataforma, gestão de equipe e crescimento da marca no mercado cripto.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Project Structure */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <Card className="bg-background border-border">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">Estrutura do Projeto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">jornalcripto.com</h3>
                  <p className="text-sm text-muted-foreground">
                    Site principal com notícias, análises e conteúdo editorial sobre o mercado cripto.
                  </p>
                  <Link 
                    href="https://jornalcripto.com" 
                    target="_blank"
                    className="inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-foreground transition-colors duration-200"
                  >
                    Visitar site
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">radar.jornalcripto.com</h3>
                  <p className="text-sm text-muted-foreground">
                    Ferramenta de análise e rastreamento de movimentos do mercado cripto em tempo real.
                  </p>
                  <Link 
                    href="https://radar.jornalcripto.com" 
                    target="_blank"
                    className="inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-foreground transition-colors duration-200"
                  >
                    Visitar radar
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">news.jornalcripto.com</h3>
                  <p className="text-sm text-muted-foreground">
                    Portal de notícias especializadas e breaking news do mercado cripto.
                  </p>
                  <Link 
                    href="https://news.jornalcripto.com" 
                    target="_blank"
                    className="inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-foreground transition-colors duration-200"
                  >
                    Ver notícias
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
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
              <CardTitle className="text-2xl text-foreground">Tecnologias Utilizadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {["React", "Next.js", "TypeScript", "Tailwind CSS", "SEO", "Marketing Digital", "Content Strategy", "Analytics", "Social Media"].map((tech) => (
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

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-12"
        >
          <Card className="bg-background border-border">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">Principais Funcionalidades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">Conteúdo Editorial</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Notícias em tempo real do mercado cripto</li>
                    <li>• Análises técnicas especializadas</li>
                    <li>• Reportagens investigativas</li>
                    <li>• Entrevistas com especialistas</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">Ferramentas de Análise</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Radar de movimentos do mercado</li>
                    <li>• Indicadores técnicos em tempo real</li>
                    <li>• Alertas de preço personalizados</li>
                    <li>• Dashboard de análise avançada</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">Estratégia de Marketing</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• SEO otimizado para cripto</li>
                    <li>• Presença em redes sociais</li>
                    <li>• Newsletter especializada</li>
                    <li>• Parcerias estratégicas</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">Gestão de Conteúdo</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• CMS personalizado</li>
                    <li>• Workflow editorial</li>
                    <li>• Análise de performance</li>
                    <li>• Automação de publicação</li>
                  </ul>
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
              <CardTitle className="text-2xl text-foreground">Resultados Alcançados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground mb-2">100K+</div>
                  <div className="text-sm text-muted-foreground">Leitores Mensais</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground mb-2">50K+</div>
                  <div className="text-sm text-muted-foreground">Seguidores nas Redes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground mb-2">Top 3</div>
                  <div className="text-sm text-muted-foreground">Sites de Cripto no Brasil</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Back to Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
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