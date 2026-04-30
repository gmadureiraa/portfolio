"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { AnimatedBeamMultipleOutputs } from "@/components/animated-beam-multiple-outputs";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import BlurIn from "@/components/magicui/blur-in";
import { FadeIn } from "@/components/magicui/fade-in";
const Globe = dynamic(() => import("@/components/magicui/globe"), { ssr: false });
import Hero from "@/components/hero";
import Marquee from "@/components/magicui/marquee";
import ThemeToggle from "@/components/theme-toggle";
import Orbit from "@/components/orbit";
import RetroGrid from "@/components/magicui/retro-grid";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import GitHubStars from "@/components/github-stars";
import ProjectPosts from "@/components/project-posts";
import Link from "next/link";

const features = [
  {
    Icon: "",
    name: "",
    description: "",
    href: "",
    cta: "",
    className: "col-span-3 md:col-span-2",
    background: (
      <>
        <div
          id="hero"
          className="absolute right-0 top-0 h-full w-full border-none transition-all duration-300 ease-out"
        >
          <Hero />
        </div>

        <div className="absolute right-0 top-0 z-50">
          <FadeIn direction="down">
            <ThemeToggle />
          </FadeIn>
        </div>
      </>
    ),
  },
  {
    Icon: "",
    name: "Gabriel Madureira",
    description:
      "Fundador da Kaleidos. Construo produtos digitais e estratégias de marketing para empresas cripto.",
    className: "col-span-3 md:col-span-1",
    href: "/eu",
    cta: "Mentoria, consultoria & newsletter →",
    background: (
      <div>
        <div className="absolute right-0 top-0 h-3/4 w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_5%,#000_50%)] group-hover:scale-105">
          <BlurIn duration={0.5} className="h-full">
            <Image
              className="object-cover object-center h-full w-full"
              src={
                process.env.AVATAR_URL ||
                "https://avatars.githubusercontent.com/u/129111669?v=4"
              }
              alt="Foto de Gabriel Madureira"
              width={200}
              height={200}
              priority // Load image immediately
              quality={75} // Adjust quality for optimization
              placeholder="blur" // Placeholder to improve perceived performance
              blurDataURL="data:image/svg+xml;base64,..." // Use a small base64-encoded placeholder image
            />
          </BlurIn>
        </div>

        <FadeIn
          direction="right"
          framerProps={{
            show: { transition: { delay: 1.5 } },
          }}
        >
          <div className="absolute top-2 right-2 bg-background rounded-lg px-4 py-2 text-xs text-neutral-500 dark:text-neutral-300 max-w-3/4 w-fit">
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full animate-pulse ${
                  process.env.NEXT_PUBLIC_AVAILABLE_FOR_FREELANCE == "true"
                    ? "bg-emerald-400"
                    : "bg-yellow-400"
                }`}
              ></div>
              <div className="">
                {process.env.NEXT_PUBLIC_AVAILABLE_FOR_FREELANCE == "true"
                  ? "disponível"
                  : "em projeto"}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    ),
  },

  {
    Icon: "",
    name: "Projetos & Ideias",
    description: "",
    href: "/projects",
    cta: "Ver todos os projetos",
    className: "col-span-3 md:col-span-1",
    background: (() => {
      const buildingItems = [
        { name: "DeFi Radar", body: "Dashboard cripto com DeFiLlama e on-chain tracker.", href: "https://radar-blond-zeta.vercel.app/", type: "Projeto" },
        { name: "Kaleidos Pay", body: "Gateway de pagamentos para agências com PIX e Cripto.", href: "https://pay.kaleidos.com.br", type: "Projeto" },
        { name: "Folio", body: "Portfolio tracker multi-chain.", href: "https://folio-landing.vercel.app/", type: "Projeto" },
        { name: "Rabito", body: "App de hábitos com streak system e gamificação.", href: "https://rabito-ashen.vercel.app/", type: "Projeto" },
      ];
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5 }}
        >
          <Marquee
            className="absolute h-2/3 top-10 [--duration:40s] [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] w-full"
            pauseOnHover
          >
            {buildingItems.map((item, idx) => (
              <a
                href={item.href}
                key={idx}
                className={cn(
                  "relative w-44 cursor-pointer overflow-hidden rounded-xl border p-4 hover:-translate-y-1",
                  "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                  "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
                  "transform-gpu transition-all duration-300 ease-out hover:blur-none"
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded-full flex items-center gap-1 border font-medium",
                    item.type === "Artigo"
                      ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                      : "bg-green-500/10 text-green-400 border-green-500/20"
                  )}>
                    {item.type === "Artigo" ? (
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    ) : (
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                    )}
                    {item.type}
                  </span>
                </div>
                <figcaption className="text-sm font-semibold dark:text-white leading-tight">
                  {item.name}
                </figcaption>
                <blockquote className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2">{item.body}</blockquote>
              </a>
            ))}
          </Marquee>
        </motion.div>
      );
    })(),
  },
  {
    Icon: "",
    name: "Marketing + Código",
    description: "Estratégia, copy, SEO e desenvolvimento juntos no mesmo lugar.",
    href: "/projects?area=Marketing",
    cta: "Ver projetos",
    className: "col-span-3 md:col-span-2",
    background: (
      <div className="absolute inset-0 origin-top transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_15%,#000_70%)] group-hover:scale-105">
        <FadeIn direction="up">
          <TechStackMarquee />
        </FadeIn>
      </div>
    ),
  },
  {
    Icon: "",
    name: "Automação & IA",
    description: "Automações que eliminam trabalho repetitivo e análises que mostram o que realmente funciona.",
    href: "/projects?area=IA e Automações",
    cta: "Ver projetos",
    className: "col-span-3 md:col-span-2",
    background: (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <AnimatedBeamMultipleOutputs className="absolute right-0 top-4 h-[300px] w-[600px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] md:[mask-image:linear-gradient(to_top,transparent_0%,#000_100%)] group-hover:scale-105" />
      </motion.div>
    ),
  },
  {
    Icon: "",
    name: "Kaleidos",
    description: "Marketing digital para cripto e fintech.",
    className: "col-span-3 md:col-span-1",
    href: "https://kaleidos.com.br",
    cta: "Conheça a Kaleidos",
    background: (
      <div className="absolute w-full h-full right-0 top-0 origin-top rounded-md transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_25%,#000_70%)] group-hover:scale-105">
        <Orbit />
        {/* Logo da Kaleidos no centro */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20">
            <Image 
              src="/Logos-11.svg" 
              alt="Kaleidos logo" 
              width={32} 
              height={32} 
              className="h-8 w-8"
            />
          </div>
        </div>
      </div>
    ),
  },



  {
    Icon: "",
    name: "Projetos ao Vivo",
    description:
      "15+ produtos com demo funcional. Dashboards DeFi, gateways de pagamento, ferramentas de analytics — tudo construído e rodando.",
    className: "col-span-3 md:col-span-3",
    href: "/projects",
    cta: "Ver tudo",
    background: (
      <div className="absolute h-full w-full overflow-hidden rounded-md transition-all duration-300 ease-out group-hover:scale-105">
        <div className="absolute inset-x-0 bottom-[-150px] sm:bottom-[-200px] h-[400px] sm:h-[600px] w-full [mask-image:linear-gradient(to_bottom,transparent_0%,#000_100%)] opacity-60">
           <Globe />
        </div>
      </div>
    ),
  },

  {
    Icon: "",
    name: "",
    description: "",
    className: "col-span-3 md:col-span-3",
    href: "",
    cta: "",
    background: (
      <div
        id="contact-form"
        className="absolute h-full w-full left-0 top-0 origin-top rounded-md transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_0%,#000_0%)]"
      >
        <div className="absolute inset-0 z-50 flex justify-center items-center gap-5 p-5">
          <div className="max-w-sm w-full flex flex-col gap-2 overflow-y-auto">
            <div className="text-5xl md:text-6xl font-semibold text-neutral-700 dark:text-neutral-300 w-full flex justify-start">
              <BlurIn duration={0.5} className="h-full">
                Vamos conversar.
              </BlurIn>
            </div>
            <div className="w-full flex flex-col items-start gap-4 text-neutral-500 dark:text-neutral-400 text-sm mt-4">
              <p>Tem um projeto em mente ou quer escalar seus resultados?</p>
              
              <a
                href="https://wa.me/5512997796835?text=Ol%C3%A1%20Gabriel,%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre..."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500/10 text-green-600 dark:text-green-500 border border-green-500/20 px-6 py-3 rounded-full font-medium hover:bg-green-500/20 hover:scale-105 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                Chamar no WhatsApp
              </a>
            </div>
            
            {/* Redes Sociais */}
            <div className="mt-4 pt-4 border-t border-neutral-700">
              <div className="text-xs text-neutral-400 mb-2 text-center">
                Ou conecte-se diretamente:
              </div>
              <div className="flex justify-center gap-4">
                <a
                  href="https://instagram.com/madureira0x"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-neutral-200 transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://x.com/madureira0x"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-neutral-200 transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/gabriel-madureira/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-neutral-200 transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <RetroGrid />
      </div>
    ),
  },
];

type Tech = { slug: string; label: string };

const TECH_ROW_TOP: Tech[] = [
  { slug: "bitcoin", label: "Bitcoin" },
  { slug: "ethereum", label: "Ethereum" },
  { slug: "solana", label: "Solana" },
  { slug: "openai", label: "OpenAI" },
  { slug: "googlegemini", label: "Gemini" },
  { slug: "anthropic", label: "Claude" },
  { slug: "n8n", label: "n8n" },
  { slug: "supabase", label: "Supabase" },
  { slug: "vercel", label: "Vercel" },
  { slug: "stripe", label: "Stripe" },
];

const TECH_ROW_BOTTOM: Tech[] = [
  { slug: "nextdotjs", label: "Next.js" },
  { slug: "react", label: "React" },
  { slug: "typescript", label: "TypeScript" },
  { slug: "tailwindcss", label: "Tailwind" },
  { slug: "python", label: "Python" },
  { slug: "notion", label: "Notion" },
  { slug: "substack", label: "Substack" },
  { slug: "googleanalytics", label: "GA" },
  { slug: "linkedin", label: "LinkedIn" },
  { slug: "x", label: "X" },
];

function TechBadge({ tech }: { tech: Tech }) {
  return (
    <div className="flex shrink-0 items-center gap-2 rounded-full border border-neutral-700/60 bg-neutral-900/80 px-3 py-2 backdrop-blur-sm">
      <span className="grid h-6 w-6 place-items-center rounded-full bg-white/95">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://cdn.simpleicons.org/${tech.slug}`}
          alt={tech.label}
          width={14}
          height={14}
          loading="lazy"
          className="h-3.5 w-3.5"
        />
      </span>
      <span className="text-xs font-medium text-neutral-300 whitespace-nowrap">
        {tech.label}
      </span>
    </div>
  );
}

function TechStackMarquee() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-3 [mask-image:linear-gradient(to_right,transparent,#000_15%,#000_85%,transparent)]">
      <Marquee className="[--duration:35s] [--gap:0.75rem]" pauseOnHover repeat={3}>
        {TECH_ROW_TOP.map((tech) => (
          <TechBadge key={tech.slug} tech={tech} />
        ))}
      </Marquee>
      <Marquee
        className="[--duration:40s] [--gap:0.75rem]"
        pauseOnHover
        reverse
        repeat={3}
      >
        {TECH_ROW_BOTTOM.map((tech) => (
          <TechBadge key={tech.slug} tech={tech} />
        ))}
      </Marquee>
    </div>
  );
}

export function Bento() {
  return (
    <>
      <BentoGrid>
        {features.map((feature, idx) => (
          <BentoCard key={idx} {...feature} />
        ))}
      </BentoGrid>
    </>
  );
}
