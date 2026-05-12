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
            background: "var(--links-accent)",
            borderColor: "var(--links-bg)",
            boxShadow: "0 0 12px rgba(var(--links-accent-rgb), 0.5)",
          }}
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold tracking-tight"
        style={{ color: "var(--links-fg-strong)" }}
      >
        Gabriel Madureira
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="mt-1.5 text-[12.5px] font-mono tracking-wide"
        style={{ color: "var(--links-fg-faint)" }}
      >
        @ogmadureira
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-4 text-[14px] max-w-xs leading-relaxed font-light"
        style={{ color: "var(--links-fg-muted)" }}
      >
        construo IA dentro de operação de marketing.
        <br />
        dezenas de clientes, 4 produtos. cripto, web3, fintech.
      </motion.p>

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-6 w-12 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--links-fg-divider) 50%, transparent 100%)",
        }}
      />
    </motion.div>
  );
}
