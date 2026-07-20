import type { Metadata } from "next";
import "./links.css";
import { LinksSection } from "./_components/links-section";

export const metadata: Metadata = {
  title: "Gabriel Madureira · @ogmadureira",
  description:
    "Founder Kaleidos. Construo IA dentro de operação de marketing. Cripto, web3, fintech.",
  alternates: { canonical: "/links" },
  openGraph: {
    title: "Gabriel Madureira · @ogmadureira",
    description:
      "Founder Kaleidos. Construo IA dentro de operação de marketing. Cripto, web3, fintech.",
    url: "https://madureira.xyz/links",
    type: "website",
    siteName: "Gabriel Madureira",
    locale: "pt_BR",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gabriel Madureira — Links",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ogmadureira",
    creator: "@ogmadureira",
    title: "Gabriel Madureira · @ogmadureira",
    description:
      "Founder Kaleidos. Construo IA dentro de operação de marketing.",
    images: ["/og-image.png"],
  },
};

// JSON-LD ProfilePage/Person — SEO estruturado do hub de links.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Gabriel Madureira",
    alternateName: "@ogmadureira",
    url: "https://madureira.xyz",
    image: "https://madureira.xyz/avatar.png",
    jobTitle: "Founder",
    worksFor: {
      "@type": "Organization",
      name: "Kaleidos",
      url: "https://kaleidos.com.br",
    },
    description:
      "Founder Kaleidos. Construo IA dentro de operação de marketing. Cripto, web3, fintech.",
    sameAs: [
      "https://x.com/ogmadureira",
      "https://www.linkedin.com/in/gabriel-madureira/",
      "https://instagram.com/ogmadureira",
    ],
  },
};

export default function LinksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <LinksSection />
    </>
  );
}
