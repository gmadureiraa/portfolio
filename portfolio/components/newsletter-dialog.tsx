"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { subscribe } from "@/lib/subscribe";
import { track } from "@/lib/analytics";

const MONO = '"Geist Mono", "JetBrains Mono", ui-monospace, monospace';
const SERIF = 'var(--font-fraunces), "Fraunces", Georgia, serif';

interface NewsletterDialogProps {
  /** Botão/elemento que abre o dialog. Deve aceitar onClick. */
  children: React.ReactNode;
  /** Source pra analytics e tracking server-side. */
  source?: string;
}

/**
 * Dialog reutilizável de assinatura da newsletter. Visual alinhado com o
 * mid-scroll modal (cream paper, Fraunces italic, mono uppercase) mas
 * controlado por trigger explícito (botão "Assinar" do header).
 *
 * Usa shadcn Dialog (Radix UI) — foco, ESC, click-outside, animação,
 * portal — tudo já resolvido.
 */
export function NewsletterDialog({
  children,
  source = "header_assinar",
}: NewsletterDialogProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;
    setStatus("loading");
    setMessage("");
    const res = await subscribe(email.trim(), source, hp);
    if (res.success) {
      setStatus("ok");
      setMessage(
        res.data || "Inscrição feita. Confere seu email pra confirmar.",
      );
      track("newsletter_signup", { source });
      setEmail("");
      // Fecha logo após sucesso pra liberar a navegação.
      setTimeout(() => {
        setOpen(false);
        // Reset depois do fade-out pra próxima abertura começar limpo.
        setTimeout(() => {
          setStatus("idle");
          setMessage("");
        }, 300);
      }, 1200);
    } else {
      setStatus("error");
      setMessage(res.message || "Erro ao inscrever.");
      track("newsletter_signup_error", {
        source,
        reason: res.message,
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-background text-foreground border-border max-w-md rounded-2xl p-8 sm:rounded-2xl">
        <p
          className="text-muted-foreground mb-3"
          style={{
            fontFamily: MONO,
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            margin: 0,
            marginBottom: 14,
          }}
        >
          <span className="text-foreground/50">●</span>
          &nbsp;&nbsp;Cartas do Madureira
        </p>

        <DialogTitle
          asChild
        >
          <h2
            style={{
              fontFamily: SERIF,
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(24px, 4vw, 32px)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              margin: 0,
              marginBottom: 12,
            }}
          >
            Recebe a próxima carta no inbox.
          </h2>
        </DialogTitle>

        <DialogDescription asChild>
          <p
            className="text-muted-foreground"
            style={{
              fontSize: 14,
              lineHeight: 1.55,
              margin: 0,
              marginBottom: 24,
            }}
          >
            marketing direto, IA aplicada. bastidor real de quem constrói.
          </p>
        </DialogDescription>

        <form onSubmit={onSubmit}>
          {/* Honeypot */}
          <input
            type="text"
            name="_hp"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
            style={{
              position: "absolute",
              left: "-9999px",
              width: 1,
              height: 1,
              opacity: 0,
              pointerEvents: "none",
            }}
          />

          <input
            type="email"
            name="email"
            placeholder="seu melhor email"
            aria-label="Seu email para assinar a newsletter"
            required
            autoComplete="email"
            disabled={status === "loading" || status === "ok"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-background text-foreground border-border placeholder:text-muted-foreground w-full border"
            style={{
              padding: "14px 16px",
              fontFamily: "inherit",
              fontSize: 15,
              borderRadius: 8,
              outline: "none",
              marginBottom: 10,
            }}
          />

          <button
            type="submit"
            disabled={status === "loading" || status === "ok"}
            className="bg-foreground text-background w-full disabled:opacity-50"
            style={{
              padding: "14px 18px",
              fontFamily: "inherit",
              fontSize: 14,
              fontWeight: 600,
              borderRadius: 8,
              border: "none",
              cursor:
                status === "loading" || status === "ok"
                  ? "not-allowed"
                  : "pointer",
              transition: "opacity .15s",
            }}
          >
            {status === "loading"
              ? "Inscrevendo..."
              : status === "ok"
                ? "Pronto ✓"
                : "Quero receber"}
          </button>

          {message && (
            <p
              role={status === "error" ? "alert" : "status"}
              aria-live={status === "error" ? "assertive" : "polite"}
              className={
                status === "ok" ? "text-foreground" : "text-foreground/80"
              }
              style={{
                fontSize: 13,
                lineHeight: 1.4,
                margin: 0,
                marginTop: 12,
              }}
            >
              {message}
            </p>
          )}

          <p
            className="text-muted-foreground"
            style={{
              fontFamily: MONO,
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              margin: 0,
              marginTop: 16,
              textAlign: "center",
            }}
          >
            zero spam · uma por semana · cancela quando quiser
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default NewsletterDialog;
