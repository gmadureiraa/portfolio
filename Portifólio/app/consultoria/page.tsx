import type { Metadata } from "next";

import { ConsultoriaNavbar } from "@/components/consultoria/navbar";
import { HeroSection } from "@/components/consultoria/hero-section";
import { ImpactSection } from "@/components/consultoria/impact-section";
import { FeaturesSection } from "@/components/consultoria/features-section";
import { ProcessSection } from "@/components/consultoria/process-section";
import { ProofSection } from "@/components/consultoria/proof-section";
import { TestimonialsSection } from "@/components/consultoria/testimonials-section";
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
      <CtaSection />
      <FooterSection />
    </main>
  );
}
