"use client";

import {
  Layers,
  FileText,
  Search,
  MessagesSquare,
  Mail,
  Receipt,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    badge: "Marketing & conteúdo",
    title: "Reunião que vira 5 conteúdos",
    body: "Você grava normal. IA transcreve, edita e monta carrossel + post LinkedIn + thread + email + storyboard de reels. 2h vira 15min.",
    proof: "Stack rodando hoje: Whisper + Claude + Sequência Viral.",
  },
  {
    icon: Search,
    badge: "Pesquisa & inteligência",
    title: "Pesquisa que tomava 3 dias",
    body: "Agentes de research varrem 50 fontes em 30min, retornam síntese com citação direta. Pesquisa de mercado, benchmark, due diligence.",
    proof: "Já roda em projetos de fintech e cripto da Kaleidos.",
  },
  {
    icon: Receipt,
    badge: "Financeiro & operação",
    title: "Cobrança que era manual",
    body: "Sistema dispara lembrete via WhatsApp e e-mail com link de pagamento pré-preenchido. Quando vence, segunda mensagem. Quando paga, recibo automático.",
    proof: "Implementado no Kaleidos Pay — 100% open-source pro cliente.",
  },
  {
    icon: MessagesSquare,
    badge: "Atendimento & comercial",
    title: "Atendimento que esgotava o time",
    body: "Agente FAQ resolve nível 1 (90% das dúvidas). Time só pega o que precisa de cabeça. Funciona em WhatsApp, Slack, e-mail e widget de site.",
    proof: "Reduzimos 60% do volume de tickets em 1 cliente B2B.",
  },
  {
    icon: Mail,
    badge: "Inbox & comunicação",
    title: "Caixa de e-mail que travava o dia",
    body: "IA classifica, prioriza e rascunha resposta. Você só revisa e envia. Funciona com Gmail e Outlook nativos, sem plugin esquisito.",
    proof: "Cliente CEO recuperou 12h/sem só com triagem automática.",
  },
  {
    icon: Layers,
    badge: "Custom",
    title: "Tem fluxo que ninguém tem? A gente desenha.",
    body: "Onboarding de cliente, geração de pitch deck, RH, contabilidade, suporte técnico, follow-up. Cada operação tem 3-5 gargalos óbvios. Achamos no brief.",
    proof: "Mapa de 1 página depois da call de 30min. Sem PDF de 80 slides.",
  },
];

export function FeaturesSection() {
  return (
    <section id="gargalos" className="px-6 py-24 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-mono text-[10px] font-medium text-emerald-400 uppercase tracking-[0.22em] mb-4">
            Onde a IA vai cortar 70% do teu dia
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-100 mb-4 tracking-tight">
            Os gargalos que todo mundo tem.
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Marketing, vendas, atendimento, financeiro, operação. Não importa a
            área — a tarefa repetitiva que tu odeia provavelmente cabe em um
            agente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group flex flex-col gap-4 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/60 hover:border-emerald-500/40 hover:bg-zinc-900/80 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700/50 flex items-center justify-center group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-colors">
                    <Icon className="w-5 h-5 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                    {f.badge}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-zinc-100 leading-tight tracking-tight">
                  {f.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {f.body}
                </p>
                <p className="mt-auto font-mono text-[11px] text-emerald-300/80 leading-relaxed border-t border-zinc-800/60 pt-3">
                  &gt; {f.proof}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
