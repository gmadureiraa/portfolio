"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    text: "Recuperei 12h por semana só com a triagem de e-mail e os agentes de pesquisa. O ROI fechou no primeiro mês.",
    name: "Founder fintech*",
    role: "CEO · São Paulo",
  },
  {
    text: "Em 30 dias o time de marketing parou de fazer carrossel manualmente. Brief vira slide com voz da marca, sem prompt mágico.",
    name: "Head de marketing*",
    role: "Cripto · Lisboa",
  },
  {
    text: "Saí da operação. Agora foco em estratégia. O Gabriel não vendeu IA — ele desenhou o sistema pra eu tirar 20h/semana da agenda.",
    name: "CEO consultoria*",
    role: "B2B · Florianópolis",
  },
  {
    text: "A consultoria é diferente porque ele já construiu produto de IA antes. Sabe onde IA vale, onde NÃO vale, e onde gasta token à toa.",
    name: "Diretor de operações*",
    role: "Educação · Curitiba",
  },
];

const logos = ["Kaleidos", "Defiverso", "D-Sec Labs", "Folio", "Buenas Ideias", "Paradigma"];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="px-6 py-24 bg-zinc-900/40 relative">
      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-14">
          <p className="font-mono text-[10px] font-medium text-emerald-400 uppercase tracking-[0.22em] mb-4">
            O que dizem
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-100 mb-4 tracking-tight">
            Quem já passou pelo brief.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="p-7 rounded-2xl border border-zinc-800/60 bg-zinc-900/60 backdrop-blur-sm"
            >
              <p className="text-zinc-200 leading-relaxed text-base">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3 pt-5 border-t border-zinc-800/60">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500/30 to-emerald-700/30 border border-emerald-500/30 flex items-center justify-center text-emerald-300 font-mono text-xs font-semibold">
                  {t.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-100">{t.name}</p>
                  <p className="text-xs text-zinc-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center font-mono text-[10px] text-zinc-600 uppercase tracking-[0.16em]">
          *Depoimentos ilustrativos com base em casos reais. Posso compartilhar referências sob NDA no brief.
        </p>

        <div className="mt-16 pt-12 border-t border-zinc-800/50">
          <p className="text-center text-sm text-zinc-500 mb-8 font-mono uppercase tracking-[0.16em] text-[10px]">
            Construindo IA dentro de:
          </p>
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
            <motion.div
              className="flex gap-12 md:gap-16"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                x: {
                  duration: 22,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
              }}
            >
              {[...logos, ...logos].map((logo, index) => (
                <span
                  key={`${logo}-${index}`}
                  className="text-xl font-semibold text-zinc-700 whitespace-nowrap flex-shrink-0 tracking-tight"
                >
                  {logo}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
