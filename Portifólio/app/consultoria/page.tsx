import type { Metadata } from "next";

import { ConsultoriaNavbar } from "@/components/consultoria/navbar";
import { HeroSection } from "@/components/consultoria/hero-section";
import { ImpactSection } from "@/components/consultoria/impact-section";
import { FeaturesSection } from "@/components/consultoria/features-section";
import { ProcessSection } from "@/components/consultoria/process-section";
import { ProofSection } from "@/components/consultoria/proof-section";
import { TestimonialsSection } from "@/components/consultoria/testimonials-section";
import { PricingSection } from "@/components/consultoria/pricing-section";
import { CtaSection } from "@/components/consultoria/cta-section";
import { FooterSection } from "@/components/consultoria/footer-section";
import { profile } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Consultoria de IA — 70% do teu dia, recuperado",
  description:
    "Eu mapeio onde estão os gargalos da tua operação e implemento IA dentro do teu fluxo. Em 30 dias você ganha o tempo de volta. Consultoria 1-1, workshops e sistemas customizados.",
  keywords: [
    "consultoria de IA",
    "automação IA",
    "IA para empresas",
    "IA para profissionais",
    "agentes IA",
    "implementação Claude",
    "implementação Gemini",
    "Gabriel Madureira",
    "Kaleidos",
    "produtividade IA",
    "automação de processos",
  ],
  alternates: { canonical: "/consultoria" },
  openGraph: {
    title: "Consultoria de IA — 70% do teu dia, recuperado",
    description:
      "Eu mapeio onde estão os gargalos da tua operação e implemento IA. Em 30 dias você ganha o tempo de volta.",
    url: "https://madureira.xyz/consultoria",
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
    title: "Consultoria de IA — 70% do teu dia, recuperado",
    description:
      "Eu mapeio onde estão os gargalos e implemento IA dentro do teu fluxo. Em 30 dias você ganha o tempo de volta.",
    images: ["/og-image.png"],
  },
};

const WHATSAPP_BASE = `https://wa.me/${profile.whatsapp}`;
const WA_DIAGNOSTICO = `${WHATSAPP_BASE}?text=${encodeURIComponent(
  "Olá Gabriel, vim da página /consultoria e quero agendar um diagnóstico gratuito de 30min.",
)}`;
const WA_DIAGNOSTICO_PLAN = `${WHATSAPP_BASE}?text=${encodeURIComponent(
  "Olá Gabriel, quero saber mais sobre o Diagnóstico Pontual (R$ 5k).",
)}`;
const WA_MENSAL_PLAN = `${WHATSAPP_BASE}?text=${encodeURIComponent(
  "Olá Gabriel, quero saber mais sobre a consultoria mensal (R$ 15k/mês).",
)}`;
const WA_CUSTOM_PLAN = `${WHATSAPP_BASE}?text=${encodeURIComponent(
  "Olá Gabriel, tenho um projeto fechado em mente. Quero conversar sobre o sistema customizado.",
)}`;

const plans = [
  {
    badge: "Pontual",
    name: "Diagnóstico",
    description: "1 dia comigo, mapeamento dos top 5 gargalos da tua operação + plano de ação. Pra quem precisa de clareza antes de investir mais.",
    price: "R$ 5.000",
    priceSuffix: "· entrega em 7 dias",
    features: [
      "Call de 4h estruturada com tu e o time",
      "Mapa de 1 página com top 5 gargalos priorizados",
      "Plano de ação com estimativa de ROI por iniciativa",
      "Templates de prompt e arquitetura sugerida",
      "Sessão de Q&A 30min após 7 dias",
    ],
    fitFor: "tu quer entender onde IA dá retorno antes de comprometer time",
    notFor: "tu já sabe o problema e quer só execução — vai pro Mensal",
    cta: "Agendar diagnóstico",
    ctaHref: WA_DIAGNOSTICO_PLAN,
  },
  {
    badge: "Mais escolhido",
    name: "Mensal",
    description: "1 mês de implementação contínua, eu dentro do teu time. Build + handover de código. Mínimo 3 meses pra ROI fechar.",
    price: "R$ 15.000",
    priceSuffix: "/mês · mín 3 meses",
    features: [
      "Até 3 sistemas customizados rodando ao final do mês 3",
      "Workshop interno de IA pro time (até 10 pessoas)",
      "Async no Slack/Discord (resposta em 24h)",
      "Code reviews e mentoria técnica do time",
      "Relatório mensal de ROI mensurável",
      "Código 100% teu — open-source ou repo privado",
    ],
    fitFor: "tu tem time pequeno operando e quer destravar 3-5 frentes em 90 dias",
    notFor: "tu quer só prompt mágico — sistema bom é mais que prompt",
    cta: "Conversar sobre mensal",
    ctaHref: WA_MENSAL_PLAN,
    highlighted: true,
  },
  {
    badge: "Custom",
    name: "Sistema fechado",
    description: "Projeto de escopo fechado. Build sob medida pra um fluxo específico (ex: pipeline de cobrança, agente de atendimento, gerador de proposta).",
    price: "A partir R$ 30k",
    priceSuffix: "· escopo fechado",
    features: [
      "Discovery + arquitetura definida no escopo",
      "Build do sistema end-to-end",
      "Integração com stack existente (Notion, Slack, ClickUp, etc)",
      "Documentação técnica + handover ao time",
      "30 dias de suporte pós-entrega incluso",
      "Pagamento 50% início + 50% entrega",
    ],
    fitFor: "tu já tem o problema mapeado e quer um sistema rodando em 4-8 sem",
    notFor: "tu não sabe ainda o que precisa — começa pelo Diagnóstico",
    cta: "Discutir escopo",
    ctaHref: WA_CUSTOM_PLAN,
  },
];

export default function ConsultoriaPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
      <ConsultoriaNavbar ctaHref={WA_DIAGNOSTICO} />
      <HeroSection
        primaryCta={{ href: WA_DIAGNOSTICO, label: "Agendar diagnóstico gratuito" }}
      />
      <ImpactSection />
      <FeaturesSection />
      <ProcessSection />
      <ProofSection />
      <TestimonialsSection />
      <PricingSection plans={plans} />
      <CtaSection />
      <FooterSection />
    </main>
  );
}
