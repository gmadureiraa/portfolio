"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { subscribe } from "@/lib/subscribe";
import { trackClick } from "../_lib/tracking";

type State =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

export function NewsletterPane() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state.kind === "loading") return;
    if (!email.trim()) {
      setState({ kind: "error", message: "Bota um email aí." });
      return;
    }
    setState({ kind: "loading" });
    trackClick("newsletter-submit");
    const result = await subscribe(email.trim(), "madureira_links_tab");
    if (result.success === true) {
      setState({ kind: "success", message: result.data });
      setEmail("");
    } else {
      setState({ kind: "error", message: result.message });
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="glass-card relative overflow-hidden rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <motion.div
            className="flex items-center justify-center w-11 h-11 rounded-xl shrink-0 bg-[#C5FF4A]/12 text-[#C5FF4A] ring-1 ring-[#C5FF4A]/25"
            animate={{
              boxShadow: [
                "0 0 0px rgba(197,255,74,0)",
                "0 0 18px rgba(197,255,74,0.3)",
                "0 0 0px rgba(197,255,74,0)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Mail className="w-[20px] h-[20px]" />
          </motion.div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-[15px] leading-tight text-white tracking-tight">
              Bastidor real, toda semana
            </h3>
            <p className="text-[12.5px] mt-1 text-white/55 font-light leading-relaxed">
              Print da tela, número da operação, IA aplicada em marketing. Sem
              hype.
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-5 relative">
          <input
            type="email"
            inputMode="email"
            autoCapitalize="off"
            autoComplete="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (state.kind === "error") setState({ kind: "idle" });
            }}
            disabled={state.kind === "loading" || state.kind === "success"}
            className="w-full h-12 pl-4 pr-14 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/35 text-[14px] tracking-tight outline-none transition-all focus:bg-white/8 focus:border-[#C5FF4A]/40 focus:ring-2 focus:ring-[#C5FF4A]/15 disabled:opacity-60"
          />
          <motion.button
            type="submit"
            disabled={state.kind === "loading" || state.kind === "success"}
            whileHover={
              state.kind === "idle" || state.kind === "error"
                ? { scale: 1.05 }
                : undefined
            }
            whileTap={{ scale: 0.94 }}
            className={`
              absolute right-1.5 top-1/2 -translate-y-1/2
              flex items-center justify-center w-9 h-9 rounded-lg
              transition-colors
              ${
                state.kind === "success"
                  ? "bg-[#C5FF4A]/15 text-[#C5FF4A] ring-1 ring-[#C5FF4A]/40"
                  : "bg-[#C5FF4A] text-[#08080a] hover:bg-[#d6ff6a] disabled:opacity-50"
              }
            `}
            aria-label="Inscrever"
          >
            <AnimatePresence mode="wait" initial={false}>
              {state.kind === "loading" ? (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                >
                  <Loader2 className="w-4 h-4 animate-spin" />
                </motion.span>
              ) : state.kind === "success" ? (
                <motion.span
                  key="success"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                >
                  <Check className="w-4 h-4" />
                </motion.span>
              ) : (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </form>

        <AnimatePresence mode="wait">
          {state.kind === "success" && (
            <motion.p
              key="success-msg"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="mt-3 text-[12.5px] text-[#C5FF4A]"
            >
              {state.message || "Confirma o link no seu email."}
            </motion.p>
          )}
          {state.kind === "error" && (
            <motion.p
              key="error-msg"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="mt-3 text-[12.5px] text-red-400/90"
            >
              {state.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <p className="text-center text-[11.5px] text-white/35 font-light leading-relaxed px-6">
        toda semana, 1 email. cancela com 1 clique.
      </p>
    </div>
  );
}
