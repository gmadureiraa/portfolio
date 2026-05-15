import type { Metadata } from "next";
import { Inter, Fraunces, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/styles/prose-madureira.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Umami } from "@/components/umami";
import { SiteHeader } from "@/components/site-header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Carregadas globalmente pra o SiteHeader e qualquer página
// que use o DS Madureira (paper/ink/coral) renderizar com a fonte certa.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-fraunces",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Gabriel Madureira — Fundador da Kaleidos | Cripto, IA & Marketing",
    template: "%s | Gabriel Madureira",
  },
  description:
    "Portfolio de Gabriel Madureira. 15+ produtos digitais. Cripto, IA, marketing e automacao.",
  metadataBase: new URL("https://madureira.xyz"),
  openGraph: {
    title: "Gabriel Madureira — Portfolio",
    description:
      "Fundador da Kaleidos. Produtos digitais em cripto, IA e marketing.",
    type: "website",
    locale: "pt_BR",
    url: "https://madureira.xyz",
    siteName: "Gabriel Madureira",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Gabriel Madureira — Portfolio de Produtos Digitais" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabriel Madureira — Portfolio",
    description:
      "Fundador da Kaleidos. Produtos digitais em cripto, IA e marketing.",
    creator: "@madureira0x",
    site: "@madureira0x",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${inter.variable} ${fraunces.variable} ${geistMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Gabriel Madureira",
              "alternateName": "madureira0x",
              "jobTitle": "Fundador da Kaleidos",
              "description":
                "Fundador da Kaleidos — agência de marketing digital. Construo produtos digitais e sistemas de marketing baseados em IA e automação.",
              "url": "https://madureira.xyz",
              "image": "https://madureira.xyz/og-image.png",
              "worksFor": {
                "@type": "Organization",
                "name": "Kaleidos",
                "url": "https://kaleidos.com.br"
              },
              "knowsAbout": [
                "Marketing Digital",
                "Inteligência Artificial",
                "Automação",
                "Web3",
                "Criptomoedas",
                "Next.js",
                "TypeScript"
              ],
              "sameAs": [
                "https://github.com/gmadureiraa",
                "https://www.linkedin.com/in/gabriel-madureira/",
                "https://x.com/madureira0x",
                "https://www.instagram.com/ogabrielmadureira/"
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader />
          {children}
        </ThemeProvider>
        <Toaster />
        <Umami />
      </body>
    </html>
  );
}
