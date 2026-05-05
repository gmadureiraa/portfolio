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
        <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-[#FF7A4A]/40 via-[#FF7A4A]/15 to-transparent blur-xl opacity-70" />
        <div className="relative w-24 h-24 rounded-full border border-white/15 overflow-hidden bg-white/5 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]">
          <Image
            src="/avatar.png"
            alt="Gabriel Madureira"
            fill
            sizes="96px"
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#0e1a2a] shadow-[0_0_12px_rgba(52,211,153,0.6)]" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold tracking-tight text-white"
      >
        Gabriel Madureira
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="mt-1 text-[13px] font-mono text-[#FFB089] tracking-wide"
      >
        @ogmadureira
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-3 text-[14px] text-white/65 max-w-xs leading-relaxed"
      >
        construo IA dentro de operação de marketing.
        <br />
        dezenas de clientes, 4 produtos. cripto, web3, fintech.
      </motion.p>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-6 w-16 h-px bg-gradient-to-r from-transparent via-[#FF7A4A]/60 to-transparent"
      />
    </motion.div>
  );
}
