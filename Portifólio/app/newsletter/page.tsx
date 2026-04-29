import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import { Background } from "@/components/newsletter-synecdoche/background";
import { NewsletterHero } from "@/components/newsletter-synecdoche/hero";
import { NewsletterFooter } from "@/components/newsletter-synecdoche/footer";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  title: "Newsletter — Madureira®",
  description:
    "Bastidores de produtos digitais, IA e marketing. Toda semana, com print da tela e número. Sem hype.",
  alternates: { canonical: "/newsletter" },
  openGraph: {
    title: "Newsletter do Madureira",
    description:
      "Bastidores de produtos digitais, IA e marketing. Toda semana, com print da tela e número. Sem hype.",
    url: "https://madureira.xyz/newsletter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Newsletter do Madureira",
    description:
      "Bastidores de produtos digitais, IA e marketing. Toda semana, com print da tela e número. Sem hype.",
    creator: "@madureira0x",
  },
};

export default function NewsletterPage() {
  return (
    <main
      className={`${instrumentSerif.variable} p-inset h-[100dvh] w-full`}
    >
      <div className="relative h-full w-full">
        <Background
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alt-g7Cv2QzqL3k6ey3igjNYkM32d8Fld7.mp4"
          placeholder="/newsletter/alt-placeholder.png"
        />
        <NewsletterHero />
        <NewsletterFooter />
      </div>
    </main>
  );
}
