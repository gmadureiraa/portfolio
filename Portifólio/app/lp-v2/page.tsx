import type { Metadata } from "next";

import HalftonePhoto from "@/components/eu/halftone-photo";
import LeadForm from "@/components/lp/lead-form";
import { profile, socialLinks } from "@/lib/constants";

import FaqAccordion from "./_components/faq-accordion";
import Hero from "./_components/hero";
import LogosMarquee from "./_components/logos-marquee";
import Nav from "./_components/nav";
import Offers from "./_components/offers";
import Pillars from "./_components/pillars";
import ProblemGrid from "./_components/problem-grid";
import Process from "./_components/process";
import ProductsGrid from "./_components/products-grid";
import { Reveal, RevealStagger, RevealItem } from "./_components/reveal";
import SectionHeader from "./_components/section-header";
import Testimonials from "./_components/testimonials";

export const metadata: Metadata = {
  title:
    "Consultoria de IA pra agências e founders — Gabriel Madureira (v2)",
  description:
    "Workshops, consultoria 1-1 e sistemas customizados de IA pra integrar Claude/Gemini no teu negócio sem virar fábrica de prompt.",
  keywords: [
    "consultoria de IA",
    "consultoria Claude",
    "consultoria Gemini",
    "automação IA agência",
    "workshop IA",
    "Gabriel Madureira",
    "Kaleidos",
    "agência cripto",
    "IA marketing",
    "sistema customizado IA",
  ],
  alternates: { canonical: "/lp-v2" },
  robots: { index: false, follow: true }, // v2 ainda em revisão
  openGraph: {
    title: "Consultoria de IA — Gabriel Madureira",
    description:
      "Workshops, consultoria 1-1 e sistemas customizados de IA pra integrar Claude/Gemini no teu negócio.",
    url: "https://madureira.xyz/lp-v2",
    type: "website",
    siteName: "Gabriel Madureira",
    locale: "pt_BR",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gabriel Madureira — Consultoria de IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ogmadureira",
    creator: "@ogmadureira",
    title: "Consultoria de IA — Gabriel Madureira",
    description:
      "Workshops, consultoria 1-1 e sistemas customizados de IA pra agências e founders.",
    images: ["/og-image.png"],
  },
};

const WHATSAPP_BASE = `https://wa.me/${profile.whatsapp}`;
const WA_BRIEF = `${WHATSAPP_BASE}?text=${encodeURIComponent(
  "Olá Gabriel, vim da página /lp-v2 e quero conversar sobre consultoria de IA.",
)}`;
const SCHEDULE_URL = process.env.NEXT_PUBLIC_CALENDLY_URL ?? WA_BRIEF;
const HAS_CALENDAR = Boolean(process.env.NEXT_PUBLIC_CALENDLY_URL);
const PRIMARY_CTA_LABEL = HAS_CALENDAR ? "Agendar 30min" : "Falar agora · 30min";
const NAV_CTA_LABEL = HAS_CALENDAR ? "Agendar" : "Falar agora";

const credibility = [
  "Fundador da Kaleidos há 5+ anos — agência focada em cripto, web3 e fintech",
  "8 clientes ativos rodando estratégia de conteúdo + IA na operação",
  "4 produtos shipados em 6 meses (Sequência Viral, Reels Viral, Radar Viral, Kaleidos Pay)",
  "Construo em público no X e LinkedIn (@ogmadureira) — processo aberto, não promessa",
  "Stack rodando em produção: Next.js 16, Claude Code, Gemini 2.5, Supabase, Vercel",
];

const notForList = [
  "Empresa grande com 6 meses de comitê pra aprovar prompt — velocidade é meio do trabalho",
  "Briefing vago do tipo 'quero usar IA' sem problema concreto — não vendo IA, vendo solução",
  "Cliente que quer só 'aquele prompt mágico' — se fosse só prompt, já tinha resolvido",
];

const faq = [
  {
    q: "Tem vagas agora?",
    a: "Pego no máximo 3 contas em consultoria mensal por vez pra manter qualidade. Workshop e sistemas customizados rodam por demanda — pergunta no brief.",
  },
  {
    q: "Como você cobra?",
    a: "Workshop e sistemas customizados são fechados por escopo (50% início, 50% entrega). Consultoria mensal é boleto/PIX recorrente, sem fidelidade — cancela a qualquer mês.",
  },
  {
    q: "Trabalha com qual stack?",
    a: "Claude (Code/API), Gemini, OpenAI, n8n, Make, Cursor, Supabase, Next.js, Python. Stack do cliente é prioridade — não vou empurrar ferramenta nova só porque eu uso.",
  },
  {
    q: "E se a IA mudar daqui 3 meses?",
    a: "Vai mudar. Os sistemas que construo são modulares com camadas trocáveis — provider de IA, prompt, integração e UI separados. Atualizar é trocar peça, não refazer tudo.",
  },
  {
    q: "Funciona com time pequeno?",
    a: "Funciona melhor, na real. O foco da consultoria é destravar 1 a 3 pessoas que já operam. Sistema bom é o que cabe no time que tem, não o que precisa de mais 5 contratações.",
  },
  {
    q: "Faz integração com meu stack atual?",
    a: "Notion, Slack, Airtable, Asana, ClickUp, Supabase, Linear e webhook genérico — cobertura via n8n/Make. Stack mais exótico a gente avalia no brief.",
  },
  {
    q: "Quanto tempo até primeiro resultado?",
    a: "Workshop entrega no mesmo dia (time saindo aplicando). Consultoria mensal mostra ganho mensurável em 2 a 4 semanas. Sistema customizado fica pronto em 4 a 8 semanas.",
  },
  {
    q: "Atende fora do Brasil?",
    a: "Sim, em PT-BR ou EN. Consultoria mensal funciona melhor com gente do mesmo fuso (Américas), mas workshop e sistemas custom não têm restrição.",
  },
  {
    q: "E o custo de tokens? Vai estourar a conta?",
    a: "Mapeamento de custo entra no escopo. Setup padrão usa cache (Anthropic prompt cache corta até 90% do input recorrente), batching e roteamento entre providers — Claude pra raciocínio, Gemini Flash pra volume, OpenAI só onde compensa. A conta de IA típica de um cliente da Kaleidos fica entre US$ 30 e US$ 200/mês.",
  },
  {
    q: "Meus dados ficam expostos pros LLMs?",
    a: "Não, com setup correto. Uso APIs com flag de no-training ativada (Claude API, Gemini Vertex), processamento em região (Brasil/EUA) e separação de dados sensíveis. Configuração de privacidade é parte do brief, não opcional.",
  },
];

export default function LandingPageV2() {
  return (
    <main
      id="top"
      className="relative min-h-screen w-full overflow-x-hidden bg-black text-white"
    >
      <Nav scheduleUrl={SCHEDULE_URL} ctaLabel={NAV_CTA_LABEL} />

      <Hero
        scheduleUrl={SCHEDULE_URL}
        primaryCtaLabel={PRIMARY_CTA_LABEL}
      />

      <LogosMarquee />

      {/* PROBLEMA */}
      <section className="border-b border-emerald-500/15 px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="O Problema"
            title={
              <>
                1.000 prompts circulando.
                <br />
                <span className="text-neutral-500">
                  Tua agência mais lenta do que antes.
                </span>
              </>
            }
            intro="A maioria dos times tá empilhando ferramenta sem desenhar fluxo. IA virou commodity, mas operação não. Esses são os 4 sintomas que aparecem em todo brief."
          />
          <ProblemGrid />
        </div>
      </section>

      {/* VIRADA / 3 PILLARS */}
      <section className="border-b border-emerald-500/15 px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="A Virada"
            title={
              <>
                IA não é prompt. É sistema.
                <br />
                <span className="text-neutral-500">
                  E eu mostro qual é o desenho certo pra cada caso.
                </span>
              </>
            }
            intro="Quem trata IA como prompt fica preso copiando texto de Notion. Quem trata como sistema desenha contexto, integração, versionamento e custo, e destrava o time inteiro."
          />
          <Pillars />
        </div>
      </section>

      {/* OFERTAS */}
      <section
        id="ofertas"
        className="scroll-mt-20 border-b border-emerald-500/15 px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="O Que Eu Entrego"
            title={<>Escolhe o nível de envolvimento.</>}
            intro="Três formatos. Mesma filosofia: IA como sistema, não como atalho. Cada um com escopo claro, deliverable concreto e zero PDF de 80 páginas."
          />
          <Offers />
        </div>
      </section>

      {/* PROCESSO */}
      <section
        id="processo"
        className="scroll-mt-20 border-b border-emerald-500/15 px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Processo"
            title="4 etapas. Mesmo flow pra qualquer formato."
            intro="Tudo curto, documentado e focado em fluxo real, não em entregar pacote bonito que ninguém usa."
          />
          <Process />
        </div>
      </section>

      {/* PROVA / PRODUTOS */}
      <section
        id="prova"
        className="scroll-mt-20 border-b border-emerald-500/15 px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="O Que Eu Já Construí"
            title={
              <>
                4 produtos shipados em 6 meses.
                <br />
                <span className="text-neutral-500">
                  Cada aprendizado vira sistema pros clientes.
                </span>
              </>
            }
            intro="Não falo de IA por teoria. Cada produto está em produção, com criadores reais usando — e cada um deixou um aprendizado que aplico em todo brief novo."
          />
          <ProductsGrid />
        </div>
      </section>

      {/* CASES */}
      <section className="border-b border-emerald-500/15 px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Cases Recentes"
            title={
              <>
                Não é tese. É cliente em produção.
              </>
            }
            intro="Resultados concretos da Kaleidos com IA aplicada. Sem PDF de slide, sem foto de stock, sem promessa que não cabe no time."
          />
          <Testimonials />
        </div>
      </section>

      {/* QUEM SOU EU */}
      <section className="border-b border-emerald-500/15 px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Quem"
            title="Por que comigo."
          />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
            <Reveal className="lg:col-span-2">
              <HalftonePhoto />
            </Reveal>

            <div className="flex flex-col gap-6 lg:col-span-3">
              <Reveal>
                <p className="text-base leading-relaxed text-neutral-300 lg:text-lg">
                  Sou Gabriel. Fundador da Kaleidos, agência de marketing
                  digital com foco em cripto, web3 e fintech. Os últimos 6
                  meses foram inteiros construindo IA aplicada pra resolver
                  problema real, em produção, pagando salário.
                </p>
              </Reveal>

              <RevealStagger
                className="flex flex-col gap-3 border-t border-emerald-500/15 pt-5"
                staggerChildren={0.06}
              >
                {credibility.map((c, i) => (
                  <RevealItem
                    key={i}
                    className="flex items-start gap-3 font-mono text-[11px] leading-relaxed text-neutral-300 lg:text-xs"
                  >
                    <span className="mt-0.5 text-emerald-400" aria-hidden>
                      ▸
                    </span>
                    <span>{c}</span>
                  </RevealItem>
                ))}
              </RevealStagger>

              <Reveal className="border-t border-emerald-500/15 pt-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                  Não trabalho com
                </span>
                <ul className="mt-3 flex flex-col gap-2">
                  {notForList.map((n, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 font-mono text-[11px] leading-relaxed text-neutral-500 lg:text-xs"
                    >
                      <span className="mt-0.5 text-red-400/70" aria-hidden>
                        ×
                      </span>
                      <span>{n}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="scroll-mt-20 border-b border-emerald-500/15 px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Dúvidas Comuns"
            title="FAQ."
            intro="Perguntas que mais aparecem antes do brief. Se a tua não estiver aqui, manda no WhatsApp — respondo direto."
          />
          <FaqAccordion items={faq} />
        </div>
      </section>

      {/* LEAD FORM */}
      <section
        id="brief"
        className="scroll-mt-20 border-b border-emerald-500/15 px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
      >
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <LeadForm />
          </Reveal>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative overflow-hidden border-b border-emerald-500/30 px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        {/* Background glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(16,185,129,0.12)_0%,rgba(0,0,0,0)_60%)]"
        />

        <div className="relative mx-auto max-w-5xl">
          <Reveal>
            <div className="flex flex-col items-center gap-8 text-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400">
                Próximo passo · 3 vagas em consultoria mensal
              </span>
              <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold uppercase leading-[1.02] tracking-tight text-white">
                <span className="block">30 minutos</span>
                <span className="my-1 inline-block bg-emerald-500 px-3 text-black">
                  comigo.
                </span>
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-neutral-300 lg:text-lg">
                Brief sem compromisso. Saio do call ou com proposta clara ou
                indicando outro consultor melhor pro caso. Sem rodeio, sem PDF
                de 80 páginas.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={SCHEDULE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden bg-emerald-500 px-8 py-4 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-black transition-all hover:bg-emerald-400 hover:shadow-[0_0_32px_rgba(16,185,129,0.45)]"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <span className="relative">{PRIMARY_CTA_LABEL}</span>
                  <span aria-hidden className="relative">↗</span>
                </a>
                <a
                  href="#brief"
                  className="inline-flex items-center justify-center gap-2 border border-emerald-500/40 px-8 py-4 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400 transition-colors hover:border-emerald-500/70 hover:bg-emerald-500/5"
                >
                  Mandar brief antes
                </a>
              </div>
            </div>
          </Reveal>

          {/* Garantias */}
          <RevealStagger
            className="mt-16 grid grid-cols-1 gap-3 sm:grid-cols-3"
            staggerChildren={0.1}
            delayChildren={0.1}
          >
            {[
              {
                n: "01",
                title: "Resposta em 24h",
                body: "Eu mesmo respondo. Sem SDR, sem qualificador, sem CRM no meio.",
              },
              {
                n: "02",
                title: "Brief é gratuito",
                body: "30min sem compromisso. Cobro só quando o escopo fecha e você assina.",
              },
              {
                n: "03",
                title: "Indicação se não encaixar",
                body: "Não sou pra todo caso. Se não for fit, indico quem é. Tenho rede.",
              },
            ].map((g) => (
              <RevealItem
                key={g.n}
                className="flex flex-col gap-2 border border-emerald-500/20 bg-black/40 p-5 backdrop-blur lg:p-6"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400">
                  {g.n}
                </span>
                <h3 className="text-sm font-semibold uppercase tracking-tight text-white lg:text-base">
                  {g.title}
                </h3>
                <p className="font-mono text-[10px] leading-relaxed text-neutral-400 lg:text-[11px]">
                  {g.body}
                </p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-4 py-10 pb-24 sm:px-6 sm:pb-10 lg:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <span className="grid h-6 w-6 place-items-center bg-emerald-500 font-mono text-xs font-bold text-black">
                M
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-300">
                Gabriel Madureira
              </span>
            </div>
            <p className="font-mono text-[10px] leading-relaxed text-neutral-500">
              Fundador da Kaleidos. Consultoria de IA pra agências, founders e
              times pequenos. São Paulo, BR.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-500">
              Navegação
            </span>
            <div className="flex flex-col gap-1.5">
              {[
                { label: "Ofertas", href: "#ofertas" },
                { label: "Processo", href: "#processo" },
                { label: "Produtos", href: "#prova" },
                { label: "FAQ", href: "#faq" },
                { label: "Projetos", href: "/projetos" },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="font-mono text-[11px] text-neutral-300 transition-colors hover:text-emerald-400"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-500">
              Social
            </span>
            <div className="flex flex-col gap-1.5">
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] text-neutral-300 transition-colors hover:text-emerald-400"
              >
                LinkedIn ↗
              </a>
              <a
                href={socialLinks.x}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] text-neutral-300 transition-colors hover:text-emerald-400"
              >
                Twitter / X ↗
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] text-neutral-300 transition-colors hover:text-emerald-400"
              >
                Instagram ↗
              </a>
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] text-neutral-300 transition-colors hover:text-emerald-400"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-7xl items-center justify-between border-t border-emerald-500/15 pt-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-500">
            © 2026 · {profile.twitterHandle}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400/60">
            v2 · em revisão
          </span>
        </div>
      </footer>

      {/* STICKY MOBILE CTA */}
      <div
        aria-label="Ações rápidas"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-emerald-500/40 bg-black/95 px-3 py-2.5 backdrop-blur-md sm:hidden"
        style={{ paddingBottom: "calc(0.625rem + env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto flex max-w-md items-stretch gap-2">
          <a
            href={SCHEDULE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-1.5 bg-emerald-500 px-4 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-black active:bg-emerald-400"
          >
            {NAV_CTA_LABEL}
            <span aria-hidden>↗</span>
          </a>
          <a
            href="#brief"
            aria-label="Mandar brief curto"
            className="inline-flex items-center justify-center border border-emerald-500/50 px-4 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-400 active:bg-emerald-500/10"
          >
            Brief
          </a>
        </div>
      </div>
    </main>
  );
}
