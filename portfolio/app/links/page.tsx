import type { Metadata } from "next";
import "./links.css";
import { LinksSection } from "./_components/links-section";
import { getLocalPosts } from "@/lib/posts";

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

export default function LinksPage() {
  // Fonte real dos "últimos posts": content/posts/*.md (mesma dos /posts).
  const posts = getLocalPosts()
    .slice(0, 3)
    .map((p) => ({
      slug: p.slug,
      title: p.data.title,
      category: p.data.category,
      date: p.data.date,
      image: p.data.image,
    }));

  return <LinksSection posts={posts} />;
}
