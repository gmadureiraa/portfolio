import React from "react";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre — Gabriel Madureira | Fundador da Kaleidos",
  description:
    "Fundador da Kaleidos, agência de marketing digital para cripto e fintech. 15+ produtos digitais.",
};

function SkillBar({ skill, level }: { skill: string; level: number }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="font-medium text-neutral-200">{skill}</span>
        <span className="text-sm text-neutral-400">{level}%</span>
      </div>
      <div className="w-full bg-neutral-800 rounded-full h-2">
        <div
          className="bg-neutral-600 h-2 rounded-full transition-all duration-1000"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}

export default function SobreMim() {
  const skills = [
    { skill: "Estratégia Cripto/Web3", level: 95 },
    { skill: "Copywriting & Conteúdo", level: 95 },
    { skill: "Desenvolvimento (React/Next.js)", level: 90 },
    { skill: "SEO & Growth", level: 88 },
    { skill: "Automação & IA", level: 85 },
    { skill: "Design & UI/UX", level: 80 },
  ];

  const experiences = [
    {
      company: "Kaleidos Digital",
      role: "Fundador",
      period: "Set 2023 - Presente",
      duration: "2+ anos",
      description: "Agência de marketing digital para cripto e fintech. Time distribuído com automações de IA no centro da operação.",
      type: "Tempo integral"
    },
    {
      company: "Jornal Cripto",
      role: "Fundador",
      period: "Out 2022 - Presente",
      duration: "3+ anos",
      description: "Portal de análise cripto com 10k visitas/mês. Newsletter 2x/semana e webapp com insights em tempo real.",
      type: "Remota"
    },
    {
      company: "Mercado Bitcoin",
      role: "Copywriter",
      period: "Jul 2023 - Jan 2025",
      duration: "1 ano 7 meses",
      description: "Copy e conteúdo estratégico para o maior exchange de criptomoedas do Brasil.",
      type: "Tempo integral"
    },
    {
      company: "Crypto.com",
      role: "Copywriter Social Media",
      period: "2023 - 2024",
      duration: "1 ano",
      description: "Conteúdo para redes sociais da Crypto.com no mercado brasileiro. Estratégia, copy e calendário editorial.",
      type: "Freelance"
    },
    {
      company: "Defiverso / Investidor 4.20",
      role: "Copywriter Estratégico",
      period: "2023 - 2024",
      duration: "1 ano",
      description: "Estratégia de conteúdo e copy para Lucas Amendola no mercado de investimentos e DeFi.",
      type: "Freelance"
    },
    {
      company: "CriptoFacil",
      role: "Redator",
      period: "Out 2022 - Jul 2023",
      duration: "10 meses",
      description: "Onde comecei a escrever sobre cripto. Artigos, análises e conteúdo educacional.",
      type: "Freelance"
    },
  ];

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 lg:p-8">
      <div className="max-w-6xl w-full space-y-8">
        {/* Hero Section */}
        <div className="bg-background rounded-xl shadow-lg p-8 border border-neutral-800">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <span className="block text-sm font-light text-neutral-100/50 mb-2">sobre mim</span>
              <h1 className="text-3xl font-bold text-neutral-100 mb-4">
                Gabriel <span className="text-neutral-300">Madureira</span>
              </h1>

              <p className="text-base font-light text-neutral-300 leading-relaxed mb-6">
                Fundador da Kaleidos, agência de marketing digital para cripto e fintech. Construo produtos digitais e estratégias que geram resultado mensurável — 15+ produtos ao vivo.
              </p>
              
              <div className="flex gap-3 mb-6">
                <a href="https://www.instagram.com/ogabrielmadureira/" target="_blank" rel="noopener noreferrer">
                  <button className="bg-neutral-800 hover:bg-neutral-700 rounded-lg p-3 transition-all duration-200 hover:scale-105 border border-neutral-700">
                    <svg className="w-5 h-5 text-neutral-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </button>
                </a>
                <a href="https://x.com/madureira0x" target="_blank" rel="noopener noreferrer">
                  <button className="bg-neutral-800 hover:bg-neutral-700 rounded-lg p-3 transition-all duration-200 hover:scale-105 border border-neutral-700">
                    <svg className="w-5 h-5 text-neutral-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </button>
                </a>
                <a href="https://www.linkedin.com/in/gabriel-madureira/" target="_blank" rel="noopener noreferrer">
                  <button className="bg-neutral-800 hover:bg-neutral-700 rounded-lg p-3 transition-all duration-200 hover:scale-105 border border-neutral-700">
                    <svg className="w-5 h-5 text-neutral-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </button>
                </a>
              </div>
            </div>
            
            <div className="relative w-48 h-48 md:w-64 md:h-64">
              <Image
                src="https://avatars.githubusercontent.com/u/129111669?v=4"
                alt="Foto de Gabriel Madureira"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Skills and Technologies */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Skills */}
          <div className="bg-background rounded-xl shadow-lg p-6 border border-neutral-800">
            <h2 className="text-xl font-bold mb-6 text-neutral-100">O que eu faço (de verdade)</h2>
            {skills.map((s) => (
              <SkillBar key={s.skill} skill={s.skill} level={s.level} />
            ))}
          </div>

          {/* Technologies */}
          <div className="bg-background rounded-xl shadow-lg p-6 border border-neutral-800">
            <h2 className="text-xl font-bold mb-6 text-neutral-100">Stack</h2>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <span className="bg-neutral-800 px-3 py-2 rounded-lg text-center border border-neutral-700">TypeScript</span>
              <span className="bg-neutral-800 px-3 py-2 rounded-lg text-center border border-neutral-700">React / Next.js</span>
              <span className="bg-neutral-800 px-3 py-2 rounded-lg text-center border border-neutral-700">Tailwind CSS</span>
              <span className="bg-neutral-800 px-3 py-2 rounded-lg text-center border border-neutral-700">Supabase</span>
              <span className="bg-neutral-800 px-3 py-2 rounded-lg text-center border border-neutral-700">Python</span>
              <span className="bg-neutral-800 px-3 py-2 rounded-lg text-center border border-neutral-700">n8n / Automações</span>
              <span className="bg-neutral-800 px-3 py-2 rounded-lg text-center border border-neutral-700">SEO & Analytics</span>
              <span className="bg-neutral-800 px-3 py-2 rounded-lg text-center border border-neutral-700">Copywriting</span>
              <span className="bg-neutral-800 px-3 py-2 rounded-lg text-center border border-neutral-700">DeFi / Web3</span>
              <span className="bg-neutral-800 px-3 py-2 rounded-lg text-center border border-neutral-700">IA (Claude, GPT)</span>
              <span className="bg-neutral-800 px-3 py-2 rounded-lg text-center border border-neutral-700">Figma</span>
              <span className="bg-neutral-800 px-3 py-2 rounded-lg text-center border border-neutral-700">Vercel</span>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="bg-background rounded-xl shadow-lg p-6 border border-neutral-800">
          <h2 className="text-xl font-bold mb-6 text-neutral-100">Experiência Profissional</h2>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div key={index} className="border-l-2 border-neutral-600 pl-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="font-semibold text-neutral-200">{exp.role}</h3>
                  <span className="text-xs text-neutral-500 bg-neutral-800 px-2 py-1 rounded">
                    {exp.type}
                  </span>
                </div>
                <h4 className="font-medium text-neutral-300 mb-1">{exp.company}</h4>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                  <span className="text-sm text-neutral-400">{exp.period}</span>
                  <span className="text-xs text-neutral-500">•</span>
                  <span className="text-sm text-neutral-400">{exp.duration}</span>
                </div>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Let's get to work! Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Details */}
          <div className="bg-background rounded-xl shadow-lg p-6 border border-neutral-800">
            <h2 className="text-2xl font-bold mb-6 text-neutral-100">Vamos trabalhar juntos?</h2>
            
            {/* Contact Details */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 text-neutral-200">Detalhes de Contato</h3>
              <a 
                href="mailto:contato@gabrielmadureira.com"
                className="inline-flex items-center gap-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 px-4 py-3 rounded-lg transition-colors duration-200 border border-neutral-700"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Enviar e-mail
              </a>
            </div>

            {/* Socials */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-neutral-200">Redes Sociais</h3>
              <div className="grid grid-cols-2 gap-3">
                <a 
                  href="https://linkedin.com/in/gabrielmadureira"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 px-3 py-2 rounded-lg transition-colors duration-200 border border-neutral-700"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  in LinkedIn
                </a>
                
                <a 
                  href="https://github.com/gmadureiraa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 px-3 py-2 rounded-lg transition-colors duration-200 border border-neutral-700"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Github
                </a>
                
                <a 
                  href="https://medium.com/@gabrielmadureira"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 px-3 py-2 rounded-lg transition-colors duration-200 border border-neutral-700"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                  </svg>
                  Medium
                </a>
                
                <a 
                  href="https://discord.gg/gabrielmadureira"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 px-3 py-2 rounded-lg transition-colors duration-200 border border-neutral-700"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.019 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                  </svg>
                  Discord
                </a>
              </div>
            </div>
          </div>

          {/* Minha História Section */}
          <div className="bg-background rounded-xl shadow-lg p-6 border border-neutral-800">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-2xl font-bold text-neutral-100">Minha história (versão curta)</h2>
            </div>

            <div className="space-y-4 text-sm text-neutral-300 leading-relaxed">
              <p>
                Comecei escrevendo sobre cripto em 2022 — primeiro no CriptoFacil, depois no Jornal Cripto (10k visitas/mês). Em 2023, marcas como Crypto.com e Mercado Bitcoin começaram a pedir copy. Em vez de ser freelancer para sempre, fundei a Kaleidos.
              </p>
              <p>
                Hoje a Kaleidos atende empresas no mercado cripto e fintech. Mas o que me diferencia não é só o marketing — eu também construo os produtos. São 15+ apps, dashboards e ferramentas que saem do Figma para produção em semanas, não meses.
              </p>
              <p>
                Minha stack: TypeScript, React, Next.js, Supabase, Python. Meu método: entender o negócio, construir rápido, medir tudo, iterar.
              </p>
            </div>

            <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-700 mt-4">
              <h4 className="text-sm font-semibold text-neutral-200 mb-2">O que me diferencia:</h4>
              <ul className="text-sm text-neutral-400 space-y-1">
                <li>Entendo cripto por dentro — não sou marketeiro que googla o que é blockchain</li>
                <li>Programo, escrevo copy E penso em estratégia. Tudo junto</li>
                <li>15+ projetos com demo ao vivo — não é só slide bonito</li>
                <li>Construo rápido: do zero ao deploy em semanas</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact - Usando o mesmo estilo da página inicial */}
        <div className="bg-background rounded-xl shadow-lg p-8 border border-neutral-800">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-semibold text-neutral-300 mb-4">
              Vamos conversar.
            </h2>
            <p className="text-neutral-400 mb-6 max-w-md mx-auto">
              Precisa de alguém que entende cripto, programa e pensa em marketing? Vamos conversar.
            </p>
            
            <div className="flex justify-center mt-6">
              <a
                href="https://wa.me/5512997796835?text=Ol%C3%A1%20Gabriel,%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre..."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500/10 text-green-600 dark:text-green-500 border border-green-500/20 px-8 py-4 rounded-full font-medium hover:bg-green-500/20 hover:scale-105 transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                Chamar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 