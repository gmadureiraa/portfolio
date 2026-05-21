"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function ProfileHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-col items-center text-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative mb-5"
      >
        <div
          className="absolute -inset-1 rounded-full blur-xl opacity-60"
          style={{ background: "var(--links-avatar-glow)" }}
        />
        <div
          className="relative w-24 h-24 rounded-full overflow-hidden bg-white/5 ring-1"
          style={{
            boxShadow: "var(--links-avatar-shadow)",
            // ring color via outline-style ring won't pick var — use inline shadow trick
            // ring-1 cor:
            outline: "1px solid var(--links-avatar-ring)",
            outlineOffset: "-1px",
          }}
        >
          <Image
            src="/avatar.png"
            alt="Gabriel Madureira"
            fill
            sizes="96px"
            className="object-cover"
            priority
          />
        </div>
        <div
          className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full border-2"
          style={{
            background: "var(--links-fg-strong)",
            borderColor: "var(--links-bg)",
            boxShadow: "0 0 10px rgba(var(--links-accent-rgb), 0.35)",
          }}
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="ds-display text-[42px] sm:text-[48px]"
        style={{ color: "var(--links-fg-strong)" }}
      >
        Gabriel <em style={{ color: "var(--links-fg-strong)" }}>Madureira</em>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="ds-mono mt-2 text-[11px]"
        style={{ color: "var(--links-fg-faint)" }}
      >
        @ogmadureira
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="ds-sans mt-5 text-[15px] max-w-[28ch] leading-relaxed font-normal"
        style={{ color: "var(--links-fg-muted)" }}
      >
        founder kaleidos. construo ia dentro de operação de marketing.
        <br />
        cripto, web3, fintech.
      </motion.p>

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="ds-rule mt-7"
      />
    </motion.div>
  );
}
