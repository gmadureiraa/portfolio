"use client";

import { useEffect, useState } from "react";
import { subscribe } from "@/lib/subscribe";

const MONO = '"Geist Mono", "JetBrains Mono", ui-monospace, monospace';
const SERIF = 'var(--font-fraunces), "Fraunces", Georgia, serif';

const STORAGE_SUBSCRIBED = "nl_subscribed";
const STORAGE_DISMISSED_AT = "nl_modal_dismissed_at";
const DISMISS_DAYS = 7;
const TRIGGER_SCROLL_PCT = 50; // mostra quando passa 50% do scroll total

/**
 * Modal de assinatura que abre no meio da leitura de cada post da newsletter.
 * Pattern Substack (Dan Koe): "Descubra mais sobre future/proof".
 *
 * Regras pra mostrar:
 *  - Usuário rolou pelo menos 50% da página
 *  - localStorage NÃO tem `nl_subscribed = true`
 *  - localStorage `nl_modal_dismissed_at` está vazio OU > 7 dias atrás
 *
 * Detecção de assinante via localStorage (rápido + LGPD-friendly).
 * Pra detecção via IP/email server-side, ver TODO no fim do arquivo.
 */
export function NewsletterMidScrollModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const [armed, setArmed] = useState(false);

  // Decide se DEVE abrir baseado em localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    const subscribed = window.localStorage.getItem(STORAGE_SUBSCRIBED);
    if (subscribed === "true") return; // assinante, não abre

    const dismissedAt = window.localStorage.getItem(STORAGE_DISMISSED_AT);
    if (dismissedAt) {
      const elapsed = Date.now() - Number(dismissedAt);
      const sevenDays = DISMISS_DAYS * 24 * 60 * 60 * 1000;
      if (elapsed < sevenDays) return; // fechou recente, respeita
    }

    setArmed(true);
  }, []);

  // Scroll listener — abre quando passa o threshold
  useEffect(() => {
    if (!armed || open) return;

    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (pct >= TRIGGER_SCROLL_PCT) {
        setOpen(true);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [armed, open]);

  // Lock body scroll quando modal aberto
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  // ESC fecha
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleDismiss();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function handleDismiss() {
    setOpen(false);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_DISMISSED_AT, String(Date.now()));
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;
    setStatus("loading");
    setMessage("");
    const res = await subscribe(email.trim(), "newsletter_mid_scroll", hp);
    if (res.success) {
      setStatus("ok");
      setMessage(
        res.data || "Inscrição feita. Confere seu email pra confirmar.",
      );
      setEmail("");
      // subscribe() já seta nl_subscribed=true. Fecha rápido pra liberar a
      // leitura — meio segundo só pra o usuário ver o "Pronto ✓".
      setTimeout(() => setOpen(false), 600);
    } else {
      setStatus("error");
      setMessage(res.message || "Erro ao inscrever.");
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="nl-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleDismiss();
      }}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-background/85 px-4 backdrop-blur-md"
      style={{
        animation: "nl-modal-fade 200ms ease-out",
      }}
    >
      <div
        className="bg-background text-foreground border-border relative w-full max-w-md rounded-2xl border p-8 shadow-2xl"
        style={{
          animation: "nl-modal-pop 240ms cubic-bezier(.2,.7,.2,1)",
        }}
      >
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Fechar"
          className="text-muted-foreground hover:text-foreground absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

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

        <h2
          id="nl-modal-title"
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
      </div>

      {/* Keyframes injetadas inline pra não depender de CSS externo */}
      <style jsx>{`
        @keyframes nl-modal-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes nl-modal-pop {
          from { opacity: 0; transform: translateY(8px) scale(.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

// TODO futuro: detecção server-side via IP.
// Trade-off: requer storage de IP por subscriber (LGPD: opt-in explícito ou
// hash do IP), e cache busting (subscribers que mudaram de rede acabam vendo
// modal indevidamente). LocalStorage cobre 95% dos casos com custo zero.
