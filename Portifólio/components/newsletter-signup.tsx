"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { subscribe } from "@/lib/subscribe";
import { newsletterSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";

type Variant = "compact" | "card";

interface NewsletterSignupProps {
  title?: string;
  description?: string;
  variant?: Variant;
  className?: string;
}

export function NewsletterSignup({
  title = "Newsletter do Madureira",
  description = "Bastidores reais de como construo produtos, marketing e automacao no mercado cripto. Sem enrolacao.",
  variant = "card",
  className,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<
    | { status: "idle" }
    | { status: "loading" }
    | { status: "success"; message: string }
    | { status: "error"; message: string }
  >({ status: "idle" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const parsed = newsletterSchema.safeParse({ email });
    if (!parsed.success) {
      setState({
        status: "error",
        message: "Digite um e-mail valido.",
      });
      return;
    }

    setState({ status: "loading" });
    const result = await subscribe(parsed.data.email);

    if (result.success) {
      setState({ status: "success", message: result.data });
      setEmail("");
    } else {
      setState({ status: "error", message: result.message });
    }
  }

  const isCompact = variant === "compact";

  return (
    <div
      className={cn(
        "relative w-full rounded-xl border border-neutral-800 bg-background",
        isCompact ? "p-4" : "p-6 md:p-8",
        className,
      )}
    >
      {!isCompact && (
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-neutral-800/60 px-3 py-1 text-xs text-neutral-300">
          <Mail className="h-3.5 w-3.5" />
          Newsletter
        </div>
      )}
      <h3
        className={cn(
          "font-semibold text-neutral-100",
          isCompact ? "text-base" : "text-xl md:text-2xl",
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "text-neutral-400 leading-relaxed",
          isCompact ? "text-xs mt-1" : "text-sm mt-2",
        )}
      >
        {description}
      </p>

      <form
        onSubmit={handleSubmit}
        className={cn("mt-4 flex gap-2", isCompact && "mt-3")}
      >
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state.status === "error") setState({ status: "idle" });
          }}
          disabled={state.status === "loading"}
          className={cn(
            "flex-1 rounded-lg border border-neutral-700 bg-neutral-900/60 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-500 focus:border-neutral-500 focus:outline-none disabled:opacity-50",
          )}
        />
        <button
          type="submit"
          disabled={state.status === "loading"}
          className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-900 transition-all hover:bg-white disabled:opacity-60"
        >
          {state.status === "loading" ? "..." : "Assinar"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      <AnimatePresence>
        {state.status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-3 flex items-center gap-2 text-xs text-emerald-400"
          >
            <CheckCircle2 className="h-4 w-4" />
            {state.message}
          </motion.div>
        )}
        {state.status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-3 flex items-center gap-2 text-xs text-red-400"
          >
            <XCircle className="h-4 w-4" />
            {state.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NewsletterSignup;
