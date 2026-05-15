"use client";

import { useState } from "react";
import { subscribe } from "@/lib/subscribe";

const MONO = '"Geist Mono", "JetBrains Mono", ui-monospace, monospace';

/**
 * Form de assinatura da página /newsletter.
 * Source fixa `madureira_newsletter_page` — o backend usa isso pra mapear
 * de onde o lead veio (ver /api/newsletter/subscribe + painel admin).
 * Feedback inline, sem reload de página. Honeypot anti-bot via campo `_hp`.
 */
export function NewsletterHeroForm() {
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
    const res = await subscribe(email.trim(), "madureira_newsletter_page", hp);
    if (res.success) {
      setStatus("ok");
      setMessage(res.data || "Inscrição feita. Confere seu email pra confirmar.");
      setEmail("");
    } else {
      setStatus("error");
      setMessage(res.message || "Erro ao inscrever.");
    }
  }

  return (
    <form onSubmit={onSubmit}>
      {/* Honeypot — invisível pra humano, bot preenche */}
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

      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          alignItems: "stretch",
        }}
      >
        <input
          type="email"
          name="email"
          placeholder="seu melhor email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-background text-foreground border border-border placeholder:text-muted-foreground"
          style={{
            flex: "1 1 240px",
            minWidth: 200,
            padding: "15px 18px",
            fontFamily: "inherit",
            fontSize: 15,
            outline: "none",
            borderRadius: 6,
          }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-foreground text-background"
          style={{
            padding: "15px 26px",
            fontFamily: MONO,
            fontSize: 12,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 600,
            border: "none",
            cursor: status === "loading" ? "default" : "pointer",
            borderRadius: 6,
            opacity: status === "loading" ? 0.7 : 1,
            transition: "opacity 0.2s ease",
            whiteSpace: "nowrap",
          }}
        >
          {status === "loading" ? "Enviando…" : "Assinar →"}
        </button>
      </div>

      <p
        className={
          status === "ok"
            ? "text-foreground"
            : status === "error"
              ? "text-foreground/80"
              : "text-muted-foreground"
        }
        style={{
          marginTop: 12,
          fontSize: 12,
          fontFamily: MONO,
          letterSpacing: "0.06em",
          transition: "color 0.2s ease",
        }}
      >
        {message || "Sem spam. Cancela quando quiser."}
      </p>
    </form>
  );
}
