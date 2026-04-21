import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Umami } from "@/components/umami";

const inter = Inter({ subsets: ["latin"] });

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
    creator: "@madureira_eth",
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
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Gabriel Madureira",
              "jobTitle": "Fundador da Kaleidos",
              "url": "https://madureira.xyz",
              "sameAs": [
                "https://github.com/gmadureiraa",
                "https://linkedin.com/in/gabrielmadureira",
                "https://x.com/madureira"
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
          {children}
        </ThemeProvider>
        <Toaster />
        <Umami />
      </body>
    </html>
  );
}
