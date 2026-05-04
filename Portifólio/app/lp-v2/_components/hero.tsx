"use client";

import { motion } from "framer-motion";
import GridPattern from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";

type HeroProps = {
  scheduleUrl: string;
  primaryCtaLabel: string;
};

const headlineLines = [
  { text: "Sequência Viral, Reels Viral,", highlight: false },
  { text: "Radar Viral e Kaleidos Pay.", highlight: false },
  { text: "4 produtos de IA em 6 meses.", highlight: true },
  { text: "Posso ensinar teu time a fazer igual.", highlight: false },
];

export default function Hero({ scheduleUrl, primaryCtaLabel }: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-emerald-500/15 px-4 pb-16 pt-24 sm:px-6 sm:pt-28 lg:px-10 lg:pb-24 lg:pt-32">
      {/* Animated grid background */}
      <GridPattern
        numSquares={28}
        maxOpacity={0.18}
        duration={3.5}
        repeatDelay={0.8}
        className={cn(
          "[mask-image:radial-gradient(ellipse_at_top,white,transparent_75%)]",
          "fill-emerald-500/15 stroke-emerald-500/15",
          "absolute inset-0 -z-10 h-full w-full",
        )}
      />

      {/* Soft gradient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(16,185,129,0.18)_0%,rgba(0,0,0,0)_60%)]"
      />

      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/[0.04] px-3 py-1.5 backdrop-blur"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-300">
            3 vagas em consultoria mensal · 2026
          </span>
        </motion.div>

        {/* Headline com word-pull-up */}
        <h1 className="font-bold uppercase leading-[1.02] tracking-tight text-white">
          {headlineLines.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.15 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={cn(
                  "block text-[clamp(1.75rem,5vw,3.5rem)]",
                  line.highlight &&
                    "my-2 inline-block bg-emerald-500 px-3 text-black",
                )}
              >
                {line.text}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg"
        >
          Consultoria 1-1, workshops e sistemas customizados pra integrar Claude
          e Gemini no teu negócio sem virar fábrica de prompt em Notion
          bagunçado.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.85 }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <a
            href={scheduleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden bg-emerald-500 px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-black transition-all hover:bg-emerald-400 hover:shadow-[0_0_32px_rgba(16,185,129,0.45)]"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">{primaryCtaLabel}</span>
            <span aria-hidden className="relative transition-transform group-hover:translate-x-0.5">
              ↗
            </span>
          </a>
          <a
            href="#brief"
            className="inline-flex items-center justify-center gap-2 border border-emerald-500/40 px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400 transition-colors hover:border-emerald-500/70 hover:bg-emerald-500/5"
          >
            Mandar brief antes
          </a>
        </motion.div>

        {/* Stat bar */}
        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="mt-6 grid w-full max-w-3xl grid-cols-2 gap-px overflow-hidden border border-emerald-500/15 bg-emerald-500/15 sm:grid-cols-4"
        >
          {[
            { v: "5+", l: "anos founder" },
            { v: "8", l: "clientes ativos" },
            { v: "4", l: "produtos shipados" },
            { v: "100%", l: "código teu" },
          ].map((s) => (
            <div
              key={s.l}
              className="flex flex-col items-center gap-1 bg-black px-4 py-5"
            >
              <dt className="font-mono text-2xl font-bold text-emerald-400 sm:text-3xl">
                {s.v}
              </dt>
              <dd className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-400">
                {s.l}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
