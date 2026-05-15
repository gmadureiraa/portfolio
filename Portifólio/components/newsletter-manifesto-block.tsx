"use client";

import { NewsletterHeroForm } from "@/components/newsletter-synecdoche/hero-form";

const MONO = '"Geist Mono", "JetBrains Mono", ui-monospace, monospace';
const SERIF = 'var(--font-fraunces), "Fraunces", Georgia, serif';

/**
 * Bloco de inscrição da newsletter — versão home.
 * Mesmo manifesto da página /newsletter, formato largo e generoso,
 * pra substituir o card "Projetos ao Vivo" do bento da home.
 * Reusa <NewsletterHeroForm /> (mesmo subscribe + honeypot).
 * Theme-aware: usa vars do DS (foreground/muted-foreground/border).
 */
export function NewsletterManifestoBlock() {
  return (
    <section
      className="border-t border-b border-border bg-background"
      style={{
        width: "100%",
        padding: "clamp(56px, 9vw, 112px) clamp(20px, 4vw, 56px)",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "left" }}>
        <p
          className="text-muted-foreground"
          style={{
            fontFamily: MONO,
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            margin: 0,
            marginBottom: 28,
          }}
        >
          <span className="text-foreground/50">●</span>&nbsp;&nbsp;Manifesto&nbsp;&nbsp;·&nbsp;&nbsp;Newsletter
        </p>

        <h2
          className="text-foreground"
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(40px, 6vw, 72px)",
            lineHeight: 1.02,
            letterSpacing: "-0.025em",
            margin: 0,
          }}
        >
          marketing direto.
          <br />
          IA aplicada.
          <br />
          bastidor real de
          <br />
          quem constrói.
        </h2>

        <p
          className="text-foreground/75"
          style={{
            marginTop: 28,
            maxWidth: 580,
            fontSize: 17,
            lineHeight: 1.65,
          }}
        >
          Cartas semanais com o que funcionou, o que quebrou e os números por
          trás. Texto curto, zero hype, números reais. Sai toda quinta direto
          na sua caixa.
        </p>

        <div style={{ marginTop: 36, maxWidth: 520 }}>
          <NewsletterHeroForm />
        </div>

        <p
          className="text-muted-foreground"
          style={{
            marginTop: 24,
            fontFamily: MONO,
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          uma por semana&nbsp;&nbsp;·&nbsp;&nbsp;zero spam&nbsp;&nbsp;·&nbsp;&nbsp;cancela quando quiser
        </p>
      </div>
    </section>
  );
}

export default NewsletterManifestoBlock;
