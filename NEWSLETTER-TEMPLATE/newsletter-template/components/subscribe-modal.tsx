"use client";

import { useEffect, useState } from "react";
import { X, ArrowRight, Check } from "lucide-react";
import { subscribe } from "@/lib/subscribe";
import { siteMeta } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function SubscribeModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    const res = await subscribe(email);
    if (res.success) {
      setStatus("ok");
      setMessage(res.data);
      setEmail("");
    } else {
      setStatus("err");
      setMessage(res.message);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="subscribe-title"
      className={cn(
        "fixed inset-0 z-50 transition-opacity duration-200",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="fechar"
        onClick={onClose}
        className="absolute inset-0 bg-ink-0/80 backdrop-blur-sm"
      />

      {/* Panel */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div
          className={cn(
            "relative w-full max-w-md rounded-lg border border-ink-30 bg-ink-10 p-8 shadow-2xl transition-transform duration-200",
            open ? "translate-y-0" : "translate-y-4"
          )}
        >
          <button
            type="button"
            aria-label="fechar"
            onClick={onClose}
            className="absolute top-3 right-3 inline-flex size-8 items-center justify-center rounded-full text-ink-70 hover:bg-ink-15 hover:text-ink-95 transition-colors"
          >
            <X className="size-4" />
          </button>

          <div className="flex items-center gap-2 mb-4">
            <span className="eyebrow text-ink-70">newsletter</span>
            <span className="accent-dot text-vermilion">·</span>
            <span className="eyebrow text-ink-70">{siteMeta.handle}</span>
          </div>

          <h2
            id="subscribe-title"
            className="h-section text-xl md:text-2xl text-ink-95 leading-tight mb-3"
          >
            Receba a próxima direto no seu inbox.
          </h2>

          <p className="text-base text-ink-70 leading-relaxed mb-6">
            {siteMeta.tagline}. Uma por semana, zero spam.
          </p>

          <form onSubmit={onSubmit} className="space-y-3">
            <label htmlFor="modal-email" className="block">
              <span className="sr-only">Seu email</span>
              <input
                id="modal-email"
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full bg-transparent border border-ink-30 rounded-md px-4 py-3 text-base text-ink-95 placeholder:text-ink-50 outline-none focus:border-vermilion caret-vermilion transition-colors"
              />
            </label>
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-cream w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "ok" ? (
                <>
                  <Check className="size-4" />
                  Inscrito
                </>
              ) : status === "loading" ? (
                "Enviando..."
              ) : (
                <>
                  Assinar
                  <ArrowRight className="size-4" />
                </>
              )}
            </button>
            {message && (
              <p
                className={`meta ${
                  status === "err" ? "text-vermilion" : "text-ink-70"
                } pt-1`}
              >
                {message}
              </p>
            )}
            <p className="eyebrow text-ink-50 pt-2 text-center">
              ZERO SPAM <span className="text-vermilion">·</span> UMA POR SEMANA
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
